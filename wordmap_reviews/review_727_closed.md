# Review 727 — American English flap (owner ear report, 2026-11-13)

Owner: 「アメリカ英語および方言の t の発音。日本語のラ行のように聞こえる現象が再現されてない」.

Data: en_us, en_app and most en_south / en_aave / en_ca / en_au cells already wrote the flap ɾ (water ˈwɔɾɚ, tomato
təˈmeɪɾoʊ). Still plain t, played as a burst: butter en_aave, en_south (ˈbʌtə → ˈbʌɾə), en_au (ˈbɐtə → ˈbɐɾə); Saturday
en_aave, en_south (ˈsætədeɪ → ˈsæɾədeɪ), en_au (→ ˈsæɾədæɪ); computer en_ca (kəmˈpjuːtɚ → kəmˈpjuːɾɚ), en_au (→ kəmˈpjʉːɾə).
Name Map US English: Peter ˈpitɚ → ˈpiɾɚ, Sita ˈsiːtə → ˈsiːɾə. Not changed: cotton (glottal stop before n), twenty (nt, cited
with t), jet lag (word-final t), en_nz (the row writes t throughout).
Guard: tools/flap_check.js ("American English flap written ɾ" in check_all).

Synth: measured, not changed. Commons en-us butter / matter / pretty: the flap dips 17-19 dB for ~35 ms; the engine's tap
(AV .35, 24 ms) dips 15-17 dB for ~30 ms (~/langmap-work/flap1113/dip.js). A deeper tap (AV .15) was tried and overshot to
22-24 dB, so it was reverted; only a comment with the measurement was added to engine.js.
