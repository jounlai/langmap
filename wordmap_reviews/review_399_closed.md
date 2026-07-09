# Wordmap review #399 — Indo-Aryan, Iranian, Dravidian, Nuristani + Caucasus (full 25-word audit, 10-thread rally)

## Reviewer self-introduction (ペルソナ自己紹介)
Descriptive/historical linguist specializing in Indo-Iranian and Caucasian languages, working from Turner's Comparative Dictionary of Indo-Aryan, Klimov's Etymological Dictionary of the Kartvelian Languages, and standard Nakh-Daghestanian and Dravidian reference grammars.

## Issues found

### xmf (Mingrelian) — `house` — wrong-sense [high]
- Current: `ოშქური` /oʃkʼuri/
- Corrected: `ოხორი` /oxori/
- Rationale: ოშქური / uškuri is the Mingrelian word for 'apple', not 'house'. Mingrelian for 'house' is ოხორი (oxori) — exactly the form correctly supplied for its sister language Laz in this same file (line 57). Clear semantic/lexeme error.

### gbm (Garhwali) — `mother` — wrong-sense [medium]
- Current: `ब्वारी` /bʷaːriː/
- Corrected: `बोई` /boi/
- Rationale: ब्वारी (bwari) means 'daughter-in-law / bride' throughout Central Pahari, not 'mother'. Garhwali 'mother' is बोई (boi) / ब्वे, cf. the Kumaoni entry's ईजा for the same concept. Kinship-term confusion.

### rhg (Rohingya) — `eat` — ipa-surface-mismatch [medium]
- Current: `háwa` /kʰaowa/
- Corrected: `háwa` /haːwa/
- Rationale: The surface form 'háwa' begins with h and has no velar; the IPA /kʰaowa/ was evidently copied from the adjacent Bengali row (eat = খাওয়া /kʰaoa/). Rohingya has shifted initial kh- to h-, so the form is realized /haːwa/. The kʰ cannot correspond to this surface.

## Domain summary
Reviewed all 84 entries. Data quality is high; most apparent anomalies are deliberate dialect phonology (e.g., Persian/Lurish 'xordan' for both eat/drink, Avar кь=/tɬʼ/, Ossetian labialization) which I left untouched. Three confident genuine errors: (1) Mingrelian 'house' is given as ოშქური, which actually means 'apple' — should be ოხორი (as correctly shown for sibling Laz); (2) Garhwali 'mother' is given as ब्वारी, which means 'daughter-in-law/bride' — should be बोई; (3) Rohingya 'eat' surface háwa carries an IPA /kʰaowa/ copied from Bengali, not matching the h-initial surface (correct /haːwa/). Additional note not reported as findings: the Yaghnobi (yag) row's animal/nature vocabulary looks broadly unreliable, but I could not cite confident replacements for this poorly-documented language and declined to fabricate corrections.

## Worker response (作業者)
Findings: 3 · applied 3 · rejected 0 · skipped 0. All flagged cells verified against the data before applying; none of the flagged values originated in a prior deliberate fix (all came from bulk data-creation commits), so no manual correction was overwritten. Deliberate dialect phonology was explicitly preserved. `node validate_wordmap_data.js` passing.

**File status: CLOSED**