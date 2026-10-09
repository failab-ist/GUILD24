// 완료된 JSON만 읽는다. 재생·시뮬·Source 수정 없음.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const file=process.argv[2];if(!file)throw Error('사용법: node analyse-500.cjs <full-500.json>');
const buf=fs.readFileSync(file),r=JSON.parse(buf),sum=(a,f=x=>x)=>a.reduce((s,x)=>s+f(x),0),avg=(a,f)=>sum(a,f)/a.length;
assert.equal(crypto.createHash('sha256').update(buf).digest('hex'),'16c57332165d2c4188042bcdd9689a108dec41556456a28b6e03c5a8b48ff6cf','이 보고서는 기록된 20261009 원본만 분석한다');
const names={warrior:'전사',archer:'궁수',mage:'법사',priest:'사제',rogue:'도적',berserker:'광전사',mixed:'6직업 혼합'};
const labels=r.profiles.map(p=>p.name),jobs=Object.keys(r.profiles[0].jobs),N=500;
assert.equal(r.mode,'all');assert.equal(r.inputs.samples,N);assert.equal(r.inputs.runs,N);
assert.deepEqual(r.inputs.policies,['reader','expert']);assert.equal(r.inputs.potential,1);assert.equal(r.inputs.rarity,0);assert.deepEqual(r.inputs.traits,[]);assert.equal(r.inputs.firstRun,false);
assert.equal(r.stats.length,60);assert.equal(r.expeditions.length,1440);assert.ok(r.expeditions.every(x=>x.n===N));
assert.equal(sum(r.expeditions,x=>x.n),720000);assert.equal(r.growth.length,18000);assert.equal(r.runs.length,28);assert.ok(r.runs.every(x=>x.rows.length===N));
for(const x of r.growth){assert.equal(sum(x.bands,b=>b.n),x.n);assert.ok(x.n<=29);}
for(const a of r.runs)for(const x of a.rows){assert.equal(x.firstRun,false);assert.equal(sum(Object.values(x.jobs),j=>j.exp),sum(x.bands,b=>b.n));
 if(x.final)assert.ok(Math.abs(sum(x.final.members,m=>m.power)-x.final.power)<1e-8);}
const clean=x=>{const c=structuredClone(x);delete c.profile;return c;};
for(const job of ['mage','priest','berserker']){
 for(const key of ['expeditions','growth'])assert.deepEqual(r[key].filter(x=>x.profile===labels[0]&&x.job===job).map(clean),r[key].filter(x=>x.profile===labels[1]&&x.job===job).map(clean));
 for(const policy of r.inputs.policies)assert.deepEqual(r.runs.find(a=>a.profile===labels[0]&&a.pool===job&&a.policy===policy).rows,r.runs.find(a=>a.profile===labels[1]&&a.pool===job&&a.policy===policy).rows);
}
// 같은 상품·같은 환경 추첨의 단조성: 공식상 전사 S 증가, 궁수 C→M, 도적 M→C의 방향과 일치해야 한다.
for(const job of ['warrior','archer','rogue']){
 const a=r.expeditions.filter(x=>x.profile===labels[0]&&x.job===job&&x.supply!=='budget'),b=r.expeditions.filter(x=>x.profile===labels[1]&&x.job===job&&x.supply!=='budget');
 for(let i=0;i<a.length;i++){
  const sign=job==='archer'?-1:1;assert.ok((b[i].preparedPower-a[i].preparedPower)*sign>=-1e-9);assert.ok((b[i].combatWon-a[i].combatWon)*sign>=0);
  assert.ok(job==='rogue'?b[i].environment>=a[i].environment:b[i].environment<=a[i].environment);
 }
}
function paired(a,b,f,key){assert.equal(a.length,b.length);assert.ok(a.every((x,i)=>x[key]===b[i][key]));const ds=a.map((x,i)=>f(b[i])-f(x)),m=avg(ds,x=>x),se=Math.sqrt(sum(ds,x=>(x-m)**2)/(ds.length-1)/ds.length);
 return {n:ds.length,delta:m,lo:m-1.96*se,hi:m+1.96*se};}
