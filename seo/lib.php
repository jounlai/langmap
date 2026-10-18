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

const SEO_SITE = 'https://langmaps.com';

/**
 * seo_goods_href — the Makoto Gadgets hand-off, the same one wordmap.html
 * builds in buildTshirtHref(). docs/makoto-goods-link.md asked for this: "今後の
 * 言語別SEOページにも同じリンクを置きます。URL生成を関数に切り出し、モーダルと
 * SEOページの両方から呼ぶ形にしてください。"
 *
 * The two sides cannot literally share code — one is JS in the browser, the
 * other PHP on the server — so what is shared is the CONTRACT, and this
 * function is written to mirror the JS one parameter for parameter. If one
 * changes, change both; docs/makoto-nickname-note.md is what Makoto holds.
 *
 * name= carries the NICKNAME where the language has one (Singlish rather than
 * Singapore English), because that is what a reader wants printed across a
 * chest; the formal name travels alongside in formal= so nothing is lost.
 */
/* Speaker count for the goods card headline ("Wear a language spoken by about
   4,000 people"). meta.speakers is free text ("~4K", "~9.5M L1 (Honduras)",
   "~50–100 fluent + ~250–300 total", "~50K ethnic"): only a single leading
   figure that is plainly a speaker count is used. Ranges, L2 / ethnic /
   heritage / combined figures and historical rows return null, and the card
   falls back to its fixed title. */
function seo_speaker_count(array $lang): ?int
{
    if (!empty($lang['excluded'])) return null;
    $raw = trim((string) (($lang['meta'] ?? [])['speakers'] ?? ''));
    if (!preg_match('/^~?\s*([\d][\d.,]*)\s*([KMB])?(?=\s|$)(.*)$/u', $raw, $m)) return null;
    $rest = $m[3];
    if (preg_match('/^\s*[–-]|L2|ethnic|heritage|semi|combined|signers|revival|extinct/iu', $rest)) return null;
    $n = (float) str_replace(',', '', $m[1]);
    $n *= ['' => 1, 'K' => 1e3, 'M' => 1e6, 'B' => 1e9][strtoupper($m[2] ?? '')];
    return $n >= 1 ? (int) round($n) : null;
}

/** CLDR plural category for an integer (only the languages that need one here). */
function seo_plural_cat(string $ui, int $n): string
{
    $m10 = $n % 10; $m100 = $n % 100;
    if ($ui === 'ru' || $ui === 'uk') {
        if ($m10 === 1 && $m100 !== 11) return 'one';
        if ($m10 >= 2 && $m10 <= 4 && ($m100 < 12 || $m100 > 14)) return 'few';
        return 'many';
    }
    if ($ui === 'ar') {
        if ($n === 0) return 'zero';
        if ($n === 1) return 'one';
        if ($n === 2) return 'two';
        if ($m100 >= 3 && $m100 <= 10) return 'few';
        if ($m100 >= 11) return 'many';
        return 'other';
    }
    return $n === 1 ? 'one' : 'other';
}

/** A plain count (1,190 / 1.190 / 1 190 / 1190) in the UI language's style. */
function seo_int(int $n, string $ui): string
{
    if (in_array($ui, ['es', 'pt', 'ru', 'uk', 'ar'], true) && $n < 10000) return (string) $n;   // these write 4-digit counts ungrouped
    $sep = in_array($ui, ['vi', 'id', 'de', 'it', 'es', 'pt'], true) ? '.' : (in_array($ui, ['fr', 'ru', 'uk'], true) ? "\u{202F}" : ',');
    return number_format($n, 0, '', $sep);
}

function seo_people(int $n, string $ui): string
{
    $grp = fn(int $x, string $sep) => number_format($x, 0, '', $sep);
    $east = ['ja' => ['億', '万', ','], 'zh' => ['亿', '万', ','], 'yue' => ['億', '萬', ','], 'ko' => ['억 ', '만', ',']];
    if (isset($east[$ui])) {
        [$oku, $man, $sep] = $east[$ui];
        if ($n < 10000) return $grp($n, $sep);
        $tail = $ui === 'ko' ? ' ' : '';   // 약 2,000만 명, but 약 4,000명
        if ($n < 100000000) return $grp((int) round($n / 1e4), $sep) . $man . $tail;
        $o = intdiv($n, 100000000); $r = (int) round(($n % 100000000) / 1e4);
        return $o . $oku . ($r ? $grp($r, $sep) . $man : '') . $tail;
    }
    $dec = in_array($ui, ['de','fr','it','es','pt','ru','uk','id','vi'], true) ? ',' : '.';
    $sep = in_array($ui, ['fr','ru','uk'], true) ? "\u{202F}" : ($dec === ',' ? '.' : ',');
    if ($n < 1000000) return $grp($n, $sep);
    $big = $n >= 1e9;
    $x = $big ? $n / 1e9 : $n / 1e6;
    $num = rtrim(rtrim(number_format($x, $x < 10 ? 1 : 0, $dec, $sep), '0'), $dec);
    $one = ($num === '1');
    $W = [
      'en' => ['million','million','billion','billion'], 'de' => ['Million','Millionen','Milliarde','Milliarden'],
      'fr' => ['million','millions','milliard','milliards'], 'it' => ['milione','milioni','miliardo','miliardi'],
      'es' => ['millón','millones','mil millones','mil millones'], 'pt' => ['milhão','milhões','bilhão','bilhões'],
      'ru' => ['млн','млн','млрд','млрд'], 'uk' => ['млн','млн','млрд','млрд'], 'id' => ['juta','juta','miliar','miliar'],
      'vi' => ['triệu','triệu','tỷ','tỷ'], 'th' => ['ล้าน','ล้าน','พันล้าน','พันล้าน'], 'hi' => ['मिलियन','मिलियन','अरब','अरब'],
      'ar' => ['مليون','مليون','مليار','مليار'], 'he' => ['מיליון','מיליון','מיליארד','מיליארד'], 'sw' => ['milioni','milioni','bilioni','bilioni'],
    ][$ui] ?? ['million','million','billion','billion'];
    $w = $W[($big ? 2 : 0) + ($one ? 0 : 1)];
    if ($ui === 'sw') return $w . ' ' . $num;
    if ($ui === 'th') return $num . ' ' . $w;
    return $num . ' ' . $w;
}

function seo_goods_href(string $code, array $lang, string $ui): string
{
    $names = $lang['names'] ?? [];
    $nicks = $lang['nicknames'] ?? [];
    $formal = seo_pick($names, $ui) ?: ($lang['name'] ?? $code);
    // A nickname never crosses UI languages: if this UI has none, the formal
    // name is printed rather than another language's nickname.
    $short = $nicks[$ui] ?? $formal;
    // Makoto's storefront is ja or en; everything else reads the English shop.
    $locale = (strpos($ui, 'ja') === 0) ? 'ja' : 'en';
    $q = [
        'src'    => 'langmap',
        'map'    => 'wordmap',
        'lang'   => $code,
        'name'   => $short,
        'formal' => $formal,
        'native' => $lang['native'] ?? '',
        'ui'     => $ui,
        'words'  => SEO_SITE . '/lang_words/' . rawurlencode($code) . '.js',
    ];
    return 'https://makoto-gadgets.com/' . $locale . '/goods/langmap?' . http_build_query($q, '', '&', PHP_QUERY_RFC3986);
}

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

// Word Map concept / language counts for the {w} / {n} placeholders on pages
// that don't load the 27 MB Word Map JSON (hub, Han Map, trivia). Written by
// tools/export_seo_data.js; it was a hand-kept constant left at 30 for 87.
function seo_counts(): array
{
    static $c = null;
    if ($c === null) {
        $raw = @file_get_contents(SEO_DATA_DIR . '/seo_counts.json');
        $c = ($raw !== false ? json_decode($raw, true) : null) ?: [];
        $c += ['words' => 87, 'langs' => 1190];
    }
    return $c;
}

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

