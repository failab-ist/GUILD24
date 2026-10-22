// node ana4.cjs <dir> [patchedDir]: none vs hub@5 vs opsRoom@5 (vs patched opsRoom@5), D5 간 판만
const fs=require('fs'),path=require('path');const [dir,pdir]=process.argv.slice(2);
const L=(d,c)=>JSON.parse(fs.readFileSync(path.join(d,c+'.json')));const b=L(dir,'none');const al=b.map((x,i)=>x.day>=5?i:-1).filter(i=>i>=0);
const med=a=>{a=a.filter(v=>v!=null).sort((p,q)=>p-q);return a.length?a[a.length>>1]:NaN};
const st=a=>{const m=a.length,days=a.reduce((p,x)=>p+x.days,0),fin=a.filter(x=>x.party.length),reach=a.filter(x=>x.day>=30);
 return [['D20',100*a.filter(x=>x.day>=20).length/m,1],['D30',100*reach.length/m,1],['클리어',100*a.filter(x=>x.win).length/m,1],['도달시클리어',reach.length?100*a.filter(x=>x.win).length/reach.length:0,0],
 ['사망/판',a.reduce((p,x)=>p+x.deaths,0)/m,2],['매출/일',a.reduce((p,x)=>p+x.rev,0)/days,0],['D25잔액',med(a.map(x=>x.b25)),0],
 ['원정/일',a.reduce((p,x)=>p+x.dep,0)/days,2],['새손님/일',a.reduce((p,x)=>p+x.npcs,0)/days,3],['재방문/일',a.reduce((p,x)=>p+x.dep-x.npcs,0)/days,2],['희귀+/일',a.reduce((p,x)=>p+x.rare,0)/days,3],
 ['상위4레벨',a.reduce((p,x)=>p+x.top4,0)/m,1],['파티등급',fin.length?fin.reduce((p,x)=>p+x.party.reduce((s,q)=>s+q[0],0)/x.party.length,0)/fin.length:NaN,2],
 ['파티레벨',fin.length?fin.reduce((p,x)=>p+x.party.reduce((s,q)=>s+q[1],0)/x.party.length,0)/fin.length:NaN,1],['전력/마왕',fin.filter(x=>x.pw).length?fin.filter(x=>x.pw).reduce((p,x)=>p+x.pw,0)/fin.filter(x=>x.pw).length:NaN,2],['마왕전 판',fin.length,0]];};
const sets=[['없음',L(dir,'none')],['거점점',L(dir,'relicAt_hub@5')],['작전실',L(dir,'relicAt_opsRoom@5')]];if(pdir)sets.push(['작전실(봇 고침)',L(pdir,'relicAt_opsRoom@5')]);
const S=sets.map(([k,a])=>[k,st(al.map(i=>a[i]))]);
console.log('지표'.padEnd(10)+S.map(x=>x[0].padStart(14)).join(''));
for(let j=0;j<S[0][1].length;j++)console.log(S[0][1][j][0].padEnd(10)+S.map(x=>x[1][j][1].toFixed(x[1][j][2]).padStart(14)).join(''));
