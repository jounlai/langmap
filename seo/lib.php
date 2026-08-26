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

/**
 * Language codes that moved, old => new. index.php 301s the old URL.
 *
 * Each of these rows was sitting on an ISO 639-3 code that denotes a
 * DIFFERENT language — bvu is Bukit Malay, fla is Kalispel-Pend d'Oreille,
 * tsm is Turkish Sign Language — while the code for the language actually in
 * the row was free. Verified against the official registry, not from memory.
 *
 * Never delete an entry from this map. The old URLs are indexed and shared;
 * dropping a line here turns a working page into a 404 with no warning.
 */
const SEO_RENAMED_CODES = [
    'bvu' => 'sdo',   // Bukar-Sadong Bidayuh
    'fla' => 'fax',   // Fala
    'jaq' => 'jqr',   // Jaqaru
    'oma' => 'omy',   // Old Malay
    'osu' => 'osn',   // Old Sundanese
    'pgz' => 'pmy',   // Papuan Malay
    'sik' => 'sip',   // Sikkimese
    'tof' => 'kim',   // Tofa / Karagas
    'tsm' => 'tru',   // Turoyo
    'yag' => 'yai',   // Yaghnobi
    'azo' => 'yiz',   // Azhe
    'dge' => 'deg',   // Degema
    'jia' => 'jio',   // Jiamao
    'ddn' => 'dds',   // Donno So Dogon — ddn is Dendi, a Songhay language of Benin
    'p_kra' => 'ptai',// the row's cells were Proto-Tai, not Proto-Kra-Dai
    // Phase 3. Codes with no ISO 639-3 entry of their own move to the
    // underscore form the dataset already uses for variants (es_mx, ja_osa) —
    // URL-safe, and no colon to encode.
    'pko' => 'p_kor',   'pst' => 'p_sit',   'phm' => 'p_hmx',
    'pjp' => 'p_jpn',   'ptg' => 'p_tun',   'paa' => 'p_aav',
    'pkd' => 'p_kra',   'pdr' => 'p_dra',   'pry' => 'p_ryu',
    'pjk' => 'p_jpk',   'ine' => 'p_ine',
    'okg' => 'h_goguryeo', 'otl' => 'h_tagalog', 'vsa' => 'h_vedic',
    'dgr' => 'nrf_gg',  // Guernésiais, a Norman variety
    // Retired ISO codes whose successor was free.
    'cqu' => 'qwc',     'occ' => 'ocm',     'wch' => 'wic',
    'cnd' => 'cng',     'izi' => 'izz',     'olg' => 'olk',
    'iuu' => 'ium',     'tup' => 'tpn',     'myn' => 'emy',
    // Mixtec: ISO mix is Mixtepec Mixtec, so the individual row takes it and
    // the cover row moves off it. xtm's old URL lands on the row it held.
    'xtm' => 'mix',
    // Southern Luri onto its correct code.
    'lrr' => 'luz',
    // es_eu -> es, pt_eu -> pt. The root rows were already there, spelled
    // "(Europe)"; every other major language uses the bare code for the
    // homeland variety (en, fr, de, it, ru, nl, ar, zh).
    'es_eu' => 'es',
    'pt_eu' => 'pt',
    // Retired codes whose successor row already existed.
    'mvc' => 'mam',      // Central Mam, merged
    'kzj' => 'dtp_kzj',  // Coastal Kadazan, kept as a dtp variety
    'uun' => 'pzh',      // the row is Pazeh, not the combined Kulon-Pazeh
    'sum' => 'yan',      // Sumo = Mayangna
    // Consolidated duplicates (2026-08-06/07) — the row is gone, not renamed,
    // but the old URL should still land somewhere useful.
    'som' => 'so',    // Somali
    'ipk' => 'ik',    // Iñupiaq
    'onn' => 'ono',   // Onondaga (onn is Onobasulu)
    'xkk' => 'kjg',   // Khmu (xkk is Kachok)
    'bua' => 'bxr',   // Buryat
    'ar_dz' => 'arq', // Algerian Arabic
    'eml' => 'egl',   // Emilian (eml retired from ISO in 2009)
];

/**
 * 301 to a renamed code's new URL — but only when the requested code is dead
 * on THIS map. The two maps do not share a code space: the Word Map moved its
 * proto-languages to p_kor / p_sit / p_aav / p_hmx, while the Han Map still
 * calls those rows pko / pst / paa / phm. Redirecting on the table alone sent
 * every Han Map proto page to a Word Map URL that does not exist there, so all
 * four 404'd while their data sat in the export (owner 2026-08-26).
 *
 * Call this only after the map's own lookup has failed.
 */
function seo_redirect_if_renamed(string $map, string $id, string $ui): bool
{
    if ($id === '' || !isset(SEO_RENAMED_CODES[$id])) return false;
    header('Location: ' . SEO_SITE . seo_path($ui, $map, SEO_RENAMED_CODES[$id]), true, 301);
    http_response_code(301);
    return true;
}
const SEO_DATA_DIR = __DIR__ . '/../data';

