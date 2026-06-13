<?php
/**
 * seo/wordmap.php — renders a single Word Map language page or the index.
 *
 * Called by the router with $seo_ui (UI lang) and $seo_id set
 * ('' => index, otherwise a lang code).
 */

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

/** @var string $seo_id */
/** @var string $seo_ui */
$seo_id = $seo_id ?? '';
$seo_ui = seo_ui_norm($seo_ui ?? 'en') ?? 'en';
$data = seo_data('wordmap');

if (empty($data['langs'])) {
    seo_404('Word Map data not built. Run: node tools/export_seo_data.js', $seo_ui);
    return;
}

if ($seo_id === '') {
    seo_render_wordmap_index($data, $seo_ui);
    return;
}

if (!isset($data['langs'][$seo_id])) {
    seo_404("Unknown Word Map language: " . $seo_id, $seo_ui);
    return;
}

seo_render_wordmap_lang($data, $seo_id, $seo_ui);


function seo_render_wordmap_lang(array $data, string $code, string $ui): void
{
    $lang = $data['langs'][$code];
    $words = $data['words'];

    $name = seo_pick($lang['names'] ?? [], $ui) ?: ($lang['name'] ?? $code);
    $native = $lang['native'] ?? '';
    $meta = $lang['meta'] ?? [];
    $desc = seo_pick($meta['description'] ?? [], $ui);

    $canonical = SEO_SITE . seo_path($ui, 'wordmap', $code);
    $altPath = '/wordmap/' . rawurlencode($code);
    $title = $name . ($native && $native !== $name ? " ($native)" : '')
        . ' — ' . seo_t($ui, 'wm_lang_title') . ' | Word Map';
    $metaDesc = $desc !== ''
        ? $desc
        : seo_t($ui, 'wm_lang_meta', ['name' => $name . ($native ? " ($native)" : '')]);
    $robots = !empty($lang['excluded']) ? 'noindex,follow' : 'index,follow';

    seo_head([
        'title' => $title,
        'description' => $metaDesc,
        'canonical' => $canonical,
        'robots' => $robots,
        'image' => SEO_SITE . '/ogp-wordmap.png',
        'ui' => $ui,
        'altpath' => $altPath,
    ]);
    ?>
<nav class="seo-crumbs"><a href="<?= e(seo_path($ui, 'wordmap')) ?>">Word Map</a> &rsaquo; <?= e($name) ?></nav>

<header class="seo-hero">
  <?php if ($native && $native !== $name): ?>
    <p class="native"><?= e($native) ?></p>
  <?php endif; ?>
  <h1><?= e($name) ?></h1>
  <?php if (!empty($meta['family'])): ?>
    <p class="sub"><?= e($meta['family']) ?><?= !empty($lang['excluded']) ? ' · ' . e(seo_t($ui, 'hidden_tag')) : '' ?></p>
  <?php endif; ?>
</header>

<?php
    $chips = [];
    if (!empty($meta['family']))   $chips[seo_t($ui, 'family')]    = $meta['family'];
    if (!empty($meta['speakers'])) $chips[seo_t($ui, 'speakers')]  = $meta['speakers'];
    if (!empty($meta['script']))   $chips[seo_t($ui, 'script')]    = $meta['script'];
    if (!empty($meta['countries']))$chips[seo_t($ui, 'countries')] = $meta['countries'];
    if (!empty($meta['official'])) $chips[seo_t($ui, 'official')]  = $meta['official'];
    if ($chips): ?>
<div class="seo-meta">
  <?php foreach ($chips as $k => $v): ?>
    <span class="chip"><b><?= e($k) ?></b><?= e($v) ?></span>
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
        $name . ($native ? " ($native)" : ''),
        5
    );
    if ($embed !== ''):
?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'where')) ?></h2>
  <?= $embed ?>
</section>
<?php endif; ?>

<section class="seo-section">
  <h2><?= e(seo_t($ui, 'words_heading', ['name' => $name])) ?></h2>
  <div class="seo-words">
  <?php foreach ($words as $w):
      $id = $w['id'];
      $entry = $lang['words'][$id] ?? null;
      $label = seo_pick($w['label'] ?? [], $ui) ?: $id;
      $surface = $entry[0] ?? '';
      $ipa = $entry[1] ?? '';
      if ($surface === '' && $ipa === '') continue;
  ?>
    <div class="seo-word">
      <p class="label"><?= e($label) ?></p>
      <p class="surface" lang="<?= e($code) ?>"><?= e($surface !== '' ? $surface : '—') ?></p>
      <?php if ($ipa !== ''): ?><p class="ipa">/<?= e($ipa) ?>/</p><?php endif; ?>
    </div>
  <?php endforeach; ?>
  </div>
