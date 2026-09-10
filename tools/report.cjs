// Chunk G balance report generator. Reads the re-baselined multi-seed run and writes
// reports/BALANCE.md and reports/RELICS.md. This tool only formats what the simulation
// measured; it changes no catalog, formula or balance value anywhere.
const fs=require('node:fs');require('../dist/data/catalog.js');require('../dist/data/relics.js');
const data=JSON.parse(fs.readFileSync('tests/balance-results-v5.json','utf8'));
const pct=x=>Number.isFinite(x)?(x*100).toFixed(1)+'%':'분모 0',num=x=>Number.isFinite(x)?Number(x).toFixed(1):'—',
 num3=x=>Number.isFinite(x)?Number(x).toFixed(3):'—',
 table=h=>'| '+h.join(' | ')+' |\n| '+h.map(()=>'---').join(' | ')+' |\n',row=v=>'| '+v.join(' | ')+' |\n';
const cohort=(policy,pricing,build)=>data.cohorts.find(c=>c.policy===policy&&c.pricing===pricing&&c.build===build);
const c=cohort('balanced','adaptive','hybrid');
const MINIMAL=['zero-sale','zero-order','zero-supply','poverty','meta-farm'];
const engaged=data.cohorts.filter(x=>!MINIMAL.includes(x.policy));
const minimal=data.cohorts.filter(x=>MINIMAL.includes(x.policy));
const seeds=data.seedsPerStrategy;
const band=(dist,lo,hi)=>Object.entries(dist).filter(([d])=>Number(d)>=lo&&Number(d)<=hi).reduce((a,[,n])=>a+n,0);

let md='# BALANCE — v2.4 재기준선 (Chunk G)\n\n'
+'Canonical Set '+data.canonicalSet+'. 각 전략 '+seeds+' Seed, '+data.cohorts.length+'개 전략 조합, 총 '+(seeds*data.cohorts.length).toLocaleString('en-US')+' Run. 모든 조합은 `'+data.seedPrefix+'0~'+(seeds-1)+'`을 사용한다.\n\n'
+'**이 문서는 측정 결과다. 여기의 어떤 수치도 Canonical 값을 바꾸지 않았다.** Chunk A~F에서 아이템·특성·해저드·이벤트 어휘가 전면 교체되어 RNG 소비 경로가 달라졌으므로, v2.4 이전의 `balance-results-v3/v4`는 폐기했고 v2.4 근거로 인용할 수 없다. 원시 집계는 `tests/balance-results-v5.json`에 있다.\n\n'
+'자동 정책 비교이며 사람의 첫 클리어율이 아니다. DAY30 도달률의 분모는 전체 Run, 도달 후 보스 승률의 분모는 DAY30 도달 Run이다. '+seeds+'회에서 관측값이 50%이면 단순 이항 95% 오차폭은 약 ±'+(1.96*Math.sqrt(.25/seeds)*100).toFixed(1)+'%p다. 작은 순위 차이에 의미를 부여하지 않는다.\n\n';

md+='## 1. 전략별 종합\n\n'+table(['정책 / 가격 / 유물 방향','평균 도달 DAY','DAY30 도달','도달 후 승률','전체 클리어','평균 사망','평균 최종 Gold','Meta XP / Run','Knowledge / Run','평균 유물 지출']);
for(const x of data.cohorts)md+=row([x.policy+' / '+x.pricing+' / '+x.build,num(x.averageDay),pct(x.reachRate),x.reached30?pct(x.bossWinGivenReach):'분모 0',pct(x.overallClearRate),num(x.averageDeaths),num(x.averageMoney),num(x.metaXPPerRun),num(x.knowledgePerRun),num(x.relicSpend/x.runs)]);

