#!/usr/bin/env python3
# One-off applier for review #430 clean single-value meta fixes.
# Span-anchored (bracket-counted per entry) to avoid cross-entry bleed.
import sys, re, json

APPLY = '--apply' in sys.argv

META='wordmap_meta.js'
DATA='wordmap_data.js'
meta=open(META).read()
data=open(DATA).read()

def meta_span(txt, code):
    anchor="LANG_DATA['%s'].meta = {"%code
    i=txt.find(anchor)
    if i<0: return None
    b=txt.find('{', i)
    depth=0; j=b
    instr=None
    while j<len(txt):
        c=txt[j]
        if instr:
            if c=='\\': j+=2; continue
            if c==instr: instr=None
        else:
            if c in "'\"": instr=c
            elif c=='{': depth+=1
            elif c=='}':
                depth-=1
                if depth==0: return (i, b, j)  # start, first-brace, close-brace
        j+=1
    return None

def data_span(txt, code):
    # entry like: \n  code: { ... }, possibly nested braces (meta:{...})
    m=re.search(r"\n  "+re.escape(code)+r": \{", txt)
    if not m: return None
    b=m.end()-1
    depth=0; j=b; instr=None
    while j<len(txt):
        c=txt[j]
        if instr:
            if c=='\\': j+=2; continue
            if c==instr: instr=None
        else:
            if c in "'\"": instr=c
            elif c=='{': depth+=1
            elif c=='}':
                depth-=1
                if depth==0: return (m.start(), b, j)
        j+=1
    return None

def replace_field_in_meta(code, field, oldval, newval):
    global meta
    sp=meta_span(meta,code)
    if not sp: return f"NOSPAN {code}"
    s,b,e=sp
    seg=meta[s:e+1]
    # match field:'old' or field:"old"
    for q in ("'",'"'):
        pat=field+':'+q+oldval+q
        if pat in seg:
            newpat=field+':'+q+newval+q
            newseg=seg.replace(pat,newpat,1)
            meta=meta[:s]+newseg+meta[e+1:]
            return "OK"
    return f"NOMATCH {code} {field} (looking for {oldval!r})"

def replace_coord(code, newlat, newlng):
    global data
    sp=data_span(data,code)
    if not sp: return f"NOSPAN {code}"
    s,b,e=sp
    seg=data[s:e+1]
    m=re.search(r"lat:\s*-?[\d.]+,\s*lng:\s*-?[\d.]+", seg)
    if not m: return f"NOCOORD {code}"
    newseg=seg[:m.start()]+f"lat: {newlat}, lng: {newlng}"+seg[m.end():]
    data=data[:s]+newseg+data[e+1:]
    return "OK"

# (code, field, oldval, newval)
META_FIXES=[
 # countries
 ('sum','countries','Nicaragua','Nicaragua, Honduras'),
 ('anu','countries','Ethiopia','South Sudan, Ethiopia'),
 ('bft','countries','Pakistan','Pakistan (Gilgit-Baltistan), India (Ladakh — Kargil, Leh/Nubra Valley)'),
 ('acu','countries','Ecuador','Ecuador, Peru'),
 ('ess','countries','Russia','USA (Alaska — St. Lawrence Island), Russia (Chukotka)'),
 ('pqm','countries','USA (Maine','USA (Maine), Canada (New Brunswick)'),
 ('gym','countries','Panama','Panama, Costa Rica'),
 ('fi','countries','Finland, Sweden (Finnish-Swedish minority), Estonia (Tornedalian)','Finland, Sweden (Finnish-Swedish minority; Tornedalian Finnish in Norrbotten)'),
 ('arp','countries','USA (Wyoming','USA (Wyoming, Oklahoma)'),
 ('mlq','countries','Mali (south','Guinea (Kankan Region, upper Niger valley)'),
 ('car','countries','Suriname','Suriname, French Guiana, Venezuela, Guyana, Brazil'),
 ('mzh','countries','Argentina','Argentina, Bolivia, Paraguay'),
 ('rwk','countries','Tanzania (Mwanga and Same Districts, Kilimanjaro Region — North Pare mountains)','Tanzania (Arumeru District, Arusha Region — slopes of Mount Meru)'),
 ('rue','countries','Slovakia','Slovakia, Ukraine (Transcarpathia), Poland (Lemkivshchyna), Hungary, Romania, Serbia (Vojvodina)'),
 ('kde','countries','Tanzania','Tanzania, Mozambique'),
 ('ruq','countries','Greece','Greece, North Macedonia'),
 ('zne','countries','South Sudan','South Sudan, DR Congo, Central African Republic'),
 ('bru','countries','Vietnam','Vietnam, Laos'),
 ('mfe','countries','Mauritius, Réunion, Seychelles','Mauritius (also Rodrigues; diaspora communities)'),
 ('dge','countries','Nigeria','Nigeria (Degema LGA — Degema and Usokun-Degema towns, Rivers State)'),
 # family
 ('awa','family','Indo-European (Eastern Indo-Aryan, Hindi belt)','Indo-European (Indo-Aryan, Central zone — Eastern Hindi)'),
 ('sik','family','Sino-Tibetan (Tibeto-Burman, Bodish, Tibetic, Central, Sikkimese-Bumthang)','Sino-Tibetan (Tibeto-Burman, Bodish, Tibetic, Southern/Central Tibetic)'),
 ('mam','family','Mayan (Quichean)','Mayan (Mamean, Greater Mamean)'),
 ('kab','family','Afro-Asiatic (Berber, Northern, Zenati)','Afro-Asiatic (Berber, Northern)'),
 ('lrc','family','Iranian (Northwestern)','Iranian (Southwestern)'),
 ('bsq','family','Niger-Congo (Atlantic-Congo, Kru, Eastern, Bassa-Nyabua subgroup)','Niger-Congo (Atlantic-Congo, Kru, Western, Bassa)'),
 ('lue','family','Atlantic-Congo (Bantu, Luyana)','Atlantic-Congo (Bantu, Chokwe-Luchazi / K.10 group)'),
 # speakers
 ('rwk','speakers','~140K','~190–200K'),
 ('mai','speakers','~40M','~34M'),
 # iso6393 (explicit field, clean swap)
 ('osu','iso6393','osu','osn'),
]

COORD_FIXES=[
 ('hit',40.02,34.61),
 ('tig',16.3,37.8),
 ('dge',4.75,6.75),
 ('uun',23.97,120.97),
 ('rwk',-3.35,36.75),
 ('myn',17.22,-89.62),
]

results=[]
for code,field,ov,nv in META_FIXES:
    r=replace_field_in_meta(code,field,ov,nv)
    results.append((code,field,r))
for code,la,ln in COORD_FIXES:
    r=replace_coord(code,la,ln)
    results.append((code,'coordinate',r))

ok=[x for x in results if x[2]=='OK']
bad=[x for x in results if x[2]!='OK']
print(f"OK: {len(ok)}/{len(results)}")
for x in bad: print("  FAIL:",x)

if APPLY and not bad:
    open(META,'w').write(meta)
    open(DATA,'w').write(data)
    print("WROTE files.")
elif APPLY and bad:
    print("NOT WRITING — fix failures first.")
else:
    print("(dry run — pass --apply to write)")
