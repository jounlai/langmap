#!/usr/bin/env python3
# Review #430 Phase 4: fixes for double-quoted-key entries (newer format that the
# single-quote appliers skipped). Exact-string replacements, verified before write.
import sys
APPLY='--apply' in sys.argv
data=open('wordmap_data.js').read()
meta=open('wordmap_meta.js').read()

# (file, old, new) — each old must be unique
EDITS=[
 # --- acw cluster: entry description already says Hijazi/Saudi/11M; fields lagged ---
 ('data','"acw": { "name": "Omani Arabic (Hijazi-Omani)", "native": "العربية العمانية (الحجازية)", "lat": 23.59, "lng": 58.41 }',
         '"acw": { "name": "Hijazi Arabic", "native": "الحجازية", "lat": 21.49, "lng": 39.19 }'),
 ('meta','speakers:"~2–3M (Oman)"','speakers:"~11M (Hejaz, Saudi Arabia)"'),
 ('meta','countries:"Oman", official:"Co-official in Oman alongside Modern Standard Arabic"',
         'countries:"Saudi Arabia (Hejaz: Jeddah, Mecca, Medina, Taif, Yanbu)", official:"No (Modern Standard Arabic is the official written standard)"'),
 # acw scriptTags Latin -> Arabic (its word forms are Arabic script)
 ('meta','script:"Arabic (native); Latin romanization in academic contexts", scriptTags:[\'Latin\']',
         'script:"Arabic (native); Latin romanization in academic contexts", scriptTags:[\'Arabic\']'),
 # --- ar_ps / ar_jo: word forms are Arabic script, not Latin (anchored on unique official text) ---
 ('meta','governance contexts", script:"Latin", scriptTags:[\'Latin\']',
         'governance contexts", script:"Arabic", scriptTags:[\'Arabic\']'),
 ('meta','Modern Standard Arabic is official)", script:"Latin", scriptTags:[\'Latin\']',
         'Modern Standard Arabic is official)", script:"Arabic", scriptTags:[\'Arabic\']'),
 # --- cro coordinate: Crow reservation is south-central Montana, not 47.5N ---
 ('data','"cro": { "name": "Crow", "native": "Apsáalooke", "lat": 47.5, "lng": -107.5 }',
         '"cro": { "name": "Crow", "native": "Apsáalooke", "lat": 45.6, "lng": -107.5 }'),
 # --- qxs speakers: order-of-magnitude error (Ethnologue ~81,300) ---
 ('meta','speakers:"~0.8–1.5K"','speakers:"~80–100K"'),
 # --- zdj: Ngazidja Comorian is Grande Comore; Mayotte is a different variety ---
 ('meta','speakers:"~800K (Comoros) + ~300K (Mayotte)"','speakers:"~800K (Grande Comore, Comoros)"'),
 # --- khw: align header with description/Ethnologue (~300–380K) ---
 ('meta','speakers:"~50–80K (Chitral)"','speakers:"~300–380K"'),
 # --- gon family: Gondi is South-Central Dravidian, not Central ---
 ('meta','family:"Dravidian (Central)"','family:"Dravidian (South-Central)"'),
]

results=[]
for f,old,new in EDITS:
    buf = data if f=='data' else meta
    n=buf.count(old)
    if n!=1:
        results.append((old[:45],f'COUNT={n}')); continue
    if f=='data': data=data.replace(old,new,1)
    else: meta=meta.replace(old,new,1)
    results.append((old[:45],'OK'))

bad=[r for r in results if r[1]!='OK']
for r in results: print(f"  {r[1]:9} {r[0]}")
if APPLY and not bad:
    open('wordmap_data.js','w').write(data)
    open('wordmap_meta.js','w').write(meta)
    print("WROTE")
elif APPLY: print("NOT WRITING — failures above")
else: print("(dry run)")
