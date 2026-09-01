<?php
/**
 * seo/trivia.php — renders the trivia ("読み物") hub or a single article.
 *
 * Called by the router with $seo_ui (UI lang) and $seo_id set
 * ('' => hub, otherwise an article slug).
 *
 * These are the only long-form prose pages on the site. Everything is emitted
 * server-side: the full article body, its sources, and — importantly — the
 * in-article map buttons rewritten into real <a> links, so an article about
 * Pirahã actually links to /{ui}/wordmap/myp instead of carrying a button that
 * only works once JS has booted the map.
 */

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

/** @var string $seo_id */
/** @var string $seo_ui */
$seo_id = $seo_id ?? '';
$seo_ui = seo_ui_norm($seo_ui ?? 'en') ?? 'en';
$data = seo_data('trivia');

if (empty($data['articles'])) {
    seo_404('Trivia data not built. Run: node tools/export_trivia_seo.js', $seo_ui);
    return;
}

/** slug => article, preserving file order (which is curated). */
$byId = [];
foreach ($data['articles'] as $a) {
    $byId[$a['id']] = $a;
}

if ($seo_id === '') {
    seo_render_trivia_hub($data, $byId, $seo_ui);
    return;
}

if (!isset($byId[$seo_id])) {
    seo_404('Unknown article: ' . $seo_id, $seo_ui);
    return;
}

seo_render_trivia_article($data, $byId, $seo_id, $seo_ui);


/** Pick the article text for this UI language, falling back to en then ja. */
function seo_tri_text(array $a, string $ui): array
{
    foreach ([$ui, 'en', 'ja'] as $try) {
        if (!empty($a['i18n'][$try]['body']) || !empty($a['i18n'][$try]['title'])) {
            return $a['i18n'][$try];
        }
    }
    return ['title' => $a['id'], 'summary' => '', 'body' => ''];
}

/**
 * Rewrite the interactive <button data-action="…"> controls into real links.
 *
 * The buttons drive the JS map (focus a language, jump to coordinates, switch
 * the displayed word, select a character). On a static page they would be
 * inert, so each one becomes either a crawlable <a> to the matching SSR page
 * or — where no such page exists, e.g. a single Han character — plain text.
 * The author's label is always preserved.
 */