// Number of Word Map concepts (= WORD_ORDER length in word_manifest.js).
// Used as the {w} placeholder in cross-navigation labels (hub / Han Map pages)
// that don't load the Word Map JSON. The Word Map content pages override this
// with the live count($words) from the data, so they never go stale; keep this
// in sync when WORD_ORDER grows (tools/export_seo_data.js prints "concepts: N").
const SEO_WM_WORDS = 30;

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
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Vitality',
        'aliases' => 'Also known as', 'romanization' => 'Romanization',
        'ex_words' => 'Words compared', 'ex_wordorder' => 'Word order compared', 'ex_han' => 'Han readings compared',
        'wo_major' => 'Compare with major world languages', 'wo_close' => 'Compare with closely-related languages',
        'cmp_caption' => 'Compared with related {family} languages',
        'ex_prev' => 'Prev', 'ex_next' => 'Next', 'ex_page' => 'Page', 'ex_pick' => 'Sentence',
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
        'words_heading' => '{w} core words in {name}',
        'chars_heading' => 'Han character readings in {name}',
        'hidden_tag' => 'historical / hidden variety',
        'wm_lang_title' => '{w} words & pronunciations',
        'hm_lang_title' => 'Han character readings',
        'wm_lang_meta' => 'Pronunciations of {w} core words in {name}, with IPA and native forms, on the LangMap Word Map.',
        'hm_lang_meta' => 'Readings of Han characters in {name} on the LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} core words across {n} languages',
        'wm_index_desc' => 'Browse pronunciations of {w} core words (water, fire, sun, moon, mother, …) with IPA and native forms across {n} languages and varieties on the LangMap Word Map.',
        'hm_index_title' => 'Han Map — Han character readings across {n} languages',
        'hm_index_desc' => 'Compare readings of {c} core Han characters (一 二 三 日 月 山 水 …) across {n} Sinitic, Japonic, Koreanic and Vietic varieties on the LangMap Han Map.',
        'wm_index_sub' => '{w} core words in {n} languages and varieties — native forms with IPA pronunciation.',
        'hm_index_sub' => '{c} core Han characters across {n} languages and varieties — surface forms with IPA / romanized readings.',
        'see_also' => 'See also',
        'home' => 'LangMap home',
        'hub_title' => 'LangMap — Word Map & Han Map (text index)',
        'hub_desc' => 'Crawlable text index of the LangMap Word Map and Han Map: core-word pronunciations and Han-character readings per language.',
        'hub_h1' => 'LangMap text index',
        'hub_sub' => 'Server-rendered, crawlable summaries of each language.',
        'maps' => 'Maps',
        'wm_link' => 'Word Map — {w} core words',
        'hm_link' => 'Han Map — Han character readings',
        'nf_title' => 'Not found',
        'nf_wm' => 'Word Map index',
        'nf_hm' => 'Han Map index',
        'tri_link' => 'Trivia', 'tri_brand' => 'LangMap Trivia', 'tri_hub_title' => '{n} linguistic trivia articles', 'tri_hub_desc' => '{n} long-form articles on unusual, surprising and contested languages and scripts — click-free, fully readable.', 'tri_hub_sub' => '{n} articles on languages and writing systems, with sources.', 'tri_tags' => 'Tags', 'tri_more' => 'More on this', 'tri_group_wm' => 'Languages', 'tri_group_hm' => 'Scripts & Han readings',
    ],
    'ja' => [
        'family' => '語族', 'speakers' => '話者数', 'script' => '文字',
        'region' => '地域', 'countries' => '国', 'official' => '公用語',
        'reading' => '読み',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => '活力度/危機度',
        'aliases' => '別名', 'romanization' => 'ローマ字方式',
        'ex_words' => '単語の比較', 'ex_wordorder' => '語順の比較', 'ex_han' => '漢字音の比較',
        'wo_major' => '世界の主要言語と比較', 'wo_close' => '系統的に近い言語と比較',
        'cmp_caption' => '{family}の関連言語と比較',
        'ex_prev' => '前へ', 'ex_next' => '次へ', 'ex_page' => 'ページ', 'ex_pick' => '文',
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
        'words_heading' => '{name}の基本{w}語',
        'chars_heading' => '{name}の漢字の読み',
        'hidden_tag' => '歴史的・非表示の変種',
        'wm_lang_title' => '{w}語と発音',
        'hm_lang_title' => '漢字の読み',
        'wm_lang_meta' => 'LangMap Word Map での、{name}の基本{w}語の発音（IPA・現地表記つき）。',
        'hm_lang_meta' => 'LangMap Han Map での、{name}の漢字の読み。',
        'wm_index_title' => 'Word Map — {n}言語の基本{w}語',
        'wm_index_desc' => 'LangMap Word Map で、{n}の言語・変種にわたる基本{w}語（水・火・太陽・月・母…）の発音をIPA・現地表記つきで閲覧できます。',
        'hm_index_title' => 'Han Map — {n}言語の漢字の読み',
        'hm_index_desc' => 'LangMap Han Map で、{n}の漢語・日本語・朝鮮語・ベトナム語系の変種にわたる{c}の基本漢字（一 二 三 日 月 山 水…）の読みを比較できます。',
        'wm_index_sub' => '{n}の言語・変種における基本{w}語 — 現地表記とIPA発音。',
        'hm_index_sub' => '{n}の言語・変種にわたる{c}の基本漢字 — 表記とIPA／ローマ字読み。',
        'see_also' => '関連',
        'home' => 'LangMap ホーム',
        'hub_title' => 'LangMap — Word Map と Han Map（テキスト索引）',
        'hub_desc' => 'LangMap の Word Map と Han Map のクロール可能なテキスト索引。言語ごとの基本語の発音と漢字の読み。',
        'hub_h1' => 'LangMap テキスト索引',
        'hub_sub' => 'サーバーレンダリングされた、各言語のクロール可能な要約。',
        'maps' => 'マップ',
        'wm_link' => 'Word Map — 基本{w}語',
        'hm_link' => 'Han Map — 漢字の読み',
        'nf_title' => '見つかりません',
        'nf_wm' => 'Word Map 索引',
        'nf_hm' => 'Han Map 索引',
        'tri_link' => '読み物', 'tri_brand' => 'LangMap 読み物', 'tri_hub_title' => '言語学の読み物 {n} 本', 'tri_hub_desc' => '珍しい・驚く・論争のある言語と文字についての長文記事 {n} 本。出典付きで全文掲載。', 'tri_hub_sub' => '言語と文字についての記事 {n} 本（出典付き）。', 'tri_tags' => 'タグ', 'tri_more' => '関連する読み物', 'tri_group_wm' => '言語', 'tri_group_hm' => '文字と漢字音',
    ],
    'ko' => [
        'family' => '어족', 'speakers' => '사용자', 'script' => '문자',
        'region' => '지역', 'countries' => '국가', 'official' => '공용어',
        'reading' => '독음',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => '활력도',
        'aliases' => '다른 이름', 'romanization' => '로마자 표기',
        'ex_words' => '단어 비교', 'ex_wordorder' => '어순 비교', 'ex_han' => '한자음 비교',
        'wo_major' => '세계 주요 언어와 비교', 'wo_close' => '계통적으로 가까운 언어와 비교',
        'cmp_caption' => '{family} 계열 관련 언어와 비교',
        'ex_prev' => '이전', 'ex_next' => '다음', 'ex_page' => '페이지', 'ex_pick' => '문장',
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
        'words_heading' => '{name}의 핵심 단어 {w}개',
        'chars_heading' => '{name}의 한자 독음',
        'hidden_tag' => '역사적·숨겨진 변종',
        'wm_lang_title' => '단어 {w}개와 발음',
        'hm_lang_title' => '한자 독음',
        'wm_lang_meta' => 'LangMap Word Map에서 {name}의 핵심 단어 {w}개 발음(IPA·고유 표기 포함).',
        'hm_lang_meta' => 'LangMap Han Map에서 {name}의 한자 독음.',
        'wm_index_title' => 'Word Map — {n}개 언어의 핵심 단어 {w}개',
        'wm_index_desc' => 'LangMap Word Map에서 {n}개 언어 및 변종에 걸친 핵심 단어 {w}개(물, 불, 해, 달, 어머니…)의 발음을 IPA·고유 표기와 함께 둘러보세요.',
        'hm_index_title' => 'Han Map — {n}개 언어의 한자 독음',
        'hm_index_desc' => 'LangMap Han Map에서 {n}개 한어·일본어·한국어·베트남어 변종에 걸친 {c}개 핵심 한자(一 二 三 日 月 山 水…)의 독음을 비교하세요.',
        'wm_index_sub' => '{n}개 언어 및 변종의 핵심 단어 {w}개 — 고유 표기와 IPA 발음.',
        'hm_index_sub' => '{n}개 언어 및 변종에 걸친 {c}개 핵심 한자 — 표기와 IPA／로마자 독음.',
        'see_also' => '함께 보기',
        'home' => 'LangMap 홈',
        'hub_title' => 'LangMap — Word Map과 Han Map(텍스트 색인)',
        'hub_desc' => 'LangMap Word Map과 Han Map의 크롤링 가능한 텍스트 색인. 언어별 핵심 단어 발음과 한자 독음.',
        'hub_h1' => 'LangMap 텍스트 색인',
        'hub_sub' => '서버에서 렌더링된, 각 언어의 크롤링 가능한 요약.',
        'maps' => '지도',
        'wm_link' => 'Word Map — 핵심 단어 {w}개',
        'hm_link' => 'Han Map — 한자 독음',
        'nf_title' => '찾을 수 없음',
        'nf_wm' => 'Word Map 색인',
        'nf_hm' => 'Han Map 색인',
        'tri_link' => '읽을거리', 'tri_brand' => 'LangMap 읽을거리', 'tri_hub_title' => '언어학 읽을거리 {n}편', 'tri_hub_desc' => '희귀하고 놀랍고 논쟁적인 언어와 문자에 관한 장문 기사 {n}편. 출처 포함 전문 수록.', 'tri_hub_sub' => '언어와 문자에 관한 기사 {n}편(출처 포함).', 'tri_tags' => '태그', 'tri_more' => '관련 읽을거리', 'tri_group_wm' => '언어', 'tri_group_hm' => '문자와 한자음',
    ],
    'zh' => [
        'family' => '语系', 'speakers' => '使用者', 'script' => '文字',
        'region' => '地区', 'countries' => '国家', 'official' => '官方语言',
        'reading' => '读音',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => '活力',
        'aliases' => '别名', 'romanization' => '罗马字',
        'ex_words' => '单词比较', 'ex_wordorder' => '语序比较', 'ex_han' => '汉字读音比较',
        'wo_major' => '与世界主要语言比较', 'wo_close' => '与谱系相近的语言比较',
        'cmp_caption' => '与{family}相关语言比较',
        'ex_prev' => '上一页', 'ex_next' => '下一页', 'ex_page' => '页', 'ex_pick' => '句子',
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
        'words_heading' => '{name}的{w}个核心词',
        'chars_heading' => '{name}的汉字读音',
        'hidden_tag' => '历史／隐藏变体',
        'wm_lang_title' => '{w}个词与发音',
        'hm_lang_title' => '汉字读音',
        'wm_lang_meta' => '在 LangMap Word Map 上，{name}的{w}个核心词发音（含IPA与本地写法）。',
        'hm_lang_meta' => '在 LangMap Han Map 上，{name}的汉字读音。',
        'wm_index_title' => 'Word Map — {n}种语言的{w}个核心词',
        'wm_index_desc' => '在 LangMap Word Map 上浏览{n}种语言及变体的{w}个核心词（水、火、太阳、月亮、母亲…）的发音，含IPA与本地写法。',
        'hm_index_title' => 'Han Map — {n}种语言的汉字读音',
        'hm_index_desc' => '在 LangMap Han Map 上比较{n}种汉语、日语、韩语及越语变体中{c}个核心汉字（一 二 三 日 月 山 水…）的读音。',
        'wm_index_sub' => '{n}种语言及变体的{w}个核心词 — 本地写法与IPA发音。',
        'hm_index_sub' => '{n}种语言及变体中的{c}个核心汉字 — 字形与IPA／罗马字读音。',
        'see_also' => '另见',
        'home' => 'LangMap 主页',
        'hub_title' => 'LangMap — Word Map 与 Han Map（文本索引）',
        'hub_desc' => 'LangMap Word Map 与 Han Map 的可抓取文本索引。各语言的核心词发音与汉字读音。',
        'hub_h1' => 'LangMap 文本索引',
        'hub_sub' => '服务器渲染的、可抓取的各语言摘要。',
        'maps' => '地图',
        'wm_link' => 'Word Map — {w}个核心词',
        'hm_link' => 'Han Map — 汉字读音',
        'nf_title' => '未找到',
        'nf_wm' => 'Word Map 索引',
        'nf_hm' => 'Han Map 索引',
        'tri_link' => '读物', 'tri_brand' => 'LangMap 读物', 'tri_hub_title' => '语言学读物 {n} 篇', 'tri_hub_desc' => '关于罕见、令人惊讶及有争议的语言与文字的长文 {n} 篇，附出处，全文可读。', 'tri_hub_sub' => '关于语言与文字的文章 {n} 篇（附出处）。', 'tri_tags' => '标签', 'tri_more' => '相关读物', 'tri_group_wm' => '语言', 'tri_group_hm' => '文字与汉字音',
    ],
    'yue' => [
        'family' => '語系', 'speakers' => '使用者', 'script' => '文字',
        'region' => '地區', 'countries' => '國家', 'official' => '官方語言',
        'reading' => '讀音',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => '活力',
        'aliases' => '別名', 'romanization' => '羅馬字',
        'ex_words' => '單詞比較', 'ex_wordorder' => '語序比較', 'ex_han' => '漢字讀音比較',
        'wo_major' => '與世界主要語言比較', 'wo_close' => '與譜系相近的語言比較',
        'cmp_caption' => '同{family}相關語言比較',
        'ex_prev' => '上一頁', 'ex_next' => '下一頁', 'ex_page' => '頁', 'ex_pick' => '句子',
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
        'words_heading' => '{name}嘅{w}個核心詞',
        'chars_heading' => '{name}嘅漢字讀音',
        'hidden_tag' => '歷史／隱藏變體',
        'wm_lang_title' => '{w}個詞同發音',
        'hm_lang_title' => '漢字讀音',
        'wm_lang_meta' => '喺 LangMap Word Map 上，{name}嘅{w}個核心詞發音（連IPA同本地寫法）。',
        'hm_lang_meta' => '喺 LangMap Han Map 上，{name}嘅漢字讀音。',
        'wm_index_title' => 'Word Map — {n}種語言嘅{w}個核心詞',
        'wm_index_desc' => '喺 LangMap Word Map 上瀏覽{n}種語言同變體嘅{w}個核心詞（水、火、太陽、月亮、母親…）發音，連IPA同本地寫法。',
        'hm_index_title' => 'Han Map — {n}種語言嘅漢字讀音',
        'hm_index_desc' => '喺 LangMap Han Map 上比較{n}種漢語、日語、韓語同越語變體中{c}個核心漢字（一 二 三 日 月 山 水…）嘅讀音。',
        'wm_index_sub' => '{n}種語言同變體嘅{w}個核心詞 — 本地寫法同IPA發音。',
        'hm_index_sub' => '{n}種語言同變體中嘅{c}個核心漢字 — 字形同IPA／羅馬字讀音。',
        'see_also' => '另見',
        'home' => 'LangMap 主頁',
        'hub_title' => 'LangMap — Word Map 同 Han Map（文本索引）',
        'hub_desc' => 'LangMap Word Map 同 Han Map 嘅可抓取文本索引。各語言嘅核心詞發音同漢字讀音。',
        'hub_h1' => 'LangMap 文本索引',
        'hub_sub' => '伺服器渲染嘅、可抓取嘅各語言摘要。',
        'maps' => '地圖',
        'wm_link' => 'Word Map — {w}個核心詞',
        'hm_link' => 'Han Map — 漢字讀音',
        'nf_title' => '搵唔到',
        'nf_wm' => 'Word Map 索引',
        'nf_hm' => 'Han Map 索引',
        'tri_link' => '讀物', 'tri_brand' => 'LangMap 讀物', 'tri_hub_title' => '語言學讀物 {n} 篇', 'tri_hub_desc' => '關於罕見、令人驚訝同有爭議嘅語言同文字嘅長文 {n} 篇，附出處，全文可讀。', 'tri_hub_sub' => '關於語言同文字嘅文章 {n} 篇（附出處）。', 'tri_tags' => '標籤', 'tri_more' => '相關讀物', 'tri_group_wm' => '語言', 'tri_group_hm' => '文字同漢字音',
    ],
    'vi' => [
        'family' => 'Ngữ hệ', 'speakers' => 'Người nói', 'script' => 'Chữ viết',
        'region' => 'Khu vực', 'countries' => 'Quốc gia', 'official' => 'Ngôn ngữ chính thức',
        'reading' => 'Cách đọc',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Mức độ sống còn',
        'aliases' => 'Còn gọi là', 'romanization' => 'La-tinh hóa',
        'ex_words' => 'So sánh từ vựng', 'ex_wordorder' => 'So sánh trật tự từ', 'ex_han' => 'So sánh âm Hán tự',
        'wo_major' => 'So sánh với các ngôn ngữ lớn trên thế giới', 'wo_close' => 'So sánh với các ngôn ngữ có quan hệ gần gũi',
        'cmp_caption' => 'So sánh với các ngôn ngữ {family} liên quan',
        'ex_prev' => 'Trước', 'ex_next' => 'Sau', 'ex_page' => 'Trang', 'ex_pick' => 'Câu',
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
        'words_heading' => '{w} từ cốt lõi trong {name}',
        'chars_heading' => 'Cách đọc chữ Hán trong {name}',
        'hidden_tag' => 'biến thể lịch sử / ẩn',
        'wm_lang_title' => '{w} từ & cách phát âm',
        'hm_lang_title' => 'Cách đọc chữ Hán',
        'wm_lang_meta' => 'Cách phát âm {w} từ cốt lõi trong {name}, kèm IPA và dạng bản địa, trên LangMap Word Map.',
        'hm_lang_meta' => 'Cách đọc các chữ Hán trong {name} trên LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} từ cốt lõi qua {n} ngôn ngữ',
        'wm_index_desc' => 'Duyệt cách phát âm của {w} từ cốt lõi (nước, lửa, mặt trời, mặt trăng, mẹ…) kèm IPA và dạng bản địa qua {n} ngôn ngữ và biến thể trên LangMap Word Map.',
        'hm_index_title' => 'Han Map — Cách đọc chữ Hán qua {n} ngôn ngữ',
        'hm_index_desc' => 'So sánh cách đọc {c} chữ Hán cốt lõi (一 二 三 日 月 山 水…) qua {n} biến thể Hán, Nhật, Hàn và Việt trên LangMap Han Map.',
        'wm_index_sub' => '{w} từ cốt lõi trong {n} ngôn ngữ và biến thể — dạng bản địa với cách phát âm IPA.',
        'hm_index_sub' => '{c} chữ Hán cốt lõi qua {n} ngôn ngữ và biến thể — dạng chữ với cách đọc IPA / La-tinh hóa.',
        'see_also' => 'Xem thêm',
        'home' => 'Trang chủ LangMap',
        'hub_title' => 'LangMap — Word Map & Han Map (chỉ mục văn bản)',
        'hub_desc' => 'Chỉ mục văn bản có thể thu thập của LangMap Word Map và Han Map: cách phát âm từ cốt lõi và cách đọc chữ Hán theo từng ngôn ngữ.',
        'hub_h1' => 'Chỉ mục văn bản LangMap',
        'hub_sub' => 'Bản tóm tắt từng ngôn ngữ, kết xuất phía máy chủ, có thể thu thập.',
        'maps' => 'Bản đồ',
        'wm_link' => 'Word Map — {w} từ cốt lõi',
        'hm_link' => 'Han Map — Cách đọc chữ Hán',
        'nf_title' => 'Không tìm thấy',
        'nf_wm' => 'Chỉ mục Word Map',
        'nf_hm' => 'Chỉ mục Han Map',
        'tri_link' => 'Bài đọc', 'tri_brand' => 'LangMap Bài đọc', 'tri_hub_title' => '{n} bài viết về ngôn ngữ học', 'tri_hub_desc' => '{n} bài dài về những ngôn ngữ và hệ chữ viết hiếm, bất ngờ và gây tranh cãi — đọc trọn vẹn, có nguồn.', 'tri_hub_sub' => '{n} bài về ngôn ngữ và chữ viết, kèm nguồn.', 'tri_tags' => 'Thẻ', 'tri_more' => 'Đọc thêm', 'tri_group_wm' => 'Ngôn ngữ', 'tri_group_hm' => 'Chữ viết & âm Hán',
    ],
    'th' => [
        'family' => 'ตระกูลภาษา', 'speakers' => 'ผู้พูด', 'script' => 'อักษร',
        'region' => 'ภูมิภาค', 'countries' => 'ประเทศ', 'official' => 'ภาษาราชการ',
        'reading' => 'การอ่าน',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'สถานะความมีชีวิต',
        'aliases' => 'หรือเรียกว่า', 'romanization' => 'การถอดอักษรโรมัน',
        'ex_words' => 'เปรียบเทียบคำศัพท์', 'ex_wordorder' => 'เปรียบเทียบลำดับคำ', 'ex_han' => 'เปรียบเทียบการอ่านอักษรจีน',
        'wo_major' => 'เปรียบเทียบกับภาษาหลักของโลก', 'wo_close' => 'เปรียบเทียบกับภาษาที่มีความสัมพันธ์ใกล้ชิด',
        'cmp_caption' => 'เปรียบเทียบกับภาษาตระกูล {family} ที่เกี่ยวข้อง',
        'ex_prev' => 'ก่อนหน้า', 'ex_next' => 'ถัดไป', 'ex_page' => 'หน้า', 'ex_pick' => 'ประโยค',
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
        'words_heading' => '{w} คำหลักใน {name}',
        'chars_heading' => 'การอ่านอักษรจีนใน {name}',
        'hidden_tag' => 'รูปแบบทางประวัติศาสตร์ / ที่ซ่อน',
        'wm_lang_title' => '{w} คำและการออกเสียง',
        'hm_lang_title' => 'การอ่านอักษรจีน',
        'wm_lang_meta' => 'การออกเสียง {w} คำหลักใน {name} พร้อม IPA และรูปท้องถิ่น บน LangMap Word Map',
        'hm_lang_meta' => 'การอ่านอักษรจีนใน {name} บน LangMap Han Map',
        'wm_index_title' => 'Word Map — {w} คำหลักใน {n} ภาษา',
        'wm_index_desc' => 'เรียกดูการออกเสียงของ {w} คำหลัก (น้ำ ไฟ ดวงอาทิตย์ ดวงจันทร์ แม่…) พร้อม IPA และรูปท้องถิ่นใน {n} ภาษาและรูปแบบ บน LangMap Word Map',
        'hm_index_title' => 'Han Map — การอ่านอักษรจีนใน {n} ภาษา',
        'hm_index_desc' => 'เปรียบเทียบการอ่าน {c} อักษรจีนหลัก (一 二 三 日 月 山 水…) ใน {n} รูปแบบจีน ญี่ปุ่น เกาหลี และเวียดนาม บน LangMap Han Map',
        'wm_index_sub' => '{w} คำหลักใน {n} ภาษาและรูปแบบ — รูปท้องถิ่นพร้อมการออกเสียง IPA',
        'hm_index_sub' => '{c} อักษรจีนหลักใน {n} ภาษาและรูปแบบ — รูปอักษรพร้อมการอ่าน IPA / อักษรโรมัน',
        'see_also' => 'ดูเพิ่มเติม',
        'home' => 'หน้าแรก LangMap',
        'hub_title' => 'LangMap — Word Map และ Han Map (ดัชนีข้อความ)',
        'hub_desc' => 'ดัชนีข้อความที่ค้นเก็บได้ของ LangMap Word Map และ Han Map: การออกเสียงคำหลักและการอ่านอักษรจีนต่อภาษา',
        'hub_h1' => 'ดัชนีข้อความ LangMap',
        'hub_sub' => 'สรุปแต่ละภาษาที่เรนเดอร์ฝั่งเซิร์ฟเวอร์และค้นเก็บได้',
        'maps' => 'แผนที่',
        'wm_link' => 'Word Map — {w} คำหลัก',
        'hm_link' => 'Han Map — การอ่านอักษรจีน',
        'nf_title' => 'ไม่พบ',
        'nf_wm' => 'ดัชนี Word Map',
        'nf_hm' => 'ดัชนี Han Map',
        'tri_link' => 'บทความ', 'tri_brand' => 'LangMap บทความ', 'tri_hub_title' => 'บทความภาษาศาสตร์ {n} เรื่อง', 'tri_hub_desc' => 'บทความยาว {n} เรื่องว่าด้วยภาษาและระบบเขียนที่หายาก น่าประหลาดใจ และเป็นที่ถกเถียง อ่านได้ทั้งเรื่องพร้อมแหล่งอ้างอิง', 'tri_hub_sub' => 'บทความเกี่ยวกับภาษาและอักษร {n} เรื่อง พร้อมแหล่งอ้างอิง', 'tri_tags' => 'แท็ก', 'tri_more' => 'อ่านต่อ', 'tri_group_wm' => 'ภาษา', 'tri_group_hm' => 'อักษรและเสียงอ่านจีน',
    ],
    'id' => [
        'family' => 'Rumpun bahasa', 'speakers' => 'Penutur', 'script' => 'Aksara',
        'region' => 'Wilayah', 'countries' => 'Negara', 'official' => 'Bahasa resmi',
        'reading' => 'Bacaan',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Vitalitas',
        'aliases' => 'Juga dikenal sebagai', 'romanization' => 'Romanisasi',
        'ex_words' => 'Perbandingan kata', 'ex_wordorder' => 'Perbandingan urutan kata', 'ex_han' => 'Perbandingan bacaan Han',
        'wo_major' => 'Bandingkan dengan bahasa utama dunia', 'wo_close' => 'Bandingkan dengan bahasa yang berkerabat dekat',
        'cmp_caption' => 'Dibandingkan dengan bahasa {family} terkait',
        'ex_prev' => 'Sebelumnya', 'ex_next' => 'Berikutnya', 'ex_page' => 'Halaman', 'ex_pick' => 'Kalimat',
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
        'words_heading' => '{w} kata inti dalam {name}',
        'chars_heading' => 'Bacaan aksara Han dalam {name}',
        'hidden_tag' => 'varietas historis / tersembunyi',
        'wm_lang_title' => '{w} kata & pelafalan',
        'hm_lang_title' => 'Bacaan aksara Han',
        'wm_lang_meta' => 'Pelafalan {w} kata inti dalam {name}, dengan IPA dan bentuk lokal, di LangMap Word Map.',
        'hm_lang_meta' => 'Bacaan aksara Han dalam {name} di LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} kata inti di {n} bahasa',
        'wm_index_desc' => 'Jelajahi pelafalan {w} kata inti (air, api, matahari, bulan, ibu…) dengan IPA dan bentuk lokal di {n} bahasa dan varietas di LangMap Word Map.',
        'hm_index_title' => 'Han Map — Bacaan aksara Han di {n} bahasa',
        'hm_index_desc' => 'Bandingkan bacaan {c} aksara Han inti (一 二 三 日 月 山 水…) di {n} varietas Sinitik, Japonik, Koreanik, dan Vietik di LangMap Han Map.',
        'wm_index_sub' => '{w} kata inti di {n} bahasa dan varietas — bentuk lokal dengan pelafalan IPA.',
        'hm_index_sub' => '{c} aksara Han inti di {n} bahasa dan varietas — bentuk aksara dengan bacaan IPA / Latin.',
        'see_also' => 'Lihat juga',
        'home' => 'Beranda LangMap',
        'hub_title' => 'LangMap — Word Map & Han Map (indeks teks)',
        'hub_desc' => 'Indeks teks yang dapat dirayapi dari LangMap Word Map dan Han Map: pelafalan kata inti dan bacaan aksara Han per bahasa.',
        'hub_h1' => 'Indeks teks LangMap',
        'hub_sub' => 'Ringkasan tiap bahasa yang dirender di server dan dapat dirayapi.',
        'maps' => 'Peta',
        'wm_link' => 'Word Map — {w} kata inti',
        'hm_link' => 'Han Map — Bacaan aksara Han',
        'nf_title' => 'Tidak ditemukan',
        'nf_wm' => 'Indeks Word Map',
        'nf_hm' => 'Indeks Han Map',
        'tri_link' => 'Bacaan', 'tri_brand' => 'LangMap Bacaan', 'tri_hub_title' => '{n} artikel linguistik', 'tri_hub_desc' => '{n} artikel panjang tentang bahasa dan aksara yang langka, mengejutkan, dan diperdebatkan — lengkap dengan sumber.', 'tri_hub_sub' => '{n} artikel tentang bahasa dan aksara, dengan sumber.', 'tri_tags' => 'Tag', 'tri_more' => 'Bacaan terkait', 'tri_group_wm' => 'Bahasa', 'tri_group_hm' => 'Aksara & bacaan Han',
    ],
    'hi' => [
        'family' => 'भाषा परिवार', 'speakers' => 'वक्ता', 'script' => 'लिपि',
        'region' => 'क्षेत्र', 'countries' => 'देश', 'official' => 'आधिकारिक भाषा',
        'reading' => 'पठन',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'जीवंतता',
        'aliases' => 'अन्य नाम', 'romanization' => 'रोमनकरण',
        'ex_words' => 'शब्दों की तुलना', 'ex_wordorder' => 'शब्द-क्रम की तुलना', 'ex_han' => 'हान पठन की तुलना',
        'wo_major' => 'विश्व की प्रमुख भाषाओं से तुलना करें', 'wo_close' => 'निकट संबंधी भाषाओं से तुलना करें',
        'cmp_caption' => '{family} संबंधित भाषाओं से तुलना',
        'ex_prev' => 'पिछला', 'ex_next' => 'अगला', 'ex_page' => 'पृष्ठ', 'ex_pick' => 'वाक्य',
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
        'words_heading' => '{name} में {w} मूल शब्द',
        'chars_heading' => '{name} में हान वर्णों की पठन',
        'hidden_tag' => 'ऐतिहासिक / छिपी किस्म',
        'wm_lang_title' => '{w} शब्द और उच्चारण',
        'hm_lang_title' => 'हान वर्णों की पठन',
        'wm_lang_meta' => 'LangMap Word Map पर {name} में {w} मूल शब्दों के उच्चारण, IPA और मूल रूपों सहित।',
        'hm_lang_meta' => 'LangMap Han Map पर {name} में हान वर्णों की पठन।',
        'wm_index_title' => 'Word Map — {n} भाषाओं में {w} मूल शब्द',
        'wm_index_desc' => 'LangMap Word Map पर {n} भाषाओं और किस्मों में {w} मूल शब्दों (पानी, आग, सूर्य, चंद्रमा, माँ…) के उच्चारण IPA और मूल रूपों सहित देखें।',
        'hm_index_title' => 'Han Map — {n} भाषाओं में हान वर्णों की पठन',
        'hm_index_desc' => 'LangMap Han Map पर {n} सिनिटिक, जापोनिक, कोरियाई और वियतनामी किस्मों में {c} मूल हान वर्णों (一 二 三 日 月 山 水…) की पठन की तुलना करें।',
        'wm_index_sub' => '{n} भाषाओं और किस्मों में {w} मूल शब्द — IPA उच्चारण सहित मूल रूप।',
        'hm_index_sub' => '{n} भाषाओं और किस्मों में {c} मूल हान वर्ण — IPA / रोमन पठन सहित वर्ण रूप।',
        'see_also' => 'यह भी देखें',
        'home' => 'LangMap होम',
        'hub_title' => 'LangMap — Word Map और Han Map (पाठ सूचकांक)',
        'hub_desc' => 'LangMap Word Map और Han Map का क्रॉल-योग्य पाठ सूचकांक: प्रति भाषा मूल-शब्द उच्चारण और हान-वर्ण पठन।',
        'hub_h1' => 'LangMap पाठ सूचकांक',
        'hub_sub' => 'सर्वर-रेंडर किए गए, प्रत्येक भाषा के क्रॉल-योग्य सारांश।',
        'maps' => 'मानचित्र',
        'wm_link' => 'Word Map — {w} मूल शब्द',
        'hm_link' => 'Han Map — हान वर्णों की पठन',
        'nf_title' => 'नहीं मिला',
        'nf_wm' => 'Word Map सूचकांक',
        'nf_hm' => 'Han Map सूचकांक',
        'tri_link' => 'पठन सामग्री', 'tri_brand' => 'LangMap पठन सामग्री', 'tri_hub_title' => 'भाषाविज्ञान के {n} लेख', 'tri_hub_desc' => 'दुर्लभ, चौंकाने वाली और विवादित भाषाओं व लिपियों पर {n} विस्तृत लेख — स्रोतों सहित पूरा पाठ।', 'tri_hub_sub' => 'भाषाओं और लिपियों पर {n} लेख, स्रोतों सहित।', 'tri_tags' => 'टैग', 'tri_more' => 'इससे जुड़े लेख', 'tri_group_wm' => 'भाषाएँ', 'tri_group_hm' => 'लिपियाँ और हान उच्चारण',
    ],
    'de' => [
        'family' => 'Sprachfamilie', 'speakers' => 'Sprecher', 'script' => 'Schrift',
        'region' => 'Region', 'countries' => 'Länder', 'official' => 'Amtssprache in',
        'reading' => 'Lesung',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Vitalität',
        'aliases' => 'Auch bekannt als', 'romanization' => 'Umschrift',
        'ex_words' => 'Wörter im Vergleich', 'ex_wordorder' => 'Wortstellung im Vergleich', 'ex_han' => 'Han-Lesungen im Vergleich',
        'wo_major' => 'Mit den wichtigsten Weltsprachen vergleichen', 'wo_close' => 'Mit nah verwandten Sprachen vergleichen',
        'cmp_caption' => 'Verglichen mit verwandten {family}-Sprachen',
        'ex_prev' => 'Zurück', 'ex_next' => 'Weiter', 'ex_page' => 'Seite', 'ex_pick' => 'Satz',
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
        'words_heading' => '{w} Kernwörter in {name}',
        'chars_heading' => 'Lesungen der Han-Zeichen in {name}',
        'hidden_tag' => 'historische / verborgene Varietät',
        'wm_lang_title' => '{w} Wörter & Aussprache',
        'hm_lang_title' => 'Lesungen der Han-Zeichen',
        'wm_lang_meta' => 'Aussprache von {w} Kernwörtern in {name}, mit IPA und einheimischen Formen, auf der LangMap Word Map.',
        'hm_lang_meta' => 'Lesungen der Han-Zeichen in {name} auf der LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} Kernwörter in {n} Sprachen',
        'wm_index_desc' => 'Durchstöbern Sie die Aussprache von {w} Kernwörtern (Wasser, Feuer, Sonne, Mond, Mutter…) mit IPA und einheimischen Formen in {n} Sprachen und Varietäten auf der LangMap Word Map.',
        'hm_index_title' => 'Han Map — Lesungen der Han-Zeichen in {n} Sprachen',
        'hm_index_desc' => 'Vergleichen Sie die Lesungen von {c} Kern-Han-Zeichen (一 二 三 日 月 山 水…) in {n} sinitischen, japonischen, koreanischen und vietischen Varietäten auf der LangMap Han Map.',
        'wm_index_sub' => '{w} Kernwörter in {n} Sprachen und Varietäten — einheimische Formen mit IPA-Aussprache.',
        'hm_index_sub' => '{c} Kern-Han-Zeichen in {n} Sprachen und Varietäten — Schriftformen mit IPA- / romanisierten Lesungen.',
        'see_also' => 'Siehe auch',
        'home' => 'LangMap Startseite',
        'hub_title' => 'LangMap — Word Map & Han Map (Textindex)',
        'hub_desc' => 'Crawlbarer Textindex der LangMap Word Map und Han Map: Aussprache von Kernwörtern und Lesungen der Han-Zeichen pro Sprache.',
        'hub_h1' => 'LangMap Textindex',
        'hub_sub' => 'Serverseitig gerenderte, crawlbare Zusammenfassungen jeder Sprache.',
        'maps' => 'Karten',
        'wm_link' => 'Word Map — {w} Kernwörter',
        'hm_link' => 'Han Map — Lesungen der Han-Zeichen',
        'nf_title' => 'Nicht gefunden',
        'nf_wm' => 'Word-Map-Index',
        'nf_hm' => 'Han-Map-Index',
        'tri_link' => 'Lesestoff', 'tri_brand' => 'LangMap Lesestoff', 'tri_hub_title' => '{n} sprachwissenschaftliche Artikel', 'tri_hub_desc' => '{n} ausführliche Artikel über seltene, überraschende und umstrittene Sprachen und Schriften — vollständig lesbar, mit Quellen.', 'tri_hub_sub' => '{n} Artikel über Sprachen und Schriftsysteme, mit Quellen.', 'tri_tags' => 'Schlagwörter', 'tri_more' => 'Mehr dazu', 'tri_group_wm' => 'Sprachen', 'tri_group_hm' => 'Schriften & Han-Lesungen',
    ],
    'fr' => [
        'family' => 'Famille', 'speakers' => 'Locuteurs', 'script' => 'Écriture',
        'region' => 'Région', 'countries' => 'Pays', 'official' => 'Langue officielle',
        'reading' => 'Lecture',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Vitalité',
        'aliases' => 'Aussi appelé', 'romanization' => 'Romanisation',
        'ex_words' => 'Mots comparés', 'ex_wordorder' => 'Ordre des mots comparé', 'ex_han' => 'Lectures han comparées',
        'wo_major' => 'Comparer avec les grandes langues du monde', 'wo_close' => 'Comparer avec des langues proches',
        'cmp_caption' => 'Comparé aux langues {family} apparentées',
        'ex_prev' => 'Préc.', 'ex_next' => 'Suiv.', 'ex_page' => 'Page', 'ex_pick' => 'Phrase',
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
        'words_heading' => '{w} mots essentiels en {name}',
        'chars_heading' => 'Lectures des caractères han en {name}',
        'hidden_tag' => 'variété historique / masquée',
        'wm_lang_title' => '{w} mots & prononciations',
        'hm_lang_title' => 'Lectures des caractères han',
        'wm_lang_meta' => 'Prononciations de {w} mots essentiels en {name}, avec API et formes natives, sur la LangMap Word Map.',
        'hm_lang_meta' => 'Lectures des caractères han en {name} sur la LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} mots essentiels dans {n} langues',
        'wm_index_desc' => 'Parcourez les prononciations de {w} mots essentiels (eau, feu, soleil, lune, mère…) avec API et formes natives dans {n} langues et variétés sur la LangMap Word Map.',
        'hm_index_title' => 'Han Map — Lectures des caractères han dans {n} langues',
        'hm_index_desc' => 'Comparez les lectures de {c} caractères han essentiels (一 二 三 日 月 山 水…) dans {n} variétés sinitiques, japoniques, coréaniques et viétiques sur la LangMap Han Map.',
        'wm_index_sub' => '{w} mots essentiels dans {n} langues et variétés — formes natives avec prononciation API.',
        'hm_index_sub' => '{c} caractères han essentiels dans {n} langues et variétés — formes écrites avec lectures API / romanisées.',
        'see_also' => 'Voir aussi',
        'home' => 'Accueil LangMap',
        'hub_title' => 'LangMap — Word Map & Han Map (index texte)',
        'hub_desc' => 'Index texte explorable de la LangMap Word Map et Han Map : prononciations des mots essentiels et lectures des caractères han par langue.',
        'hub_h1' => 'Index texte LangMap',
        'hub_sub' => 'Résumés de chaque langue, rendus côté serveur et explorables.',
        'maps' => 'Cartes',
        'wm_link' => 'Word Map — {w} mots essentiels',
        'hm_link' => 'Han Map — Lectures des caractères han',
        'nf_title' => 'Introuvable',
        'nf_wm' => 'Index Word Map',
        'nf_hm' => 'Index Han Map',
        'tri_link' => 'Lectures', 'tri_brand' => 'LangMap Lectures', 'tri_hub_title' => '{n} articles de linguistique', 'tri_hub_desc' => '{n} articles de fond sur des langues et des écritures rares, surprenantes ou contestées — texte intégral, avec sources.', 'tri_hub_sub' => '{n} articles sur les langues et les écritures, avec sources.', 'tri_tags' => 'Étiquettes', 'tri_more' => 'À lire aussi', 'tri_group_wm' => 'Langues', 'tri_group_hm' => 'Écritures et lectures han',
    ],
    'it' => [
        'family' => 'Famiglia', 'speakers' => 'Parlanti', 'script' => 'Scrittura',
        'region' => 'Regione', 'countries' => 'Paesi', 'official' => 'Lingua ufficiale',
        'reading' => 'Lettura',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Vitalità',
        'aliases' => 'Noto anche come', 'romanization' => 'Romanizzazione',
        'ex_words' => 'Parole a confronto', 'ex_wordorder' => 'Ordine delle parole a confronto', 'ex_han' => 'Letture han a confronto',
        'wo_major' => 'Confronta con le principali lingue del mondo', 'wo_close' => 'Confronta con lingue strettamente imparentate',
        'cmp_caption' => 'Confrontato con le lingue {family} correlate',
        'ex_prev' => 'Prec.', 'ex_next' => 'Succ.', 'ex_page' => 'Pagina', 'ex_pick' => 'Frase',
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
        'words_heading' => '{w} parole essenziali in {name}',
        'chars_heading' => 'Letture dei caratteri han in {name}',
        'hidden_tag' => 'varietà storica / nascosta',
        'wm_lang_title' => '{w} parole & pronunce',
        'hm_lang_title' => 'Letture dei caratteri han',
        'wm_lang_meta' => 'Pronunce di {w} parole essenziali in {name}, con IPA e forme native, sulla LangMap Word Map.',
        'hm_lang_meta' => 'Letture dei caratteri han in {name} sulla LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} parole essenziali in {n} lingue',
        'wm_index_desc' => 'Sfoglia le pronunce di {w} parole essenziali (acqua, fuoco, sole, luna, madre…) con IPA e forme native in {n} lingue e varietà sulla LangMap Word Map.',
        'hm_index_title' => 'Han Map — Letture dei caratteri han in {n} lingue',
        'hm_index_desc' => 'Confronta le letture di {c} caratteri han essenziali (一 二 三 日 月 山 水…) in {n} varietà sinitiche, giapponiche, coreaniche e vietiche sulla LangMap Han Map.',
        'wm_index_sub' => '{w} parole essenziali in {n} lingue e varietà — forme native con pronuncia IPA.',
        'hm_index_sub' => '{c} caratteri han essenziali in {n} lingue e varietà — forme scritte con letture IPA / romanizzate.',
        'see_also' => 'Vedi anche',
        'home' => 'Home LangMap',
        'hub_title' => 'LangMap — Word Map & Han Map (indice testuale)',
        'hub_desc' => 'Indice testuale scansionabile della LangMap Word Map e Han Map: pronunce delle parole essenziali e letture dei caratteri han per lingua.',
        'hub_h1' => 'Indice testuale LangMap',
        'hub_sub' => 'Riepiloghi di ciascuna lingua, resi lato server e scansionabili.',
        'maps' => 'Mappe',
        'wm_link' => 'Word Map — {w} parole essenziali',
        'hm_link' => 'Han Map — Letture dei caratteri han',
        'nf_title' => 'Non trovato',
        'nf_wm' => 'Indice Word Map',
        'nf_hm' => 'Indice Han Map',
        'tri_link' => 'Letture', 'tri_brand' => 'LangMap Letture', 'tri_hub_title' => '{n} articoli di linguistica', 'tri_hub_desc' => '{n} articoli approfonditi su lingue e scritture rare, sorprendenti e controverse — testo integrale, con fonti.', 'tri_hub_sub' => '{n} articoli su lingue e sistemi di scrittura, con fonti.', 'tri_tags' => 'Etichette', 'tri_more' => 'Da leggere ancora', 'tri_group_wm' => 'Lingue', 'tri_group_hm' => 'Scritture e letture han',
    ],
    'es' => [
        'family' => 'Familia', 'speakers' => 'Hablantes', 'script' => 'Escritura',
        'region' => 'Región', 'countries' => 'Países', 'official' => 'Lengua oficial',
        'reading' => 'Lectura',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Vitalidad',
        'aliases' => 'También conocido como', 'romanization' => 'Romanización',
        'ex_words' => 'Palabras comparadas', 'ex_wordorder' => 'Orden de palabras comparado', 'ex_han' => 'Lecturas han comparadas',
        'wo_major' => 'Comparar con las principales lenguas del mundo', 'wo_close' => 'Comparar con lenguas estrechamente emparentadas',
        'cmp_caption' => 'Comparado con lenguas {family} relacionadas',
        'ex_prev' => 'Ant.', 'ex_next' => 'Sig.', 'ex_page' => 'Página', 'ex_pick' => 'Frase',
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
        'words_heading' => '{w} palabras esenciales en {name}',
        'chars_heading' => 'Lecturas de caracteres han en {name}',
        'hidden_tag' => 'variedad histórica / oculta',
        'wm_lang_title' => '{w} palabras y pronunciaciones',
        'hm_lang_title' => 'Lecturas de caracteres han',
        'wm_lang_meta' => 'Pronunciaciones de {w} palabras esenciales en {name}, con AFI y formas nativas, en el LangMap Word Map.',
        'hm_lang_meta' => 'Lecturas de caracteres han en {name} en el LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} palabras esenciales en {n} lenguas',
        'wm_index_desc' => 'Explora las pronunciaciones de {w} palabras esenciales (agua, fuego, sol, luna, madre…) con AFI y formas nativas en {n} lenguas y variedades en el LangMap Word Map.',
        'hm_index_title' => 'Han Map — Lecturas de caracteres han en {n} lenguas',
        'hm_index_desc' => 'Compara las lecturas de {c} caracteres han esenciales (一 二 三 日 月 山 水…) en {n} variedades siníticas, japónicas, coreánicas y vieticas en el LangMap Han Map.',
        'wm_index_sub' => '{w} palabras esenciales en {n} lenguas y variedades — formas nativas con pronunciación AFI.',
        'hm_index_sub' => '{c} caracteres han esenciales en {n} lenguas y variedades — formas escritas con lecturas AFI / romanizadas.',
        'see_also' => 'Véase también',
        'home' => 'Inicio de LangMap',
        'hub_title' => 'LangMap — Word Map y Han Map (índice de texto)',
        'hub_desc' => 'Índice de texto rastreable del LangMap Word Map y Han Map: pronunciaciones de palabras esenciales y lecturas de caracteres han por lengua.',
        'hub_h1' => 'Índice de texto LangMap',
        'hub_sub' => 'Resúmenes de cada lengua, renderizados en el servidor y rastreables.',
        'maps' => 'Mapas',
        'wm_link' => 'Word Map — {w} palabras esenciales',
        'hm_link' => 'Han Map — Lecturas de caracteres han',
        'nf_title' => 'No encontrado',
        'nf_wm' => 'Índice Word Map',
        'nf_hm' => 'Índice Han Map',
        'tri_link' => 'Lecturas', 'tri_brand' => 'LangMap Lecturas', 'tri_hub_title' => '{n} artículos de lingüística', 'tri_hub_desc' => '{n} artículos extensos sobre lenguas y escrituras raras, sorprendentes y discutidas — texto completo, con fuentes.', 'tri_hub_sub' => '{n} artículos sobre lenguas y sistemas de escritura, con fuentes.', 'tri_tags' => 'Etiquetas', 'tri_more' => 'Seguir leyendo', 'tri_group_wm' => 'Lenguas', 'tri_group_hm' => 'Escrituras y lecturas han',
    ],
    'pt' => [
        'family' => 'Família', 'speakers' => 'Falantes', 'script' => 'Escrita',
        'region' => 'Região', 'countries' => 'Países', 'official' => 'Língua oficial',
        'reading' => 'Leitura',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Vitalidade',
        'aliases' => 'Também conhecido como', 'romanization' => 'Romanização',
        'ex_words' => 'Palavras comparadas', 'ex_wordorder' => 'Ordem das palavras comparada', 'ex_han' => 'Leituras han comparadas',
        'wo_major' => 'Comparar com as principais línguas do mundo', 'wo_close' => 'Comparar com línguas proximamente aparentadas',
        'cmp_caption' => 'Comparado com línguas {family} relacionadas',
        'ex_prev' => 'Ant.', 'ex_next' => 'Próx.', 'ex_page' => 'Página', 'ex_pick' => 'Frase',
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
        'words_heading' => '{w} palavras essenciais em {name}',
        'chars_heading' => 'Leituras de caracteres han em {name}',
        'hidden_tag' => 'variedade histórica / oculta',
        'wm_lang_title' => '{w} palavras e pronúncias',
        'hm_lang_title' => 'Leituras de caracteres han',
        'wm_lang_meta' => 'Pronúncias de {w} palavras essenciais em {name}, com AFI e formas nativas, no LangMap Word Map.',
        'hm_lang_meta' => 'Leituras de caracteres han em {name} no LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} palavras essenciais em {n} línguas',
        'wm_index_desc' => 'Navegue pelas pronúncias de {w} palavras essenciais (água, fogo, sol, lua, mãe…) com AFI e formas nativas em {n} línguas e variedades no LangMap Word Map.',
        'hm_index_title' => 'Han Map — Leituras de caracteres han em {n} línguas',
        'hm_index_desc' => 'Compare as leituras de {c} caracteres han essenciais (一 二 三 日 月 山 水…) em {n} variedades siníticas, japónicas, coreânicas e viéticas no LangMap Han Map.',
        'wm_index_sub' => '{w} palavras essenciais em {n} línguas e variedades — formas nativas com pronúncia AFI.',
        'hm_index_sub' => '{c} caracteres han essenciais em {n} línguas e variedades — formas escritas com leituras AFI / romanizadas.',
        'see_also' => 'Veja também',
        'home' => 'Início do LangMap',
        'hub_title' => 'LangMap — Word Map e Han Map (índice de texto)',
        'hub_desc' => 'Índice de texto rastreável do LangMap Word Map e Han Map: pronúncias de palavras essenciais e leituras de caracteres han por língua.',
        'hub_h1' => 'Índice de texto LangMap',
        'hub_sub' => 'Resumos de cada língua, renderizados no servidor e rastreáveis.',
        'maps' => 'Mapas',
        'wm_link' => 'Word Map — {w} palavras essenciais',
        'hm_link' => 'Han Map — Leituras de caracteres han',
        'nf_title' => 'Não encontrado',
        'nf_wm' => 'Índice Word Map',
        'nf_hm' => 'Índice Han Map',
        'tri_link' => 'Leituras', 'tri_brand' => 'LangMap Leituras', 'tri_hub_title' => '{n} artigos de linguística', 'tri_hub_desc' => '{n} artigos longos sobre línguas e escritas raras, surpreendentes e contestadas — texto integral, com fontes.', 'tri_hub_sub' => '{n} artigos sobre línguas e sistemas de escrita, com fontes.', 'tri_tags' => 'Etiquetas', 'tri_more' => 'Leia também', 'tri_group_wm' => 'Línguas', 'tri_group_hm' => 'Escritas e leituras han',
    ],
    'ru' => [
        'family' => 'Семья', 'speakers' => 'Носители', 'script' => 'Письмо',
        'region' => 'Регион', 'countries' => 'Страны', 'official' => 'Официальный язык',
        'reading' => 'Чтение',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Жизнеспособность',
        'aliases' => 'Также известен как', 'romanization' => 'Латинизация',
        'ex_words' => 'Сравнение слов', 'ex_wordorder' => 'Сравнение порядка слов', 'ex_han' => 'Сравнение чтений ханьцзы',
        'wo_major' => 'Сравнить с основными языками мира', 'wo_close' => 'Сравнить с близкородственными языками',
        'cmp_caption' => 'Сравнение с родственными языками {family}',
        'ex_prev' => 'Назад', 'ex_next' => 'Вперёд', 'ex_page' => 'Страница', 'ex_pick' => 'Предложение',
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
        'words_heading' => '{w} основных слов на языке {name}',
        'chars_heading' => 'Чтения ханьских иероглифов на языке {name}',
        'hidden_tag' => 'историческая / скрытая разновидность',
        'wm_lang_title' => '{w} слов и произношение',
        'hm_lang_title' => 'Чтения ханьских иероглифов',
        'wm_lang_meta' => 'Произношение {w} основных слов на языке {name}, с МФА и исконными формами, на LangMap Word Map.',
        'hm_lang_meta' => 'Чтения ханьских иероглифов на языке {name} на LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} основных слов в {n} языках',
        'wm_index_desc' => 'Просматривайте произношение {w} основных слов (вода, огонь, солнце, луна, мать…) с МФА и исконными формами в {n} языках и разновидностях на LangMap Word Map.',
        'hm_index_title' => 'Han Map — Чтения ханьских иероглифов в {n} языках',
        'hm_index_desc' => 'Сравните чтения {c} основных ханьских иероглифов (一 二 三 日 月 山 水…) в {n} синитских, японских, корейских и вьетских разновидностях на LangMap Han Map.',
        'wm_index_sub' => '{w} основных слов в {n} языках и разновидностях — исконные формы с произношением МФА.',
        'hm_index_sub' => '{c} основных ханьских иероглифов в {n} языках и разновидностях — формы письма с чтениями МФА / латиницей.',
        'see_also' => 'См. также',
        'home' => 'Главная LangMap',
        'hub_title' => 'LangMap — Word Map и Han Map (текстовый указатель)',
        'hub_desc' => 'Индексируемый текстовый указатель LangMap Word Map и Han Map: произношение основных слов и чтения ханьских иероглифов по языкам.',
        'hub_h1' => 'Текстовый указатель LangMap',
        'hub_sub' => 'Отрендеренные на сервере, индексируемые сводки по каждому языку.',
        'maps' => 'Карты',
        'wm_link' => 'Word Map — {w} основных слов',
        'hm_link' => 'Han Map — Чтения ханьских иероглифов',
        'nf_title' => 'Не найдено',
        'nf_wm' => 'Указатель Word Map',
        'nf_hm' => 'Указатель Han Map',
        'tri_link' => 'Статьи', 'tri_brand' => 'LangMap Статьи', 'tri_hub_title' => '{n} лингвистических статей', 'tri_hub_desc' => '{n} развёрнутых статей о редких, неожиданных и спорных языках и системах письма — полный текст с источниками.', 'tri_hub_sub' => '{n} статей о языках и письменностях, с источниками.', 'tri_tags' => 'Теги', 'tri_more' => 'Ещё по теме', 'tri_group_wm' => 'Языки', 'tri_group_hm' => 'Письменности и ханьские чтения',
    ],
    'uk' => [
        'family' => 'Сім’я', 'speakers' => 'Носії', 'script' => 'Письмо',
        'region' => 'Регіон', 'countries' => 'Країни', 'official' => 'Офіційна мова',
        'reading' => 'Читання',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Життєздатність',
        'aliases' => 'Також відомий як', 'romanization' => 'Латинізація',
        'ex_words' => 'Порівняння слів', 'ex_wordorder' => 'Порівняння порядку слів', 'ex_han' => 'Порівняння читань ханьцзи',
        'wo_major' => 'Порівняти з основними мовами світу', 'wo_close' => 'Порівняти з близькоспорідненими мовами',
        'cmp_caption' => 'Порівняння зі спорідненими мовами {family}',
        'ex_prev' => 'Назад', 'ex_next' => 'Далі', 'ex_page' => 'Сторінка', 'ex_pick' => 'Речення',
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
        'words_heading' => '{w} основних слів мовою {name}',
        'chars_heading' => 'Читання ханьських ієрогліфів мовою {name}',
        'hidden_tag' => 'історичний / прихований різновид',
        'wm_lang_title' => '{w} слів і вимова',
        'hm_lang_title' => 'Читання ханьських ієрогліфів',
        'wm_lang_meta' => 'Вимова {w} основних слів мовою {name}, з МФА та питомими формами, на LangMap Word Map.',
        'hm_lang_meta' => 'Читання ханьських ієрогліфів мовою {name} на LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} основних слів у {n} мовах',
        'wm_index_desc' => 'Переглядайте вимову {w} основних слів (вода, вогонь, сонце, місяць, мати…) з МФА та питомими формами у {n} мовах і різновидах на LangMap Word Map.',
        'hm_index_title' => 'Han Map — Читання ханьських ієрогліфів у {n} мовах',
        'hm_index_desc' => 'Порівняйте читання {c} основних ханьських ієрогліфів (一 二 三 日 月 山 水…) у {n} синітських, японських, корейських і в’єтських різновидах на LangMap Han Map.',
        'wm_index_sub' => '{w} основних слів у {n} мовах і різновидах — питомі форми з вимовою МФА.',
        'hm_index_sub' => '{c} основних ханьських ієрогліфів у {n} мовах і різновидах — форми письма з читаннями МФА / латиницею.',
        'see_also' => 'Див. також',
        'home' => 'Головна LangMap',
        'hub_title' => 'LangMap — Word Map і Han Map (текстовий покажчик)',
        'hub_desc' => 'Індексований текстовий покажчик LangMap Word Map і Han Map: вимова основних слів і читання ханьських ієрогліфів за мовами.',
        'hub_h1' => 'Текстовий покажчик LangMap',
        'hub_sub' => 'Відрендерені на сервері, індексовані зведення кожної мови.',
        'maps' => 'Карти',
        'wm_link' => 'Word Map — {w} основних слів',
        'hm_link' => 'Han Map — Читання ханьських ієрогліфів',
        'nf_title' => 'Не знайдено',
        'nf_wm' => 'Покажчик Word Map',
        'nf_hm' => 'Покажчик Han Map',
        'tri_link' => 'Статті', 'tri_brand' => 'LangMap Статті', 'tri_hub_title' => '{n} лінгвістичних статей', 'tri_hub_desc' => '{n} розлогих статей про рідкісні, несподівані та спірні мови й системи письма — повний текст із джерелами.', 'tri_hub_sub' => '{n} статей про мови та писемності, із джерелами.', 'tri_tags' => 'Теги', 'tri_more' => 'Ще за темою', 'tri_group_wm' => 'Мови', 'tri_group_hm' => 'Писемності й ханьські читання',
    ],
    'ar' => [
        'family' => 'العائلة', 'speakers' => 'المتحدثون', 'script' => 'الكتابة',
        'region' => 'المنطقة', 'countries' => 'البلدان', 'official' => 'لغة رسمية في',
        'reading' => 'القراءة',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'الحيوية',
        'aliases' => 'يُعرف أيضًا بـ', 'romanization' => 'الكتابة اللاتينية',
        'ex_words' => 'مقارنة الكلمات', 'ex_wordorder' => 'مقارنة ترتيب الكلمات', 'ex_han' => 'مقارنة قراءات الهان',
        'wo_major' => 'قارن مع كبرى لغات العالم', 'wo_close' => 'قارن مع لغات وثيقة القرابة',
        'cmp_caption' => 'بالمقارنة مع لغات {family} ذات الصلة',
        'ex_prev' => 'السابق', 'ex_next' => 'التالي', 'ex_page' => 'صفحة', 'ex_pick' => 'جملة',
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
        'words_heading' => '{w} كلمة أساسية في {name}',
        'chars_heading' => 'قراءات الحروف الهانية في {name}',
        'hidden_tag' => 'نوع تاريخي / مخفي',
        'wm_lang_title' => '{w} كلمة والنطق',
        'hm_lang_title' => 'قراءات الحروف الهانية',
        'wm_lang_meta' => 'نطق {w} كلمة أساسية في {name}، مع الأبجدية الصوتية الدولية والأشكال المحلية، على LangMap Word Map.',
        'hm_lang_meta' => 'قراءات الحروف الهانية في {name} على LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} كلمة أساسية عبر {n} لغة',
        'wm_index_desc' => 'تصفّح نطق {w} كلمة أساسية (ماء، نار، شمس، قمر، أم…) مع الأبجدية الصوتية الدولية والأشكال المحلية عبر {n} لغة ولهجة على LangMap Word Map.',
        'hm_index_title' => 'Han Map — قراءات الحروف الهانية عبر {n} لغة',
        'hm_index_desc' => 'قارن قراءات {c} حرفًا هانيًا أساسيًا (一 二 三 日 月 山 水…) عبر {n} لهجة صينية ويابانية وكورية وفيتنامية على LangMap Han Map.',
        'wm_index_sub' => '{w} كلمة أساسية عبر {n} لغة ولهجة — أشكال محلية مع نطق الأبجدية الصوتية الدولية.',
        'hm_index_sub' => '{c} حرفًا هانيًا أساسيًا عبر {n} لغة ولهجة — أشكال مكتوبة مع قراءات الأبجدية الصوتية الدولية / رومنة.',
        'see_also' => 'انظر أيضًا',
        'home' => 'الصفحة الرئيسية LangMap',
        'hub_title' => 'LangMap — Word Map و Han Map (فهرس نصي)',
        'hub_desc' => 'فهرس نصي قابل للفهرسة لـ LangMap Word Map و Han Map: نطق الكلمات الأساسية وقراءات الحروف الهانية لكل لغة.',
        'hub_h1' => 'فهرس LangMap النصي',
        'hub_sub' => 'ملخصات لكل لغة، معروضة من الخادم وقابلة للفهرسة.',
        'maps' => 'الخرائط',
        'wm_link' => 'Word Map — {w} كلمة أساسية',
        'hm_link' => 'Han Map — قراءات الحروف الهانية',
        'nf_title' => 'غير موجود',
        'nf_wm' => 'فهرس Word Map',
        'nf_hm' => 'فهرس Han Map',
        'tri_link' => 'مقالات', 'tri_brand' => 'مقالات LangMap', 'tri_hub_title' => '{n} مقالة في اللسانيات', 'tri_hub_desc' => '{n} مقالة مطوّلة عن لغات وكتابات نادرة ومدهشة ومختلَف فيها — نص كامل مع المصادر.', 'tri_hub_sub' => '{n} مقالة عن اللغات وأنظمة الكتابة، مع المصادر.', 'tri_tags' => 'وسوم', 'tri_more' => 'مزيد حول هذا', 'tri_group_wm' => 'اللغات', 'tri_group_hm' => 'الكتابات وقراءات الهان',
    ],
    'he' => [
        'family' => 'משפחה', 'speakers' => 'דוברים', 'script' => 'כתב',
        'region' => 'אזור', 'countries' => 'מדינות', 'official' => 'שפה רשמית',
        'reading' => 'קריאה',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'חיוניות',
        'aliases' => 'ידוע גם כ', 'romanization' => 'תעתיק לטיני',
        'ex_words' => 'השוואת מילים', 'ex_wordorder' => 'השוואת סדר מילים', 'ex_han' => 'השוואת קריאות האן',
        'wo_major' => 'השוואה לשפות העולם המרכזיות', 'wo_close' => 'השוואה לשפות קרובות גנטית',
        'cmp_caption' => 'בהשוואה לשפות {family} קשורות',
        'ex_prev' => 'הקודם', 'ex_next' => 'הבא', 'ex_page' => 'עמוד', 'ex_pick' => 'משפט',
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
        'words_heading' => '{w} מילים בסיסיות ב{name}',
        'chars_heading' => 'קריאות תווי האן ב{name}',
        'hidden_tag' => 'גרסה היסטורית / מוסתרת',
        'wm_lang_title' => '{w} מילים והגייה',
        'hm_lang_title' => 'קריאות תווי האן',
        'wm_lang_meta' => 'הגיית {w} מילים בסיסיות ב{name}, עם IPA וצורות מקומיות, ב-LangMap Word Map.',
        'hm_lang_meta' => 'קריאות תווי האן ב{name} ב-LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} מילים בסיסיות ב-{n} שפות',
        'wm_index_desc' => 'עיינו בהגייה של {w} מילים בסיסיות (מים, אש, שמש, ירח, אם…) עם IPA וצורות מקומיות ב-{n} שפות וגרסאות ב-LangMap Word Map.',
        'hm_index_title' => 'Han Map — קריאות תווי האן ב-{n} שפות',
        'hm_index_desc' => 'השוו את קריאות {c} תווי האן הבסיסיים (一 二 三 日 月 山 水…) ב-{n} גרסאות סיניות, יפניות, קוריאניות ווייטנאמיות ב-LangMap Han Map.',
        'wm_index_sub' => '{w} מילים בסיסיות ב-{n} שפות וגרסאות — צורות מקומיות עם הגיית IPA.',
        'hm_index_sub' => '{c} תווי האן בסיסיים ב-{n} שפות וגרסאות — צורות כתב עם קריאות IPA / לטיניות.',
        'see_also' => 'ראו גם',
        'home' => 'דף הבית של LangMap',
        'hub_title' => 'LangMap — Word Map ו-Han Map (אינדקס טקסט)',
        'hub_desc' => 'אינדקס טקסט הניתן לסריקה של LangMap Word Map ו-Han Map: הגיית מילים בסיסיות וקריאות תווי האן לכל שפה.',
        'hub_h1' => 'אינדקס הטקסט של LangMap',
        'hub_sub' => 'סיכומים של כל שפה, מעובדים בצד השרת וניתנים לסריקה.',
        'maps' => 'מפות',
        'wm_link' => 'Word Map — {w} מילים בסיסיות',
        'hm_link' => 'Han Map — קריאות תווי האן',
        'nf_title' => 'לא נמצא',
        'nf_wm' => 'אינדקס Word Map',
        'nf_hm' => 'אינדקס Han Map',
        'tri_link' => 'מאמרים', 'tri_brand' => 'מאמרי LangMap', 'tri_hub_title' => '{n} מאמרים בבלשנות', 'tri_hub_desc' => '{n} מאמרים ארוכים על שפות וכתבים נדירים, מפתיעים ושנויים במחלוקת — טקסט מלא עם מקורות.', 'tri_hub_sub' => '{n} מאמרים על שפות ומערכות כתב, עם מקורות.', 'tri_tags' => 'תגיות', 'tri_more' => 'עוד בנושא', 'tri_group_wm' => 'שפות', 'tri_group_hm' => 'כתבים וקריאות האן',
    ],
    'sw' => [
        'family' => 'Familia', 'speakers' => 'Wasemaji', 'script' => 'Hati',
        'region' => 'Eneo', 'countries' => 'Nchi', 'official' => 'Lugha rasmi',
        'reading' => 'Usomaji',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Uhai wa lugha',
        'aliases' => 'Pia hujulikana kama', 'romanization' => 'Uandishi wa Kilatini',
        'ex_words' => 'Ulinganishaji wa maneno', 'ex_wordorder' => 'Ulinganishaji wa mpangilio wa maneno', 'ex_han' => 'Ulinganishaji wa usomaji wa Han',
        'wo_major' => 'Linganisha na lugha kuu za dunia', 'wo_close' => 'Linganisha na lugha zenye uhusiano wa karibu',
        'cmp_caption' => 'Imelinganishwa na lugha za {family} zinazohusiana',
        'ex_prev' => 'Iliyotangulia', 'ex_next' => 'Inayofuata', 'ex_page' => 'Ukurasa', 'ex_pick' => 'Sentensi',
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
        'words_heading' => 'Maneno {w} ya msingi katika {name}',
        'chars_heading' => 'Usomaji wa herufi za Han katika {name}',
        'hidden_tag' => 'aina ya kihistoria / iliyofichwa',
        'wm_lang_title' => 'Maneno {w} na matamshi',
        'hm_lang_title' => 'Usomaji wa herufi za Han',
        'wm_lang_meta' => 'Matamshi ya maneno {w} ya msingi katika {name}, yenye IPA na maumbo asilia, kwenye LangMap Word Map.',
        'hm_lang_meta' => 'Usomaji wa herufi za Han katika {name} kwenye LangMap Han Map.',
        'wm_index_title' => 'Word Map — Maneno {w} ya msingi katika lugha {n}',
        'wm_index_desc' => 'Vinjari matamshi ya maneno {w} ya msingi (maji, moto, jua, mwezi, mama…) yenye IPA na maumbo asilia katika lugha na aina {n} kwenye LangMap Word Map.',
        'hm_index_title' => 'Han Map — Usomaji wa herufi za Han katika lugha {n}',
        'hm_index_desc' => 'Linganisha usomaji wa herufi {c} za msingi za Han (一 二 三 日 月 山 水…) katika aina {n} za Kisiniti, Kijaponi, Kikorea na Kivieti kwenye LangMap Han Map.',
        'wm_index_sub' => 'Maneno {w} ya msingi katika lugha na aina {n} — maumbo asilia yenye matamshi ya IPA.',
        'hm_index_sub' => 'Herufi {c} za msingi za Han katika lugha na aina {n} — maumbo ya maandishi yenye usomaji wa IPA / Kilatini.',
        'see_also' => 'Tazama pia',
        'home' => 'Mwanzo wa LangMap',
        'hub_title' => 'LangMap — Word Map na Han Map (faharasa ya maandishi)',
        'hub_desc' => 'Faharasa ya maandishi inayoweza kutambaliwa ya LangMap Word Map na Han Map: matamshi ya maneno ya msingi na usomaji wa herufi za Han kwa kila lugha.',
        'hub_h1' => 'Faharasa ya maandishi ya LangMap',
        'hub_sub' => 'Muhtasari wa kila lugha, uliotolewa upande wa seva na unaoweza kutambaliwa.',
        'maps' => 'Ramani',
        'wm_link' => 'Word Map — Maneno {w} ya msingi',
        'hm_link' => 'Han Map — Usomaji wa herufi za Han',
        'nf_title' => 'Haikupatikana',
        'nf_wm' => 'Faharasa ya Word Map',
        'nf_hm' => 'Faharasa ya Han Map',
        'tri_link' => 'Makala', 'tri_brand' => 'Makala ya LangMap', 'tri_hub_title' => 'Makala {n} za isimu', 'tri_hub_desc' => 'Makala {n} ndefu kuhusu lugha na mifumo ya uandishi adimu, ya kushangaza na yenye mabishano — matini kamili, yenye vyanzo.', 'tri_hub_sub' => 'Makala {n} kuhusu lugha na mifumo ya uandishi, zenye vyanzo.', 'tri_tags' => 'Vitambulisho', 'tri_more' => 'Soma zaidi', 'tri_group_wm' => 'Lugha', 'tri_group_hm' => 'Mifumo ya uandishi na usomaji wa Han',
    ],
];

