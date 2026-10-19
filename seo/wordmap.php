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
    // A code this map no longer uses may have moved; the other map may
    // still use it, which is why this runs after the lookup, not before.
    if (seo_redirect_if_renamed('wordmap', $seo_id, $seo_ui)) return;
    seo_404("Unknown Word Map language: " . $seo_id, $seo_ui);
    return;
}

seo_render_wordmap_lang($data, $seo_id, $seo_ui);


/**
 * A few everyday words of this language for the search snippet, labelled in
 * the reader's UI language ("ありがとう＝merci、水＝eau …"). The snippet was
 * the encyclopedic description alone, which opens on ISO codes and history
 * and says nothing a searcher looking for words can act on (owner 2026-10-16).
 */
function seo_wordmap_samples(array $data, string $code, string $ui): array
{
    // On its own UI ("日本語" read in Japanese) the pairs would be the word
    // glossed by itself.
    if ($code === $ui || str_starts_with($code, $ui . '_')) {
        return [];
    }
    $l = $data['langs'][$code];
    $labels = [];
    foreach ($data['words'] as $w) {
        $labels[(string) $w['id']] = seo_pick($w['label'] ?? [], $ui);
    }
    $out = [];
    foreach (['thanks', 'hello', 'water', 'love', 'cat', 'mother', 'one', 'sun'] as $id) {
        $surface = trim((string) ($l['words'][$id][0] ?? ''));
        $label = $labels[$id] ?? '';
        if ($surface === '' || $label === '' || preg_match('/^[\s\x{2014}\x{2013}\-?]*$/u', $surface)
            || mb_strtolower($surface) === mb_strtolower($label)) {
            continue;
        }
        $out[] = [$label, $surface];
        if (count($out) >= 4) {
            break;
        }
    }
    return $out;
}

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
    // Filled cells, not the concept list: ncs has 0, nej 18 (r29).
    $wc = (string) seo_wordmap_filled($lang);
    // Search titles (r28): the name people type, one alias, the native form, and
    // what the page answers — "Shanghai Wu (Shanghainese, 吳語): hello, thank
    // you & 87 words with pronunciation | LangMap".
    $aliases = seo_lang_aliases($ui, $code, $name, (string) $native);
    $tNative = seo_native_redundant($name, (string) $native) ? '' : (string) $native;
    $paren = array_values(array_filter([seo_title_alias($aliases), $tNative]));
    // ja page in the ja UI: "日本語で「こんにちは」は？" reads oddly. Only the
    // reader's own language itself: ja_osa, es_cr, zh_han are other varieties
    // and keep the hello/thank-you title (rally r30 a2#6).
    $own = strtolower($code) === explode('-', $ui)[0];
    // The title promises hello and thank you only where the row has one of them.
    $hasGreet = false;
    foreach (['hello', 'thanks'] as $gid) {
        $g = trim((string) ((($lang['words'] ?? [])[$gid] ?? [''])[0] ?? ''));
        if ($g !== '' && !preg_match('/^[\s\x{2014}\x{2013}\-?]*$/u', $g)) $hasGreet = true;
    }
    if (!$hasGreet && !$own) {
        $title = $name . ($paren ? ' (' . implode(', ', $paren) . ')' : '') . ' — ' . seo_t($ui, 'wm_lang_title', ['w' => $wc]) . ' | LangMap';
    } else $title = $own
        ? $name . ($tNative !== '' ? " ($tNative)" : '') . ' — ' . seo_t($ui, 'wm_lang_title', ['w' => $wc]) . ' | LangMap'
        : seo_t($ui, 'wm_t2', ['name' => $name . ($paren ? ' (' . implode(', ', $paren) . ')' : ''), 'w' => $wc]) . ' | LangMap';
    $hmLang = ((seo_data('hanmap')['langs'] ?? [])[$code] ?? []);
    $hmName = (string) ($hmLang['name'] ?? '');
    // Only borrow it when both maps show the same variety: the same point and
    // no period on the Word Map row. zh_jh is Nanjing here but Yangzhou on the
    // Han Map; zh_han is a Han-period row here, "Old Chinese" there (r33 a2#1).
    if (!isset($hmLang['lat'], $hmLang['lng'], $lang['lat'], $lang['lng'])
        || abs((float) $hmLang['lat'] - (float) $lang['lat']) > 0.05
        || abs((float) $hmLang['lng'] - (float) $lang['lng']) > 0.05
        || trim((string) ($meta['period'] ?? '')) !== '') $hmName = '';
    // The Han Map's English name only when it is a plain name: "Central Bai
    // (Zhoucheng, Dali)" is a row label with a location (r29).
    $q = seo_lang_question($ui, $data, $code, ($ui === 'en' && $hmName !== '' && !preg_match('/[(（]/u', $hmName)) ? $hmName : $name);
    $metaDesc = seo_lang_meta_lead(
        array_values(array_filter(seo_wordmap_samples($data, $code, $ui), fn($p) => $q === '' || $p[1] !== trim((string) ((($data['langs'][$code]['words'] ?? [])['hello'] ?? [''])[0] ?? '')))),
        $desc !== '' ? $desc : seo_t($ui, 'wm_lang_meta', ['name' => $name . ($tNative !== '' ? " ($tNative)" : ''), 'w' => $wc]),
        $ui
    );
    if ($q !== '') $metaDesc = seo_clip($q . (in_array($ui, ['ja', 'zh', 'yue'], true) ? '' : ' ') . $metaDesc, 160);
    $robots = (!empty($lang['excluded']) || seo_wordmap_thin($lang)) ? 'noindex,follow' : 'index,follow';
    // One alias line: the cross-map aliases, then the row's own list (r29).
    $akaList = seo_lang_aliases($ui, $code, $name, (string) $native, 6, is_array($meta['aliases'] ?? null) ? $meta['aliases'] : []);

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
<nav class="seo-crumbs" aria-label="<?= e(seo_t($ui, 'crumbs')) ?>"><a href="<?= e(seo_path($ui, 'wordmap')) ?>">Word Map</a> <?= seo_crumb_sep($ui) ?> <?= e($name) ?></nav>
<?= seo_breadcrumb_ld([['Word Map', seo_path($ui, 'wordmap')], [$name, null]]) ?>

