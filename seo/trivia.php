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
function seo_tri_links(string $html, string $map, string $ui, array $names = []): string
{
    return preg_replace_callback(
        '#<button\b([^>]*)>(.*?)</button>#si',
        static function (array $m) use ($map, $ui, $names): string {
            $attrs = $m[1];
            $label = trim($m[2]);
            $get = static function (string $name) use ($attrs): string {
                if (preg_match('#\b' . preg_quote($name, '#') . '\s*=\s*"([^"]*)"#i', $attrs, $mm)) {
                    return trim($mm[1]);
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

            if ($action === 'setchar' || !$targets) {
                // No SSR target: keep the words, drop the dead control.
                return '<span class="trivia-note">' . $label . '</span>';
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
  <?= seo_tri_links($t['body'], $map, $ui, $data['names'] ?? []) ?>
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
  <a href="<?= $map === 'hanmap' ? '/hanmap.html' : '/wordmap.html' ?>">
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
