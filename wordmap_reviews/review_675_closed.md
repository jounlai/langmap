# Review 675: Wiktionary entries whose own gloss names a concept

2026-11-09. Second pass of the Wiktionary gap search (reviews 670-674). Pass 1 read English translation tables; this pass read the all-language kaikki raw dump (first ~72% of it, the download was still running) and took entries whose first gloss in one of their first three senses is the concept's headword, for rows whose cell is empty and that pass 1 had not already raised (~/langmap-work/wikt1108/match2p.py, filt2.py).

Leads: 1165 lines, 955 cells; after dropping labelled senses (archaic, rare, slang, ...), case mismatches (Turkey the country against turkey the bird) and the wrong senses of right and tear: 1058 lines, 903 cells. Three draft agents (d, e, f) checked each lead on the word's own entry and drafted 648 cells; skips with reasons are in d/e/f log.md.

Applied: 644 cells in 278 rows. Most: wife 79, thousand 44, week 39, soap 39, money 39, Saturday 38, yellow 37, tobacco 35.

Coordinator calls:
- Dropped: Mon Sunday and Shan Saturday and Sunday (bare day names, while the rows write day + name); Yi yellow ꏂ (also 'gold', and the row's colours carry a- prefix); Old Nubian wife ⲉⲧ̅ⲧ- (bound form, unsure IPA); Bambara thousand bà (waa may be the everyday word).
- Marshallese yellow iaļo (from English) routed plain, as Tok Pisin and Bislama are.
- Western Yugur thousand written mïŋ, the row's spelling of ɯ.
- Kabardian Sunday 'God day' (lord) and week from Sunday kept as sourced; the Adyghe row (Sunday plain, week other) may need the same reading later.
- Pao tomorrow apostrophe made ʼ to match the row.
- Notes with Proto-Slavic forms rewritten so they do not mix Latin and Cyrillic letters.
- 21 new same-form pairs accepted as polysemy (Setswana madi blood/money, Ewe agbalẽ book/paper, Salar gece night/yesterday, ...); lock updated.

Parity budgets raised for nine partial words: the new parents expose koi, nrf_gg, smj, sms, lij_t, prs, wae, gsw_w, gsw_als. Skipped Guernsey and Walser forms in the logs are leads for those rows.

Left: the last ~28% of the dump (pass 2b); Dakota leads need a spelling mapping (ą/į/ų, x, ch against the row's aŋ, ȟ, č).

Addendum: the seven Dakota leads agent d held (entries in the ą/į/ų, x, c spelling) were written in the row's spelling (aŋ/iŋ/uŋ, ȟ, č): sunflower waȟčázi, thunder waŋkíŋyaŋ, tobacco čhaŋdí, tomato uŋžíŋžiŋtka, thumb naŋpháhuŋ, dragonfly susbéčha, Milky Way wanáǧithačhaŋku 'ghost road'. Sunflower, thunder and tomato are routed by resemblance to the Lakota cells; tobacco, thumb and dragonfly are plain (no image recorded); the Milky Way gloss gives the road.