/** Breadcrumb separator that points along the reading direction (r24). */
function seo_crumb_sep(string $ui): string
{
    return seo_is_rtl($ui) ? '&lsaquo;' : '&rsaquo;';
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

// Strings for the per-WORD pages (/{ui}/word/{id}), added 2026-09-22. Kept in
// their own table rather than spliced into the 19 blocks of SEO_T above: that
// edit would have touched every one of them, and these belong together.
// seo_t() merges the two once, on first call.
const SEO_T_WORD = [
    'en' => [
        'wd_forms_n' => '{n} different spellings',
        'wd_readings' => '{n} readings of the same spelling',
        'wd_same_in' => 'said the same in {n} places',
        'wd_more' => 'and {n} more',
        'wd_zh_group' => 'Chinese',
        'wd_major' => 'Major languages',
        'wd_east_asia' => 'East Asia',
        'wd_se_asia' => 'Southeast Asia',
        'wd_south_asia' => 'South Asia',
        'wd_mideast_ca' => 'Middle East & Central Asia',
        'wd_north_asia' => 'Siberia & North Asia',
        'wd_europe' => 'Europe',
        'wd_africa' => 'Africa',
        'wd_north_america' => 'North America',
        'wd_latin_america' => 'Latin America',
        'wd_oceania' => 'Oceania & the Pacific',
        'wd_ancient' => 'Ancient & historical',
        'wd_other' => 'Elsewhere',
        'wd_link' => 'Words',
        'wd_index_h1' => 'All {w} words',
        'wd_index_meta' => 'Every word on the Word Map — {w} concepts across {n} languages, with pronunciation.',
        'wd_title' => 'How to say “{name}” in {n} languages — with pronunciation',
        'wd_meta' => 'How to say {name} in {n} languages, with pronunciation and native script.',
        'wd_forms' => '{n} languages',
        'wd_open_app' => 'See {name} on the map',
    ],
    'ja' => [
        'wd_forms_n' => '{n}通りの綴り',
        'wd_readings' => '同じ表記で{n}通りの読み',
        'wd_same_in' => '{n}つの言語・地域で同じ',
        'wd_more' => 'ほか{n}',
        'wd_zh_group' => '中国語',
        'wd_major' => '主要な言語',
        'wd_east_asia' => '東アジア',
        'wd_se_asia' => '東南アジア',
        'wd_south_asia' => '南アジア',
        'wd_mideast_ca' => '中東・中央アジア',
        'wd_north_asia' => 'シベリア・北アジア',
        'wd_europe' => 'ヨーロッパ',
        'wd_africa' => 'アフリカ',
        'wd_north_america' => '北アメリカ',
        'wd_latin_america' => 'ラテンアメリカ',
        'wd_oceania' => 'オセアニア・太平洋',
        'wd_ancient' => '古代語・歴史上の言語',
        'wd_other' => 'その他',
        'wd_link' => '単語',
        'wd_index_h1' => '{w}語すべて',
        'wd_index_meta' => 'ワードマップに載っている全{w}語を、{n}言語の発音つきで。',
        'wd_title' => '「{name}」を{n}言語で何と言う？ 発音つき',
        'wd_meta' => '「{name}」を{n}言語でどう言うか。発音と現地表記つき。',
        'wd_forms' => '{n}言語',
        'wd_open_app' => '地図で「{name}」を見る',
    ],
    'ko' => [
        'wd_forms_n' => '{n}가지 표기',
        'wd_readings' => '같은 표기로 {n}가지 발음',
        'wd_same_in' => '{n}개 지역에서 동일',
        'wd_more' => '외 {n}개',
        'wd_zh_group' => '중국어',
        'wd_major' => '주요 언어',
        'wd_east_asia' => '동아시아',
        'wd_se_asia' => '동남아시아',
        'wd_south_asia' => '남아시아',
        'wd_mideast_ca' => '중동·중앙아시아',
        'wd_north_asia' => '시베리아·북아시아',
        'wd_europe' => '유럽',
        'wd_africa' => '아프리카',
        'wd_north_america' => '북아메리카',
        'wd_latin_america' => '라틴아메리카',
        'wd_oceania' => '오세아니아·태평양',
        'wd_ancient' => '고대어·역사 속 언어',
        'wd_other' => '기타',
        'wd_link' => '단어',
        'wd_index_h1' => '전체 {w}개 단어',
        'wd_index_meta' => '워드맵의 모든 단어 — {n}개 언어의 {w}개 개념을 발음과 함께.',
        'wd_title' => '‘{name}’{을} {n}개 언어로 어떻게 말할까? 발음과 함께',
        'wd_meta' => '「{name}」{을} {n}개 언어로 어떻게 말하는지, 발음과 현지 문자로.',
        'wd_forms' => '{n}개 언어',
        'wd_open_app' => '지도에서 「{name}」 보기',
    ],
    'zh' => [
        'wd_forms_n' => '{n} 种不同写法',
        'wd_readings' => '同样的写法有 {n} 种读音',
        'wd_same_in' => '{n} 个地区读法相同',
        'wd_more' => '另有 {n} 个',
        'wd_zh_group' => '汉语',
        'wd_major' => '主要语言',
        'wd_east_asia' => '东亚',
        'wd_se_asia' => '东南亚',
        'wd_south_asia' => '南亚',
        'wd_mideast_ca' => '中东与中亚',
        'wd_north_asia' => '西伯利亚与北亚',
        'wd_europe' => '欧洲',
        'wd_africa' => '非洲',
        'wd_north_america' => '北美洲',
        'wd_latin_america' => '拉丁美洲',
        'wd_oceania' => '大洋洲与太平洋',
        'wd_ancient' => '古代语言',
        'wd_other' => '其他',
        'wd_link' => '词语',
        'wd_index_h1' => '全部 {w} 个词',
        'wd_index_meta' => '词语地图收录的全部 {w} 个词，涵盖 {n} 种语言，附发音。',
        'wd_title' => '“{name}”用{n}种语言怎么说？附发音',
        'wd_meta' => '「{name}」在 {n} 种语言中怎么说，附发音与当地文字。',
        'wd_forms' => '{n} 种语言',
        'wd_open_app' => '在地图上看「{name}」',
    ],
    'yue' => [
        'wd_forms_n' => '{n} 種唔同寫法',
        'wd_readings' => '同樣寫法有 {n} 種讀音',
        'wd_same_in' => '{n} 個地區讀法相同',
        'wd_more' => '另有 {n} 個',
        'wd_zh_group' => '漢語',
        'wd_major' => '主要語言',
        'wd_east_asia' => '東亞',
        'wd_se_asia' => '東南亞',
        'wd_south_asia' => '南亞',
        'wd_mideast_ca' => '中東同中亞',
        'wd_north_asia' => '西伯利亞同北亞',
        'wd_europe' => '歐洲',
        'wd_africa' => '非洲',
        'wd_north_america' => '北美洲',
        'wd_latin_america' => '拉丁美洲',
        'wd_oceania' => '大洋洲同太平洋',
        'wd_ancient' => '古代語言',
        'wd_other' => '其他',
        'wd_link' => '詞語',
        'wd_index_h1' => '全部 {w} 個詞',
        'wd_index_meta' => '詞語地圖收錄嘅全部 {w} 個詞，涵蓋 {n} 種語言，附發音。',
        'wd_title' => '「{name}」用{n}種語言點講？附發音',
        'wd_meta' => '「{name}」喺 {n} 種語言點講，附發音同當地文字。',
        'wd_forms' => '{n} 種語言',
        'wd_open_app' => '喺地圖上面睇「{name}」',
    ],
    'vi' => [
        'wd_forms_n' => '{n} cách viết khác nhau',
        'wd_readings' => '{n} cách đọc cùng một chữ',
        'wd_same_in' => 'giống nhau ở {n} nơi',
        'wd_more' => 'và {n} nơi nữa',
        'wd_zh_group' => 'Tiếng Trung',
        'wd_major' => 'Ngôn ngữ lớn',
        'wd_east_asia' => 'Đông Á',
        'wd_se_asia' => 'Đông Nam Á',
        'wd_south_asia' => 'Nam Á',
        'wd_mideast_ca' => 'Trung Đông và Trung Á',
        'wd_north_asia' => 'Siberia và Bắc Á',
        'wd_europe' => 'Châu Âu',
        'wd_africa' => 'Châu Phi',
        'wd_north_america' => 'Bắc Mỹ',
        'wd_latin_america' => 'Mỹ Latinh',
        'wd_oceania' => 'Châu Đại Dương và Thái Bình Dương',
        'wd_ancient' => 'Ngôn ngữ cổ',
        'wd_other' => 'Nơi khác',
        'wd_link' => 'Từ vựng',
        'wd_index_h1' => 'Tất cả {w} từ',
        'wd_index_meta' => 'Mọi từ trên Bản đồ Từ vựng — {w} khái niệm trong {n} ngôn ngữ, kèm phát âm.',
        'wd_title' => '“{name}” trong {n} ngôn ngữ nói thế nào? Kèm phát âm',
        'wd_meta' => 'Cách nói “{name}” trong {n} ngôn ngữ, kèm phát âm và chữ viết bản địa.',
        'wd_forms' => '{n} ngôn ngữ',
        'wd_open_app' => 'Xem “{name}” trên bản đồ',
    ],
    'th' => [
        'wd_forms_n' => '{n} วิธีสะกด',
        'wd_readings' => 'เขียนเหมือนกันแต่อ่าน {n} แบบ',
        'wd_same_in' => 'อ่านเหมือนกันใน {n} แห่ง',
        'wd_more' => 'และอีก {n}',
        'wd_zh_group' => 'ภาษาจีน',
        'wd_major' => 'ภาษาหลัก',
        'wd_east_asia' => 'เอเชียตะวันออก',
        'wd_se_asia' => 'เอเชียตะวันออกเฉียงใต้',
        'wd_south_asia' => 'เอเชียใต้',
        'wd_mideast_ca' => 'ตะวันออกกลางและเอเชียกลาง',
        'wd_north_asia' => 'ไซบีเรียและเอเชียเหนือ',
        'wd_europe' => 'ยุโรป',
        'wd_africa' => 'แอฟริกา',
        'wd_north_america' => 'อเมริกาเหนือ',
        'wd_latin_america' => 'ละตินอเมริกา',
        'wd_oceania' => 'โอเชียเนียและแปซิฟิก',
        'wd_ancient' => 'ภาษาโบราณ',
        'wd_other' => 'อื่น ๆ',
        'wd_link' => 'คำศัพท์',
        'wd_index_h1' => 'คำทั้งหมด {w} คำ',
        'wd_index_meta' => 'ทุกคำในแผนที่คำศัพท์ — {w} มโนทัศน์ใน {n} ภาษา พร้อมคำอ่าน',
        'wd_title' => '“{name}” ใน {n} ภาษาพูดว่าอย่างไร? พร้อมการออกเสียง',
        'wd_meta' => '“{name}” พูดอย่างไรใน {n} ภาษา พร้อมคำอ่านและอักษรท้องถิ่น',
        'wd_forms' => '{n} ภาษา',
        'wd_open_app' => 'ดู “{name}” บนแผนที่',
    ],
    'id' => [
        'wd_forms_n' => '{n} ejaan berbeda',
        'wd_readings' => '{n} cara baca untuk ejaan yang sama',
        'wd_same_in' => 'sama di {n} wilayah',
        'wd_more' => 'dan {n} lainnya',
        'wd_zh_group' => 'Bahasa Tionghoa',
        'wd_major' => 'Bahasa utama',
        'wd_east_asia' => 'Asia Timur',
        'wd_se_asia' => 'Asia Tenggara',
        'wd_south_asia' => 'Asia Selatan',
        'wd_mideast_ca' => 'Timur Tengah & Asia Tengah',
        'wd_north_asia' => 'Siberia & Asia Utara',
        'wd_europe' => 'Eropa',
        'wd_africa' => 'Afrika',
        'wd_north_america' => 'Amerika Utara',
        'wd_latin_america' => 'Amerika Latin',
        'wd_oceania' => 'Oseania & Pasifik',
        'wd_ancient' => 'Bahasa kuno',
        'wd_other' => 'Lainnya',
        'wd_link' => 'Kata',
        'wd_index_h1' => 'Semua {w} kata',
        'wd_index_meta' => 'Setiap kata di Peta Kata — {w} konsep dalam {n} bahasa, lengkap dengan pelafalan.',
        'wd_title' => 'Cara mengucapkan “{name}” dalam {n} bahasa — beserta pelafalan',
        'wd_meta' => 'Cara mengucapkan “{name}” dalam {n} bahasa, dengan pelafalan dan aksara asli.',
        'wd_forms' => '{n} bahasa',
        'wd_open_app' => 'Lihat “{name}” di peta',
    ],
    'hi' => [
        'wd_forms_n' => '{n} अलग-अलग वर्तनी',
        'wd_readings' => 'एक ही वर्तनी के {n} उच्चारण',
        'wd_same_in' => '{n} जगहों पर एक जैसा',
        'wd_more' => 'और {n}',
        'wd_zh_group' => 'चीनी',
        'wd_major' => 'प्रमुख भाषाएँ',
        'wd_east_asia' => 'पूर्वी एशिया',
        'wd_se_asia' => 'दक्षिण-पूर्व एशिया',
        'wd_south_asia' => 'दक्षिण एशिया',
        'wd_mideast_ca' => 'मध्य पूर्व और मध्य एशिया',
        'wd_north_asia' => 'साइबेरिया और उत्तरी एशिया',
        'wd_europe' => 'यूरोप',
        'wd_africa' => 'अफ़्रीका',
        'wd_north_america' => 'उत्तरी अमेरिका',
        'wd_latin_america' => 'लैटिन अमेरिका',
        'wd_oceania' => 'ओशिआनिया और प्रशांत',
        'wd_ancient' => 'प्राचीन भाषाएँ',
        'wd_other' => 'अन्य',
        'wd_link' => 'शब्द',
        'wd_index_h1' => 'सभी {w} शब्द',
        'wd_index_meta' => 'वर्ड मैप के सभी शब्द — {n} भाषाओं में {w} अवधारणाएँ, उच्चारण सहित।',
        'wd_title' => '“{name}” को {n} भाषाओं में कैसे कहते हैं — उच्चारण सहित',
        'wd_meta' => '{n} भाषाओं में “{name}” कैसे कहते हैं — उच्चारण और मूल लिपि के साथ।',
        'wd_forms' => '{n} भाषाएँ',
        'wd_open_app' => 'मानचित्र पर “{name}” देखें',
    ],
    'de' => [
        'wd_forms_n' => '{n} verschiedene Schreibweisen',
        'wd_readings' => '{n} Aussprachen derselben Schreibung',
        'wd_same_in' => 'in {n} Gebieten gleich',
        'wd_more' => 'und {n} weitere',
        'wd_zh_group' => 'Chinesisch',
        'wd_major' => 'Große Sprachen',
        'wd_east_asia' => 'Ostasien',
        'wd_se_asia' => 'Südostasien',
        'wd_south_asia' => 'Südasien',
        'wd_mideast_ca' => 'Naher Osten & Zentralasien',
        'wd_north_asia' => 'Sibirien & Nordasien',
        'wd_europe' => 'Europa',
        'wd_africa' => 'Afrika',
        'wd_north_america' => 'Nordamerika',
        'wd_latin_america' => 'Lateinamerika',
        'wd_oceania' => 'Ozeanien & Pazifik',
        'wd_ancient' => 'Alte Sprachen',
        'wd_other' => 'Sonstige',
        'wd_link' => 'Wörter',
        'wd_index_h1' => 'Alle {w} Wörter',
        'wd_index_meta' => 'Jedes Wort der Wortkarte — {w} Begriffe in {n} Sprachen, mit Aussprache.',
        'wd_title' => 'Was heißt „{name}“ in {n} Sprachen? Mit Aussprache',
        'wd_meta' => 'Wie man „{name}“ in {n} Sprachen sagt – mit Aussprache und Originalschrift.',
        'wd_forms' => '{n} Sprachen',
        'wd_open_app' => '„{name}“ auf der Karte ansehen',
    ],
    'fr' => [
        'wd_forms_n' => '{n} graphies différentes',
        'wd_readings' => '{n} prononciations pour la même graphie',
        'wd_same_in' => 'identique dans {n} régions',
        'wd_more' => 'et {n} autres',
        'wd_zh_group' => 'Chinois',
        'wd_major' => 'Grandes langues',
        'wd_east_asia' => 'Asie de l’Est',
        'wd_se_asia' => 'Asie du Sud-Est',
        'wd_south_asia' => 'Asie du Sud',
        'wd_mideast_ca' => 'Moyen-Orient et Asie centrale',
        'wd_north_asia' => 'Sibérie et Asie du Nord',
        'wd_europe' => 'Europe',
        'wd_africa' => 'Afrique',
        'wd_north_america' => 'Amérique du Nord',
        'wd_latin_america' => 'Amérique latine',
        'wd_oceania' => 'Océanie et Pacifique',
        'wd_ancient' => 'Langues anciennes',
        'wd_other' => 'Ailleurs',
        'wd_link' => 'Mots',
        'wd_index_h1' => 'Les {w} mots',
        'wd_index_meta' => 'Tous les mots de la Carte des mots — {w} notions dans {n} langues, avec la prononciation.',
        'wd_title' => 'Comment dit-on « {name} » dans {n} langues ? Avec la prononciation',
        'wd_meta' => 'Comment dire « {name} » en {n} langues, avec la prononciation et l’écriture d’origine.',
        'wd_forms' => '{n} langues',
        'wd_open_app' => 'Voir « {name} » sur la carte',
    ],
    'it' => [
        'wd_forms_n' => '{n} grafie diverse',
        'wd_readings' => '{n} pronunce della stessa grafia',
        'wd_same_in' => 'uguale in {n} aree',
        'wd_more' => 'e altre {n}',
        'wd_zh_group' => 'Cinese',
        'wd_major' => 'Lingue principali',
        'wd_east_asia' => 'Asia orientale',
        'wd_se_asia' => 'Sud-est asiatico',
        'wd_south_asia' => 'Asia meridionale',
        'wd_mideast_ca' => 'Medio Oriente e Asia centrale',
        'wd_north_asia' => 'Siberia e Asia settentrionale',
        'wd_europe' => 'Europa',
        'wd_africa' => 'Africa',
        'wd_north_america' => 'America del Nord',
        'wd_latin_america' => 'America Latina',
        'wd_oceania' => 'Oceania e Pacifico',
        'wd_ancient' => 'Lingue antiche',
        'wd_other' => 'Altrove',
        'wd_link' => 'Parole',
        'wd_index_h1' => 'Tutte le {w} parole',
        'wd_index_meta' => 'Ogni parola della Mappa delle parole — {w} concetti in {n} lingue, con la pronuncia.',
        'wd_title' => 'Come si dice “{name}” in {n} lingue? Con la pronuncia',
        'wd_meta' => 'Come si dice «{name}» in {n} lingue, con pronuncia e scrittura originale.',
        'wd_forms' => '{n} lingue',
        'wd_open_app' => 'Vedi «{name}» sulla mappa',
    ],
    'es' => [
        'wd_forms_n' => '{n} grafías distintas',
        'wd_readings' => '{n} pronunciaciones de la misma grafía',
        'wd_same_in' => 'igual en {n} zonas',
        'wd_more' => 'y {n} más',
        'wd_zh_group' => 'Chino',
        'wd_major' => 'Lenguas principales',
        'wd_east_asia' => 'Asia Oriental',
        'wd_se_asia' => 'Sudeste Asiático',
        'wd_south_asia' => 'Asia del Sur',
        'wd_mideast_ca' => 'Oriente Medio y Asia Central',
        'wd_north_asia' => 'Siberia y Asia del Norte',
        'wd_europe' => 'Europa',
        'wd_africa' => 'África',
        'wd_north_america' => 'América del Norte',
        'wd_latin_america' => 'América Latina',
        'wd_oceania' => 'Oceanía y el Pacífico',
        'wd_ancient' => 'Lenguas antiguas',
        'wd_other' => 'Otros',
        'wd_link' => 'Palabras',
        'wd_index_h1' => 'Las {w} palabras',
        'wd_index_meta' => 'Todas las palabras del Mapa de palabras: {w} conceptos en {n} lenguas, con pronunciación.',
        'wd_title' => '¿Cómo se dice «{name}» en {n} lenguas? Con pronunciación',
        'wd_meta' => 'Cómo se dice «{name}» en {n} lenguas, con pronunciación y escritura original.',
        'wd_forms' => '{n} lenguas',
        'wd_open_app' => 'Ver «{name}» en el mapa',
    ],
    'pt' => [
        'wd_forms_n' => '{n} grafias diferentes',
        'wd_readings' => '{n} pronúncias da mesma grafia',
        'wd_same_in' => 'igual em {n} regiões',
        'wd_more' => 'e mais {n}',
        'wd_zh_group' => 'Chinês',
        'wd_major' => 'Línguas principais',
        'wd_east_asia' => 'Ásia Oriental',
        'wd_se_asia' => 'Sudeste Asiático',
        'wd_south_asia' => 'Ásia do Sul',
        'wd_mideast_ca' => 'Médio Oriente e Ásia Central',
        'wd_north_asia' => 'Sibéria e Ásia do Norte',
        'wd_europe' => 'Europa',
        'wd_africa' => 'África',
        'wd_north_america' => 'América do Norte',
        'wd_latin_america' => 'América Latina',
        'wd_oceania' => 'Oceania e Pacífico',
        'wd_ancient' => 'Línguas antigas',
        'wd_other' => 'Outras',
        'wd_link' => 'Palavras',
        'wd_index_h1' => 'Todas as {w} palavras',
        'wd_index_meta' => 'Cada palavra do Mapa de Palavras — {w} conceitos em {n} línguas, com pronúncia.',
        'wd_title' => 'Como se diz “{name}” em {n} línguas? Com pronúncia',
        'wd_meta' => 'Como se diz «{name}» em {n} línguas, com pronúncia e escrita original.',
        'wd_forms' => '{n} línguas',
        'wd_open_app' => 'Ver «{name}» no mapa',
    ],
    'ru' => [
        'wd_forms_n' => ['one' => '{n} разное написание', 'few' => '{n} разных написания', 'other' => '{n} разных написаний'],
        'wd_readings' => ['one' => '{n} чтение одного написания', 'few' => '{n} чтения одного написания', 'other' => '{n} чтений одного написания'],
        'wd_same_in' => ['one' => 'одинаково в {n} месте', 'other' => 'одинаково в {n} местах'],
        'wd_more' => 'и ещё {n}',
        'wd_zh_group' => 'Китайский',
        'wd_major' => 'Основные языки',
        'wd_east_asia' => 'Восточная Азия',
        'wd_se_asia' => 'Юго-Восточная Азия',
        'wd_south_asia' => 'Южная Азия',
        'wd_mideast_ca' => 'Ближний Восток и Центральная Азия',
        'wd_north_asia' => 'Сибирь и Северная Азия',
        'wd_europe' => 'Европа',
        'wd_africa' => 'Африка',
        'wd_north_america' => 'Северная Америка',
        'wd_latin_america' => 'Латинская Америка',
        'wd_oceania' => 'Океания и Тихий океан',
        'wd_ancient' => 'Древние языки',
        'wd_other' => 'Прочее',
        'wd_link' => 'Слова',
        'wd_index_h1' => 'Все слова ({w})',
        'wd_index_meta' => 'Каждое слово Карты слов с произношением: понятий — {w}, языков — {n}.',
        'wd_title' => ['one' => '«{name}» на {n} языке', 'other' => '«{name}» на {n} языках'],
        'wd_meta' => ['one' => 'Как сказать «{name}» на {n} языке — с произношением и родным письмом.', 'other' => 'Как сказать «{name}» на {n} языках — с произношением и родным письмом.'],
        'wd_forms' => ['one' => '{n} язык', 'few' => '{n} языка', 'many' => '{n} языков', 'other' => '{n} языка'],
        'wd_open_app' => 'Посмотреть «{name}» на карте',
    ],
    'uk' => [
        'wd_forms_n' => ['one' => '{n} різне написання', 'few' => '{n} різні написання', 'other' => '{n} різних написань'],
        'wd_readings' => ['one' => '{n} читання того самого написання', 'few' => '{n} читання того самого написання', 'other' => '{n} читань того самого написання'],
        'wd_same_in' => ['one' => 'однаково в {n} місці', 'other' => 'однаково у {n} місцях'],
        'wd_more' => 'і ще {n}',
        'wd_zh_group' => 'Китайська',
        'wd_major' => 'Основні мови',
        'wd_east_asia' => 'Східна Азія',
        'wd_se_asia' => 'Південно-Східна Азія',
        'wd_south_asia' => 'Південна Азія',
        'wd_mideast_ca' => 'Близький Схід і Центральна Азія',
        'wd_north_asia' => 'Сибір і Північна Азія',
        'wd_europe' => 'Європа',
        'wd_africa' => 'Африка',
        'wd_north_america' => 'Північна Америка',
        'wd_latin_america' => 'Латинська Америка',
        'wd_oceania' => 'Океанія і Тихий океан',
        'wd_ancient' => 'Давні мови',
        'wd_other' => 'Інше',
        'wd_link' => 'Слова',
        'wd_index_h1' => 'Усі слова ({w})',
        'wd_index_meta' => 'Кожне слово Карти слів із вимовою: понять — {w}, мов — {n}.',
        'wd_title' => ['one' => '«{name}» {n} мовою', 'other' => '«{name}» {n} мовами'],
        'wd_meta' => ['one' => 'Як сказати «{name}» {n} мовою — з вимовою та рідним письмом.', 'other' => 'Як сказати «{name}» {n} мовами — з вимовою та рідним письмом.'],
        'wd_forms' => ['one' => '{n} мова', 'few' => '{n} мови', 'many' => '{n} мов', 'other' => '{n} мови'],
        'wd_open_app' => 'Подивитися «{name}» на карті',
    ],
    'ar' => [
        'wd_forms_n' => ['two' => 'طريقتا كتابة مختلفتان', 'few' => '{n} طرق كتابة مختلفة', 'other' => '{n} طريقة كتابة مختلفة'],
        'wd_readings' => ['two' => 'طريقتا نطق لنفس الكتابة', 'few' => '{n} طرق نطق لنفس الكتابة', 'many' => '{n} نطقًا لنفس الكتابة', 'other' => '{n} طريقة نطق لنفس الكتابة'],
        'wd_same_in' => ['two' => 'متطابق في منطقتين', 'few' => 'متطابق في {n} مناطق', 'other' => 'متطابق في {n} منطقة'],
        'wd_more' => 'و{n} أخرى',
        'wd_zh_group' => 'الصينية',
        'wd_major' => 'اللغات الكبرى',
        'wd_east_asia' => 'شرق آسيا',
        'wd_se_asia' => 'جنوب شرق آسيا',
        'wd_south_asia' => 'جنوب آسيا',
        'wd_mideast_ca' => 'الشرق الأوسط وآسيا الوسطى',
        'wd_north_asia' => 'سيبيريا وشمال آسيا',
        'wd_europe' => 'أوروبا',
        'wd_africa' => 'أفريقيا',
        'wd_north_america' => 'أمريكا الشمالية',
        'wd_latin_america' => 'أمريكا اللاتينية',
        'wd_oceania' => 'أوقيانوسيا والمحيط الهادئ',
        'wd_ancient' => 'اللغات القديمة',
        'wd_other' => 'أخرى',
        'wd_link' => 'الكلمات',
        'wd_index_h1' => 'كل الكلمات الـ{w}',
        'wd_index_meta' => 'كل كلمة في خريطة الكلمات مع النطق: عدد المفاهيم {w}، وعدد اللغات {n}.',
        'wd_title' => ['few' => '«{name}» في {n} لغات', 'other' => '«{name}» في {n} لغة'],
        'wd_meta' => ['few' => 'كيف تقول «{name}» في {n} لغات، مع النطق والكتابة الأصلية.', 'other' => 'كيف تقول «{name}» في {n} لغة، مع النطق والكتابة الأصلية.'],
        'wd_forms' => ['few' => '{n} لغات', 'other' => '{n} لغة'],
        'wd_open_app' => 'شاهد «{name}» على الخريطة',
    ],
    'he' => [
        'wd_forms_n' => '{n} כתיבים שונים',
        'wd_readings' => '{n} הגיות לאותו כתיב',
        'wd_same_in' => 'זהה ב-{n} מקומות',
        'wd_more' => 'ועוד {n}',
        'wd_zh_group' => 'סינית',
        'wd_major' => 'שפות מרכזיות',
        'wd_east_asia' => 'מזרח אסיה',
        'wd_se_asia' => 'דרום-מזרח אסיה',
        'wd_south_asia' => 'דרום אסיה',
        'wd_mideast_ca' => 'המזרח התיכון ומרכז אסיה',
        'wd_north_asia' => 'סיביר וצפון אסיה',
        'wd_europe' => 'אירופה',
        'wd_africa' => 'אפריקה',
        'wd_north_america' => 'צפון אמריקה',
        'wd_latin_america' => 'אמריקה הלטינית',
        'wd_oceania' => 'אוקיאניה והאוקיינוס השקט',
        'wd_ancient' => 'שפות עתיקות',
        'wd_other' => 'אחר',
        'wd_link' => 'מילים',
        'wd_index_h1' => 'כל {w} המילים',
        'wd_index_meta' => 'כל מילה במפת המילים — {w} מושגים ב-{n} שפות, עם הגייה.',
        'wd_title' => 'איך אומרים „{name}” ב־{n} שפות? עם הגייה',
        'wd_meta' => 'איך אומרים «{name}» ב-{n} שפות, עם הגייה וכתב מקורי.',
        'wd_forms' => '{n} שפות',
        'wd_open_app' => 'לראות «{name}» על המפה',
    ],
    'sw' => [
        'wd_forms_n' => 'tahajia {n} tofauti',
        'wd_readings' => 'matamshi {n} ya tahajia moja',
        'wd_same_in' => 'sawa katika maeneo {n}',
        'wd_more' => 'na mengine {n}',
        'wd_zh_group' => 'Kichina',
        'wd_major' => 'Lugha kuu',
        'wd_east_asia' => 'Asia ya Mashariki',
        'wd_se_asia' => 'Asia ya Kusini-Mashariki',
        'wd_south_asia' => 'Asia ya Kusini',
        'wd_mideast_ca' => 'Mashariki ya Kati na Asia ya Kati',
        'wd_north_asia' => 'Siberia na Asia ya Kaskazini',
        'wd_europe' => 'Ulaya',
        'wd_africa' => 'Afrika',
        'wd_north_america' => 'Amerika Kaskazini',
        'wd_latin_america' => 'Amerika Kusini',
        'wd_oceania' => 'Oceania na Pasifiki',
        'wd_ancient' => 'Lugha za kale',
        'wd_other' => 'Nyingine',
        'wd_link' => 'Maneno',
        'wd_index_h1' => 'Maneno yote {w}',
        'wd_index_meta' => 'Kila neno kwenye Ramani ya Maneno — dhana {w} katika lugha {n}, pamoja na matamshi.',
        'wd_title' => 'Unasemaje “{name}” katika lugha {n}? Pamoja na matamshi',
        'wd_meta' => 'Jinsi ya kusema “{name}” katika lugha {n}, pamoja na matamshi na maandishi asilia.',
        'wd_forms' => 'lugha {n}',
        'wd_open_app' => 'Tazama “{name}” kwenye ramani',
    ],
];

const SEO_T = [
    'en' => [
        'family' => 'Family', 'speakers' => 'Speakers', 'script' => 'Script',
        'region' => 'Region', 'countries' => 'Countries', 'official' => 'Official in',
        'reading' => 'Reading',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Vitality',
        'aliases' => 'Also known as', 'romanization' => 'Romanization',
        'ex_words' => 'Words compared', 'ex_wordorder' => 'Word order compared', 'ex_han' => 'Han readings compared',
        'wo_major' => 'Compare with major world languages', 'wo_close' => 'Compare with languages in the same classification',
        'cmp_caption' => 'Compared with languages in the same classification: {family}',
        'ex_prev' => 'Prev', 'ex_next' => 'Next', 'ex_page' => 'Page', 'ex_pick' => 'Sentence',
        'th_char' => 'Character', 'th_gloss' => 'Meaning', 'th_read' => 'Reading', 'th_form' => 'Form',
        'where' => 'Where it is spoken',
        'crumbs' => 'Breadcrumb',
        'open_app' => 'Open {name} in the interactive map →',
        'goods_title' => 'Wear this language',
        'goods_sub' => 'See the design →',
        'goods_lede' => 'Pick any of the {w} {name} words on this page — printed in the same typeface as the map.',
        'goods_peek' => '👕 The words of this language can also go on a T-shirt (below)',
        'goods_title_n' => 'Wear a language spoken by about {n} people.',
        'goods_note' => 'You try the design on our partner shop\'s page, and decide whether to order after you have seen it.',
        'open_app_wm' => 'Open the interactive Word Map →',
        'open_app_hm' => 'Open the interactive Han Map →',
        'related' => 'Comparisons & other languages',
        'cmp_major' => 'Compare with major languages',
        'cmp_related' => 'Compare with languages in the same classification: {family}',
        'cmp_note' => 'Comparisons are of word form & pronunciation (not word order).',
        'same_family' => 'Same classification',
        'crossmap_wm' => 'View {name} in the Word Map',
        'crossmap_hm' => 'View {name} in the Han Map',
        'picker' => 'Language', 'switch' => 'Switch', 'stay' => 'Stay',
        'switch_to' => 'Switch to {name}?',
        'sources' => 'Sources', 'languages' => 'Languages',
        'hidden' => 'Historical & hidden varieties',
        'foot' => 'Part of LangMap — a linguistic visualization project. This is a static, crawlable summary; the interactive maps offer pronunciation audio, filters, and a globe view.',
        'open_map' => 'Open the interactive map', 'made_by' => 'Made by',
        'words_heading' => '{w} core words in {name}',
        'chars_heading' => 'Han character readings in {name}',
        'hidden_tag' => 'historical / hidden variety',
        'wm_lang_title' => '{w} words & pronunciations',
        'hm_lang_title' => 'Han character readings',
        'wm_t2' => '{name}: hello, thank you & {w} words with pronunciation', 'hm_t2' => '{name}: how {n} Chinese characters are read', 'hm_t2_words' => '{name}: native words for {n} Chinese characters', 'hm_t2_loans' => '{name}: {n} early Chinese loanwords','wm_q' => 'How do you say “{word}” in {name}? {form}.', 'aka' => 'Also called {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1,190 languages on a map: words, Chinese characters, names, calendars',
        'hub_desc' => 'How do you say water, thank you or mother in 1,190 languages? Browse every language with pronunciation (IPA), how Chinese characters are read across Asia, and short articles about languages.',
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
        'crumbs' => 'パンくずリスト',
        'open_app' => '{name}をインタラクティブマップで開く →',
        'goods_title' => 'この言語を、着る。',
        'goods_sub' => 'デザインを見てみる →',
        'goods_lede' => '{name}の{w}語から、好きなものを選ぶだけ。地図と同じ書体でプリントされます。',
        'goods_peek' => '👕 この言語の単語は、Tシャツにもできます（ページ下）',
        'goods_title_n' => '約{n}人が話す言葉を、身につける。',
        'goods_note' => 'デザインは提携ショップのページで試せます。注文するかは、見てから決められます。',
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
        'open_map' => 'インタラクティブ版を開く', 'made_by' => '制作',
        'words_heading' => '{name}の基本{w}語',
        'chars_heading' => '{name}の漢字の読み',
        'hidden_tag' => '歴史的・非表示の変種',
        'wm_lang_title' => '{w}語と発音',
        'hm_lang_title' => '漢字の読み',
        'wm_t2' => '{name}で「こんにちは」「ありがとう」は？ 発音つき{w}語', 'hm_t2' => '{name}の漢字の読み方 {n}字', 'hm_t2_words' => '{name}で漢字{n}字の意味を表す固有語', 'hm_t2_loans' => '{name}の古い漢語借用語 {n}語','wm_q' => '{name}で「{word}」は何と言う？ {form}。', 'aka' => '別名：{list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1,190言語を地図で：単語・漢字・名前・暦',
        'hub_desc' => '「水」「ありがとう」「母」は1,190の言語で何と言う？ 発音（IPA）つきで言語ごとに一覧。漢字のアジア各地での読み方や、言語にまつわる読み物も。',
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
        'cmp_caption' => '같은 분류의 언어와 비교: {family}',
        'ex_prev' => '이전', 'ex_next' => '다음', 'ex_page' => '페이지', 'ex_pick' => '문장',
        'th_char' => '한자', 'th_gloss' => '뜻', 'th_read' => '독음', 'th_form' => '표기',
        'where' => '사용 지역',
        'crumbs' => '이동 경로',
        'open_app' => '인터랙티브 지도에서 {name} 열기 →',
        'goods_title' => '이 언어로 나만의 티셔츠를',
        'goods_sub' => '디자인 보기 →',
        'goods_lede' => '{name} 단어 {w}개 중 마음에 드는 것만 고르세요. 지도와 같은 글씨체로 프린트됩니다.',
        'goods_peek' => '👕 이 언어의 단어로 티셔츠도 만들 수 있어요 (아래)',
        'goods_title_n' => '약 {n}명이 쓰는 말을, 입어 보세요.',
        'goods_note' => '디자인은 제휴 쇼핑몰 페이지에서 해 볼 수 있어요. 주문은 보고 나서 정하면 됩니다.',
        'open_app_wm' => '인터랙티브 Word Map 열기 →',
        'open_app_hm' => '인터랙티브 Han Map 열기 →',
        'related' => '관련 언어와 비교',
        'cmp_major' => '주요 언어와 비교',
        'cmp_related' => '같은 분류의 언어와 비교하기: {family}',
        'cmp_note' => '비교는 어형·발음 비교입니다(어순 비교가 아닙니다).',
        'same_family' => '같은 분류',
        'crossmap_wm' => 'Word Map에서 {name} 보기',
        'crossmap_hm' => 'Han Map에서 {name} 보기',
        'picker' => '언어', 'switch' => '전환', 'stay' => '유지',
        'switch_to' => '{name}(으)로 전환할까요?',
        'sources' => '출처', 'languages' => '언어',
        'hidden' => '역사적·숨겨진 변종',
        'foot' => 'LangMap — 언어 시각화 프로젝트의 일부입니다. 정적이고 크롤링 가능한 요약이며, 인터랙티브 지도에서는 발음 음성, 필터, 지구본 보기를 제공합니다.',
        'open_map' => '인터랙티브 지도 열기', 'made_by' => '제작',
        'words_heading' => '{name}의 핵심 단어 {w}개',
        'chars_heading' => '{name}의 한자 독음',
        'hidden_tag' => '역사적·숨겨진 변종',
        'wm_lang_title' => '단어 {w}개와 발음',
        'hm_lang_title' => '한자 독음',
        'wm_t2' => '{name}{로} ‘안녕하세요’, ‘고맙습니다’는? 발음과 함께 보는 {w}단어', 'hm_t2' => '{name}의 한자 읽기 {n}자', 'hm_t2_words' => '{name}의 고유어로 본 한자 {n}자', 'hm_t2_loans' => '{name}의 이른 시기 중국어 차용어 {n}개', 'wm_q' => '{name}{로} ‘{word}’{은} 어떻게 말할까? {form}.', 'aka' => '다른 이름: {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 지도로 보는 1,190개 언어: 단어·한자·이름·달력',
        'hub_desc' => '‘물’, ‘고맙습니다’, ‘어머니’를 1,190개 언어로 어떻게 말할까? 발음(IPA)과 함께 언어별로 보고, 아시아 각지의 한자 읽기와 언어 읽을거리도 만나 보세요.',
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
        'cmp_caption' => '与同属{family}的语言比较',
        'ex_prev' => '上一页', 'ex_next' => '下一页', 'ex_page' => '页', 'ex_pick' => '句子',
        'th_char' => '汉字', 'th_gloss' => '含义', 'th_read' => '读音', 'th_form' => '写法',
        'where' => '使用地区',
        'crumbs' => '导航路径',
        'open_app' => '在交互式地图中打开{name} →',
        'goods_title' => '把这门语言穿上身',
        'goods_sub' => '看看设计 →',
        'goods_lede' => '从{w}个{name}单词里挑你喜欢的就行，用和地图一样的字体印出来。',
        'goods_peek' => '👕 这门语言的单词也能印在T恤上（见下方）',
        'goods_title_n' => '约{n}人说的语言，穿在身上。',
        'goods_note' => '设计可在合作商店的页面上试做，看过之后再决定是否下单。',
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
        'open_map' => '打开交互式地图', 'made_by' => '制作',
        'words_heading' => '{name}的{w}个核心词',
        'chars_heading' => '{name}的汉字读音',
        'hidden_tag' => '历史／隐藏变体',
        'wm_lang_title' => '{w}个词与发音',
        'hm_lang_title' => '汉字读音',
        'wm_t2' => '{name}的“你好”“谢谢”怎么说？{w}个常用词及发音', 'hm_t2' => '{name}怎么读汉字：{n}个字', 'hm_t2_words' => '{name}的固有词：对应{n}个汉字', 'hm_t2_loans' => '{name}中的早期汉语借词：{n}个','wm_q' => '“{word}”用{name}怎么说？{form}。', 'aka' => '又称：{list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 在地图上看1,190种语言：词汇、汉字、人名、历法',
        'hub_desc' => '“水”“谢谢”“妈妈”用1,190种语言怎么说？按语言浏览，附发音（IPA），还有汉字在亚洲各地的读法和语言趣谈。',
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
        'wo_major' => '同世界主要語言比較', 'wo_close' => '同譜系相近嘅語言比較',
        'cmp_caption' => '相關語言比較：{family}',
        'ex_prev' => '上一頁', 'ex_next' => '下一頁', 'ex_page' => '頁', 'ex_pick' => '句子',
        'th_char' => '漢字', 'th_gloss' => '意思', 'th_read' => '讀音', 'th_form' => '寫法',
        'where' => '使用地區',
        'crumbs' => '導覽路徑',
        'open_app' => '喺互動地圖打開{name} →',
        'goods_title' => '將呢種語言着上身',
        'goods_sub' => '睇吓設計 →',
        'goods_lede' => '喺{w}個{name}詞入面揀你中意嘅就得，用同地圖一樣嘅字體印出嚟。',
        'goods_peek' => '👕 呢種語言嘅詞都可以印落T恤（睇下面）',
        'goods_title_n' => '約{n}人講嘅語言，着上身。',
        'goods_note' => '設計可以喺合作商店嘅網頁度試整，睇完先決定落唔落單。',
        'open_app_wm' => '打開互動 Word Map →',
        'open_app_hm' => '打開互動 Han Map →',
        'related' => '相關語言同比較',
        'cmp_major' => '主要語言比較',
        'cmp_related' => '同系語言比較：{family}',
        'cmp_note' => '比較嘅係詞形同發音（唔係語序）。',
        'same_family' => '同一語系',
        'crossmap_wm' => '喺 Word Map 睇{name}',
        'crossmap_hm' => '喺 Han Map 睇{name}',
        'picker' => '語言', 'switch' => '切換', 'stay' => '保持',
        'switch_to' => '轉去{name}？',
        'sources' => '來源', 'languages' => '語言',
        'hidden' => '歷史同隱藏變體',
        'foot' => 'LangMap — 語言視覺化項目嘅一部分。呢個係靜態、可抓取嘅摘要；互動地圖提供發音音頻、篩選同地球視圖。',
        'open_map' => '打開互動地圖', 'made_by' => '製作',
        'words_heading' => '{name}嘅{w}個核心詞',
        'chars_heading' => '{name}嘅漢字讀音',
        'hidden_tag' => '歷史／隱藏變體',
        'wm_lang_title' => '{w}個詞同發音',
        'hm_lang_title' => '漢字讀音',
        'wm_t2' => '{name}嘅「你好」「多謝」點講？{w}個常用詞同發音', 'hm_t2' => '{name}點讀漢字：{n}個字', 'hm_t2_words' => '{name}嘅固有詞：對應{n}個漢字', 'hm_t2_loans' => '{name}入面嘅早期漢語借詞：{n}個','wm_q' => '「{word}」用{name}點講？{form}。', 'aka' => '又稱：{list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 喺地圖上睇1,190種語言：詞彙、漢字、人名、曆法',
        'hub_desc' => '「水」「多謝」「媽媽」用1,190種語言點講？按語言瀏覽，附發音（IPA），仲有漢字喺亞洲各地嘅讀法同語言趣談。',
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
        'wo_major' => 'So sánh với các ngôn ngữ lớn trên thế giới', 'wo_close' => 'So sánh với các ngôn ngữ có quan hệ gần',
        'cmp_caption' => 'So sánh trong cùng họ: {family}',
        'ex_prev' => 'Trước', 'ex_next' => 'Sau', 'ex_page' => 'Trang', 'ex_pick' => 'Câu',
        'th_char' => 'Chữ Hán', 'th_gloss' => 'Nghĩa', 'th_read' => 'Âm đọc', 'th_form' => 'Dạng viết',
        'where' => 'Nơi được sử dụng',
        'crumbs' => 'Đường dẫn',
        'open_app' => 'Mở {name} trên bản đồ tương tác →',
        'goods_title' => 'Mặc ngôn ngữ này',
        'goods_sub' => 'Xem thiết kế →',
        'goods_lede' => 'Chỉ cần chọn từ bạn thích trong {w} từ của {name} — in bằng đúng kiểu chữ trên bản đồ.',
        'goods_peek' => '👕 Từ của ngôn ngữ này cũng có thể in lên áo thun (bên dưới)',
        'goods_title_n' => 'Khoác lên mình ngôn ngữ của khoảng {n} người.',
        'goods_note' => 'Bạn thử thiết kế trên trang của cửa hàng đối tác, xem xong rồi mới quyết định có đặt hay không.',
        'open_app_wm' => 'Mở Word Map tương tác →',
        'open_app_hm' => 'Mở Han Map tương tác →',
        'related' => 'Ngôn ngữ liên quan & so sánh',
        'cmp_major' => 'So sánh với các ngôn ngữ lớn',
        'cmp_related' => 'Đối chiếu trong cùng họ: {family}',
        'cmp_note' => 'So sánh về hình thức từ & cách phát âm (không phải trật tự từ).',
        'same_family' => 'Cùng họ',
        'crossmap_wm' => 'Xem {name} trên Word Map',
        'crossmap_hm' => 'Xem {name} trên Han Map',
        'picker' => 'Ngôn ngữ', 'switch' => 'Chuyển', 'stay' => 'Giữ nguyên',
        'switch_to' => 'Chuyển sang {name}?',
        'sources' => 'Nguồn', 'languages' => 'Ngôn ngữ',
        'hidden' => 'Biến thể lịch sử & ẩn',
        'foot' => 'Một phần của LangMap — dự án trực quan hóa ngôn ngữ. Đây là bản tóm tắt tĩnh, có thể thu thập; bản đồ tương tác cung cấp âm thanh phát âm, bộ lọc và chế độ xem địa cầu.',
        'open_map' => 'Mở bản đồ tương tác', 'made_by' => 'Thực hiện bởi',
        'words_heading' => '{w} từ cốt lõi trong {name}',
        'chars_heading' => 'Cách đọc chữ Hán trong {name}',
        'hidden_tag' => 'biến thể lịch sử / ẩn',
        'wm_lang_title' => '{w} từ & cách phát âm',
        'hm_lang_title' => 'Cách đọc chữ Hán',
        'wm_t2' => '{name}: xin chào, cảm ơn và {w} từ kèm phát âm', 'hm_t2' => '{name}: cách đọc {n} chữ Hán', 'hm_t2_words' => '{name}: từ bản địa ứng với {n} chữ Hán', 'hm_t2_loans' => '{name}: {n} từ mượn tiếng Hán cổ','wm_q' => '“{word}” trong {name} nói thế nào? {form}.', 'aka' => 'Còn gọi là {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1.190 ngôn ngữ trên bản đồ: từ ngữ, chữ Hán, tên, lịch',
        'hub_desc' => '“Nước”, “cảm ơn”, “mẹ” trong 1.190 ngôn ngữ nói thế nào? Xem từng ngôn ngữ kèm phát âm (IPA), cách đọc chữ Hán khắp châu Á và các bài viết về ngôn ngữ.',
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
        'cmp_caption' => 'เปรียบเทียบกับภาษาที่เกี่ยวข้อง: {family}',
        'ex_prev' => 'ก่อนหน้า', 'ex_next' => 'ถัดไป', 'ex_page' => 'หน้า', 'ex_pick' => 'ประโยค',
        'th_char' => 'อักษร', 'th_gloss' => 'ความหมาย', 'th_read' => 'การอ่าน', 'th_form' => 'รูปเขียน',
        'where' => 'พื้นที่ที่ใช้พูด',
        'crumbs' => 'เส้นทางนำทาง',
        'open_app' => 'เปิด{name}ในแผนที่แบบโต้ตอบ →',
        'goods_title' => 'สวมภาษานี้',
        'goods_sub' => 'ดูแบบเสื้อ →',
        'goods_lede' => 'เลือกคำที่ชอบจาก {w} คำใน{name} แล้วสกรีนด้วยฟอนต์เดียวกับแผนที่',
        'goods_peek' => '👕 คำในภาษานี้นำไปสกรีนเสื้อยืดได้ด้วย (ด้านล่าง)',
        'goods_title_n' => 'สวมภาษาที่ผู้คนราว {n}คนพูด',
        'goods_note' => 'ลองออกแบบได้ที่หน้าร้านค้าพาร์ทเนอร์ ดูแล้วค่อยตัดสินใจว่าจะสั่งหรือไม่',
        'open_app_wm' => 'เปิด Word Map แบบโต้ตอบ →',
        'open_app_hm' => 'เปิด Han Map แบบโต้ตอบ →',
        'related' => 'ภาษาที่เกี่ยวข้องและการเปรียบเทียบ',
        'cmp_major' => 'เปรียบเทียบกับภาษาหลัก',
        'cmp_related' => 'เปรียบเทียบภาษาที่เกี่ยวข้อง: {family}',
        'cmp_note' => 'การเปรียบเทียบเป็นเรื่องรูปคำและการออกเสียง (ไม่ใช่ลำดับคำ)',
        'same_family' => 'ตระกูลเดียวกัน',
        'crossmap_wm' => 'ดู{name}ใน Word Map',
        'crossmap_hm' => 'ดู{name}ใน Han Map',
        'picker' => 'ภาษา', 'switch' => 'สลับ', 'stay' => 'คงไว้',
        'switch_to' => 'สลับเป็น{name}ไหม',
        'sources' => 'แหล่งข้อมูล', 'languages' => 'ภาษา',
        'hidden' => 'รูปแบบทางประวัติศาสตร์และที่ซ่อน',
        'foot' => 'ส่วนหนึ่งของ LangMap — โครงการแสดงภาพทางภาษาศาสตร์ นี่คือสรุปแบบสถิตที่ค้นเก็บได้ แผนที่แบบโต้ตอบมีเสียงการออกเสียง ตัวกรอง และมุมมองลูกโลก',
        'open_map' => 'เปิดแผนที่แบบโต้ตอบ', 'made_by' => 'จัดทำโดย',
        'words_heading' => '{w} คำหลักใน{name}',
        'chars_heading' => 'การอ่านอักษรจีนใน {name}',
        'hidden_tag' => 'รูปแบบทางประวัติศาสตร์ / ที่ซ่อน',
        'wm_lang_title' => '{w} คำและการออกเสียง',
        'hm_lang_title' => 'การอ่านอักษรจีน',
        'wm_t2' => '{name}: สวัสดี ขอบคุณ และอีก {w} คำ พร้อมการออกเสียง', 'hm_t2' => '{name}: วิธีอ่านอักษรจีน {n} ตัว', 'hm_t2_words' => '{name}: คำดั้งเดิมที่ตรงกับอักษรจีน {n} ตัว', 'hm_t2_loans' => '{name}: คำยืมภาษาจีนยุคเก่า {n} คำ','wm_q' => '“{word}” ใน{name}พูดว่าอย่างไร? {form}', 'aka' => 'ชื่ออื่น: {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1,190 ภาษาบนแผนที่: คำศัพท์ อักษรจีน ชื่อ ปฏิทิน',
        'hub_desc' => '“น้ำ” “ขอบคุณ” “แม่” ใน 1,190 ภาษาพูดว่าอย่างไร? ดูทีละภาษาพร้อมการออกเสียง (IPA) วิธีอ่านอักษรจีนทั่วเอเชีย และบทความเกี่ยวกับภาษา',
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
        'cmp_caption' => 'Dibandingkan dengan bahasa lain dalam klasifikasi yang sama: {family}',
        'ex_prev' => 'Sebelumnya', 'ex_next' => 'Berikutnya', 'ex_page' => 'Halaman', 'ex_pick' => 'Kalimat',
        'th_char' => 'Aksara', 'th_gloss' => 'Arti', 'th_read' => 'Bacaan', 'th_form' => 'Bentuk',
        'where' => 'Tempat dituturkan',
        'crumbs' => 'Jejak navigasi',
        'open_app' => 'Lihat {name} di peta interaktif →',
        'goods_title' => 'Kenakan bahasa ini',
        'goods_sub' => 'Lihat desainnya →',
        'goods_lede' => 'Pilih saja kata favoritmu dari {w} kata {name} — dicetak dengan huruf yang sama seperti di peta.',
        'goods_peek' => '👕 Kata-kata bahasa ini juga bisa jadi kaus (di bawah)',
        'goods_title_n' => 'Kenakan bahasa yang dituturkan sekitar {n} orang.',
        'goods_note' => 'Desainnya dicoba di halaman toko mitra kami; pesan atau tidak, putuskan setelah melihatnya.',
        'open_app_wm' => 'Buka Word Map interaktif →',
        'open_app_hm' => 'Buka Han Map interaktif →',
        'related' => 'Bahasa terkait & perbandingan',
        'cmp_major' => 'Bandingkan dengan bahasa utama',
        'cmp_related' => 'Bandingkan bahasa dalam klasifikasi yang sama: {family}',
        'cmp_note' => 'Perbandingan adalah bentuk kata & pelafalan (bukan urutan kata).',
        'same_family' => 'Klasifikasi yang sama',
        'crossmap_wm' => 'Lihat {name} di Word Map',
        'crossmap_hm' => 'Lihat {name} di Han Map',
        'picker' => 'Bahasa', 'switch' => 'Ganti', 'stay' => 'Tetap',
        'switch_to' => 'Ganti ke {name}?',
        'sources' => 'Sumber', 'languages' => 'Bahasa',
        'hidden' => 'Varietas historis & tersembunyi',
        'foot' => 'Bagian dari LangMap — proyek visualisasi linguistik. Ini ringkasan statis yang dapat dirayapi; peta interaktif menyediakan audio pelafalan, filter, dan tampilan globe.',
        'open_map' => 'Buka peta interaktif', 'made_by' => 'Dibuat oleh',
        'words_heading' => '{w} kata inti dalam {name}',
        'chars_heading' => 'Bacaan aksara Han dalam {name}',
        'hidden_tag' => 'varietas historis / tersembunyi',
        'wm_lang_title' => '{w} kata & pelafalan',
        'hm_lang_title' => 'Bacaan aksara Han',
        'wm_t2' => '{name}: halo, terima kasih & {w} kata beserta pelafalan', 'hm_t2' => '{name}: cara membaca {n} aksara Han', 'hm_t2_words' => '{name}: kata asli untuk {n} aksara Han', 'hm_t2_loans' => '{name}: {n} kata pinjaman Tionghoa awal','wm_q' => 'Apa bahasa {name}-nya “{word}”? {form}.', 'aka' => 'Disebut juga {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1.190 bahasa di peta: kata, aksara Han, nama, kalender',
        'hub_desc' => 'Bagaimana mengucapkan air, terima kasih, atau ibu dalam 1.190 bahasa? Jelajahi tiap bahasa beserta pelafalan (IPA), bacaan aksara Han di Asia, dan artikel tentang bahasa.',
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
        'reading' => 'पठन परंपरा',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'जीवंतता',
        'aliases' => 'अन्य नाम', 'romanization' => 'रोमनकरण',
        'ex_words' => 'शब्दों की तुलना', 'ex_wordorder' => 'शब्द-क्रम की तुलना', 'ex_han' => 'हान उच्चारण की तुलना',
        'wo_major' => 'विश्व की प्रमुख भाषाओं से तुलना', 'wo_close' => 'इसी वर्गीकरण की भाषाओं से तुलना',
        'cmp_caption' => 'इसी वर्गीकरण की भाषाओं से तुलना: {family}',
        'ex_prev' => 'पिछला', 'ex_next' => 'अगला', 'ex_page' => 'पृष्ठ', 'ex_pick' => 'वाक्य',
        'th_char' => 'अक्षर', 'th_gloss' => 'अर्थ', 'th_read' => 'उच्चारण', 'th_form' => 'रूप',
        'where' => 'कहाँ बोली जाती है',
        'crumbs' => 'नेविगेशन पथ',
        'open_app' => '{name} को इंटरैक्टिव मानचित्र में खोलें →',
        'goods_title' => 'इस भाषा को पहनें',
        'goods_sub' => 'डिज़ाइन देखें →',
        'goods_lede' => '{name} के {w} शब्दों में से अपने पसंदीदा चुनें — नक़्शे वाले उसी टाइपफ़ेस में छपेंगे।',
        'goods_peek' => '👕 इस भाषा के शब्द टी-शर्ट पर भी छप सकते हैं (नीचे)',
        'goods_title_n' => 'लगभग {n} लोगों की भाषा, अब पहनने के लिए।',
        'goods_note' => 'डिज़ाइन हमारे साझेदार स्टोर के पेज पर आज़माएँ; ऑर्डर करना है या नहीं, देखने के बाद तय करें।',
        'open_app_wm' => 'इंटरैक्टिव Word Map खोलें →',
        'open_app_hm' => 'इंटरैक्टिव Han Map खोलें →',
        'related' => 'तुलना और अन्य भाषाएँ',
        'cmp_major' => 'प्रमुख भाषाओं से तुलना करें',
        'cmp_related' => 'इसी वर्गीकरण की भाषाओं से तुलना करें: {family}',
        'cmp_note' => 'तुलना शब्द-रूप और उच्चारण की है (शब्द-क्रम की नहीं)।',
        'same_family' => 'इसी वर्गीकरण की भाषाएँ',
        'crossmap_wm' => '{name} को Word Map में देखें',
        'crossmap_hm' => '{name} को Han Map में देखें',
        'picker' => 'भाषा', 'switch' => 'बदलें', 'stay' => 'बने रहें',
        'switch_to' => '{name} पर स्विच करें?',
        'sources' => 'स्रोत', 'languages' => 'भाषाएँ',
        'hidden' => 'ऐतिहासिक और छिपी किस्में',
        'foot' => 'LangMap का हिस्सा — एक भाषाई विज़ुअलाइज़ेशन परियोजना। यह एक स्थिर, क्रॉल-योग्य सारांश है; इंटरैक्टिव मानचित्र उच्चारण ऑडियो, फ़िल्टर और ग्लोब दृश्य प्रदान करते हैं।',
        'open_map' => 'इंटरैक्टिव मानचित्र खोलें', 'made_by' => 'निर्माता',
        'words_heading' => '{name} में {w} मूल शब्द',
        'chars_heading' => '{name} में हान वर्णों के उच्चारण',
        'hidden_tag' => 'ऐतिहासिक / छिपी किस्म',
        'wm_lang_title' => '{w} शब्द और उच्चारण',
        'hm_lang_title' => 'हान वर्णों के उच्चारण',
        'wm_t2' => '{name} में नमस्ते, धन्यवाद और {w} शब्द — उच्चारण सहित', 'hm_t2' => '{name}: {n} चीनी अक्षर कैसे पढ़े जाते हैं', 'hm_t2_words' => '{name}: {n} चीनी अक्षरों के लिए देशी शब्द', 'hm_t2_loans' => '{name}: {n} प्रारंभिक चीनी उधार-शब्द','wm_q' => '{name} में “{word}” कैसे कहते हैं? {form}।', 'aka' => 'अन्य नाम: {list}',   // r28 search titles / snippet question / aliases
        'wm_lang_meta' => 'LangMap Word Map पर {name} में {w} मूल शब्दों के उच्चारण, IPA और मूल रूपों सहित।',
        'hm_lang_meta' => 'LangMap Han Map पर {name} में हान वर्णों के उच्चारण।',
        'wm_index_title' => 'Word Map — {n} भाषाओं में {w} मूल शब्द',
        'wm_index_desc' => 'LangMap Word Map पर {n} भाषाओं और किस्मों में {w} मूल शब्दों (पानी, आग, सूर्य, चंद्रमा, माँ…) के उच्चारण IPA और मूल रूपों सहित देखें।',
        'hm_index_title' => 'Han Map — {n} भाषाओं में हान वर्णों के उच्चारण',
        'hm_index_desc' => 'LangMap Han Map पर {n} सिनिटिक, जापोनिक, कोरियाई और वियतनामी किस्मों में {c} मूल हान वर्णों (一 二 三 日 月 山 水…) के उच्चारण की तुलना करें।',
        'wm_index_sub' => '{n} भाषाओं और किस्मों में {w} मूल शब्द — IPA उच्चारण सहित मूल रूप।',
        'hm_index_sub' => '{n} भाषाओं और किस्मों में {c} मूल हान वर्ण — IPA / रोमन उच्चारण सहित वर्ण रूप।',
        'see_also' => 'यह भी देखें',
        'home' => 'LangMap होम',
        'hub_title' => 'LangMap — नक़्शे पर 1,190 भाषाएँ: शब्द, चीनी अक्षर, नाम, पंचांग',
        'hub_desc' => 'पानी, धन्यवाद या माँ को 1,190 भाषाओं में कैसे कहते हैं? हर भाषा उच्चारण (IPA) के साथ देखें, एशिया भर में चीनी अक्षरों के उच्चारण और भाषाओं पर लेख भी।',
        'hub_h1' => 'LangMap पाठ सूचकांक',
        'hub_sub' => 'सर्वर-रेंडर किए गए, प्रत्येक भाषा के क्रॉल-योग्य सारांश।',
        'maps' => 'मानचित्र',
        'wm_link' => 'Word Map — {w} मूल शब्द',
        'hm_link' => 'Han Map — हान वर्णों के उच्चारण',
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
        'cmp_caption' => 'Verglichen mit verwandten Sprachen: {family}',
        'ex_prev' => 'Zurück', 'ex_next' => 'Weiter', 'ex_page' => 'Seite', 'ex_pick' => 'Satz',
        'th_char' => 'Schriftzeichen', 'th_gloss' => 'Bedeutung', 'th_read' => 'Lesung', 'th_form' => 'Form',
        'where' => 'Wo die Sprache gesprochen wird',
        'crumbs' => 'Brotkrümelnavigation',
        'open_app' => '{name} in der interaktiven Karte öffnen →',
        'goods_title' => 'Trag diese Sprache',
        'goods_sub' => 'Entwurf ansehen →',
        'goods_lede' => '{name}: {w} Wörter zur Auswahl — gedruckt in derselben Schrift wie auf der Karte.',
        'goods_peek' => '👕 Die Wörter dieser Sprache gibt es auch als T-Shirt (unten)',
        'goods_title_n' => 'Trag eine Sprache, die rund {n} Menschen sprechen.',
        'goods_note' => 'Den Entwurf probierst du auf der Seite unseres Partnershops aus – bestellen kannst du danach, wenn er dir gefällt.',
        'open_app_wm' => 'Die interaktive Word Map öffnen →',
        'open_app_hm' => 'Die interaktive Han Map öffnen →',
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
        'open_map' => 'Die interaktive Karte öffnen', 'made_by' => 'Erstellt von',
        'words_heading' => '{name}: {w} Kernwörter',
        'chars_heading' => 'Lesungen der Han-Zeichen in {name}',
        'hidden_tag' => 'historische / verborgene Varietät',
        'wm_lang_title' => '{w} Wörter & Aussprache',
        'hm_lang_title' => 'Lesungen der Han-Zeichen',
        'wm_t2' => '{name}: Hallo, danke & {w} Wörter mit Aussprache', 'hm_t2' => '{name}: wie {n} chinesische Schriftzeichen gelesen werden', 'hm_t2_words' => '{name}: Erbwörter für {n} chinesische Schriftzeichen', 'hm_t2_loans' => '{name}: {n} frühe chinesische Lehnwörter', 'wm_q' => '{name}: Was heißt „{word}“? {form}.', 'aka' => 'Auch genannt: {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1.190 Sprachen auf der Karte: Wörter, chinesische Schriftzeichen, Namen, Kalender',
        'hub_desc' => 'Was heißt Wasser, danke oder Mutter in 1.190 Sprachen? Jede Sprache mit Aussprache (IPA), wie chinesische Schriftzeichen in ganz Asien gelesen werden, und kurze Artikel über Sprachen.',
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
        'cmp_caption' => 'Comparaison avec les langues de la même famille : {family}',
        'ex_prev' => 'Préc.', 'ex_next' => 'Suiv.', 'ex_page' => 'Page', 'ex_pick' => 'Phrase',
        'th_char' => 'Caractère', 'th_gloss' => 'Sens', 'th_read' => 'Lecture', 'th_form' => 'Forme',
        'where' => 'Où elle est parlée',
        'crumbs' => 'Fil d’Ariane',
        'open_app' => 'Ouvrir {name} dans la carte interactive →',
        'goods_title' => 'Portez cette langue',
        'goods_sub' => 'Voir le design →',
        'goods_lede' => 'Choisissez parmi les {w} mots en {name} — imprimés dans la même police que la carte.',
        'goods_peek' => '👕 Les mots de cette langue existent aussi en t-shirt (plus bas)',
        'goods_title_n' => 'Portez une langue parlée par environ {n} personnes.',
        'goods_note' => 'Le design s\'essaie sur la page de notre boutique partenaire ; vous décidez de commander après l\'avoir vu.',
        'open_app_wm' => 'Ouvrir la Word Map interactive →',
        'open_app_hm' => 'Ouvrir la Han Map interactive →',
        'related' => 'Langues apparentées et comparaisons',
        'cmp_major' => 'Comparer avec les grandes langues',
        'cmp_related' => 'Comparer aux langues apparentées : {family}',
        'cmp_note' => 'Les comparaisons portent sur la forme et la prononciation (pas l’ordre des mots).',
        'same_family' => 'Même famille',
        'crossmap_wm' => 'Voir {name} dans la Word Map',
        'crossmap_hm' => 'Voir {name} dans la Han Map',
        'picker' => 'Langue', 'switch' => 'Changer', 'stay' => 'Rester',
        'switch_to' => 'Afficher {name} ?',
        'sources' => 'Sources', 'languages' => 'Langues',
        'hidden' => 'Variétés historiques & masquées',
        'foot' => 'Fait partie de LangMap — un projet de visualisation linguistique. Ceci est un résumé statique et explorable ; les cartes interactives offrent l’audio de prononciation, des filtres et une vue globe.',
        'open_map' => 'Ouvrir la carte interactive', 'made_by' => 'Réalisé par',
        'words_heading' => '{w} mots essentiels en {name}',
        'chars_heading' => 'Lectures des caractères han en {name}',
        'hidden_tag' => 'variété historique / masquée',
        'wm_lang_title' => '{w} mots & prononciations',
        'hm_lang_title' => 'Lectures des caractères han',
        'wm_t2' => '{name} : bonjour, merci et {w} mots avec la prononciation', 'hm_t2' => '{name} : la lecture de {n} caractères chinois', 'hm_t2_words' => '{name} : mots natifs pour {n} caractères chinois', 'hm_t2_loans' => '{name} : {n} emprunts chinois anciens','wm_q' => 'Comment dit-on « {word} » en {name} ? {form}.', 'aka' => 'Aussi appelé {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1 190 langues sur une carte : mots, caractères chinois, prénoms, calendriers',
        'hub_desc' => 'Comment dit-on eau, merci ou mère dans 1 190 langues ? Chaque langue avec sa prononciation (API), la lecture des caractères chinois à travers l’Asie, et de courts articles sur les langues.',
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
        'wo_major' => 'Confronta con le principali lingue del mondo', 'wo_close' => 'Confronta con lingue della stessa classificazione',
        'cmp_caption' => 'Confronto con lingue della stessa classificazione: {family}',
        'ex_prev' => 'Prec.', 'ex_next' => 'Succ.', 'ex_page' => 'Pagina', 'ex_pick' => 'Frase',
        'th_char' => 'Carattere', 'th_gloss' => 'Significato', 'th_read' => 'Lettura', 'th_form' => 'Forma',
        'where' => 'Dove si parla',
        'crumbs' => 'Percorso di navigazione',
        'open_app' => 'Apri {name} sulla mappa interattiva →',
        'goods_title' => 'Indossa questa lingua',
        'goods_sub' => 'Guarda il design →',
        'goods_lede' => 'Scegli tra le {w} parole in {name} — stampate con lo stesso carattere della mappa.',
        'goods_peek' => '👕 Le parole di questa lingua anche su una t-shirt (sotto)',
        'goods_title_n' => 'Indossa una lingua parlata da circa {n} persone.',
        'goods_note' => 'Il design si prova sulla pagina del nostro negozio partner: decidi se ordinare dopo averlo visto.',
        'open_app_wm' => 'Apri la Word Map interattiva →',
        'open_app_hm' => 'Apri la Han Map interattiva →',
        'related' => 'Altre lingue e confronti',
        'cmp_major' => 'Confronta con le lingue principali',
        'cmp_related' => 'Confronta con lingue della stessa classificazione: {family}',
        'cmp_note' => 'I confronti riguardano forma e pronuncia (non l’ordine delle parole).',
        'same_family' => 'Stessa classificazione',
        'crossmap_wm' => 'Vedi {name} sulla Word Map',
        'crossmap_hm' => 'Vedi {name} sulla Han Map',
        'picker' => 'Lingua', 'switch' => 'Cambia', 'stay' => 'Resta',
        'switch_to' => 'Vuoi passare a {name}?',
        'sources' => 'Fonti', 'languages' => 'Lingue',
        'hidden' => 'Varietà storiche & nascoste',
        'foot' => 'Parte di LangMap — un progetto di visualizzazione linguistica. Questo è un riepilogo statico e scansionabile; le mappe interattive offrono audio di pronuncia, filtri e una vista globo.',
        'open_map' => 'Apri la mappa interattiva', 'made_by' => 'Realizzato da',
        'words_heading' => '{w} parole essenziali in {name}',
        'chars_heading' => 'Letture dei caratteri han in {name}',
        'hidden_tag' => 'varietà storica / nascosta',
        'wm_lang_title' => '{w} parole & pronunce',
        'hm_lang_title' => 'Letture dei caratteri han',
        'wm_t2' => '{name}: ciao, grazie e {w} parole con la pronuncia', 'hm_t2' => '{name}: come si leggono {n} caratteri cinesi', 'hm_t2_words' => '{name}: parole native per {n} caratteri cinesi', 'hm_t2_loans' => '{name}: {n} prestiti cinesi antichi','wm_q' => 'Come si dice “{word}” in {name}? {form}.', 'aka' => 'Detto anche {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1.190 lingue sulla mappa: parole, caratteri cinesi, nomi, calendari',
        'hub_desc' => 'Come si dice acqua, grazie o madre in 1.190 lingue? Ogni lingua con la pronuncia (IPA), la lettura dei caratteri cinesi in Asia e brevi articoli sulle lingue.',
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
        'family' => 'Clasificación', 'speakers' => 'Hablantes', 'script' => 'Escritura',
        'region' => 'Región', 'countries' => 'Países', 'official' => 'Lengua oficial',
        'reading' => 'Lectura',
        'iso' => 'ISO 639-3', 'glotto' => 'Glottocode', 'vitality' => 'Vitalidad',
        'aliases' => 'También conocido como', 'romanization' => 'Romanización',
        'ex_words' => 'Palabras comparadas', 'ex_wordorder' => 'Orden de palabras comparado', 'ex_han' => 'Lecturas han comparadas',
        'wo_major' => 'Comparar con las principales lenguas del mundo', 'wo_close' => 'Comparar con lenguas de clasificación más próxima',
        'cmp_caption' => 'Comparación con otras lenguas de la misma clasificación: {family}',
        'ex_prev' => 'Ant.', 'ex_next' => 'Sig.', 'ex_page' => 'Página', 'ex_pick' => 'Frase',
        'th_char' => 'Carácter', 'th_gloss' => 'Significado', 'th_read' => 'Lectura', 'th_form' => 'Forma',
        'where' => 'Dónde se habla',
        'crumbs' => 'Ruta de navegación',
        'open_app' => 'Abrir {name} en el mapa interactivo →',
        'goods_title' => 'Ponte este idioma',
        'goods_sub' => 'Ver el diseño →',
        'goods_lede' => 'Elige entre las {w} palabras en {name}: se estampan con la tipografía del mapa.',
        'goods_peek' => '👕 Las palabras de esta lengua también en camiseta (abajo)',
        'goods_title_n' => 'Viste una lengua que hablan unas {n} personas.',
        'goods_note' => 'El diseño se prueba en la página de nuestra tienda asociada; decides si pedir después de verlo.',
        'open_app_wm' => 'Abrir el Word Map interactivo →',
        'open_app_hm' => 'Abrir el Han Map interactivo →',
        'related' => 'Lenguas relacionadas y comparaciones',
        'cmp_major' => 'Comparar con lenguas principales',
        'cmp_related' => 'Comparar con lenguas de la misma clasificación: {family}',
        'cmp_note' => 'Las comparaciones son de forma y pronunciación (no de orden de palabras).',
        'same_family' => 'Misma clasificación',
        'crossmap_wm' => 'Ver {name} en el Word Map',
        'crossmap_hm' => 'Ver {name} en el Han Map',
        'picker' => 'Idioma', 'switch' => 'Cambiar', 'stay' => 'Quedarse',
        'switch_to' => '¿Cambiar a {name}?',
        'sources' => 'Fuentes', 'languages' => 'Lenguas',
        'hidden' => 'Variedades históricas y ocultas',
        'foot' => 'Parte de LangMap — un proyecto de visualización lingüística. Este es un resumen estático y rastreable; los mapas interactivos ofrecen audio de pronunciación, filtros y una vista de globo.',
        'open_map' => 'Abrir el mapa interactivo', 'made_by' => 'Creado por',
        'words_heading' => '{w} palabras esenciales en {name}',
        'chars_heading' => 'Lecturas de caracteres han en {name}',
        'hidden_tag' => 'variedad histórica / oculta',
        'wm_lang_title' => '{w} palabras y pronunciaciones',
        'hm_lang_title' => 'Lecturas de caracteres han',
        'wm_t2' => '{name}: hola, gracias y {w} palabras con pronunciación', 'hm_t2' => '{name}: cómo se leen {n} caracteres chinos', 'hm_t2_words' => '{name}: palabras nativas para {n} caracteres chinos', 'hm_t2_loans' => '{name}: {n} préstamos chinos antiguos','wm_q' => '¿Cómo se dice «{word}» en {name}? {form}.', 'aka' => 'También llamado {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1190 lenguas en un mapa: palabras, caracteres chinos, nombres, calendarios',
        'hub_desc' => '¿Cómo se dice agua, gracias o madre en 1190 lenguas? Cada lengua con su pronunciación (AFI), cómo se leen los caracteres chinos en Asia y artículos breves sobre lenguas.',
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
        'wo_major' => 'Comparar com as principais línguas do mundo', 'wo_close' => 'Comparar com línguas da mesma classificação',
        'cmp_caption' => 'Comparação com línguas da mesma classificação: {family}',
        'ex_prev' => 'Ant.', 'ex_next' => 'Próx.', 'ex_page' => 'Página', 'ex_pick' => 'Frase',
        'th_char' => 'Caractere', 'th_gloss' => 'Significado', 'th_read' => 'Leitura', 'th_form' => 'Forma',
        'where' => 'Onde é falada',
        'crumbs' => 'Trilha de navegação',
        'open_app' => 'Ver {name} no mapa interativo →',
        'goods_title' => 'Vista este idioma',
        'goods_sub' => 'Ver o design →',
        'goods_lede' => 'Escolha entre as {w} palavras em {name} — estampadas na mesma tipografia do mapa.',
        'goods_peek' => '👕 As palavras desta língua também numa camiseta (abaixo)',
        'goods_title_n' => 'Vista uma língua falada por cerca de {n} pessoas.',
        'goods_note' => 'O design é testado na página da nossa loja parceira; você decide se encomenda depois de ver.',
        'open_app_wm' => 'Abrir o Word Map interativo →',
        'open_app_hm' => 'Abrir o Han Map interativo →',
        'related' => 'Outras línguas e comparações',
        'cmp_major' => 'Comparar com as principais línguas',
        'cmp_related' => 'Comparar com línguas da mesma classificação: {family}',
        'cmp_note' => 'As comparações são de forma e pronúncia (não de ordem das palavras).',
        'same_family' => 'Mesma classificação',
        'crossmap_wm' => 'Ver {name} no Word Map',
        'crossmap_hm' => 'Ver {name} no Han Map',
        'picker' => 'Idioma', 'switch' => 'Trocar', 'stay' => 'Ficar',
        'switch_to' => 'Trocar para {name}?',
        'sources' => 'Fontes', 'languages' => 'Línguas',
        'hidden' => 'Variedades históricas e ocultas',
        'foot' => 'Parte do LangMap — um projeto de visualização linguística. Este é um resumo estático e rastreável; os mapas interativos oferecem áudio de pronúncia, filtros e uma vista de globo.',
        'open_map' => 'Abrir o mapa interativo', 'made_by' => 'Criado por',
        'words_heading' => '{w} palavras essenciais em {name}',
        'chars_heading' => 'Leituras de caracteres han em {name}',
        'hidden_tag' => 'variedade histórica / oculta',
        'wm_lang_title' => '{w} palavras e pronúncias',
        'hm_lang_title' => 'Leituras de caracteres han',
        'wm_t2' => '{name}: olá, obrigado e {w} palavras com pronúncia', 'hm_t2' => '{name}: como se leem {n} caracteres chineses', 'hm_t2_words' => '{name}: palavras nativas para {n} caracteres chineses', 'hm_t2_loans' => '{name}: {n} empréstimos chineses antigos','wm_q' => 'Como se diz “{word}” em {name}? {form}.', 'aka' => 'Também chamado {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1.190 línguas no mapa: palavras, caracteres chineses, nomes, calendários',
        'hub_desc' => 'Como se diz água, obrigado ou mãe em 1.190 línguas? Cada língua com a pronúncia (AFI), como os caracteres chineses são lidos na Ásia e artigos curtos sobre línguas.',
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
        'cmp_caption' => 'Сравнение с родственными языками: {family}',
        'ex_prev' => 'Назад', 'ex_next' => 'Вперёд', 'ex_page' => 'Страница', 'ex_pick' => 'Предложение',
        'th_char' => 'Иероглиф', 'th_gloss' => 'Значение', 'th_read' => 'Чтение', 'th_form' => 'Форма',
        'where' => 'Где на нём говорят',
        'crumbs' => 'Навигационная цепочка',
        'open_app' => 'Открыть на интерактивной карте: {name} →',
        'goods_title' => 'Носи этот язык',
        'goods_sub' => 'Посмотреть дизайн →',
        'goods_lede' => 'Выберите любые слова ({name}) из списка выше — их напечатают тем же шрифтом, что и на карте.',
        'goods_peek' => '👕 Слова этого языка можно напечатать на футболке (ниже)',
        'goods_title_n' => 'Язык, на котором говорят около {n} человек, — на футболке.',
        'goods_note' => 'Дизайн собирается на странице нашего магазина-партнёра; заказывать или нет — решаете, когда увидите.',
        'open_app_wm' => 'Открыть интерактивную карту Word Map →',
        'open_app_hm' => 'Открыть интерактивную карту Han Map →',
        'related' => 'Родственные языки и сравнения',
        'cmp_major' => 'Сравнить с основными языками',
        'cmp_related' => 'Сравнить с языками {family}',
        'cmp_note' => 'Сравнение по форме слова и произношению (не по порядку слов).',
        'same_family' => 'Та же семья',
        'crossmap_wm' => 'Посмотреть в Word Map: {name}',
        'crossmap_hm' => 'Посмотреть в Han Map: {name}',
        'picker' => 'Язык', 'switch' => 'Переключить', 'stay' => 'Остаться',
        'switch_to' => 'Переключить язык: {name}?',
        'sources' => 'Источники', 'languages' => 'Языки',
        'hidden' => 'Исторические и скрытые разновидности',
        'foot' => 'Часть LangMap — проекта визуализации языков. Это статическое, индексируемое резюме; интерактивные карты предлагают аудио произношения, фильтры и вид глобуса.',
        'open_map' => 'Открыть интерактивную карту', 'made_by' => 'Автор',
        'words_heading' => '{name} — основные слова ({w})',
        'chars_heading' => 'Чтения ханьских иероглифов на языке {name}',
        'hidden_tag' => 'историческая / скрытая разновидность',
        'wm_lang_title' => '{w} слов и произношение',
        'hm_lang_title' => 'Чтения ханьских иероглифов',
        'wm_t2' => '{name}: «привет», «спасибо» и ещё {w} слов с произношением', 'hm_t2' => ['one' => '{name}: как читается {n} иероглиф', 'few' => '{name}: как читаются {n} иероглифа', 'many' => '{name}: как читаются {n} иероглифов', 'other' => '{name}: как читаются {n} иероглифов'], 'hm_t2_words' => ['one' => '{name}: исконные слова для {n} иероглифа', 'other' => '{name}: исконные слова для {n} иероглифов'], 'hm_t2_loans' => ['one' => '{name}: {n} раннее китайское заимствование', 'few' => '{name}: {n} ранних китайских заимствования', 'other' => '{name}: {n} ранних китайских заимствований'], 'wm_q' => '{name}: как сказать «{word}»? {form}.', 'aka' => 'Другие названия: {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1190 языков на карте: слова, иероглифы, имена, календари',
        'hub_desc' => 'Как сказать «вода», «спасибо» или «мама» на 1190 языках? Каждый язык с произношением (МФА), чтения иероглифов по всей Азии и короткие статьи о языках.',
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
        'wo_major' => 'Порівняти з основними мовами світу', 'wo_close' => 'Порівняти з мовами тієї самої класифікації',
        'cmp_caption' => 'Порівняння з мовами тієї самої класифікації: {family}',
        'ex_prev' => 'Назад', 'ex_next' => 'Далі', 'ex_page' => 'Сторінка', 'ex_pick' => 'Речення',
        'th_char' => 'Ієрогліф', 'th_gloss' => 'Значення', 'th_read' => 'Читання', 'th_form' => 'Форма',
        'where' => 'Де нею розмовляють',
        'crumbs' => 'Навігаційний ланцюжок',
        'open_app' => 'Відкрити на інтерактивній карті: {name} →',
        'goods_title' => 'Носи цю мову',
        'goods_sub' => 'Переглянути дизайн →',
        'goods_lede' => 'Виберіть будь-які слова ({name}) зі списку вище — їх надрукують тим самим шрифтом, що й на карті.',
        'goods_peek' => '👕 Слова цієї мови можна надрукувати на футболці (нижче)',
        'goods_title_n' => 'Мова, якою говорять близько {n} людей, — на футболці.',
        'goods_note' => 'Дизайн збирається на сторінці нашого магазину-партнера; замовляти чи ні — вирішуєте, коли побачите.',
        'open_app_wm' => 'Відкрити інтерактивну Word Map →',
        'open_app_hm' => 'Відкрити інтерактивну Han Map →',
        'related' => 'Класифікація та порівняння',
        'cmp_major' => 'Порівняти з основними мовами',
        'cmp_related' => 'Порівняти з мовами тієї самої класифікації: {family}',
        'cmp_note' => 'Порівняння за формою слова та вимовою (не за порядком слів).',
        'same_family' => 'Та сама класифікація',
        'crossmap_wm' => 'Переглянути у Word Map: {name}',
        'crossmap_hm' => 'Переглянути у Han Map: {name}',
        'picker' => 'Мова', 'switch' => 'Перемкнути', 'stay' => 'Залишитися',
        'switch_to' => 'Перемкнути мову: {name}?',
        'sources' => 'Джерела', 'languages' => 'Мови',
        'hidden' => 'Історичні та приховані різновиди',
        'foot' => 'Частина LangMap — проєкту візуалізації мов. Це статичне, індексоване резюме; інтерактивні карти пропонують аудіо вимови, фільтри та вигляд глобуса.',
        'open_map' => 'Відкрити інтерактивну карту', 'made_by' => 'Автор',
        'words_heading' => 'Основні слова ({w}): {name}',
        'chars_heading' => 'Читання ханьських ієрогліфів мовою {name}',
        'hidden_tag' => 'історичний / прихований різновид',
        'wm_lang_title' => 'Основні слова ({w}) і вимова',
        'hm_lang_title' => 'Читання ханьських ієрогліфів',
        'wm_t2' => '{name}: «привіт», «дякую» та ще {w} слів з вимовою', 'hm_t2' => ['one' => '{name}: як читається {n} ієрогліф', 'few' => '{name}: як читаються {n} ієрогліфи', 'many' => '{name}: як читаються {n} ієрогліфів', 'other' => '{name}: як читаються {n} ієрогліфів'], 'hm_t2_words' => ['one' => '{name}: питомі слова для {n} ієрогліфа', 'other' => '{name}: питомі слова для {n} ієрогліфів'], 'hm_t2_loans' => ['one' => '{name}: {n} раннє китайське запозичення', 'few' => '{name}: {n} ранні китайські запозичення', 'other' => '{name}: {n} ранніх китайських запозичень'], 'wm_q' => '{name}: як сказати «{word}»? {form}.', 'aka' => 'Інші назви: {list}',   // r28 search titles / snippet question / aliases
        'wm_lang_meta' => 'Вимова {w} основних слів мовою {name}, з МФА та питомими формами, на LangMap Word Map.',
        'hm_lang_meta' => 'Читання ханьських ієрогліфів мовою {name} на LangMap Han Map.',
        'wm_index_title' => 'Word Map — {w} основних слів у {n} мовах',
        'wm_index_desc' => 'Переглядайте вимову {w} основних слів (вода, вогонь, сонце, місяць, мати…) з МФА та питомими формами у {n} мовах і різновидах на LangMap Word Map.',
        'hm_index_title' => 'Han Map — Читання ханьських ієрогліфів у {n} мовах',
        'hm_index_desc' => 'Порівняйте читання основних ханьських ієрогліфів (一 二 三 日 月 山 水…, усього {c}) у {n} синітських, японських, корейських і в’єтських різновидах на LangMap Han Map.',
        'wm_index_sub' => '{w} основних слів у {n} мовах і різновидах — питомі форми з вимовою МФА.',
        'hm_index_sub' => 'Основні ханьські ієрогліфи ({c}) у {n} мовах і різновидах — форми письма з читаннями МФА / латиницею.',
        'see_also' => 'Див. також',
        'home' => 'Головна LangMap',
        'hub_title' => 'LangMap — 1190 мов на карті: слова, ієрогліфи, імена, календарі',
        'hub_desc' => 'Як сказати «вода», «дякую» чи «мама» 1190 мовами? Кожна мова з вимовою (МФА), читання ієрогліфів по всій Азії та короткі статті про мови.',
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
        'wo_major' => 'قارن بكبرى لغات العالم', 'wo_close' => 'قارن بلغات وثيقة القرابة',
        'cmp_caption' => 'بالمقارنة مع لغات ذات صلة: {family}',
        'ex_prev' => 'السابق', 'ex_next' => 'التالي', 'ex_page' => 'صفحة', 'ex_pick' => 'جملة',
        'th_char' => 'الحرف', 'th_gloss' => 'المعنى', 'th_read' => 'القراءة', 'th_form' => 'الشكل',
        'where' => 'أين تُستخدم؟',
        'crumbs' => 'مسار التنقل',
        'open_app' => 'فتح {name} في الخريطة التفاعلية ←',
        'goods_title' => 'ارتدِ هذه اللغة',
        'goods_sub' => 'شاهد التصميم ←',
        'goods_lede' => 'اختر ما يعجبك من {w} كلمة في {name}؛ تُطبع بخط الخريطة نفسه.',
        'goods_peek' => '👕 يمكن طباعة كلمات هذه اللغة على تي شيرت أيضًا (أدناه)',
        'goods_title_n' => 'ارتدِ لغةً يتحدّثها نحو {n} شخص.',
        'goods_note' => 'تجرّب التصميم في صفحة المتجر الشريك، وتقرّر الطلب بعد أن تراه.',
        'open_app_wm' => 'فتح Word Map التفاعلية ←',
        'open_app_hm' => 'فتح Han Map التفاعلية ←',
        'related' => 'لغات ذات صلة ومقارنات',
        'cmp_major' => 'قارن باللغات الكبرى',
        'cmp_related' => 'قارن بلغات ذات صلة: {family}',
        'cmp_note' => 'المقارنات تتعلق بشكل الكلمة والنطق (وليس ترتيب الكلمات).',
        'same_family' => 'العائلة نفسها',
        'crossmap_wm' => 'عرض {name} في Word Map',
        'crossmap_hm' => 'عرض {name} في Han Map',
        'picker' => 'اللغة', 'switch' => 'تبديل', 'stay' => 'البقاء',
        'switch_to' => 'التبديل إلى {name}؟',
        'sources' => 'المصادر', 'languages' => 'اللغات',
        'hidden' => 'أنواع تاريخية ومخفية',
        'foot' => 'جزء من LangMap — مشروع لتصور اللغات. هذا ملخص ثابت قابل للفهرسة؛ توفر الخرائط التفاعلية صوت النطق والمرشحات وعرض الكرة الأرضية.',
        'open_map' => 'افتح الخريطة التفاعلية', 'made_by' => 'من إعداد',
        'words_heading' => '{w} كلمة أساسية في {name}',
        'chars_heading' => 'قراءات الحروف الهانية في {name}',
        'hidden_tag' => 'نوع تاريخي / مخفي',
        'wm_lang_title' => '{w} كلمة والنطق',
        'hm_lang_title' => 'قراءات الحروف الهانية',
        'wm_t2' => '{name}: مرحبًا وشكرًا و{w} كلمة مع النطق', 'hm_t2' => '{name}: كيف تُقرأ {n} حروف صينية', 'hm_t2_words' => '{name}: كلمات أصلية لمعاني الحروف الصينية ({n})', 'hm_t2_loans' => '{name}: كلمات صينية مقترضة مبكرة ({n})','wm_q' => 'كيف تقول «{word}» بـ{name}؟ {form}.', 'aka' => 'يُسمّى أيضًا: {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1190 لغة على الخريطة: كلمات وحروف صينية وأسماء وتقاويم',
        'hub_desc' => 'كيف تقول ماء أو شكرًا أو أم بـ1190 لغة؟ تصفح كل لغة مع النطق (IPA)، وكيف تُقرأ الحروف الصينية في آسيا، ومقالات قصيرة عن اللغات.',
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
        'wo_major' => 'השוואה לשפות העולם המרכזיות', 'wo_close' => 'השוואה לשפות מאותו סיווג',
        'cmp_caption' => 'בהשוואה לשפות מאותו סיווג: {family}',
        'ex_prev' => 'הקודם', 'ex_next' => 'הבא', 'ex_page' => 'עמוד', 'ex_pick' => 'משפט',
        'th_char' => 'תו', 'th_gloss' => 'משמעות', 'th_read' => 'קריאה', 'th_form' => 'צורה',
        'where' => 'היכן מדוברת',
        'crumbs' => 'נתיב ניווט',
        'open_app' => 'לפתוח את {name} במפה האינטראקטיבית ←',
        'goods_title' => 'ללבוש את השפה הזאת',
        'goods_sub' => 'לראות את העיצוב ←',
        'goods_lede' => 'בחרו מילים מתוך {w} המילים ב{name} — הן יודפסו באותו הגופן שבמפה.',
        'goods_peek' => '👕 את המילים של השפה הזאת אפשר גם להדפיס על חולצה (למטה)',
        'goods_title_n' => 'ללבוש שפה שמדברים בה כ־{n} אנשים.',
        'goods_note' => 'את העיצוב מנסים בעמוד של החנות השותפה; מחליטים אם להזמין אחרי שרואים.',
        'open_app_wm' => 'לפתוח את Word Map האינטראקטיבית ←',
        'open_app_hm' => 'לפתוח את Han Map האינטראקטיבית ←',
        'related' => 'שפות להשוואה',
        'cmp_major' => 'להשוות לשפות מרכזיות',
        'cmp_related' => 'להשוות לשפות מאותו סיווג: {family}',
        'cmp_note' => 'ההשוואות הן של צורת המילה וההגייה (לא של סדר המילים).',
        'same_family' => 'שפות באותו סיווג',
        'crossmap_wm' => 'לראות את {name} ב-Word Map',
        'crossmap_hm' => 'לראות את {name} ב-Han Map',
        'picker' => 'שפה', 'switch' => 'החלף', 'stay' => 'הישאר',
        'switch_to' => 'לעבור ל{name}?',
        'sources' => 'מקורות', 'languages' => 'שפות',
        'hidden' => 'גרסאות היסטוריות ומוסתרות',
        'foot' => 'חלק מ-LangMap — פרויקט להמחשת שפות. זהו סיכום סטטי הניתן לסריקה; המפות האינטראקטיביות מציעות שמע הגייה, מסננים ותצוגת גלובוס.',
        'open_map' => 'לפתיחת המפה האינטראקטיבית', 'made_by' => 'נוצר על ידי',
        'words_heading' => '{w} מילים בסיסיות ב{name}',
        'chars_heading' => 'קריאות תווי האן ב{name}',
        'hidden_tag' => 'גרסה היסטורית / מוסתרת',
        'wm_lang_title' => '{w} מילים והגייה',
        'hm_lang_title' => 'קריאות תווי האן',
        'wm_t2' => '{name}: שלום, תודה ועוד {w} מילים עם הגייה', 'hm_t2' => '{name}: איך נקראים {n} סימנים סיניים', 'hm_t2_words' => '{name}: מילים מקוריות עבור {n} סימנים סיניים', 'hm_t2_loans' => '{name}: {n} מילים שאולות סיניות קדומות','wm_q' => 'איך אומרים „{word}” ב{name}? {form}.', 'aka' => 'נקראת גם: {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — 1,190 שפות על המפה: מילים, סימנים סיניים, שמות, לוחות שנה',
        'hub_desc' => 'איך אומרים מים, תודה או אמא ב־1,190 שפות? כל שפה עם הגייה (IPA), איך נקראים הסימנים הסיניים ברחבי אסיה, ומאמרים קצרים על שפות.',
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
        'wo_major' => 'Linganisha na lugha kuu za dunia', 'wo_close' => 'Linganisha na lugha za uainishaji ule ule',
        'cmp_caption' => 'Imelinganishwa na lugha zenye uainishaji ule ule: {family}',
        'ex_prev' => 'Iliyotangulia', 'ex_next' => 'Inayofuata', 'ex_page' => 'Ukurasa', 'ex_pick' => 'Sentensi',
        'th_char' => 'Herufi', 'th_gloss' => 'Maana', 'th_read' => 'Usomaji', 'th_form' => 'Umbo',
        'where' => 'Maeneo inakozungumzwa',
        'crumbs' => 'Njia ya urambazaji',
        'open_app' => 'Fungua {name} kwenye ramani shirikishi →',
        'goods_title' => 'Vaa lugha hii',
        'goods_sub' => 'Tazama muundo →',
        'goods_lede' => 'Chagua tu maneno unayopenda kati ya maneno {w} ya {name} — huchapishwa kwa fonti ile ile ya ramani.',
        'goods_peek' => '👕 Maneno ya lugha hii yanaweza pia kuchapishwa kwenye fulana (chini)',
        'goods_title_n' => 'Vaa lugha inayozungumzwa na watu takriban {n}.',
        'goods_note' => 'Muundo unajaribiwa kwenye ukurasa wa duka letu mshirika; unaamua kuagiza baada ya kuuona.',
        'open_app_wm' => 'Fungua Word Map shirikishi →',
        'open_app_hm' => 'Fungua Han Map shirikishi →',
        'related' => 'Lugha za kulinganisha',
        'cmp_major' => 'Linganisha na lugha kuu',
        'cmp_related' => 'Linganisha na lugha zenye uainishaji ule ule: {family}',
        'cmp_note' => 'Ulinganishaji ni wa umbo la neno na matamshi (si mpangilio wa maneno).',
        'same_family' => 'Uainishaji ule ule',
        'crossmap_wm' => 'Tazama {name} kwenye Word Map',
        'crossmap_hm' => 'Tazama {name} kwenye Han Map',
        'picker' => 'Lugha', 'switch' => 'Badilisha', 'stay' => 'Baki',
        'switch_to' => 'Ubadilishe hadi {name}?',
        'sources' => 'Vyanzo', 'languages' => 'Lugha',
        'hidden' => 'Aina za kihistoria & zilizofichwa',
        'foot' => 'Sehemu ya LangMap — mradi wa kuonyesha lugha kwa picha. Huu ni muhtasari tuli unaoweza kutambaliwa; ramani shirikishi hutoa sauti ya matamshi, vichujio, na mwonekano wa dunia.',
        'open_map' => 'Fungua ramani shirikishi', 'made_by' => 'Imetengenezwa na',
        'words_heading' => 'Maneno {w} ya msingi katika {name}',
        'chars_heading' => 'Usomaji wa herufi za Han katika {name}',
        'hidden_tag' => 'aina ya kihistoria / iliyofichwa',
        'wm_lang_title' => 'Maneno {w} na matamshi',
        'hm_lang_title' => 'Usomaji wa herufi za Han',
        'wm_t2' => '{name}: habari, asante na maneno {w} pamoja na matamshi', 'hm_t2' => '{name}: jinsi herufi {n} za Kichina zinavyosomwa', 'hm_t2_words' => '{name}: maneno asilia kwa herufi {n} za Kichina', 'hm_t2_loans' => '{name}: maneno {n} ya mkopo ya Kichina ya mapema','wm_q' => 'Unasemaje “{word}” kwa {name}? {form}.', 'aka' => 'Pia huitwa {list}',   // r28 search titles / snippet question / aliases
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
        'hub_title' => 'LangMap — lugha 1,190 kwenye ramani: maneno, herufi za Kichina, majina, kalenda',
        'hub_desc' => 'Unasemaje maji, asante au mama katika lugha 1,190? Tazama kila lugha pamoja na matamshi (IPA), jinsi herufi za Kichina zinavyosomwa Asia, na makala fupi kuhusu lugha.',
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
/**
 * seo_inline_name — a language name that has been dropped into the middle of a
 * sentence, cased the way that language writes it there.
 *
 * The name tables ship display forms, capitalised: "Birmano", "Giapponese",
 * "Bahasa Jepang", "Tiếng Nhật". As a heading or a link that is right. Inside a
 * sentence it is wrong in Romance ("palabras en Birmano") and it puts a stray
 * capital mid-clause in Indonesian and Vietnamese, whose names begin with a
 * common noun. Five native panels reported it independently.
 *
 * It is NOT a general rule and must never be applied by default. The Swahili
 * panel was explicit: Ki- in Kiswahili/Kijapani is a bound class prefix of the
 * name itself and is always capitalised, so lowercasing there would be an
 * error, not a fix. German capitalises all nouns. CJK, Thai, Arabic, Hebrew,
 * Devanagari and Korean have no case at all.
 *
 * Hence a per-UI table, and only the languages whose own panel asked for it.
 */
const SEO_INLINE_LC = [
    // Lowercase the initial. French and Italian each went through their whole
    // table and arrived at the SAME mechanical test (below), from opposite
    // directions, so it is the test and not a hand list that ships here — a
    // list would silently stop covering names added later.
    'es' => 'first',
    'fr' => 'first',
    'it' => 'first',
    'pt' => 'first',
    // Lowercase only the classifier the name begins with, never a later word:
    // "Bahasa Jepang" -> "bahasa Jepang", "Tiếng Nhật" -> "tiếng Nhật".
    'id' => ['Bahasa '],
    'vi' => ['Tiếng ', 'Ngôn ngữ '],
];

/**
 * Keep the initial capital when the SECOND token is capitalised.
 *
 * Lowercasing only the first letter of a two-word proper name produces a
 * hybrid that is wrong under any spelling — "toki Pona", "pieds-Noirs",
 * "nez-Percé" — so the safe output is always to leave it alone. The French
 * panel measured 20 matches in 1,242 names with no misses; the Italian panel
 * reached the same rule independently and measured 33, and warned against the
 * looser "a capital anywhere after the first word", which also catches the 121
 * "Mandarino di Wuhan" names that lowercase correctly. The lowercase connector
 * (de/du/des/d'/di/del) is what separates the two, and this test respects it.
 *
 * It over-captures a handful of common-noun heads ("Tocario A" stays capital
 * where "tocario A" would be ideal). That is the harmless direction: a stray
 * capital reads as a style choice, a lowercased proper noun reads as a bug.
 */
function seo_inline_keeps_capital(string $ui, string $name): bool
{
    // A classifier head is the one case where the second word's capital means
    // nothing: the head itself is the common noun being lowercased, and the
    // capital belongs to the language after it — "na língua Ho-Chunk".
    foreach (SEO_INLINE_CLASSIFIER[$ui] ?? [] as $head) {
        if (strncmp($name, $head, strlen($head)) === 0) {
            return false;
        }
    }
    // Portuguese glottonyms that are homographs of everyday words. Lowercased,
    // "palavras em venda" reads "words for sale" and "em vai" reads as a verb.
    // No mechanical signal exists for these — they are single words — so the
    // list is the only instrument, and its absence is a wrong reading, not a
    // style slip.
    if (in_array($name, SEO_INLINE_KEEP[$ui] ?? [], true)) {
        return true;
    }
    if (!preg_match('/^\S+[ \-\/](\p{Lu}\S*)/u', $name, $m)) {
        return false;
    }
    // "Tocario A" / "Tokharien A": a bare letter or numeral is a branch label,
    // not a second name, so the head still lowercases. All three Romance
    // panels called this the ideal reading; only their tests could not see it.
    if (preg_match('/^(\p{Lu}|\d+)$/u', $m[1])) {
        return false;
    }
    return true;
}

/** Heads that ARE the common noun being lowercased (never proper names). */
const SEO_INLINE_CLASSIFIER = [
    'pt' => ['Língua ', 'Dialeto ', 'Leitura ', 'Crioulo '],
];

/** Names with no mechanical signal that must keep their capital anyway. */
const SEO_INLINE_KEEP = [
    // Portuguese: English anthroponyms used as glottonyms, plus glottonyms
    // homographic with common words, where the capital is what prevents a
    // wrong reading. Supplied and measured by the Portuguese panel.
    'pt' => [
        'Thompson', 'Carrier', 'Ao naga', 'Vai', 'Venda', 'Fala', 'Sumo',
        'Mano', 'Cita', 'Salar', 'Ido', 'Cora', 'Sena', 'Tao', 'Parta', "Meta'",
    ],
];

/**
 * Keys where the name keeps its display casing even mid-string, because the
 * string is naming the entry rather than talking about it.
 */
const SEO_INLINE_DENY = [
    'es' => ['switch_to'],   // «¿Cambiar a {name}?» — the picker's own label
    'fr' => ['switch_to'],
    'it' => ['switch_to'],
];

function seo_inline_name(string $ui, string $key, string $name): string
{
    $rule = SEO_INLINE_LC[$ui] ?? null;
    if ($rule === null || $name === '') {
        return $name;
    }
    if (in_array($key, SEO_INLINE_DENY[$ui] ?? [], true)) {
        return $name;
    }
    if (is_array($rule)) {
        foreach ($rule as $prefix) {
            if (strncmp($name, $prefix, strlen($prefix)) === 0) {
                return mb_strtolower(mb_substr($name, 0, 1)) . mb_substr($name, 1);
            }
        }
        return $name;
    }
    if (seo_inline_keeps_capital($ui, $name)) {
        return $name;
    }
    return mb_strtolower(mb_substr($name, 0, 1)) . mb_substr($name, 1);
}

/**
 * The classifier-headed names need the preposition changed, not just the case.
 *
 * ~25-46 names per language lead with a classifier — "idioma hup", "dialecte de
 * Kyoto", "lettura kanbun" — and the bare preposition in front of them is wrong
 * in a different way in each language. Spanish adds an article ("en el idioma
 * hup"); French cannot, because "en le" is impossible, so the preposition
 * itself becomes "dans le/la"; Italian needs nothing for "in lingua X", which
 * is an established formula, but does need it for the reading traditions.
 *
 * The rewrite is done on the TEMPLATE, so the preposition and the placeholder
 * stay one unit and a template that does not use the preposition is untouched.
 * Heads are matched on the already-lowercased value.
 */
const SEO_INLINE_PREP = [
    'es' => ['prep' => 'en', 'heads' => [
        'idioma '   => 'en el ',
        'dialecto ' => 'en el ',
        'lengua '   => 'en la ',
        'lectura '  => 'en la ',
    ]],
    'fr' => ['prep' => 'en', 'heads' => [
        'dialecte ' => 'dans le ',
        'lecture '  => 'dans la ',
        'langue '   => 'dans la ',
        'patois '   => 'dans le ',
    ]],
    // "in lingua sarda" is idiomatic Italian and needs no article; only the
    // reading traditions do, and hanja-hun elides because Italian h is mute.
    // "em língua hup" reads like a telegram: the classifier wants a determiner,
    // the bare glottonym does not. Crioulo behaves as a glottonym, so it takes
    // none.
    'pt' => ['prep' => 'em', 'heads' => [
        'língua '  => 'na ',
        'leitura ' => 'na ',
        'dialeto ' => 'no ',
    ]],
    'it' => ['prep' => 'in', 'heads' => [
        'lettura '   => 'nella ',
        'go-on '     => 'nel ',
        'kun-yomi '  => 'nel ',
        'hanja-hun ' => "nell'",
    ]],
];

function seo_inline_prep(string $ui, string $tpl, string $ph, string $name): string
{
    $rule = SEO_INLINE_PREP[$ui] ?? null;
    if ($rule === null) {
        return $tpl;
    }
    foreach ($rule['heads'] as $head => $rep) {
        if (strncmp($name, $head, strlen($head)) !== 0) {
            continue;
        }
        $re = '/\b' . preg_quote($rule['prep'], '/') . '\s' . preg_quote($ph, '/') . '/u';
        return preg_replace($re, str_replace('$', '\\$', $rep) . $ph, $tpl, 1);
    }
    return $tpl;
}

function seo_t(string $ui, string $key, array $vars = []): string
{
    static $T = null;
    if ($T === null) {
        $T = SEO_T;
        foreach (SEO_T_WORD as $l => $kv) { $T[$l] = ($T[$l] ?? []) + $kv; }
    }
    $s = $T[$ui][$key] ?? ($T['en'][$key] ?? $key);
    // Plural-form entries ['one' => …, 'few' => …, 'other' => …] pick by {n}.
    if (is_array($s)) {
        $cnt = (int) preg_replace('/\D/u', '', (string) ($vars['n'] ?? '0'));
        $s = $s[seo_plural_cat($ui, $cnt)] ?? $s['other'];
    }
    // Auto-fill the Word Map word count for any label using {w} that didn't
    // receive an explicit 'w' (e.g. the hub / Han Map cross-nav links).
    if (!isset($vars['w']) && strpos($s, '{w}') !== false) {
        $vars['w'] = (string) seo_counts()['words'];
    }
    // A language name sitting inside a sentence is cased differently from one
    // standing on its own — but only in some languages, and never when the
    // slot is sentence-initial or sits after a colon, where the display form
    // is the correct one. Decided on the TEMPLATE, before substitution, so the
    // value's own content cannot change the answer.
    foreach (['name', 'lang'] as $nk) {
        if (!isset($vars[$nk]) || $vars[$nk] === '') {
            continue;
        }
        $at = strpos($s, '{' . $nk . '}');
        if ($at === false || $at === 0) {
            continue;
        }
        if (preg_match('/[:：]\s*$/u', substr($s, 0, $at))) {
            continue;
        }
        $vars[$nk] = seo_inline_name($ui, $key, (string) $vars[$nk]);
        $s = seo_inline_prep($ui, $s, '{' . $nk . '}', (string) $vars[$nk]);
    }
    if ($vars) {
        $repl = [];
        foreach ($vars as $k => $v) {
            $repl['{' . $k . '}'] = $v;
        }
        $s = strtr($s, $repl);
    }
    if ($ui === 'ko' && strpos($s, '{') !== false) {
        $s = seo_ko_josa($s);
    }
    return $s;
}

/**
 * Korean particles that depend on the word before them (r29: "오사카 방언로",
 * "‘고양이’을"). Templates write {은} {을} {이} {와} {로} after the slot; this
 * looks at the last syllable before the marker — skipping closing quotes and a
 * trailing "(…)" gloss, which a Korean reader does not pronounce — and picks
 * 은/는, 을/를, 이/가, 과/와, 으로/로. A final ㄹ takes 로, not 으로. A name that
 * ends in Latin letters or other non-Hangul gets the vowel form.
 */
function seo_ko_josa(string $s): string
{
    $pairs = ['은' => ['은', '는'], '을' => ['을', '를'], '이' => ['이', '가'], '와' => ['과', '와'], '로' => ['으로', '로']];
    // Split, not preg_replace_callback: each particle needs the text already
    // built before it, including the particles resolved earlier.
    $parts = preg_split('/(\{(?:은|을|이|와|로)\})/u', $s, -1, PREG_SPLIT_DELIM_CAPTURE);
    $out = '';
    foreach ($parts as $i => $p) {
        if ($i % 2 === 0) { $out .= $p; continue; }
        $k = mb_substr($p, 1, 1);
        $prev = preg_replace('/[\s’」”"\'』]+$/u', '', $out);
        while (preg_match('/\s*[(（][^()（）]*[)）]$/u', $prev)) $prev = preg_replace('/\s*[(（][^()（）]*[)）]$/u', '', $prev);
        $prev = preg_replace('/[\s’」”"\'』]+$/u', '', $prev);
        $last = mb_substr($prev, -1);
        $cp = $last === '' ? 0 : mb_ord($last);
        $jong = 0;   // 0 = no final consonant (also the fallback for non-Hangul)
        if ($cp >= 0xAC00 && $cp <= 0xD7A3) $jong = ($cp - 0xAC00) % 28;
        elseif (preg_match('/^[0-9]$/', $last)) $jong = [21, 8, 0, 16, 0, 0, 1, 8, 8, 0][(int) $last];   // 영 일 이 삼 사 오 육 칠 팔 구
        if ($k === '로') $out .= ($jong > 0 && $jong !== 8) ? '으로' : '로';
        else $out .= $pairs[$k][$jong > 0 ? 0 : 1];
    }
    return $out;
}

/** hreflang value for a UI code (r29): Google wants ISO 639-1 (+ script/region); "yue" has none. URLs keep the UI code. */
function seo_hreflang_code(string $ui): string
{
    return ['zh' => 'zh-Hans', 'yue' => 'zh-Hant-HK'][$ui] ?? $ui;
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
/**
 * seo_family_line — a caption whose {family} slot holds a data value, wrapped
 * in <bdi>.
 *
 * The family values are the most typographically hostile strings on the site:
 * up to ~120 characters, 63% of them parenthesised, and they mix Latin, CJK and
 * the UI's own script ("Sino-Tibetan (Sinitic, Gan — 宜浏片)"). On an RTL page
 * that run reorders unpredictably against the Hebrew or Arabic around it. <bdi>
 * isolates it: dir=auto resolves the value on its own content and the clause
 * keeps the paragraph's direction. Harmless in LTR, so every UI gets it.
 *
 * Returns HTML, already escaped — do NOT wrap the result in e().
 *
 * U+FFFC (object replacement character) is the split marker because it cannot
 * occur in a translation table or in the data; a marker that could occur would
 * cut the string in the wrong place on exactly the rows nobody tests.
 */
function seo_family_line(string $ui, string $key, string $family, string $raw = ''): string
{
    $mark = "\u{FFFC}";
    $s = seo_t($ui, $key, ['family' => $mark]);
    $i = strpos($s, $mark);
    if ($i === false) {
        return e($s);
    }
    $l = $raw !== '' ? seo_meta_value_lang($ui, $raw) : '';
    $v = in_array($l, ['en', 'ja'], true) ? seo_chip_value($family, $l) : '<bdi>' . seo_chip_value($family, $l) . '</bdi>';
    return e(substr($s, 0, $i)) . $v . e(substr($s, $i + strlen($mark)));
}

/**
 * Label for a COARSE family heading — "Sinitic", "Constructed" — in the UI
 * language.
 *
 * The meta translation table is keyed on the FULL family string as the data
 * writes it ("Constructed (a posteriori)", "Sinitic (Min Nan, Hokkien)"), and
 * it covers those almost completely: 643 of 647. The coarse forms are a
 * different matter — 37 of 107 have no entry, so a page that groups by coarse
 * family and then asks for a translation gets English back. That is what
 * happened when the word pages shipped: a Japanese reader saw "Constructed",
 * "Tungusic" and 35 others untranslated.
 *
 * Rather than hand-translate 37 names into 19 languages, derive them from the
 * translations that already exist and are already checked: translate a full
 * string from the same group, then drop its trailing parenthetical. That
 * fixes 32 of the 37 and needs no new copy.
 *
 * The four that remain — Guaicuruan, Yanomaman, Matacoan, Nadahup — have no
 * entry in either form; they fall back to English, exactly as they already do
 * on the language pages. It also quietly improves Ticuna-Yuri, whose entry is
 * half-translated (a Japanese comma inside an English parenthetical).
 *
 * @param string $full any full family string belonging to this coarse group
 */
/**
 * Which part of the world a row belongs to, for a reader who does not know
 * what a language family is.
 *
 * The word pages used to group by family, which is the right axis for a
 * linguist and useless to everyone else — "Atlantic-Congo" and "Kra-Dai" tell
 * a general reader nothing. Geography does. Derived from the row's own pin,
 * which every one of the 1,188 rows has; meta.region is empty across the
 * board and meta.countries is prose too free to parse.
 *
 * The boxes are deliberately coarse and the order matters. Audited against
 * the full row set until nothing landed in 'other':
 *   - Alaska and the Yukon are tested first, or lng <= -140 sends Iñupiaq and
 *     Koyukon to the Pacific.
 *   - Europe stops before Türkiye and the Caucasus: east of 28 degrees it has
 *     to be north of 45, which keeps Greece, Bulgaria, Romania, Ukraine and
 *     Russia in while putting Turkish, Georgian, Armenian, Azerbaijani and
 *     Kurdish into the Middle East group where a reader expects them.
 *   - Australia needs its own line; its west coast is at 115E, short of the
 *     130E the Pacific test uses.
 * Historical rows are pulled out by meta.period before any of this runs, so
 * Latin, Gothic and Sumerian sit together instead of scattering.
 */
/**
 * Country name -> ISO 3166-1 alpha-2, for the flag on a language card.
 *
 * Built from the 211 distinct first-countries the data actually writes, not
 * from a general country list, so it is complete for this atlas and no larger
 * than it needs to be. It has to carry the aliases the data uses in parallel
 * — USA / United States / US, UK / United Kingdom, Türkiye / Turkey, DR Congo
 * / DRC, Cabo Verde / Cape Verde — and the compound strings a few rows carry
 * ("Cambodia; Vietnam", "Israel/Palestine"), which resolve to the first.
 *
 * Deliberately absent: "Worldwide", "Europe-wide", "22 Arab League states",
 * "Across the Sahel" and four rows with no country at all. Those get no flag
 * rather than a wrong one.
 */
const SEO_COUNTRY_ISO = [
    'Afghanistan' => 'AF',
    'Albania' => 'AL',
    'Algeria' => 'DZ',
    'Angola' => 'AO',
    'Argentina' => 'AR',
    'Armenia' => 'AM',
    'Aruba' => 'AW',
    'Australia' => 'AU',
    'Austria' => 'AT',
    'Azerbaijan' => 'AZ',
    'Bahamas' => 'BS',
    'Bahrain' => 'BH',
    'Bangladesh' => 'BD',
    'Belarus' => 'BY',
    'Belgium' => 'BE',
    'Belize' => 'BZ',
    'Benin' => 'BJ',
    'Bhutan' => 'BT',
    'Bolivia' => 'BO',
    'Bosnia and Herzegovina' => 'BA',
    'Bosnia and Herzegovina; Serbia' => 'BA',
    'Botswana' => 'BW',
    'Brazil' => 'BR',
    'Bulgaria' => 'BG',
    'Burkina Faso' => 'BF',
    'Burundi' => 'BI',
    'Cabo Verde' => 'CV',
    'Cabo Verde; diaspora in USA' => 'CV',
    'Cambodia' => 'KH',
    'Cambodia; Vietnam' => 'KH',
    'Cameroon' => 'CM',
    'Canada' => 'CA',
    'Cape Verde' => 'CV',
    'Central African Republic' => 'CF',
    'Central African Republic; pockets in Chad' => 'CF',
    'Chad' => 'TD',
    'Chile' => 'CL',
    'China' => 'CN',
    'Colombia' => 'CO',
    'Comoros' => 'KM',
    'Cook Islands' => 'CK',
    'Costa Rica' => 'CR',
    'Croatia' => 'HR',
    'Cuba' => 'CU',
    'Czech Republic' => 'CZ',
    'Côte d\'Ivoire' => 'CI',
    'DR Congo' => 'CD',
    'DRC' => 'CD',
    'Denmark' => 'DK',
    'Dominican Republic' => 'DO',
    'Ecuador' => 'EC',
    'Egypt' => 'EG',
    'El Salvador' => 'SV',
    'Equatorial Guinea' => 'GQ',
    'Eritrea' => 'ER',
    'Estonia' => 'EE',
    'Eswatini' => 'SZ',
    'Ethiopia' => 'ET',
    'Faroe Islands' => 'FO',
    'Federated States of Micronesia' => 'FM',
    'Fiji' => 'FJ',
    'Finland' => 'FI',
    'France' => 'FR',
    'French Guiana' => 'GF',
    'French Polynesia' => 'PF',
    'Georgia' => 'GE',
    'Germany' => 'DE',
    'Ghana' => 'GH',
    'Greece' => 'GR',
    'Greenland' => 'GL',
    'Guadeloupe' => 'GP',
    'Guam' => 'GU',
    'Guatemala' => 'GT',
    'Guinea' => 'GN',
    'Guinea-Bissau' => 'GW',
    'Guyana' => 'GY',
    'Haiti' => 'HT',
    'Honduras' => 'HN',
    'Hungary' => 'HU',
    'Iceland' => 'IS',
    'India' => 'IN',
    'Indonesia' => 'ID',
    'Iran' => 'IR',
    'Iraq' => 'IQ',
    'Ireland' => 'IE',
    'Isle of Man' => 'IM',
    'Israel' => 'IL',
    'Israel/Palestine' => 'IL',
    'Italy' => 'IT',
    'Jamaica' => 'JM',
    'Japan' => 'JP',
    'Jordan' => 'JO',
    'Kazakhstan' => 'KZ',
    'Kenya' => 'KE',
    'Kiribati' => 'KI',
    'Kyrgyzstan' => 'KG',
    'Laos' => 'LA',
    'Latvia' => 'LV',
    'Lebanon' => 'LB',
    'Lesotho' => 'LS',
    'Liberia' => 'LR',
    'Liberia/Guinea' => 'LR',
    'Libya' => 'LY',
    'Lithuania' => 'LT',
    'Luxembourg' => 'LU',
    'Macau' => 'MO',
    'Madagascar' => 'MG',
    'Malawi' => 'MW',
    'Malaysia' => 'MY',
    'Maldives' => 'MV',
    'Mali' => 'ML',
    'Malta' => 'MT',
    'Marshall Islands' => 'MH',
    'Mauritania' => 'MR',
    'Mauritius' => 'MU',
    'Mayotte' => 'YT',
    'Mexico' => 'MX',
    'Micronesia' => 'FM',
    'Moldova' => 'MD',
    'Mongolia' => 'MN',
    'Morocco' => 'MA',
    'Mozambique' => 'MZ',
    'Myanmar' => 'MM',
    'Namibia' => 'NA',
    'Nauru' => 'NR',
    'Nepal' => 'NP',
    'Netherlands' => 'NL',
    'New Zealand' => 'NZ',
    'Nicaragua' => 'NI',
    'Niger' => 'NE',
    'Nigeria' => 'NG',
    'Niue' => 'NU',
    'North Korea' => 'KP',
    'North Macedonia' => 'MK',
    'Norway' => 'NO',
    'Pakistan' => 'PK',
    'Palau' => 'PW',
    'Palestine' => 'PS',
    'Panama' => 'PA',
    'Papua New Guinea' => 'PG',
    'Paraguay' => 'PY',
    'Peru' => 'PE',
    'Philippines' => 'PH',
    'Poland' => 'PL',
    'Portugal' => 'PT',
    'Puerto Rico' => 'PR',
    'Qatar' => 'QA',
    'Romania' => 'RO',
    'Russia' => 'RU',
    'Rwanda' => 'RW',
    'Réunion' => 'RE',
    'Saint Lucia' => 'LC',
    'Samoa' => 'WS',
    'Saudi Arabia' => 'SA',
    'Senegal' => 'SN',
    'Serbia' => 'RS',
    'Seychelles' => 'SC',
    'Sierra Leone' => 'SL',
    'Singapore' => 'SG',
    'Slovakia' => 'SK',
    'Slovenia' => 'SI',
    'Solomon Islands' => 'SB',
    'Somalia' => 'SO',
    'South Africa' => 'ZA',
    'South Korea' => 'KR',
    'South Sudan' => 'SS',
    'Spain' => 'ES',
    'Sri Lanka' => 'LK',
    'Sudan' => 'SD',
    'Sudan and Egypt' => 'SD',
    'Suriname' => 'SR',
    'Sweden' => 'SE',
    'Switzerland' => 'CH',
    'Syria' => 'SY',
    'Taiwan' => 'TW',
    'Tajikistan' => 'TJ',
    'Tanzania' => 'TZ',
    'Thailand' => 'TH',
    'Timor-Leste' => 'TL',
    'Togo' => 'TG',
    'Tokelau' => 'TK',
    'Tonga' => 'TO',
    'Tunisia' => 'TN',
    'Turkey' => 'TR',
    'Turkmenistan' => 'TM',
    'Tuvalu' => 'TV',
    'Türkiye' => 'TR',
    'UK' => 'GB',
    'UK Channel Islands' => 'JE',
    'US' => 'US',
    'USA' => 'US',
    'Uganda' => 'UG',
    'Ukraine' => 'UA',
    'United Kingdom' => 'GB',
    'United States' => 'US',
    'Uruguay' => 'UY',
    'Uzbekistan' => 'UZ',
    'Vanuatu' => 'VU',
    'Venezuela' => 'VE',
    'Vietnam' => 'VN',
    'Wales' => 'GB-WLS',
    'Wallis & Futuna' => 'WF',
    'Wallis and Futuna' => 'WF',
    'Yemen' => 'YE',
    'Zambia' => 'ZM',
    'Zimbabwe' => 'ZW',
];

/* seo_country_flag() — the emoji version — was deleted on 2026-09-22 rather
 * than left unused. Emoji flags do not render on Windows, which is where the
 * owner reads this site, and the function outliving its replacement is how it
 * came back: a duplicate 'flag' key in one array literal quietly overwrote
 * the <img> with the emoji, and PHP takes the last one without a word. Use
 * seo_country_flag_img() below. */

/**
 * A class naming the script of a surface form, for the scripts the page has
 * to do something about. Empty for everything else.
 *
 * Only Tibetan so far. Two things were wrong with it and only one was the
 * size: these pages load no Tibetan face at all, so Windows fell back to
 * Microsoft Himalaya, which is hairline-thin and sits low and small inside
 * the em. The interactive map has loaded Noto Serif Tibetan from the start,
 * which is why the same word looks right there and small here. Reported
 * 2026-09-22.
 *
 * Traditional Mongolian and the Manchu script derived from it are the other
 * case, and there the problem is not the size: they are written in columns,
 * top to bottom, the columns running left to right. Laid out horizontally
 * they come out on their side. The map has rotated them since the start
 * (VERTICAL_LANGS in wordmap.html) and these pages never did. Five rows,
 * 290 cells: Inner Mongolian, Classical and Middle Mongolian, Manchu, Xibe.
 *
 * Detected from the characters rather than from the row's script metadata,
 * so a Tibetan form on a row tagged as something else still gets the font.
 * Eleven rows write in Tibetan: Tibetan, Classical and Liturgical Tibetan,
 * Amdo, Khams, Dzongkha, Ladakhi, Balti, Sherpa, Sikkimese and Lhomi.
 */
function seo_script_class(string $s): string
{
    if (preg_match('/[\x{0F00}-\x{0FFF}]/u', $s)) {
        return ' s-tibt';
    }
    if (preg_match('/[\x{1800}-\x{18AF}]/u', $s)) {
        return ' s-mong';
    }
    return '';
}

/**
 * The first century a historical row covers, as a signed number: BCE
 * negative, CE positive. Null when meta.period is missing or unparseable.
 *
 * The field is a range written the way a reader writes one — "32cBCE-4cCE",
 * "30-20cBCE", "6-1cBCE", "5-10c", "20-21c" — and the era can sit on either
 * end. In "30-20cBCE" the 30 is bare and BCE, borrowed from the far end of
 * the range; in "8cBCE-6cCE" each end carries its own. So: read the era off
 * the first token when it has one, and off the second when it does not.
 *
 * This exists to sort the 古代語 section. The rows have no speaker counts, so
 * every other sort key on the page ties at zero and leaves them in file
 * order, which is how they came to read as random. Chronology is the axis
 * they actually have, and it turns the section into a timeline: Egyptian and
 * Sumerian at 32 and 30 centuries BCE, Edo Japanese and Luther's German near
 * the end.
 */
function seo_period_start(string $period): ?int
{
    $parts = preg_split('/[\x{2013}\x{2014}-]/u', trim($period), 2);
    if (!$parts || $parts[0] === '') {
        return null;
    }
    $head = $parts[0];
    $tail = $parts[1] ?? '';
    if (!preg_match('/(\d+)/', $head, $m)) {
        return null;
    }
    $n = (int) $m[1];
    $bce = stripos($head, 'BCE') !== false
        || (stripos($head, 'CE') === false && stripos($tail, 'BCE') !== false);
    return $bce ? -$n : $n;
}

/**
 * Historical rows whose flag the prose of meta.countries cannot decide.
 *
 * Two kinds of entry, and both are corrections to seo_sole_country():
 *
 *   an ISO code — the territory sits inside one modern country but the field
 *   names a region or a polity, not a state: "Hatti (central Anatolia)",
 *   "Java (Mataram, Kediri...)", "Historical: Friesland", "Jin Dynasty".
 *
 *   an empty string — the field names exactly one modern country and means
 *   something wider. Old Norse reads "Scandinavia, Iceland, settlements" and
 *   would take the Icelandic flag off the only word in it that is a state;
 *   Luwian's "(Anatolia, north Syria)" names Syria and means Anatolia;
 *   Avestan's homeland is Bactria and Margiana, which is Afghanistan and
 *   Turkmenistan, whatever the word "Iran" is doing in the line.
 *
 * Everything absent from here is decided by the prose. Empires and spreads
 * stay on the neutral mark on purpose — Rome, the Achaemenids, the Mongols,
 * Classical Persian, Classical Maya, Kievan Rus' — because the owner drew the
 * line at "fairly confined to one country's territory today", and a flag is a
 * modern state making a claim on an ancient one.
 */
const SEO_ANCIENT_ISO = [
    // A region or a polity, one modern country.
    'hit'       => 'TR',  // Hatti, central Anatolia
    'xpg'       => 'TR',  // Phrygia: Gordion, Midas City, Pessinus
    'xlu'       => 'TR',  // Luwian — Anatolia, "north Syria" is the edge
    'elx'       => 'IR',  // Elam: Khuzestan and Fars
    'pyx'       => 'MM',  // Pyu city-states, central Burma
    'obr'       => 'MM',  // Pagan Empire
    'txg'       => 'CN',  // Western Xia
    'juc'       => 'CN',  // Jin Dynasty
    'kho'       => 'CN',  // Khotan, Tarim Basin
    'txb'       => 'CN',  // Tocharian B, Tarim Basin
    'kaw'       => 'ID',  // Java, "also Bali"
    'osn'       => 'ID',  // Sunda kingdoms, West Java
    'okz'       => 'KH',  // Khmer Empire — the rest is "parts of"
    'oko'       => 'KR',  // Silla
    'ko_gor'    => 'KR',  // Goryeo
    'ko_mid'    => 'KR',  // Goryeo / early Joseon
    'ko_em'     => 'KR',  // Joseon
    'h_tagalog' => 'PH',  // Manila, Tondo, Cavite, Laguna
    'ofs'       => 'NL',  // Friesland
    'it_dan'    => 'IT',  // Tuscany, Florence
    'de_lut'    => 'DE',  // Saxony, Wittenberg
    'ang'       => 'GB',  // England
    'enm'       => 'GB',  // Medieval England

    // Named one country, meant more than one.
    'non'       => '',    // Scandinavia, Iceland, settlements
    'ave'       => '',    // Bactria and Margiana, not modern Iran
    'cmg'       => '',    // Inner Mongolia and Mongolia, two states
];

/**
 * The one modern country a row sits in, or null when it sits in more than
 * one — read out of the prose of meta.countries.
 *
 * For the historical rows the field is a description, not a country list:
 * "Ancient Sumer (southern Iraq)", "Kingdom of Kush / Meroe (modern Sudan)",
 * "Roman Empire", "Kievan Rus' (modern Russia, Ukraine, Belarus)". The first
 * two name exactly one modern state and should carry its flag; the last two
 * should not, and the owner drew that line — a flag "where the territory is
 * fairly confined to one country today".
 *
 * So: scan the whole string for country names, and answer only when exactly
 * one distinct country is named. Sumerian gets Iraq, Meroitic gets Sudan,
 * Hattic gets Türkiye, Classical Nahuatl gets Mexico; Classical Maya
 * (Guatemala, Mexico, Belize, Honduras), Classical Persian (Iran,
 * Afghanistan, Tajikistan, Uzbekistan) and Kievan Rus' name several and get
 * the neutral mark, and Roman Empire and Gothic kingdoms name none.
 *
 * Word boundaries are not decoration here: "Roman Empire" contains the
 * letters of Oman.
 */
function seo_sole_country(array $lang, string $code = ''): ?string
{
    $s = trim((string) ($lang['meta']['countries'] ?? ''));
    if ($s === '') {
        return null;
    }
    if (isset(SEO_ANCIENT_ISO[$code])) {
        return SEO_ANCIENT_ISO[$code] ?: null;
    }
    // A reconstruction is not spoken anywhere, and its homeland is an argument
    // rather than a place. The rows say so themselves — every one of them ends
    // "(hypothetical)" — so a flag on Proto-Turkic would put the Mongolian
    // state behind a 2,000-year-old inference nobody can check.
    if (stripos($s, 'hypothetical') !== false) {
        return null;
    }
    $found = [];
    foreach (SEO_COUNTRY_ISO as $needle => $iso) {
        // Skip the compound keys — they are phrases, not country names.
        if (str_contains($needle, ';') || str_contains($needle, '/')) {
            continue;
        }
        if (preg_match('/(?<![\p{L}])' . preg_quote($needle, '/') . '(?![\p{L}])/u', $s)) {
            $found[$iso] = true;
        }
    }
    return count($found) === 1 ? array_key_first($found) : null;
}

/**
 * A legal BCP-47 tag for a row, for the lang="" attribute.
 *
 * The internal code is NOT one. This atlas keys rows as es_cr, ar_eg, zh_sc,
 * ko_jeju, ja_heian, p_ine — an underscore is not a BCP-47 separator, so 95
 * lang attributes on one word page were invalid and a screen reader fell
 * back to the page language, reading Vietnamese with a Japanese voice.
 * Found in the persona review, 2026-09-22.
 *
 * The base language is what the attribute is FOR — picking a voice and a
 * font — so that is what it returns. The suffix is deliberately dropped
 * rather than turned into a region: es_cr really is es-CR, but zh_sc is
 * Sichuan and not Seychelles, and there is no way to tell the two shapes
 * apart from the code alone. iso6393 is preferred where the row carries it.
 *
 * Returns '' when nothing valid can be derived (p_ine, p_sit), and the
 * caller then omits the attribute, which is better than asserting a wrong
 * one.
 */
function seo_bcp47(string $code, array $lang): string
{
    $iso = (string) ($lang['meta']['iso6393'] ?? '');
    $tag = $iso !== '' ? $iso : explode('_', $code)[0];
    // BCP 47 wants the two-letter code where one exists: lang="jpn" is not a
    // registered tag and a screen reader may not pick a Japanese voice for it
    // (rally review r2, 2026-10-17).
    $tag = seo_iso_short()[$tag] ?? $tag;
    // Taiwan Mandarin is written in traditional characters: say so, so the
    // hero name takes the TC glyph font rather than SC (r22).
    if ($tag === 'zh' && preg_match('/^zh_tw/', $code)) return 'zh-Hant-TW';
    return preg_match('/^[a-z]{2,3}$/', $tag) ? $tag : '';
}

/**
 * ISO 639-3 -> ISO 639-1, the 184 languages that have a two-letter code
 * (ISO 639 table, via Debian iso-codes), plus the individual codes the Word
 * Map's two-letter rows carry. Reading only the rows missed ssw, her, nbl and
 * ave (no such row) — rally review r3, 2026-10-17.
 */
function seo_iso_short(): array
{
    static $m = null;
    if ($m !== null) return $m;
    $m = [];
    $t = ''
        . 'aar:aa abk:ab afr:af aka:ak amh:am ara:ar arg:an asm:as ava:av ave:ae '
        . 'aym:ay aze:az bak:ba bam:bm bel:be ben:bn bis:bi bod:bo bos:bs bre:br '
        . 'bul:bg cat:ca ces:cs cha:ch che:ce chu:cu chv:cv cor:kw cos:co cre:cr '
        . 'cym:cy dan:da deu:de div:dv dzo:dz ell:el eng:en epo:eo est:et eus:eu '
        . 'ewe:ee fao:fo fas:fa fij:fj fin:fi fra:fr fry:fy ful:ff gla:gd gle:ga '
        . 'glg:gl glv:gv grn:gn guj:gu hat:ht hau:ha hbs:sh heb:he her:hz hin:hi '
        . 'hmo:ho hrv:hr hun:hu hye:hy ibo:ig ido:io iii:ii iku:iu ile:ie ina:ia '
        . 'ind:id ipk:ik isl:is ita:it jav:jv jpn:ja kal:kl kan:kn kas:ks kat:ka '
        . 'kau:kr kaz:kk khm:km kik:ki kin:rw kir:ky kom:kv kon:kg kor:ko kua:kj '
        . 'kur:ku lao:lo lat:la lav:lv lim:li lin:ln lit:lt ltz:lb lub:lu lug:lg '
        . 'mah:mh mal:ml mar:mr mkd:mk mlg:mg mlt:mt mon:mn mri:mi msa:ms mya:my '
        . 'nau:na nav:nv nbl:nr nde:nd ndo:ng nep:ne nld:nl nno:nn nob:nb nor:no '
        . 'nya:ny oci:oc oji:oj ori:or orm:om oss:os pan:pa pli:pi pol:pl por:pt '
        . 'pus:ps que:qu roh:rm ron:ro run:rn rus:ru sag:sg san:sa sin:si slk:sk '
        . 'slv:sl sme:se smo:sm sna:sn snd:sd som:so sot:st spa:es sqi:sq srd:sc '
        . 'srp:sr ssw:ss sun:su swa:sw swe:sv tah:ty tam:ta tat:tt tel:te tgk:tg '
        . 'tgl:tl tha:th tir:ti ton:to tsn:tn tso:ts tuk:tk tur:tr twi:tw uig:ug '
        . 'ukr:uk urd:ur uzb:uz ven:ve vie:vi vol:vo wln:wa wol:wo xho:xh yid:yi '
        . 'yor:yo zha:za zho:zh zul:zu ';
    foreach (explode(' ', trim($t)) as $p) {
        [$three, $two] = explode(':', $p);
        $m[$three] = $two;
    }
    // Individual languages a two-letter row carries for its macrolanguage
    // (zh = cmn, ar = arb, fa = pes, sw = swh …), read off the Word Map.
    foreach (seo_data('wordmap')['langs'] ?? [] as $c => $r) {
        $i = (string) ($r['meta']['iso6393'] ?? '');
        if ($i !== '' && !isset($m[$i]) && preg_match('/^[a-z]{2}$/', (string) $c)) $m[$i] = (string) $c;
    }
    return $m;
}

/**
 * lang="" value for a row code where only the code is at hand (comparison
 * tables, word-order rows). Same policy as seo_bcp47(), looking the row up:
 * the Word Map row first (its data is loaded on every page), then the Han
 * Map row for codes the Word Map lacks. A reconstruction ("Proto-…") gets
 * '' — the Han Map keys them pst, paa, phm, which are the real codes of
 * Central Pashto, Papuan languages and Phimbi. Lighthouse valid-lang and
 * rally review, 2026-10-16/17.
 */
function seo_lang_attr(string $code): string
{
    static $memo = [];
    if (isset($memo[$code])) return $memo[$code];
    $row = seo_data('wordmap')['langs'][$code] ?? null;
    if ($row === null && preg_match('/^p[a-z]+$/', $code)) {
        $row = seo_data('hanmap')['langs'][$code] ?? null;
    }
    if (is_array($row)) {
        $nm = $row['name'] ?? ($row['meta']['name'] ?? '');
        $nm = is_array($nm) ? (string) ($nm['en'] ?? reset($nm)) : (string) $nm;
        if (stripos($nm, 'proto-') === 0) return $memo[$code] = '';
        return $memo[$code] = seo_bcp47($code, $row);
    }
    $tag = explode('_', $code)[0];
    return $memo[$code] = preg_match('/^[a-z]{2,3}$/', $tag) ? $tag : '';
}


/**
 * <img> for a row's flag, or '' when the row names no single country.
 *
 * SVG files from flag-icons (MIT, assets/flags/README.md), not emoji: emoji
 * flags were tried first and do not render on Windows, which is where the
 * owner looked at the page. Lazy and sized, so the ~500 of these on a big
 * word page cost nothing until their <details> is opened — a closed one is
 * never fetched. alt is empty because the country name sits in the link text
 * or its title; a screen reader should not hear the country twice.
 */
function seo_country_flag_img(array $lang): string
{
    $name = seo_country_name($lang);
    // Two rows name something real that is not an ISO country, and both have
    // a proper flag in the set. Everything else that names no single country
    // — Esperanto and the constructed languages, Romani "Europe-wide", Fula
    // "across the Sahel", African French, Old Prussian — takes the neutral
    // mark, so the box is always filled and the names below stay in a column.
    // No reconstruction carries a flag, whatever its homeland line says.
    // Proto-Austronesian reads "Taiwan (Formosan homeland, hypothetical)" and
    // was the one proto row to get one, which made the rule look arbitrary
    // next to Proto-Turkic and Proto-Indo-European on the same page.
    if (stripos((string) ($lang['meta']['countries'] ?? ''), 'hypothetical') !== false) {
        $name = '';
    }
    $iso = SEO_COUNTRY_ISO[$name] ?? null;
    if ($iso === null && $name !== '22 Arab League states') {
        $iso = seo_sole_country($lang, (string) ($lang['code'] ?? ''));
    }
    $file = match (true) {
        $iso === 'GB-WLS'          => 'gb-wls',
        $name === '22 Arab League states' => 'arab',
        $iso !== null              => strtolower($iso),
        default                    => '_intl',
    };
    return '<img class="fl" src="/assets/flags/' . $file . '.svg" alt=""'
        . ' width="21" height="16" loading="lazy" decoding="async">';
}

/** The country a flag stands for, as the DATA spells it. Raw — see below. */
function seo_country_name(array $lang): string
{
    $s = trim((string) ($lang['meta']['countries'] ?? ''));
    if ($s === '') {
        return '';
    }
    return trim(preg_replace('/\s*\(.*$/u', '', explode(',', $s)[0]));
}

/**
 * The country for a reader: one spelling per country, in the UI language.
 *
 * Two faults this fixes, both from the persona review. Eleven countries
 * reach the same flag under more than one spelling, so one document showed
 * the US flag titled "US", "USA" and "United States"; and the title was
 * English on all nineteen UIs, so an Arabic page said title="China".
 *
 * Both go away by routing through the ISO code — one canonical spelling per
 * country — and then through seo_meta_value(), which already translates
 * country names for the language pages.
 */
const SEO_ISO_CANON = [
    'US' => 'United States', 'GB' => 'United Kingdom', 'FM' => 'Micronesia',
    'CV' => 'Cabo Verde',    'IL' => 'Israel',         'TR' => 'Türkiye',
    'KH' => 'Cambodia',      'SD' => 'Sudan',          'CD' => 'DR Congo',
    'LR' => 'Liberia',       'WF' => 'Wallis and Futuna',
];
function seo_country_label(string $ui, array $lang): string
{
    $raw = seo_country_name($lang);
    if ($raw === '') {
        return '';
    }
    $iso = SEO_COUNTRY_ISO[$raw] ?? null;
    $name = ($iso !== null && isset(SEO_ISO_CANON[$iso])) ? SEO_ISO_CANON[$iso] : $raw;
    return seo_meta_value($ui, $name);
}


function seo_world_region(array $lang): string
{
    if (!empty($lang['meta']['period'])) {
        return 'ancient';
    }
    $la = (float) ($lang['lat'] ?? 0);
    $ln = (float) ($lang['lng'] ?? 0);
    if ($ln <= -128 && $la >= 50) return 'north_america';
    // Siberia in two boxes, because one "east of 60, north of 50" put
    // KAZAKHSTAN there — Astana is 51.2N 71.4E, north of both Tuva and Altai.
    // The eastern box starts at 84E (Altai 86, Shor 88.5, Tuva 94, Buryat
    // 107); the western one needs 55N to reach Khanty and Mansi at 69E while
    // leaving Kazakhstan underneath it.
    if (($la >= 50 && $ln >= 84) || ($la >= 55 && $ln >= 60)) return 'north_asia';
    // Central Asia, and it has to be tested BEFORE South Asia: that box runs
    // 60-92E and was swallowing Kyrgyzstan, Uzbekistan, Tajikistan and
    // Xinjiang. Reported 2026-09-22 — "isn't Kyrgyzstan Central Asia?".
    if ($la >= 36 && $la < 53 && $ln >= 46 && $ln < 96) return 'mideast_ca';
    if ($ln >= 100 && $ln <= 150 && $la >= 20 && $la < 50) return 'east_asia';
    if ($la < -10 && $ln >= 110 && $ln <= 156) return 'oceania';
    if ($ln <= -140 || ($ln >= 130 && $la < 20) || ($ln >= 150 && $la < 30)) return 'oceania';
    if ($ln >= 92 && $ln < 141 && $la >= -11 && $la < 30) return 'se_asia';
    if ($ln >= 60 && $ln < 92 && $la >= 3 && $la < 50) return 'south_asia';
    if ($ln >= -26 && $ln < 62 && $la >= 36 && $la <= 75 && ($ln < 28 || $la >= 45)) return 'europe';
    if ($ln >= 25 && $ln < 100 && $la >= 10 && $la < 50) return 'mideast_ca';
    if ($ln >= -26 && $ln < 60 && $la >= -36 && $la < 38) return 'africa';
    if ($ln >= -170 && $ln < -30 && $la >= 14) return 'north_america';
    if ($ln >= -120 && $ln < -30 && $la < 14) return 'latin_america';
    return 'other';
}

/** Display order: the biggest groups of the atlas, then the odds and ends. */
/* Ancient last, after everything living and after the leftovers — it is the
   one section a reader browsing for a modern language never wants in the
   way, and it is 128 cards on a big word. */
const SEO_REGION_ORDER = ['east_asia', 'se_asia', 'south_asia', 'mideast_ca',
    'europe', 'africa', 'north_america', 'latin_america', 'oceania',
    'north_asia', 'other', 'ancient'];


function seo_family_coarse_label(string $ui, string $coarse, string $full = ''): string
{
    $direct = seo_meta_value($ui, $coarse);
    if ($direct !== $coarse) {
        return $direct;                    // the coarse form is in the table
    }
    if ($full === '' || $full === $coarse) {
        return $coarse;
    }
    // Trailing parenthetical, ASCII or fullwidth. Escaped rather than written
    // literally so the fullwidth pair stays legible in a diff.
    $re = '/\s*[(\x{FF08}][^)\x{FF09}]*[)\x{FF09}]\s*$/u';
    $t = trim((string) preg_replace($re, '', seo_meta_value($ui, $full)));
    return $t !== '' ? $t : $coarse;
}


function seo_meta_value(string $ui, string $value): string
{
    if ($ui === 'en' || $value === '') {
        return $value;
    }
    $t = seo_data('meta_i18n');
    return $t['fields'][$value][$ui] ?? $value;
}

/**
 * lang of a meta chip value when seo_meta_value() found no translation and
 * printed the stored string: Han Map speakers prose is Japanese (約9000万人),
 * everything else English. '' when translated or when it has no letters.
 */
function seo_meta_value_lang(string $ui, string $value): string
{
    if ($value === '' || !preg_match('/\p{L}/u', $value)) return '';
    // Stored values are Japanese or English; Japanese with no kana (歴史言語 / 推定不可, Han Map regions) is Han with no Latin.
    $ja = '/[\x{3041}-\x{3096}\x{30A1}-\x{30FA}]|[万億]人|^約/u';
    $src = (preg_match($ja, $value) || (preg_match('/\p{Han}/u', $value) && !preg_match('/\p{Latin}/u', $value))) ? 'ja' : 'en';
    if ($ui === $src) return '';
    $shown = seo_meta_value($ui, $value);
    if ($shown === $value) return $src;
    if ($ui === 'ja') return '';
    $kana = '/[\x{3041}-\x{3096}\x{30A1}-\x{30FA}]/u';
    // An English source with Chinese place names (Fuzhou 抚州): tag the CJK runs by their own script, never as Japanese.
    if ($src === 'en' && !preg_match($kana, $shown)) return preg_match('/[\x{3400}-\x{4DBF}\x{4E00}-\x{9FFF}]/u', $shown) && !in_array($ui, ['zh', 'yue'], true) ? 'cjk-runs' : '';
    // Some stored "translations" are the Japanese copied over (ko 歴史言語 / 推定不可) or
    // half-translated (ar 約4400万人 (هاكا全体)): tag what is still Japanese.
    $jaShown = preg_match($ja, $shown) && !in_array($ui, ['zh', 'yue'], true) || preg_match('/[\x{3041}-\x{3096}\x{30A1}-\x{30FA}]/u', $shown);
    if (!$jaShown && !in_array($ui, ['zh', 'yue'], true) && preg_match('/[\x{3400}-\x{4DBF}\x{4E00}-\x{9FFF}]/u', $shown)) $jaShown = true;
    if (!$jaShown) return '';
    // Only CJK letters (plus digits/punctuation): the whole value is Japanese; mixed: tag the runs.
    return preg_match('/[^\x{3005}\x{3041}-\x{3096}\x{30A1}-\x{30FA}\x{30FC}\x{3400}-\x{4DBF}\x{4E00}-\x{9FFF}\P{L}]/u', $shown) ? 'ja-runs' : 'ja';
}
/** Chip value markup: an untranslated value is isolated and tagged; CJK runs inside English keep their own lang. */
function seo_chip_value(string $text, string $lang): string
{
    if ($lang === '') return e($text);
    if ($lang === 'cjk-runs') return seo_cjk_lang_runs(e($text));
    // Explicit code points, not \p{Han}: see seo_cjk_lang_runs.
    if ($lang === 'ja-runs') return (string) preg_replace('/[\x{3005}\x{3041}-\x{3096}\x{30A1}-\x{30FA}\x{30FC}\x{3400}-\x{4DBF}\x{4E00}-\x{9FFF}][\x{3005}\x{3041}-\x{3096}\x{30A1}-\x{30FA}\x{30FC}\x{3400}-\x{4DBF}\x{4E00}-\x{9FFF}0-9,.~+\/\x{3000}-\x{303F}]*/u', '<span lang="ja">$0</span>', e($text));
    return '<bdi lang="' . $lang . '">' . ($lang === 'en' ? seo_cjk_lang_runs(e($text)) : e($text)) . '</bdi>';
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
        . "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
        . "<title>404 — " . e(seo_t($ui, 'nf_title')) . "</title>"
        . "<meta name=\"robots\" content=\"noindex\">"
        . "<style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem}</style>"
        // The detail line is an English developer message: mark it as such.
        . "</head><body><main><h1>404</h1><p>" . e(seo_t($ui, 'nf_title')) . "</p><p style=\"color:#5c5c72;font-size:.9rem;overflow-wrap:anywhere\"><bdi lang=\"en\" dir=\"ltr\">" . e($msg) . "</bdi></p>"
        . "<p><a href=\"/" . e($ui) . "/wordmap/\">" . e(seo_t($ui, 'nf_wm')) . "</a> · <a href=\"/" . e($ui) . "/hanmap/\">" . e(seo_t($ui, 'nf_hm')) . "</a></p>"
        . "</main></body></html>";
}

/**
 * lang for a source title on a non-en page: "en" only for a title written
 * entirely in Latin/IPA that names an English database or reads as English
 * prose; mixed or foreign-language titles inherit the page language.
 * (Rally r16; 2,212 of 2,980 titles get en.)
 */
function seo_src_lang(string $t, string $ui): string
{
    if ($ui === 'en' || $t === '') return '';
    if (preg_match('/[^\x{0000}-\x{036F}\x{1E00}-\x{1EFF}\x{2000}-\x{206F}\x{2190}-\x{21FF}\x{2C60}-\x{2C7F}\x{A720}-\x{A7FF}]/u', $t)) return '';
    if (preg_match('/^(?:Ethnologue|Glottolog|Wikipedia|Wiktionary|ASJP|ABVD|UNESCO|Unicode|WOLD|IDS|Lexibank|CLDF|Omniglot|PHOIBLE|NorthEuraLex)\b/u', $t)) return 'en';
    return preg_match('/(?<!\p{L})(?:the|of|and|an|to|for|dictionary|grammar|language|languages|vocabulary|wordlist|entries|texts?|via|from|with|database|table|row|press|university|edition|phonology|morphology|studies|study|association|lexicon|lemmas|estimate|introduction|reconstruction|history|survey|structures|resources|spoken|written|reference|papers|chapter|pronunciation|short|new)(?!\p{L})/iu', $t) ? 'en' : '';
}

/**
 * Han Map reading label (漢音 / Kan-on, 上去・上來（directional verb: go up）):
 * CJK runs by script, and outside en the English words tagged lang="en".
 */
function seo_reading_label(string $ui, string $label): string
{
    if ($ui === 'en') return seo_cjk_lang_runs(e($label));
    $out = '';
    foreach (preg_split('/([A-Za-z][A-Za-z\x{00C0}-\x{024F}\x{0300}-\x{036F}\'’-]*(?:[ :\/,-]+[A-Za-z][A-Za-z\x{00C0}-\x{024F}\x{0300}-\x{036F}\'’-]*)*)/u', $label, -1, PREG_SPLIT_DELIM_CAPTURE) ?: [$label] as $i => $part) {
        if ($part === '') continue;
        $out .= ($i % 2) ? '<span lang="en">' . e($part) . '</span>' : seo_cjk_lang_runs(e($part));
    }
    return $out;
}

/** Wrap each CJK run of already-escaped text in its own lang (ja / ko / zh). */
function seo_cjk_lang_runs(string $escaped): string
{
    // Explicit code points: \p{Han}/\p{Hiragana} follow Script_Extensions in
    // newer PCRE2, so 《》、。 counted as kana and Chinese came out lang=ja.
    return preg_replace_callback('/[\x{2E80}-\x{2FDF}\x{3005}-\x{3007}\x{3021}-\x{3029}\x{3041}-\x{3096}\x{309D}-\x{309F}\x{30A1}-\x{30FA}\x{30FC}-\x{30FF}\x{31F0}-\x{31FF}\x{3400}-\x{4DBF}\x{4E00}-\x{9FFF}\x{F900}-\x{FAFF}\x{1100}-\x{11FF}\x{3131}-\x{318E}\x{AC00}-\x{D7A3}\x{20000}-\x{3134F}]+/u', function ($m) {
        $l = preg_match('/[\x{3041}-\x{3096}\x{30A1}-\x{30FA}\x{31F0}-\x{31FF}]/u', $m[0]) ? 'ja'
           : (preg_match('/[\x{1100}-\x{11FF}\x{3131}-\x{318E}\x{AC00}-\x{D7A3}]/u', $m[0]) ? 'ko' : 'zh');
        return '<span lang="' . $l . '">' . $m[0] . '</span>';
    }, $escaped) ?? $escaped;
}

/**
 * Text colour for a word-order segment: the role colour from the data,
 * darkened (same hue) until it reaches 4.5:1 on the anchor-row tint #ecf1f7,
 * the darkest background it sits on. Many role colours were 2-4:1 as text.
 * The connectors keep the original colour (data-c). Rally review r10.
 */
function seo_text_color(string $hex): string
{
    static $memo = [];
    if (isset($memo[$hex])) return $memo[$hex];
    if (!preg_match('/^#?([0-9a-f]{6})$/i', $hex, $m)) return $memo[$hex] = $hex;
    $rgb = array_map('hexdec', str_split($m[1], 2));
    $lum = function (array $c): float {
        $l = array_map(function ($v) { $v /= 255; return $v <= 0.03928 ? $v / 12.92 : (($v + 0.055) / 1.055) ** 2.4; }, $c);
        return 0.2126 * $l[0] + 0.7152 * $l[1] + 0.0722 * $l[2];
    };
    $bg = $lum([0xec, 0xf1, 0xf7]);
    for ($i = 0; $i < 40; $i++) {
        if (($bg + 0.05) / ($lum($rgb) + 0.05) >= 4.6) break;
        $rgb = array_map(function ($v) { return (int) floor($v * 0.93); }, $rgb);
    }
    return $memo[$hex] = sprintf('#%02x%02x%02x', $rgb[0], $rgb[1], $rgb[2]);
}

/**
 * Build a Leaflet embed (minimal, self-contained) centered on a coordinate.
 * Returns HTML. If coords are missing, returns an empty string.
 */
function seo_map_embed(?float $lat, ?float $lng, string $label, int $zoom = 5, string $ui = 'en'): string
{
    if ($lat === null || $lng === null) {
        return '';
    }
    $lat = (float) $lat;
    $lng = (float) $lng;
    $jsLabel = json_encode($label, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT);
    $id = 'seo-map';
    // An attribute, so HTML-escaped (the JSON form above is for the script:
    // its quotes broke the attribute apart — rally review r3).
    $attrLabel = e(seo_t($ui, 'where') . ' — ' . $label);
    // Leaflet's own control titles are English; give them the page language (r21).
    $zi = ['en' => 'Zoom in', 'ja' => '拡大', 'ko' => '확대', 'zh' => '放大', 'yue' => '放大', 'vi' => 'Phóng to', 'th' => 'ขยาย', 'id' => 'Perbesar', 'hi' => 'ज़ूम इन', 'de' => 'Vergrößern', 'fr' => 'Agrandir', 'it' => 'Ingrandisci', 'es' => 'Acercar', 'pt' => 'Aproximar', 'ru' => 'Увеличить', 'uk' => 'Збільшити', 'ar' => 'تكبير', 'he' => 'הגדל', 'sw' => 'Kuza'];
    $zo = ['en' => 'Zoom out', 'ja' => '縮小', 'ko' => '축소', 'zh' => '缩小', 'yue' => '縮小', 'vi' => 'Thu nhỏ', 'th' => 'ย่อ', 'id' => 'Perkecil', 'hi' => 'ज़ूम आउट', 'de' => 'Verkleinern', 'fr' => 'Réduire', 'it' => 'Riduci', 'es' => 'Alejar', 'pt' => 'Afastar', 'ru' => 'Уменьшить', 'uk' => 'Зменшити', 'ar' => 'تصغير', 'he' => 'הקטן', 'sw' => 'Punguza'];
    $jsZin = json_encode($zi[$ui] ?? $zi['en'], JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
    $jsZout = json_encode($zo[$ui] ?? $zo['en'], JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
    return <<<HTML
<div class="seo-map-wrap">
  <div id="{$id}" class="seo-map" role="region" aria-label="{$attrLabel}"></div>
</div>
<script>
(function () {
  // Leaflet (CSS + JS) is fetched only when the map nears the viewport, so it
  // neither blocks first paint nor adds main-thread work on load
  // (Lighthouse render-blocking + TBT, 2026-10-16).
  var el = document.getElementById('{$id}');
  if (!el) return;
  var started = false;
  function load() {
    if (started) return; started = true;
    // Start the map only once BOTH have arrived: without leaflet.css the
    // tiles are not positioned or clipped and spill over the page.
    // basemap_key.js (CARTO_BASEMAP_KEY, not in the repo) as on the maps:
    // CARTO stamps "API key required" on tiles requested without it.
    var left = 3;
    function one() { if (--left === 0) init(); }
    var key = document.createElement('script');
    key.src = '/basemap_key.js';
    key.onload = key.onerror = one;
    document.head.appendChild(key);
    var css = document.createElement('link');
    css.rel = 'stylesheet'; css.href = '/vendor/leaflet-1.9.4/leaflet.css';
    css.onload = css.onerror = one;
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src = '/vendor/leaflet-1.9.4/leaflet.js';
    js.onload = one;
    document.head.appendChild(js);
  }
  function init() {
    if (typeof L === 'undefined') return;
    var map = L.map(el, { scrollWheelZoom: false, attributionControl: true, zoomControl: false })
      .setView([{$lat}, {$lng}], {$zoom});
    L.control.zoom({ zoomInTitle: {$jsZin}, zoomOutTitle: {$jsZout} }).addTo(map);
    // The Leaflet credit link's English title ("A JavaScript library for interactive maps").
    if (map.attributionControl) map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
    // CARTO Voyager, as on the maps themselves: it serves real @2x tiles
    // ({r}), sharp on high-DPR screens (image-size-responsive). OSM's own
    // tiles have no @2x, and Leaflet's detectRetina on them drew every label
    // at half size and fetched 4x the tiles (rally review r2, 2026-10-17).
    var k = (typeof window.CARTO_BASEMAP_KEY === 'string' && window.CARTO_BASEMAP_KEY)
      ? '?key=' + encodeURIComponent(window.CARTO_BASEMAP_KEY) : '';
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' + k, {
      maxZoom: 18, subdomains: 'abcd',
      attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a> &middot; &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // No shadow: Leaflet's marker-shadow.png has no 2x version (image-size-responsive).
    var P = '/vendor/leaflet-1.9.4/images/';
    L.marker([{$lat}, {$lng}], { alt: {$jsLabel}, icon: L.icon({ iconUrl: P + 'marker-icon.png', iconRetinaUrl: P + 'marker-icon-2x.png',
      iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], tooltipAnchor: [16, -28] }) }).addTo(map).bindPopup({$jsLabel});
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); load(); }
    }, { rootMargin: '200px' });
    io.observe(el);
  } else {
    window.addEventListener('load', load);
  }
})();
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
        echo '<link rel="alternate" hreflang="' . e(seo_hreflang_code($ui)) . '" href="' . e($href) . "\">\n";
    }
    echo '<link rel="alternate" hreflang="x-default" href="'
        . e(SEO_SITE . '/en' . $altPath) . "\">\n";
}