function seo_tri_links(string $html, string $map, string $ui, array $names = [], string $articleId = '', array $langs = [], array $wordLabels = []): string
{
    $app = $map === 'hanmap' ? '/hanmap.html' : '/wordmap.html';
    // Every language this article points at, collected before the rewrite so a
    // locator map can mark the ones that fall inside its frame. A "pan here"
    // button carries coordinates, not codes, and would otherwise have no way
    // to know that the article is about Taa and Khoekhoe.
    $articleCodes = [];
    foreach (preg_match_all('#<button\b[^>]*>#i', $html, $bm) ? $bm[0] : [] as $tag) {
        if (!preg_match('#data-actions?\s*=\s*["\']?(focus|compare)#i', $tag)) continue;
        if (preg_match_all('#data-codes?\s*=\s*("([^"]*)"|\'([^\']*)\'|([^\s>]+))#i', $tag, $cm, PREG_SET_ORDER)) {
            foreach ($cm as $one) {
                $val = $one[2] !== '' ? $one[2] : ($one[3] !== '' ? $one[3] : ($one[4] ?? ''));
                foreach (preg_split('#[,\s]+#', $val, -1, PREG_SPLIT_NO_EMPTY) ?: [] as $c) {
                    if (preg_match('#^[A-Za-z0-9_:\-]+$#', $c)) $articleCodes[$c] = true;
                }
            }
        }
    }
    $articleCodes = array_keys($articleCodes);

    return preg_replace_callback(
        '#<button\b([^>]*)>(.*?)</button>#si',
        static function (array $m) use ($map, $ui, $names, $app, $articleId, $langs, $wordLabels, $articleCodes): string {
            $attrs = $m[1];
            $label = trim($m[2]);
            // The attribute value may be double-quoted, single-quoted or bare.
            // This only matched double quotes until 2026-08-31, and 241 of the
            // 1,577 button tags in the trivia corpus are written with single
            // quotes — every one of those fell through to the "no target" branch
            // and rendered as an inert label. That is what the owner saw on
            // /ko/trivia/tea-tea-cha-cha, where both controls are single-quoted.
            $get = static function (string $name) use ($attrs): string {
                $q = '#\b' . preg_quote($name, '#') . '\s*=\s*("([^"]*)"|\'([^\']*)\'|([^\s>]+))#i';
                if (preg_match($q, $attrs, $mm)) {
                    return trim($mm[2] !== '' ? $mm[2] : ($mm[3] !== '' ? $mm[3] : ($mm[4] ?? '')));
                }
                return '';
            };
            $action = $get('data-action');
            $codes = $get('data-codes');
            $code = $get('data-code');
            $targets = [];
            foreach (preg_split('#[,\s]+#', $codes . ' ' . $code, -1, PREG_SPLIT_NO_EMPTY) ?: [] as $c) {
                if (preg_match('#^[A-Za-z0-9_:\-]+$#', $c)) $targets[$c] = true;
            }
            $targets = array_keys($targets);

            // "Pan to these coordinates" has no SSR page to point at, but it
            // does have an obvious destination: the interactive map, at that
            // spot. Both maps read #p=lat,lng,z on load.
            if ($action === 'panto') {
                $lat = $get('data-lat'); $lng = $get('data-lng'); $zoom = $get('data-zoom');
                if (is_numeric($lat) && is_numeric($lng)) {
                    $z = is_numeric($zoom) ? $zoom : '5';
                    // Literal commas, matching the hash the app writes itself
                    // (see the URLSearchParams %2C fix-up in hanmap.html).
                    $href = $app . '#p=' . $lat . ',' . $lng . ',' . $z;
                    if ($langs) {
                        $fig = seo_tri_minimap($lat, $lng, $z, $label, $langs, $articleCodes, $ui, $href);
                        if ($fig !== '') return $fig;
                    }
                    return '<span class="trivia-note"><a href="' . e($href) . '">' . $label . '</a></span>';
                }
            }
            if ($action === 'setchar' || !$targets) {
                // No SSR page for a single character or a concept — but the
                // control still means something, so send the reader to the
                // article inside the interactive map rather than leaving a
                // button-shaped box that does nothing when clicked.
                if ($articleId !== '') {
                    $href = $app . '#trivia=' . rawurlencode($articleId);
                    return '<span class="trivia-note"><a href="' . e($href) . '">' . $label . '</a></span>';
                }
                return '<span class="trivia-note">' . $label . '</span>';
            }

            // Two or more languages named together is a comparison; show it.
            if (count($targets) > 1 && $langs) {
                $fig = seo_tri_compare($targets, $langs, $wordLabels, $ui, $map, $label, $get('data-word'));
                if ($fig !== '') return $fig;
            }

            $links = [];
            foreach ($targets as $c) {
                // Distinct variable: $label is the author's button text and must
                // survive the loop.
                $linkText = $names[$c][$ui] ?? ($names[$c]['en'] ?? $c);
                $links[] = '<a href="' . e(seo_path($ui, $map, $c)) . '">' . e($linkText) . '</a>';
            }
            return '<span class="trivia-note">' . $label . ' — '
                . implode(' · ', $links) . '</span>';
        },
        $html
    ) ?? $html;
}


/* ── Rich in-article blocks ───────────────────────────────────────────────
   The map controls are instructions: "compare these four languages", "zoom
   to the Kalahari". Turning them into links was enough to make them work,
   but the reader still has to leave the article to see what they are being
   told about. On the server-rendered pages we can just show it — a locator
   map for a place, a comparison table for a set of languages — and still
   ship plain HTML with no script and no external request. ------------------ */

/** Web Mercator, matching Leaflet and tools/build_seo_minimaps.js. */
function seo_merc(float $lat, float $lng, float $z): array
{
    $scale = 256 * pow(2, $z);
    $s = sin(max(-85.05112878, min(85.05112878, $lat)) * M_PI / 180);
    return [($lng + 180) / 360 * $scale, (0.5 - log((1 + $s) / (1 - $s)) / (4 * M_PI)) * $scale];
}

/**
 * Locator map for a "pan to here" control.
 *
 * The coastlines are a pre-rendered SVG (57 of them cover the whole corpus,
 * and they are the same in every language). The pins are added here, because
 * WHICH languages are worth marking depends on the article and their names
 * depend on the UI — so a static file could not carry them.
 */
