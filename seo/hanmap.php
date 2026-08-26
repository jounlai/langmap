<?php
/**
 * seo/hanmap.php — renders a single Han Map language page or the index.
 */

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

/** @var string $seo_id */
/** @var string $seo_ui */
$seo_id = $seo_id ?? '';
$seo_ui = seo_ui_norm($seo_ui ?? 'en') ?? 'en';
$data = seo_data('hanmap');

if (empty($data['langs'])) {
    seo_404('Han Map data not built. Run: node tools/export_seo_data.js', $seo_ui);
    return;
}

if ($seo_id === '') {
    seo_render_hanmap_index($data, $seo_ui);
    return;
}

if (!isset($data['langs'][$seo_id])) {
    // A code this map no longer uses may have moved; the other map may
    // still use it, which is why this runs after the lookup, not before.
    if (seo_redirect_if_renamed('hanmap', $seo_id, $seo_ui)) return;
    seo_404("Unknown Han Map language: " . $seo_id, $seo_ui);
    return;
}

seo_render_hanmap_lang($data, $seo_id, $seo_ui);


function seo_render_hanmap_lang(array $data, string $code, string $ui): void
{
    $lang = $data['langs'][$code];
    $chars = $data['chars'];

    $name = seo_pick($lang['names'] ?? [], $ui) ?: ($lang['name'] ?? $code);
    $native = $lang['native'] ?? '';
    $desc = seo_pick($lang['description'] ?? [], $ui);
    $readingType = seo_pick($lang['readingType'] ?? [], $ui);

    $canonical = SEO_SITE . seo_path($ui, 'hanmap', $code);
    $altPath = '/hanmap/' . rawurlencode($code);
    $title = $name . ($native && $native !== $name ? " ($native)" : '')
        . ' — ' . seo_t($ui, 'hm_lang_title') . ' | Han Map';
    $metaDesc = $desc !== ''
        ? $desc
        : seo_t($ui, 'hm_lang_meta', ['name' => $name . ($native ? " ($native)" : '')]);

    seo_head([
        'title' => $title,
        'description' => $metaDesc,
        'canonical' => $canonical,
        'image' => SEO_SITE . '/ogp-tree.png',
        'ui' => $ui,
        'altpath' => $altPath,
    ]);
    ?>
<nav class="seo-crumbs"><a href="<?= e(seo_path($ui, 'hanmap')) ?>">Han Map</a> &rsaquo; <?= e($name) ?></nav>

<header class="seo-hero">
  <?php if ($native && $native !== $name): ?>
    <p class="native"><?= e($native) ?></p>
  <?php endif; ?>
  <h1><?= e($name) ?></h1>
  <?php if (!empty($lang['family'])): ?>
    <p class="sub"><?= e(seo_meta_value($ui, $lang['family'])) ?></p>
  <?php endif; ?>
</header>

<?php
    $chips = [];
    // Values, not just labels, are translated — see seo_meta_value().
    if (!empty($lang['family']))      $chips[seo_t($ui, 'family')]   = seo_meta_value($ui, $lang['family']);
    if (!empty($lang['speakers']))    $chips[seo_t($ui, 'speakers')] = seo_meta_value($ui, $lang['speakers']);
    if (!empty($lang['region']))      $chips[seo_t($ui, 'region')]   = seo_meta_value($ui, $lang['region']);
    if (!empty($lang['romanization']))$chips[seo_t($ui, 'romanization')] = $lang['romanization'];
    if ($readingType !== '')          $chips[seo_t($ui, 'reading')]  = $readingType;
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
  <h2><?= e(seo_t($ui, 'chars_heading', ['name' => $name])) ?></h2>
  <div class="seo-chartable-wrap">
  <table class="seo-chartable">
    <thead>
      <tr>
        <th class="c-char" scope="col"><?= e(seo_t($ui, 'th_char')) ?></th>
        <th class="c-gloss" scope="col"><?= e(seo_t($ui, 'th_gloss')) ?></th>
        <th class="c-read" scope="col"><?= e(seo_t($ui, 'th_read')) ?></th>
        <th class="c-form" scope="col"><?= e(seo_t($ui, 'th_form')) ?></th>
        <th class="c-ipa" scope="col">IPA</th>
      </tr>
    </thead>
    <tbody>
  <?php foreach ($chars as $c):
      $key = $c['key'];
      $readings = $lang['readings'][$key] ?? null;
      if (!$readings) continue;
      // Each reading is { surface, ipa, label } (文白異讀 / 呉音漢音 etc.).
      $readings = array_values(array_filter($readings, fn($r) =>
          ($r['surface'] ?? '') !== '' || ($r['ipa'] ?? '') !== '' || ($r['native'] ?? '') !== ''));
      if (!$readings) continue;
      $n = count($readings);
      $multi = $n > 1;
      foreach ($readings as $i => $r):
          $native = $r['native'] ?? ''; $surface = $r['surface'] ?? ''; $ipa = $r['ipa'] ?? ''; $label = $r['label'] ?? '';
          if ($native === $surface) $native = ''; // avoid duplicating when they coincide
          $first = $i === 0; ?>
      <tr<?= $first ? ' class="char-start"' : '' ?>>
        <?php if ($first): ?>
        <td class="c-char" lang="zh" rowspan="<?= $n ?>"><?= e($c['char']) ?></td>
        <td class="c-gloss" rowspan="<?= $n ?>"><?= e($c['gloss'] ?? '') ?></td>
        <?php endif; ?>
        <td class="c-read"><?php if ($multi && $label !== ''): ?><span class="rlabel"><?= e($label) ?></span><?php endif; ?></td>
        <td class="c-form" lang="<?= e($code) ?>"><?php if ($native !== ''): ?><span class="c-native"><?= e($native) ?></span><?php endif; ?><?php if ($surface !== ''): ?><span class="c-rom"<?= $native !== '' ? ' lang="vi"' : '' ?>><?= e($surface) ?></span><?php endif; ?></td>
        <td class="c-ipa"><?= $ipa !== '' ? '/' . e($ipa) . '/' : '' ?></td>
      </tr>
      <?php endforeach; ?>
  <?php endforeach; ?>
    </tbody>
  </table>
  </div>
</section>

<?php $sources = $lang['sources'] ?? []; if ($sources): ?>
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
  <a href="/hanmap.html#lang=<?= e(rawurlencode($code)) ?>"><?= e(seo_t($ui, 'open_app', ['name' => $name])) ?></a>
</div>
<?php
    $wm = seo_data('wordmap');
    seo_comparisons(
        'hanmap', $code, $ui,
        $wm, $data,
        $data['wordorder'][$code] ?? []
    );
    seo_related_links('hanmap', $code, $name, $data['langs'], $wm['langs'] ?? [], $ui);
    seo_foot($ui);
}


