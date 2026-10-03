// Support landmark read of tools/measure-v2100.cjs output - reads JSON only, plays nothing.
//   node tools/measure-v2100-relic-landmark.cjs <v2100.json>
// landmark read: owners of X (bought on day d) vs runs alive past day d without X. JSON only.
const r=require(require('node:path').resolve(process.argv[2])),p=x=>(100*x).toFixed(1);
const rows=[...r.arms['after/fresh/reader/none'].rows,...r.arms['after/fresh/expert/none'].rows];
const ok=x=>x.all[0]/Math.max(1,x.all[1]);
const ids=[...new Set(rows.flatMap(x=>x.relics.map(([id])=>id)))];
const out=[];
for(const id of ids){
 const own=rows.map(x=>({x,d:(x.relics.find(([i])=>i===id)||[])[1]})).filter(o=>o.d!==undefined);
 if(own.length<40)continue;
 let dReach=0,dWin=0,w=0;
 // match each owner to non-owners alive at its purchase day (day reached > d)
 const byDay={};for(const o of own)byDay[o.d]=(byDay[o.d]||0)+1;
 for(const [d,cnt] of Object.entries(byDay)){const D=+d;
  const o=own.filter(q=>q.d===D).map(q=>q.x),c=rows.filter(x=>x.day>D&&!x.relics.some(([i])=>i===id));if(!c.length)continue;
  const m=(a,f)=>a.reduce((v,x)=>v+f(x),0)/a.length;
  dReach+=cnt*(m(o,x=>x.reach)-m(c,x=>x.reach));dWin+=cnt*(m(o,x=>x.win)-m(c,x=>x.win));w+=cnt;}
 out.push({id,n:own.length,day:own.reduce((v,o)=>v+o.d,0)/own.length,reach:dReach/w,win:dWin/w});}
out.sort((a,b)=>b.win-a.win);
console.log('relic landmark (fresh reader+expert, n='+rows.length+'): owners vs runs alive at the same purchase day without it');
for(const o of out)console.log(o.id.padEnd(16),'보유 '+String(o.n).padStart(4),'구매일 '+o.day.toFixed(1).padStart(4),'D30 '+(o.reach>=0?'+':'')+p(o.reach).padStart(5)+'%p','클리어 '+(o.win>=0?'+':'')+p(o.win).padStart(5)+'%p');