function seo_tri_minimap(string $lat, string $lng, string $z, string $label, array $langs, array $codes, string $ui, string $href): string
{
    $key = str_replace(['.', '-'], ['p', 'm'], (float)$lat . '_' . (float)$lng . '_' . (float)$z);
    $file = __DIR__ . '/minimaps/' . $key . '.svg';
    if (!is_file($file)) return '';
    $svg = file_get_contents($file);
    if ($svg === false) return '';

    // Project the article's own languages into the frame and keep the ones
    // that actually land inside it.
    [$cx, $cy] = seo_merc((float)$lat, (float)$lng, (float)$z);
    $W = 720; $H = 380;
    $pins = '';
    $placed = [];
    foreach ($codes as $c) {
        $l = $langs[$c] ?? null;
        if (!$l || !isset($l['lat'], $l['lng'])) continue;
        [$px, $py] = seo_merc((float)$l['lat'], (float)$l['lng'], (float)$z);
        $x = $px - $cx + $W / 2;
        $y = $py - $cy + $H / 2;
        if ($x < 8 || $x > $W - 8 || $y < 8 || $y > $H - 8) continue;
        // Don't stack two labels on the same spot.
        foreach ($placed as [$qx, $qy]) if (abs($qx - $x) < 60 && abs($qy - $y) < 16) continue 2;
        $placed[] = [$x, $y];
        $name = seo_lang_name($langs, $c, $ui);
        // Flip the label to the left half when the pin is near the right edge.
        $anchor = $x > $W - 170 ? 'end' : 'start';
        $tx = $anchor === 'end' ? $x - 10 : $x + 10;
        $pins .= '<g class="mm-lang"><circle cx="' . round($x, 1) . '" cy="' . round($y, 1) . '" r="4"/>'
            . '<text x="' . round($tx, 1) . '" y="' . round($y + 4, 1) . '" text-anchor="' . $anchor . '">'
            . e($name) . '</text></g>';
    }
    if ($pins !== '') $svg = str_replace('</svg>', $pins . '</svg>', $svg);

    return '<figure class="trivia-embed trivia-minimap">'
        . $svg
        . '<figcaption>' . $label . ' <a class="trivia-embed-more" href="' . e($href) . '">'
        . e(seo_t($ui, 'open_map')) . '</a></figcaption>'
        . '</figure>';
}

/**
 * Comparison table for a "compare these languages" control.
 *
 * Family, speaker count and the word forms are all already in the SEO data —
 * the same fields the per-language pages show — so the table is the article
 * saying "compare X and Y" and then actually doing it.
 */
function seo_tri_compare(array $targets, array $langs, array $wordLabels, string $ui, string $map, string $label, string $word = ''): string
{
    $rows = [];
    foreach ($targets as $c) {
        if (isset($langs[$c])) $rows[$c] = $langs[$c];
    }
    if (count($rows) < 2) return '';

    // Concepts every compared language actually has, most basic first, so the
    // table never shows a column of dashes. The control may name one itself.
    $prefer = ['water', 'one', 'two', 'three', 'sun', 'moon', 'fire', 'eye', 'hand',
        'name', 'dog', 'fish', 'tree', 'mother', 'father', 'house', 'i', 'you', 'we'];
    if ($word !== '') array_unshift($prefer, $word);
    $cols = [];
    foreach ($prefer as $w) {
        if (in_array($w, $cols, true)) continue;
        foreach ($rows as $l) if (empty($l['words'][$w][0])) continue 2;
        $cols[] = $w;
        if (count($cols) === 3) break;
    }

    $h = '<figure class="trivia-embed trivia-compare"><figcaption>' . $label . '</figcaption>'
        . '<div class="trivia-table-scroll"><table><thead><tr>'
        . '<th>' . e(seo_t($ui, 'picker')) . '</th>'
        . '<th>' . e(seo_t($ui, 'family')) . '</th>'
        . '<th>' . e(seo_t($ui, 'speakers')) . '</th>';
    foreach ($cols as $w) $h .= '<th>' . e($wordLabels[$w][$ui] ?? $wordLabels[$w]['en'] ?? $w) . '</th>';
    $h .= '</tr></thead><tbody>';
    foreach ($rows as $c => $l) {
        // WordMap nests these under meta, HanMap keeps them top-level.
        $family   = $l['meta']['family']   ?? $l['family']   ?? '';
        $speakers = $l['meta']['speakers'] ?? $l['speakers'] ?? '';
        $h .= '<tr><th scope="row"><a href="' . e(seo_path($ui, $map, $c)) . '">'
            . e(seo_lang_name($langs, $c, $ui)) . '</a></th>'
            . '<td class="tc-meta">' . e($family !== '' ? seo_meta_value($ui, $family) : '—') . '</td>'
            // Speaker counts start with "~" and often mix Latin digits into an
            // RTL cell; <bdi> keeps "~2.5K" from rendering as "2.5K~" in Arabic
            // and Hebrew.
            . '<td class="tc-meta"><bdi>' . e($speakers !== '' ? seo_meta_value($ui, $speakers) : '—') . '</bdi></td>';
        foreach ($cols as $w) {
            $cell = $l['words'][$w] ?? null;
            $h .= '<td>' . ($cell
                ? '<span class="tc-form">' . e($cell[0]) . '</span>'
                    . (!empty($cell[1]) ? '<span class="tc-ipa">/' . e($cell[1]) . '/</span>' : '')
                : '—') . '</td>';
        }
        $h .= '</tr>';
    }
    return $h . '</tbody></table></div></figure>';
}

