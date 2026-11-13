# Name Map review 07 — the held low-confidence frequency downgrades (2026-11-13)

Open item from review 06: 181 downgrades rested on forebears.io alone (living population, 2014), which under-counts names
popular since ~1995. An agent looked for recent-birth or age-resolved data for each: ONS England & Wales 2025 (all names
with 3+ births), INE Spain 2025 (counts and mean age per name, top 50 per birth decade), Bielefeld's German per-name pages,
Meertens Nederlandse Voornamenbank, Polish PESEL newborn list 2021 H1 (via Wayback), Croatian Ministry of Justice newborn
top 50 2024 + 2021 census, IRN Portugal top 20, BabyCenter Brasil 2025, INEGI/CDMX lists, US SSA, Finnish population register,
and INSEE yearly births as republished by meilleursprenoms.com (INSEE itself not fetched).
Decisions (~/langmap-work/left1113/nm/decisions.json):
- Applied 38: 37 downgrades (gb Rama, Lakshmi, Sita, Ganesh → rare, Priya → moderate, Julia → common; en Helen → common;
  es Gabriel, Felipe → common, Abraham, Moisés, Noé, Elías → moderate; de Nikolaus → moderate, Abraham → rare; nl Anton,
  Matthijs → moderate; pl Abraham, Salomon → rare; fr Marguerite, Omar, Fatima, Khadija, Abdallah → moderate, Hussein,
  Salomon → rare; hr Muhamed, Fatima, Alija, Omer, Hasan, Husein, Margareta → moderate; pt_br Moisés → moderate; mx Gabriel,
  Pablo, Isabel → common) and one upgrade, pt Mateus → very-common (IRN 12th among boys).
- Kept 27 where recent births contradict forebears: es Sara, it Matteo and Sara, mx Sofía, pt_br Júlia, Sofia, Mateus
  (recent top 20); fr Sarah, Mohamed, Ali, Aïcha, pl Sara, nl Sofie, pt_br Sara (recent top 100); fr Julie, fi Julia,
  nl Elisabeth (large living stock); de Moses, nl/fr Abraham, fr Constantin, pl Noe, ru Фома (above the rare line);
  es Isaac, fr Matthieu, nl Alexander (low confidence); id Aisyah.
- Unchecked 116 (current band stays): no reachable recent-birth source for id ur hi bn fil am ms sw ha fa ar el ro tr hy;
  Moscow open data blocked; Portugal's full list (502), Hungary's registry unreachable.
Not used: IBGE (connection refused), Brazil civil-registry portal (reCAPTCHA), sites with broken certificates.