function seo_render_hanmap_index(array $data, string $ui): void
{
    $langs = $data['langs'];
    $rows = [];
    foreach ($langs as $code => $l) {
        $name = seo_pick($l['names'] ?? [], $ui) ?: ($l['name'] ?? $code);
        $rows[] = ['code' => $code, 'name' => $name];
    }
    usort($rows, fn($a, $b) => strcasecmp($a['name'], $b['name']));

    seo_head([
        'title' => seo_t($ui, 'hm_index_title', ['n' => (string) count($langs)]) . ' | LangMap',
        'description' => seo_t($ui, 'hm_index_desc', [
            'c' => (string) count($data['chars']),
            'n' => (string) count($langs),
        ]),
        'canonical' => SEO_SITE . seo_path($ui, 'hanmap'),
        'image' => SEO_SITE . '/ogp-tree.png',
        'ui' => $ui,
        'altpath' => '/hanmap/',
    ]);
    ?>
<nav class="seo-crumbs"><a href="<?= e(seo_path($ui, '')) ?>">LangMap</a> &rsaquo; Han Map</nav>
<header class="seo-hero">
  <h1>Han Map</h1>
  <p class="sub"><?= e(seo_t($ui, 'hm_index_sub', ['c' => (string) count($data['chars']), 'n' => (string) count($langs)])) ?></p>
</header>
<div class="seo-applink">
  <a href="/hanmap.html"><?= e(seo_t($ui, 'open_app_hm')) ?></a>
</div>
<p class="seo-crumbs"><?= e(seo_t($ui, 'see_also')) ?>: <a href="<?= e(seo_path($ui, 'wordmap')) ?>"><?= e(seo_t($ui, 'wm_link')) ?></a> · <a href="<?= e(seo_path($ui, 'trivia')) ?>"><?= e(seo_t($ui, 'tri_link')) ?></a> · <a href="<?= e(seo_path($ui, '')) ?>"><?= e(seo_t($ui, 'home')) ?></a></p>

<section class="seo-section">
  <h2><?= e(seo_t($ui, 'languages')) ?> (<?= count($rows) ?>)</h2>
  <ul class="seo-index-list">
    <?php foreach ($rows as $r): ?>
      <li><a href="<?= e(seo_path($ui, 'hanmap', $r['code'])) ?>"><?= e($r['name']) ?></a>
        <span class="code"><?= e($r['code']) ?></span></li>
    <?php endforeach; ?>
  </ul>
</section>
<?php
    seo_foot($ui);
}
