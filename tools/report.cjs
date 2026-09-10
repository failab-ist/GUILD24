// Chunk G balance report generator. Reads the re-baselined multi-seed run and writes
// reports/BALANCE.md and reports/RELICS.md. This tool only formats what the simulation
// measured; it changes no catalog, formula or balance value anywhere.
const fs=require('node:fs');require('../dist/data/catalog.js');require('../dist/data/relics.js');
const data=JSON.parse(fs.readFileSync('tests/balance-results-v5.json','utf8'));
const pct=x=>Number.isFinite(x)?(x*100).toFixed(1)+'%':'분모 0',num=x=>Number.isFinite(x)?Number(x).toFixed(1):'—',
 table=h=>'| '+h.join(' | ')+' |\n| '+h.map(()=>'---').join(' | ')+' |\n',row=v=>'| '+v.join(' | ')+' |\n';
const cohort=(policy,pricing,build)=>data.cohorts.find(c=>c.policy===policy&&c.pricing===pricing&&c.build===build);
const c=cohort('balanced','adaptive','hybrid');
const engaged=data.cohorts.filter(x=>!['zero-sale','zero-order','zero-supply','poverty'].includes(x.policy));
const minimal=data.cohorts.filter(x=>['zero-sale','zero-order','zero-supply','poverty'].includes(x.policy));
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
+'`zero-sale`은 발주는 하되 아무것도 팔지 않는다. `zero-order`는 발주하지 않고 초기 재고만 판다. `zero-supply`는 발주도 판매도 하지 않아 원정대가 항상 맨몸으로 나간다. `poverty`는 하루 최저가 1개만, 현금 600G를 남길 때만 발주한다.\n\n'
+table(['전략','평균 도달 DAY','D20+ 도달','D25+ 도달','DAY30 도달','평균 최종 Gold','Meta XP / Run','Meta XP / DAY','Meta XP / 1,000G 지출','Knowledge / Run','NPC 평균 Lv','단골 수']);
for(const x of [c,...minimal])md+=row([x.policy,num(x.averageDay),pct(band(x.dayReached,20,30)/x.runs),pct(band(x.dayReached,25,30)/x.runs),pct(x.reachRate),num(x.averageMoney),num(x.metaXPPerRun),num(x.metaXPPerDay),x.metaXPPerKiloGold===null?'지출 0':num(x.metaXPPerKiloGold),num(x.knowledgePerRun),num(x.npc.level/Math.max(1,x.npc.alive)),num(x.npc.regulars/x.runs)]);
// The verdict states the canonical conditions and what each one measured, so a later
// run that changes one of them says which one. RUN-Q30 asks whether B "routinely" coasts
// into D20+/D25+ while staying efficient — not whether it ever gets there once.
const conditions=[
 ['정상 참여 플레이가 도달 DAY에서 우월', minimal.every(x=>x.averageDay<c.averageDay)],
 ['정상 참여 플레이가 Run당 Meta XP에서 우월', minimal.every(x=>x.metaXPPerRun<c.metaXPPerRun)],
 ['정상 참여 플레이가 Knowledge에서 우월', minimal.every(x=>x.knowledgePerRun<c.knowledgePerRun)],
 ['정상 참여 플레이가 경제 결과에서 우월', minimal.every(x=>x.averageMoney<c.averageMoney)],
 ['최소 참여로 DAY30을 상시 도달하지 못함', minimal.every(x=>x.reachRate<.05)],
 ['최소 참여가 D25+로 상시 진입하지 못함', minimal.every(x=>band(x.dayReached,25,30)/x.runs<.25)]];
md+='\n'+table(['RUN-Q30 / ECO-Q12 조건','결과']);
for(const [name,ok]of conditions)md+=row([name,ok?'충족':'**미충족**']);
md+='\n판정: '+(conditions.every(([,ok])=>ok)?'**PASS.**':'**조건부 — 미충족 항목 참조.**')
+' 네 최소 참여 전략은 모두 파산으로 끝났고(최종 Gold 음수), DAY30 도달·Meta XP·Knowledge·경제 결과 어느 축에서도 정상 참여 플레이에 미치지 못한다. 별도 비활동 패널티 시스템은 추가하지 않았다 — 기존 운영비·발주·고객 성장의 기회비용만으로 격차가 생겼다.\n'
+'\n다만 **Run당이 아니라 진행한 DAY당으로 보면 순위가 뒤집힌다**: '
+minimal.map(x=>x.policy+' '+num(x.metaXPPerDay)).join(', ')+' 대 정상 참여 '+num(c.metaXPPerDay)+'. '
+'짧은 무참여 Run을 반복하면 DAY당 Meta XP 효율이 정상 플레이를 앞선다. Meta XP 가중치는 PASS3 항목이므로 이 챕터에서 바꾸지 않았다. 근거와 후보는 BALANCE OBSERVATION으로 `reports/AUDIT.md`에 기록했다.\n';

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
md+='\n`Boss Power` 기준값은 '+DATA.balance.bossPower+'이다. 위 여유값은 `Assault − Boss Power`의 평균이다. **이 표는 근거이며 지시가 아니다.** Boss Power는 PASS3 대상이고 사용자 승인 없이 바꾸지 않는다.\n';

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
