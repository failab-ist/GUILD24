(function(G){
const D=G.DATA;
const labels={supply:'보급',combat:'투력',survival:'강인함',mobility:'기동',spirit:'정신',poison:'독 대응',bind:'속박 대응',corrosion:'부식 대응',mire:'진창 대응',fire:'화염 대응',fear:'공포 대응',dark:'어둠 대응',cold:'냉기 대응',whiteout:'화이트아웃 대응',fatigue:'누적 피로',foodMult:'음식의 능력치',potionMult:'포션의 능력치',foodSupplyDelta:'음식 1개당 보급',supplyPerItem:'음식·음료 1개당 보급',recoveryDelta:'중상 회복 기간',revisitMult:'재방문 가중치',rareBias:'희귀 이상 구매 의사',commonBias:'일반·고급 구매 의사',injuredCombat:'부상 중 투력',escape:'탈출 확률',injuryGuard:'부상 방어',injuryRisk:'부상 확률',loot:'원정 소지금 획득',xpMult:'경험치',variance:'판정 변동폭',rareLoot:'장비 획득 보정',priceBias:D.balance.frugalThreshold+'G 초과 구매 의사',buyBias:'구매 의사',loyaltyBonus:'정가·50% 구매 시 단골도',overchargeBias:'바가지 구매 의사',visitGold:'방문 시 소지금',injuredCombatPercent:'부상시 투력 보정',combatPercent:'투력 보정',survivalPercent:'강인함 보정'};
const percent=new Set(['escape','injuryGuard','injuryRisk','loot','variance','rareLoot','priceBias','buyBias','rareBias','commonBias','combatPercent','survivalPercent','injuredCombatPercent','overchargeBias']);
const points=new Set(['priceBias','buyBias','overchargeBias','injuryGuard','injuryRisk','escape','rareLoot','rareBias','commonBias']);
const days=new Set(['recoveryDelta']);
/* SA-Q32: a Gold amount is stated in G, the way every other Gold figure on screen is. */
const gold=new Set(['visitGold']);
const mult=new Set(['xpMult','foodMult','potionMult','revisitMult']);
const negative=new Set(['fatigue','injuryRisk','variance']);
// Canonical player-facing Hazard pressure (DUNGEON_HAZARD 'HAZARD PLAYER-FACING PRESSURE').
// All 9 Hazards are explained the same way. Rendered inline, so there is no hover-only path.
const hazardPressure={poison:'강인함 압박',bind:'기동 압박',corrosion:'강인함 압박',mire:'기동 압박',fire:'강인함 압박',fear:'정신 압박',dark:'정신 중심 + 기동 보조 압박',cold:'강인함 압박',whiteout:'정신 중심 + 기동 보조 압박'};
function hazardRows(keys){return keys.map(k=>({key:k,name:D.hazards[k],pressure:hazardPressure[k]||''}));}
/* ITEM_v2.7 §INSURANCE HIERARCHY: Aftercare is a utility, not a magnitude. Rendering it as
   `+1` would read as a hidden injury-risk percentage, which the owner says it does not have. */
/* SA-Q05: `potion` is an internal marker (potionbody's own trigger test reads it directly off
   Item data) — it was never meant to author a row here, and a labelless 포션 row is exactly
   that leak. The player-visible '포션' identity is drawn elsewhere, off the same marker, as
   the item-kind badge, not as an effect row. */
const util={aftercare:'원정 후 남는 부상을 1단계 완화한다. 사망에는 적용되지 않는다.',duplicate:'다음 소비품 효과 2회 적용 · 쿠폰도 1칸 사용 · 중첩 불가',revive:'사망 판정을 중상으로 변경',curePoison:'독 대응 상품'};
// `tones` is canonical semantic metadata. Meaning is never inferred from the numeric sign
// when it is supplied; the sign fallback exists only for Item effects, which state their own costs.
function rows(e,tones){const out=[];for(const[k,v]of Object.entries(e)){
 if(util[k]){out.push({key:k,label:util[k],text:'',tone:'neutral',bad:false,utility:true});continue;}
 if(!labels[k]||!v)continue;const value=mult.has(k)?(v-1)*100:percent.has(k)?v*100:v;const rounded=Math.round(value*10)/10;
 const suffix=mult.has(k)?'%':percent.has(k)?(points.has(k)?'%p':'%'):days.has(k)?'일':gold.has(k)?'G':'';
 const tone=tones&&tones[k]?tones[k]:(negative.has(k)?(value>0?'cost':'benefit'):(value<0?'cost':'benefit'));
 out.push({key:k,label:labels[k],text:(rounded>0?'+':'')+rounded+suffix,tone,bad:tone==='cost'});}
 return out;}
function traitEffects(id){const t=D.traitBy[id];return rows(t.effects,t.tones);}
function traits(n){return n.traits;}
function traitText(id){const t=D.traitBy[id],parts=traitEffects(id).map(r=>r.label+' '+r.text);if(t.note)parts.push(t.note);return parts.join(' · ');}
function known(d,g){return d.hazards;}
/* SALE_v2.7 §POST-COMMIT DELTA SOURCE TRUTH. Preparation can move through four different
   channels, and a single flat list of before -> after makes every one of them look like a
   direct Item Stat. So the change is split by its PROVEN source rather than by its size:

     direct   the Item's own contribution, read off the preparation's per-item breakdown
     derived  a system that moved because the Item's Supply moved - the unified Supply
              Deficit relief, or a canonical Fatigue penalty band being crossed

   A Core Stat that moved without the Item contributing to it is never listed as the Item's:
   it moved through a system, and that system says so in its own row. The hidden Supply-deficit
   formula stays hidden - the row names the channel, never the arithmetic behind it. */
const fatigueBand=f=>f>=20?2:f>=10?1:0;
function preview(n,d,fac,item){
 const visible={...n,traits:traits(n)};
 const a=G.Dungeon.prepare(visible,d,fac),b=G.Dungeon.prepare({...visible,pack:[...visible.pack,item]},d,fac);
 const before=a.effects,after=b.effects,stat=new Set(G.Adventurer.keys);
 const own=b.itemStats.filter(x=>x.item===item)
  .reduce((m,x)=>{for(const[k,v]of Object.entries(x.stats))m[k]=(m[k]||0)+v;return m;},{});
 const direct=[],derived=[];
 for(const k of Object.keys(labels)){
  if(['priceBias','buyBias','variance'].includes(k))continue;
  const x=before[k]||0,y=after[k]||0;
  if(Math.abs(x-y)<=.001)continue;
  if(stat.has(k)&&!own[k])continue;  // moved through a system, reported as that system below
  direct.push({key:k,label:labels[k],before:x,after:y,bad:negative.has(k)?y>x:y<x});
 }
 if(b.supply.penalty<a.supply.penalty)
  derived.push({key:'supplyDeficit',label:'보급 부족 완화',
   text:'보급 '+Math.round(a.supply.actual)+' → '+Math.round(b.supply.actual)+' · 네 능력치에 걸린 보급 부족이 줄었다'});
 if(fatigueBand(after.effectiveFatigue)<fatigueBand(before.effectiveFatigue))
  derived.push({key:'fatigueBand',label:'피로 완화',
   text:'피로 '+before.effectiveFatigue+' → '+after.effectiveFatigue+' · 기동·정신 페널티가 한 단계 풀렸다'});
 return {direct,derived};
}
function returning(n){if(!n.introduced||n.newToday||!n.records.length)return null;const r=n.records.at(-1),changes=(r.changes||[]).filter(c=>c.startsWith('Lv.')||c.startsWith('새 특성'));if(r.injury>n.injury)changes.push(n.injury?'부상 완화':'부상 회복');if(r.recovery>0&&!n.recovery)changes.push('휴식 종료');return {day:r.day,outcome:r.outcome,changes,impact:supplyLines(r)[0]?.text||null};}
/* ---- NIGHT: one resolved state, told four ways --------------------------------
   Outcome label, WHAT_HAPPENED, WHY and WHAT_CHANGED all read off the same report, so
   they cannot contradict each other. Nothing here decides anything: the resolution has
   already happened and this only describes it. Kept in the presentation module rather
   than in the screen so the whole outcome matrix is testable without a browser. */
function nightTone(r){return r.outcome==='사망'?'gone':r.outcome==='중상'?'severe':
 ['부상','퇴각'].includes(r.outcome)?'hurt':r.outcome==='대성공'?'great':'safe';}
/* A rescue is never dressed up as an ordinary success, and never as a death. */
function nightVerdict(r){return r.rescued&&r.outcome!=='death'?'위기에서 생환':r.outcome;}
function nightHappened(r){
 /* DUNGEON_HAZARD_v2.7 rolls Death on any failure path, not only behind a lost fight, so the
    line may no longer name the fight as the cause on a won one - NIGHT_CLOSING forbids an
    invented cause. The won-fight wording states only what the runtime actually proved. */
 if(r.outcome==='사망')return r.combatWon?'원정에서 돌아오지 못했다.'
                                        :'전투에서 밀린 뒤 돌아오지 못했다.';
 /* SA-Q33: this sentence states WHAT happened, never WHY. `보급이 마지막 순간의 사망을 막았다`
    used to perform both roles - the new proven Hero Item line (heroLine, below) is WHY, when
    proof exists, and never competes with a generic causality claim here. */
 if(r.avoidedDeath)return '사망 위기를 넘기고 살아 돌아왔다.';
 if(r.outcome==='중상')return '큰 부상을 입었다. 회복할 시간이 필요하다.';
 /* 퇴각 and 부상 both reach here from a won fight as well as a lost one — the injury
    guard can turn a won-fight injury into a retreat — so the line has to say which. */
 if(r.outcome==='퇴각')return r.combatWon?'전투는 이겼지만 원정을 끝내지 못하고 빠져나왔다.'
                                        :'원정은 끝내지 못했지만 무사히 빠져나왔다.';
 if(r.outcome==='부상')return r.combatWon?'전투를 이겼지만 돌아오는 길은 험했다.'
                                        :'원정을 끝내지 못하고 다친 채 돌아왔다.';
 return r.outcome==='대성공'?'예상보다 큰 성과를 내고 돌아왔다.':'원정을 마치고 돌아왔다.';}
/* Importance decides presentation weight. Compactness is about how much COPY a routine
   result spends, never about shrinking the adventurer: a quiet beat drops the quote and
   the extra blocks and keeps the character. Anything the resolution actually recorded as
   growth — a level, a trait, a promotion, kit, or a stat that really moved — counts as
   meaningful, not only a level-up. */
function nightWeight(r){
 return r.outcome!=='성공'||r.rescued||r.avoidedDeath
  ||(r.events||[]).length>0||(r.changes||[]).length>0||(r.statChanges||[]).length>0;}
/* How loudly a result is told. There are six outcomes and they were being told in two volumes,
   so a 부상 shouted as loudly as a 사망. The everyday ones - came back, pulled out, hurt - share
   one voice; the ones that actually change what the player does next get raised. 중상 belongs
   with the loud ones because it spends recovery days, so it decides the next several mornings.
   This is about emphasis, never about saying less: a routine beat keeps its full copy. */
const LOUD=new Set(['대성공','중상','사망']);
function nightRank(r){
 if(LOUD.has(r.outcome)||r.rescued||r.avoidedDeath)return 'major';
 return nightWeight(r)?'routine':'quiet';}
/* SKIP CONTRACT (NIGHT_CLOSING). Skip is a cursor move and nothing else: it names the
   next beat worth reading and stops at the end of the list. It never resolves, re-resolves
   or reorders a report, so the outcome the player skipped past is the outcome they already
   have. Skip All is the same move with the end of the list as its target. */

/* WHY names only what actually acted. A Hazard that was fully covered has no incident
   weight, so it can never be drawn as the cause — no false attribution is possible. */
function nightWhy(r){const bits=[];
 if(r.combatWon===false)bits.push('적을 물리치지 못했다.');
 else if(r.combatWon===true)bits.push('적을 물리쳤다.');
 if(r.environmentHurt)bits.push(r.cause&&r.cause!=='accident'
  ?(D.hazards[r.cause]||'보급 부담')+' 때문에 원정 내내 고전했다.'
  :'원정 중 예상치 못한 사고가 있었다.');
 if(r.events){
  for(const ev of r.events){
   /* SA-Q08: a Hazard mitigation used to speak for itself here with a vague `환경을 철저한
      준비로 극복했다` - a mitigation is not proof the Outcome would have been worse, only that
      pressure was lower. The provable claim (if any) is heroLine(r), off DUNGEON_HAZARD's
      RESULT-PROOF counterfactual, not this line. */
   if(ev.text&&ev.id!=='hazard')bits.push(ev.text);
  }
 }
 return bits.join(' ');}
/* HERO ITEM FEEDBACK (NIGHT_CLOSING §HERO ITEM FEEDBACK, DUNGEON_HAZARD §RESULT-PROOF).
   r.heroProof is null unless the actual resolution proved - using only the random evidence it
   actually drew, never a new roll, against the NPC's own departure state - that removing a
   specific sold Item (or, when no single Item is individually provable, the whole committed
   Bag) would have settled a WORSE Outcome. This is WHY the Player's own sale mattered; the
   Outcome sentence above never carries it. */
function heroLine(r){
 const hp=r.heroProof;if(!hp)return null;
 const said=hp.worse==='사망'?'살아 돌아왔다':hp.worse==='중상'?'중상을 피했다':
  hp.worse==='부상'?'부상을 피했다':hp.worse==='퇴각'?'원정을 성공했다':'대성공했다';
 const who=!hp.items?'챙긴 보급':hp.items.map(id=>D.itemBy[id].name).join('·');
 return who+' 덕분에 '+said+'.';
}
/* WHAT CHANGED — only what actually moved. A change the resolution wrote as a sentence
   is split into its own label and value; anything that resolved to zero is left out. */
function nightChange(text){
 if(/^Lv\./.test(text))                          return {kind:'up',label:'레벨',value:text};
 let m=null;
 m=/^새 특성\s*[「'"]?(.+?)[」'"]?$/.exec(text);   if(m)return {kind:'up',label:'새 특성',value:m[1]};
 m=/^(.*?)\s*승급$/.exec(text);                  if(m)return {kind:'up',label:'승급',value:m[1]};
 m=/^(.+?)\s*·\s*(전투\s*\+\d+)$/.exec(text);   if(m)return {kind:'up',label:'장비',value:m[1],extra:m[2]};
 return {kind:'up',label:'변화',value:text};}
function nightChanges(r, npc){const out=[];
 for(const c of (r.changes||[]).slice(0,3))out.push(nightChange(c));
 for(const x of (r.statChanges||[]).slice(0,4)){const label=labels[x.key];
  if(label)out.push({kind:'up',label,value:Math.round(x.before)+' → '+Math.round(x.after)});}
 if(r.recovery)out.push({kind:'down',label:'휴식',value:r.recovery+'일'});
  else if(r.injury===1){
   const n=npc;
   if(n){
    const combat=n.traits.includes('grit')?'+20%':'-15%';
    out.push({kind:'down',label:'남은 부상',value:'투력 '+combat+' · 강인함 -20%'});
   }
  }
  if(r.finalFatigue!==undefined){
   /* NIGHT_CLOSING §FATIGUE RESULT — SUPERSEDES v2.7 PLAYER LABELS. The runtime's own
      accounting fields (보급 회복 / 보급 완화 / 원정 결과 / 최종 피로) are not a settled Player
      result - they are four competing names for one number. The Player reads one settled
      value, 귀환 후 피로, and the resolved arithmetic behind it is on-demand detail through the
      same shared anchored tip every other ? on this screen already uses - never a second name
      for the primary figure and never a permanent second row. */
   const steps=['출발 '+r.fatigueBeforeExpedition];
   if(r.rawOutcomeFatigueGain>0)steps.push('원정에서 +'+r.rawOutcomeFatigueGain);
   if(r.outcomeBufferUsed>0)steps.push('남은 보급으로 -'+r.outcomeBufferUsed);
   steps.push('귀환 후 '+r.finalFatigue);
   out.push({kind:r.netFatigueDelta>0?'down':'up',label:'귀환 후 피로',value:r.finalFatigue+'',
    detail:steps.join(' → ')});
  }
 if(r.xp)out.push({kind:'',label:'경험치',value:'+'+r.xp});
 if(r.loot)out.push({kind:'gain',label:'원정 소지금 획득',value:r.loot+'G'});
 return out;}

/* ---- SUPPLY IMPACT -------------------------------------------------------------
   What the player actually sold, and what it actually did for that adventurer. Built
   from the resolution's own events, so only a real contribution is named and only the
   items that carried it. An event with no attributable item is not reported: a sale
   with no meaningful expedition impact is simply absent. */
const itemName=id=>D.itemBy[id]?.name||null;
/* One owner turns a resolution event into words. The discovery notebook reads it too: an
   event that authors its own `text` keeps it, and one that does not - a Hazard mitigation
   carries the Hazards it covered instead - is described from what it actually holds. An
   event with nothing to say is left out rather than printed as a blank. */
function eventLine(ev,r){if(!ev)return null;return ev.text||supplyEffect(ev,r||{})||null;}
function supplyEffect(ev,r){
 /* SA-Q08: a Hazard mitigation is only worth a claim about the Outcome when
    DUNGEON_HAZARD's RESULT-PROOF counterfactual actually proved one - the old `ev.prevented`
    heuristic (and the generic 위험 감소 it fell back to otherwise) claimed an effect that was
    never checked against the resolved Outcome. Unproven is now simply left unsaid. */
 if(ev.id==='hazard'){const names=(ev.hazards||[]).map(h=>D.hazards[h]).filter(Boolean).join('·');
  if(!names)return null;
  const proven=r.heroProof?.items?.some(id=>(ev.items||[]).includes(id));
  return proven?names+' 피해 방지':null;}
 if(ev.id==='escape')return r.avoidedDeath?'사망 위기에서 생환':'퇴각에 기여';
 if(ev.id==='revive')return '사망을 중상으로';
 if(ev.id==='injury-guard')return '부상 완화';
 return null;}
function supplyLines(r){const out=[];
 for(const ev of r.events||[]){
  const effect=supplyEffect(ev,r);if(!effect)continue;
  const items=[...new Set((ev.items||[]).map(itemName).filter(Boolean))];
  if(!items.length)continue;                       /* nothing honest to attribute */
  out.push({items,effect,text:items.join(' · ')+' → '+effect});}
 return out;}
/* The same lines with the adventurer named, for Closing where the NPC is not on screen. */
function supplyImpact(r){return supplyLines(r).map(l=>({...l,who:r.name,
 text:l.items.join(' · ')+' → '+r.name+'의 '+l.effect}));}
function modeLabel(mode){return D.pricing[mode]?.label||({normal:'정가(이전)',discount:'25% 할인(이전)',free:'무료 제공(이전)',supply:'최종 원정 보급'}[mode])||'이전 거래';}
/* UI_UX §PLAYER STAT TERMINOLOGY - one display rule, shared by every stat the player reads.
   Growth adds `growth * potential`, so the stored value is fractional almost always; showing
   that everywhere made every stat read `19.0`, and rounding everywhere hid the one digit that
   actually matters - what a Trait or an item just changed. So: a plain value reads as a whole
   number, and a value shown because something moved it keeps one decimal, and only when that
   decimal is not zero. Display only: the stored value and every gameplay judgement are
   untouched, and nothing here is ever rounded back into the run. */
function stat(value,moved=false){
 const v=Math.round(value*10)/10;
 if(!moved)return String(Math.round(value));
 return Number.isInteger(v)?String(v):v.toFixed(1);
}
function amount(key,value,moved=true){
 if(percent.has(key))return (Math.round(value*1000)/10)+'%p';
 return stat(value,moved);
}
G.Presentation={returning,amount,stat,labels,rows,traits,traitText,traitEffects,known,preview,modeLabel,hazardPressure,hazardRows,
 eventLine,nightTone,nightVerdict,nightHappened,nightWhy,heroLine,nightChanges,nightWeight,nightRank,supplyLines,supplyImpact};
})(globalThis);
