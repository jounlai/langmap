/* LangMap PWA glue — shared across pages.
   - registers the service worker
   - offers "Add to Home Screen" to RETURNING visitors (Hook-model trigger;
     installed icon = a persistent ambient prompt → revisits)
   - Android/desktop: native beforeinstallprompt
   - iOS Safari: a custom Share→Add-to-Home-Screen hint (no native prompt)
   Self-contained; no dependencies. */
(function () {
  'use strict';
  if (!('serviceWorker' in navigator)) return;

  // ---- register SW (after load, low priority) ----
  // updateViaCache:'none' makes the browser byte-check /sw.js against the
  // network on every navigation instead of trusting an HTTP-cached copy, and
  // reg.update() nudges that check on load — so a client stuck on an old SW is
  // pulled onto the current one (which then purges caches + reloads) without any
  // manual cache-clear.
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
      .then(function (reg) { try { reg.update(); } catch (_) {} })
      .catch(function () {});
  });

  var FB = 'en';
  function lang() {
    try { if (typeof uiLang !== 'undefined' && uiLang) return uiLang.split('_')[0]; } catch (_) {}
    return (navigator.language || FB).slice(0, 2);
  }
  var S = {
    title: { en: 'Add LangMap to your home screen', ja: 'LangMap をホーム画面に追加', ko: 'LangMap을 홈 화면에 추가', zh: '把 LangMap 添加到主屏幕', yue: '將 LangMap 加到主畫面', vi: 'Thêm LangMap vào màn hình chính', th: 'เพิ่ม LangMap ลงในหน้าจอหลัก', id: 'Tambahkan LangMap ke layar utama', hi: 'LangMap को होम स्क्रीन पर जोड़ें', de: 'LangMap zum Startbildschirm hinzufügen', fr: 'Ajouter LangMap à l’écran d’accueil', it: 'Aggiungi LangMap alla schermata Home', es: 'Añade LangMap a tu pantalla de inicio', pt: 'Adicione o LangMap ao ecrã principal', ru: 'Добавьте LangMap на главный экран', uk: 'Додайте LangMap на головний екран', ar: 'أضِف LangMap إلى الشاشة الرئيسية', he: 'הוסיפו את LangMap למסך הבית', sw: 'Ongeza LangMap kwenye skrini ya nyumbani' },
    install: { en: 'Install', ja: '追加', ko: '추가', zh: '添加', yue: '加入', vi: 'Cài đặt', th: 'ติดตั้ง', id: 'Pasang', hi: 'जोड़ें', de: 'Hinzufügen', fr: 'Ajouter', it: 'Aggiungi', es: 'Añadir', pt: 'Adicionar', ru: 'Добавить', uk: 'Додати', ar: 'إضافة', he: 'הוספה', sw: 'Sakinisha' },
    later: { en: 'Not now', ja: 'あとで', ko: '나중에', zh: '以后再说', yue: '遲啲', vi: 'Để sau', th: 'ไว้ก่อน', id: 'Nanti', hi: 'अभी नहीं', de: 'Später', fr: 'Plus tard', it: 'Non ora', es: 'Ahora no', pt: 'Agora não', ru: 'Не сейчас', uk: 'Не зараз', ar: 'ليس الآن', he: 'לא עכשיו', sw: 'Si sasa' },
    ios: { en: "Tap the Share button, then “Add to Home Screen”.", ja: '共有ボタン →「ホーム画面に追加」をタップ。', ko: '공유 버튼 → “홈 화면에 추가”를 누르세요.', zh: '点按分享按钮，然后选择“添加到主屏幕”。', yue: '撳分享掣，再揀「加到主畫面」。', vi: 'Chạm nút Chia sẻ, rồi “Thêm vào màn hình chính”.', th: 'แตะปุ่มแชร์ แล้วเลือก “เพิ่มลงในหน้าจอหลัก”.', id: 'Ketuk tombol Bagikan, lalu “Tambahkan ke Layar Utama”.', hi: 'शेयर बटन दबाएँ, फिर “होम स्क्रीन में जोड़ें”.', de: 'Tippe auf „Teilen“, dann „Zum Home-Bildschirm“.', fr: 'Touchez Partager, puis « Sur l’écran d’accueil ».', it: 'Tocca Condividi, poi “Aggiungi a Home”.', es: 'Toca Compartir y luego “Añadir a pantalla de inicio”.', pt: 'Toque em Partilhar e depois “Adicionar ao ecrã principal”.', ru: 'Нажмите «Поделиться», затем «На экран «Домой».', uk: 'Натисніть «Поділитися», потім «На екран «Домівка».', ar: 'اضغط زر المشاركة ثم «إضافة إلى الشاشة الرئيسية».', he: 'הקישו על שיתוף ואז “הוספה למסך הבית”.', sw: 'Gusa kitufe cha Kushiriki, kisha “Ongeza kwenye Skrini ya Nyumbani”.' }
  };
  function t(k) { return S[k][lang()] || S[k][FB]; }

  function isStandalone() {
    return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
  }
  function visits() { try { return parseInt(localStorage.getItem('lm_visits') || '0', 10) || 0; } catch (_) { return 0; } }
  function bumpVisits() {
    try {
      var today = String(Math.floor(Date.now() / 86400000));
      if (localStorage.getItem('lm_last_day') !== today) {
        localStorage.setItem('lm_visits', String(visits() + 1));
        localStorage.setItem('lm_last_day', today);
      }
    } catch (_) {}
  }
  function dismissedRecently() {
    try { var d = parseInt(localStorage.getItem('lm_pwa_dismissed') || '0', 10); return d && (Date.now() - d) < 14 * 86400000; } catch (_) { return false; }
  }
  function setDismissed() { try { localStorage.setItem('lm_pwa_dismissed', String(Date.now())); } catch (_) {} }

  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; });
  window.addEventListener('appinstalled', function () { setDismissed(); var b = document.getElementById('lm-pwa-bar'); if (b) b.remove(); });

  function iconSvg() {
    return '<span style="display:inline-flex;width:34px;height:34px;border-radius:9px;background:#4178bc;align-items:center;justify-content:center;flex:none"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>';
  }

  function showBar(iosMode) {
    if (document.getElementById('lm-pwa-bar')) return;
    var bar = document.createElement('div');
    bar.id = 'lm-pwa-bar';
    bar.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;max-width:460px;margin:0 auto;z-index:99997;background:#fff;border:1px solid #e2e4ea;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.18);padding:12px 12px;display:flex;align-items:center;gap:12px;font-family:system-ui,-apple-system,sans-serif;animation:lmpwa .3s ease';
    var text = document.createElement('div');
    text.style.cssText = 'flex:1;min-width:0;font-size:13.5px;color:#222;line-height:1.35';
    text.innerHTML = '<b>' + t('title') + '</b>' + (iosMode ? '<br><span style="color:#667;font-size:12.5px">' + t('ios') + '</span>' : '');
    var close = document.createElement('button');
    close.type = 'button'; close.setAttribute('aria-label', t('later'));
    close.style.cssText = 'border:0;background:none;color:#9aa;font-size:18px;cursor:pointer;padding:2px 6px;flex:none';
    close.textContent = '✕';
    close.addEventListener('click', function () { setDismissed(); bar.remove(); });
    bar.appendChild(iconSvg ? (function () { var s = document.createElement('span'); s.innerHTML = iconSvg(); return s.firstChild; })() : document.createTextNode(''));
    bar.appendChild(text);
    if (!iosMode) {
      var btn = document.createElement('button');
      btn.type = 'button'; btn.textContent = t('install');
      btn.style.cssText = 'border:0;background:#4178bc;color:#fff;border-radius:9px;padding:9px 16px;font-size:14px;font-weight:700;cursor:pointer;flex:none';
      btn.addEventListener('click', function () {
        if (!deferred) { setDismissed(); bar.remove(); return; }
        deferred.prompt();
        deferred.userChoice.finally(function () { deferred = null; setDismissed(); bar.remove(); });
      });
      bar.appendChild(btn);
    }
    bar.appendChild(close);
    var st = document.createElement('style');
    st.textContent = '@keyframes lmpwa{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(st);
    document.body.appendChild(bar);
  }

  function maybeOffer() {
    bumpVisits();
    if (isStandalone() || dismissedRecently() || visits() < 2) return;
    var ua = navigator.userAgent || '';
    var isIOS = /iphone|ipad|ipod/i.test(ua) && /safari/i.test(ua) && !/crios|fxios|edgios/i.test(ua);
    if (isIOS) { setTimeout(function () { showBar(true); }, 2500); return; }
    // Android / desktop: wait briefly for beforeinstallprompt to arrive
    setTimeout(function () { if (deferred) showBar(false); }, 3000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', maybeOffer);
  else maybeOffer();
})();