</section>

<?php $sources = $meta['sources'] ?? []; if ($sources): ?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'sources')) ?></h2>
  <ul class="seo-sources">
    <?php foreach ($sources as $s):
        $st = $s['title'] ?? ''; $su = $s['url'] ?? '';
        if ($st === '') continue; ?>
      <li><?php if ($su): ?><a href="<?= e($su) ?>" rel="nofollow noopener"><?= e($st) ?></a><?php else: ?><?= e($st) ?><?php endif; ?></li>
    <?php endforeach; ?>
  </ul>
</section>
<?php endif; ?>

<div class="seo-applink">
  <a href="/wordmap.html#lang=<?= e(rawurlencode($code)) ?>"><?= e(seo_t($ui, 'open_app', ['name' => $name])) ?></a>
</div>
<?php
    $hm = seo_data('hanmap');
    seo_related_links('wordmap', $code, $name, $data['langs'], $hm['langs'] ?? [], $ui);
    seo_foot($ui);
}


function seo_render_wordmap_index(array $data, string $ui): void
{
    $langs = $data['langs'];
    // Sort by localized name; modern first, excluded second.
    $modern = [];
    $hidden = [];
    foreach ($langs as $code => $l) {
        $name = seo_pick($l['names'] ?? [], $ui) ?: ($l['name'] ?? $code);
        $row = ['code' => $code, 'name' => $name];
        if (!empty($l['excluded'])) $hidden[] = $row; else $modern[] = $row;
    }
    $cmp = fn($a, $b) => strcasecmp($a['name'], $b['name']);
    usort($modern, $cmp);
    usort($hidden, $cmp);

    seo_head([
        'title' => seo_t($ui, 'wm_index_title', ['n' => (string) count($langs)]) . ' | LangMap',
        'description' => seo_t($ui, 'wm_index_desc', ['n' => (string) count($langs)]),
        'canonical' => SEO_SITE . seo_path($ui, 'wordmap'),
        'image' => SEO_SITE . '/ogp-wordmap.png',
        'ui' => $ui,
        'altpath' => '/wordmap/',
    ]);
    ?>
<nav class="seo-crumbs"><a href="<?= e(seo_path($ui, '')) ?>">LangMap</a> &rsaquo; Word Map</nav>
<header class="seo-hero">
  <h1>Word Map</h1>
  <p class="sub"><?= e(seo_t($ui, 'wm_index_sub', ['n' => (string) count($langs)])) ?></p>
</header>
<div class="seo-applink">
  <a href="/wordmap.html"><?= e(seo_t($ui, 'open_app_wm')) ?></a>
</div>
<p class="seo-crumbs"><?= e(seo_t($ui, 'see_also')) ?>: <a href="<?= e(seo_path($ui, 'hanmap')) ?>"><?= e(seo_t($ui, 'hm_link')) ?></a> · <a href="<?= e(seo_path($ui, '')) ?>"><?= e(seo_t($ui, 'home')) ?></a></p>

<section class="seo-section">
  <h2><?= e(seo_t($ui, 'languages')) ?> (<?= count($modern) ?>)</h2>
  <ul class="seo-index-list">
    <?php foreach ($modern as $r): ?>
      <li><a href="<?= e(seo_path($ui, 'wordmap', $r['code'])) ?>"><?= e($r['name']) ?></a>
        <span class="code"><?= e($r['code']) ?></span></li>
    <?php endforeach; ?>
  </ul>
</section>

<?php if ($hidden): ?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'hidden')) ?> (<?= count($hidden) ?>)</h2>
  <ul class="seo-index-list">
    <?php foreach ($hidden as $r): ?>
      <li><a href="<?= e(seo_path($ui, 'wordmap', $r['code'])) ?>"><?= e($r['name']) ?></a>
        <span class="code"><?= e($r['code']) ?></span></li>
    <?php endforeach; ?>
  </ul>
</section>
<?php endif; ?>
<?php
    seo_foot($ui);
}
