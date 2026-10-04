// Behind adventurers: could a best possible Bag have saved them? Re-computes each recorded departure with the game's own
// formulas (no RNG, no play): actual Bag vs the best Bag from the Items the ORDER could carry that Day.
const {readSave}=require(require('node:path').resolve(__dirname,'../../../tools/save-check.cjs'));const G=globalThis,D=G.DATA,Dn=G.Dungeon;
const LOW={next:()=>0,int:a=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()},FRESH=G.Meta.fresh();
const floor=day=>G.Adventurer.create(LOW,0,day,FRESH).level;
const W=D.balance.combatNoise;
const win=(r,v)=>{const w=W*2+v*2;return Math.max(0,Math.min(1,(.5*w+1-1/r)/w));};
function departLevel(rec){const m=(rec.changes||[]).map(c=>/^Lv\.(\d+) → Lv\.(\d+)$/.exec(c)).find(Boolean);return m?+m[1]:rec.level;}
function evalBag(g,npc,d,pack,fac){const n={...npc,pack};const p=Dn.prepare(n,d,fac);const r=Dn.preparedPower(p.effects)/d.power,w=win(r,p.effects.variance||0);
 const env=Dn.envChance(p.hazard,p.effects.survival),ok=w*(1-env);
 const fd=Dn.failureDeathRisk(n,d,fac).chance*(Dn.fullyPrepared(n,p.effects.fatigueBeforeExpedition)?Dn.PREPARED.factor:1);
 return {r,ok,death:(1-ok)*fd,ready:p.hazards.every(h=>h.defense>=h.threat)};}
const rows=[];
for(const file of process.argv.slice(2)){const sv=readSave(file),s=sv.run,g=new G.Game(sv.account,JSON.parse(JSON.stringify(s)));g.autosave=false;
 for(const n of s.npcs)for(const rec of n.records||[]){if(rec.deep||rec.day>=30)continue;
  const lv=departLevel(rec),fl=floor(rec.day);if(lv>=fl)continue;
  const tier=/ III$/.test(rec.dungeonName)?3:/ II$/.test(rec.dungeonName)?2:1;g.run.day=rec.day;
  const d=g.makeDungeon(rec.dungeon,tier),job=D.jobBy[n.job];
  const stats={};G.Adventurer.keys.forEach((k,i)=>stats[k]=Math.round(job.stats[i]+(lv-1)*job.growth[i]*n.potential));
  const npc={...JSON.parse(JSON.stringify(n)),level:lv,stats,injury:rec.departedInjured?1:0,fatigue:rec.beforeFatigue||0,records:n.records.filter(x=>x.day<rec.day)};
  const fac=s.facilities||[];
  const band=D.rarityBands.find(b=>rec.day<=b.maxDay)||D.rarityBands.at(-1);
  const pool=D.items.filter(it=>G.Meta.itemUnlocked(sv.account,it,rec.day)&&(band.weights?band.weights[it.rarity]>0:true)&&it.category!=='special');
  const slots=G.Adventurer.slots(npc);
  // realistic: Common~Rare only, both Items sold at 정가 within a modest purse (first-visit wallet 180 + Lv x 4 + 50); 50% doubles it
  const W=180+lv*4+50;
  const search=(ok)=>{let best=null;for(let i=0;i<pool.length;i++)for(let j=i;j<pool.length;j++){const a=pool[i],b=pool[j],pack=slots>=2?[a.id,b.id]:[a.id];if(!ok(a,b))continue;const e=evalBag(g,npc,d,pack,fac);if(!best||e.ok-e.death*.5>best.ok-best.death*.5)best={...e,pack};}return best;};
  const best=search(()=>true),real=search((a,b)=>a.rarity<=2&&b.rarity<=2&&a.sell+b.sell<=W),half=search((a,b)=>a.rarity<=2&&b.rarity<=2&&(a.sell+b.sell)*.5<=W);
  const act=evalBag(g,npc,d,rec.items||[],fac);
  rows.push({file:file.split('-').slice(-2).join('-'),day:rec.day,name:n.name,lv,fl,gate:rec.dungeonName,out:rec.outcome,recR:1+(rec.greatMargin??0),act,best,real,half,W});}}
const pct=x=>(100*x).toFixed(0)+'%',avg=(a,f)=>a.reduce((v,x)=>v+f(x),0)/a.length;
console.log('처진 출발 '+rows.length+'회 (출발 레벨 < 그날 신규 최저 레벨)');
for(const x of rows)console.log(`${x.file} D${x.day} ${x.name} Lv${x.lv}/${x.fl} ${x.gate} → ${x.out} | 실제 ${(100*x.act.ok).toFixed(0)}%·사망${(100*x.act.death).toFixed(0)}% | 현실(정가 ${x.W}G 안, 희귀까지) [${x.real?x.real.pack.map(id=>D.itemBy[id].name).join('+'):'-'}] ${x.real?(100*x.real.ok).toFixed(0)+'%·사망'+(100*x.real.death).toFixed(0)+'%':'-'} | 50%로 팔면 ${x.half?(100*x.half.ok).toFixed(0)+'%':'-'} | 영웅까지 ${(100*x.best.ok).toFixed(0)}%`);
const S=(k)=>rows.filter(x=>x[k]);
console.log('\n평균 성공 / 사망: 실제 '+pct(avg(rows,x=>x.act.ok))+' / '+pct(avg(rows,x=>x.act.death))+' | 현실 가방(정가, 희귀까지) '+pct(avg(S('real'),x=>x.real.ok))+' / '+pct(avg(S('real'),x=>x.real.death))+' | 50%로 팔면 '+pct(avg(S('half'),x=>x.half.ok))+' / '+pct(avg(S('half'),x=>x.half.death))+' | 영웅까지 '+pct(avg(rows,x=>x.best.ok))+' / '+pct(avg(rows,x=>x.best.death)));
for(const t of [.5,.7])console.log('현실 가방으로 성공 '+pct(t)+' 이상: '+S('real').filter(x=>x.real.ok>=t).length+'/'+rows.length+' · 50%로 팔면 '+S('half').filter(x=>x.half.ok>=t).length+'/'+rows.length);
for(const [hi,lo] of [[-1,-1],[-2,-2],[-3,-3],[-4,-99]]){const l=rows.filter(x=>x.lv-x.fl<=hi&&x.lv-x.fl>=lo);if(l.length)console.log('레벨 차 '+(lo===-99?'-4 이하':hi)+': '+l.length+'회 · 실제 '+pct(avg(l,x=>x.act.ok))+' · 현실 가방 '+pct(avg(l.filter(x=>x.real),x=>x.real.ok))+' · 50% '+pct(avg(l.filter(x=>x.half),x=>x.half.ok))+' · 영웅까지 '+pct(avg(l,x=>x.best.ok)));}
