const fs=require('node:fs'),path=require('node:path');
const s=JSON.parse(fs.readFileSync(path.join(__dirname,'summary.json'))),save=JSON.parse(fs.readFileSync(path.join(__dirname,'save-estimate.json')));
const names={baseline:'기준',visit:'방문만',xp:'경험치만',both:'합산'},arms=Object.keys(names),fmt=(x,d=1)=>x==null?'-':x.toFixed(d),p=x=>fmt(x)+'%',delta=x=>`${x.delta>=0?'+':''}${fmt(x.delta)}%p (${fmt(x.lo)}~${fmt(x.hi)})`;
const L=['# 방문 공백 · 최저 레벨 경험치 보정 후보 측정','',
'Production 미적용. 기준은 마지막 세이브 빌드 `177d1ab297157c96a80da9049674a9f5feeb23a5`의 별도 worktree 사본이다. 작업 중인 `codex/minor-ui-feedback`의 미커밋 Source는 후보에 섞지 않았다.','',
'## 판단 — BALANCE FINDING','',
'방문 보정은 장기 미방문 상태를 줄이고 단골의 방문 우위를 유지했다. 그러나 경험치 보정 단독·합산 모두 세이브 조건에서 클리어 개선을 확인하지 못했다. 합산은 reader 22.3% → 20.3%, expert 23.8% → 23.3%였고 두 차이의 95% 근사 범위는 모두 0을 포함한다. 따라서 개선 또는 악화를 확정하기보다, 토벌 개선 근거가 부족한 후보로 본다.','',
'방문 단독의 세이브 조건 expert D30 도달은 77.4% → 75.1%(-2.3%p, 95% 근사 범위 -4.0~-0.6%p)로 내려갔으며 사망은 8.366 → 8.507명/판이다. 장기 미방문 완화가 생존 개선을 보장하지 않는 실제 관측이므로 적용 판단에서 별도로 고려해야 한다. 원인이 어느 모험가에게 방문 기회를 옮겼기 때문인지와 RNG 경로 변화의 영향은 이번 요약으로 확정하지 않는다.','',
'경험치 추가 지급은 세이브 조건에서 판당 약 79~83, 보정 원정은 약 1.7~1.8회에 그쳤다. 기본 경험치도 계속 지급되기 때문에 복귀일에 고정된 최저 레벨 목표는 곧 정상 성장으로도 따라잡힐 수 있으며, 이 보정은 지속적인 전력 증가가 아니다. 실제 세이브에서 보정을 받는 네 모험가는 최종 출전 대원이 아니었다. 이번 후보는 소외 완화의 근거는 있지만 이 판의 큰 최종 전력 부족을 메우는 근거는 없다.','',
'표준 프레시 계정과 누적 계정에서도 클리어 변화는 정책·장식별로 엇갈렸다. 특히 누적 10번째 점포는 각 행 200판이며 이전 클리어·장식·숙련 누적도 후보에 따라 달라진다. 그중 유리한 행만 골라 전체 개선으로 결론 내리지 않는다. 수치를 자동 조정하거나 Production에 반영하지 않았다.','',
'## 측정 조건','',
'- 기준 / 방문만 / 경험치만 / 합산의 네 조건.','- 방문: 이미 만난 모험가가 방문 가능한 상태에서 선택되지 않은 날을 별도 누적한다. 5일 누적부터 +0.1, 최대 +0.5를 기존 방문 가중치에 가산한다. 기존 손님 가중치 합도 같은 값으로 다시 계산한다. 신규·기존 혼합과 Trait·회원 관리대장 효과, 하루 방문 수는 기존 규칙을 사용한다. 방문 시 공백은 초기화된다.','- 경험치: 위 공백 5일 이상으로 복귀하고 그날 기본 신규 최저 레벨 미만이면, 복귀일의 기본 신규 최저 레벨을 고정 목표로 삼는다. 살아 돌아온 일반 원정의 기본 경험치만큼 추가하되 목표 도달에 필요한 양을 넘지 않는다. 정상 경험치는 그대로 지급한다. 목표에 도달하면 종료한다. 직업 숙련·왕립 보너스는 목표 레벨에 넣지 않는다.','- 부상·피로·상품·게이트·사망 규칙은 후보에서 바꾸지 않았다.','- 표준: 조건마다 프레시 reader/expert/balanced 각 1,000판, 누적 reader/expert × none/economy/survival × 200궤적 × 10판. 총 60,000판.','- 세이브 조건: 같은 장식 세 칸, 직업 숙련 0, 본사 해금 상태를 사용하고 마왕은 엔비로 고정. reader/expert 각 1,000판 × 네 조건 = 8,000판. 각 판은 같은 계정 사본에서 시작하며 누적 성장을 하지 않는다.','- 네 조건의 seed 집합은 동일하다. 방문·결과가 달라진 뒤 RNG 흐름과 이후 선택이 갈라지는 것은 후보 효과에 포함된다.','',
'## 세이브 조건의 봇 추정','',
'실제 점주의 행동 재현이 아니다. 점포지원은 표준 하네스의 best-hybrid 순위, 발주·가격·보급·최종 대원 선택은 각 봇 정책을 사용한다. reader는 기준 정책, expert는 준비·최종 전력 평가를 더 활용한다.','',
'| 봇 | 조건 | D30 도달 | 클리어 | 도달 후 클리어 | 사망/판 | 후반 성공 | 단골 방문율 | 비단골 방문율 | 7일 이상 미방문 상태 비중 |',
'| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |'];
for(const policy of ['reader','expert'])for(const arm of arms){const r=s.profile[arm][policy];L.push(`| ${policy} | ${names[arm]} | ${p(r.reach)} | ${p(r.clear)} | ${p(r.clearGivenReach)} | ${fmt(r.deaths,2)} | ${p(r.bands[3])} | ${p(r.regularDailyVisit)} | ${p(r.otherDailyVisit)} | ${p(r.absence7Exposure)} |`);}
L.push('','클리어는 모든 시작 판을 분모로 한다. 도달 후 클리어는 D30 도달 판만 분모로 하므로 서로 구분한다. 단골/비단골 방문율은 각 아침의 방문 가능한 해당 집단 인원 수 대비 방문 수다. 7일 이상 상태 비중은 방문 가능한 기존 모험가의 일별 관측 중 해당 공백을 가진 비중이다. 집단 구성은 후보별로 달라진다.','',
'### 기준 대비 차이','',
'같은 seed끼리 짝지은 클리어 차이와 95% 근사 범위를 %p로 표시한다. 네 후보 비교의 다중비교 보정은 하지 않았다. 범위가 0을 포함하면 이번 표본에서 개선 방향을 확정하지 않는다.','',
'| 봇 | 조건 | 클리어 차이 · 95% 근사 범위 | D30 도달 차이 · 95% 근사 범위 | 사망/판 차이 |',
'| --- | --- | --- | --- | --- |');
for(const policy of ['reader','expert'])for(const arm of arms.filter(a=>a!=='baseline')){const d=s.pairedProfile[arm][policy];L.push(`| ${policy} | ${names[arm]} | ${delta(d.clearPP)} | ${delta(d.reachPP)} | ${fmt(d.deaths.delta,2)} |`);}
L.push('','## 실제 세이브 기록을 고정한 경험치 추정','',
'원정 기록의 XP를 누적해 모든 모험가의 원래 최종 레벨과 잔여 XP를 정확히 복원했다. 최종 보고서의 가방을 복원하고 현재 종료 상태를 다시 평가했을 때 저장된 최종 전력과 마왕 요구 전력이 정확히 일치했다.','',
'이 계산은 기록된 방문·상품·결과·사망·최종 출전 대원을 고정한다. 경험치 증가가 이후 승패·생존·소지금·장비·선택을 바꾸는 경로는 계산하지 않으므로 실제 대체 플레이 결과로 보지 않는다. 공백 계산에서 직전 원정의 기록된 중상 회복 기간을 제외했다. 그 사이 사건으로 회복 기간이 바뀌었는지는 기록만으로 확정할 수 없다.','',
'| 모험가 | 추가 XP | 기존 종료 Lv | 보정 종료 Lv | 최초 발동 |',
'| --- | --- | --- | --- | --- |');
for(const n of save.changed)L.push(`| ${n.name} | ${n.extraXP} | ${n.oldLevel} | ${n.newLevel} | D${n.events.find(e=>e.kind==='start').day} → Lv${n.events.find(e=>e.kind==='start').target} 목표 |`);
L.push('',`최종 출전 3명은 보정 대상이 아니므로 같은 대원·상품에서 전력은 **${fmt(save.baseline.power,2)} → ${fmt(save.xp.power,2)}**, 최고 난수 판정 전력은 **${fmt(save.xp.maxAssault,2)} / ${save.xp.bossPower}**다. 여전히 토벌할 수 없다. 방문 보정 또는 합산으로 당시 대원·생존자가 어떻게 달라졌을지는 이 종료 세이브만으로 정확히 복원할 수 없다. 위 봇 표가 해당 조건의 추정이다.`,'',
'## 표준 프레시 계정','',
'| 봇 | 조건 | D1~7 성공 | D8~14 성공 | D15~21 성공 | D22~29 성공 | D30 도달 | 클리어 | 사망/판 | 상위 4명 성공 | 나머지 성공 |',
'| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
for(const policy of ['reader','expert','balanced'])for(const arm of arms){const r=s.standard[arm][`fresh/${policy}/none`];L.push(`| ${policy} | ${names[arm]} | ${r.bands.map(p).join(' | ')} | ${p(r.reach)} | ${p(r.clear)} | ${fmt(r.deaths,2)} | ${p(r.core.top)} | ${p(r.core.rest)} |`);}
L.push('','## 누적 계정 — 10번째 점포','',
'각 행 200판. 장식과 직업 숙련은 실제 전 판의 결과에서 누적되어 후보별로 달라질 수 있다.','',
'| 봇 | 장식 구매 순서 | 조건 | D30 도달 | 클리어 | 사망/판 | 후반 성공 | 단골/비단골 방문율 비 |',
'| --- | --- | --- | --- | --- | --- | --- | --- |');
for(const policy of ['reader','expert'])for(const deco of ['none','economy','survival'])for(const arm of arms){const r=s.standard[arm][`traj/${policy}/${deco}/run10`];L.push(`| ${policy} | ${deco} | ${names[arm]} | ${p(r.reach)} | ${p(r.clear)} | ${fmt(r.deaths,2)} | ${p(r.bands[3])} | ${fmt(r.premiumRatio,2)} |`);}
L.push('','## 검증 · 재현','',
'- 보정 비활성 사본의 reader/expert/balanced 각 8판은 원본 결과와 완전히 같았다.','- 경험치 추가분 상한 검사는 목표 Lv9 도달·잔여 XP0·보정 종료를 확인했다.','- 지정한 세 파일 이외의 사본 파일은 원본과 byte 단위로 동일했다.','- 표준 결과는 각 조건 15,000판, 세이브 조건은 각 조건·봇 1,000판인지 검사했다.','- 표준 명령: 각 사본에서 `node tools/measure-v2100.cjs --traj 200 --fresh 1000 --out <조건.json>`.','- `provenance.json`에 기준 commit과 후보 파일 SHA-256이 있다. `prepare.cjs`가 기준 사본으로부터 후보를 만든다. `verify.cjs`, `run-all.cjs`, `profile.cjs`, `save-estimate.cjs`, `analyse.cjs`는 측정·분석 스크립트다.','- 대용량 원시 JSON은 이 실험 출력 폴더에 보관한다. 요약은 `summary.json`, 실제 세이브 고정 추정은 `save-estimate.json`이다.','- Production 적용·Canonical 수정·전체 QA·PR·머지는 하지 않았다. 이번 결과는 밸런스 후보 측정이며 QA PASS나 Design 채택을 뜻하지 않는다.','');
fs.writeFileSync(path.join(__dirname,'REPORT.md'),L.join('\n'));
console.log('Wrote REPORT.md');
