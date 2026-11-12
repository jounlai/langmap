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
    const V = '?v=49';
    const BASE = '/ipa_synth/';
    const STR = {
        en: { open: 'Pronunciation', close: 'Close', hintHover: 'Point at a word on the map, or in a language panel, to hear it.', hintTap: 'Tap a word on the map to hear it; tap it again to open its language.',
              note: 'Synthesized from the IPA by rule: an approximation, not checked by native speakers.', unlock: 'Click anywhere once to turn the sound on.', none: 'No IPA for this word.', male: 'male', female: 'female', child: 'child', replay: 'Replay', spec: 'Left: loudness by pitch band. Right: spectrogram 0-5 kHz (bands are formants), pitch in red, sounds below.' },
        ja: { open: '発音', close: '閉じる', hintHover: '地図や言語の詳細の単語にマウスを重ねると読み上げます。', hintTap: '地図の単語をタップすると読み上げ、もう一度タップすると言語の詳細が開きます。',
              note: 'IPAから規則で合成した近似音です。ネイティブによる確認はしていません。', unlock: '音を出すには、まず画面を一度クリックしてください。', none: 'この単語にはIPAがありません。', male: '男声', female: '女声', child: '子ども', replay: 'もう一度', spec: '左：周波数ごとの強さ。右：スペクトログラム 0〜5 kHz（横の帯がフォルマント）、赤線は声の高さ、下は音の並び。' },
        ko: { open: '발음', close: '닫기', hintHover: '지도나 언어 정보의 단어에 마우스를 올리면 읽어 줍니다.', hintTap: '지도의 단어를 누르면 읽어 주고, 한 번 더 누르면 언어 정보가 열립니다.',
              note: 'IPA를 규칙으로 합성한 근사음입니다. 원어민 확인은 거치지 않았습니다.', unlock: '소리를 켜려면 화면을 한 번 클릭하세요.', none: '이 단어에는 IPA가 없습니다.', male: '남성', female: '여성', child: '어린이', replay: '다시 듣기', spec: '왼쪽: 주파수별 세기. 오른쪽: 스펙트로그램 0~5 kHz(가로 띠가 포먼트), 빨간 선은 음높이, 아래는 소리 순서.' },
        zh: { open: '发音', close: '关闭', hintHover: '将鼠标移到地图或语言详情中的词语上即可朗读。', hintTap: '点按地图上的词语即可朗读，再点一次打开该语言的详情。',
              note: '根据 IPA 按规则合成的近似音，未经母语者核对。', unlock: '请先点击一下页面以开启声音。', none: '这个词没有 IPA。', male: '男声', female: '女声', child: '童声', replay: '重播', spec: '左：各频段的强度。右：语谱图 0–5 kHz（横带为共振峰），红线为音高，下方为音段。' },
    };
    const lang = () => {
        const l = (document.documentElement.lang || 'en').toLowerCase();
        return STR[l.slice(0, 2)] ? l.slice(0, 2) : 'en';
    };
    const T = k => (STR[lang()] || STR.en)[k] || STR.en[k];
    const canHover = () => window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

    let open = false, loaded = null, AC = null, src = null, plan = null, startAt = 0, raf = 0, hoverTimer = 0, lastEl = null;
    let panel, canvas, specCv, spec = null, elWord, elIpa, elName, elHint, btn, voiceSel;

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
    .speak-panel .sp-spec { display: block; width: 100%; height: 72px; margin-top: 10px; cursor: pointer; }
    .speak-panel .sp-spec[hidden], .speak-panel .sp-hint[hidden] { display: none; }
    .speak-panel .sp-hint { color: #555; margin-top: 8px; }
    .speak-panel .sp-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; align-items: center; }
    .speak-panel .sp-row select, .speak-panel .sp-row button { font: inherit; font-size: 12px; padding: 3px 8px; border: 1px solid #ccc; border-radius: 8px; background: #fff; color: #222; cursor: pointer; }
    .speak-panel .sp-row select { width: auto; min-width: 0; flex: 0 1 auto; height: auto; }
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
        .speak-panel .sp-row { margin-top: 5px; gap: 4px; }
        .speak-panel .sp-row select, .speak-panel .sp-row button { font-size: 11px; padding: 2px 6px; }
        .speak-panel .sp-close { width: 28px; height: 28px; }
        .speak-panel .sp-note { display: none; }
        .speak-panel .sp-spec { height: 50px; margin-top: 4px; }
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
            + '<div class="sp-body"><canvas width="128" height="160" aria-hidden="true"></canvas><div class="sp-text"><div class="sp-word" dir="auto"></div><div class="sp-ipa" dir="ltr"></div><div class="sp-name"></div>'
            + '<div class="sp-row"><select class="sp-voice"><option value="female"></option><option value="male"></option><option value="child"></option></select><button type="button" class="sp-replay"></button></div></div></div>'
            + '<canvas class="sp-spec" role="img" hidden></canvas>'
            + '<div class="sp-hint"></div>'
            + '<div class="sp-note"></div>';
        document.body.appendChild(panel);
        canvas = panel.querySelector('canvas');
        specCv = panel.querySelector('.sp-spec');
        specCv.addEventListener('click', () => { if (lastEl) say(lastEl); });
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
    const NB = 40;   // at most this many bar bands; fewer on a narrow strip
    function analyse(x, fs) {
        const N = 512, hop = Math.round(fs * .005), bins = Math.min(N / 2, Math.round(7500 / fs * N));
        const win = new Float32Array(N); for (let i = 0; i < N; i++) win[i] = .5 - .5 * Math.cos(2 * Math.PI * i / N);
        const frames = [], re = new Float32Array(N), im = new Float32Array(N);
        let top = -200;
        for (let s0 = -N / 2; s0 < x.length - N / 2; s0 += hop) {
            for (let i = 0; i < N; i++) { const v = (x[s0 + i] || 0) - .95 * (x[s0 + i - 1] || 0); re[i] = v * win[i]; im[i] = 0; }   // pre-emphasis, as on the synth page
            fft(re, im);
            const f = new Float32Array(bins);
            for (let b = 0; b < bins; b++) { f[b] = 10 * Math.log10(re[b] * re[b] + im[b] * im[b] + 1e-10); if (f[b] > top) top = f[b]; }
            frames.push(f);
        }
        return { frames, top, hop: hop / fs * 1000, bins, binHz: fs / N, gbins: Math.min(bins, Math.round(5000 / fs * N)), edges: null, img: null, lev: new Float32Array(NB), last: 0 };
    }
    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
    // spectrogram 0-5 kHz in grey, as on the IPA synth page; one pixel column per frame, scaled when drawn
    function gramImage(sp, dark) {
        const w = sp.frames.length, h = sp.gbins, off = document.createElement('canvas'); off.width = w; off.height = h;
        const o = off.getContext('2d'), img = o.createImageData(w, h);
        for (let x = 0; x < w; x++) for (let b = 0; b < h; b++) {
            const v = Math.max(0, Math.min(1, (sp.frames[x][b] - sp.top + 60) / 60)), g = dark ? Math.round(v * 235) : Math.round(255 - v * 255);
            const q = ((h - 1 - b) * w + x) * 4; img.data[q] = img.data[q + 1] = img.data[q + 2] = g; img.data[q + 3] = 255;
        }
        o.putImageData(img, 0, 0); return { c: off, dark };
    }
    // the strip: quiet bars on the left, the word's spectrogram with pitch and segments on the right.
    // t: ms into the word, or null when nothing is playing
    function drawSpec(t) {
        if (!specCv || specCv.hidden) return;
        const dpr = window.devicePixelRatio || 1, W = specCv.clientWidth, H = specCv.clientHeight;
        if (!W || !H) return;
        if (specCv.width !== Math.round(W * dpr) || specCv.height !== Math.round(H * dpr)) { specCv.width = Math.round(W * dpr); specCv.height = Math.round(H * dpr); }
        const c = specCv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
        const dark = isDark(), ink = dark ? '#e8e6e3' : '#333', line = dark ? '#3a3d42' : '#e2ddd4';
        c.clearRect(0, 0, W, H);
        const bw = Math.round(W * .3), gx = bw + 8, gw = W - gx, segH = H >= 60 ? 15 : 12, sh = H - segH;
        c.fillStyle = dark ? '#16181b' : '#fff'; c.fillRect(0, 0, bw, H); c.fillRect(gx, 0, gw, H);
        c.strokeStyle = line; c.lineWidth = 1; c.strokeRect(.5, .5, bw - 1, H - 1); c.strokeRect(gx + .5, .5, gw - 1, H - 1);
        c.beginPath(); c.moveTo(gx, sh + .5); c.lineTo(W, sh + .5); c.stroke();
        if (!spec || !plan) return;
        // bars: thin, one colour, fast rise and gentle fall
        const now = performance.now(), dt = Math.min(100, now - (spec.last || now)); spec.last = now;
        const fr = t != null ? spec.frames[Math.min(spec.frames.length - 1, Math.floor(t / spec.hop))] : null;
        // bars: rounded, mirrored about the middle, log-spaced 90-7500 Hz; one every ~4.5 px
        const nb = Math.max(14, Math.min(NB, Math.floor((bw - 8) / 4.5))), step = (bw - 8) / nb, mid = H / 2, bh = H - 10;
        if (!spec.edges || spec.edges.length !== nb + 1) { spec.edges = []; for (let k = 0; k <= nb; k++) spec.edges.push(Math.max(1, Math.round(90 * Math.pow(7500 / 90, k / nb) / spec.binHz))); }
        const gr = c.createLinearGradient(0, mid - bh / 2, 0, mid + bh / 2);
        gr.addColorStop(0, dark ? '#9fc6f5' : '#9cc0ec'); gr.addColorStop(.5, dark ? '#4f8fe0' : '#2e6fb8'); gr.addColorStop(1, dark ? '#9fc6f5' : '#9cc0ec');
        c.fillStyle = dark ? 'rgba(255,255,255,.12)' : 'rgba(46,111,184,.18)'; c.fillRect(4, mid - .5, bw - 8, 1);
        c.fillStyle = gr;
        const bwid = Math.max(1.5, step * .6);
        for (let k = 0; k < nb; k++) {
            let m = -200; if (fr) for (let b = spec.edges[k]; b <= Math.max(spec.edges[k], spec.edges[k + 1] - 1) && b < spec.bins; b++) m = Math.max(m, fr[b]);
            const target = fr ? Math.max(0, Math.min(1, (m - (spec.top - 60)) / 60)) : 0;
            spec.lev[k] = target > spec.lev[k] ? target : Math.max(target, spec.lev[k] - dt / 350);
            const h = Math.max(bwid, spec.lev[k] * bh), x = 4 + k * step + (step - bwid) / 2;
            if (spec.lev[k] > .01) { c.beginPath(); if (c.roundRect) c.roundRect(x, mid - h / 2, bwid, h, bwid / 2); else c.rect(x, mid - h / 2, bwid, h); c.fill(); }
        }
        // spectrogram
        if (!spec.img || spec.img.dark !== dark) spec.img = gramImage(spec, dark);
        const X = tm => gx + Math.min(1, tm / plan.T) * gw;
        c.imageSmoothingEnabled = true;
        c.drawImage(spec.img.c, gx + 1, 1, Math.min(gw - 2, spec.frames.length * spec.hop / plan.T * gw), sh - 1);
        // pitch
        c.strokeStyle = dark ? '#ff7a5c' : '#d0402f'; c.lineWidth = 1.5; c.beginPath();
        let pen = false;
        for (let px = 0; px <= gw; px += 2) {
            const st = window.IPASynth.sample(plan, px / gw * plan.T), y = sh - 2 - (st.level - .5) / 5.5 * (sh - 4);
            if (st.AV > .3) { pen ? c.lineTo(gx + px, y) : c.moveTo(gx + px, y); pen = true; } else pen = false;
        }
        c.stroke();
        // segments
        c.font = (segH - 3) + 'px "Doulos SIL","Charis SIL","Noto Sans",serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
        plan.segs.forEach((s, i) => {
            const ps = plan.phases.filter(p => p.seg === i); if (!ps.length) return;
            const a = X(ps[0].t0), b = X(ps[ps.length - 1].t1);
            c.fillStyle = s.type === 'V' ? 'rgba(46,111,184,.16)' : 'rgba(160,160,160,.16)'; c.fillRect(a + .5, sh + 1, b - a - 1, segH - 2);
            if (b - a >= 5) { c.fillStyle = ink; c.fillText(s.sym, (a + b) / 2, sh + segH / 2 + .5); }
        });
        // playhead
        if (t != null) { c.strokeStyle = dark ? '#6ea8ec' : '#2e6fb8'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(X(t), 0); c.lineTo(X(t), H); c.stroke(); }
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
            elHint.hidden = true; specCv.hidden = false;   // the strip takes the hint's place once a word is heard
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
                if (!end || spec.lev.some(v => v > .01)) raf = requestAnimationFrame(loop);
            };
            cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
        }).catch(() => { elHint.textContent = 'Could not load the synthesizer.'; elHint.hidden = false; specCv.hidden = true; });
    }

    function boot() {
        build();
        let want = false;
        try { want = new URLSearchParams(location.hash.slice(1)).get('speak') === '1' || new URLSearchParams(location.search).get('speak') === '1'; } catch (_) {}
        if (want) show(true);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
