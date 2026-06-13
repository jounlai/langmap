<?php
/**
 * index.php — front controller for the SSR SEO "big-text" pages.
 *
 * Canonical URLs (UI prefix always required):
 *     /{ui}/                    -> per-UI hub
 *     /{ui}/wordmap/            -> Word Map index
 *     /{ui}/wordmap/{langID}    -> Word Map language page
 *     /{ui}/hanmap/             -> Han Map index
 *     /{ui}/hanmap/{langID}     -> Han Map language page
 *  where {ui} is one of SEO_UI_LANGS.
 *
 * Legacy / non-prefixed paths 301-redirect to the /en/ equivalent:
 *     /                  -> /en/
 *     /wordmap/...       -> /en/wordmap/...
 *     /hanmap/...        -> /en/hanmap/...
 *     anything else      -> /en + original path
 *
 * Run locally with PHP's built-in server:
 *     php -S localhost:8080 router.php
 */

declare(strict_types=1);

require_once __DIR__ . '/seo/lib.php';

// Determine the requested path. Prefer an explicit route from router.php,
// otherwise parse REQUEST_URI.
$path = $_GET['__seo_route'] ?? parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$path = '/' . trim((string) $path, '/');

/** 301 to the /en equivalent of a (UI-less) path, preserving query string. */
function seo_redirect_to_en(string $path): void
{
    $target = '/en' . ($path === '/' ? '/' : $path);
    $qs = $_SERVER['QUERY_STRING'] ?? '';
    // Drop the internal routing param if present.
    parse_str($qs, $q);
    unset($q['__seo_route']);
    $clean = http_build_query($q);
    if ($clean !== '') {
        $target .= '?' . $clean;
    }
    header('Location: ' . $target, true, 301);
    http_response_code(301);
    exit;
}

// Sitemap for the SEO pages (generated; UI-agnostic, no prefix).
if ($path === '/sitemap-seo.xml') {
    require __DIR__ . '/seo/sitemap.php';
    return;
}

// Split off the first path segment as the (candidate) UI lang.
$segs = $path === '/' ? [] : explode('/', ltrim($path, '/'));
$first = $segs[0] ?? '';
$ui = seo_ui_norm($first);

if ($ui === null) {
    // No valid UI prefix -> treat as legacy and 301 to /en + original path.
    seo_redirect_to_en($path);
    return;
}

// We have a UI prefix. Inspect the rest: /{ui}, /{ui}/{map}, /{ui}/{map}/{id}.
$rest = array_slice($segs, 1);
$seo_ui = $ui;

// /{ui} or /{ui}/  -> per-UI hub.
if (count($rest) === 0) {
    header('Content-Type: text/html; charset=utf-8');
    seo_render_hub($seo_ui);
    return;
}

$map = $rest[0];
if ($map === 'wordmap' || $map === 'hanmap') {
    $seo_id = isset($rest[1]) ? rawurldecode($rest[1]) : '';
    // Reject deeper paths (/{ui}/wordmap/x/y).
    if (count($rest) > 2) {
        seo_404('Page not found', $seo_ui);
        return;
    }
    // Basic id sanity: codes are [A-Za-z0-9_:-]. Reject path tricks.
    if ($seo_id !== '' && !preg_match('#^[A-Za-z0-9_:\-]+$#', $seo_id)) {
        seo_404('Invalid language id.', $seo_ui);
        return;
    }
    header('Content-Type: text/html; charset=utf-8');
    require __DIR__ . '/seo/' . $map . '.php';
    return;
}

seo_404('No SEO page for: ' . $path, $seo_ui);


/** Render the per-UI hub page (/{ui}/). */
function seo_render_hub(string $ui): void
{
    seo_head([
        'title' => seo_t($ui, 'hub_title'),
        'description' => seo_t($ui, 'hub_desc'),
        'canonical' => SEO_SITE . seo_path($ui, ''),
        'ui' => $ui,
        'altpath' => '/',
    ]);
    echo '<header class="seo-hero"><h1>' . e(seo_t($ui, 'hub_h1')) . '</h1>'
        . '<p class="sub">' . e(seo_t($ui, 'hub_sub')) . '</p></header>';
    echo '<section class="seo-section"><h2>' . e(seo_t($ui, 'maps')) . '</h2><ul class="seo-index-list">'
        . '<li><a href="' . e(seo_path($ui, 'wordmap')) . '">' . e(seo_t($ui, 'wm_link')) . '</a></li>'
        . '<li><a href="' . e(seo_path($ui, 'hanmap')) . '">' . e(seo_t($ui, 'hm_link')) . '</a></li>'
        . '</ul></section>';
    seo_foot($ui);
}