/**
 * Google Fonts request trimmed to the scripts the page actually contains.
 *
 * The <head> used to request all eleven families on every page: a 251 KB
 * stylesheet, 100% unused at load on a Japanese page (Lighthouse,
 * 2026-10-16). seo_head() prints a marker and buffers the page; when the page
 * is finished, the marker is replaced by a request for the Latin/IPA faces
 * plus only the CJK / Tibetan / Tangut / Phags-pa / Mongolian faces whose
 * characters occur in the HTML (inline JSON blobs included — they are
 * written with JSON_UNESCAPED_UNICODE).
 */
const SEO_FONTS_MARK = '<!--seo-fonts-->';

function seo_fonts_placeholder(): string
{
    static $started = false;
    if (!$started) {
        $started = true;
        ob_start(fn(string $html) => str_replace(SEO_FONTS_MARK, seo_fonts_links($html), $html));
    }
    return SEO_FONTS_MARK;
}

function seo_fonts_links(string $html): string
{
    $full = $html;
    // Look at what the page SHOWS: the body, without the shared <style> (CSS
    // comments carry 话 / マ), the language picker (its endonyms 한국어 … are
    // drawn in the system font of a native <select>) and scripts other than
    // the JSON content blobs. Scanning everything requested JP/SC/TC/KR on
    // every page (rally review, 2026-10-17).
    $p = stripos($html, '<body');
    if ($p !== false) $html = substr($html, $p);
    $html = preg_replace('~<style\b.*?</style>~is', '', $html);
    $html = preg_replace('~<select\b.*?</select>~is', '', $html);
    $html = preg_replace('~<script(?![^>]*application/json)\b.*?</script>~is', '', $html);
    if ($html === null) $html = $full;
    $fam = ['Gentium+Plus:wght@400;700', 'Charis+SIL:wght@400;700', 'Noto+Serif:wght@400;700'];
    $han = preg_match('/[\x{3400}-\x{9FFF}\x{F900}-\x{FAFF}\x{20000}-\x{3134F}]/u', $html);
    if ($han || preg_match('/[\x{3040}-\x{30FF}]/u', $html)) $fam[] = 'Noto+Serif+JP:wght@400;700';
    if ($han) { $fam[] = 'Noto+Serif+SC:wght@400;700'; $fam[] = 'Noto+Serif+TC:wght@400;700'; }
    if (preg_match('/[\x{1100}-\x{11FF}\x{3130}-\x{318F}\x{AC00}-\x{D7AF}]/u', $html)) $fam[] = 'Noto+Serif+KR:wght@400;700';
    // Indic / Southeast Asian / other scripts: the app gives each its Noto face;
    // here they fell to the system font, or to tofu where Noto Serif SC's slices
    // claim the codepoint (r25). Google slices these, so only the script's slice loads.
    foreach ([['/[\x{0900}-\x{097F}]/u', 'Noto+Serif+Devanagari'], ['/[\x{0980}-\x{09FF}]/u', 'Noto+Serif+Bengali'], ['/[\x{0A80}-\x{0AFF}]/u', 'Noto+Serif+Gujarati'], ['/[\x{0A00}-\x{0A7F}]/u', 'Noto+Serif+Gurmukhi'], ['/[\x{0B00}-\x{0B7F}]/u', 'Noto+Serif+Oriya'], ['/[\x{0B80}-\x{0BFF}]/u', 'Noto+Serif+Tamil'], ['/[\x{0C00}-\x{0C7F}]/u', 'Noto+Serif+Telugu'], ['/[\x{0C80}-\x{0CFF}]/u', 'Noto+Serif+Kannada'], ['/[\x{0D00}-\x{0D7F}]/u', 'Noto+Serif+Malayalam'], ['/[\x{0D80}-\x{0DFF}]/u', 'Noto+Serif+Sinhala'], ['/[\x{0E00}-\x{0E7F}]/u', 'Noto+Serif+Thai'], ['/[\x{0E80}-\x{0EFF}]/u', 'Noto+Serif+Lao'], ['/[\x{1780}-\x{17FF}]/u', 'Noto+Serif+Khmer'], ['/[\x{1000}-\x{109F}]/u', 'Noto+Serif+Myanmar'], ['/[\x{1C50}-\x{1C7F}]/u', 'Noto+Sans+Ol+Chiki'], ['/[\x{10A0}-\x{10FF}]/u', 'Noto+Serif+Georgian'], ['/[\x{0530}-\x{058F}]/u', 'Noto+Serif+Armenian'], ['/[\x{1200}-\x{139F}]/u', 'Noto+Serif+Ethiopic'], ['/[\x{0700}-\x{074F}]/u', 'Noto+Sans+Syriac']] as [$re, $f]) {
        if (preg_match($re, $html)) $fam[] = $f;
    }
    // Tibetan, Tangut, Phags-pa and Mongolian are one unsliced file each (Tibetan
    // 732 KB for the three glyphs a word page shows): request only the glyphs
    // on the page, through a second URL with &text= (r21).
    $rare = [];
    foreach ([['/[\x{0F00}-\x{0FFF}]/u', 'Noto+Serif+Tibetan:wght@400;700'], ['/[\x{17000}-\x{18AFF}]/u', 'Noto+Serif+Tangut'],
              ['/[\x{A840}-\x{A87F}]/u', 'Noto+Sans+Phags+Pa'], ['/[\x{1800}-\x{18AF}]/u', 'Noto+Sans+Mongolian']] as [$re, $f]) {
        if (preg_match_all($re, $html, $mm)) { $rare[$f] = array_unique($mm[0]); }
    }
    $link = function (string $url): string {
        $u = htmlspecialchars($url, ENT_QUOTES);
        return '<link rel="stylesheet" href="' . $u . '" media="print" onload="this.media=\'all\'">' . "\n"
            . '<noscript><link rel="stylesheet" href="' . $u . '"></noscript>';
    };
    $out = $link('https://fonts.googleapis.com/css2?family=' . implode('&family=', $fam) . '&display=swap');
    if ($rare) {
        $chars = array_unique(array_merge(...array_values($rare)));
        $out .= "\n" . $link('https://fonts.googleapis.com/css2?family=' . implode('&family=', array_keys($rare))
            . '&display=swap&text=' . rawurlencode(implode('', $chars)));
    }
    return $out;
}

