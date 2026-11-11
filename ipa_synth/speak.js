/**
 * ipa_synth/speak.js — the pronunciation panel for the Word Map and the Han Map.
 *
 * Adds a round "speak" button under the settings gear (.right-controls). Pressing it opens
 * a small panel with the vocal-tract drawing; while it is open, hovering a map label
 * (mouse) or tapping it (touch) synthesizes the label's data-ipa with ipa_synth/engine.js
 * and animates the mouth. Tapping a label while the panel is open speaks instead of
 * opening the language popup; close the panel to get the popup back.
 *
 * engine.js and tract.js load only when the panel is first opened.
 */
(function () {
    'use strict';
    const V = '?v=44';
    const BASE = '/ipa_synth/';
    const STR = {
        en: { open: 'Pronunciation', close: 'Close', hintHover: 'Point at a word on the map, or in a language panel, to hear it.', hintTap: 'Tap a word on the map to hear it; tap it again to open its language.',
              note: 'Synthesized from the IPA by rule: an approximation, not checked by native speakers.', unlock: 'Click anywhere once to turn the sound on.', none: 'No IPA for this word.', male: 'male', female: 'female', child: 'child', replay: 'Replay', spec: 'Tap to switch: frequency bars / spectrogram' },
        ja: { open: '発音', close: '閉じる', hintHover: '地図や言語の詳細の単語にマウスを重ねると読み上げます。', hintTap: '地図の単語をタップすると読み上げ、もう一度タップすると言語の詳細が開きます。',
              note: 'IPAから規則で合成した近似音です。ネイティブによる確認はしていません。', unlock: '音を出すには、まず画面を一度クリックしてください。', none: 'この単語にはIPAがありません。', male: '男声', female: '女声', child: '子ども', replay: 'もう一度', spec: 'タップで切り替え：周波数バー／スペクトログラム' },
        ko: { open: '발음', close: '닫기', hintHover: '지도나 언어 정보의 단어에 마우스를 올리면 읽어 줍니다.', hintTap: '지도의 단어를 누르면 읽어 주고, 한 번 더 누르면 언어 정보가 열립니다.',
              note: 'IPA를 규칙으로 합성한 근사음입니다. 원어민 확인은 거치지 않았습니다.', unlock: '소리를 켜려면 화면을 한 번 클릭하세요.', none: '이 단어에는 IPA가 없습니다.', male: '남성', female: '여성', child: '어린이', replay: '다시 듣기', spec: '눌러서 전환: 주파수 막대 / 스펙트로그램' },
        zh: { open: '发音', close: '关闭', hintHover: '将鼠标移到地图或语言详情中的词语上即可朗读。', hintTap: '点按地图上的词语即可朗读，再点一次打开该语言的详情。',
              note: '根据 IPA 按规则合成的近似音，未经母语者核对。', unlock: '请先点击一下页面以开启声音。', none: '这个词没有 IPA。', male: '男声', female: '女声', child: '童声', replay: '重播', spec: '点按切换：频率条 / 语谱图' },
    };
    const lang = () => {
        const l = (document.documentElement.lang || 'en').toLowerCase();
        return STR[l.slice(0, 2)] ? l.slice(0, 2) : 'en';
    };
    const T = k => (STR[lang()] || STR.en)[k] || STR.en[k];
    const canHover = () => window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

    let open = false, loaded = null, AC = null, src = null, plan = null, startAt = 0, raf = 0, hoverTimer = 0, lastEl = null;
    let panel, canvas, specCv, spec = null, specMode = 'bars', elWord, elIpa, elName, elHint, btn, voiceSel;

    const css = `
    .speak-fab { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; min-width: 44px;
        background: #fff; border: 1px solid #d0d0d0; border-radius: 50%; box-shadow: 0 1px 4px rgba(0,0,0,.12); color: #444;
        cursor: pointer; padding: 0; transition: background-color .15s, color .15s, transform .1s; }
    .speak-fab:hover { background: #f3f4f6; }
    .speak-fab:active { transform: scale(.94); }
    .speak-fab[aria-pressed="true"] { background: #1a73e8; color: #fff; border-color: #1a73e8; }
    .speak-fab:focus-visible { outline: 2px solid #4a6cf7; outline-offset: 2px; }
    .speak-panel { position: fixed; z-index: 1030; left: max(12px, env(safe-area-inset-left)); bottom: 34px; width: 280px;
        background: rgba(255,255,255,.96); border: 1px solid rgba(0,0,0,.12); border-radius: 14px; box-shadow: 0 6px 24px rgba(0,0,0,.18);
        padding: 10px 12px 10px; font: 13px/1.4 system-ui, -apple-system, "Segoe UI", "Hiragino Sans", "Noto Sans JP", sans-serif; color: #222;
        --vt-skin: #f3d9c6; --vt-skin-line: #b98b6e; --vt-air: #fffaf4; --vt-bone: #ece6d8; --vt-bone-line: #a39780; --vt-tongue: #e07a7a;
        --vt-tongue-line: #a84848; --vt-tooth: #fff; --vt-velum: #d98f8f; --vt-flow: #2e6fb8; --vt-noise: #d0402f; --vt-text: #333;
        --vt-nasal: #cfe3f7; --vt-fold: #c46a6a; --vt-lip: #d88b84; }
    .speak-panel[hidden] { display: none; }
    .speak-panel .sp-head { display: flex; align-items: center; gap: 8px; }
    .speak-panel .sp-title { font-weight: 700; flex: 1; }
    .speak-panel .sp-close { border: 0; background: transparent; font-size: 20px; line-height: 1; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; color: #555; }
    .speak-panel .sp-close:hover { background: #f0f0f0; }
    .speak-panel .sp-body { display: flex; gap: 10px; align-items: center; margin-top: 4px; }
    .speak-panel canvas { width: 128px; height: 160px; flex: 0 0 128px; }
    .speak-panel .sp-text { min-width: 0; flex: 1; }
    .speak-panel .sp-word { font-size: 20px; font-weight: 600; word-break: break-word; }
    .speak-panel .sp-ipa { font: 15px "Doulos SIL", "Charis SIL", "Gentium Plus", "Noto Sans", serif; color: #444; word-break: break-word; }
    .speak-panel .sp-name { color: #6b6b6b; font-size: 12px; margin-top: 2px; }
    .speak-panel .sp-spec { display: block; width: 100%; height: 56px; margin-top: 6px; border-radius: 8px; background: #10141c; cursor: pointer; }
    .speak-panel .sp-hint { color: #555; margin-top: 6px; }
    .speak-panel .sp-row { display: flex; gap: 6px; margin-top: 6px; align-items: center; }
    .speak-panel .sp-row select, .speak-panel .sp-row button { font: inherit; font-size: 12px; padding: 3px 8px; border: 1px solid #ccc; border-radius: 8px; background: #fff; color: #222; cursor: pointer; }
    .speak-panel .sp-row select { width: auto; min-width: 0; max-width: 50%; flex: 0 1 auto; height: auto; }
    .speak-panel .sp-row button { width: auto; flex: 0 0 auto; white-space: nowrap; }
    .speak-panel .sp-note { color: #8a8a8a; font-size: 10.5px; margin-top: 6px; }
    .lang-label.sp-speaking, .globe-label.sp-speaking { outline: 2px solid #1a73e8; outline-offset: 2px; border-radius: 4px; }
    tr.sp-speaking > td { background: rgba(26,115,232,.1); }
    .speak-panel .sp-word, .speak-panel .sp-ipa { cursor: pointer; }
    @media (max-width: 600px) {
        .speak-panel { left: 8px; right: auto; width: min(232px, calc(100vw - 16px)); bottom: max(28px, env(safe-area-inset-bottom)); padding: 6px 8px; font-size: 12px; }
        .speak-panel .sp-body { gap: 6px; margin-top: 0; }
        .speak-panel canvas { width: 64px; height: 80px; flex-basis: 64px; }
        .speak-panel .sp-word { font-size: 16px; }
        .speak-panel .sp-ipa { font-size: 13px; }
        .speak-panel .sp-name { font-size: 11px; margin-top: 0; }
        .speak-panel .sp-hint { margin-top: 4px; font-size: 11px; }
        .speak-panel .sp-row { margin-top: 4px; }
        .speak-panel .sp-close { width: 28px; height: 28px; }
        .speak-panel .sp-note { display: none; }
        .speak-panel .sp-spec { height: 38px; margin-top: 4px; }
    }
    @media (prefers-color-scheme: dark) {
        html[data-theme="dark"] .speak-panel { background: rgba(33,36,40,.96); color: #e8e6e3; border-color: #3a3d42; }
    }`;

    const ICON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9.5a3.5 3.5 0 0 1 0 5"/><path d="M18.5 7a7 7 0 0 1 0 10"/></svg>';

    function load() {
        if (loaded) return loaded;
        const add = f => new Promise((res, rej) => { const s = document.createElement('script'); s.src = BASE + f + V; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
        loaded = (window.IPASynth ? Promise.resolve() : add('engine.js')).then(() => window.VocalTract ? null : add('tract.js'));
        loaded.catch(() => { loaded = null; });   // a failed download is retried on the next word, not remembered
        return loaded;
    }

    function build() {
        const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
        btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'speak-fab'; btn.innerHTML = ICON;
        btn.setAttribute('aria-pressed', 'false');
        const gear = document.querySelector('.right-controls .settings-fab');
        if (gear && gear.parentNode) gear.parentNode.insertBefore(btn, gear.nextSibling);
        else { btn.style.cssText = 'position:fixed;right:10px;bottom:90px;z-index:1001'; document.body.appendChild(btn); }
        btn.addEventListener('click', () => (open ? close() : show()));

        panel = document.createElement('div');
        panel.className = 'speak-panel'; panel.hidden = true; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'false');
        panel.innerHTML = '<div class="sp-head"><span class="sp-title"></span><button type="button" class="sp-close">×</button></div>'
            + '<div class="sp-body"><canvas width="128" height="160" aria-hidden="true"></canvas><div class="sp-text"><div class="sp-word" dir="auto"></div><div class="sp-ipa" dir="ltr"></div><div class="sp-name"></div></div></div>'
            + '<canvas class="sp-spec" width="512" height="112" role="img"></canvas>'
            + '<div class="sp-hint"></div><div class="sp-row"><select class="sp-voice"><option value="female"></option><option value="male"></option><option value="child"></option></select><button type="button" class="sp-replay"></button></div>'
            + '<div class="sp-note"></div>';
        document.body.appendChild(panel);
        canvas = panel.querySelector('canvas');
        specCv = panel.querySelector('.sp-spec');
        try { specMode = localStorage.getItem('lm_speak_spec') === 'gram' ? 'gram' : 'bars'; } catch (_) {}
        specCv.addEventListener('click', () => {
            specMode = specMode === 'bars' ? 'gram' : 'bars';
            try { localStorage.setItem('lm_speak_spec', specMode); } catch (_) {}
            drawSpec(src && plan ? Math.max(0, (AC.currentTime - startAt) * 1000) : null);
        });
        elWord = panel.querySelector('.sp-word'); elIpa = panel.querySelector('.sp-ipa'); elName = panel.querySelector('.sp-name'); elHint = panel.querySelector('.sp-hint');
        voiceSel = panel.querySelector('.sp-voice');
        try { voiceSel.value = localStorage.getItem('lm_speak_voice') || 'female'; } catch (_) {}
        voiceSel.addEventListener('change', () => { try { localStorage.setItem('lm_speak_voice', voiceSel.value); } catch (_) {} if (lastEl) say(lastEl); });
        panel.querySelector('.sp-close').addEventListener('click', close);
        panel.querySelector('.sp-replay').addEventListener('click', () => { if (lastEl) say(lastEl); });
        for (const x of [elWord, elIpa]) x.addEventListener('click', () => { if (lastEl) say(lastEl); });   // the panel's own word replays
        document.addEventListener('keydown', e => { if (open && e.key === 'Escape') close(); });
        relabel();
        new MutationObserver(relabel).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

        // label events: capture phase, so a tap can be taken before the map's own handler opens the popup
        const labelOf = (t, ev) => {
            let e = t && t.closest && t.closest('[data-ipa]');
            // a tap on the gap between table rows lands on the tbody: take the row at that height
            if (!e && ev && t && t.closest && t.closest('tbody')) {
                for (const r of t.closest('tbody').querySelectorAll('tr[data-ipa]')) { const q = r.getBoundingClientRect(); if (ev.clientY >= q.top - 2 && ev.clientY <= q.bottom + 2) { e = r; break; } }
            }
            return e && e.getAttribute('data-ipa') ? e : null;
        };
        // touch: the first tap on a map label speaks it; a second tap on the same label lets the
        // page open its language panel, whose table rows can then be tapped to hear them
        let lastTap = null;
        document.addEventListener('click', e => {
            if (!open || canHover()) return;
            const el = labelOf(e.target, e); if (!el) return;
            const onMap = !!el.closest('.lang-label, .globe-label');
            if (onMap && lastTap === el && Date.now() - lastTap._t < 4000) { lastTap = null; return; }
            e.stopPropagation(); e.preventDefault();
            if (onMap) { lastTap = el; el._t = Date.now(); }
            say(el);
        }, true);
        document.addEventListener('mouseover', e => {
            if (!open || !canHover()) return;
            const el = labelOf(e.target); if (!el || el === lastEl && src) return;
            if (e.relatedTarget && el.contains(e.relatedTarget)) return;
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => say(el), 120);
        }, true);
        document.addEventListener('mouseout', e => {
            const el = labelOf(e.target);
            if (el && !(e.relatedTarget && el.contains(e.relatedTarget))) clearTimeout(hoverTimer);
        }, true);
    }

    function relabel() {
        btn.title = T('open'); btn.setAttribute('aria-label', T('open'));
        panel.setAttribute('aria-label', T('open'));
        panel.querySelector('.sp-title').textContent = T('open');
        panel.querySelector('.sp-close').setAttribute('aria-label', T('close'));
        panel.querySelector('.sp-replay').textContent = '▶ ' + T('replay');
        voiceSel.options[0].textContent = T('female'); voiceSel.options[1].textContent = T('male'); voiceSel.options[2].textContent = T('child');
        const locked = AC == null || AC.state === 'suspended';
        elHint.textContent = (open && locked && canHover() ? T('unlock') + ' ' : '') + (canHover() ? T('hintHover') : T('hintTap'));
        panel.querySelector('.sp-note').textContent = T('note');
        specCv.title = T('spec'); specCv.setAttribute('aria-label', T('spec'));
    }

    // speak=1 in the URL hash: the page's own hash writer keeps it while window.__speakOpen is set
    function syncUrl() {
        try {
            const h = new URLSearchParams(location.hash.slice(1));
            if (open) h.set('speak', '1'); else h.delete('speak');
            const s = h.toString().replace(/%2C/g, ',').replace(/%3A/gi, ':').replace(/%7C/gi, '|');
            const url = location.pathname + location.search + (s ? '#' + s : '');
            if (url !== location.pathname + location.search + location.hash) history.replaceState(history.state, '', url);
        } catch (_) {}
    }
    // iOS Safari: after switching to another app the context comes back "interrupted" or
    // suspended, and resume() outside a gesture does nothing (sometimes never settles). On the
    // next touch, resume it; if the page was in the background, replace the context outright,
    // and play one silent sample so the new context is unlocked inside the gesture.
    // A context is replaced at most once per return from the background and never twice within
    // 3 s: while a call or another app holds the audio, every tap used to close and open a new
    // context (two per tap: touchend + pointerdown), and Safari can hang when contexts pile up.
    let stale = false, lastNew = 0;
    document.addEventListener('visibilitychange', () => { if (document.hidden) stale = true; else if (AC && AC.state !== 'running') AC.resume().catch(() => {}); });
    window.addEventListener('pagehide', () => { stale = true; });
    function wake() {
        try {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            const now = Date.now();
            if (AC && AC.state !== 'running' && stale && now - lastNew > 3000) { try { AC.close().catch(() => {}); } catch (_) {} AC = null; }
            stale = false;
            if (!AC) { AC = new Ctx(); lastNew = now; }
            if (AC.state !== 'running') AC.resume().catch(() => {});
            const b = AC.createBuffer(1, 1, 22050), s = AC.createBufferSource(); s.buffer = b; s.connect(AC.destination); s.start(0);
        } catch (_) {}
    }
    ['touchend', 'pointerdown', 'keydown'].forEach(ev => document.addEventListener(ev, () => { if (open && (!AC || AC.state !== 'running' || stale)) wake(); }, true));
    // after a reload the panel is open but audio is still locked until the first click/tap
    function unlockOnGesture() {
        const go = () => { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume().catch(() => {}); } catch (_) {} relabel(); };
        document.addEventListener('pointerdown', go, { once: true, capture: true });
        document.addEventListener('keydown', go, { once: true, capture: true });
    }
    function show(fromUrl) {
        open = true; window.__speakOpen = true; panel.hidden = false; btn.setAttribute('aria-pressed', 'true');
        syncUrl();
        if (fromUrl) unlockOnGesture();
        try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume().catch(() => {}); } catch (_) {}
        relabel();
        load().then(() => drawRest()).catch(() => { elHint.textContent = 'Could not load the synthesizer.'; });
    }
    function close() {
        open = false; window.__speakOpen = false; panel.hidden = true; btn.setAttribute('aria-pressed', 'false');
        syncUrl();
        stop(); mark(null);
    }
    function stop() { if (src) { try { src.stop(); } catch (_) {} src = null; } cancelAnimationFrame(raf); }
    function mark(el) {
        document.querySelectorAll('.sp-speaking').forEach(x => x.classList.remove('sp-speaking'));
        if (el) el.classList.add('sp-speaking');
    }
    function drawRest() {
        if (!window.VocalTract || !window.IPASynth) return;
        const p = window.IPASynth.plan('');
        window.VocalTract.draw(canvas, window.IPASynth.sample(p, 0), { time: 0, labels: {} });
    }

    // The strip under the mouth: the word's own samples, analysed once (no AnalyserNode, so it
    // also moves when the phone is muted). Short-time spectra every 5 ms, 512-point FFT.
    function fft(re, im) {
        const n = re.length;
        for (let i = 1, j = 0; i < n; i++) { let b = n >> 1; for (; j & b; b >>= 1) j ^= b; j ^= b; if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; } }
        for (let len = 2; len <= n; len <<= 1) {
            const a = -2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a);
            for (let i = 0; i < n; i += len) {
                let cr = 1, ci = 0;
                for (let k = 0; k < len / 2; k++) {
                    const p = i + k, q = p + len / 2, xr = re[q] * cr - im[q] * ci, xi = re[q] * ci + im[q] * cr;
                    re[q] = re[p] - xr; im[q] = im[p] - xi; re[p] += xr; im[p] += xi;
                    const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t;
                }
            }
        }
    }
    function analyse(x, fs) {
        const N = 512, hop = Math.round(fs * .005), bins = Math.min(N / 2, Math.round(7500 / fs * N));
        const win = new Float32Array(N); for (let i = 0; i < N; i++) win[i] = .5 - .5 * Math.cos(2 * Math.PI * i / N);
        const frames = [], re = new Float32Array(N), im = new Float32Array(N);
        let top = -200;
        for (let s0 = -N / 2; s0 < x.length - N / 2; s0 += hop) {
            for (let i = 0; i < N; i++) { const v = x[s0 + i]; re[i] = (v || 0) * win[i]; im[i] = 0; }
            fft(re, im);
            const f = new Float32Array(bins);
            for (let b = 0; b < bins; b++) { f[b] = 10 * Math.log10(re[b] * re[b] + im[b] * im[b] + 1e-10); if (f[b] > top) top = f[b]; }
            frames.push(f);
        }
        // bar bands: 24, log-spaced 90-7500 Hz
        const edges = []; for (let k = 0; k <= 24; k++) edges.push(Math.max(1, Math.round(90 * Math.pow(7500 / 90, k / 24) / fs * N)));
        return { frames, top, hop: hop / fs * 1000, bins, edges, img: null, lev: new Float32Array(24), cap: new Float32Array(24), last: 0 };
    }
    const heat = v => {   // 0..1 → dark blue, violet, orange, pale yellow
        const st = [[16, 20, 28], [40, 50, 140], [160, 60, 160], [240, 120, 60], [255, 240, 170]];
        const x = Math.max(0, Math.min(1, v)) * 4, i = Math.min(3, Math.floor(x)), f = x - i;
        return st[i].map((c, k) => Math.round(c + (st[i + 1][k] - c) * f));
    };
    function gramImage(sp, W, H) {
        const img = new ImageData(W, H), d = img.data, n = sp.frames.length;
        for (let x = 0; x < W; x++) {
            const fr = sp.frames[Math.min(n - 1, Math.floor(x / W * n))];
            for (let y = 0; y < H; y++) {
                const b = Math.min(sp.bins - 1, Math.floor((1 - y / H) * sp.bins));
                const [r, g, bl] = heat((fr[b] - (sp.top - 55)) / 55), o = (y * W + x) * 4;
                d[o] = r; d[o + 1] = g; d[o + 2] = bl; d[o + 3] = 255;
            }
        }
        return img;
    }
    // t: ms into the word, or null when nothing is playing
    function drawSpec(t) {
        if (!specCv) return;
        const c = specCv.getContext('2d'), W = specCv.width, H = specCv.height;
        c.fillStyle = '#10141c'; c.fillRect(0, 0, W, H);
        if (!spec) return;
        const now = performance.now(), dt = Math.min(100, now - (spec.last || now)); spec.last = now;
        if (specMode === 'gram') {
            if (!spec.img) spec.img = gramImage(spec, W, H);
            c.putImageData(spec.img, 0, 0);
            if (t != null && plan) {
                const x = Math.min(W - 1, t / (spec.frames.length * spec.hop) * W);
                c.fillStyle = 'rgba(255,255,255,.85)'; c.fillRect(x - 1, 0, 2, H);
            }
            return;
        }
        const fr = t != null ? spec.frames[Math.min(spec.frames.length - 1, Math.floor(t / spec.hop))] : null;
        const nb = 24, gap = 3, bw = (W - gap * (nb + 1)) / nb;
        for (let k = 0; k < nb; k++) {
            let m = -200; if (fr) for (let b = spec.edges[k]; b <= Math.max(spec.edges[k], spec.edges[k + 1] - 1) && b < spec.bins; b++) m = Math.max(m, fr[b]);
            const target = fr ? Math.max(0, Math.min(1, (m - (spec.top - 60)) / 60)) : 0;
            // fast attack, slow fall; caps hang, then drop
            spec.lev[k] = target > spec.lev[k] ? target : Math.max(target, spec.lev[k] - dt / 400);
            spec.cap[k] = Math.max(spec.lev[k], spec.cap[k] - dt / 900);
            const x = gap + k * (bw + gap), h = spec.lev[k] * (H - 6), [r, g, b] = heat(.3 + .7 * k / nb);
            c.fillStyle = `rgb(${r},${g},${b})`; c.fillRect(x, H - h, bw, h);
            if (spec.cap[k] > .02) { c.fillStyle = 'rgba(255,255,255,.8)'; c.fillRect(x, H - spec.cap[k] * (H - 6) - 4, bw, 2); }
        }
    }

    function nameOf(el) {
        const n = el.querySelector('.name') || (el.closest('.lang-label, .globe-label') || el).querySelector('.name');
        if (n) return n.textContent.trim();
        const panelH = el.closest('[data-code]') && el.closest('[data-code]').querySelector('h2');   // a row in the language panel
        return panelH ? panelH.textContent.trim() : '';
    }

    function say(el) {
        lastEl = el;
        const ipa = (el.getAttribute('data-ipa') || '').trim();
        elWord.textContent = el.getAttribute('data-word') || '';
        elIpa.textContent = ipa && ipa !== '—' ? ipa : '';
        elName.textContent = nameOf(el);
        mark(el);
        if (!ipa || ipa === '—') { elIpa.textContent = T('none'); stop(); spec = null; drawSpec(null); return; }
        load().then(() => {
            if (lastEl !== el || !open) return;
            if (!window.IPASynth || !window.VocalTract) return;
            stop();
            const S = window.IPASynth;
            const code = el.getAttribute('data-code') || (el.closest('[data-code]') && el.closest('[data-code]').getAttribute('data-code')) || '';
            plan = S.plan(ipa, { lang: code });   // the language's intonation profile
            const out = S.render(plan, { voice: voiceSel.value });
            if (!AC || AC.state === 'closed') AC = new (window.AudioContext || window.webkitAudioContext)();
            if (AC.state !== 'running') AC.resume().catch(() => {});
            spec = analyse(out.samples, out.fs);
            const buf = AC.createBuffer(1, out.samples.length, out.fs);
            buf.getChannelData(0).set(out.samples);
            src = AC.createBufferSource(); src.buffer = buf; src.connect(AC.destination);
            startAt = AC.currentTime + .02; src.start(startAt);
            const me = src, wall = performance.now();
            src.onended = () => { if (src === me) src = null; };
            const loop = () => {
                if (!open || plan == null) return;
                // a context that never starts (iOS during a call) keeps its clock at 0: stop drawing
                if (performance.now() - wall > plan.T + 2000) return;
                const t = Math.max(0, (AC.currentTime - startAt) * 1000);
                const end = t >= plan.T;
                if (!end || !loop.done) {
                    const st = S.sample(plan, Math.min(t, plan.T)), ph = st.phase;   // the segment tells the drawing where the friction is
                    window.VocalTract.draw(canvas, st, { time: performance.now(), seg: ph && ph.seg >= 0 ? plan.segs[ph.seg] : null, phase: ph, labels: {} });
                    loop.done = end;
                }
                drawSpec(end ? null : t);   // after the word the bars fall and the spectrogram stays
                if (!end || (specMode === 'bars' && spec.cap.some(v => v > .02))) raf = requestAnimationFrame(loop);
            };
            cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
        }).catch(() => { elHint.textContent = 'Could not load the synthesizer.'; });
    }

    function boot() {
        build();
        let want = false;
        try { want = new URLSearchParams(location.hash.slice(1)).get('speak') === '1' || new URLSearchParams(location.search).get('speak') === '1'; } catch (_) {}
        if (want) show(true);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
