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
    const V = '?v=10';
    const BASE = '/ipa_synth/';
    const STR = {
        en: { open: 'Pronunciation', close: 'Close', hintHover: 'Point at a word on the map to hear it.', hintTap: 'Tap a word on the map to hear it.',
              note: 'Synthesized from the IPA by rule: an approximation, not checked by native speakers.', none: 'No IPA for this word.', male: 'male', female: 'female', replay: 'Replay' },
        ja: { open: '発音', close: '閉じる', hintHover: '地図の単語にマウスを重ねると読み上げます。', hintTap: '地図の単語をタップすると読み上げます。',
              note: 'IPAから規則で合成した近似音です。ネイティブによる確認はしていません。', none: 'この単語にはIPAがありません。', male: '男声', female: '女声', replay: 'もう一度' },
        ko: { open: '발음', close: '닫기', hintHover: '지도의 단어에 마우스를 올리면 읽어 줍니다.', hintTap: '지도의 단어를 누르면 읽어 줍니다.',
              note: 'IPA를 규칙으로 합성한 근사음입니다. 원어민 확인은 거치지 않았습니다.', none: '이 단어에는 IPA가 없습니다.', male: '남성', female: '여성', replay: '다시 듣기' },
        zh: { open: '发音', close: '关闭', hintHover: '将鼠标移到地图上的词语即可朗读。', hintTap: '点按地图上的词语即可朗读。',
              note: '根据 IPA 按规则合成的近似音，未经母语者核对。', none: '这个词没有 IPA。', male: '男声', female: '女声', replay: '重播' },
    };
    const lang = () => {
        const l = (document.documentElement.lang || 'en').toLowerCase();
        return STR[l.slice(0, 2)] ? l.slice(0, 2) : 'en';
    };
    const T = k => (STR[lang()] || STR.en)[k] || STR.en[k];
    const canHover = () => window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;

    let open = false, loaded = null, AC = null, src = null, plan = null, startAt = 0, raf = 0, hoverTimer = 0, lastEl = null;
    let panel, canvas, elWord, elIpa, elName, elHint, btn, voiceSel;

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
    .speak-panel .sp-hint { color: #555; margin-top: 6px; }
    .speak-panel .sp-row { display: flex; gap: 6px; margin-top: 6px; align-items: center; }
    .speak-panel .sp-row select, .speak-panel .sp-row button { font: inherit; font-size: 12px; padding: 3px 8px; border: 1px solid #ccc; border-radius: 8px; background: #fff; color: #222; cursor: pointer; }
    .speak-panel .sp-row select { width: auto; min-width: 0; max-width: 50%; flex: 0 1 auto; height: auto; }
    .speak-panel .sp-row button { width: auto; flex: 0 0 auto; white-space: nowrap; }
    .speak-panel .sp-note { color: #8a8a8a; font-size: 10.5px; margin-top: 6px; }
    .lang-label.sp-speaking, .globe-label.sp-speaking { outline: 2px solid #1a73e8; outline-offset: 2px; border-radius: 4px; }
    @media (max-width: 600px) {
        .speak-panel { left: 8px; right: 8px; width: auto; bottom: max(28px, env(safe-area-inset-bottom)); padding: 8px 10px; }
        .speak-panel canvas { width: 96px; height: 120px; flex-basis: 96px; }
        .speak-panel .sp-note { display: none; }
    }
    @media (prefers-color-scheme: dark) {
        html[data-theme="dark"] .speak-panel { background: rgba(33,36,40,.96); color: #e8e6e3; border-color: #3a3d42; }
    }`;

    const ICON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9.5a3.5 3.5 0 0 1 0 5"/><path d="M18.5 7a7 7 0 0 1 0 10"/></svg>';

    function load() {
        if (loaded) return loaded;
        const add = f => new Promise((res, rej) => { const s = document.createElement('script'); s.src = BASE + f + V; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
        loaded = (window.IPASynth ? Promise.resolve() : add('engine.js')).then(() => window.VocalTract ? null : add('tract.js'));
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
            + '<div class="sp-hint"></div><div class="sp-row"><select class="sp-voice"><option value="female"></option><option value="male"></option></select><button type="button" class="sp-replay"></button></div>'
            + '<div class="sp-note"></div>';
        document.body.appendChild(panel);
        canvas = panel.querySelector('canvas');
        elWord = panel.querySelector('.sp-word'); elIpa = panel.querySelector('.sp-ipa'); elName = panel.querySelector('.sp-name'); elHint = panel.querySelector('.sp-hint');
        voiceSel = panel.querySelector('.sp-voice');
        try { voiceSel.value = localStorage.getItem('lm_speak_voice') || 'female'; } catch (_) {}
        voiceSel.addEventListener('change', () => { try { localStorage.setItem('lm_speak_voice', voiceSel.value); } catch (_) {} if (lastEl) say(lastEl); });
        panel.querySelector('.sp-close').addEventListener('click', close);
        panel.querySelector('.sp-replay').addEventListener('click', () => { if (lastEl) say(lastEl); });
        document.addEventListener('keydown', e => { if (open && e.key === 'Escape') close(); });
        relabel();
        new MutationObserver(relabel).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

        // label events: capture phase, so a tap can be taken before the map's own handler opens the popup
        const labelOf = t => t && t.closest && t.closest('[data-ipa]');
        document.addEventListener('click', e => {
            if (!open || canHover()) return;
            const el = labelOf(e.target); if (!el) return;
            e.stopPropagation(); e.preventDefault();
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
        voiceSel.options[0].textContent = T('female'); voiceSel.options[1].textContent = T('male');
        elHint.textContent = canHover() ? T('hintHover') : T('hintTap');
        panel.querySelector('.sp-note').textContent = T('note');
    }

    function show() {
        open = true; panel.hidden = false; btn.setAttribute('aria-pressed', 'true');
        try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); } catch (_) {}
        load().then(() => drawRest()).catch(() => { elHint.textContent = 'Could not load the synthesizer.'; });
    }
    function close() {
        open = false; panel.hidden = true; btn.setAttribute('aria-pressed', 'false');
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

    function nameOf(el) {
        const n = el.querySelector('.name') || (el.closest('.lang-label, .globe-label') || el).querySelector('.name');
        return n ? n.textContent.trim() : '';
    }

    function say(el) {
        lastEl = el;
        const ipa = (el.getAttribute('data-ipa') || '').trim();
        elWord.textContent = el.getAttribute('data-word') || '';
        elIpa.textContent = ipa && ipa !== '—' ? ipa : '';
        elName.textContent = nameOf(el);
        mark(el);
        if (!ipa || ipa === '—') { elIpa.textContent = T('none'); stop(); return; }
        load().then(() => {
            if (lastEl !== el || !open) return;
            stop();
            const S = window.IPASynth;
            plan = S.plan(ipa);
            const out = S.render(plan, { voice: voiceSel.value });
            if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)();
            if (AC.state === 'suspended') AC.resume();
            const buf = AC.createBuffer(1, out.samples.length, out.fs);
            buf.getChannelData(0).set(out.samples);
            src = AC.createBufferSource(); src.buffer = buf; src.connect(AC.destination);
            startAt = AC.currentTime + .02; src.start(startAt);
            const me = src;
            src.onended = () => { if (src === me) src = null; };
            const loop = () => {
                if (!open || plan == null) return;
                const t = Math.max(0, (AC.currentTime - startAt) * 1000);
                window.VocalTract.draw(canvas, S.sample(plan, Math.min(t, plan.T)), { time: performance.now(), labels: {} });
                if (t < plan.T && src === me) raf = requestAnimationFrame(loop);
            };
            cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
