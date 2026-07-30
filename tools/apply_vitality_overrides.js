#!/usr/bin/env python3
# Review #430 vitality phase: insert explicit meta.vitality for languages whose
# count-derived value overclaims safety vs UNESCO/Ethnologue or the entry's own
# description. Values are the auditor's vetted corrected_value (adversarial verify).
import sys, re
APPLY='--apply' in sys.argv
META='wordmap_meta.js'
meta=open(META).read()

# code -> vitality (auditor corrected_value)
OVERRIDES={
 'krl':'definitely-endangered',  # own description states UNESCO definitely endangered
 'mdf':'definitely-endangered',  # own description states UNESCO definitely endangered
 'myv':'definitely-endangered',  # own description states UNESCO definitely endangered
 'wa':'definitely-endangered',   # Walloon — UNESCO
 'eml':'definitely-endangered',  # Emilian — UNESCO
 'pms':'definitely-endangered',  # Piedmontese — UNESCO (count-safe overclaims)
 'csb':'definitely-endangered',  # Kashubian — UNESCO
 'nv':'vulnerable',              # Navajo — UNESCO vulnerable
 'mi':'vulnerable',              # Maori — UNESCO vulnerable
 'cab':'vulnerable',             # Garifuna — UNESCO
 'cak':'vulnerable',             # Kaqchikel
 'mzn':'vulnerable',             # Mazandarani — shift to Persian
 'thr':'vulnerable',             # Tharu
 'tji':'severely-endangered',    # Northern Tujia — ~10% of ethnic pop, elderly
}

def insert_vitality(code, val):
    global meta
    anchor="LANG_DATA['%s'].meta = { "%code
    i=meta.find(anchor)
    if i<0:
        anchor2="LANG_DATA['%s'].meta = {"%code
        i=meta.find(anchor2)
        if i<0: return f"NOENTRY {code}"
        # ensure it doesn't already have vitality within first 500 chars
        if re.search(r"vitality:", meta[i:i+500]): return f"HASVIT {code}"
        ins=i+len(anchor2)
        meta=meta[:ins]+f" vitality:'{val}',"+meta[ins:]
        return "OK"
    if re.search(r"vitality:", meta[i:i+500]): return f"HASVIT {code}"
    ins=i+len(anchor)
    meta=meta[:ins]+f"vitality:'{val}', "+meta[ins:]
    return "OK"

res=[(c,insert_vitality(c,v)) for c,v in OVERRIDES.items()]
bad=[x for x in res if x[1]!='OK']
print(f"OK {len([x for x in res if x[1]=='OK'])}/{len(res)}")
for x in bad: print("  FAIL",x)
if APPLY and not bad:
    open(META,'w').write(meta); print("WROTE")
elif APPLY: print("NOT WRITING — failures")
else: print("(dry run)")