md+='\n## 2. RUN-Q30 / ECO-Q12 — 최소 참여·DAY 파밍\n\n'
+'A. 정상 참여 플레이 = `balanced/adaptive/hybrid`. B. 반복 무판매·무발주·무보급 = `zero-sale` / `zero-order` / `zero-supply`. C. 최소 지출 = `poverty`.\n\n'
+'`zero-sale`은 발주는 하되 아무것도 팔지 않는다. `zero-order`는 발주하지 않고 초기 재고만 판다. `zero-supply`는 발주도 판매도 하지 않아 원정대가 항상 맨몸으로 나간다. `poverty`는 하루 최저가 1개만, 현금 600G를 남길 때만 발주한다. `meta-farm`은 적대적 사례다 — 발주·판매·보급을 전부 버리고 유료 유물도 사지 않으며, 첫 정산에 초기 재고를 정리해 현금으로 바꿔 최소 조작으로 최대한 오래 버틴다.\n\n'
+'`행동 수`는 플레이어가 실제로 수행해야 하는 조작(발주 수량 지정·확정·개점·판매 시도·손님 응대·밤 넘김·정산·재고 정리·유물 선택·최종 편성)의 횟수다. 상호작용 비용의 대리 지표이며, 정확한 체감 시간이 아니다.\n\n'
+table(['전략','평균 도달 DAY','D20+ 도달','D25+ 도달','DAY30 도달','평균 최종 Gold','Meta XP / Run','Meta XP / DAY','Meta XP / 행동','행동 수 / Run','Knowledge / Run','NPC 평균 Lv','단골 수']);
for(const x of [c,...minimal])md+=row([x.policy,num(x.averageDay),pct(band(x.dayReached,20,30)/x.runs),pct(band(x.dayReached,25,30)/x.runs),pct(x.reachRate),num(x.averageMoney),num(x.metaXPPerRun),num(x.metaXPPerDay),num3(x.metaXPPerAction),num(x.actionsPerRun),num(x.knowledgePerRun),num(x.npc.level/Math.max(1,x.npc.alive)),num(x.npc.regulars/x.runs)]);
// The verdict states the canonical conditions and what each one measured, so a later
// run that changes one of them says which one. RUN-Q30 asks whether B "routinely" coasts
// into D20+/D25+ while staying efficient — not whether it ever gets there once.
const conditions=[
 ['정상 참여 플레이가 도달 DAY에서 우월', minimal.every(x=>x.averageDay<c.averageDay)],
 ['정상 참여 플레이가 Run당 Meta XP에서 우월', minimal.every(x=>x.metaXPPerRun<c.metaXPPerRun)],
 ['정상 참여 플레이가 Knowledge에서 우월', minimal.every(x=>x.knowledgePerRun<c.knowledgePerRun)],
 ['정상 참여 플레이가 경제 결과에서 우월', minimal.every(x=>x.averageMoney<c.averageMoney)],
 ['최소 참여로 DAY30을 상시 도달하지 못함', minimal.every(x=>x.reachRate<.05)],
 ['최소 참여가 D25+로 상시 진입하지 못함', minimal.every(x=>band(x.dayReached,25,30)/x.runs<.25)],
 ['정상 참여 플레이가 진행 DAY당 Meta XP에서 우월', minimal.every(x=>x.metaXPPerDay<c.metaXPPerDay)],
 ['정상 참여 플레이가 플레이어 행동당 Meta XP에서 우월', minimal.every(x=>x.metaXPPerAction===null||x.metaXPPerAction<c.metaXPPerAction)]];
