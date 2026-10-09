// 직업 비교 실험 도구. AGENTS §9-A/9-B: 측정은 승인 후 실행; 기준 측정을 대체하지 않는다.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{execFileSync}=require('node:child_process');
const {BANDS,RANK,jobMetrics}=require('./measure-v2100.cjs');
const MODULES=['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'];
const STAGES=[{day:4,level:2,tier:1},{day:14,level:6,tier:2},{day:21,level:10,tier:2},{day:29,level:15,tier:3}];
const FAMILIES=['spider','slime','golem','crypt','snow'],SUPPLIES=['none','same','budget'];
const STATES=[{name:'healthy',injury:0,fatigue:0},{name:'worn',injury:1,fatigue:25}];
const MODES=['plan','stats','expeditions','growth','runs','all'];
const clone=x=>structuredClone(x),sum=(xs,f=x=>x)=>xs.reduce((s,x)=>s+f(x),0),ok=r=>['성공','대성공'].includes(r.outcome);
function load(root){for(const f of MODULES)require(path.join(root,'dist',f+'.js'));return globalThis.GUILD24||globalThis;}
function profile(G,input){
 if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['name','jobs'].includes(k))||typeof input.name!=='string'||!input.name.trim()||!input.jobs||typeof input.jobs!=='object'||Array.isArray(input.jobs))throw Error('후보는 name과 jobs만 가진 객체여야 합니다.');
 const ids=Object.keys(input.jobs);if(!ids.length)throw Error('변경할 직업이 없습니다.');
 for(const id of ids){const j=input.jobs[id];if(!G.DATA.jobs.some(x=>x.id===id)||!j||Object.keys(j).sort().join(',')!=='growth,stats')throw Error('직업 후보는 기존 id의 stats/growth만 바꿀 수 있습니다: '+id);
  for(const k of ['stats','growth'])if(!Array.isArray(j[k])||j[k].length!==4||j[k].some(v=>typeof v!=='number'||!Number.isFinite(v)||v<=0))throw Error(id+' '+k+': 양수 4개가 필요합니다.');}
 return {name:input.name,jobs:Object.fromEntries(G.DATA.jobs.map(j=>[j.id,clone(input.jobs[j.id]||{stats:j.stats,growth:j.growth})]))};
}
function current(G){return profile(G,{name:'source',jobs:Object.fromEntries(G.DATA.jobs.map(j=>[j.id,{stats:j.stats,growth:j.growth}]))});}
function withProfile(G,p,fn){const saved=G.DATA.jobs.map(j=>[j,j.stats,j.growth]);
 try{for(const j of G.DATA.jobs){j.stats=p.jobs[j.id].stats.slice();j.growth=p.jobs[j.id].growth.slice();}return fn();}
 finally{for(const[j,stats,growth]of saved){j.stats=stats;j.growth=growth;}}
}
function actor(G,id,level,o={},state={injury:0,fatigue:0}){
 const j=G.DATA.jobBy[id],potential=o.potential??1;
 return {id:'npc-1',name:j.name,job:id,rarity:o.rarity??0,level,xp:0,potential,
  stats:Object.fromEntries(G.Adventurer.keys.map((k,i)=>[k,Math.round(j.stats[i]+(level-1)*j.growth[i]*potential)])),
  traits:(o.traits||[]).slice(),status:state.injury?'부상':'건강',injury:state.injury,recovery:0,fatigue:state.fatigue,
  equipment:{name:'비교 장비',power:0,tier:0},loyalty:0,money:0,history:[],records:[],visits:0,alive:true,pack:[],refused:[],introduced:true};
}
function gate(G,day,family,tier){return G.Game.prototype.makeDungeon.call({run:{day},burden(){}},family,tier);}
function statRows(G,p,o){return withProfile(G,p,()=>G.DATA.jobs.flatMap(j=>[1,5,10,15,20].map(level=>{
 const stats=Object.fromEntries(G.Adventurer.keys.map((k,i)=>[k,j.stats[i]+(level-1)*j.growth[i]*o.potential]));
 const growth=Object.fromEntries(G.Adventurer.keys.map((k,i)=>[k,j.growth[i]*o.potential]));
 const defense=Object.fromEntries(Object.keys(G.DATA.hazards).map(h=>{const r=G.Dungeon.hazardRule(h);return [h,{value:stats[r.stat]*r.coef,growth:growth[r.stat]*r.coef}];}));
 return {profile:p.name,job:j.id,level,stats,power:G.Dungeon.preparedPower(stats),powerGrowth:G.Dungeon.preparedPower(growth),defense};
})));}
function packCost(G,ids){return sum(ids,id=>G.DATA.itemBy[id].buy);}
// 보급 정책은 전투/환경/부상 경로의 성공 추정값을 최대화한다. 보험·지원 효과까지의 최적해라고 주장하지 않는다.
function preparation(G,n,d,ids){const p=G.Dungeon.prepare({...n,pack:ids},d,[]),a=G.Dungeon.preparedPower(p.effects),w=G.DATA.balance.combatNoise+(p.effects.variance||0);
 const combat=w?Math.max(0,Math.min(1,((1+w)-d.power/a)/(2*w))):Number(a>=d.power);
 return {score:combat*(1-G.Dungeon.envChance(p.hazard,p.effects.survival))*(1-Math.max(0,Math.min(1,p.effects.injuryRisk||0))),power:a,hazards:p.hazards};
}
function choosePack(G,n,d,mode,budget){
 if(mode==='none')return [];
 const same=['lunchbox','lowpotion'];if(mode==='same')return packCost(G,same)<=budget?same:[];
 if(mode!=='budget')throw Error('없는 보급 정책입니다: '+mode);
 const items=G.DATA.items.filter(it=>!it.metaUnlock&&it.buy<=budget).map(it=>it.id).sort();
 let best=[],score=preparation(G,n,d,best).score,cost=0;
 const consider=ids=>{const c=packCost(G,ids);if(c>budget)return;const s=preparation(G,n,d,ids).score;
  if(s>score+1e-12||Math.abs(s-score)<=1e-12&&c<cost){best=ids;score=s;cost=c;}};
 for(let i=0;i<items.length;i++){consider([items[i]]);for(let k=i;k<items.length;k++)consider([items[i],items[k]]);}
 return best;
}
function counter(){return {n:0,success:0,combatWon:0,environment:0,deaths:0,injuredDepartures:0,wonThenEnvironment:0,xp:0,loot:0,cost:0,ratio:0,outcomes:{}};}
function add(m,r,cost){m.n++;m.success+=Number(ok(r));m.combatWon+=Number(r.combatWon);m.environment+=Number(r.environmentHurt);m.deaths+=Number(r.outcome==='사망');
 m.injuredDepartures+=Number(r.departedInjured);m.wonThenEnvironment+=Number(r.combatWon&&r.environmentHurt);m.xp+=r.xp;m.loot+=r.loot;m.cost+=cost;m.ratio+=1+r.greatMargin;m.outcomes[r.outcome]=(m.outcomes[r.outcome]||0)+1;}