/** Articles sharing the most tags with $id, for a "read next" block. */
function seo_tri_related(array $byId, string $id, int $max = 6): array
{
    $self = $byId[$id];
    $mine = array_flip($self['tags'] ?? []);
    $scored = [];
    foreach ($byId as $other) {
        if ($other['id'] === $id) continue;
        $n = 0;
        foreach ($other['tags'] ?? [] as $t) if (isset($mine[$t])) $n++;
        if ($n > 0) $scored[] = ['n' => $n, 'a' => $other];
    }
    usort($scored, static fn($x, $y) => $y['n'] <=> $x['n']);
    return array_slice(array_column($scored, 'a'), 0, $max);
}

function seo_render_trivia_article(array $data, array $byId, string $id, string $ui): void
{
    $a = $byId[$id];
    $t = seo_tri_text($a, $ui);
    $map = ($a['map'] ?? 'wordmap') === 'hanmap' ? 'hanmap' : 'wordmap';

    // The article's own map data: coordinates and family/speaker facts for the
    // locator maps and comparison tables built into the body. Word labels come
    // from the Word Map either way — a Han Map article that compares languages
    // still wants "Water" spelled in the reader's language.
    $mapData    = seo_data($map);
    $mapLangs   = $mapData['langs'] ?? [];
    $wordLabels = [];
    foreach ((seo_data('wordmap')['words'] ?? []) as $w) {
        if (!empty($w['id'])) $wordLabels[$w['id']] = $w['label'] ?? [];
    }

    $title = trim(($a['icon'] ? $a['icon'] . ' ' : '') . $t['title']);
    $canonical = SEO_SITE . seo_path($ui, 'trivia', $id);
    $desc = $t['summary'] !== '' ? $t['summary'] : strip_tags($t['body']);

    seo_head([
        'title' => $t['title'] . ' | ' . seo_t($ui, 'tri_brand'),
        'description' => $desc,
        'canonical' => $canonical,
        'image' => SEO_SITE . ($map === 'hanmap' ? '/ogp-tree.png' : '/ogp-wordmap.png'),
        'ui' => $ui,
        'altpath' => '/trivia/' . rawurlencode($id),
    ]);
    ?>
<nav class="seo-crumbs">
  <a href="<?= e(seo_path($ui, '')) ?>">LangMap</a> &rsaquo;
  <a href="<?= e(seo_path($ui, 'trivia')) ?>"><?= e(seo_t($ui, 'tri_link')) ?></a> &rsaquo;
  <?= e($t['title']) ?>
</nav>
<header class="seo-hero">
  <h1><?= e($title) ?></h1>
  <?php if ($t['summary'] !== ''): ?>
    <p class="sub"><?= e($t['summary']) ?></p>
  <?php endif; ?>
</header>

<?php if (!empty($a['tags'])): ?>
<p class="seo-crumbs"><?= e(seo_t($ui, 'tri_tags')) ?>:
  <?php foreach ($a['tags'] as $tag): ?><span class="code"><?= e($tag) ?></span> <?php endforeach; ?>
</p>
<?php endif; ?>

<article class="seo-section seo-prose">
  <?= seo_tri_links($t['body'], $map, $ui, $data['names'] ?? [], $id, $mapLangs, $wordLabels) ?>
</article>

<?php if (!empty($a['sources'])): ?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'sources')) ?></h2>
  <ul>
    <?php foreach ($a['sources'] as $s): ?>
      <li><?php
        if (is_array($s)) {
            $txt = (string) ($s['text'] ?? '');
            $url = (string) ($s['url'] ?? '');
            if ($url !== '') {
                echo '<a href="' . e($url) . '" rel="nofollow noopener" target="_blank">' . e($txt !== '' ? $txt : $url) . '</a>';
            } else {
                echo e($txt);
            }
        } else {
            echo e((string) $s);
        }
      ?></li>
    <?php endforeach; ?>
  </ul>