/** Look up a SEO_T string with {placeholder} substitution; falls back to en. */
function seo_t(string $ui, string $key, array $vars = []): string
{
    $s = SEO_T[$ui][$key] ?? (SEO_T['en'][$key] ?? $key);
    // Auto-fill the Word Map word count for any label using {w} that didn't
    // receive an explicit 'w' (e.g. the hub / Han Map cross-nav links).
    if (!isset($vars['w']) && strpos($s, '{w}') !== false) {
        $vars['w'] = (string) SEO_WM_WORDS;
    }
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

/**
 * Translate a language-metadata VALUE (not a label) into the UI language.
 *
 * The interactive map runs family / speakers / countries / official / script
 * through translateMetaSmart() at render time. These pages had no equivalent,
 * so /ja/wordmap/arp printed "Algonquian", "Latin" and "USA (Wyoming,
 * Oklahoma)" in English next to Japanese chip labels (reader report,
 * 2026-08-06). tools/export_seo_data.js now runs the same translator and
 * writes data/meta_i18n_seo.json — a table keyed by the English string, since
 * these values repeat heavily across the 1,151 rows.
 *
 * Anything with no translation falls back to English, which is what the page
 * did for every value before.
 */
function seo_meta_value(string $ui, string $value): string
{
    if ($ui === 'en' || $value === '') {
        return $value;
    }
    $t = seo_data('meta_i18n');
    return $t['fields'][$value][$ui] ?? $value;
}

/**
 * vitality is a kebab-case enum ('critically-endangered'), not prose, so the
 * smart translator never had anything to match and the raw slug was printed.
 * The table mirrors SC_VITALITY_LBL in wordmap.html and is extracted from it
 * at export time so the two cannot drift.
 */
function seo_vitality(string $ui, string $value): string
{
    if ($value === '') {
        return $value;
    }
    $t = seo_data('meta_i18n');
    $row = $t['vitality'][$value] ?? null;
    if (!$row) {
        return str_replace('-', ' ', $value);
    }
    return $row[$ui] ?? ($row['en'] ?? $value);
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gentium+Plus:wght@400;700&family=Charis+SIL:wght@400;700&family=Noto+Serif:wght@400;700&family=Noto+Serif+JP:wght@400;700&family=Noto+Serif+SC:wght@400;700&family=Noto+Serif+TC:wght@400;700&family=Noto+Serif+KR:wght@400;700&family=Noto+Serif+Tangut&family=Noto+Sans+Phags+Pa&family=Noto+Sans+Mongolian&display=swap">
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
  margin: 0 0 .4rem; font-weight: 600;
  /* Lead with the loaded CJK serifs so a native name renders in ONE font even
     when the OS font lacks a glyph (e.g. simplified-only 话 in 普通话, which a
     Japanese system font drops, leaving it in a mismatched fallback face). */
  font-family: "Noto Serif SC", "Noto Serif TC", "Noto Serif JP", "Noto Serif KR",
    "Gentium Plus", system-ui, sans-serif; }
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
.seo-word .alt { font-size: .95rem; color: var(--muted); margin: .3rem 0 0;
  word-break: break-word; }
.seo-word .alt .alt-script { font-size: .75rem; opacity: .8; }
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
/* Native-script glyph (Chữ Nôm / kana / hangul / Tangut / Phags-pa / Manchu …)
   shown above the romanization. */
.seo-chartable td.c-form .c-native { display: block; font-size: 1.5rem; line-height: 1.2;
  font-family: "Noto Serif JP", "Noto Serif SC", "Noto Serif TC", "Noto Serif KR",
    "Noto Serif Tangut", "Noto Sans Phags Pa", "Noto Sans Mongolian", "HanaMinA",
    "HanaMinB", "Nom Na Tong", serif; }
.seo-chartable td.c-form .c-rom { display: block; font-size: .92rem; color: var(--muted); }
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
/* Trivia ("読み物") pages: long-form prose, and the in-article map controls
   that seo/trivia.php turns from <button> into a label plus real links. */
.seo-prose { font-size: 1.05rem; line-height: 1.85; }
.seo-prose p { margin: 0 0 1.1em; }
.seo-prose h3 { font-size: 1.25rem; margin: 2em 0 .6em; }
.seo-prose ul, .seo-prose ol { margin: 0 0 1.2em; padding-inline-start: 1.4em; }
.seo-prose li { margin: 0 0 .45em; }
.seo-prose blockquote { margin: 1.2em 0; padding: .1em 0 .1em 1em;
  border-inline-start: 3px solid var(--line); color: var(--muted); }
.seo-prose a { color: var(--accent); }
.trivia-actions { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.2em 0; }
.trivia-note { display: inline-block; background: #fff8ec; border: 1px solid #f0dfc0;
  border-radius: .6rem; padding: .35rem .7rem; font-size: .92rem; color: #6b5533; }
.trivia-note a { color: var(--accent); text-decoration: none; }
.trivia-note a:hover { text-decoration: underline; }
.seo-tri-list { columns: 1; }
.seo-tri-list li { margin: 0 0 1rem; }
.seo-tri-sum { color: var(--muted); font-size: .95rem; margin-top: .15rem; }
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
/* --- Cross-content excerpt sections (words / word-order / han readings) --- */
.seo-ex { margin: 2.5rem 0 0; }
.seo-ex h2 { font-size: 1.6rem; margin: 2.5rem 0 1rem; border-bottom: 2px solid var(--line);
  padding-bottom: .35rem; }
.seo-ex .ex-note { color: var(--muted); font-size: .85rem; margin: -.5rem 0 1rem; }
.seo-ex .ex-nav { display: flex; align-items: center; gap: .6rem; margin: .9rem 0 0; }
.seo-ex .ex-nav button { font: inherit; cursor: pointer; padding: .35rem .85rem;
  border-radius: .5rem; border: 1px solid var(--line); background: var(--card); color: var(--fg); }
.seo-ex .ex-nav button:hover { border-color: var(--accent); }
.seo-ex .ex-nav button[disabled] { opacity: .4; cursor: default; }
.seo-ex .ex-nav .ex-ind { color: var(--muted); font-size: .9rem; }
.seo-ex .ex-words { display: grid; grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: .7rem; }
.seo-ex .ex-w { background: var(--card); border: 1px solid var(--line); border-radius: .6rem;
  padding: .6rem .8rem; }
.seo-ex .ex-w .lbl { font-size: .72rem; text-transform: uppercase; letter-spacing: .04em;
  color: var(--muted); margin: 0 0 .2rem; }
.seo-ex .ex-w .sf { font-size: 1.5rem; line-height: 1.15; margin: 0; word-break: break-word;
  font-family: "Gentium Plus", "Charis SIL", "Noto Serif", "Noto Serif JP", "Noto Serif SC",
    "Noto Serif TC", "Noto Serif KR", Georgia, serif; }
.seo-ex .ex-w .ipa { font-size: .95rem; color: var(--accent); margin: .15rem 0 0; }
.seo-ex .ex-han { display: grid; grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: .6rem; }
.seo-ex .ex-h { background: var(--card); border: 1px solid var(--line); border-radius: .6rem;
  padding: .55rem .7rem; }
.seo-ex .ex-h .hc { font-size: 1.7rem; line-height: 1; margin: 0 0 .25rem; text-align: center;
  font-family: "Noto Serif SC", "Noto Serif TC", "Noto Serif JP", "Noto Serif KR", serif; }
.seo-ex .ex-h .hr { font-size: .85rem; margin: .15rem 0 0; line-height: 1.3; }
.seo-ex .ex-h .hr .rl { display: inline-block; font-size: .62rem; color: var(--muted);
  border: 1px solid var(--line); border-radius: .4rem; padding: 0 .3rem; margin-right: .3rem; }
.seo-ex .ex-h .hr .hf { font-family: "Gentium Plus", "Noto Serif", serif; }
.seo-ex .ex-h .hr .hi { color: var(--accent); }
.seo-ex .ex-wo-pick { margin: 0 0 .9rem; }
.seo-ex .ex-wo-pick select { font: inherit; padding: .3rem .5rem; border: 1px solid var(--line);
  border-radius: .4rem; background: var(--card); color: var(--fg); max-width: 100%; }
.seo-ex .ex-wo-sent { background: var(--card); border: 1px solid var(--line); border-radius: .7rem;
  padding: 1rem 1.1rem; }
.seo-ex .ex-wo-sent .wo-title { font-size: .9rem; color: var(--muted); margin: 0 0 .6rem; }
.seo-ex .ex-wo-sent .wo-seg { display: inline-block; margin: 0 .3rem .4rem 0; padding: .15rem 0;
  border-bottom: 2px solid currentColor; font-size: 1.2rem;
  font-family: "Gentium Plus", "Noto Serif", "Noto Serif JP", "Noto Serif SC",
    "Noto Serif TC", "Noto Serif KR", Georgia, serif; }
.seo-ex [hidden] { display: none !important; }
/* --- Comparison tables (current lang + sibling-language columns) --- */
.seo-cmp-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0; }
.seo-cmp-tbl { border-collapse: collapse; font-size: 1rem; min-width: 100%; }
.seo-cmp-tbl th, .seo-cmp-tbl td { padding: .5rem .7rem; border-bottom: 1px solid var(--line);
  vertical-align: top; text-align: left; }
.seo-cmp-tbl thead th { font-size: .85rem; font-weight: 600; color: var(--muted);
  border-bottom: 2px solid var(--line); white-space: nowrap; vertical-align: bottom; }
.seo-cmp-tbl thead th a { color: var(--accent); text-decoration: none; }
.seo-cmp-tbl thead th a:hover { text-decoration: underline; }
.seo-cmp-tbl th.cmp-rowhead { color: var(--muted); font-weight: 600; font-size: .85rem;
  white-space: nowrap; position: sticky; left: 0; background: var(--bg); z-index: 1; }
.seo-cmp-tbl th.cmp-rowhead .cmp-char { font-size: 1.5rem; line-height: 1;
  font-family: "Noto Serif SC", "Noto Serif TC", "Noto Serif JP", "Noto Serif KR", serif; }
/* Anchor (current language) column / header highlight. */
.seo-cmp-tbl .cmp-anchor { background: color-mix(in srgb, var(--accent) 9%, var(--card)); }
.seo-cmp-tbl thead th.cmp-anchor { background: color-mix(in srgb, var(--accent) 14%, var(--bg)); }
.seo-cmp-tbl thead th.cmp-anchor a, .seo-cmp-tbl thead th.cmp-anchor { color: var(--accent); font-weight: 700; }
.seo-cmp-tbl td .cmp-sf { display: block; word-break: break-word;
  font-family: "Gentium Plus", "Charis SIL", "Noto Serif", "Noto Serif JP", "Noto Serif SC",
    "Noto Serif TC", "Noto Serif KR", Georgia, serif; }
.seo-cmp-tbl td .cmp-ipa { display: block; color: var(--accent); font-size: .85rem; }
.seo-cmp-tbl td .cmp-rl { font-size: .62rem; color: var(--muted); border: 1px solid var(--line);
  border-radius: .4rem; padding: 0 .3rem; margin-right: .25rem; }
/* One reading per line. A cell can hold two (白讀 la̍k /laʔ˨˦/ and 文讀 lo̍k
   /lɔʔ˨˦/ for Min Bei 六), and .cmp-rd is a <span>, so the margin below was
   being dropped and the two readings ran together as one string. */
.seo-cmp-tbl td .cmp-rd { display: block; margin: 0 0 .25rem; }
.seo-cmp-tbl td .cmp-rd:last-child { margin-bottom: 0; }
/* Word-order comparison: one row per language, with LangMap-style SVG
   connector lines between same-role segments of consecutive rows. */
.seo-cmp-wo .ex-wo-block { position: relative; }
.seo-cmp-wo .wo-lines { position: absolute; inset: 0; width: 100%; height: 100%;
  pointer-events: none; overflow: visible; z-index: 3; }
.seo-cmp-wo .cmp-wo-row { position: relative; z-index: 1; display: grid;
  grid-template-columns: minmax(7rem, 14rem) 1fr;
  gap: .5rem 1rem; align-items: baseline; padding: .55rem 0; border-bottom: 1px solid var(--line); }
.seo-cmp-wo .cmp-wo-row.cmp-anchor { background: color-mix(in srgb, var(--accent) 9%, var(--card));
  border-radius: .5rem; padding-left: .6rem; padding-right: .6rem; }
.seo-cmp-wo .cmp-wo-name { color: var(--muted); font-size: .9rem; }
.seo-cmp-wo .cmp-wo-row.cmp-anchor .cmp-wo-name { color: var(--accent); font-weight: 700; }
.seo-cmp-wo .cmp-wo-name a { color: inherit; text-decoration: none; }
.seo-cmp-wo .cmp-wo-name a:hover { text-decoration: underline; }
.seo-cmp-wo .cmp-wo-segs .wo-seg { display: inline-block; margin: 0 .8rem .4rem 0; padding: .1rem 0;
  font-size: 1.15rem;
  font-family: "Gentium Plus", "Noto Serif", "Noto Serif JP", "Noto Serif SC",
    "Noto Serif TC", "Noto Serif KR", Georgia, serif; }
/* Narrow screens: keep each language's segments on a single line and let the
   whole block scroll horizontally instead of wrapping. Wrapping is what tangled
   the SVG connectors; on one line they stay clean diagonals. The block becomes
   the scroll container and the SVG is sized to its scrollWidth in JS so the
   connectors scroll in lockstep with the rows. */
@media (max-width: 560px) {
  .seo-cmp-wo .ex-wo-block { overflow-x: auto; overflow-y: hidden; }
  .seo-cmp-wo .cmp-wo-row { grid-template-columns: minmax(5rem, max-content) max-content;
    gap: .5rem .8rem; }
  .seo-cmp-wo .cmp-wo-name { font-size: .82rem; }
  .seo-cmp-wo .cmp-wo-segs { white-space: nowrap; }
  .seo-cmp-wo .cmp-wo-segs .wo-seg { margin-right: .7rem; margin-bottom: 0; font-size: 1.05rem; }
}
</style>
<?php /* Production-only GA4 firing: hostname-gated so dev/local/staging traffic
         doesn't pollute the analytics property (same config as the interactive maps). */ ?>
<script>
  if (location.hostname === 'langmap.heuron.com') {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-JZ7JJBCCHG';
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-JZ7JJBCCHG');
  }
</script>
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

/** Coarse family root for sibling grouping: the leading token of the family
 *  string before any "(", ">", "（" or other branch separator, lowercased.
 *  ("Sinitic (Mandarin)" / "Sinitic (Yue)" -> "sinitic"). Empty -> ''. */
function seo_family_root(string $family): string
{
    if ($family === '') {
        return '';
    }
    $root = preg_split('/[(>（｜·]/u', $family)[0] ?? $family;
    return strtolower(trim($root));
}

/**
 * Sibling codes (same coarse family root) within $langs that actually carry the
 * requested kind of data, excluding $self. Capped, sorted by localized name.
 *
 * @param array  $langs  the dataset's langs map
 * @param string $self   current code
 * @param string $ui     UI lang for sort/name
 * @param string $kind   'words' | 'readings' — which data the sibling must have
 * @param int    $max    cap
 */
function seo_cmp_siblings(array $langs, string $self, string $ui, string $kind, int $max = 6): array
{
    $selfFam = seo_family_root(seo_lang_family($langs[$self] ?? []));
    if ($selfFam === '') {
        return [];
    }
    $out = [];
    foreach ($langs as $code => $l) {
        if ($code === $self) continue;
        if (seo_family_root(seo_lang_family($l)) !== $selfFam) continue;
        if (empty($l[$kind]) || !is_array($l[$kind])) continue;
        $out[] = (string) $code;
    }
    usort($out, fn($a, $b) => strcasecmp(seo_lang_name($langs, $a, $ui), seo_lang_name($langs, $b, $ui)));
    return array_slice($out, 0, $max);
}

/**
 * Normalise a family string into an ordered array of hierarchy levels.
 * Common branch separators ((, ), >, （, ）, ｜, |, ·, ›, ») are unified, then
 * the string is split, trimmed, lowercased and emptied entries dropped.
 *   "Sinitic (Mandarin)"                      -> ["sinitic","mandarin"]
 *   "Sinitic > Mandarin > Northwest > Dungan" -> ["sinitic","mandarin","northwest","dungan"]
 */
function seo_family_levels(string $famStr): array
{
    if ($famStr === '') {
        return [];
    }
    // Unify every supported separator to '>'.
    $norm = preg_replace('/[()（）｜|·›»>]/u', '>', $famStr);
    $parts = explode('>', $norm);
    $out = [];
    foreach ($parts as $p) {
        $p = trim($p);
        if ($p === '') continue;
        $out[] = function_exists('mb_strtolower') ? mb_strtolower($p, 'UTF-8') : strtolower($p);
    }
    return $out;
}

/** Closeness = length of the common LEADING prefix of two level arrays. */
function seo_family_closeness(array $a, array $b): int
{
    $n = min(count($a), count($b));
    $i = 0;
    while ($i < $n && $a[$i] === $b[$i]) {
        $i++;
    }
    return $i;
}

/**
 * Closest sibling codes within $langs that carry the requested data kind,
 * ranked by family closeness (length of common leading family prefix).
 * Keeps closeness >= 1, sorts by closeness DESC then localized name ASC,
 * returns the top $max. Empty self family => [].
 *
 * @param string $kind 'words' | 'readings'
 */
function seo_close_siblings(array $langs, string $self, string $ui, string $kind, int $max = 6): array
{
    $selfLevels = seo_family_levels(seo_lang_family($langs[$self] ?? []));
    if (!$selfLevels) {
        return [];
    }
    $scored = [];
    foreach ($langs as $code => $l) {
        if ($code === $self) continue;
        if (empty($l[$kind]) || !is_array($l[$kind])) continue;
        $score = seo_family_closeness($selfLevels, seo_family_levels(seo_lang_family($l)));
        if ($score < 1) continue;
        $scored[] = ['c' => (string) $code, 's' => $score, 'n' => seo_lang_name($langs, $code, $ui)];
    }
    usort($scored, function ($a, $b) {
        if ($a['s'] !== $b['s']) return $b['s'] <=> $a['s'];
        return strcasecmp($a['n'], $b['n']);
    });
    return array_map(fn($e) => $e['c'], array_slice($scored, 0, $max));
}

/** IPA string similarity in [0,1] (1 − normalized Levenshtein distance). */
function seo_ipa_sim(string $a, string $b): float
{
    if ($a === '' || $b === '') return 0.0;
    if ($a === $b) return 1.0;
    $m = max(strlen($a), strlen($b));
    if ($m === 0) return 0.0;
    // levenshtein() is byte-wise (args must be < 256 bytes — IPA forms are short);
    // a fine, fast proxy for ranking phonetic closeness.
    return 1.0 - levenshtein($a, $b) / $m;
}

/** Per-item IPA map for a lang record: word-id/char-key => IPA string. */
function seo_ipa_map(array $l, string $kind): array
{
    $out = [];
    if ($kind === 'readings') {
        foreach (($l['readings'] ?? []) as $key => $arr) {
            $ipa = (is_array($arr) && isset($arr[0]['ipa'])) ? (string) $arr[0]['ipa'] : '';
            if ($ipa !== '') $out[$key] = $ipa;
        }
    } else {
        foreach (($l['words'] ?? []) as $id => $pair) {
            $ipa = is_array($pair) ? (string) ($pair[1] ?? '') : '';
            if ($ipa !== '') $out[$id] = $ipa;
        }
    }
    return $out;
}

/**
 * Rank candidate languages by IPA SIMILARITY to $self (descending) over their
 * shared items — used to order the Words / Han-readings comparison columns by
 * how phonetically close each language is to the page's language.
 */
function seo_ipa_rank(array $langs, string $self, string $kind, int $max = 6): array
{
    $selfIpa = seo_ipa_map($langs[$self] ?? [], $kind);
    if (count($selfIpa) < 3) return [];
    $minShared = $kind === 'readings' ? 8 : 5;
    $scored = [];
    foreach ($langs as $code => $l) {
        if ((string) $code === $self) continue;
        if (empty($l[$kind]) || !is_array($l[$kind])) continue;
        $cand = seo_ipa_map($l, $kind);
        $sum = 0.0; $n = 0;
        foreach ($selfIpa as $item => $ia) {
            if (!isset($cand[$item])) continue;
            $sum += seo_ipa_sim($ia, $cand[$item]); $n++;
        }
        if ($n < $minShared) continue;
        $scored[] = ['c' => (string) $code, 's' => $sum / $n, 'k' => $n];
    }
    usort($scored, fn($a, $b) => ($b['s'] <=> $a['s']) ?: ($b['k'] <=> $a['k']));
    return array_map(fn($e) => $e['c'], array_slice($scored, 0, $max));
}

/**
 * Render the three "compare with related (sibling) languages" sections.
 *
 * For each dataset (Words / Word order / Han readings) the current language is
 * compared against up to ~6 sibling languages from the SAME family that have
 * the relevant data. Everything is SSR'd (all rows / all sentences / all
 * columns) as crawlable HTML; tiny dependency-free JS only controls DISPLAY
 * (row pagination, word-order sentence selection). A section is skipped when
 * the current language has no data there or has fewer than 1 sibling with data.
 *
 * @param string $map        the page's own map ('wordmap' | 'hanmap')
 * @param string $code       the page language code
 * @param string $ui         UI lang for headings / names
 * @param array  $wmData     full Word Map dataset (langs/words)
 * @param array  $hmData     full Han Map dataset (langs/chars)
 * @param array  $wordorder  sentences for $code: [{id,title,segs:[[role,text,color]]}]
 */
function seo_comparisons(string $map, string $code, string $ui,
    array $wmData, array $hmData, array $wordorder): void
{
    $uid = preg_replace('/[^a-z0-9]+/i', '', $code) ?: 'x';
    $wmLangs = $wmData['langs'] ?? [];
    $wmWords = $wmData['words'] ?? [];
    $hmLangs = $hmData['langs'] ?? [];
    $hmChars = $hmData['chars'] ?? [];

    $perW = 8;   // words per page
    $perH = 10;  // chars per page

    // --- Section 1: Words comparison ----------------------------------------
    $wMine = $wmLangs[$code]['words'] ?? [];
    $wSibs = $wMine ? seo_ipa_rank($wmLangs, $code, 'words') : [];
    $wFamily = $wMine ? seo_lang_family($wmLangs[$code] ?? []) : '';
    // Columns: anchor first, then siblings.
    $wCols = $wMine ? array_merge([$code], $wSibs) : [];

    // --- Section 3: Han readings comparison ---------------------------------
    $hMine = $hmLangs[$code]['readings'] ?? [];
    $hSibs = $hMine ? seo_ipa_rank($hmLangs, $code, 'readings') : [];
    $hFamily = $hMine ? seo_lang_family($hmLangs[$code] ?? []) : '';
    $hCols = $hMine ? array_merge([$code], $hSibs) : [];

    // --- Section 2: Word order comparison -----------------------------------
    // wordorder is keyed by code only. Two comparison blocks share one sentence
    // <select>:
    //   (a) MAJOR  — anchor + a fixed set of major world languages present in
    //                wordorder (closeness-agnostic).
    //   (b) CLOSE  — anchor + the top 4 closest relatives by family closeness
    //                that also carry a wordorder entry.
    $allWo = $wordorder ? ($wmData['wordorder'] ?? ($hmData['wordorder'] ?? [])) : [];
    $woHas = fn(string $c): bool => !empty($allWo[$c]);

    // Resolve a candidate's family / name / SEO-link from whichever map has it.
    $famLevelsOf = function (string $c) use ($wmLangs, $hmLangs): array {
        foreach ([$wmLangs, $hmLangs] as $set) {
            if (isset($set[$c])) {
                $lv = seo_family_levels(seo_lang_family($set[$c]));
                if ($lv) return $lv;
            }
        }
        return [];
    };
    $woName = function (string $c) use ($wmLangs, $hmLangs, $ui): string {
        if (isset($wmLangs[$c])) return seo_lang_name($wmLangs, $c, $ui);
        if (isset($hmLangs[$c])) return seo_lang_name($hmLangs, $c, $ui);
        return $c;
    };

    // (a) MAJOR world languages with a wordorder entry (≠ anchor), cap ~7.
    $woMajor = [];
    if ($wordorder) {
        $majorPool = ['en', 'zh', 'es', 'hi', 'ar', 'pt', 'ru', 'ja', 'de', 'fr', 'ko', 'id'];
        foreach ($majorPool as $mc) {
            if ($mc === $code || !$woHas($mc)) continue;
            $woMajor[] = $mc;
            if (count($woMajor) >= 7) break;
        }
    }

    // (b) CLOSE — top 4 relatives by family closeness with a wordorder entry.
    $woClose = [];
    if ($wordorder) {
        $selfLevels = $famLevelsOf($code);
        if ($selfLevels) {
            $scored = [];
            foreach ($allWo as $c => $sents) {
                if ($c === $code || !$sents) continue;
                $score = seo_family_closeness($selfLevels, $famLevelsOf((string) $c));
                if ($score < 1) continue;
                $scored[] = ['c' => (string) $c, 's' => $score, 'n' => $woName((string) $c)];
            }
            usort($scored, function ($a, $b) {
                if ($a['s'] !== $b['s']) return $b['s'] <=> $a['s'];
                return strcasecmp($a['n'], $b['n']);
            });
            $woClose = array_map(fn($e) => $e['c'], array_slice($scored, 0, 4));
        }
    }

    // Each block needs ≥1 sibling beyond the anchor to render.
    $haveWoMajor = $wordorder && count($woMajor) >= 1;
    $haveWoClose = $wordorder && count($woClose) >= 1;
    // Columns used by the section = anchor + union of both blocks (for SSR/blob).
    $woColsMajor = $haveWoMajor ? array_merge([$code], $woMajor) : [];
    $woColsClose = $haveWoClose ? array_merge([$code], $woClose) : [];
    // Order each block's rows by closeness to the page language (closest first).
    // The anchor is not pinned — it sorts in by closeness like any other row
    // (being closest to itself, it naturally lands at/near the top).
    $woSelfLv = $famLevelsOf($code);
    $woRank = fn($c) => $woSelfLv ? seo_family_closeness($woSelfLv, $famLevelsOf((string) $c)) : 0;
    $sortWo = function (array $cols) use ($woRank, $woName) {
        usort($cols, fn($a, $b) => ($woRank($b) <=> $woRank($a)) ?: strcasecmp($woName($a), $woName($b)));
        return $cols;
    };
    $woColsMajor = $sortWo($woColsMajor);
    $woColsClose = $sortWo($woColsClose);
    $woCols = array_values(array_unique(array_merge(
        ($haveWoMajor || $haveWoClose) ? [$code] : [],
        $woMajor, $woClose
    )));

    // Need ≥2 columns for any comparison; bail if all sections are empty.
    $haveWords = count($wCols) >= 2;
    $haveHan = count($hCols) >= 2;
    $haveWo = $haveWoMajor || $haveWoClose;
    if (!$haveWords && !$haveHan && !$haveWo) return;

    // Helper to render a localized, linked column header for a sibling code in a
    // given dataset/map; the anchor gets highlighted + no link.
    $colHead = function (string $c, array $langs, string $mapName, bool $anchor) use ($ui): string {
        $nm = seo_lang_name($langs, $c, $ui);
        $cls = $anchor ? ' class="cmp-anchor"' : '';
        if ($anchor) {
            return '<th' . $cls . ' scope="col" lang="' . e($c) . '">' . e($nm) . '</th>';
        }
        return '<th scope="col"><a href="' . e(seo_path($ui, $mapName, $c)) . '" lang="' . e($c) . '">' . e($nm) . '</a></th>';
    };

    // ----- 1) Words comparison ----------------------------------------------
    if ($haveWords):
        // Rows = word concepts that the anchor has.
        $rows = [];
        foreach ($wmWords as $w) {
            $id = $w['id'] ?? null;
            if ($id === null) continue;
            $mine = $wMine[$id] ?? null;
            if (!$mine || (($mine[0] ?? '') === '' && ($mine[1] ?? '') === '')) continue;
            $rows[] = ['id' => $id, 'label' => seo_pick($w['label'] ?? [], $ui) ?: $id];
        }
        $pages = array_chunk($rows, $perW);
        $np = count($pages);
    ?>
<section class="seo-ex" data-ex="words" data-uid="<?= e($uid) ?>" data-pages="<?= $np ?>">
  <h2><?= e(seo_t($ui, 'ex_words')) ?></h2>
  <?php if ($wFamily !== ''): ?><p class="ex-note"><?= e(seo_t($ui, 'cmp_caption', ['family' => $wFamily])) ?></p><?php endif; ?>
  <div class="seo-cmp-wrap">
  <table class="seo-cmp-tbl">
    <thead>
      <tr>
        <th class="cmp-rowhead" scope="col"><?= e(seo_t($ui, 'th_gloss')) ?></th>
        <?php foreach ($wCols as $ci => $c): echo $colHead($c, $wmLangs, 'wordmap', $ci === 0); endforeach; ?>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($pages as $pi => $page): ?>
      <?php foreach ($page as $row): ?>
      <tr class="cmp-page" data-page="<?= $pi ?>"<?= $pi > 0 ? ' hidden' : '' ?>>
        <th class="cmp-rowhead" scope="row"><?= e($row['label']) ?></th>
        <?php foreach ($wCols as $ci => $c):
            $entry = $wmLangs[$c]['words'][$row['id']] ?? null;
            $surface = $entry[0] ?? ''; $ipa = $entry[1] ?? '';
            $anchor = $ci === 0; ?>
        <td<?= $anchor ? ' class="cmp-anchor"' : '' ?>>
          <span class="cmp-sf" lang="<?= e($c) ?>"><?= e($surface !== '' ? $surface : '—') ?></span>
          <?php if ($ipa !== ''): ?><span class="cmp-ipa">/<?= e($ipa) ?>/</span><?php endif; ?>
        </td>
        <?php endforeach; ?>
      </tr>
      <?php endforeach; ?>
    <?php endforeach; ?>
    </tbody>
  </table>
  </div>
  <?php if ($np > 1): ?>
  <div class="ex-nav">
    <button type="button" class="ex-prev" aria-label="<?= e(seo_t($ui, 'ex_prev')) ?>"><?= e(seo_t($ui, 'ex_prev')) ?></button>
    <span class="ex-ind"><?= e(seo_t($ui, 'ex_page')) ?> <span class="ex-cur">1</span>/<?= $np ?></span>
    <button type="button" class="ex-next" aria-label="<?= e(seo_t($ui, 'ex_next')) ?>"><?= e(seo_t($ui, 'ex_next')) ?></button>
  </div>
  <?php endif; ?>
</section>
<?php endif; ?>

<?php // ----- 2) Word order comparison -----------------------------------------
    if ($haveWo):
        // Build a sentence-id index across the anchor + every column used by
        // either block (union): id -> { title, order, segs:{code:segs} }.
        $sentIndex = [];
        $orderN = 0;
        foreach ($wordorder as $s) {                 // anchor first sets the order/titles
            $id = $s['id'] ?? null; if ($id === null) continue;
            $sentIndex[$id] = ['title' => $s['title'] ?? '', 'order' => $orderN++, 'segs' => [$code => $s['segs'] ?? []]];
        }
        foreach ($woCols as $sc) {
            if ($sc === $code) continue;
            foreach (($allWo[$sc] ?? []) as $s) {
                $id = $s['id'] ?? null; if ($id === null) continue;
                if (!isset($sentIndex[$id])) {
                    $sentIndex[$id] = ['title' => $s['title'] ?? '', 'order' => $orderN++, 'segs' => []];
                }
                $sentIndex[$id]['segs'][$sc] = $s['segs'] ?? [];
            }
        }
        uasort($sentIndex, fn($a, $b) => $a['order'] <=> $b['order']);
        // SEO link target for a sibling: prefer the page's own map if present.
        $woLink = function (string $c) use ($wmLangs, $hmLangs, $map, $ui): string {
            $own = $map === 'wordmap' ? $wmLangs : $hmLangs;
            $oth = $map === 'wordmap' ? $hmLangs : $wmLangs;
            if (isset($own[$c])) return seo_path($ui, $map, $c);
            if (isset($oth[$c])) return seo_path($ui, $map === 'wordmap' ? 'hanmap' : 'wordmap', $c);
            return seo_path($ui, $map, $c);
        };
        $sentList = array_values($sentIndex);

        // Render one block's rows for a given sentence ($s) over $cols.
        $renderWoRows = function (array $s, array $cols) use ($code, $woName, $woLink) {
            foreach ($cols as $c):
                $segs = $s['segs'][$c] ?? null;
                $anchor = $c === $code;
                if ($segs === null && !$anchor) continue; // column lacks this sentence
                ?>
    <div class="cmp-wo-row<?= $anchor ? ' cmp-anchor' : '' ?>">
      <div class="cmp-wo-name">
        <?php if ($anchor): ?><span lang="<?= e($c) ?>"><?= e($woName($c)) ?></span>
        <?php else: ?><a href="<?= e($woLink($c)) ?>" lang="<?= e($c) ?>"><?= e($woName($c)) ?></a><?php endif; ?>
      </div>
      <div class="cmp-wo-segs">
        <?php foreach (($segs ?? []) as $seg):
            $text = $seg[1] ?? ''; $color = $seg[2] ?? '';
            if ($text === '') continue; ?>
        <span class="wo-seg" lang="<?= e($c) ?>" data-seg="<?= e($seg[0] ?? '') ?>"<?= $color !== '' ? ' style="color:' . e($color) . '"' : '' ?>><?= e($text) ?></span>
        <?php endforeach; ?>
      </div>
    </div>
            <?php endforeach;
        };

        // Compact lazy blob: per non-SSR'd sentence, a title + rows keyed by code
        // (each block picks its own columns client-side).
        $WO_SSR = 10; $woLazy = [];
        foreach ($sentList as $si => $s) {
            if ($si < $WO_SSR) continue;
            $byCode = [];
            foreach ($woCols as $c) {
                $segs = $s['segs'][$c] ?? null;
                if ($segs === null) continue;
                $rs = [];
                foreach ($segs as $seg) { $t = $seg[1] ?? ''; if ($t === '') continue; $rs[] = [$t, $seg[2] ?? '', $seg[0] ?? '']; }
                $byCode[$c] = ['n' => $woName($c), 'l' => $c === $code ? '' : $woLink($c), 's' => $rs];
            }
            $woLazy[$si] = ['t' => $s['title'] ?? '', 'r' => $byCode];
        }
    ?>
<section class="seo-ex seo-cmp-wo" data-ex="wordorder" data-uid="<?= e($uid) ?>"
         data-anchor="<?= e($code) ?>"
         data-major="<?= e(implode(',', $woColsMajor)) ?>"
         data-close="<?= e(implode(',', $woColsClose)) ?>">
  <h2><?= e(seo_t($ui, 'ex_wordorder')) ?></h2>
  <div class="ex-wo-pick">
    <label for="ex-wo-<?= e($uid) ?>" class="ex-ind"><?= e(seo_t($ui, 'ex_pick')) ?>: </label>
    <select id="ex-wo-<?= e($uid) ?>" class="ex-wo-select">
      <?php foreach ($sentList as $si => $s): ?>
      <option value="<?= $si ?>"><?= e($s['title'] !== '' ? $s['title'] : ('#' . $si)) ?></option>
      <?php endforeach; ?>
    </select>
  </div>

  <?php // Two blocks, both driven by the one select above. The first WO_SSR
        // sentences are SSR'd fully (crawlable); the rest live in the JSON blob
        // and are rendered client-side on selection.
        $blocks = [];
        if ($haveWoMajor) $blocks[] = ['key' => 'major', 'cols' => $woColsMajor, 'head' => 'wo_major'];
        if ($haveWoClose) $blocks[] = ['key' => 'close', 'cols' => $woColsClose, 'head' => 'wo_close'];
  ?>
  <?php foreach ($blocks as $blk): ?>
  <div class="ex-wo-block" data-block="<?= e($blk['key']) ?>">
    <h3><?= e(seo_t($ui, $blk['head'])) ?></h3>
    <?php foreach ($sentList as $si => $s): if ($si >= $WO_SSR) continue; ?>
    <div class="ex-wo-sent" data-sent="<?= $si ?>"<?= $si > 0 ? ' hidden' : '' ?>>
      <?php $renderWoRows($s, $blk['cols']); ?>
    </div>
    <?php endforeach; ?>
    <div class="ex-wo-lazy" hidden></div>
    <svg class="wo-lines" aria-hidden="true"></svg>
  </div>
  <?php endforeach; ?>
  <script type="application/json" class="ex-wo-data"><?= json_encode($woLazy, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?></script>
</section>
<?php endif; ?>

<?php // ----- 3) Han readings comparison ---------------------------------------
    if ($haveHan):
        // Rows = chars the anchor has readings for.
        $rows = [];
        foreach ($hmChars as $c) {
            $key = $c['key'] ?? null;
            if ($key === null) continue;
            $mine = $hMine[$key] ?? null;
            if (!$mine) continue;
            $mine = array_values(array_filter($mine, fn($r) =>
                ($r['surface'] ?? '') !== '' || ($r['ipa'] ?? '') !== ''));
            if (!$mine) continue;
            $rows[] = ['key' => $key, 'char' => $c['char'] ?? ''];
        }
        $pages = array_chunk($rows, $perH);
        $np = count($pages);
        // Compact reading renderer.
        $rd = function (?array $readings, string $c): string {
            if (!$readings) return '<span class="cmp-sf">—</span>';
            $readings = array_values(array_filter($readings, fn($r) =>
                ($r['surface'] ?? '') !== '' || ($r['ipa'] ?? '') !== ''));
            if (!$readings) return '<span class="cmp-sf">—</span>';
            $multi = count($readings) > 1;
            $out = '';
            foreach ($readings as $r) {
                $surface = $r['surface'] ?? ''; $ipa = $r['ipa'] ?? ''; $label = $r['label'] ?? '';
                $out .= '<span class="cmp-rd">';
                if ($multi && $label !== '') $out .= '<span class="cmp-rl">' . e($label) . '</span>';
                if ($surface !== '') $out .= '<span class="cmp-sf" style="display:inline" lang="' . e($c) . '">' . e($surface) . '</span> ';
                if ($ipa !== '') $out .= '<span class="cmp-ipa" style="display:inline">/' . e($ipa) . '/</span>';
                $out .= '</span>';
            }
            return $out;
        };
    ?>
<section class="seo-ex" data-ex="han" data-uid="<?= e($uid) ?>" data-pages="<?= $np ?>">
  <h2><?= e(seo_t($ui, 'ex_han')) ?></h2>
  <?php if ($hFamily !== ''): ?><p class="ex-note"><?= e(seo_t($ui, 'cmp_caption', ['family' => $hFamily])) ?></p><?php endif; ?>
  <div class="seo-cmp-wrap">
  <table class="seo-cmp-tbl">
    <thead>
      <tr>
        <th class="cmp-rowhead" scope="col"><?= e(seo_t($ui, 'th_char')) ?></th>
        <?php foreach ($hCols as $ci => $c): echo $colHead($c, $hmLangs, 'hanmap', $ci === 0); endforeach; ?>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($pages as $pi => $page): ?>
      <?php foreach ($page as $row): ?>
      <tr class="cmp-page" data-page="<?= $pi ?>"<?= $pi > 0 ? ' hidden' : '' ?>>
        <th class="cmp-rowhead" scope="row"><span class="cmp-char" lang="zh"><?= e($row['char']) ?></span></th>
        <?php foreach ($hCols as $ci => $c):
            $anchor = $ci === 0; ?>
        <td<?= $anchor ? ' class="cmp-anchor"' : '' ?>><?= $rd($hmLangs[$c]['readings'][$row['key']] ?? null, $c) ?></td>
        <?php endforeach; ?>
      </tr>
      <?php endforeach; ?>
    <?php endforeach; ?>
    </tbody>
  </table>
  </div>
  <?php if ($np > 1): ?>
  <div class="ex-nav">
    <button type="button" class="ex-prev" aria-label="<?= e(seo_t($ui, 'ex_prev')) ?>"><?= e(seo_t($ui, 'ex_prev')) ?></button>
    <span class="ex-ind"><?= e(seo_t($ui, 'ex_page')) ?> <span class="ex-cur">1</span>/<?= $np ?></span>
    <button type="button" class="ex-next" aria-label="<?= e(seo_t($ui, 'ex_next')) ?>"><?= e(seo_t($ui, 'ex_next')) ?></button>
  </div>
  <?php endif; ?>
</section>
<?php endif; ?>

<script>
(function () {
  // Row pagination: prev/next toggle [hidden] on .cmp-page rows by data-page.
  document.querySelectorAll('.seo-ex[data-pages]').forEach(function (sec) {
    var np = parseInt(sec.getAttribute('data-pages'), 10) || 1;
    if (np <= 1) return;
    var cur = 0;
    var rows = sec.querySelectorAll('.cmp-page');
    var prev = sec.querySelector('.ex-prev');
    var next = sec.querySelector('.ex-next');
    var ind = sec.querySelector('.ex-cur');
    function render() {
      rows.forEach(function (r) {
        r.hidden = (parseInt(r.getAttribute('data-page'), 10) !== cur);
      });
      if (ind) ind.textContent = (cur + 1);
      if (prev) prev.disabled = (cur === 0);
      if (next) next.disabled = (cur === np - 1);
    }
    if (prev) prev.addEventListener('click', function () { if (cur > 0) { cur--; render(); } });
    if (next) next.addEventListener('click', function () { if (cur < np - 1) { cur++; render(); } });
    render();
  });
  // Word order: random initial pick + one <select> driving BOTH blocks (major
  // world langs / closely-related). The first 10 sentences are SSR'd per block;
  // the rest are rendered from a shared JSON blob (rows keyed by lang code, each
  // block picking its own column list from data-major / data-close).
  document.querySelectorAll('.seo-ex[data-ex="wordorder"]').forEach(function (sec) {
    var sel = sec.querySelector('.ex-wo-select');
    var blobEl = sec.querySelector('.ex-wo-data');
    if (!sel) return;
    var data = {}; try { data = JSON.parse((blobEl && blobEl.textContent) || '{}'); } catch (e) {}
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function cols(attr) { var v = sec.getAttribute(attr) || ''; return v ? v.split(',') : []; }
    var blockCols = { major: cols('data-major'), close: cols('data-close') };
    var blocks = [];
    sec.querySelectorAll('.ex-wo-block').forEach(function (b) {
      blocks.push({
        el: b,
        cols: blockCols[b.getAttribute('data-block')] || [],
        ssr: b.querySelectorAll('.ex-wo-sent'),
        lazy: b.querySelector('.ex-wo-lazy'),
        svg: b.querySelector('svg.wo-lines')
      });
    });
    var SVGNS = 'http://www.w3.org/2000/svg';
    // LangMap-style connectors: curved colored lines between same-role segments
    // of consecutive language rows (ported from app.js drawLines/createCurvedLine).
    function drawWoLines(blk) {
      var svg = blk.svg, el = blk.el; if (!svg || !el) return;
      svg.textContent = '';
      var vis = null;
      el.querySelectorAll('.ex-wo-sent, .ex-wo-lazy').forEach(function (n) { if (!n.hidden) vis = n; });
      // Size to the SCROLL extent, not the visible box: on narrow screens the
      // block scrolls horizontally, so the SVG must span the full content width
      // (and scroll with it) or the connectors get clipped at the viewport edge.
      var W = el.scrollWidth, H = el.scrollHeight;
      svg.setAttribute('width', W); svg.setAttribute('height', H);
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.style.width = W + 'px'; svg.style.height = H + 'px';
      if (!vis) return;
      var base = el.getBoundingClientRect();
      // Coordinates relative to the scroll content origin (add current scroll
      // offset) so connectors stay correct regardless of scroll position.
      var sx = el.scrollLeft, sy = el.scrollTop;
      var rows = [];
      vis.querySelectorAll('.cmp-wo-row').forEach(function (row) {
        var m = {};
        row.querySelectorAll('.wo-seg[data-seg]').forEach(function (s) {
          var role = s.getAttribute('data-seg'); if (!role) return;
          var r = s.getBoundingClientRect();
          (m[role] = m[role] || []).push({
            x: r.left + r.width / 2 - base.left + sx,
            bottom: r.bottom - base.top + sy, top: r.top - base.top + sy,
            color: getComputedStyle(s).color || '#999'
          });
        });
        rows.push(m);
      });
      for (var i = 0; i < rows.length - 1; i++) {
        var A = rows[i], B = rows[i + 1];
        for (var role in A) {
          if (!B[role]) continue;
          A[role].forEach(function (a) {
            B[role].forEach(function (b2) {
              var mid = (a.bottom + b2.top) / 2;
              var p = document.createElementNS(SVGNS, 'path');
              p.setAttribute('d', 'M ' + a.x + ' ' + a.bottom + ' C ' + a.x + ' ' + mid + ', ' + b2.x + ' ' + mid + ', ' + b2.x + ' ' + b2.top);
              p.setAttribute('stroke', a.color); p.setAttribute('stroke-width', '2');
              p.setAttribute('fill', 'none'); p.setAttribute('opacity', '0.55');
              svg.appendChild(p);
            });
          });
        }
      }
    }
    function drawAll() { requestAnimationFrame(function () { blocks.forEach(drawWoLines); }); }
    function buildLazy(blk, i) {
      var d = data[i]; if (!d || !blk.lazy) return false;
      var h = '';
      blk.cols.forEach(function (code) {
        var row = (d.r || {})[code]; if (!row) return;
        h += '<div class="cmp-wo-row' + (row.l ? '' : ' cmp-anchor') + '"><div class="cmp-wo-name">'
          + (row.l ? '<a href="' + esc(row.l) + '" lang="' + esc(code) + '">' + esc(row.n) + '</a>'
                   : '<span lang="' + esc(code) + '">' + esc(row.n) + '</span>')
          + '</div><div class="cmp-wo-segs">';
        (row.s || []).forEach(function (sg) {
          h += '<span class="wo-seg" lang="' + esc(code) + '"' + (sg[2] ? ' data-seg="' + esc(sg[2]) + '"' : '') + (sg[1] ? ' style="color:' + esc(sg[1]) + '"' : '') + '>' + esc(sg[0]) + '</span>';
        });
        h += '</div></div>';
      });
      blk.lazy.innerHTML = h;
      return true;
    }
    function show(i) {
      blocks.forEach(function (blk) {
        var found = false;
        blk.ssr.forEach(function (s) { var on = parseInt(s.getAttribute('data-sent'), 10) === i; s.hidden = !on; if (on) found = true; });
        if (blk.lazy) blk.lazy.hidden = found ? true : !buildLazy(blk, i);
      });
      sel.value = String(i);
      drawAll();
    }
    var total = sel.options.length;
    show(Math.floor(Math.random() * total));
    sel.addEventListener('change', function () { show(parseInt(sel.value, 10) || 0); });
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(drawAll, 150); });
    // Redraw once webfonts settle (segment widths shift the connector anchors).
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawAll);
  });
})();
</script>
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