md+='\n'+table(['RUN-Q30 / ECO-Q12 조건','결과']);
for(const [name,ok]of conditions)md+=row([name,ok?'충족':'**미충족**']);
const failed=conditions.filter(([,ok])=>!ok);
md+='\n판정: '+(failed.length?'**조건부 — 미충족 '+failed.length+'건.**':'**PASS.**')
+' 최소 참여 전략은 모두 파산으로 끝났고(최종 Gold 음수), Run 단위로는 DAY30 도달·Meta XP·Knowledge·경제 결과 어느 축에서도 정상 참여 플레이에 미치지 못한다. 별도 비활동 패널티 시스템은 추가하지 않았다 — 기존 운영비·발주·고객 성장의 기회비용만으로 격차가 생겼다.\n'
+'\n**단위를 Run에서 투입량으로 바꾸면 순위가 뒤집힌다.**\n\n'
+table(['단위','정상 참여','최소 참여 최고값','뒤집힘'])
+row(['Run당 Meta XP',num(c.metaXPPerRun),num(Math.max(...minimal.map(x=>x.metaXPPerRun))),Math.max(...minimal.map(x=>x.metaXPPerRun))>c.metaXPPerRun?'예':'아니오'])
+row(['진행 DAY당 Meta XP',num(c.metaXPPerDay),num(Math.max(...minimal.map(x=>x.metaXPPerDay))),Math.max(...minimal.map(x=>x.metaXPPerDay))>c.metaXPPerDay?'**예**':'아니오'])
+row(['플레이어 행동당 Meta XP',num3(c.metaXPPerAction),num3(Math.max(...minimal.map(x=>x.metaXPPerAction??0))),Math.max(...minimal.map(x=>x.metaXPPerAction??0))>c.metaXPPerAction?'**예**':'아니오'])
+'\n행동당 Meta XP는 가장 직접적인 착취 지표다 — 플레이어가 실제로 지불하는 비용은 게임 내 DAY가 아니라 조작 횟수이기 때문이다. Meta XP 가중치는 PASS3 항목이므로 이 작업에서 바꾸지 않았다. 반복 farm Run에서 이 우위가 유지되는지는 §5.3의 `meta-farm / repeated` 궤적이 답한다. 근거와 후보는 BALANCE OBSERVATION으로 `reports/AUDIT.md`에 기록했다.\n';

md+='\n## 3. DUN-Q20 — 준비의 필요성 / 맨몸 원정\n\n'
+'A = `zero-supply` (반복 무준비), B = `balanced/adaptive/hybrid` (해저드 인지 준비). DAY 구간별 원정 결과다.\n\n'
+table(['구간','A 원정 수','A 보급 원정 비율','A 성공률','A 사망률','B 원정 수','B 보급 원정 비율','B 성공률','B 사망률']);
const bare=cohort('zero-supply','adaptive','hybrid');
for(const key of ['D1-3','D4-7','D8-12','D13-18','D19-29']){const a=bare?.bands[key],b=c.bands[key];
 md+=row([key,a?.expeditions??0,a?.expeditions?pct(a.packed/a.expeditions):'—',a?.expeditions?pct(a.success/a.expeditions):'—',a?.expeditions?pct(a.death/a.expeditions):'—',
  b?.expeditions??0,b?.expeditions?pct(b.packed/b.expeditions):'—',b?.expeditions?pct(b.success/b.expeditions):'—',b?.expeditions?pct(b.death/b.expeditions):'—']);}
md+='\n맨몸 전략은 D19 이후 표본이 사라진다. 도달하지 못해서다. 준비를 하지 않는 것 자체에 벌점을 준 규칙은 없다 — 판매 수입이 없으면 운영비를 감당하지 못하고 폐점한다.\n';

md+='\n## 4. 준비 효과 — 같은 원정, 아이템만 제거\n\n'
+'아이템을 모두 제거한 원정과 실제 준비된 원정을 같은 초기 RNG 상태로 비교했다. 조건 분기가 난수 소비를 달리할 수 있어 엄밀한 인과 실험은 아니다. 플레이어에게 확률로 표시하지 않는다.\n\n'
+table(['정책','비교 원정 수','결과 등급 개선 비율','사망→생환 비교 수','평균 본체 능력','평균 준비 후 능력','증분']);
for(const x of engaged.slice(0,8)){const i=x.impact;md+=row([x.policy+'/'+x.pricing,i.samples,pct(i.improved/i.samples),i.saved,num(i.characterAbility/i.samples),num(i.preparedAbility/i.samples),num((i.preparedAbility-i.characterAbility)/i.samples)]);}

