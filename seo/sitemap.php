<?php
/**
 * seo/sitemap.php — XML sitemap for the SSR SEO pages.
 * Served at /sitemap-seo.xml. Every page is emitted under all 19 UI prefixes,
 * each <url> carrying xhtml:link rel="alternate" hreflang entries for all
 * locales + x-default. Excluded/noindex Word Map varieties are omitted.
 */

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

header('Content-Type: application/xml; charset=utf-8');

$wm = seo_data('wordmap');
$hm = seo_data('hanmap');
$tr = seo_data('trivia');
$today = date('Y-m-d');

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
echo '        xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";

/**
 * Emit one <url> block per UI lang for a given "altPath" (the part after /{ui},
 * with a leading slash, e.g. "/wordmap/cjy" or "/wordmap/"). Each carries the
 * full set of xhtml:link alternates (19 langs + x-default).
 */
$emit = function (string $altPath, string $priority) use ($today): void {
    // Precompute the shared alternates block.
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

// Per-UI hubs and map indexes.
$emit('/', '0.7');
$emit('/wordmap/', '0.8');
$emit('/hanmap/', '0.8');
$emit('/trivia/', '0.8');

foreach (($wm['langs'] ?? []) as $code => $l) {
    if (!empty($l['excluded'])) {
        continue; // noindex'd; keep out of the sitemap
    }
    $emit('/wordmap/' . rawurlencode($code), '0.6');
}

foreach (($hm['langs'] ?? []) as $code => $l) {
    $emit('/hanmap/' . rawurlencode($code), '0.6');
}

// The long-form articles. Higher priority than a single language page: this is
// the only original prose on the site, and it is what a search result can quote.
foreach (($tr['articles'] ?? []) as $a) {
    $emit('/trivia/' . rawurlencode($a['id']), '0.7');
}

echo '</urlset>' . "\n";
