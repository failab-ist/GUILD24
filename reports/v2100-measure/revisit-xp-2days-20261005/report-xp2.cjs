const fs=require('node:fs'),path=require('node:path');
const root=__dirname,s=JSON.parse(fs.readFileSync(path.join(root,'summary-xp2.json'))),estimate=JSON.parse(fs.readFileSync(path.join(root,'save-estimate-xp2.json'))),old=JSON.parse(fs.readFileSync(path.join(root,'save-estimate.json')));
const names={baseline:'기준',xp:'경험치 5일',xp2:'경험치 2일'},arms=['baseline','xp','xp2'],num=(v,d=1)=>v.toFixed(d),pct=v=>num(v)+'%',signed=(v,d=1)=>(v>=0?'+':'')+num(v,d),interval=(v,d=1)=>signed(v.delta,d)+' ('+num(v.lo,d)+'~'+num(v.hi,d)+')';
const l=['# 경험치 보정 — 미방문 5일 → 2일 재측정','',
'## 판단 — BALANCE FINDING','',
'2일 후보는 보정량과 보정 원정을 늘리고, 세이브 조건에서 평균 사망을 줄였다. 기준 대비 reader D30 도달은 78.4% → 80.8%(+2.4%p, 95% 근사 범위 +0.4~+4.4%p)다. 사망은 reader 8.314 → 8.125명/판, expert 8.366 → 8.214명/판이며 두 차이의 범위는 모두 0 아래다. 5일 후보와 비교하면 사망 감소는 reader에서 확인되지만 expert 범위는 0을 포함한다.','',
'토벌 개선은 확인하지 못했다. 세이브 조건 클리어는 reader 22.3% → 21.1%, expert 23.8% → 22.7%로 관측됐지만, 두 차이의 범위는 모두 0을 포함한다. 5일 후보 대비 차이도 같은 상태다. 따라서 토벌 악화를 확정하지도, 사망 완화를 토벌 개선으로 바꿔 말하지도 않는다.','',
'판당 추가 XP는 약 79~82 → 155~165, 보정 원정은 1.7~1.8 → 4.1~4.3회로 늘었다. 단골/비단골 방문율 비는 reader 약 1.34배, expert 약 1.37배로 유지됐다. 방문 가중치에 보정은 넣지 않았다. 이는 단골의 방문 우위가 유지됐다는 관측이며, 모든 단골의 개별 성장 격차까지 보장하는 지표는 아니다.','',
'실제 세이브의 방문·상품·승패·사망을 고정하면, 추가 경험치는 총 '+old.changed.reduce((v,n)=>v+n.extraXP,0)+' → '+estimate.changed.reduce((v,n)=>v+n.extraXP,0)+'이다. 살아 있는 부엔기는 Lv9 → 10, 장마르는 Lv10 → 11로 오른다. 최종 출전 세 명은 여전히 보정 대상이 아니므로 원래 마왕전의 큰 전력 부족은 남는다. 이 후보는 뒤처진 복귀자의 성장·생존을 보완하는 방향이며, 이 판의 마왕 실패를 뒤집는 근거는 없다.','',
'## 변경 범위 · 실행 조건','',
'- 사용자 지시대로 경험치 보정만 변경했다. 기존 5일 후보의 `missed>=5` 한 곳을 `missed>=2`로 바꿨다. 방문 보정·합산 후보는 추가로 재측정하지 않았다.','- 이미 만난 모험가가 방문 가능한 날을 2일 건너뛰고 돌아오면 대상이 된다. 예: D10 방문 → D11·12 미방문 → D13 복귀. 중상 회복·길드 소집 등 방문 불가능한 날은 누적하지 않는다.','- 그 모험가의 레벨이 복귀일 기본 신규 최저 레벨보다 낮을 때만 발동한다. 첫 방문자는 제외한다. 복귀일 목표를 고정하고 직업 숙련·왕립 보너스는 목표에 넣지 않는다.','- 살아 돌아온 일반 원정의 기본 XP만큼 추가해 최대 2배로 지급한다. 추가분만 목표 도달에 필요한 양으로 제한하며, 정상 XP는 유지한다. 목표에 도달하면 종료한다. 따라서 대상이어도 정상 XP만으로 목표를 넘는 원정에서는 추가분이 0일 수 있다.','- 기준 소스: `177d1ab297157c96a80da9049674a9f5feeb23a5`. 이전 4조건 결과는 `ebe7da7052bd4b001d69499fce8d2286742849b0`에 먼저 정리했다. 진행 중인 Production 변경은 사본에 섞지 않았다.','- 추가 실행: 표준 15,000판 + 세이브 조건 2,000판 = 17,000판. 표준 296초, 세이브 조건 두 정책 동시 실행 약 60초. 기준·5일 결과는 이전 원시 파일의 해시를 확인해 재사용했다.','- 표준 명령: `node xp2/tools/measure-v2100.cjs --traj 200 --fresh 1000 --out xp2.json`. 프레시 세 정책 각 1,000판, reader/expert × none/economy/survival × 200궤적 × 10판이다.','- 세이브 조건: 저장 장식 세 칸·직업 숙련 0·해금 상태, 엔비 고정, reader/expert 각 1,000판. 동일 계정 사본에서 시작하고 봇 정책·best-hybrid 점포지원 순위를 유지했다. 실제 점주 행동을 재생한 결과가 아니다.','',
'## 세이브 조건 — 각 조건·봇 1,000판','',
'| 봇 | 조건 | D30 도달 | 클리어 | 도달 후 클리어 | 사망/판 | 추가 XP/판 | 보정 원정/판 | 최종 전력 중앙값 |','| --- | --- | --- | --- | --- | --- | --- | --- | --- |'];
for(const policy of ['reader','expert'])for(const arm of arms){const v=s.profile[arm][policy];l.push(`| ${policy} | ${names[arm]} | ${pct(v.reach)} | ${pct(v.clear)} | ${pct(v.clearGivenReach)} | ${num(v.deaths,3)} | ${num(v.xpBonusPerRun)} | ${num(v.xpBoostedPerRun,2)} | ${num(v.finalPowerMedian,2)} |`);}
l.push('','클리어의 분모는 모든 시작 판이고, 도달 후 클리어의 분모는 D30 도달 판이다. 최종 전력 중앙값은 도달한 집단만의 값이므로 도달자 구성이 달라지는 영향을 받는다. 기준과 2일 후보가 모두 도달한 같은 seed의 전력 차이 중앙값은 두 정책 모두 0이었다. 이를 모든 판의 전력이 그대로라는 뜻으로 읽지는 않는다.','',
'### 2일 후보의 차이 · 같은 seed 짝 비교','',
'| 비교 대상 | 봇 | D30 도달 차이 (%p) | 클리어 차이 (%p) | 사망/판 차이 |','| --- | --- | --- | --- | --- |');
for(const [label,values] of [['기준',s.pairedProfile.xp2],['경험치 5일',s.pairedAgainstXP5.profile]])for(const policy of ['reader','expert']){const v=values[policy];l.push(`| ${label} | ${policy} | ${interval(v.reachPP)} | ${interval(v.clearPP)} | ${interval(v.deaths,3)} |`);}
l.push('','괄호는 95% 정규 근사 범위다. seed마다 차이를 계산해 표준오차를 구했으며 다중비교 보정은 하지 않았다. 범위가 0을 포함하면 방향을 확정하지 않는다.','',
'### 구간 성장 · 단골 우위','',
'| 봇 | 조건 | D1~7 성공 | D8~14 성공 | D15~21 성공 | D22~29 성공 | 단골 방문율 | 비단골 방문율 | 방문율 비 |','| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
for(const policy of ['reader','expert'])for(const arm of arms){const v=s.profile[arm][policy];l.push(`| ${policy} | ${names[arm]} | ${v.bands.map(pct).join(' | ')} | ${pct(v.regularDailyVisit)} | ${pct(v.otherDailyVisit)} | ${num(v.premiumRatio,2)}배 |`);}
l.push('','방문율은 각 아침 방문 가능한 집단 수 대비 방문 수다. 방문 가중치는 그대로지만 성장·생존 변화로 집단 구성과 이후 선택은 달라질 수 있다. 경험치 후보는 장기 미방문 자체를 줄이는 장치가 아니며, 7일 이상 상태 비중은 기준 reader/expert 약 1.80%/1.75%에서 2일 후보 1.88%/1.84%로 관측됐다.','',
'## 실제 세이브 — 기록 고정 추정','',
'두 제공 파일은 SHA-256이 같은 동일 세이브다. 경험치 기록으로 모든 모험가의 원래 종료 레벨·잔여 XP를 정확히 복원하고, 종료 전력도 저장값과 일치하는지 확인했다. 아래는 방문·상품·결과·사망·최종 대원을 고정한 계산이다. 레벨 변화가 이후 승패나 생존을 바꾸는 경로는 포함하지 않는다. 미방문 일수 추정에서는 직전 원정의 기록된 중상 회복일을 제외했으며, 사이의 사건 변화는 종료 기록만으로 확정할 수 없다.','',
'| 모험가 | 종료 생존 | 원래 종료 Lv | 5일 종료 Lv | 2일 종료 Lv | 5일 추가 XP | 2일 추가 XP |','| --- | --- | --- | --- | --- | --- | --- |');
for(const n of estimate.changed){const prev=old.details.find(v=>v.id===n.id);l.push(`| ${n.name} | ${n.alive?'생존':'사망 유지'} | ${n.oldLevel} | ${prev.newLevel} | ${n.newLevel} | ${prev.extraXP} | ${n.extraXP} |`);}
l.push('','최종 출전은 파도르 Lv20 · 메도르 Lv14 · 호두안 Lv13으로 같다. 전력 **153.56 → 153.56**, 최고 난수 판정 **165.84 / 요구 264**로 여전히 클리어할 수 없다. 최종 명단에 없는 모험가의 생존·선택까지 달라지는 가정은 위 봇 시뮬의 범위이며, 봇 클리어율을 이 점주의 개인 클리어 확률로 환산하지 않는다.','',
'## 표준 프레시 — 각 행 1,000판','',
'| 봇 | 조건 | D30 도달 | 클리어 | 사망/판 | 후반 성공 | 상위 4명 성공 | 나머지 성공 | 추가 XP/판 |','| --- | --- | --- | --- | --- | --- | --- | --- |');
for(const policy of ['reader','expert','balanced'])for(const arm of arms){const v=s.standard[arm]['fresh/'+policy+'/none'];l.push(`| ${policy} | ${names[arm]} | ${pct(v.reach)} | ${pct(v.clear)} | ${num(v.deaths,3)} | ${pct(v.bands[3])} | ${pct(v.core.top)} | ${pct(v.core.rest)} | ${num(v.xpBonusPerRun)} |`);}
l.push('','기준 대비 2일 후보 프레시 클리어 차이는 reader +0.9%p(-0.6~+2.4), expert +0.2%p(-1.4~+1.8), balanced +0.3%p(-0.3~+0.9)로 모두 0을 포함한다. 나머지 성공률도 약 +0.2~+0.4%p의 작은 관측 변화다. 상위 4명은 각 판 종료 시 레벨로 정한 집단이며 최종 출전 3명과 다르다.','',
'## 누적 계정 — 10번째 점포, 각 행 200판','',
'| 봇 | 장식 구매 순서 | 조건 | D30 도달 | 클리어 | 사망/판 | 후반 성공 |','| --- | --- | --- | --- | --- | --- | --- |');
for(const policy of ['reader','expert'])for(const deco of ['none','economy','survival'])for(const arm of arms){const v=s.standard[arm][`traj/${policy}/${deco}/run10`];l.push(`| ${policy} | ${deco} | ${names[arm]} | ${pct(v.reach)} | ${pct(v.clear)} | ${num(v.deaths,3)} | ${pct(v.bands[3])} |`);}
l.push('','누적 결과는 이전 클리어·장식·숙련 축적도 후보에 따라 달라진다. 경제 장식 reader처럼 좋아진 행과 생존 장식 reader처럼 기준보다 낮은 행이 함께 있으므로 유리한 행만 골라 토벌 개선으로 판단하지 않는다. 전체 run1·5·10 및 짝 비교 값은 summary-xp2.json에 보관했다.','',
'## 검증 · 적용 상태','',
'- PASS: 1일 미방문 제외 / 2일 미방문 발동 / 첫 방문 제외 / 신규 최저 도달자 제외 / 회복 중 공백 미누적 / 목표 Lv9에서 추가 XP 상한·보정 종료.','- PASS: 5일 후보와 비교해 13개 나머지 파일 byte 일치. 유일한 소스 차이는 shop.js의 미방문 임계값이다. 표준·세이브 조건 결과 행 수, seed 중복 없음, 세 조건 seed 집합 일치, 실행 전후 후보 해시, 이전 원시 파일 해시를 확인했다.','- 실험 원시 JSON은 raw-output-manifest.json 경로에 보관하고 크기·SHA-256을 기록했다. 보고·요약·로그·후보 차이·재현 스크립트를 저장소에 남긴다.','- Production·Canonical·원본 세이브 미적용. 기존의 다른 미커밋 작업은 포함하지 않았다. 전체 테스트·audit·전체 QA·PR·머지는 실행하지 않았다. 이번 PASS는 측정 무결성과 후보 경계 확인이며 밸런스 채택 승인이 아니다.','');
fs.writeFileSync(path.join(root,'REPORT-xp2.md'),l.join('\n'));
console.log('Wrote Korean report · '+l.length+' lines.');
