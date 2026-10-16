import json,sys,statistics as st
def pt(rows,R=10):
    by={}
    for r in rows: by.setdefault(r['seed'].rsplit('-',1)[0],[]).append(r)
    res={'D20':[],'D30':[],'clear':[]};tot=[]
    for s,rs in by.items():
        rs.sort(key=lambda r:r['idx']);cum=0;got={}
        for r in rs:
            cum+=r['day']
            if r['day']>=20 and 'D20' not in got:got['D20']=(r['idx']+1,cum)
            if r['reach'] and 'D30' not in got:got['D30']=(r['idx']+1,cum)
            if r['win'] and 'clear' not in got:got['clear']=(r['idx']+1,cum)
        tot.append(cum)
        for k in res:res[k].append(got.get(k))
    out=[]
    for k,v in res.items():
        hit=[x for x in v if x];p=len(hit)/len(v)
        out.append(f"{k}: {p*100:.0f}% 10판안" + (f", 판 중앙 {st.median(x[0] for x in hit):.0f} · 누적일 중앙 {st.median(x[1] for x in hit):.0f}" if hit else ""))
    return ' | '.join(out)+f" | 10판 누적일 {st.median(tot):.0f}"
for f in sys.argv[1:]:
    d=json.load(open(f))['arms']
    for k,a in d.items():
        if '/traj/' in k: print(f.split('/')[-1],k.split('/')[-1],pt(a['rows']))