/** Shared <head> + page chrome opening. */
/**
 * BreadcrumbList JSON-LD matching the visible .seo-crumbs (r19: the SSR pages
 * had no structured data). $items: [name, path|null]; the last (current page)
 * may omit its path, which Google allows.
 */
function seo_breadcrumb_ld(array $items): string
{
    $list = [];
    foreach (array_values($items) as $i => [$name, $path]) {
        $el = ['@type' => 'ListItem', 'position' => $i + 1, 'name' => (string) $name];
        if ($path !== null) $el['item'] = SEO_SITE . $path;
        $list[] = $el;
    }
    $json = json_encode(['@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => $list], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP);
    return '<script type="application/ld+json">' . $json . "</script>\n";
}

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
<?= seo_fonts_placeholder() ?>
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
<link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png">
<link rel="apple-touch-icon" href="/icon-180.png">
<style>
:root { --fg:#1a1a2e; --muted:#5c5c72; --bg:#fafafe; --accent:#2f62a3; --card:#fff; --line:#e6e6ef; }
* { box-sizing: border-box; }
body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--fg); background: var(--bg); margin: 0; line-height: 1.5; }
.seo-wrap { max-width: 60rem; margin: 0 auto; padding: 1.5rem 1.25rem 4rem; }
.seo-crumbs { font-size: .95rem; color: var(--muted); margin: 0 0 1rem; }
.seo-crumbs a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; } /* link-in-text-block: accent vs muted is 1.05:1 */
.seo-hero h1 { font-size: clamp(1.9rem, 7vw, 4.5rem); overflow-wrap: break-word; hyphens: auto; line-height: 1.05;
  margin: .2rem 0 .3rem; letter-spacing: -.01em; }
