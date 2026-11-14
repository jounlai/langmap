# Review 743 — rally 2026-11-14, round 8, accessibility (all pages; 15 patches)

Applied: Time Map Escape closes a calendar popup / the Details sheet (a closed #trivia-modal kept aria-modal="true" and matched
every check); the pronunciation panel closes one layer per Escape (it closed the language panel or word picker above it too and
stepped Back twice), speaks a label reached with Tab, returns focus to its button when closed, and sits next to its button in
Tab order (was 67 / 39 stops away); the spoken word keeps the label's language; Name/Time Map popups are named dialogs and the
Time Map moves focus into them; contrast fixes (ipa_synth Speak button in dark mode 2.48 → 7.11:1, Language-of-the-day ✕, PWA
bar ✕); the Language-of-the-day bar stays while hovered or focused; progress rows toggle with a real button; zoom buttons say
when they are at the limit (aria-disabled); changelog month nav marks the current month; the route blink is a still ring under
reduced motion.
Held: map flights and smooth scroll ignore prefers-reduced-motion (AAA, design call); Language-of-the-day bar late in Tab order
and covering phone buttons; keyboard speech for compare cells and panel rows; layout at 400 % zoom.
