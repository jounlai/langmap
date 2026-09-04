<?php
/**
 * seo/sitemap.php — XML sitemap for the SSR SEO pages.
 *
 * Served at /sitemap-seo.xml as a sitemap INDEX, with the URLs themselves split
 * across /sitemap-seo-1.xml … /sitemap-seo-N.xml.
 *
 * Why the split. Every <url> carries xhtml:link alternates for all 19 UI
 * languages plus x-default, which is ~2.1 KB against a ~60-byte <loc>. As one
 * file this reached 49,761,107 bytes of the 52,428,800-byte limit — 94.9%, and
 * about 65 languages from the ceiling — while using only 23,161 of the 50,000
 * URLs. A sitemap over the byte limit is not truncated: search engines reject
 * the whole file, so every SSR page would lose its declared entry at once,
 * silently, the first time somebody added a batch of languages.
 *
 * Each part is capped at SEO_SITEMAP_CHUNK source pages (× 19 UI languages),
 * which keeps a part around a fifth of the limit and leaves the atlas free to
 * grow: more languages means more parts, not a bigger file.
 *
 * index.php routes both shapes here; $seo_sitemap_part is the 1-based part
 * number, or null for the index.
 */

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

header('Content-Type: application/xml; charset=utf-8');

// Source pages per part. 250 × 19 UI languages × ~2.1 KB ≈ 10 MB, a fifth of
// the byte limit and a tenth of the URL limit.
const SEO_SITEMAP_CHUNK = 250;

$wm = seo_data('wordmap');
$hm = seo_data('hanmap');
$tr = seo_data('trivia');
$today = date('Y-m-d');

/**
 * The full ordered list of pages, as [altPath, priority]. altPath is the part
 * after /{ui}, with a leading slash — "/wordmap/cjy", "/trivia/", "/".
 */
$pages = [
    ['/', '0.7'],
    ['/wordmap/', '0.8'],
    ['/hanmap/', '0.8'],
    ['/trivia/', '0.8'],
];
foreach (($wm['langs'] ?? []) as $code => $l) {
    if (!empty($l['excluded'])) {
        continue; // noindex'd; keep out of the sitemap
    }
    $pages[] = ['/wordmap/' . rawurlencode($code), '0.6'];
}
foreach (($hm['langs'] ?? []) as $code => $l) {
    $pages[] = ['/hanmap/' . rawurlencode($code), '0.6'];
}
// The long-form articles. Higher priority than a single language page: this is
// the only original prose on the site, and it is what a search result can quote.
foreach (($tr['articles'] ?? []) as $a) {
    $pages[] = ['/trivia/' . rawurlencode($a['id']), '0.7'];
}

$partCount = (int) max(1, ceil(count($pages) / SEO_SITEMAP_CHUNK));
$part = isset($seo_sitemap_part) ? (int) $seo_sitemap_part : 0;

// Out of range before anything is echoed, or http_response_code() lands after
// the XML declaration and PHP warns instead of setting the status.
if ($part > $partCount) {
    http_response_code(404);
    echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>' . "\n";
    return;
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";

if ($part < 1) {
    // The index. Kept deliberately dumb: one line per part, no alternates.
    echo '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    for ($i = 1; $i <= $partCount; $i++) {
        echo "  <sitemap>\n";
        echo "    <loc>" . e(SEO_SITE . '/sitemap-seo-' . $i . '.xml') . "</loc>\n";
        echo "    <lastmod>" . e($today) . "</lastmod>\n";
        echo "  </sitemap>\n";
    }
    echo '</sitemapindex>' . "\n";
    return;
}

/**
 * Emit one <url> block per UI lang for a given altPath. Each carries the full
 * set of xhtml:link alternates (19 langs + x-default) — the alternates are the
 * point of these pages, so they stay even though they are what costs the bytes.
 */
$emit = function (string $altPath, string $priority) use ($today): void {
    $alts = '';
    foreach (SEO_UI_LANGS as $ui) {
        $href = SEO_SITE . '/' . $ui . $altPath;
        $alts .= '    <xhtml:link rel="alternate" hreflang="' . e($ui)
            . '" href="' . e($href) . "\"/>\n";
    }
    $alts .= '    <xhtml:link rel="alternate" hreflang="x-default" href="'
        . e(SEO_SITE . '/en' . $altPath) . "\"/>\n";

    foreach (SEO_UI_LANGS as $ui) {
        $loc = SEO_SITE . '/' . $ui . $altPath;
        echo "  <url>\n";
        echo "    <loc>" . e($loc) . "</loc>\n";
        echo $alts;
        echo "    <lastmod>" . e($today) . "</lastmod>\n";
        echo "    <changefreq>monthly</changefreq>\n";
        echo "    <priority>" . e($priority) . "</priority>\n";
        echo "  </url>\n";
    }
};

echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
echo '        xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";
foreach (array_slice($pages, ($part - 1) * SEO_SITEMAP_CHUNK, SEO_SITEMAP_CHUNK) as [$altPath, $priority]) {
    $emit($altPath, $priority);
}
echo '</urlset>' . "\n";
