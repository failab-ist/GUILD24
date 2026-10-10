// Detail read of tools/measure-v2100.cjs output (end reasons, outcomes, Boss, visit Wallets, Supports). Reads JSON only, plays nothing.
//   node tools/measure-v2100-detail.cjs <v2100.json>
const r=require(require('node:path').resolve(process.argv[2])),p=(a,b)=>b?(100*a/b).toFixed(1):'-';
const pick=['after/fresh/reader/none','before/fresh/reader/none','after/fresh/investor/none','before/fresh/investor/none','after/fresh/expert/none','before/fresh/expert/none','after/fresh/balanced/none','before/fresh/balanced/none'];
for(const k of pick){if(!r.arms[k])continue;const rs=r.arms[k].rows,n=rs.length;
 const ends={};for(const x of rs){const e=x.win?'클리어':x.reach?'마왕 실패':x.end;ends[e]=(ends[e]||0)+1;}
 const o=[0,1,2,3,4,5].map(i=>rs.reduce((v,x)=>v+x.out[i],0)),tot=o.reduce((a,b)=>a+b,0),env=rs.reduce((v,x)=>v+x.env,0);
 const boss={};for(const x of rs.filter(x=>x.reach)){const b=boss[x.boss]??=[0,0];b[0]+=x.win;b[1]++;}
 const cash=rs.reduce((v,x)=>v+x.cash,0)/n,day=rs.reduce((v,x)=>v+x.day,0)/n;
 console.log('\n'+k,'n',n,'평균 도달일',day.toFixed(1),'현금/일',cash.toFixed(1));
 console.log(' 종료',Object.entries(ends).map(([e,c])=>e.slice(0,14)+' '+p(c,n)).join(' · '));
 console.log(' 결과',['대성공','성공','퇴각','부상','중상','사망'].map((x,i)=>x+' '+p(o[i],tot)).join(' '),'· 환경사고 '+p(env,tot),'· 원정/런 '+(tot/n).toFixed(1));
 console.log(' 마왕',Object.entries(boss).map(([b,[w,c]])=>b+' '+p(w,c)+'%('+c+')').join(' '));
 const W=r.arms[k].wallets;for(const band of [0,1,2,3]){const h=(t)=>W['0|'+band+'|'+t]||[];const st=t=>{const a=h(t),N=a.reduce((x,y)=>x+y,0);let c=0,med=null;for(let i=0;i<a.length;i++){c+=a[i];if(med===null&&c>=N/2)med=i*10;}const below=a.slice(0,7).reduce((x,y)=>x+y,0);return 'n'+N+' 중앙 '+med+'G <70G '+p(below,N)+'%';};
  console.log(' 지갑 band'+band,'연패',st('losing'),'| 그외',st('other'));}
}
// 직업: 구간/노출이 다른 표본을 섞어 단일 직업 승률 순위로 해석하지 않는다.
for(const [key,a] of Object.entries(r.arms))for(const idx of key.includes('/traj/')?[0,4,9]:[0]){
 const rs=a.rows.filter(x=>x.idx===idx&&x.jobs);if(!rs.length)continue;
 console.log('\n직업 '+key+' run'+(idx+1)+' n='+rs.length);
 const ids=[...new Set(rs.flatMap(x=>Object.keys(x.jobs)))];
 for(const id of ids){const js=rs.map(x=>x.jobs[id]).filter(Boolean),sum=k=>js.reduce((v,j)=>v+j[k],0),n=sum('npcs'),exp=sum('exp'),picks=sum('finalPicks');
  console.log(' '+js[0].name+' NPC '+n+' 원정 '+exp+' 성공 '+p(sum('wins'),exp)+'% 전투패배 '+p(sum('combatLoss'),exp)+'% 환경사고 '+p(sum('env'),exp)+'% 사망 '+sum('deaths')
   +' | 첫Lv '+(sum('firstLevel')/n).toFixed(2)+' 종료Lv '+(sum('level')/n).toFixed(2)+' 성장Lv '+(sum('levelGain')/n).toFixed(2)
   +' | 잠재력 '+(sum('potential')/n).toFixed(3)+' 마스터리 '+(sum('mastery')/n).toFixed(2)
   +' | 최종 '+picks+'명 참여 '+sum('finalRuns')+'판 클리어 '+p(sum('finalWins'),sum('finalRuns'))+'% 평균기여 '+(picks?sum('finalPower')/picks:0).toFixed(2)+' 위험부족 '+(picks?sum('finalGap')/picks:0).toFixed(2));}
}
// relics: after fresh reader + expert pooled
for(const k of ['after/fresh/reader/none','before/fresh/reader/none']){if(!r.arms[k])continue;const rs=r.arms[k].rows,n=rs.length,base={reach:rs.reduce((v,x)=>v+x.reach,0)/n,win:rs.reduce((v,x)=>v+x.win,0)/n};
 const by={};for(const x of rs)for(const [id,d] of x.relics){const b=by[id]??={n:0,day:0,reach:0,win:0,s:0,t:0};b.n++;b.day+=d;b.reach+=x.reach;b.win+=x.win;b.s+=x.all[0];b.t+=x.all[1];}
 console.log('\n유물 '+k+' (기준 D30 '+p(base.reach,1)+' 클리어 '+p(base.win,1)+')');
 for(const [id,b] of Object.entries(by).sort((a,b)=>b[1].n-a[1].n))console.log(' '+id.padEnd(16),'보유 '+p(b.n,n).padStart(5)+'% 평균구매일 '+(b.day/b.n).toFixed(1).padStart(4)+' D30 '+p(b.reach,b.n)+' 클리어 '+p(b.win,b.n)+' 일반성공 '+p(b.s,b.t));}
