<?php
/**
 * router.php — routing shim for PHP's built-in dev server.
 *
 *     php -S localhost:8080 router.php
 *
 * It (1) serves existing static files as-is, and (2) routes the SEO virtual
 * URLs (/{ui}/..., legacy /wordmap/*, /hanmap/*, /, /sitemap-seo.xml) through
 * the front controller index.php, which also performs the 301 legacy redirects.
 */

declare(strict_types=1);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = '/' . trim((string) $uri, '/');

// Serve a real static file if one exists (correct MIME types, etc.),
// but never let "/" be served as a directory listing.
$file = __DIR__ . $path;
if ($path !== '/' && is_file($file)) {
    return false;
}
// A static folder with its own index.html (/sinosphere/) — Apache serves it
// via DirectoryIndex; the built-in server needs telling.
if ($path !== '/' && is_file($file . '/index.html')) {
    if (substr((string) $uri, -1) !== '/') {
        header('Location: ' . $path . '/', true, 301);
        return true;
    }
    readfile($file . '/index.html');
    return true;
}

// Everything else -> front controller (handles routing + 301 + 404).
$_GET['__seo_route'] = $path;
require __DIR__ . '/index.php';
return true;