function finish(m){return {...m,successRate:m.n?m.success/m.n:null,combatWinRate:m.n?m.combatWon/m.n:null,environmentRate:m.n?m.environment/m.n:null,deathRate:m.n?m.deaths/m.n:null,meanRatio:m.n?m.ratio/m.n:null};}
function expeditions(G,p,o){return withProfile(G,p,()=>{
 const rows=[];
 for(const j of G.DATA.jobs)for(const stage of STAGES)for(const family of FAMILIES)for(const state of STATES)for(const supply of SUPPLIES){
  const n=actor(G,j.id,stage.level,o,state),d=gate(G,stage.day,family,stage.tier),pack=choosePack(G,n,d,supply,o.budget),m=counter(),cost=packCost(G,pack);
  const prep=preparation(G,n,d,pack);
  for(let i=0;i<o.samples;i++){const c=clone(n);c.pack=pack.slice();const rng=new G.RNG(o.seed+':exp:'+stage.day+':'+family+':'+state.name+':'+i);add(m,G.Dungeon.resolve(c,d,rng,[],undefined,0),cost);}
  rows.push({profile:p.name,job:j.id,...stage,family,state:state.name,supply,pack,cost,preparedPower:prep.power,hazards:prep.hazards,...finish(m)});
 }
 return rows;
});}
function resetMorning(G,n,day){G.Game.prototype.morningReset.call({run:{day,npcs:[n],facilities:[],daily:{},branch:'직업 비교'}},null);}
function growth(G,p,o){return withProfile(G,p,()=>{
 const rows=[];
 for(const j of G.DATA.jobs)for(const supply of SUPPLIES)for(let i=0;i<o.samples;i++){
  const n=actor(G,j.id,1,o),m=counter(),snapshots=[],bands=BANDS.map(()=>counter());let restDays=0;
  const snapshot=day=>snapshots.push({day,alive:n.alive,level:n.level,stats:clone(n.stats),equipment:n.equipment.power,fatigue:n.fatigue,injury:n.injury,money:n.money});
  for(let day=1;day<30&&n.alive;day++){
   resetMorning(G,n,day);
   if(n.recovery){restDays++;if([7,14,21,29].includes(day))snapshot(day);continue;}
   const input=new G.RNG(o.seed+':schedule:'+i+':'+day),family=input.pick(FAMILIES),tier=input.weighted([1,2,3],G.Dungeon.tierWeights(day));
   const d=gate(G,day,family,tier),pack=choosePack(G,n,d,supply,o.budget),cost=packCost(G,pack);n.pack=pack;
   const r=G.Dungeon.resolve(n,d,new G.RNG(o.seed+':growth:'+i+':'+day),[],undefined,0);add(m,r,cost);add(bands[BANDS.findIndex(([a,b])=>day>=a&&day<=b)],r,cost);
   if([7,14,21,29].includes(day)||!n.alive)snapshot(day);
  }
  rows.push({profile:p.name,job:j.id,supply,sample:i,alive:n.alive,level:n.level,equipment:n.equipment.power,fatigue:n.fatigue,money:n.money,restDays,snapshots,bands:bands.map(finish),...finish(m)});
 }
 return rows;
});}
// 실제 영업 루프는 기존 봇을 사용한다. all6/mixed와 직업별 single은 해금·숙련 없이 만든 실험 계정이다.
function runArm(G,p,o,policy,pool,simulate=G.Debug.simulate){return withProfile(G,p,()=>{
 const A=G.Adventurer,M=G.Meta,P=G.Game.prototype,saved={create:A.create,unlocked:M.jobUnlocked,mastery:M.jobMastery,start:P.start,open:P.open,end:P.end};
 const initial=new WeakMap(),seen=new WeakSet(),rows=[];
 try{
  M.jobUnlocked=()=>true;M.jobMastery=()=>0;
  A.create=function(r,index,day,account,opts){const n=saved.create(r,index,day,account,opts);
   if(pool!=='mixed')n.job=pool;
   n.rarity=o.rarity;n.potential=o.potential;n.traits=o.traits.slice();
   const j=G.DATA.jobBy[n.job];n.stats=Object.fromEntries(A.keys.map((k,i)=>[k,Math.round(j.stats[i]+(n.level-1)*j.growth[i]*n.potential)]));
   initial.set(n,{level:n.level,day,mastery:0});return n;};
  P.start=function(seed){this.lessons=o.firstRun;return saved.start.call(this,o.seed+':'+seed);};
  P.open=function(){for(const id of this.run.queue){const n=this.run.npcs.find(x=>x.id===id);if(n&&!initial.has(n))throw Error('초기 직업 상태 누락');}return saved.open.apply(this,arguments);};
  P.end=function(){const result=saved.end.apply(this,arguments),s=this.run;if(seen.has(s))return result;seen.add(s);
   const recs=s.npcs.flatMap(n=>n.records||[]).filter(r=>!r.deep&&r.day<30);
   rows.push({seed:s.seed,day:s.day,win:!!s.win,deaths:s.stats.deaths,firstRun:!!s.firstRun,end:s.endReason,
    ...jobMetrics(s,initial,G.DATA.jobBy,G.Dungeon.preparedPower,G.DATA.balance.finalGapPenalty),
    bands:BANDS.map(([a,b])=>{const rs=recs.filter(r=>r.day>=a&&r.day<=b);return {n:rs.length,success:rs.filter(ok).length};})});return result;};
  const summary=simulate(o.runs,policy,null,'adaptive','hybrid',{relicAware:true,relicPriority:RANK});
  if(rows.length!==o.runs)throw Error('영업 런 결과 누락: '+rows.length+'/'+o.runs);
  return {profile:p.name,policy,pool,rows,summary:{runs:summary.runs,reached30:summary.reached30,wins:summary.wins,deaths:summary.deaths,averageDay:summary.averageDay}};
 }finally{A.create=saved.create;M.jobUnlocked=saved.unlocked;M.jobMastery=saved.mastery;P.start=saved.start;P.open=saved.open;P.end=saved.end;}
});}
function planned(o){return {profiles:2,jobs:6,stages:STAGES,supplies:SUPPLIES,states:STATES,
 independentResolutions:2*6*STAGES.length*FAMILIES.length*STATES.length*SUPPLIES.length*o.samples,
 growthTrajectories:2*6*SUPPLIES.length*o.samples,growthDaysPerTrajectory:29,
 fullRuns:2*7*o.policies.length*o.runs,policies:o.policies,samples:o.samples,runsPerArm:o.runs,budget:o.budget,
 estimatedSeconds:null,note:'실행 시간 미측정. 측정 전 명령·정책·규모·예상 시간을 별도 확인한다.'};}
