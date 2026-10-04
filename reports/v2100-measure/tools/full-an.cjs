const r=require(process.argv[2]);const q=(a,p)=>{if(!a.length)return null;const s=[...a].sort((x,y)=>x-y);return s[Math.floor(p*(s.length-1))];};
const mix=d=>(Math.min(d,60)*3+Math.max(0,d-60)*1.5)/60;
const h=d=>d==null?'-':'혼합 '+mix(d).toFixed(1)+'h · 처음 3분 '+(d*3/60).toFixed(1)+'h · 숙련 1~2분 '+(d/60).toFixed(1)+'~'+(d*2/60).toFixed(1)+'h';
for(const [pol,T] of Object.entries(r.acc)){
 const first=T.map(t=>t[0]),avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
 console.log('\n== '+pol+' · 계정 '+T.length+' · 최대 '+r.MAX+'판 · '+r.sec+'s');
 console.log('첫 판: 평균 '+avg(first.map(x=>x[0])).toFixed(1)+'일 (중앙 '+q(first.map(x=>x[0]),.5)+') · 첫 판 클리어 '+(100*avg(first.map(x=>x[1]))).toFixed(1)+'% · 첫 판 시간 '+h(avg(first.map(x=>x[0]))));
 const mile=(name,pred)=>{const hit=T.map(t=>{let d=0;for(let i=0;i<t.length;i++){d+=t[i][0];if(pred(t[i]))return [i+1,d];}return null;});
  const ok=hit.filter(Boolean);console.log(name.padEnd(16)+' 도달 '+ok.length+'/'+T.length+' · 판 중앙 '+(q(ok.map(x=>x[0]),.5)??'-')+' (p25 '+(q(ok.map(x=>x[0]),.25)??'-')+' · p75 '+(q(ok.map(x=>x[0]),.75)??'-')+') · 누적 일 중앙 '+(q(ok.map(x=>x[1]),.5)??'-')+' · 시간 '+h(q(ok.map(x=>x[1]),.5)));};
 mile('첫 클리어',x=>x[1]===1);mile('장식 4칸',x=>x[3]>=4);mile('장식 8종',x=>x[3]>=8);
 mile('마왕 7종 클리어',x=>x[4]>=7);mile('마스터리 21/42',x=>x[2]>=21);mile('마스터리 42/42',x=>x[2]>=42);
 const last=T.map(t=>t.at(-1));console.log('끝난 상태: 마스터리 평균 '+avg(last.map(x=>x[2])).toFixed(1)+'/42 · 판 수 평균 '+avg(T.map(t=>t.length)).toFixed(0)+' · 클리어율 전체 '+(100*avg(T.flat().map(x=>x[1]))).toFixed(1)+'%');
}