const runSummary=r.runs.map(a=>{
 const reaches=a.rows.filter(x=>x.day>=30),wins=a.rows.filter(x=>x.win),ends={};
 for(const x of a.rows){const kind=x.win?'클리어':x.day>=30?'마왕 실패':/소문/.test(x.end)?'사망 한도':/자금/.test(x.end)?'파산':'기타';ends[kind]=(ends[kind]||0)+1;}
 const js={};for(const row of a.rows)for(const[id,j]of Object.entries(row.jobs)){const b=js[id]??={npcs:0,exp:0,wins:0,combatLoss:0,env:0,levelGain:0};for(const k of Object.keys(b))b[k]+=j[k];}
 return {profile:a.profile,policy:a.policy,pool:a.pool,n:a.rows.length,reach:reaches.length/N,clear:wins.length/N,givenReach:reaches.length?wins.length/reaches.length:null,reachN:reaches.length,clearN:wins.length,day:avg(a.rows,x=>x.day),deaths:avg(a.rows,x=>x.deaths),ends,jobs:js};
});
const runPairs=[];for(const policy of r.inputs.policies)for(const pool of ['mixed',...jobs]){
 const a=r.runs.find(x=>x.profile===labels[0]&&x.policy===policy&&x.pool===pool).rows,b=r.runs.find(x=>x.profile===labels[1]&&x.policy===policy&&x.pool===pool).rows;
 runPairs.push({policy,pool,reach:paired(a,b,x=>Number(x.day>=30),'seed'),endDay:paired(a,b,x=>x.day,'seed')});
}
const growthSummary=[],growthPairs=[];for(const job of jobs)for(const supply of ['none','same','budget']){
 const pair=labels.map(profile=>r.growth.filter(x=>x.profile===profile&&x.job===job&&x.supply===supply));assert.ok(pair.every(a=>a.length===N));
 for(let i=0;i<2;i++){const a=pair[i];growthSummary.push({profile:labels[i],job,supply,n:N,survival:avg(a,x=>Number(x.alive)),level:avg(a,x=>x.level),equipment:avg(a,x=>x.equipment),expeditions:avg(a,x=>x.n)});}
 growthPairs.push({job,supply,survival:paired(pair[0],pair[1],x=>Number(x.alive),'sample')});
}
const expSummary=[];for(const profile of labels)for(const job of jobs)for(const supply of ['none','same','budget'])for(const state of ['healthy','worn'])for(const day of [4,14,21,29]){
 const a=r.expeditions.filter(x=>x.profile===profile&&x.job===job&&x.supply===supply&&x.state===state&&x.day===day),n=sum(a,x=>x.n);assert.equal(a.length,5);
 expSummary.push({profile,job,supply,state,day,n,success:sum(a,x=>x.success)/n,combat:sum(a,x=>x.combatWon)/n,environment:sum(a,x=>x.environment)/n,deaths:sum(a,x=>x.deaths)/n,meanCost:sum(a,x=>x.cost)/n});
}
const result={status:'BALANCE FINDING',validation:'PASS',sourceHead:r.head,seconds:r.seconds,raw:{file:path.resolve(file),bytes:buf.length,sha256:crypto.createHash('sha256').update(buf).digest('hex')},counts:{independent:720000,growth:18000,runs:14000},inputs:r.inputs,profiles:r.profiles,runSummary,runPairs,growthSummary,growthPairs,expSummary};
const L=['# 6직업 통제 비교 — 각500','',
'상태: **BALANCE FINDING**. 실행 완전성 검증은 **PASS**. 승인 후보 전체가 균형을 이뤘다는 판정은 아니다.','',
'전사 강인함 성장 보완은 개선 신호가 있다. 도적은 전투 쪽으로 분화됐다. 궁수 후보는 전투 패배와 조기 종료가 늘어 현재 묶음을 그대로 Production에 채택할 근거가 부족하다.','',
'## 범위·정합성','',
`고정 HEAD: \`${r.head}\`. 실제 계산 ${r.seconds.toFixed(3)}초(${(r.seconds/60).toFixed(1)}분). 원정720,000회·성장18,000궤적·영업14,000런.`,
'기준/후보 각 조건·직업·정책별500표본. 잠재력1·희귀도0·특성 없음, 보급 예산200G. 영업은 해금6직업·숙련0·첫 런 보호OFF의 실험 계정이다. 자연 희귀도·특성·해금 진행이 있는 일반 플레이의 클리어율로 쓰지 않는다.',
'원정/궤적/런 수·구간 분모·최종 기여 합계·첫 런 보호를 검증했다. 미변경 법사·사제·광전사는 독립 원정·누적 성장·단일 직업 영업의 기준/후보 결과가 정확히 같다. 같은 상품 조건에서 전력·전투·환경의 단조성이 공식과 맞는지도 확인했다.',''];
const f=(v,n=1)=>v==null?'-':v.toFixed(n),pct=v=>v==null?'-':f(v*100)+'%',interval=x=>f(x.delta*100)+'%p ['+f(x.lo*100)+', '+f(x.hi*100)+']';
const table=(h,rows)=>L.push('| '+h.join(' | ')+' |','| '+h.map(()=>'---').join(' | ')+' |',...rows.map(row=>'| '+row.join(' | ')+' |'),'');
L.push('## 실제 영업 — 혼합과 단일 구성','', '각 칸은 기준 → 후보. 단일 구성은 모든 손님이 같은 직업인 실험이다. 혼합 구성의 미변경 직업은 다른 직업 변경에 따른 간접 영향을 받을 수 있다.','');
table(['정책/구성','D30 도달','전체 클리어','평균 종료DAY','D30 도달 수'],runPairs.map(x=>{const a=runSummary.find(s=>s.profile===labels[0]&&s.policy===x.policy&&s.pool===x.pool),b=runSummary.find(s=>s.profile===labels[1]&&s.policy===x.policy&&s.pool===x.pool);return [x.policy+'/'+names[x.pool],pct(a.reach)+' → '+pct(b.reach),pct(a.clear)+' → '+pct(b.clear),f(a.day,2)+' → '+f(b.day,2),a.reachN+' → '+b.reachN];}));
L.push('### 같은 시드의 변화 범위','', '괄호는 짝지은 차이의 근사95% 구간이다(정규근사, 다중 비교 보정 없음). 작은 도달/클리어 표본에는 한계가 있으며, 0회 클리어를 실제 승률0으로 해석하지 않는다.','');
table(['정책/구성','D30 도달 변화·95% 범위','종료DAY 변화·95% 범위'],runPairs.filter(x=>['mixed','warrior','archer','rogue'].includes(x.pool)).map(x=>[x.policy+'/'+names[x.pool],interval(x.reach),f(x.endDay.delta,2)+' ['+f(x.endDay.lo,2)+', '+f(x.endDay.hi,2)+']']));
L.push('## 고정 일정 누적 성장','', '같은 Family/Tier 일정과 외부 보급 예산에서 한 손님의 상태·성장을 누적한다. 종료 평균에는 사망한 궤적도 포함한다. 지갑/재방문/재고 운영은 실제 영업 표에서 읽는다.','');
table(['직업/보급','D29 생존','평균 종료Lv','평균 원정 수','생존 변화·95% 범위'],growthPairs.filter(x=>x.supply!=='none').map(x=>{const a=growthSummary.find(s=>s.profile===labels[0]&&s.job===x.job&&s.supply===x.supply),b=growthSummary.find(s=>s.profile===labels[1]&&s.job===x.job&&s.supply===x.supply);return [names[x.job]+'/'+x.supply,pct(a.survival)+' → '+pct(b.survival),f(a.level,2)+' → '+f(b.level,2),f(a.expeditions,2)+' → '+f(b.expeditions,2),interval(x.survival)];}));
L.push('## 같은 보급 예산의 독립 원정 — 건강','', '각 단계의5 Family를 같은 비중으로 합산한 성공률이다(직업/후보/단계당2500원정). 실제 영업의 게이트 노출 비중과는 다르다. 예산은200G 상한이며 실제 지출은 선택된 상품에 따라 다르다.','');
table(['직업','D4/Lv2/T1','D14/Lv6/T2','D21/Lv10/T2','D29/Lv15/T3'],jobs.map(job=>[names[job],...[4,14,21,29].map(day=>{const a=expSummary.find(x=>x.profile===labels[0]&&x.job===job&&x.supply==='budget'&&x.state==='healthy'&&x.day===day),b=expSummary.find(x=>x.profile===labels[1]&&x.job===job&&x.supply==='budget'&&x.state==='healthy'&&x.day===day);return pct(a.success)+' → '+pct(b.success);})]));
L.push('## 해석','',
'- 전사: 같은 보급 누적 생존26.0→29.4%, 같은 예산86.6→90.8%. 단일 구성 D30 도달은reader2.6→5.0%, expert2.4→6.2%로 개선됐다. 전사 버프 방향의 근거는 있으나 혼합 구성 전체와 마왕전 균형을 확정하지 않는다.',
'- 궁수: 같은 예산 누적 생존83.2→78.0%, 평균 종료Lv21.98→21.17. 단일 구성 도달reader2.4→0.6%, expert2.4→0.4%, 평균 종료가 약1.8~2.2일 빨라졌다. 이 실험에서는 투력 감소가 기동 이득을 상쇄하고 성장 경로를 악화시켰다.',
'- 궁수의 초기 환경: T1의 5 Family는 독·부식·화염·공포·냉기만 요구해 기동 대응 위험이 없다. 초기 투력은 낮아지지만 기동의 환경 대응 이득은 초기 T1에서 사용되지 않는다. 투력 감소와 초기 실패 누적을 분리해서 다음 후보를 검토할 항목이다.',
'- 보급 선택 영향: 궁수 D29 같은 예산은 전투 승리60.8→69.4%지만 환경 사고31.8→47.4%, 최종 성공39.9→36.8%다. 평균 지출183→198G. 높은 기동에도 전투를 보충하는 상품 선택으로 대응 균형이 달라졌다. 같은 상품 비교와 같은 예산 비교를 혼동하지 않는다.',
'- 도적: 같은 상품 누적 생존 28.6→26.4%로 낮아졌지만 같은 예산은 91.4→92.2%다. 단일 구성 일반 원정 성공 reader 43.0→45.3%, expert 43.3→44.8%, 평균 종료DAY 약 1.3~1.5일 증가. 투력/기동 분화에 따른 준비 의존 차이는 생겼다. D30 도달 변화는 reader의 95% 구간이 0을 포함하므로 모두 확정 개선으로 표현하지 않는다.',
'- 나머지 3직업: 수치 미변경이고 단일 구성 결과도 같다. 광전사·도적이 기본 직업보다 좋은 결과를 내지만 이 해금 통제·희귀도/잠재력/특성 고정 실험으로 일반 계정 전체 밸런스를 확정할 수 없다.',
'- 혼합 구성: 도달 reader 7.6→8.2%, expert 5.0→4.8%. 변화 범위가 0을 포함한다. 세 변경을 묶은 전체 개선은 확인하지 못했다.',
'- 마왕전: 단일 구성의 도달 수가 후보 궁수3/2런, 전사25/31런 등으로 작다. 도달 후 클리어율로 새 마왕전 수치를 결정하지 않는다.','',
'## 다음 판단','',
'후보 전체 채택을 권하지 않는다. 전사 보완 방향과 도적 분화 방향은 개별 근거로 읽고, 궁수 투력 감소의 강도/초기·성장 분배를 먼저 다시 정할 필요가 있다. 새 수치와 추가 측정은 아직 승인·실행하지 않았다. 기준 밸런스 판단은 AGENTS §9-B의 표준 도구로 별도 확인한다.','',
'## 원본·재현','',
`원본 JSON: \`${result.raw.file}\` (${result.raw.bytes} bytes)`,
`SHA256: \`${result.raw.sha256}\``,
'명령: `node tools/measure-jobs.cjs --mode all --samples 500 --runs 500 --policies reader,expert --execute --out <새 JSON 경로>`',
'입력과 Source 모듈 해시, 후보 전체 값은 원본 JSON에 있다. 대용량 원본은 위 경로에 보존하고 이 폴더에는 분석·요약·해시를 커밋한다.');
fs.writeFileSync(path.join(__dirname,'summary-500.json'),JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(path.join(__dirname,'summary-500.md'),L.join('\n')+'\n');
console.log('PASS 원본 완전성·미변경 직업 일치·고정 보급 단조성·짝지은 분모. BALANCE FINDING: 궁수 후보 약화.');
console.log(JSON.stringify({seconds:r.seconds,rawBytes:result.raw.bytes,summary:path.join(__dirname,'summary-500.md')},null,2));