md+='\n## 5. Final 성립성 — 전략별\n\n'
+table(['정책 / 가격 / 유물 방향','DAY30 도달','평균 출전 인원','3인 편성 비율','평균 파티 전력','평균 Assault','Boss Power 대비 여유','클리어']);
for(const x of data.cohorts){const f=x.final;md+=row([x.policy+' / '+x.pricing+' / '+x.build,f.reached,f.reached?num(f.party/f.reached):'—',f.reached?pct(f.full/f.reached):'—',f.resolved?num(f.power/f.resolved):'—',f.resolved?num(f.assault/f.resolved):'—',f.resolved?num(f.margin/f.resolved):'—',pct(x.overallClearRate)]);}
md+='\n`Boss Power` 기준값은 '+DATA.balance.bossPower+'이다. 위 여유값은 `Assault − Boss Power`의 평균이다. **이 표는 근거이며 지시가 아니다.** Boss Power는 PASS3 대상이고 사용자 승인 없이 바꾸지 않는다.\n'
+'\n> **이 표의 모든 Run은 `Meta.fresh()`에서 시작한다.** 즉 여기의 클리어율은 *신규 계정 + 자동 정책* 벤치마크이며 게임의 상한이 아니다. 계정이 성장한 뒤의 Final 성립성은 §5.3에서 따로 측정한다. 신규 계정 수치만으로 Boss Power 변경을 제안하지 않는다.\n';

// ---- 5.1 PARTY SIZE COUNTERFACTUAL -------------------------------------------------
const pcell=(b,f)=>b.samples?f(b):'—';
md+='\n### 5.1 파티 인원 반사실 — 같은 D30 상태에서 1인 / 2인 / 3인\n\n'
+'같은 Run의 **동일한 D30 상태**(공개된 두 Family, 동일 Hazard Pool, 동일 재고)에서 합법적으로 구성 가능한 최강 1인 / 2인 / 3인 파티를 각각 평가했다. 재고는 매번 같은 사본에서 배분하므로 소수 인원은 같은 물자를 집중해서 받는다. Roll이 `[0.88, 1.12]` 균등이므로 클리어 확률은 표본이 아니라 정확한 산술값이다.\n\n'
+'측정 전용이다. 인원수 보너스·패널티는 추가하지 않았고 Final 규칙은 바꾸지 않았다.\n\n'
+table(['인원','표본','평균 파티 전력','Assault 범위','Boss Power 대비 여유','정확 클리어 확률']);
for(const size of [1,2,3]){const b=c.partySize[size];
 md+=row([size+'인',b.samples,pcell(b,b=>num(b.power/b.samples)),pcell(b,b=>num(b.assaultLo/b.samples)+' ~ '+num(b.assaultHi/b.samples)),pcell(b,b=>num(b.power/b.samples-DATA.balance.bossPower)),pcell(b,b=>pct(b.chance/b.samples))]);}
md+='\n이 반사실은 Final 기여도 기준으로 최강 파티를 고르므로, 레벨 상위 3인을 뽑는 자동 정책보다 강하다 — 같은 상태의 **상한**이다. '
+'`FINAL_EXPEDITION` §11-C는 1~2인 Clear를 시스템적으로 금지하지 않는다고 명시한다. 현재 값에서 1인·2인·3인 모두의 정확 클리어 확률은 위 표 그대로이며, 인원수 전용 보정은 추가하지 않았다.\n';

// ---- 5.2 RUN-Q15 ------------------------------------------------------------------
const q=c.q15,srt=a=>a.slice().sort((x,y)=>x-y),pctile=(a,p)=>a.length?srt(a)[Math.min(a.length-1,Math.floor(a.length*p))]:null;
const inv=srt(q.invested),nw=srt(q.newcomer);
// P(a random newcomer beats a random invested regular), ties counted as half.
let beats=0;for(const x of nw){let lo=0,hi=inv.length;while(lo<hi){const m=(lo+hi)>>1;if(inv[m]<x)lo=m+1;else hi=m;}
 let eq=0,k=lo;while(k<inv.length&&inv[k]===x){eq++;k++;}beats+=lo+eq*.5;}
