// 세이브/정의 읽기 전용. 런 재생, RNG, 결과/성장 예측 없음.
// 저장된 출발 직전 피로와 가방을 고정한 피로 회복 산술 비교만 한다.
const fs=require('node:fs'),vm=require('node:vm'),cp=require('node:child_process'),path=require('node:path');
const root=path.resolve(__dirname,'../../..');
const input=process.argv[2];
if(!input)throw Error('세이브 경로 필요');
function catalog(ref){const c={};vm.createContext(c);vm.runInContext(cp.execFileSync('git',['show',ref+':dist/data/catalog.js'],{cwd:root,encoding:'utf8'}),c);return c.DATA;}
const d=catalog('177d1ab2'),before=catalog('94b1fb6f^');
const items=Object.fromEntries(d.items.map(x=>[x.id,x])),old=Object.fromEntries(before.items.map(x=>[x.id,x])),traits=Object.fromEntries(d.traits.map(x=>[x.id,x]));
const changes=d.items.filter(x=>x.effects.supply!==old[x.id].effects.supply).map(x=>({id:x.id,name:x.name,supplyBefore:old[x.id].effects.supply,supplyAfter:x.effects.supply,buyBefore:old[x.id].buy,buyAfter:x.buy,sellBefore:old[x.id].sell,sellAfter:x.sell}));
const changed=new Set(changes.map(x=>x.id));
const s=JSON.parse(fs.readFileSync(input,'utf8'));
const windows=[...(s.run.relicHistory||[]),s.run.relicWindow].filter(Boolean);
const mealDay=windows.find(w=>w.purchased==='expeditionMeal')?.purchaseDay??Infinity;
const uses=Object.fromEntries(changes.map(x=>[x.id,{name:x.name,sales:0,expeditionCopies:0,first9:0,nativeAddedSupply:0}]));
const bands=['1-9','10-29'].map(days=>({days,expeditions:0,affectedByItemBuff:0,nativeAddedSupply:0,removedMealSupply:0,netSupplyChange:0,departureBandImproved:0,departureBandWorsened:0}));
const mismatches=[],details=[];
const band=x=>x>=40?4:x>=30?3:x>=20?2:x>=10?1:0;
const unsupportedEvents=s.run.eventLog.filter(id=>d.events.find(e=>e.id===id)?.effects.feast);
if(unsupportedEvents.length)throw Error('연회 날짜를 별도 확인해야 함');
for(const n of s.run.npcs){
 for(const h of n.history)if(changed.has(h.item)&&h.paid>0&&h.day<30)uses[h.item].sales++;
 for(const r of n.records){
  if(r.day>=30||r.deep)continue;
  const ids=r.items||[];
  if(ids.some(id=>items[id].effects.duplicate))throw Error('효과 복제 별도 확인 필요');
  const fd=n.traits.reduce((a,t)=>a+(traits[t].effects.foodSupplyDelta||0),0),sp=n.traits.reduce((a,t)=>a+(traits[t].effects.supplyPerItem||0),0);
  const contribution=it=>{let v=it.effects.supply||0;if(!v)return 0;if(it.category==='food')v=Math.max(1,v+fd);if(['food','drink'].includes(it.category))v+=sp;return v;};
  const current=ids.reduce((a,id)=>a+contribution(items[id]),0);
  if(current!==r.preparedSupply){mismatches.push({npc:n.name,day:r.day,current,recorded:r.preparedSupply});continue;}
  const nativeDelta=ids.reduce((a,id)=>a+contribution(items[id])-contribution(old[id]),0);
  const mealRemoved=r.day>=mealDay?ids.reduce((a,id)=>a+(items[id].category==='food'?2:items[id].category==='drink'?1:0),0):0;
  const oldSupply=current-nativeDelta+mealRemoved,oldDeparture=Math.max(0,r.beforeFatigue-oldSupply);
  const b=bands[r.day<10?0:1];
  b.expeditions++;b.affectedByItemBuff+=nativeDelta>0?1:0;b.nativeAddedSupply+=nativeDelta;b.removedMealSupply+=mealRemoved;b.netSupplyChange+=nativeDelta-mealRemoved;
  b.departureBandImproved+=band(oldDeparture)>band(r.fatigueBeforeExpedition)?1:0;
  b.departureBandWorsened+=band(oldDeparture)<band(r.fatigueBeforeExpedition)?1:0;
  for(const id of ids)if(changed.has(id)){uses[id].expeditionCopies++;uses[id].first9+=r.day<10?1:0;uses[id].nativeAddedSupply+=contribution(items[id])-contribution(old[id]);}
  if(nativeDelta||mealRemoved)details.push({npc:n.name,day:r.day,items:ids,nativeDelta,mealRemoved,currentSupply:current,oldSupply,recordedBeforeFatigue:r.beforeFatigue,currentDeparture:r.fatigueBeforeExpedition,oldDepartureAtSameRecordedFatigue:oldDeparture});
 }
}
if(mismatches.length)throw Error('저장된 피로 회복 수치와 재구성 불일치: '+JSON.stringify(mismatches));
console.log(JSON.stringify({build:s.build,startBuild:s.run.startBuild,changes,uses,bands,mismatches,scope:'저장된 출발 직전 피로를 각각 고정한 산술 비교. 누적 피로·승패·사망·성장·클리어 변화 예측 아님.',details},null,2));