<header class="seo-hero">
  <?php if ($native && $native !== $name): ?>
    <?php // No row tag: only a Proto-* label is known to be English; any other
          // untagged row (sukh, h_vedic …) gets no lang rather than a wrong one.
          $nl = seo_lang_attr($code) ?: (stripos((string) $native, 'proto-') === 0 ? 'en' : ''); ?>
    <p class="native"<?= $nl !== '' ? ' lang="' . e($nl) . '"' : '' ?>><?= e($native) ?></p>
  <?php endif; ?>
  <h1><?= e($name) ?></h1>
  <?php if (!empty($akaList)): ?><p class="sub aka"><?= e(seo_t($ui, 'aka', ['list' => implode($ui === 'ja' || $ui === 'zh' || $ui === 'yue' ? '、' : ', ', $akaList)])) ?></p><?php endif; ?>
  <?php if (!empty($meta['family'])): ?>
    <p class="sub"><?= seo_chip_value(seo_ucfirst(seo_meta_value($ui, $meta['family'])),seo_meta_value_lang($ui, (string) $meta['family'])) ?></p><?php /* No "historical / hidden variety" tag: "hidden" is the map's internal
         default-view flag, not something a reader of the page can use (r31 a2). */ ?>
  <?php endif; ?>
</header>

<?php
    $chips = [];
    // Values, not just labels, are translated — see seo_meta_value().
    if (!empty($meta['family']))   $chips[seo_t($ui, 'family')]    = seo_meta_value($ui, $meta['family']);
    if (!empty($meta['speakers'])) $chips[seo_t($ui, 'speakers')]  = seo_meta_value($ui, $meta['speakers']);
    if (!empty($meta['script']))   $chips[seo_t($ui, 'script')]    = seo_meta_value($ui, $meta['script']);
    if (!empty($meta['countries']))$chips[seo_t($ui, 'countries')] = seo_meta_value($ui, $meta['countries']);
    if (!empty($meta['official'])) $chips[seo_t($ui, 'official')]  = seo_meta_value($ui, $meta['official']);
    if (!empty($meta['region']))   $chips[seo_t($ui, 'region')]    = seo_meta_value($ui, $meta['region']);
    if (!empty($meta['vitality'])) $chips[seo_t($ui, 'vitality')]  = seo_vitality($ui, $meta['vitality']);
    if (!empty($meta['iso6393']))  $chips[seo_t($ui, 'iso')]       = $meta['iso6393'];
    if (!empty($meta['glottocode']))$chips[seo_t($ui, 'glotto')]   = $meta['glottocode'];
    // Untranslated values (stored English) are tagged so they are read as English.
    $chipLang = [];
    foreach (['family','speakers','script','countries','official','region'] as $f)
        if (!empty($meta[$f])) $chipLang[seo_t($ui, $f)] = seo_meta_value_lang($ui, (string) $meta[$f]);
    if ($chips): ?>