function options(args){
 const o={mode:'plan',root:path.resolve(__dirname,'..'),profile:path.join(__dirname,'job-balance-candidate.json'),samples:100,runs:100,budget:200,potential:1,rarity:0,traits:[],policies:['reader','expert'],seed:'job-balance',firstRun:false,execute:false};
 const numeric=['samples','runs','budget','potential','rarity'];
 for(let i=0;i<args.length;i++){
  const k=args[i].replace(/^--/,'');if(args[i]==='--help'){o.help=true;continue;}if(['execute','first-run'].includes(k)){o[k==='first-run'?'firstRun':'execute']=true;continue;}
  if(!['mode','root','profile','out','seed','traits','policies',...numeric].includes(k)||!args[i].startsWith('--')||!args[i+1]||args[i+1].startsWith('--'))throw Error('인자를 확인하세요: '+args[i]);
  const v=args[++i];o[k]=numeric.includes(k)?Number(v):['traits','policies'].includes(k)?v.split(',').filter(Boolean):v;
 }
 if(!MODES.includes(o.mode))throw Error('없는 mode입니다.');
 for(const k of ['samples','runs','budget'])if(!Number.isSafeInteger(o[k])||o[k]<(k==='budget'?0:1))throw Error(k+'는 범위 안의 정수여야 합니다.');
 if(!Number.isFinite(o.potential)||o.potential<=0||!Number.isInteger(o.rarity)||o.rarity<0||o.rarity>4)throw Error('잠재력/희귀도를 확인하세요.');
 if(!o.seed.trim())throw Error('seed가 비어 있습니다.');
 if(!o.policies.length||new Set(o.policies).size!==o.policies.length||o.policies.some(p=>!['reader','expert'].includes(p)))throw Error('정책은 reader,expert 중 중복 없이 선택하세요.');
 if(new Set(o.traits).size!==o.traits.length)throw Error('특성 중복');
 if(!['plan','stats'].includes(o.mode)&&(!o.execute||!o.out))throw Error('측정은 승인 후 --execute와 --out을 명시해 실행하세요.');
 if(o.out){o.out=path.resolve(o.out);if(!/\.json$/i.test(o.out))throw Error('--out은 .json 파일이어야 합니다.');
  const rel=path.relative(path.resolve(o.root),o.out);if(/^(dist|design_ssot|tests|tools|\.git)([\\/]|$)/i.test(rel))throw Error('Source/설계/도구 경로에는 결과를 쓸 수 없습니다.');
  for(const f of [o.out,o.out.replace(/\.json$/i,'')+'.md'])if(fs.existsSync(f))throw Error('기존 결과를 덮어쓰지 않습니다: '+f);
 }
 return o;
}
function fingerprint(root){return Object.fromEntries(MODULES.map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'dist',f+'.js'))).digest('hex')]));}
function markdown(r){const L=['# 직업 비교 도구 결과','',`mode: ${r.mode} · HEAD: ${r.head}`,'',
 '직업 후보 비교 실험이다. 실제 해금 진행과 표준 밸런스 측정 결과를 대체하지 않는다. 같은 시드는 공통 입력이며 분기 이후 모든 RNG 소비가 같다는 뜻은 아니다.','',
 '단일 원정은 장비0·같은 레벨/잠재력/특성/희귀도, 점포지원·장식·사건·숨은 지원 없음. 가격은 매입가 기준의 같은 보급 예산이다.',
 '누적 성장은 한 손님의 고정 방문 일정 실험이며 재방문/점포 경제를 재현하지 않는다. 영업 비교가 실제 봇·재방문·재고·지갑·마왕전 경로를 확인한다.',''];
 const table=(h,rows)=>L.push('| '+h.join(' | ')+' |','| '+h.map(()=>'---').join(' | ')+' |',...rows.map(row=>'| '+row.join(' | ')+' |'),'');
 const f=(v,n=2)=>v==null?'-':Number(v).toFixed(n),pct=v=>v==null?'-':f(v*100,1)+'%';
 if(r.stats){L.push('## 전력·성장·동일 비중 환경 대응','');table(['후보','직업','Lv','전력','전력 성장','강인함 계열','기동 계열','정신 계열'],r.stats.map(x=>[x.profile,x.job,x.level,f(x.power,3),f(x.powerGrowth,3),f(x.defense.poison.value),f(x.defense.bind.value),f(x.defense.fire.value)]));}
 if(r.expeditions){L.push('## 독립 원정','');table(['후보/직업','DAY/Family/상태/보급','출발','성공','전투 승리','환경 사고','사망','비용'],r.expeditions.map(x=>[x.profile+'/'+x.job,[x.day,x.family,x.state,x.supply].join('/'),x.n,pct(x.successRate),pct(x.combatWinRate),pct(x.environmentRate),pct(x.deathRate),x.cost]));}
 if(r.growth){L.push('## 고정 일정 누적 성장','');table(['후보/직업/보급','궤적','D29 생존','평균 종료Lv','평균 장비투력','평균 원정 수'],r.profiles.flatMap(p=>Object.keys(p.jobs).flatMap(job=>SUPPLIES.map(supply=>{const a=r.growth.filter(x=>x.profile===p.name&&x.job===job&&x.supply===supply),n=a.length;return [p.name+'/'+job+'/'+supply,n,pct(n?sum(a,x=>Number(x.alive))/n:null),f(n?sum(a,x=>x.level)/n:null),f(n?sum(a,x=>x.equipment)/n:null),f(n?sum(a,x=>x.n)/n:null)];}))));}
 if(r.runs){L.push('## 실제 영업 비교 — 해금/숙련 통제 실험','');table(['후보/정책/구성','런','D30 도달','클리어','평균 사망'],r.runs.map(a=>[a.profile+'/'+a.policy+'/'+a.pool,a.rows.length,pct(sum(a.rows,x=>Number(x.day>=30))/a.rows.length),pct(sum(a.rows,x=>Number(x.win))/a.rows.length),f(sum(a.rows,x=>x.deaths)/a.rows.length)]));}
 L.push('## 입력·규모','', '```json',JSON.stringify(r.plan,null,2),'```','', '전체 세부 기록과 원본 해시는 동명의 JSON에 남는다. 자동 수치 조정과 자동 PASS 판정은 없다.');return L.join('\n');
}
function main(args){const o=options(args);if(o.help){console.log('node tools/measure-jobs.cjs --mode plan|stats|expeditions|growth|runs|all [--profile file.json] [--root root] [--samples N] [--runs N] [--budget G] [--potential P] [--rarity 0..4] [--traits id,id] [--policies reader,expert] [--seed text] [--first-run] [--execute --out result.json]');return;}
 const G=load(path.resolve(o.root));for(const id of o.traits)if(!G.DATA.traitBy[id])throw Error('없는 특성: '+id);
 if(G.DATA.traitExclusions.some(a=>a.every(id=>o.traits.includes(id))))throw Error('상호 배타 특성');
 const before=fingerprint(o.root),profiles=[current(G),profile(G,JSON.parse(fs.readFileSync(o.profile,'utf8')))];
 if(profiles[0].name===profiles[1].name)throw Error('후보 이름은 source와 달라야 합니다.');
 const r={schema:1,mode:o.mode,head:execFileSync('git',['rev-parse','HEAD'],{cwd:o.root,encoding:'utf8'}).trim(),source:before,profiles,inputs:o,plan:planned(o)};
 const start=Date.now();
 if(o.mode!=='plan')r.stats=profiles.flatMap(p=>statRows(G,p,o));
 if(['expeditions','all'].includes(o.mode))r.expeditions=profiles.flatMap(p=>expeditions(G,p,o));
 if(['growth','all'].includes(o.mode))r.growth=profiles.flatMap(p=>growth(G,p,o));
 if(['runs','all'].includes(o.mode))r.runs=profiles.flatMap(p=>o.policies.flatMap(policy=>['mixed',...G.DATA.jobs.map(j=>j.id)].map(pool=>runArm(G,p,o,policy,pool))));
 r.seconds=(Date.now()-start)/1000;
 if(JSON.stringify(fingerprint(o.root))!==JSON.stringify(before))throw Error('측정 중 Source가 바뀌었습니다. 결과를 저장하지 않습니다.');
 if(o.out){fs.writeFileSync(o.out,JSON.stringify(r,null,2)+'\n',{flag:'wx'});fs.writeFileSync(o.out.replace(/\.json$/i,'')+'.md',markdown(r)+'\n',{flag:'wx'});console.log('작성: '+o.out);}else console.log(JSON.stringify(o.mode==='plan'?{profiles:r.profiles,plan:r.plan}:r,null,2));
}
if(require.main===module)try{main(process.argv.slice(2));}catch(e){console.error(e.message);process.exitCode=1;}
module.exports={load,profile,current,withProfile,actor,gate,statRows,preparation,choosePack,counter,add,finish,expeditions,resetMorning,growth,runArm,planned,options,markdown,main};