.seo-hero .native { font-size: clamp(1.6rem, 5vw, 3rem); color: var(--accent);
  margin: 0 0 .4rem; font-weight: 600;
  /* Lead with the loaded CJK serifs so a native name renders in ONE font even
     when the OS font lacks a glyph (e.g. simplified-only 话 in 普通话, which a
     Japanese system font drops, leaving it in a mismatched fallback face). */
  font-family: "Gentium Plus", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif SC", "Noto Serif TC", "Noto Serif JP", "Noto Serif KR",
    "Gentium Plus", system-ui, sans-serif; }
/* ...but Han in a Japanese, Korean or traditional-Chinese name takes that
   language's glyph shapes, not the Simplified Chinese ones (日本語 was drawn
   in Noto Serif SC). */
.seo-hero .native:lang(ja), .seo-hero .native [lang|="ja"], .seo-hero .native:lang(ojp), .seo-hero .native:lang(ain), .seo-hero .native:lang(rys), .seo-hero .native:lang(mvi) {
  font-family: "Gentium Plus", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif JP", "Noto Serif SC", "Noto Serif TC", "Noto Serif KR", "Gentium Plus", system-ui, sans-serif; }
.seo-hero .native:lang(ko), .seo-hero .native [lang|="ko"], .seo-hero .native:lang(okm), .seo-hero .native:lang(oko) {
  font-family: "Gentium Plus", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif KR", "Noto Serif TC", "Noto Serif JP", "Noto Serif SC", "Gentium Plus", system-ui, sans-serif; }
.seo-hero .native:lang(yue), .seo-hero .native:lang(zh-Hant), .seo-hero .native:lang(zh-HK), .seo-hero .native:lang(zh-TW),
.seo-hero .native [lang|="yue"], .seo-hero .native [lang="zh-Hant"] {
  font-family: "Gentium Plus", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif TC", "Noto Serif SC", "Noto Serif JP", "Noto Serif KR", "Gentium Plus", system-ui, sans-serif; }
.seo-hero .sub { font-size: 1.1rem; color: var(--muted); margin: 0 0 1rem; }
.seo-meta { display: flex; flex-wrap: wrap; gap: .5rem .75rem; margin: 1rem 0 1.5rem; }
.seo-meta .chip { background: var(--card); border: 1px solid var(--line);
  border-radius: 999px; padding: .3rem .85rem; font-size: .95rem; }
.seo-meta .chip b { color: var(--muted); font-weight: 600; }   /* the space after </b> is the gap */
.seo-desc { font-size: 1.15rem; max-width: 50rem; margin: 0 0 2rem; overflow-wrap: anywhere; }
/* --- word page: one card per language group ------------------------------
   Grid, and NOT CSS columns. Columns were tried and had to be undone: they
   pack beautifully, but opening one card re-flows the whole list and throws
   cards across column boundaries, so the reader loses the place they were
   looking at. A grid only pushes what is BELOW the card being opened, and
   never moves what is above it.

   The holes that drove the move to columns are gone anyway: every closed
   card is now the same three or four lines — name, form, sound, and one
   summary line — where the old ones ran from one line to twenty.

   Links are not underlined: at a thousand entries an underline apiece turns
   the page into a grid of rules. Colour and hover carry the affordance. */
.wgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: .9rem; align-items: start; }
.wcard { background: var(--card); border: 1px solid var(--line); border-radius: .8rem;
  padding: .8rem 1rem .9rem; margin: 0; }
.wcard-lang a { color: inherit; text-decoration: none; }
.wcard-lang a:hover, .wcard-lang a:focus-visible { color: var(--fg); box-shadow: 0 1px 0 currentColor; }
.wcard-lang { font-size: .78rem; font-weight: 600; letter-spacing: .05em;
  text-transform: uppercase; color: var(--muted); margin: 0 0 .35rem; }
/* The date on a historical card. Quiet — it is the sort key made visible, not
   a second heading — and tabular so a column of centuries lines up. */
.wcard-era { font-size: .74rem; color: var(--muted);
  font-variant-numeric: tabular-nums; margin: -.25rem 0 .3rem; }
.wcard > .surface { font-size: 1.75rem; line-height: 1.2; margin: 0; word-break: break-word; }
/* Tibetan needs its own face and a little more room. Noto Serif Tibetan is
   loaded above; the rest of the chain is the one the interactive map uses.
   The size bump is small and the leading is not: Tibetan stacks subjoined
   letters below the base letter, and 1.2 crops them against the line under. */
.s-tibt { font-family: "Noto Serif Tibetan", "Kailasa", "Microsoft Himalaya",
  "Jomolhari", "Tibetan Machine Uni", serif; }
.wcard > .surface.s-tibt { font-size: 2.15rem; line-height: 1.5; }
.wcard .surface:not(.s-tibt):not(.s-mong) { font-family: "Gentium Plus", "Charis SIL", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif JP",
    "Noto Serif SC", "Noto Serif TC", "Noto Serif KR", "Source Han Serif",
    "Songti SC", "STSong", "SimSun", "Hiragino Mincho ProN", "Yu Mincho",
    "MS Mincho", Georgia, "Times New Roman", serif; }   /* nested alternate spellings too (r27) */
/* Traditional Mongolian / Manchu: columns, top to bottom, running left to
   right. Same chain and the same rotation the map uses. max-height so that
   the one long form in the data — Inner Mongolian hello, 11 characters —
   wraps into a second column instead of making a card three times the
   height of its neighbours. */
.s-mong { font-family: "Noto Serif Mongolian", "Mongolian Baiti",
  "Noto Sans Mongolian", sans-serif;
  writing-mode: vertical-lr; text-orientation: mixed;
  display: inline-block; line-height: 1.4; max-height: 6.5em; }
.wcard > .ipa { font-size: .92rem; color: var(--muted); margin: .1rem 0 0; }
.wcard-where { margin: .3rem 0 0; font-size: .86rem; line-height: 1.75; }
/* The flag and the name it belongs to must never be split across a line.
   inline-flex rather than nowrap: nowrap would keep them together but push a
   long name (マリシート＝パッサマクオディ語) out of the card. As a flex row the
   flag is a non-shrinking item pinned at the start and the name wraps INSIDE
   the link, so the flag can never end up alone at the end of a line. */
.wcard-where a { color: var(--muted); text-decoration: none;
  display: inline-flex; align-items: baseline; max-width: 100%;
  vertical-align: top;
  /* Gap on the RIGHT, not between the flag and its own name: the space that
     was missing is the one between a name and the NEXT language's flag, which
     ran them together into one run of text. */
  margin-inline-end: .7em; }
.wcard-where a:last-child { margin-inline-end: 0; }
.wcard-where a:hover, .wcard-where a:focus-visible { color: var(--fg); text-decoration: none;
  box-shadow: 0 1px 0 currentColor; }
/* Flags are SVG files, not emoji — emoji flags do not render on Windows. The
   1px ring keeps a white flag (Japan) from dissolving into a white card. */
.fl { width: 1.3em; height: auto; aspect-ratio: 4 / 3; object-fit: cover;
  border-radius: 2px; box-shadow: 0 0 0 1px rgba(0,0,0,.14); vertical-align: -.18em;
  margin-inline-end: .38em; flex: 0 0 auto; }
.wcard-lang { display: flex; align-items: baseline; }
.wcard-lang .fl { margin-inline-end: .45em; }
.wcard-lang a { min-width: 0; overflow-wrap: anywhere; }

/* "35 readings of the same spelling" — the variation stated, then unfolded on
   request. This is the line that replaced a wall of flags and names. */
.wcard-more { margin: .45rem 0 0; }
.wcard-more > summary { cursor: pointer; font-size: .82rem; color: var(--accent);
  list-style: none; }
.wcard-more > summary::-webkit-details-marker { display: none; }
.wcard-more > summary::after { content: ' \203A'; display: inline-block; transition: transform .15s; }
.wcard-more[open] > summary::after { transform: rotate(90deg); }
.wcard-more > summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px;
  border-radius: .25rem; }
.wcard-more .wcard-form { margin-top: .6rem; padding-top: .6rem; border-top: 1px dashed var(--line); }
.wcard-more .surface { font-size: 1.15rem; margin: 0; }
.wcard-more .surface.s-tibt { font-size: 1.45rem; line-height: 1.5; }
.wcard-more .ipa { font-size: .85rem; color: var(--muted); margin: 0; }
@media (max-width: 480px) { .wgrid { grid-template-columns: 1fr; } }

/* A reading nested under its spelling: the spelling is printed once and each
   pronunciation sits beneath it. Before this the fold repeated نجم once per
   reading, under a summary that said "2 spellings". */
/* Readings are siblings and must look it. An earlier :first-child exception
   stripped the rule from the first one only, so a two-reading card had a line
   beside the second and nothing beside the first — reported as "the second one
   has a line coming out of it, they should all be equal".

   The rule now depends on the CARD, not on position: it appears when the fold
   has more than one spelling, where it shows which spelling a reading belongs
   to, and is absent when there is only one, where it would point at nothing.
   Either way every reading in a card is treated the same. */
.wcard-read { margin: .3rem 0 0; }
.wcard-read + .wcard-read { margin-top: .4rem; }
.wcard-form.is-multi .wcard-read { padding-inline-start: .55rem; border-inline-start: 2px solid var(--line); }

/* A card with 35 pronunciations in it unfolds to a few thousand pixels and
   leaves its grid neighbours staring at empty space. Capping the panel keeps
   the row a sane height; align-items:start already stops the neighbours
   being stretched to match. */
.wcard-more[open] > div { max-height: 60vh; overflow-y: auto; }

/* PRINT. Without this a printout is the heading, 24 cards and eleven empty
   section titles: every region is a closed <details>, and closed content is
   display:none in every browser. A teacher printing a handout would get a
   page that says アフリカ (173) with nothing under it. Force everything open,
   drop the chrome, and stop cards breaking across pages. */
@media print {
  .seo-region, .wcard-more { display: block; }
  .seo-region > summary, .wcard-more > summary { list-style: none; }
  details.seo-region > summary::after, details.wcard-more > summary::after { content: none; }
  details::details-content { content-visibility: visible; }
  /* display:block on the child is not enough — a closed <details> hides its
     content via the UA's own rule on the element, so the children are forced
     visible explicitly. */
  details > div, details > .wgrid { display: block !important; visibility: visible !important; }
  details:not([open]) > *:not(summary) { display: block !important; }
  .wcard-more[open] > div, .wcard-more > div { max-height: none; overflow: visible; }
  .wgrid { display: block; columns: 3 auto; column-gap: 1rem; }
  .wcard { break-inside: avoid; border: 0; padding: 0 0 .5rem; background: none; }
  .seo-applink, .seo-goods, .seo-goods-peek, .seo-otherwords { display: none; }
  /* Screen-only controls; and every page of a paginated comparison prints. */
  .seo-langpop, .seo-langbar, .ex-nav, .ex-wo-select, .ex-prev, .ex-next, .leaflet-control-container { display: none !important; }
  .seo-ex .cmp-page[hidden] { display: table-row !important; }
  /* Wide tables: no scroll box on paper, wrap instead of cutting the right edge. */
  .seo-cmp-wrap, .seo-chartable-wrap { overflow: visible !important; }
  .seo-chartable-chunk thead th { height: auto !important; line-height: normal !important; padding-block: .5rem !important; clip-path: none !important; border-bottom: 2px solid var(--line) !important; }
  .seo-chartable-chunk { content-visibility: visible !important; min-width: 0 !important; }
  .seo-chartable { min-width: 0 !important; }
  .seo-cmp-tbl { min-width: 0 !important; width: 100% !important; }
  /* IPA has no break points: let long forms break anywhere rather than run off the page. */
  .seo-cmp-tbl.seo-cmp-tbl { font-size: 9pt; }
  .seo-cmp-tbl th, .seo-cmp-tbl td { white-space: normal !important; }
  .seo-cmp-tbl td { overflow-wrap: anywhere; }
  .seo-cmp-tbl th { overflow-wrap: normal !important; font-size: 8pt !important; hyphens: auto; }
  /* Connector paths are laid out for the screen; rows wrap differently on paper. */
  .seo-cmp-wo .wo-lines { display: none !important; }
  .seo-cmp-tbl th.cmp-rowhead { position: static !important; }
  .ex-wo-pick { display: none !important; }
  a { color: inherit; text-decoration: none; }
  .fl { box-shadow: none; }
}

/* Regional groups on a word page collapse. The <summary> carries the same
   h2 as an open section, so the heading looks identical either way; only the
   marker and the pointer differ. Content stays in the DOM. */
.seo-region > summary { list-style: none; cursor: pointer; }
.seo-region > summary::-webkit-details-marker { display: none; }
.seo-region > summary h2 { display: inline-block; width: calc(100% - 1.4em); }
.seo-region > summary::after { content: '\25BE'; float: inline-end; color: var(--muted);
  font-size: 1.2rem; margin-top: 2.9rem; transition: transform .15s; }
.seo-region[open] > summary::after { transform: rotate(180deg); }
.seo-region > summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
/* Long sections skip style/layout/paint until they near the viewport — the
   character table alone is ~190 rows. Biggest single cut to load-time layout
   work (Lighthouse TBT, 2026-10-16). The intrinsic size is a placeholder that
   the browser replaces with the real height once a section has rendered. */
.seo-hero + .seo-section { content-visibility: visible !important; contain-intrinsic-size: none !important; } /* a section right under the hero is in the first screen: no placeholder */
.seo-section, .seo-ex, .seo-related { content-visibility: auto; contain-intrinsic-size: auto 600px;
  overflow-clip-margin: 6px; } /* paint containment would clip focus rings at the edge */
/* Collapsed regions (~100px) and the nav gain nothing from it, and a 1500px
   placeholder for each made the scrollbar 4x too long (rally review r2). */
details.seo-region, nav.seo-section { content-visibility: visible; contain-intrinsic-size: none; }
/* Containment stops child margins collapsing through these boxes, which
   doubled the gap between sections. Put the gap on the box itself (where it
   still collapses with its siblings) and drop the inner leading/trailing
   margins that used to collapse into it. */
.seo-section { margin-top: 2.5rem; }
/* A region's h2 sits inside <summary> and keeps its own 2.5rem top margin. */
.seo-region { margin-top: 0; }
.seo-section > h2:first-child, .seo-ex > h2:first-child, .seo-related > h2:first-child { margin-top: 0; }
.seo-section > :last-child, .seo-ex > :last-child, .seo-related > :last-child { margin-bottom: 0; }
.seo-section h2 { font-size: 1.6rem; margin: 2.5rem 0 1rem; border-bottom: 2px solid var(--line);
  padding-bottom: .35rem; }
.seo-words { display: grid; grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: .9rem; }
.seo-word { background: var(--card); border: 1px solid var(--line); border-radius: .7rem;
  padding: .85rem 1rem; }
/* 87 cards (11,600px) rendered at load and were re-laid out by every font
   slice: mobile TBT 1-2 s. Each card skips layout until near the viewport. */
.seo-word { content-visibility: auto; contain-intrinsic-size: auto 90px; }
.seo-word.widx { contain-intrinsic-size: auto 51px; }
.seo-word .label { font-size: .8rem; text-transform: uppercase; letter-spacing: .04em;
  color: var(--muted); margin: 0 0 .25rem; }
.seo-word .surface { font-size: 2rem; line-height: 1.15; margin: 0; word-break: break-word; }
.seo-word .surface.s-tibt { font-size: 2.45rem; line-height: 1.5; }
/* The word index inverts the card: the word is the target and the count is
   the annotation, the opposite way round from a language page's word card. */
.widx .widx-word { font-size: 1.35rem; margin: 0; line-height: 1.25; }
.widx .widx-word a { color: inherit; text-decoration: none; }
.widx .widx-word a:hover, .widx .widx-word a:focus-visible { box-shadow: 0 1px 0 currentColor; }
.widx .widx-count { font-size: .82rem; color: var(--muted); margin: .25rem 0 0; }
.seo-word .ipa { font-size: 1.1rem; color: var(--accent); margin: .2rem 0 0; }
.seo-word .alt { font-size: .95rem; color: var(--muted); margin: .3rem 0 0;
  word-break: break-word; }
.seo-word .alt .alt-script { font-size: .75rem; }
/* Han-character readings as an aligned dictionary table (文白異讀 / 呉音漢音 etc.). */
.seo-chartable-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0; }
.seo-chartable { width: 100%; border-collapse: collapse; font-size: 1rem; }
.seo-chartable thead th { text-align: start; font-size: .8rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: .04em; color: var(--muted);
  padding: .5rem .85rem; border-bottom: 2px solid var(--line); white-space: nowrap; }