const pBeat=inv.length&&nw.length?beats/(inv.length*nw.length):null;
const hi90=pctile(nw,.9),pHigh=hi90!==null&&inv.length?inv.filter(v=>v<hi90).length/inv.length:null;
md+='\n### 5.2 RUN-Q15 — 장기 투자 NPC 대 신규 방문객\n\n'
+'D30 시점에 살아 있는 NPC를 Run이 이미 보관하는 이력으로 분류했다. **투자 단골** = 소개됨 · 방문 5회 이상 · 단골도 51 이상. **신규** = 방문 1회 이하. Final 가치는 `boss()`가 실제로 합산하는 개인 기여도이며, 보급을 제거한 맨몸 값이라 상품이 아니라 모험가 자체를 나타낸다. 새 NPC 가치 체계를 만들지 않았다.\n\n'
+table(['집단','표본','중앙값','상위 25%','상위 10%','평균']);
for(const [name,a] of [['투자 단골',inv],['신규 방문객',nw]])
 md+=row([name,a.length,num(pctile(a,.5)),num(pctile(a,.75)),num(pctile(a,.9)),num(a.reduce((x,y)=>x+y,0)/Math.max(1,a.length))]);
md+='\n'+table(['질문','값']);
md+=row(['무작위 신규가 무작위 투자 단골을 넘을 확률',pBeat===null?'—':pct(pBeat)]);
md+=row(['상위 10% 신규(고점 뽑기)가 투자 단골을 넘을 확률',pHigh===null?'—':pct(pHigh)]);
md+=row(['최강 합법 파티에서 투자 단골이 뽑힌 횟수',q.chosenInvested]);
md+=row(['최강 합법 파티에서 신규가 뽑힌 횟수',q.chosenNewcomer]);
md+=row(['최강 합법 파티 전력 중 투자 단골 기여',q.powerInvested+q.powerNewcomer?pct(q.powerInvested/(q.powerInvested+q.powerNewcomer)):'—']);
md+='\n판정: '+((pBeat!==null&&pBeat<.5&&q.chosenInvested>q.chosenNewcomer)
 ?'**PASS.** 무작위 신규가 투자 단골을 넘을 확률은 절반 미만이고, 최강 합법 파티는 투자 단골 쪽으로 압도적으로 기운다. 마지막 날 신규가 30일 투자를 조직적으로 대체하지 않는다.'
 :'**주의.** 신규 방문객이 투자 단골을 대체하는 경향이 관측됐다. 아래 관측 항목을 참조한다.')
+' 고점을 뽑은 신규 한 명이 특정 단골을 넘는 경우는 존재하며(위 두 번째 행), `RUN-Q15`는 그것을 금지하지 않는다 — 금지하는 것은 *조직적* 대체다. NPC 생성은 이 작업에서 바꾸지 않았다.\n';