</section>
<?php endif; ?>

<div class="seo-applink">
  <a href="<?= ($map === 'hanmap' ? '/hanmap.html' : '/wordmap.html') . '#trivia=' . rawurlencode($id) ?>">
    <?= e(seo_t($ui, $map === 'hanmap' ? 'open_app_hm' : 'open_app_wm')) ?>
  </a>
</div>

<?php $rel = seo_tri_related($byId, $id); if ($rel): ?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'tri_more')) ?></h2>
  <ul class="seo-index-list">
    <?php foreach ($rel as $r): $rt = seo_tri_text($r, $ui); ?>
      <li><a href="<?= e(seo_path($ui, 'trivia', $r['id'])) ?>">
        <?= e(trim(($r['icon'] ? $r['icon'] . ' ' : '') . $rt['title'])) ?></a></li>
    <?php endforeach; ?>
  </ul>
</section>
<?php endif; ?>

<p class="seo-crumbs">
  <?= e(seo_t($ui, 'see_also')) ?>:
  <a href="<?= e(seo_path($ui, 'trivia')) ?>"><?= e(seo_t($ui, 'tri_link')) ?></a> ·
  <a href="<?= e(seo_path($ui, 'wordmap')) ?>"><?= e(seo_t($ui, 'wm_link')) ?></a> ·
  <a href="<?= e(seo_path($ui, 'hanmap')) ?>"><?= e(seo_t($ui, 'hm_link')) ?></a>
</p>
<?php
    seo_lang_ui($ui, '/trivia/' . rawurlencode($id));
    seo_foot($ui);
}

function seo_render_trivia_hub(array $data, array $byId, string $ui): void
{
    $groups = ['wordmap' => [], 'hanmap' => []];
    foreach ($byId as $a) {
        $g = ($a['map'] ?? 'wordmap') === 'hanmap' ? 'hanmap' : 'wordmap';
        $groups[$g][] = $a;
    }
    $n = (string) count($byId);

    seo_head([
        'title' => seo_t($ui, 'tri_hub_title', ['n' => $n]) . ' | LangMap',
        'description' => seo_t($ui, 'tri_hub_desc', ['n' => $n]),
        'canonical' => SEO_SITE . seo_path($ui, 'trivia'),
        'image' => SEO_SITE . '/ogp-wordmap.png',
        'ui' => $ui,
        'altpath' => '/trivia/',
    ]);
    ?>
<nav class="seo-crumbs"><a href="<?= e(seo_path($ui, '')) ?>">LangMap</a> &rsaquo; <?= e(seo_t($ui, 'tri_link')) ?></nav>
<header class="seo-hero">
  <h1><?= e(seo_t($ui, 'tri_link')) ?></h1>
  <p class="sub"><?= e(seo_t($ui, 'tri_hub_sub', ['n' => $n])) ?></p>
</header>
<p class="seo-crumbs"><?= e(seo_t($ui, 'see_also')) ?>:
  <a href="<?= e(seo_path($ui, 'wordmap')) ?>"><?= e(seo_t($ui, 'wm_link')) ?></a> ·
  <a href="<?= e(seo_path($ui, 'hanmap')) ?>"><?= e(seo_t($ui, 'hm_link')) ?></a> ·
  <a href="<?= e(seo_path($ui, '')) ?>"><?= e(seo_t($ui, 'home')) ?></a></p>

<?php foreach (['wordmap' => 'tri_group_wm', 'hanmap' => 'tri_group_hm'] as $g => $key): ?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, $key)) ?> (<?= count($groups[$g]) ?>)</h2>
  <ul class="seo-index-list seo-tri-list">
    <?php foreach ($groups[$g] as $a): $t = seo_tri_text($a, $ui); ?>
      <li>
        <a href="<?= e(seo_path($ui, 'trivia', $a['id'])) ?>">
          <?= e(trim(($a['icon'] ? $a['icon'] . ' ' : '') . $t['title'])) ?></a>
        <?php if ($t['summary'] !== ''): ?>
          <div class="seo-tri-sum"><?= e(seo_clip($t['summary'], 200)) ?></div>
        <?php endif; ?>
      </li>
    <?php endforeach; ?>
  </ul>
</section>
<?php endforeach; ?>
<?php
    seo_lang_ui($ui, '/trivia/');
    seo_foot($ui);
}
