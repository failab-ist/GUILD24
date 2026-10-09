// 완료된 JSON만 읽는다. 시뮬레이션·원정 재생 없음.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const dir=path.resolve(process.argv[2]||''),manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json')));assert.equal(manifest.status,'complete');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),sum=(a,f=x=>x)=>a.reduce((v,x)=>v+f(x),0),avg=(a,f)=>a.length?sum(a,f)/a.length:null,ratio=(a,b)=>b?a/b:null;
const median=a=>{if(!a.length)return null;const b=a.slice().sort((x,y)=>x-y);return b[Math.floor(b.length/2)];};
const names={A:'기준',B:'게이트/화염',C:'성장/부스트',D:'둘 다'},jobNames={warrior:'전사',archer:'궁수',mage:'법사',priest:'사제',rogue:'도적',berserker:'광전사'};
const pinned={"A":"c6aa62e463f70de511a1eb44733adda218fb1a07749e29917cabd4226d3f433c","B":"5fbc2c4af3f0b9bae246993c40084314299ca0373f4198903bb9529f3f5a9e4d","C":"0b8d60eb3d25bad57208c2dd12282486905ad876fceac0c53a5db0888cb70a8e","D":"fba4e9bff7a7cc17311d28dcc529c96ef3c01eb1ad39d7f84134b724c83271b8"};
const raw={};for(const c of manifest.completed){const bytes=fs.readFileSync(c.file);assert.equal(sha(bytes),pinned[c.id],"기록된 20261009 원본만 분석");assert.equal(c.sha256,pinned[c.id]);const r=JSON.parse(bytes);assert.equal(r.meta.firstRunLessons,true);raw[c.id]=r;}
assert.deepEqual(Object.keys(raw),['A','B','C','D']);
function stats(rows){const total=k=>sum(rows,r=>r[k]||0),reach=total('reach'),win=total('win'),ends={};
 for(const r of rows){const kind=r.win?'클리어':r.reach?'마왕실패':/소문/.test(r.end)?'사망한도':/자금/.test(r.end)?'파산':'기타';ends[kind]=(ends[kind]||0)+1;}
 const core=g=>{const w=sum(rows,r=>r.core[g][0]),n=sum(rows,r=>r.core[g][1]);return {success:ratio(w,n),exp:n,deaths:avg(rows,r=>r.core[g][2])};};
 const bands=[0,1,2,3].map(k=>{const wins=sum(rows,r=>r.bands[k][0]),n=sum(rows,r=>r.bands[k][1]);return {wins,n,rate:ratio(wins,n)};});
 const supplied=rows.filter(r=>r.reach&&r.final?.supplied),full=rows.filter(r=>r.reach&&r.final?.fullPack);
 return {n:rows.length,reachN:reach,winN:win,reach:ratio(reach,rows.length),win:ratio(win,rows.length),clearOnReach:ratio(win,reach),day:avg(rows,r=>r.day),medianDay:median(rows.map(r=>r.day)),deaths:avg(rows,r=>r.deaths),d10:avg(rows,r=>r.d10),injDep:avg(rows,r=>r.injDep),injDeath:ratio(total('injDeath'),total('injDep')),zombie:avg(rows,r=>+r.zombie),env:ratio(total('env'),sum(rows,r=>r.all[1])),bands,ends,top:core('top'),rest:core('rest'),cash:avg(rows,r=>r.cash),capital:avg(rows,r=>r.gain),ownedDecorations:avg(rows,r=>r.deco),finalLevel:avg(rows.flatMap(r=>r.final?.members||[]),m=>m.level),supplied:{n:supplied.length,clear:avg(supplied,r=>r.win)},fullPack:{n:full.length,clear:avg(full,r=>r.win)}};
}
function paired(a,b,f){assert.equal(a.length,b.length);const map=new Map(b.map(r=>[r.seed,r]));assert.equal(map.size,b.length);const ds=a.map(r=>{assert.ok(map.has(r.seed));return f(map.get(r.seed))-f(r);});const delta=avg(ds,x=>x),v=sum(ds,x=>(x-delta)**2)/(ds.length-1),se=Math.sqrt(v/ds.length);return {n:ds.length,delta,lo:delta-1.96*se,hi:delta+1.96*se};}
const summaries=[],pairs=[],cohorts=[],jobs=[];
for(const [id,r]of Object.entries(raw))for(const [arm,{rows}]of Object.entries(r.arms)){
 const fresh=arm.includes('/fresh/'),deco=arm.split('/').at(-1);assert.equal(rows.length,fresh?1000:2000);
 for(const idx of fresh?[0]:[0,1,4,9]){const xs=rows.filter(r=>r.idx===idx);summaries.push({id,kind:fresh?'fresh':'traj',deco,idx,...stats(xs)});
  if(id!=='A'){const ys=raw.A.arms[arm].rows.filter(r=>r.idx===idx);pairs.push({id,kind:fresh?'fresh':'traj',deco,idx,reach:paired(ys,xs,r=>r.reach),win:paired(ys,xs,r=>r.win),day:paired(ys,xs,r=>r.day),d10:paired(ys,xs,r=>r.d10),deaths:paired(ys,xs,r=>r.deaths)});}
 }
 if(!fresh){const grouped=new Map();for(const row of rows){assert.equal(+row.seed.split('-').at(-1),row.idx);const key=row.seed.slice(0,row.seed.lastIndexOf('-'));if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(row);}assert.equal(grouped.size,200);
  const first=[];for(const xs of grouped.values()){assert.equal(xs.length,10);first.push(xs.filter(r=>r.win).sort((a,b)=>a.idx-b.idx)[0]?.idx+1||null);}
  const cleared=first.filter(Boolean),ranked=first.map(x=>x??Infinity);cohorts.push({id,deco,n:200,clearBy10:cleared.length/200,medianFirstClearAll:median(ranked)===Infinity?null:median(ranked),medianAmongClearers:median(cleared),clearByRun:[1,2,3,5,10].map(run=>[run,first.filter(x=>x!==null&&x<=run).length/200])});
 }
 const subset=fresh?rows:rows.filter(r=>r.idx===9);
 for(const [job,name]of Object.entries(jobNames)){const xs=subset.flatMap(r=>r.jobs[job]?[r.jobs[job]]:[]),npc=sum(xs,x=>x.npcs),exp=sum(xs,x=>x.exp),picks=sum(xs,x=>x.finalPicks);
  jobs.push({id,kind:fresh?'fresh':'traj10',deco,job,name,npc,exp,wins:ratio(sum(xs,x=>x.wins),exp),combatLoss:ratio(sum(xs,x=>x.combatLoss),exp),environment:ratio(sum(xs,x=>x.env),exp),death:ratio(sum(xs,x=>x.deaths),exp),alive:ratio(sum(xs,x=>x.alive),npc),firstLevel:ratio(sum(xs,x=>x.firstLevel),npc),endLevel:ratio(sum(xs,x=>x.level),npc),levelGain:ratio(sum(xs,x=>x.levelGain),npc),potential:ratio(sum(xs,x=>x.potential),npc),picks,finalLevel:ratio(sum(xs,x=>x.finalLevel),picks),finalPower:ratio(sum(xs,x=>x.finalPower),picks)});
 }
}
const result={validity:'PASS',raw:manifest.completed,source:manifest.source,summaries,pairs,cohorts,jobs};
const L=[],pct=x=>x===null?'—':(x*100).toFixed(1)+'%',f=(x,d=2)=>x===null?'—':x.toFixed(d),ci=p=>f(p.delta*100,1)+' ['+f(p.lo*100,1)+', '+f(p.hi*100,1)+']';
function table(cols,rows){L.push('| '+cols.join(' | ')+' |','| '+cols.map(()=> '---').join(' | ')+' |',...rows.map(r=>'| '+r.join(' | ')+' |'),'');}
L.push('# reader 전용 4조건·28,000판 결과','', '측정 완전성 PASS. 조건마다 프레시1000판, 장식3정책×200궤적×10판. 동일 reader와 시드 집합, 채택된 6직업을 공통으로 사용했다. 첫 계정 보호는 첫 판만 ON. 추가 시뮬레이션 없이 원본 JSON을 읽었다.','', 'A 기준, B 일반 게이트/화염, C 성장/부스트, D 둘 다. 전역 두 패키지는 실험 사본에만 적용했으며 채택 전이다.','', '## 프레시 계정','');
const fresh=summaries.filter(s=>s.kind==='fresh');
table(['조건','D30 도달','전체 클리어','도달 후 클리어','평균 종료DAY','사망/판','D10까지 사망','좀비'],fresh.map(s=>[names[s.id],pct(s.reach)+' ('+s.reachN+')',pct(s.win)+' ('+s.winN+')',pct(s.clearOnReach),f(s.day),f(s.deaths),f(s.d10),pct(s.zombie)]));
table(['조건','D1~7 성공','D8~14','D15~21','D22~29','상위4명 성공/사망','나머지 성공/사망','부상 출발/판·사망률','현금/일'],fresh.map(s=>[names[s.id],...s.bands.map(b=>pct(b.rate)),pct(s.top.success)+' / '+f(s.top.deaths),pct(s.rest.success)+' / '+f(s.rest.deaths),f(s.injDep,1)+' · '+pct(s.injDeath),f(s.cash)]));
table(['조건','사망한도','파산','마왕실패','종료DAY 중앙','보급 완료 도달 수·클리어','최종 선발 평균Lv'],fresh.map(s=>[names[s.id],pct((s.ends.사망한도||0)/s.n),pct((s.ends.파산||0)/s.n),pct((s.ends.마왕실패||0)/s.n),s.medianDay,s.supplied.n+' · '+pct(s.supplied.clear),f(s.finalLevel)]));
L.push('## 기준 대비 같은 시드 변화','', '차이 단위는%p, 괄호는 짝지은 평균 차이의 근사95% 범위다. 다중 비교 보정 없음. 판정 결과가 달라지면 이후 추첨·방문도 달라진다. 도달 후 클리어는 각 조건에서 살아남은 집단이 달라지므로 같은 고정 파티 승률 변화로 해석하지 않는다.','');
table(['조건','프레시 도달 변화','프레시 전체 클리어 변화','평균 종료DAY 변화·95%'],pairs.filter(p=>p.kind==='fresh').map(p=>[names[p.id],ci(p.reach),ci(p.win),f(p.day.delta)+' ['+f(p.day.lo)+', '+f(p.day.hi)+']']));
L.push('## 연속 계정 — 각 점포 시작 장식 수와 진행','');
table(['조건/장식','판수','D30 도달','전체 클리어','도달 후 클리어','사망/판','시작 장식 평균','자본/판'],summaries.filter(s=>s.kind==='traj').sort((a,b)=>a.deco.localeCompare(b.deco)||a.idx-b.idx||a.id.localeCompare(b.id)).map(s=>[names[s.id]+'/'+s.deco,s.idx+1,pct(s.reach),pct(s.win),pct(s.clearOnReach),f(s.deaths),f(s.ownedDecorations,1),f(s.capital,0)]));
table(['조건/장식','10판 안 첫 클리어','전체계정 첫 클리어 중앙','클리어계정만 중앙','1/2/3/5/10판 내 누적'],cohorts.map(s=>[names[s.id]+'/'+s.deco,pct(s.clearBy10),s.medianFirstClearAll??'10판 내 미도달',s.medianAmongClearers??'없음',s.clearByRun.map(([run,rate])=>run+': '+pct(rate)).join(' / ')]));
L.push('## 직업 노출·성장 — 프레시','', '직업별 희귀도·출현일·목적지·재방문·사망·보급이 다르다. 해금 직업은 실제 계정 진행에 따르므로 프레시에 도적/광전사 표본이 없을 수 있다. 성장 평균은 사망/조기 종료된 손님도 포함한다. 끝의 상위4명 분류 역시 생존·성장 결과에 따른 분류다. 서로 다른 직업의 우열을 인과적으로 확정하지 않는다.','');
table(['조건/직업','손님/원정 수','성공','전투 패배','환경 사고','원정당 사망','시작Lv→종료Lv','Lv 증가/손님','최종 선발 수·Lv·기여'],jobs.filter(s=>s.kind==='fresh'&&s.npc).map(s=>[names[s.id]+'/'+s.name,s.npc+' / '+s.exp,pct(s.wins),pct(s.combatLoss),pct(s.environment),pct(s.death),f(s.firstLevel)+' → '+f(s.endLevel),f(s.levelGain),s.picks+' · '+f(s.finalLevel)+' · '+f(s.finalPower)]));
L.push('## 판단 — BALANCE FINDING','',
'- 게이트/화염 패키지는 프레시 도달을23.0→11.5%로 낮췄다. 같은 시드 차이의95% 범위는−14.6~−8.4%p로0을 포함하지 않는다. 결합안도11.7%다. D30 도달을 줄이는 레버는 확인됐지만 가벼운 미세조정이라고 보기에는 효과가 크다. 절대 목표 도달률이 승인되지 않았으므로 목표 위반 PASS/FAIL을 임의로 붙이지 않는다.',
'- 게이트 단독은 D1~7 성공46.3→43.4%, D8~14는42.4→37.9%, 평균 종료DAY19.68→17.26, D10까지 사망3.40→3.65다. 핵심4명 외 성공26.0→22.3%. 초중반 실패와 누적 성장/경제에 함께 영향이 났다. 사망/판8.11→7.81만 보고 쉬워졌다고 읽으면 안 된다. 끝난 날이 앞당겨지고 사망한도 종료는76.6→87.2%로 늘었다.',
'- 도달 후 클리어31.7→45.2%는 마왕전 수치를 낮춘 효과가 아니다. 마왕전은 동일하며 도달 파티/보급 집단이 달라졌다. 프레시 전체 클리어는7.3→5.2%로 낮아졌다.',
'- 성장/부스트 단독은 도달23.0→23.2%, 차이95% 범위−2.3~+2.7%p다. 결합안 대 게이트 단독도+0.2%p(−1.6~+2.0%p). 이 강도에서 도달 개선이나 게이트 완충을 확인하지 못했다. 성장 비용과 부스트를 따로 비교한 실험이 아니므로 각각의 효과가 없다고 단정하지 않는다.',
'- 연속 계정까지 영향이 이어진다. 생존 장식의10판째 도달87→74%, 경제 장식37→27%. 전체 계정의 첫 클리어 중앙은 생존5→8판, 경제6→10판이다. 결합안도 각각8/10판이다. 먼저 프레시만 어려워지고 계정 성장감은 유지되는 패키지라고 볼 근거는 없다.',
'- 이번 표준 측정은 기본4직업 프레시 표본을 제공하며 도적은 해금 후 소수 표본만 있다. 광전사는 전체28,000판에서 출전 표본0이다. 새6직업 전체의 실전 균형 PASS를 의미하지 않는다. 이전 각500 통제 실험은 수정 전 궁수/도적/광전사 후보였으므로 현재 채택값의 재측정으로 인용하지 않는다.',
'- 권장: 승인 직업 조정은 유지하고 전역 두 패키지는 바로 채택하지 않는다. 도달 난이도를 조정하려면 게이트 가산 강도/적용 시점을 더 좁히는 초안을 먼저 정하는 편이 낫다. 성장/부스트를 더 세게 바꿔 상쇄하는 것은 이번 결과만으로 근거가 없다. 다음 수치와 재측정은 별도 승인 전이며 이번 작업에서 자동 조정하지 않았다.','');
L.push('## 원본 및 한계','', '실행 중 네 사본 HEAD/Source/측정 도구 해시 고정, 종료코드0, 분모·첫 판 보호·최종 기여합을 검사했다. raw에는 부상 출발과 최종 보급 여부가 있다. 처진 손님에게 추가된 EXP를 직접 구분한 카운터는 없으므로 부스트 발동 횟수/추가EXP는 이번 결과에서 산출할 수 없다. 연속 계정 원본은 장식 구매 후 마지막 정산 원장을 보존하지 않으므로 마지막 판 직후 장식 획득일을 추정하지 않는다.','');
for(const c of manifest.completed)L.push('- '+c.id+' `'+c.file+'` — '+c.seconds.toFixed(1)+'초, '+c.bytes+'bytes, SHA256 `'+c.sha256+'`');
L.push('', 'Source HEAD: '+Object.entries(manifest.source).map(([id,s])=>id+' `'+s.head+'`').join(', ')+'.','');
fs.writeFileSync(path.join(dir,'summary.json'),JSON.stringify(result,null,2)+'\n');fs.writeFileSync(path.join(dir,'REPORT.md'),L.join('\n').trimEnd()+'\n');
console.log(JSON.stringify({fresh,pairs:pairs.filter(p=>p.kind==='fresh'),cohorts},null,2));