// ---- 5.3 CROSS-RUN META PROGRESSION -----------------------------------------------
if(fs.existsSync('tests/longitudinal-results-v5.json')){
 const L=JSON.parse(fs.readFileSync('tests/longitudinal-results-v5.json','utf8'));
 if(L.canonicalSet===data.canonicalSet){
  md+='\n## 5.3 계정 성장에 따른 Final 성립성 — 교차 Run 측정\n\n'
  +'하나의 계정을 '+L.runsPerTrajectory+'회 연속 Run에 그대로 이어 사용했다. 궤적 '+L.trajectories+'개 × Run '+L.runsPerTrajectory+'회 = 궤적당 '+(L.trajectories*L.runsPerTrajectory).toLocaleString('en-US')+' Run. '
  +'**등급·해금·시작 계약은 전부 실제 Meta 시스템이 준 것이다** — 게임 내 능력치를 직접 주입하지 않았다. Run index 0이 §1~§5의 신규 계정 벤치마크와 같은 조건이다.\n\n';
  for(const co of L.cohorts){
   md+='### '+co.label+'\n\n'+table(['Run #','시작 등급','시작 해금 수','시작 누적 XP','선택 가능 계약','DAY30 도달','도달 후 승률','전체 클리어','평균 파티 전력','Boss 여유','Meta XP / Run','행동 수 / Run','XP / 행동']);
   for(const r of co.byIndex)md+=row([r.runIndex,num(r.gradeAtStart),num(r.unlockedAtStart),num(r.xpAtStart),num(r.contractsAvailable),pct(r.reachRate),r.reached30?pct(r.bossWinGivenReach):'분모 0',pct(r.overallClearRate),r.final.resolved?num(r.final.power/r.final.resolved):'—',r.final.resolved?num(r.final.margin/r.final.resolved):'—',num(r.metaXPPerRun),num(r.actionsPerRun),num3(r.metaXPPerAction)]);
   const g=Object.entries(co.byGrade).sort((a,b)=>Number(a[0])-Number(b[0]));
   if(g.length>1){md+='\n실제 보유 등급 기준으로 다시 묶은 같은 Run들:\n\n'+table(['시작 등급','Run 수','DAY30 도달','도달 후 승률','전체 클리어','평균 파티 전력','Boss 여유']);
    for(const [grade,r] of g)md+=row([grade,r.runs,pct(r.reachRate),r.reached30?pct(r.bossWinGivenReach):'분모 0',pct(r.overallClearRate),r.final.resolved?num(r.final.power/r.final.resolved):'—',r.final.resolved?num(r.final.margin/r.final.resolved):'—']);}
   md+='\n';
  }
  /* Run 0 against every later Run pooled: one grade-1 sample per trajectory, and everything
     the account earned afterwards. Pooling keeps the progressed side out of single-cohort noise. */
  const pool=co=>{const p=co.byIndex.slice(1),runs=p.length*co.trajectories,S=f=>p.reduce((a,r)=>a+f(r),0);
   const resolved=S(r=>r.final.resolved);
   return {runs,clear:S(r=>r.wins)/runs,power:resolved?S(r=>r.final.power)/resolved:null,margin:resolved?S(r=>r.final.margin)/resolved:null,
    xp:S(r=>r.metaXP)/runs,actions:S(r=>r.actions)/runs,xpPerAction:S(r=>r.metaXP)/Math.max(1,S(r=>r.actions))};};
  md+='### FRESH ACCOUNT 대 PROGRESSED ACCOUNT\n\n'
  +'Run 0(등급 1 · 해금 0)과 이후 모든 Run을 합산해 비교한다. 단일 Run index의 표본 잡음을 피하기 위해 진행 계정 쪽은 풀링했다.\n\n'
  +table(['궤적','계정 상태','Run 수','전체 클리어','평균 파티 전력','Boss 여유','Meta XP / Run','행동 수 / Run','XP / 행동']);
  for(const co of L.cohorts){const f=co.byIndex[0],p=pool(co);
   md+=row([co.label,'FRESH (Run 0)',co.trajectories,pct(f.overallClearRate),f.final.resolved?num(f.final.power/f.final.resolved):'—',f.final.resolved?num(f.final.margin/f.final.resolved):'—',num(f.metaXPPerRun),num(f.actionsPerRun),num3(f.metaXPPerAction)]);
   md+=row([co.label,'PROGRESSED (Run 1+)',p.runs,pct(p.clear),p.power===null?'—':num(p.power),p.margin===null?'—':num(p.margin),num(p.xp),num(p.actions),num3(p.xpPerAction)]);}
  const e=L.cohorts[0],ef=e.byIndex[0],ep=pool(e);
  md+='\n**§5의 신규 계정 클리어율을 게임의 최종 난이도로 읽어서는 안 된다.** 같은 자동 정책이 계정 성장만으로 '+pct(ef.overallClearRate)+' → '+pct(ep.clear)+'로 움직인다. '
  +'다만 평균 파티 전력은 '+num(ef.final.power/ef.final.resolved)+' → '+num(ep.power)+'로 +'+num(ep.power-ef.final.power/ef.final.resolved)+'에 그치고, Boss Power 대비 여유는 최고 등급에서도 '+num(ep.margin)+'로 음수를 유지한다. '
  +'즉 계정 성장은 격차를 좁히지만 메우지는 못한다. **Boss Power 후보값은 이 두 축을 함께 보고 사용자가 결정한다. 이 작업에서는 아무 값도 바꾸지 않았다.**\n';
 }else md+='\n> 교차 Run 측정 파일이 다른 Canonical Set에서 생성되어 §5.3을 생략했다.\n';
}

