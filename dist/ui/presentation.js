(function(G){
const D=G.DATA;
const labels={supply:'보급',combat:'투력',survival:'강인함',mobility:'기동',spirit:'정신',poison:'독 대응',bind:'속박 대응',corrosion:'부식 대응',mire:'진창 대응',fire:'화염 대응',fear:'공포 대응',dark:'어둠 대응',cold:'냉기 대응',whiteout:'화이트아웃 대응',fatigue:'누적 피로',foodMult:'음식 고유 효과',potionMult:'포션 고유 효과',foodSupplyDelta:'음식 1개당 보급',supplyPerItem:'음식·음료 1개당 보급',recoveryDelta:'중상 회복 기간',revisitMult:'재방문 가중치',rareBias:'희귀 이상 구매 의사',commonBias:'일반·고급 구매 의사',shyBias:'초기 방문 구매 의사',injuredCombat:'부상 중 투력',escape:'탈출 보정',injuryGuard:'부상 방어',injuryRisk:'부상 위험',loot:'전리품',xpMult:'경험치',luck:'행운 보정',variance:'판정 변동폭',rareLoot:'장비 획득 보정',priceBias:'120G 초과 구매 의사',buyBias:'구매 의사'};
const percent=new Set(['escape','injuryGuard','injuryRisk','loot','luck','variance','rareLoot','priceBias','buyBias','rareBias','commonBias','shyBias']);
const points=new Set(['priceBias','buyBias','overchargeBias','injuryGuard','injuryRisk','escape','rareLoot','rareBias','commonBias','shyBias','luck']);
const days=new Set(['recoveryDelta']);
const mult=new Set(['xpMult','foodMult','potionMult','revisitMult']);
const negative=new Set(['fatigue','injuryRisk','variance']);
const util={duplicate:'다음 소비품 효과 2회 적용 · 쿠폰도 1칸 사용 · 중첩 불가',revive:'사망 판정을 중상으로 변경',curePoison:'독 대응 상품',potion:'포션'};
// `tones` is canonical semantic metadata. Meaning is never inferred from the numeric sign
// when it is supplied; the sign fallback exists only for Item effects, which state their own costs.
function rows(e,tones){const out=[];for(const[k,v]of Object.entries(e)){
 if(util[k]){out.push({key:k,label:util[k],text:'',tone:'neutral',bad:false,utility:true});continue;}
 if(!labels[k]||!v)continue;const value=mult.has(k)?(v-1)*100:percent.has(k)?v*100:v;const rounded=Math.round(value*10)/10;
 const suffix=mult.has(k)?'%':percent.has(k)?(points.has(k)?'%p':'%'):days.has(k)?'일':'';
 const tone=tones&&tones[k]?tones[k]:(negative.has(k)?(value>0?'cost':'benefit'):(value<0?'cost':'benefit'));
 out.push({key:k,label:labels[k],text:(rounded>0?'+':'')+rounded+suffix,tone,bad:tone==='cost'});}
 return out;}
function traitEffects(id){const t=D.traitBy[id];return rows(t.effects,t.tones);}
function traits(n){return n.traits;}
function traitText(id){const t=D.traitBy[id],parts=traitEffects(id).map(r=>r.label+' '+r.text);if(t.note)parts.push(t.note);return parts.join(' · ');}
function known(d,g){return d.hazards;}
function preview(n,d,fac,item){const visible={...n,traits:traits(n)},before=G.Dungeon.prepare(visible,d,fac).effects,after=G.Dungeon.prepare({...visible,pack:[...visible.pack,item]},d,fac).effects;
 return Object.keys(labels).filter(k=>!['priceBias','buyBias','luck','variance'].includes(k)&&Math.abs((before[k]||0)-(after[k]||0))>.001).map(k=>({key:k,label:labels[k],before:before[k]||0,after:after[k]||0,bad:negative.has(k)?after[k]>before[k]:after[k]<before[k]}));}
function returning(n){if(!n.introduced||n.newToday||!n.records.length)return null;const r=n.records.at(-1),changes=(r.changes||[]).filter(c=>c.startsWith('Lv.')||c.startsWith('새 특성'));if(r.injury>n.injury)changes.push(n.injury?'부상 완화':'부상 회복');if(r.recovery>0&&!n.recovery)changes.push('휴식 종료');return {day:r.day,outcome:r.outcome,changes,impact:r.events?.[0]?.text||null};}
function modeLabel(mode){return D.pricing[mode]?.label||({normal:'정가(이전)',discount:'25% 할인(이전)',free:'무료 제공(이전)',supply:'최종 원정 보급'}[mode])||'이전 거래';}
function amount(key,value){const v=percent.has(key)?value*100:value;return (Math.round(v*10)/10)+(percent.has(key)?'%p':'');}
G.Presentation={returning,amount,labels,rows,traits,traitText,traitEffects,known,preview,modeLabel};
})(globalThis);