<div class="seo-meta">
  <?php foreach ($chips as $k => $v): ?>
    <span class="chip"><b><?= e($k) ?></b> <?= seo_chip_value((string) $v, $chipLang[$k] ?? '') ?></span>
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
        $name . ($tNative !== '' ? " ($tNative)" : ''),
        5,
        $ui
    );
    if ($embed !== ''):
?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'where')) ?></h2>
  <?= $embed ?>
</section>
<?php endif; ?>


<?php /* Where the goods card used to sit. It moved below the word list
         (2026-10-13, owner): a first-time visitor who came for the language met
         a shop card before the words and read the page as an ad. This one line
         keeps the offer findable here — the reason the card was moved UP twice
         before — without selling ahead of the content. */ ?>
<p class="seo-goods-peek"><a href="#seo-goods"><?= e(seo_t($ui, 'goods_peek', ['name' => $name])) ?></a></p>

<section class="seo-section">
  <h2><?= e(seo_t($ui, 'words_heading', ['name' => $name, 'w' => $wc])) ?></h2>
  <div class="seo-words">
  <?php foreach ($words as $w):
      $id = $w['id'];
      $entry = $lang['words'][$id] ?? null;
      $label = seo_pick($w['label'] ?? [], $ui) ?: $id;
      $surface = $entry[0] ?? '';
      $ipa = $entry[1] ?? '';
      // The same test seo_wordmap_filled() counts with, so the heading's number
      // is the number of cards: a "—" placeholder cell is not a word (r31 a2#1).
      if (preg_match('/^[\s\x{2014}\x{2013}\-?]*$/u', trim((string) $surface))) continue;
      // Alternate script / period forms — Sawndip for Zhuang, the Khitan large
      // script, the Jurchen 女真譯語 transliterations, and the oracle-bone and
      // bronze writings of Old Chinese. The map shows these under the main word;
      // the SSR page has no hover, so the script name is printed, not tooltipped.
      $alts = $lang['altWords'][$id] ?? [];
  ?>
    <div class="seo-word">
      <?php /* The label links to that word across every language. This is the
               return direction of the link /{ui}/word/{id} already makes, and
               it is the move a reader actually wants to make from here:
               "Japanese says 水 for water — what does everyone else say?".
               It is also the only path from the 1,188 indexed language pages
               into the word pages; without it they were reachable from the
               hub and the sitemap and nothing else. */ ?>
      <p class="label"><a href="<?= e(seo_path($ui, 'word', $id)) ?>"><?= e($label) ?></a></p>
      <p class="surface<?= seo_script_class($surface) ?>" lang="<?= e(seo_lang_attr($code)) ?>"><?= e($surface !== '' ? $surface : '—') ?></p>
      <?php if ($ipa !== ''): ?><p class="ipa"><bdi dir="ltr"><?= e($ipa) ?></bdi></p><?php endif; ?>
      <?php foreach ($alts as $a):
          $af = $a['form'] ?? ''; if ($af === '') continue;
          $as = $a['script'] ?? ''; ?>
        <p class="alt"><span lang="<?= e(seo_lang_attr($code)) ?>"><?= e($af) ?></span><?php if ($as !== ''): ?> <span class="alt-script"><?= e($as) ?></span><?php endif; ?></p>
      <?php endforeach; ?>
    </div>
  <?php endforeach; ?>
  </div>

</section>

<?php /* The goods hand-off, the same link the app's language modal carries.
         It sits right after the word list (2026-10-13): the reader has seen the
         words first, so "wear these" follows from the page instead of
         interrupting it. A one-line pointer above the list (.seo-goods-peek)
         keeps it findable — two earlier placements further down were
         reported as "no link here". The photo is picked per language so 1,187 pages are not
         the same picture; all three show the same product.
         rel=nofollow because it is an outbound commercial link on an indexed
         page, and the image is alt="" because the link's own text already
         says where it goes. */