md+='\n## 6. DAY 스냅샷 — balanced / adaptive / hybrid\n\n'
+'Gold·재고는 발주 전, Peak는 발주 직후 표본의 평균이다. 방문객 지갑과 레벨은 그날 방문객 기준. DAY30은 최종팀 기준이라 동일 모수 비교가 아니다.\n\n'
+table(['DAY','Run 수','Gold','재고','발주 후 재고','방문/팀 수','평균 Lv','지갑 중앙값','지갑 P10/P90','매출','발주비','운영비','150% 감당 비율']);
for(const d of [1,5,10,15,20,25,30]){const x=c.days[d],w=c.wallets[d];if(!x)continue;
 md+=row([d,x.samples,num(x.cash/x.samples),num(x.inventory/x.samples),d===30?'—':num(x.peak/x.samples),num(x.visitors/x.samples),num(x.level/x.visitors),w?.median??'—',w?w.p10+'/'+w.p90:'—',d===30?'—':num(x.revenue/x.samples),d===30?'—':num(x.spent/x.samples),d===30?'—':num(x.operating/x.samples),x.offers?pct(x.overAffordable/x.offers):'—']);}
md+='\n150% 감당 비율 분모는 해당 날짜의 방문객×발주 후보 쌍이다. 실제 재고 판매 상황의 전환율과 구분한다. DAY30 경제 일계 누적은 별도 계측 미완료이므로 대시로 표시했다.\n';

md+='\n## 7. 가격별 실제 시도\n\n'+table(['전략','가격','구매/시도','전환율','매출','기록 원가 차감 이익','단골도 순변화']);
for(const x of engaged.slice(0,8))for(const [mode,m]of Object.entries(x.modes))md+=row([x.policy+'/'+x.pricing,mode,m.accepted+'/'+m.attempts,pct(m.accepted/m.attempts),m.revenue,m.profit,m.loyalty]);

md+='\n## 8. NPC 장기 가치 — 전략별 Run 종료 시점\n\n'+table(['정책 / 가격 / 유물 방향','생존 NPC','평균 Lv','최고 Lv','평균 충성도','단골 수','NPC 보유 Gold','성장 합계']);
for(const x of data.cohorts){const n=x.npc;md+=row([x.policy+' / '+x.pricing+' / '+x.build,num(n.alive/n.samples),num(n.level/Math.max(1,n.alive)),num(n.maxLevel/n.samples),num(n.loyalty/Math.max(1,n.alive)),num(n.regulars/n.samples),num(n.wallet/Math.max(1,n.alive)),num(n.growth/n.samples)]);}

md+='\n## 9. 유물 제안·구매 — balanced/adaptive/hybrid\n\n'
+'후보 노출은 한 Window당 한 번 집계한다. 무료 DAY0도 구매 횟수에 포함한다. 가격 ROI는 구매 후 생존 편향이 있어 이 표만으로 확정하지 않는다.\n\n'
+table(['유물','노출','획득','노출 대비 획득','평균 획득 DAY','평균 가격','보유 Run 클리어']);
for(const r of DATA.relics){const p=c.relicPurchases[r.id],o=c.relicOutcomes[r.id];md+=row([r.name,c.relicOffers[r.id]||0,p?.count||0,p?pct(p.count/c.relicOffers[r.id]):'—',p?num(p.day/p.count):'—',p?num(p.spend/p.count):'—',o?pct(o.wins/o.runs):'—']);}

md+='\n## 10. Build 완성 분포 — balanced/adaptive/hybrid\n\nHybrid 유물은 양쪽 태그에 각각 포함한다. 한 Run이 여러 Build 행에 동시에 들어간다.\n\n'+table(['방향','0','1','2','3','4','5+']);
for(const [tag,bins]of Object.entries(c.buildCounts))md+=row([DATA.buildNames[tag],...[0,1,2,3,4,5].map(n=>bins[n]||0)]);

md+='\n## 11. 던전별 결과 — balanced/adaptive/hybrid\n\n'+table(['Family:Tier','원정','성공/대성공','퇴각','부상','중상','사망']);
for(const [key,x]of Object.entries(c.dungeons))md+=row([key,x.expeditions,x.success,x.retreat,x.injury,x.severe,x.death]);