.seo-chartable thead th.c-char { text-align: center; }
/* Horizontal rule between characters, but not between a char's own reading rows. */
.seo-chartable tbody tr.char-start td { border-top: 1px solid var(--line); }
.seo-chartable tbody tr:first-child td { border-top: none; }
.seo-chartable td { padding: .55rem .85rem; vertical-align: middle; }
.seo-chartable td.c-char { text-align: center; vertical-align: middle;
  font-size: 1.6rem; line-height: 1; white-space: nowrap; }
.seo-chartable td.c-char .c-gl { display: block; margin-top: .3rem; color: var(--muted);
  font-size: .72rem; line-height: 1.25; white-space: normal; overflow-wrap: break-word;
  font-family: system-ui, sans-serif; }
.seo-chartable td.c-read { white-space: normal; }   /* long labels wrap inside the capped column */
.seo-chartable td.c-read .rlabel { display: inline-block; font-size: .68rem; color: var(--muted);
  border: 1px solid var(--line); border-radius: .5rem; padding: 0 .4rem; line-height: 1.5; }
.seo-chartable td.c-form { font-size: 1.05rem; word-break: break-word; }
/* Native-script glyph (Chữ Nôm / kana / hangul / Tangut / Phags-pa / Manchu …)
   shown above the romanization. */