$goods_photo = '/assets/tshirts/tshirt-' . (crc32($code) % 3) . '.jpg'; ?>
<div class="seo-goods" id="seo-goods">
  <a href="<?= e(seo_goods_href($code, $lang, $ui)) ?>" rel="nofollow noopener" target="_blank">
    <img src="<?= e($goods_photo) ?>" alt="" width="760" height="744" loading="lazy" decoding="async">
    <span class="seo-goods-text">
      <?php $spk = seo_speaker_count($lang); ?>
      <span class="seo-goods-title"><?= e($spk ? seo_t($ui, 'goods_title_n', ['n' => seo_people($spk, $ui), 'cnt' => min($spk, 1000000)]) : seo_t($ui, 'goods_title')) ?></span>
      <span class="seo-goods-lede"><?= e(seo_t($ui, 'goods_lede', ['name' => $name, 'w' => $wc])) ?></span>
      <span class="seo-goods-note"><?= e(seo_t($ui, 'goods_note')) ?></span>
      <span class="seo-goods-btn"><?= e(seo_t($ui, 'goods_sub')) ?></span>
    </span>
  </a>
</div>

<?php $sources = $meta['sources'] ?? []; if ($sources): ?>
<section class="seo-section">
  <h2><?= e(seo_t($ui, 'sources')) ?></h2>
  <ul class="seo-sources">
    <?php foreach ($sources as $s):
        $st = $s['title'] ?? ''; $su = $s['url'] ?? '';
        if ($st === '') continue; ?>
      <?php $sl = seo_src_lang($st, $ui); ?>
      <li<?= $sl !== '' ? ' lang="' . $sl . '"' : '' ?>><?php if ($su): ?><a href="<?= e($su) ?>" rel="nofollow noopener"><?= e($st) ?></a><?php else: ?><?= e($st) ?><?php endif; ?></li>
    <?php endforeach; ?>
  </ul>
</section>
<?php endif; ?>

<div class="seo-applink">
  <a href="/wordmap.html#lang=<?= e(rawurlencode($code)) ?>&amp;ui=<?= e($ui) ?>"><?= e(seo_t($ui, 'open_app', ['name' => $name])) ?></a>
</div>

<?php
    $hm = seo_data('hanmap');
    seo_comparisons(
        'wordmap', $code, $ui,
        $data, $hm,
        $data['wordorder'][$code] ?? []
    );
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

    $wc = (string) count($data['words']);
    seo_head([
        'title' => seo_t($ui, 'wm_index_title', ['n' => (string) count($langs), 'w' => $wc]) . ' | LangMap',
        'description' => seo_t($ui, 'wm_index_desc', ['n' => (string) count($langs), 'w' => $wc]),
        'canonical' => SEO_SITE . seo_path($ui, 'wordmap'),
        'image' => SEO_SITE . '/ogp-wordmap.png',
        'ui' => $ui,
        'altpath' => '/wordmap/',
    ]);
    ?>
<nav class="seo-crumbs" aria-label="<?= e(seo_t($ui, 'crumbs')) ?>"><a href="<?= e(seo_path($ui, '')) ?>">LangMap</a> <?= seo_crumb_sep($ui) ?> Word Map</nav>
<header class="seo-hero">
  <h1>Word Map</h1>
  <p class="sub"><?= e(seo_t($ui, 'wm_index_sub', ['n' => (string) count($langs), 'w' => $wc])) ?></p>
</header>
<div class="seo-applink">
  <a href="/wordmap.html"><?= e(seo_t($ui, 'open_app_wm')) ?></a>
</div>
<p class="seo-crumbs"><?= e(seo_t($ui, 'see_also')) ?>: <a href="<?= e(seo_path($ui, 'hanmap')) ?>"><?= e(seo_t($ui, 'hm_link')) ?></a> · <a href="<?= e(seo_path($ui, 'trivia')) ?>"><?= e(seo_t($ui, 'tri_link')) ?></a> · <a href="<?= e(seo_path($ui, '')) ?>"><?= e(seo_t($ui, 'home')) ?></a></p>

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