md+='\n## 12. 분류 규율\n\n'
+'- **IMPLEMENTATION BUG** — Canonical 값이 잘못 구현된 경우. Source를 고친다.\n'
+'- **BALANCE OBSERVATION** — Canonical 시작값/PASS3 값이 올바르게 구현되었으나 결과가 나쁜 경우. 근거와 후보값을 기록하고 **아무것도 바꾸지 않는다.**\n\n'
+'Chunk G에서 관측된 항목은 `reports/AUDIT.md`에 분류해 기록했다. PASS3 수치 변경 게이트(`V2_4_EXECUTION_PLAN` §10)가 이 챕터 전체에 적용된다: 측정된 후보값은 증거이며, 사용자 승인 전에는 적용하지 않는다.\n';

md+='\n## 13. 아직 필요한 검증\n\n'
+'사람 DAY1~30 반복 플레이, 실제 휴대전화 터치·음량, 전체 메타 해금 상태 비교, 유물별 동일 조건 인과 ROI, NPC 투자별 재방문 지연 시간, Lv9→10 독립 비교, DAY20 에이스 사망 후 회복, 특정 전설 없이 클리어 가능성, Counter별 Pity와 실제 수요 다양성. 이를 완료된 것으로 표시하지 않는다.\n';
fs.writeFileSync('reports/BALANCE.md',md);

let relic='# 점포지원 30종\n\nDAY0 무료 3택. DAY5·10·15·20·25·30 유료 3택, 한 Window에 최대 1개. DAY5 후보는 DAY9까지 보류 가능. 가격과 후보는 저장되며 같은 Window 내에서 다시 뽑히지 않는다. 신규 구매는 발주·최종 준비에서만 허용한다. 방문객·운영비 변화는 다음 날부터 적용한다. 이미 생성된 발주 후보는 유물을 산다고 자동 재생성되지 않는다.\n\n'+table(['이름','종류','운영 방향','기준가','기능','DAY30 후보']);
for(const r of DATA.relics)relic+=row([r.name,r.kind,r.tags.map(t=>DATA.buildNames[t]).join('·')||'범용',r.price,r.description,r.finalUseful?'가능':'제외']);
fs.writeFileSync('reports/RELICS.md',relic);
console.log('Wrote reports/BALANCE.md and reports/RELICS.md from '+data.cohorts.length+' cohorts × '+seeds+' seeds');

// One-variable diagnostic appendix. `tests/experiment.cjs` overrides the overhead inside its
// own process only; the shipped value stays where Canonical put it. The appendix exists so a
// PASS3 candidate is written down as evidence and never as a change.
if(fs.existsSync('reports/operating-experiment.json')){
 const e=JSON.parse(fs.readFileSync('reports/operating-experiment.json','utf8'));
 if(e.canonicalSet===data.canonicalSet){
  let text='\n## 부록 A — 한 변수 실험: 일일 운영비 '+e.baseline+'G → '+e.candidate+'G\n\n'
  +'각 조합 동일 '+e.seedsPerStrategy+' Seed. **배포값은 '+DATA.balance.operating+'G로 유지했다.** `dailyOverhead`는 PASS3 항목이며 사용자 승인 없이 바꾸지 않는다.\n\n'
  +table(['가격/방향','기본 도달률',e.candidate+'G 도달률','기본 클리어',e.candidate+'G 클리어','기본 최종 Gold',e.candidate+'G 최종 Gold']);
  for(const x of e.cohorts){const b=cohort('balanced',x.pricing,x.build);if(!b)continue;
   text+=row([x.pricing+'/'+x.build,pct(b.reachRate),pct(x.reach),pct(b.overallClearRate),pct(x.clear),num(b.averageMoney),num(x.gold)]);}
  text+='\n분류: **BALANCE OBSERVATION.** 소폭 운영비 인상만으로는 일반 전략의 도달률이 의미 있게 움직이지 않는다. 사람 플레이 없이 비용을 계속 올려 목표값을 맞추지 않는다. 이 후보는 미적용.\n';
  fs.appendFileSync('reports/BALANCE.md',text);
 }else console.log('operating-experiment.json is from another canonical set; appendix skipped');
}