.seo-chartable td.c-form .c-native { display: block; font-size: 1.5rem; line-height: 1.2;
  font-family: "Gentium Plus", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif JP", "Noto Serif SC", "Noto Serif TC", "Noto Serif KR",
    "Noto Serif Tangut", "Noto Sans Phags Pa", "Noto Sans Mongolian", "HanaMinA",
    "HanaMinB", "Nom Na Tong", serif; }
.seo-chartable td.c-form .c-rom { display: block; font-size: .92rem; color: var(--muted); }
.seo-chartable td.c-ipa { color: var(--accent); font-size: .9rem; white-space: nowrap; }
/* The table is cut into ~30-row tables (seo/hanmap.php). One colgroup, fixed
   layout: columns line up across the tables. Every table after the first is
   laid out only near the viewport; its thead stays for screen readers. */
.seo-chartable { table-layout: fixed; min-width: var(--tw, 32rem); }
.seo-chartable thead th { white-space: normal; overflow-wrap: break-word; }
.seo-chartable-chunk thead th::before { content: attr(data-h); }
.seo-chartable td.c-ipa { white-space: normal; overflow-wrap: anywhere; }
.seo-chartable-chunk { content-visibility: auto; min-width: var(--tw, 32rem);
  contain-intrinsic-size: auto calc(var(--r) * 2.7rem + var(--n) * 1.6rem); }
.seo-chartable-chunk thead th { padding-block: 0; border: 0; height: 0; line-height: 0; clip-path: inset(50%); }
.seo-chartable-chunk tbody tr:first-child td { border-top: 1px solid var(--line); }
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
  font-family: "Gentium Plus", "Charis SIL", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif JP",
    "Noto Serif SC", "Noto Serif TC", "Noto Serif KR", "Source Han Serif",
    "Songti SC", "STSong", "SimSun", "Hiragino Mincho ProN", "Yu Mincho",
    "MS Mincho", Georgia, "Times New Roman", serif;
}
.seo-map-wrap { margin: 1rem 0 2rem; }
.seo-map { height: 360px; border-radius: .7rem; border: 1px solid var(--line); }
.seo-sources { font-size: .95rem; padding-inline-start: 1.2rem; overflow-wrap: anywhere; }   /* long URLs / API paths */
.seo-sources li { margin: 0 0 .5rem; } /* 24px between adjacent links (target-size) */
.seo-sources a { color: var(--accent); }
.seo-index-list { columns: 2 16rem; gap: 2rem; padding: 0; list-style: none; }
.seo-index-list li { break-inside: avoid; margin: 0 0 .35rem; }
/* One-character labels (水, 火) were 16x19px tap targets (Lighthouse target-size). */
.seo-otherwords a { display: inline-block; min-width: 24px; min-height: 24px; text-align: center; }
/* No underline on language-name lists (owner 2026-09-21: 「言語に下線があるのもちょっと圧が強い」) */
.seo-index-list a { color: var(--accent); text-decoration: none; text-underline-offset: 2px; }
.seo-index-list a:hover, .seo-index-list a:focus-visible { text-decoration: underline; }
.seo-index-list .code { color: var(--muted); font-size: .85rem; }
/* Trivia ("読み物") pages: long-form prose, and the in-article map controls
   that seo/trivia.php turns from <button> into a label plus real links. */
.seo-prose { font-size: 1.05rem; line-height: 1.85; overflow-wrap: anywhere; }
.seo-prose p { margin: 0 0 1.1em; }
.seo-prose h2, .seo-prose h3 { font-size: 1.25rem; margin: 2em 0 .6em; border-bottom: 0; padding-bottom: 0; }
.seo-prose ul, .seo-prose ol { margin: 0 0 1.2em; padding-inline-start: 1.4em; }
.seo-prose li { margin: 0 0 .45em; }
.seo-prose blockquote { margin: 1.2em 0; padding: .1em 0 .1em 1em;
  border-inline-start: 3px solid var(--line); color: var(--muted); }
.seo-prose a { color: var(--accent); }
.trivia-actions { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.2em 0; }
.trivia-note { display: inline-block; background: #fff8ec; border: 1px solid #f0dfc0;
  border-radius: .6rem; padding: .35rem .7rem; font-size: .92rem; color: #6b5533; }
.trivia-note a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }

/* In-article locator maps and comparison tables (seo_tri_minimap /
   seo_tri_compare). The buttons in the body are instructions — "compare these
   four", "zoom to the Kalahari" — and on a static page we can answer them in
   place instead of only linking away. No script, no external request: the
   coastlines are a pre-rendered SVG from tools/build_seo_minimaps.js and the
   table is the same data the per-language pages already show. */
.trivia-embed { margin: 1.6em 0; padding: 0; }
/* .trivia-actions is a flex row of small note chips. A map or a table is not a
   chip — give it the whole row rather than letting it share one with a link. */
.trivia-actions .trivia-embed { flex: 1 0 100%; min-width: 0; margin: .4em 0; }   /* min-width:0 so the table scrolls inside it */
.trivia-embed figcaption { font-size: .95rem; color: var(--muted); margin: .5rem 0 0;
  display: flex; flex-wrap: wrap; gap: .5rem; align-items: baseline; }
.trivia-embed .trivia-embed-more { color: var(--accent); text-decoration: none;
  font-size: .85rem; white-space: nowrap; }
.trivia-embed .trivia-embed-more:hover { text-decoration: underline; }
.trivia-minimap svg { display: block; width: 100%; height: auto;
  border: 1px solid var(--line); border-radius: .6rem; background: #dce9f7; }
.trivia-minimap .mm-sea { fill: #dce9f7; }
.trivia-minimap .mm-land { fill: #f7f9fb; stroke: #9fb2c6; stroke-width: .7;
  stroke-linejoin: round; }
.trivia-minimap .mm-halo { fill: #e5484d; opacity: .2; }
.trivia-minimap .mm-dot { fill: #e5484d; stroke: #fff; stroke-width: 2; }
.trivia-minimap .mm-lang circle { fill: #1f2937; stroke: #fff; stroke-width: 1.5; }
.trivia-minimap .mm-lang text { font: 600 13px system-ui, sans-serif; fill: #1f2937;
  paint-order: stroke; stroke: #fff; stroke-width: 3.5px; stroke-linejoin: round; }
.trivia-compare figcaption { margin: 0 0 .5rem; }
.trivia-table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.trivia-compare table { border-collapse: collapse; width: 100%; font-size: .95rem; }
.trivia-compare th, .trivia-compare td { border: 1px solid var(--line);
  padding: .45rem .7rem; text-align: start; vertical-align: top; }
.trivia-compare thead th { background: var(--card); font-size: .85rem;
  color: var(--muted); font-weight: 600; white-space: nowrap; }
.trivia-compare tbody th { font-weight: 600; white-space: nowrap; }
.trivia-compare tbody th a { color: var(--accent); text-decoration: none; }
.trivia-compare tbody th a:hover { text-decoration: underline; }
/* Family and speaker counts are prose ("~380M L1 + ~1.5B total (with L2)")
   and will happily eat the width the word columns need. */
.trivia-compare .tc-meta { font-size: .85rem; color: var(--muted); max-width: 15ch; }
.trivia-compare .tc-form { display: block; }
.trivia-compare .tc-ipa { display: block; color: var(--muted); font-size: .85rem; }
.seo-tri-list { columns: 1; }
.seo-tri-list li { margin: 0 0 1rem; }
.seo-tri-sum { color: var(--muted); font-size: .95rem; margin-top: .15rem; }
.seo-applink { margin: 2rem 0; }
.seo-applink a { display: inline-block; background: var(--accent); color: #fff;
  padding: .7rem 1.3rem; border-radius: .6rem; text-decoration: none; font-weight: 600; }
/* Goods hand-off. Two earlier versions failed the only test that matters:
   the owner went to /ja/wordmap/my looking for it and could not see it. The
   first was a var(--line) outline under a filled accent button, three sections
   down; the second moved up and gained an accent border and still read as a
   notice rather than a thing to click. This one is a card with a product
   photo, because a photo of the shirt is the argument for the shirt — no
   amount of border colour makes that argument.

   The palette is the app's, not the page's: cream and the navy of the shirt
   itself (wordmap.html .tshirt-nudge), so the card reads as the same offer in
   both places AND stands out against this page's cool grey-blue. */
.seo-goods { margin: 2rem 0 2.6rem; scroll-margin-top: 1rem; }
.seo-goods-peek { margin: -.4rem 0 1.6rem; font-size: .92rem; }
.seo-goods-peek a { color: var(--muted); text-decoration: none; border-bottom: 1px dotted currentColor; }
.seo-goods-peek a:hover { color: var(--accent); }
.seo-goods > a { display: flex; gap: 1.2rem; align-items: center;
  padding: 1rem; border-radius: .9rem;
  border: 1px solid #e2d9c8; background: #faf7f2;
  box-shadow: 0 2px 10px rgba(45,32,12,.08);
  text-decoration: none; color: inherit;
  transition: transform .15s ease, box-shadow .15s ease, border-color .15s ease; }
.seo-goods > a:hover { transform: translateY(-2px); border-color: #c9b68f;
  box-shadow: 0 8px 22px rgba(45,32,12,.18); }
.seo-goods > a:focus-visible { outline: 2px solid #1b2a44; outline-offset: -3px; }
.seo-goods img { display: block; flex: none; width: 200px; height: 200px;
  object-fit: cover; border-radius: .7rem; background: #ece7dd; }
.seo-goods-text { min-width: 0; }
.seo-goods-title { display: block; font-size: 1.4rem; font-weight: 700;
  line-height: 1.25; margin: 0 0 .35rem; color: #2a2118; }
.seo-goods-lede { display: block; color: #6b6053; font-size: .98rem; line-height: 1.55; }
.seo-goods-note { display: block; color: #6b6254; font-size: .82rem; line-height: 1.5; margin-top: .45rem; }
.seo-goods-btn { display: inline-block; margin-top: .95rem; background: #1b2a44;
  color: #f4efe6; font-weight: 700; padding: .62rem 1.2rem; border-radius: 999px; }
.seo-goods > a:hover .seo-goods-btn { background: #26385a; }
@media (max-width: 560px) {
  .seo-goods > a { flex-direction: column; align-items: stretch; gap: .9rem; }
  .seo-goods img { width: 100%; height: 210px; }
}

.seo-foot { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--line);
  color: var(--muted); font-size: .9rem; }
.seo-foot a { color: var(--accent); }
.seo-foot-cta { margin: 0 0 .9rem; font-size: 1rem; }
.seo-foot-cta a { white-space: nowrap; }
.seo-foot-credit { margin: .9rem 0 0; font-size: .85rem; color: var(--muted); }
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
/* No underline on language-name lists (owner 2026-09-21: 「言語に下線があるのもちょっと圧が強い」) */
.seo-related .seo-siblings a { color: var(--accent); text-decoration: none; text-underline-offset: 2px; }
.seo-related .seo-siblings a:hover, .seo-related .seo-siblings a:focus-visible { text-decoration: underline; }
.seo-related .seo-siblings .code { color: var(--muted); font-size: .85rem; }
[dir="rtl"] { text-align: right; }
.seo-langbar { display: flex; justify-content: flex-end; align-items: center;
  gap: .5rem; margin: 0 0 .5rem; font-size: .9rem; color: var(--muted); }
.seo-langbar select { font: inherit; padding: .25rem .5rem; border: 1px solid var(--line);
  border-radius: .4rem; background: var(--card); color: var(--fg); }
.seo-langpop { position: fixed; left: 1rem; bottom: 1rem; max-width: 22rem; z-index: 9999; text-align: start;
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
.seo-ex .ex-nav { display: flex; flex-wrap: wrap; align-items: center; gap: .6rem; margin: .9rem 0 0; }
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
  font-family: "Gentium Plus", "Charis SIL", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif JP", "Noto Serif SC",
    "Noto Serif TC", "Noto Serif KR", Georgia, serif; }
.seo-ex .ex-w .ipa { font-size: .95rem; color: var(--accent); margin: .15rem 0 0; }
.seo-ex .ex-han { display: grid; grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: .6rem; }
.seo-ex .ex-h { background: var(--card); border: 1px solid var(--line); border-radius: .6rem;
  padding: .55rem .7rem; }
.seo-ex .ex-h .hc { font-size: 1.7rem; line-height: 1; margin: 0 0 .25rem; text-align: center;
  font-family: "Gentium Plus", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif SC", "Noto Serif TC", "Noto Serif JP", "Noto Serif KR", serif; }
.seo-ex .ex-h .hr { font-size: .85rem; margin: .15rem 0 0; line-height: 1.3; }
.seo-ex .ex-h .hr .rl { display: inline-block; font-size: .62rem; color: var(--muted);
  border: 1px solid var(--line); border-radius: .4rem; padding: 0 .3rem; margin-inline-end: .3rem; }
.seo-ex .ex-h .hr .hf { font-family: "Gentium Plus", "Noto Serif", serif; }
.seo-ex .ex-h .hr .hi { color: var(--accent); }
.seo-ex .ex-wo-pick { margin: 0 0 .9rem; }
.seo-ex .ex-wo-pick select { font: inherit; padding: .3rem .5rem; border: 1px solid var(--line);
  border-radius: .4rem; background: var(--card); color: var(--fg); max-width: 100%; }
.seo-ex .ex-wo-sent, .seo-ex .ex-wo-lazy { background: var(--card); border: 1px solid var(--line); border-radius: .7rem;
  padding: 1rem 1.1rem; }
.seo-ex .ex-wo-sent .wo-title, .seo-ex .ex-wo-lazy .wo-title { font-size: .9rem; color: var(--muted); margin: 0 0 .6rem; }
.seo-ex .ex-wo-sent .wo-seg, .seo-ex .ex-wo-lazy .wo-seg { display: inline-block; margin: 0 .3rem .4rem 0; padding: .15rem 0;
  border-bottom: 2px solid currentColor; font-size: 1.2rem;
  font-family: "Gentium Plus", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif JP", "Noto Serif SC",
    "Noto Serif TC", "Noto Serif KR", Georgia, serif; }
.seo-ex [hidden] { display: none !important; }
/* --- Comparison tables (current lang + sibling-language columns) --- */
.seo-cmp-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0; }
.seo-cmp-tbl { border-collapse: collapse; font-size: 1rem; min-width: 100%; }
.seo-cmp-tbl th, .seo-cmp-tbl td { padding: .5rem .7rem; border-bottom: 1px solid var(--line);
  vertical-align: top; text-align: start; }
.seo-cmp-tbl thead th { font-size: .85rem; font-weight: 600; color: var(--muted);
  border-bottom: 2px solid var(--line); white-space: nowrap; vertical-align: bottom; }
.seo-cmp-tbl thead th a { color: var(--accent); text-decoration: none; }
.seo-cmp-tbl thead th a:hover { text-decoration: underline; }
.seo-cmp-tbl th.cmp-rowhead { color: var(--muted); font-weight: 600; font-size: .85rem;
  white-space: nowrap; position: sticky; inset-inline-start: 0; background: var(--bg); z-index: 1; }
.seo-cmp-tbl th.cmp-rowhead .cmp-char { font-size: 1.5rem; line-height: 1;
  font-family: "Gentium Plus", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif SC", "Noto Serif TC", "Noto Serif JP", "Noto Serif KR", serif; }
/* Anchor (current language) column / header highlight. */
.seo-cmp-tbl .cmp-anchor { background: color-mix(in srgb, var(--accent) 9%, var(--card)); }
.seo-cmp-tbl thead th.cmp-anchor { background: color-mix(in srgb, var(--accent) 14%, var(--bg)); }
.seo-cmp-tbl thead th.cmp-anchor a, .seo-cmp-tbl thead th.cmp-anchor { color: var(--accent); font-weight: 700; }
.seo-cmp-tbl td .cmp-sf { display: block; word-break: break-word;
  font-family: "Gentium Plus", "Charis SIL", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif JP", "Noto Serif SC",
    "Noto Serif TC", "Noto Serif KR", Georgia, serif; }
.seo-cmp-tbl td .cmp-ipa { display: block; color: var(--accent); font-size: .85rem; }
.seo-cmp-tbl td .cmp-rl { font-size: .62rem; color: var(--muted); border: 1px solid var(--line);
  border-radius: .4rem; padding: 0 .3rem; margin-inline-end: .25rem; }
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
  font-family: "Gentium Plus", "Noto Serif", "Noto Serif Devanagari", "Noto Serif Bengali", "Noto Serif Gujarati", "Noto Serif Gurmukhi", "Noto Serif Oriya", "Noto Serif Tamil", "Noto Serif Telugu", "Noto Serif Kannada", "Noto Serif Malayalam", "Noto Serif Sinhala", "Noto Serif Thai", "Noto Serif Lao", "Noto Serif Khmer", "Noto Serif Myanmar", "Noto Sans Ol Chiki", "Noto Serif Georgian", "Noto Serif Armenian", "Noto Serif Ethiopic", "Noto Sans Syriac", "Noto Serif JP", "Noto Serif SC",
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
  .seo-cmp-wo .cmp-wo-segs .wo-seg { margin-inline-end: .7rem; margin-bottom: 0; font-size: 1.05rem; }
}
</style>
<?php /* Production-only GA4 firing: hostname-gated so dev/local/staging traffic
         doesn't pollute the analytics property (same config as the interactive maps). */ ?>
<script>
  if (['langmaps.com', 'www.langmaps.com', 'langmap.heuron.com']
      .includes(location.hostname)) {   // both hosts while the old one still 301s
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-JZ7JJBCCHG';
    // The 180 KB tag ran ~3 s of main-thread work during page load
    // (Lighthouse TBT, 2026-10-16). Events queue in dataLayer below, so
    // load it on the first interaction or 4 s after load, whichever first.
    var _gaGo = function () {
        if (_gaGo.done) return; _gaGo.done = true;
        document.head.appendChild(s);
    };
    ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) {
        window.addEventListener(ev, _gaGo, { once: true, passive: true });
    });
    if (document.readyState === 'complete') setTimeout(_gaGo, 4000);
    else window.addEventListener('load', function () { setTimeout(_gaGo, 4000); });
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
  // v2: until r26 the page saved the visitor's language silently; those saves
  // are not choices, so the old key no longer counts (r27).
  var KEY = 'langmap_ui_pref_v2';
  try { localStorage.removeItem('langmap_ui_pref'); } catch (e) {}
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
    // A labelled region near the top of the body (r24: an alertdialog that
    // never took focus, last in the DOM, over focused links); lang so the
    // question is read in its own language. Escape dismisses it like Stay.
    box.setAttribute('role', 'region');
    box.setAttribute('aria-labelledby', 'seo-langpop-msg');
    box.setAttribute('lang', targetUi);
    box.setAttribute('dir', (targetUi === 'ar' || targetUi === 'he') ? 'rtl' : 'ltr');
    var p = document.createElement('p'); p.id = 'seo-langpop-msg'; p.textContent = text; box.appendChild(p);
    var btns = document.createElement('div'); btns.className = 'btns';
    var bSwitch = document.createElement('button');
    bSwitch.className = 'primary';
    bSwitch.textContent = t.switch[targetUi] || t.switch.en;
    bSwitch.onclick = function () { set(targetUi); go(targetUi); };
    var bStay = document.createElement('button');
    bStay.textContent = t.stay[targetUi] || t.stay.en;
    bStay.onclick = function () { set(C.pageUi); if (box.parentNode) box.parentNode.removeChild(box); };
    btns.appendChild(bSwitch); btns.appendChild(bStay); box.appendChild(btns);
    document.body.insertBefore(box, document.body.firstChild);
    // Keep focused content clear of the fixed box (2.4.11).
    var pad = function () { document.documentElement.style.scrollPaddingBottom = box.parentNode ? (box.offsetHeight + 16) + 'px' : ''; };
    var close = function () { set(C.pageUi); if (box.parentNode) box.parentNode.removeChild(box); pad(); document.removeEventListener('keydown', onEsc); };
    var onEsc = function (e) { if (e.key === 'Escape') close(); };
    bStay.onclick = close;
    document.addEventListener('keydown', onEsc);
    setTimeout(pad, 0);
  }

  function init() {
    // Wire the picker pulldown.
    var sel = document.getElementById('seo-lang-pick');
    // Arrow keys on a closed <select> fire change on Windows/Linux: moving through
    // the list must not jump to each language and save it. Keyboard choices
    // commit on Enter or when the menu loses focus; mouse/touch picks at once (r26).
    if (sel) {
      var kb = false, pending = false;
      var commit = function () {
        pending = false;
        var u = sel.value;
        if (!supported(u) || u === C.pageUi) return;   // nothing chosen: nothing saved (r27)
        set(u);
        go(u);
      };
      sel.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); if (pending) commit(); return; }
        if (e.key === 'Escape') { pending = false; sel.value = C.pageUi; return; }   // cancel, don't commit on blur
        kb = /^(Arrow|Page|Home|End)/.test(e.key) || e.key.length === 1;
      });
      sel.addEventListener('pointerdown', function () { kb = false; });
      sel.addEventListener('change', function () { if (kb) { pending = true; return; } commit(); });
      sel.addEventListener('blur', function () { if (pending) commit(); });
    }

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
    }
    // No silent set() when the browser already matches: a saved language is only
    // ever an explicit choice, or every later /fr/ link bounced back to /ja/ (r26).
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

/**
 * A language page's meta description: sample pairs first ("水＝eau"), then the
 * page's own description, clipped to snippet length.
 */
/**
 * Other names a reader may search for (r28: "langmap shanghainese" found nothing:
 * the page called itself "Shanghai Wu"). From both maps' rows: the UI's
 * nickname, the other map's name for the code, and in English the rows' own
 * English names. Without the primary name and the native form, at most $max.
 */
function seo_lang_aliases(string $ui, string $code, string $primary, string $native, int $max = 3, array $extra = []): array
{
    $cand = [];
    foreach (['wordmap', 'hanmap'] as $map) {
        $l = (seo_data($map)['langs'] ?? [])[$code] ?? null;
        if (!$l) continue;
        $cand[] = (string) (($l['nicknames'] ?? [])[$ui] ?? '');
        $cand[] = (string) (($l['names'] ?? [])[$ui] ?? '');
        if ($ui === 'en') $cand[] = (string) ($l['name'] ?? '');
        // 上海话: what a Chinese reader types. Only a Han-script name ending in
        // 话/語…: the Han Map `native` is often a reading-layer label instead
        // (한국 한자음, Âm thuần Việt, 原始タイ語), which is not a language name (r29).
        if ($map === 'hanmap' && in_array($ui, ['zh', 'yue'], true)) {
            $hn = trim((string) ($l['native'] ?? ''));
            if (preg_match('/^\p{Han}+(话|話|语|語)$/u', $hn) && strpos((string) ($l['family'] ?? ''), '(proto)') === false) $cand[] = $hn;
        }
    }
    // zh/yue: a form in the other script is the same name, not an alias
    // (粤语 / 粵語, r29). zh drops candidates with traditional-only characters,
    // yue those with simplified-only ones; compare on the folded form too.
    $zhFold = function (string $t): string {
        return strtr($t, ['語' => '语', '話' => '话', '粵' => '粤', '漢' => '汉', '國' => '国', '東' => '东', '閩' => '闽', '廣' => '广', '灣' => '湾', '臺' => '台', '門' => '门', '陽' => '阳', '蘇' => '苏', '寧' => '宁', '貴' => '贵', '慶' => '庆', '鄉' => '乡', '韓' => '韩', '鮮' => '鲜', '滿' => '满', '島' => '岛', '縣' => '县', '區' => '区', '雲' => '云', '贛' => '赣', '開' => '开', '濟' => '济', '寶' => '宝', '劇' => '剧', '頭' => '头', '僑' => '侨', '亞' => '亚', '馬' => '马', '來' => '来', '興' => '兴', '華' => '华', '連' => '连', '鹽' => '盐', '遼' => '辽', '膠' => '胶', '蘭' => '兰', '銀' => '银', '時' => '时', '說' => '说', '學' => '学', '書' => '书', '讀' => '读']);
    };
    if ($ui === 'zh' || $ui === 'yue') {
        $cand = array_values(array_filter($cand, function ($c) use ($ui, $zhFold) {
            $f = $zhFold($c);
            if ($ui === 'zh') return $f === $c;                       // no traditional-only character
            return !preg_match('/[语话粤汉国东闽广湾门阳苏宁贵庆乡韩鲜满岛县区云赣开济宝剧头侨亚马来兴华连盐辽胶兰银时说学书读]/u', $c);   // no simplified-only character
        }));
    }
    // The other map's English row name first in English: "Shanghainese" beats
    // the Word Map's macrolanguage label "Wu Chinese".
    if ($ui === 'en') usort($cand, fn($a, $b) => (int) ($b === ((seo_data('hanmap')['langs'] ?? [])[$code]['name'] ?? '')) - (int) ($a === ((seo_data('hanmap')['langs'] ?? [])[$code]['name'] ?? '')));
    // The row's own alias list (meta.aliases) comes last, in the same line (r29:
    // it used to be a second "Also known as" line repeating the first).
    foreach ($extra as $x) $cand[] = (string) $x;
    $seen = [mb_strtolower($primary) => 1, mb_strtolower($native) => 1];
    $out = [];
    foreach ($cand as $c) {
        $c = trim($c); $k = mb_strtolower($c);
        if ($c === '' || isset($seen[$k])) continue;
        // "Central Bai (Zhoucheng, Dali)" under "Central Bai" is the same name
        // with a location, and in a title it nests brackets (r29).
        if (mb_strpos($k, mb_strtolower($primary) . ' (') === 0 || mb_strpos($k, mb_strtolower($primary) . '（') === 0) continue;
        $seen[$k] = 1; $out[] = $c;
        if (count($out) >= $max) break;
    }
    return $out;
}

/** The first alias that can sit in a title's parentheses without nesting them. */
function seo_title_alias(array $aliases): string
{
    foreach ($aliases as $a) if (!preg_match('/[(（]/u', (string) $a)) return (string) $a;
    return '';
}

/** Word Map cells that hold a word, not "—" (r29: titles counted the concept list). */
function seo_wordmap_filled(array $l): int
{
    $n = 0;
    foreach (($l['words'] ?? []) as $w) {
        $f = trim((string) (is_array($w) ? ($w[0] ?? '') : $w));
        if ($f !== '' && !preg_match('/^[\s\x{2014}\x{2013}\-?]*$/u', $f)) $n++;
    }
    return $n;
}

/** A row too empty to be a search result of its own (ncs: 0 cells). noindex, and out of the sitemap. */
const SEO_WORDMAP_MIN_CELLS = 10;
function seo_wordmap_thin(array $l): bool
{
    return seo_wordmap_filled($l) < SEO_WORDMAP_MIN_CELLS;
}

/**
 * What a Han Map row's cells are (r29). Most rows are readings of the
 * characters; reconstructed proto-languages and the languages that never wrote
 * Chinese characters (Manchu, Sibe, Jurchen, Khitan, Tangut) give native words
 * for the meaning, and Thai gives early loanwords. 'reading' | 'words' | 'loans'.
 */
function seo_hanmap_kind(string $code, array $l): string
{
    if ($code === 'th') return 'loans';
    if (strpos((string) ($l['family'] ?? ''), '(proto)') !== false) return 'words';
    if (in_array($code, ['mnc', 'sjo', 'juc', 'zkt', 'txg'], true)) return 'words';
    return 'reading';
}

/** "How do you say "hello" in X? 侬好 [noŋ hɔ]." for the start of a snippet (r28). */
function seo_lang_question(string $ui, array $data, string $code, string $name): string
{
    $w = (($data['langs'] ?? [])[$code]['words'] ?? [])['hello'] ?? null;
    if (!$w) return '';
    $form = trim((string) ($w[0] ?? '')); $ipa = trim((string) ($w[1] ?? ''));
    if ($form === '' || preg_match('/^[\s\x{2014}\x{2013}\-?]*$/u', $form)) return '';
    $label = '';
    foreach ($data['words'] ?? [] as $wd) if (($wd['id'] ?? '') === 'hello') { $label = seo_pick($wd['label'] ?? [], $ui); break; }
    if ($label === '' || mb_strtolower($label) === mb_strtolower($form)) return '';   // the reader's own language: no question
    $f = $form . ($ipa !== '' && $ipa !== $form && !preg_match('/^[\s\x{2014}\-?]*$/u', $ipa) ? ' [' . $ipa . ']' : '');
    return seo_t($ui, 'wm_q', ['word' => $label, 'name' => $name, 'form' => $f]);
}

function seo_lang_meta_lead(array $pairs, string $rest, string $ui): string
{
    if (!$pairs) {
        return $rest;
    }
    $cjk = in_array($ui, ['ja', 'zh', 'yue'], true);
    $eq = $cjk ? '＝' : ' = ';
    $sep = $cjk ? '、' : ($ui === 'ar' ? '، ' : ', ');
    $lead = implode($sep, array_map(static fn($p) => $p[0] . $eq . $p[1], $pairs));
    return seo_clip($lead . ($cjk ? '。' : '. ') . $rest, 160);
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
    <a href="/<?= e($appPage) ?>#cmp=<?= e(rawurlencode($code . ',' . implode(',', $majors))) ?>&amp;ui=<?= e($ui) ?>"><?= e(seo_t($ui, 'cmp_major')) ?> (<?= e($name) ?> · <?= e(implode(' · ', array_map(fn($c) => seo_lang_name($langs, $c, $ui), $majors))) ?>)</a>
    <?php endif; ?>
    <?php if ($siblings):
        $sibCmp = array_slice($siblings, 0, 3);
    ?>
    <a href="/<?= e($appPage) ?>#cmp=<?= e(rawurlencode($code . ',' . implode(',', $sibCmp))) ?>&amp;ui=<?= e($ui) ?>"><?= seo_family_line($ui, 'cmp_related', seo_meta_value($ui, $family)) ?></a>
    <?php endif; ?>
    <span class="note"><?= e(seo_t($ui, 'cmp_note')) ?></span>
  </div>

  <?php if ($siblings):
      $sibList = array_slice($siblings, 0, 12);
  ?>
  <?php /* Same bug as the three cmp_ captions: $family is the raw data value,
           so this h2 printed the English family name into a translated page —
           and it sat eight lines below a link that translated it correctly. */ ?>
  <h2><?= e(seo_t($ui, 'same_family')) ?>: <bdi><?= e(seo_meta_value($ui, $family)) ?></bdi></h2>
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
            // The name is in the UI language (seo_lang_name), not the row's.
            return '<th' . $cls . ' scope="col">' . e($nm) . '</th>';
        }
        return '<th scope="col"><a href="' . e(seo_path($ui, $mapName, $c)) . '">' . e($nm) . '</a></th>';
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
  <?php if ($wFamily !== ''): ?><p class="ex-note"><?= seo_family_line($ui, 'cmp_caption', seo_meta_value($ui, $wFamily), $wFamily) ?></p><?php endif; ?>
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
          <span class="cmp-sf" lang="<?= e(seo_lang_attr($c)) ?>"><?= e($surface !== '' ? $surface : '—') ?></span>
          <?php if ($ipa !== ''): ?><span class="cmp-ipa"><bdi dir="ltr">/<?= e($ipa) ?>/</bdi></span><?php endif; ?>
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
        <?php if ($anchor): ?><span><?= e($woName($c)) ?></span>
        <?php else: ?><a href="<?= e($woLink($c)) ?>"><?= e($woName($c)) ?></a><?php endif; ?>
      </div>
      <div class="cmp-wo-segs">
        <?php foreach (($segs ?? []) as $seg):
            $text = $seg[1] ?? ''; $color = $seg[2] ?? '';
            if ($text === '') continue; ?>
        <span class="wo-seg" lang="<?= e(seo_lang_attr($c)) ?>" data-seg="<?= e($seg[0] ?? '') ?>"<?= $color !== '' ? ' data-c="' . e($color) . '" style="color:' . e(seo_text_color($color)) . ';border-bottom-color:' . e($color) . '"' : '' ?>><?= e($text) ?></span>
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
                foreach ($segs as $seg) { $t = $seg[1] ?? ''; if ($t === '') continue; $rs[] = [$t, $seg[2] ?? '', $seg[0] ?? '', seo_text_color((string) ($seg[2] ?? ''))]; }
                $byCode[$c] = ['n' => $woName($c), 'g' => seo_lang_attr($c), 'l' => $c === $code ? '' : $woLink($c), 's' => $rs];
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
      <?php
        // Label each sentence in the page's language (its own row of the same
        // sentence), then English; the stored titles are Japanese or English
        // source titles and showed in every UI (r25).
        $woText = function (string $c, $id) use ($allWo): string {
            static $byId = [];
            if (!isset($byId[$c])) { $byId[$c] = []; foreach (($allWo[$c] ?? []) as $r) if (isset($r['id'])) $byId[$c][$r['id']] = $r['segs'] ?? []; }
            $segs = $byId[$c][$id] ?? null; if (!$segs) return '';
            $parts = array_values(array_filter(array_map(fn($g) => preg_replace('/[\x{200B}-\x{200D}\x{2060}]/u', '', explode('|', (string) ($g[1] ?? ''))[0]), $segs), 'strlen'));   // drop the |transliteration and zero-width marks
            $sp = preg_match('/^(ja|zh|yue|th|lo|km|my)(_|$)/', $c) ? '' : ' ';
            return trim(implode($sp, $parts));
        };
        $uiRow = ['zh_hant' => 'zh_tw'][$ui] ?? $ui;
        $sentIds = array_keys($sentIndex);
      ?>
      <?php foreach ($sentList as $si => $s): ?>
      <?php $sid = $sentIds[$si] ?? null;
            $tl = $sid !== null ? $woText($uiRow, $sid) : ''; $tlang = '';
            if ($tl === '' && $sid !== null) { $tl = $woText('en', $sid); $tlang = $tl !== '' && $ui !== 'en' ? 'en' : ''; }
            if ($tl === '') { $tl = (string) ($s['title'] ?? ''); $tlang = preg_match('/[\x{3040}-\x{30FF}\x{4E00}-\x{9FFF}]/u', $tl) ? 'ja' : (preg_match('/^[\x{0020}-\x{007E}]+$/u', $tl) ? 'en' : ''); }
            if (mb_strlen($tl) > 60) $tl = mb_substr($tl, 0, 58) . '…'; ?>
      <option value="<?= $si ?>"<?= ($tlang !== '' && $tlang !== $ui) ? ' lang="' . $tlang . '"' : '' ?>><?= e($tl !== '' ? $tl : ('#' . $si)) ?></option>
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
        $rd = function (?array $readings, string $c) use ($ui): string {
            if (!$readings) return '<span class="cmp-sf">—</span>';
            $readings = array_values(array_filter($readings, fn($r) =>
                ($r['surface'] ?? '') !== '' || ($r['ipa'] ?? '') !== ''));
            if (!$readings) return '<span class="cmp-sf">—</span>';
            $multi = count($readings) > 1;
            $out = '';
            foreach ($readings as $r) {
                $surface = $r['surface'] ?? ''; $ipa = $r['ipa'] ?? ''; $label = $r['label'] ?? '';
                $out .= '<span class="cmp-rd">';
                if ($multi && $label !== '') $out .= '<span class="cmp-rl">' . seo_reading_label($ui, $label) . '</span>';
                if ($surface !== '') $out .= '<span class="cmp-sf" style="display:inline" lang="' . e(seo_lang_attr($c)) . '">' . e($surface) . '</span> ';
                if ($ipa !== '') $out .= '<span class="cmp-ipa" style="display:inline"><bdi dir="ltr">/' . e($ipa) . '/</bdi></span>';
                $out .= '</span>';
            }
            return $out;
        };
    ?>
<section class="seo-ex" data-ex="han" data-uid="<?= e($uid) ?>" data-pages="<?= $np ?>">
  <h2><?= e(seo_t($ui, 'ex_han')) ?></h2>
  <?php if ($hFamily !== ''): ?><p class="ex-note"><?= seo_family_line($ui, 'cmp_caption', seo_meta_value($ui, $hFamily), $hFamily) ?></p><?php endif; ?>
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
      // Collapse first: scrollWidth includes the SVG's previous size, so it
      // could only ever grow (a blank scroll area after a resize or a shorter
      // sentence).
      svg.setAttribute('width', 0); svg.setAttribute('height', 0); svg.style.width = svg.style.height = '0px';
      var W = el.scrollWidth, H = el.scrollHeight;
      svg.setAttribute('width', W); svg.setAttribute('height', H);
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.style.width = W + 'px'; svg.style.height = H + 'px';
      if (!vis) return;
      // Coordinates relative to the SVG itself (it spans the scroll extent and
      // scrolls with the content). In RTL it is anchored at the right, so the
      // block's own left edge plus scrollLeft was off by the overflow (rally r7).
      var base = svg.getBoundingClientRect();
      var sx = 0, sy = 0;
      var rows = [];
      vis.querySelectorAll('.cmp-wo-row').forEach(function (row) {
        var m = {};
        row.querySelectorAll('.wo-seg[data-seg]').forEach(function (s) {
          var role = s.getAttribute('data-seg'); if (!role) return;
          var r = s.getBoundingClientRect();
          (m[role] = m[role] || []).push({
            x: r.left + r.width / 2 - base.left + sx,
            bottom: r.bottom - base.top + sy, top: r.top - base.top + sy,
            color: s.getAttribute('data-c') || getComputedStyle(s).color || '#999'   // the role colour, not the darkened text
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
    // Connectors measure every segment (forced layout over the whole page), so
    // they are drawn only once the section is near the viewport; until then a
    // draw request just marks it dirty (Lighthouse forced-reflow, 2026-10-16).
    var inView = !('IntersectionObserver' in window), dirty = false;
    function drawAll() {
      if (!inView) { dirty = true; return; }
      requestAnimationFrame(function () { blocks.forEach(drawWoLines); });
    }
    if (!inView) {
      new IntersectionObserver(function (es) {
        inView = es.some(function (e) { return e.isIntersecting; });
        if (inView && dirty) { dirty = false; drawAll(); }
      }, { rootMargin: '300px' }).observe(sec);
    }
    function buildLazy(blk, i) {
      var d = data[i]; if (!d || !blk.lazy) return false;
      var h = '';
      blk.cols.forEach(function (code) {
        var row = (d.r || {})[code]; if (!row) return;
        var lg = esc(row.g || '');
        h += '<div class="cmp-wo-row' + (row.l ? '' : ' cmp-anchor') + '"><div class="cmp-wo-name">'
          + (row.l ? '<a href="' + esc(row.l) + '">' + esc(row.n) + '</a>'
                   : '<span>' + esc(row.n) + '</span>')
          + '</div><div class="cmp-wo-segs">';
        (row.s || []).forEach(function (sg) {
          h += '<span class="wo-seg" lang="' + lg + '"' + (sg[2] ? ' data-seg="' + esc(sg[2]) + '"' : '') + (sg[1] ? ' data-c="' + esc(sg[1]) + '" style="color:' + esc(sg[3] || sg[1]) + ';border-bottom-color:' + esc(sg[1]) + '"' : '') + '>' + esc(sg[0]) + '</span>';
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
    // Fonts that arrive after .ready (slow network) move the segments too.
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', drawAll);
  });
})();
</script>
<?php
}

function seo_foot(string $ui = 'en'): void
{
    // Owner report 2026-08-31: these pages ended on one sentence of prose, with
    // no credit and no obvious way back into the site. A reader who lands here
    // from a search result has read the static summary and then has nowhere to
    // go — the only links were the see-also line far above. So the footer now
    // carries the way in (named, not a bare "home" link) and the byline.
    $home = seo_path($ui, '');
    ?>
<script>
// Print: a closed <details> keeps its content in a slot CSS cannot open, so the
// region lists printed as bare headings. Open them for printing, then restore.
(function () {
  var opened = [];
  addEventListener('beforeprint', function () {
    opened = [].filter.call(document.querySelectorAll('details:not([open])'), function (d) { d.open = true; return true; });
    // Their lazy flags would never be fetched before the print snapshot.
    [].forEach.call(document.querySelectorAll('details img[loading="lazy"]'), function (i) { i.loading = 'eager'; });
  });
  addEventListener('afterprint', function () { opened.forEach(function (d) { d.open = false; }); opened = []; });
})();
</script>
<div class="seo-foot">
  <p class="seo-foot-cta"><strong><?= e(seo_t($ui, 'open_map')) ?>:</strong>
    <span lang="en"><a href="/wordmap.html">Word Map</a> &middot;
    <a href="/hanmap.html">Han Map</a> &middot;
    <a href="/namemap.html">Name Map</a> &middot;
    <a href="/timemap.html">Time Map</a> &middot;
    <a href="/index.html">Word Order</a> &middot;
    <a href="/tree.html">Tree</a></span></p>
  <p><?= e(seo_t($ui, 'foot')) ?></p>
  <p class="seo-foot-credit"><?= e(seo_t($ui, 'made_by')) ?>
    <a href="https://heuron.com" rel="noopener">Heuron Inc.</a> &middot;
    <a href="https://github.com/jounlai/langmap" rel="noopener">GitHub</a> &middot;
    <a href="mailto:cho@heuron.com">cho@heuron.com</a> &middot;
    <a href="<?= e($home) ?>"><?= e(seo_t($ui, 'home')) ?></a></p>
</div>
</main>
</body>
</html>
<?php
}
