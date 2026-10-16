// 점포지원 하나의 효과를 같은 시드끼리 짝지어 재는 도구 (User 2026-10-16: 희귀 계약 효율 측정 틀).
// 게임 규칙도 simulation.js도 건드리지 않는다. 측정 중에만 Game.prototype을 감싼다.
//   with    : 창 DAY에 대상 지원(ID)이 후보로 나오면 봇이 무엇을 고르든 그것을 산다(살 돈이 있을 때).
//   without : 창이 뽑힌 뒤(난수는 이미 소비됨) 후보에서 대상 지원을 뺀다. 나머지는 봇이 고른다.
// 두 조건은 창이 열리기 전까지 같은 판이다(같은 시드, 같은 봇). 그래서 대상이 후보로 나온 판끼리 짝지어 뺀다.
// 프레시 판만 쓴다. 연속 궤적은 앞 런의 선택이 갈려 짝이 깨진다.
//   node tools/measure-support-ab.cjs --id rareContract --day 10 [--policy investor] [--fresh 1000] [--workers N] [--out file.json] [--go]
// --go 없이는 계획만 출력한다(AGENTS 9-A: 측정은 User 컨펌 뒤에).
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{fork}=require('node:child_process');
const {RANK,BANDS,useFirstRunLessons}=require('./measure-v2100.cjs');
const BAL_DAYS=[15,20,25],PARTS=4;

function worker({root,id,day,arm,policy,N,part}){
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
  require(path.join(root,'dist',f+'.js'));
 const G=globalThis.GUILD24||globalThis,P=G.Game.prototype,end=P.end,relicWindow=P.relicWindow,buyRelic=P.buyRelic,rows=[],mark=new WeakMap(),seen=new WeakSet();
 if(!G.DATA.relicBy[id])throw Error('없는 점포지원: '+id);
 useFirstRunLessons(P);
 P.relicWindow=function(d){const had=this.run.relicWindow?.milestoneDay===d,r=relicWindow.apply(this,arguments),w=this.run.relicWindow;
  if(!had&&d===day&&w&&w.candidateIds.includes(id)){const m=mark.get(this.run)??{};m.appeared=1;mark.set(this.run,m);
   if(arm==='without'){const i=w.candidateIds.indexOf(id);w.candidateIds.splice(i,1);w.candidatePrices.splice(i,1);}}
  return r;};
 P.buyRelic=function(pick){const s=this.run,w=s.relicWindow,m=mark.get(s);
  if(m&&w?.milestoneDay===day&&w.purchased==null){
   if(pick===id)m.botPicked=1;
   else if(arm==='with'&&w.candidateIds.includes(id)&&!this.has(id)&&s.money>=w.candidatePrices[w.candidateIds.indexOf(id)]){m.forced=1;pick=id;}}
  return buyRelic.call(this,pick);};
 P.end=function(){const r=end.apply(this,arguments),s=this.run,m=mark.get(s)??{};if(seen.has(s))return r;seen.add(s);
  const recs=s.npcs.flatMap(n=>n.records||[]).filter(x=>!x.deep&&x.day<30),ok=x=>x.outcome==='성공'||x.outcome==='대성공',rh=s.reportHistory||[];
  const band=([a,b])=>{const l=recs.filter(x=>x.day>=a&&x.day<=b);return [l.filter(ok).length,l.length];};
  rows.push({seed:s.seed,appeared:m.appeared?1:0,forced:m.forced?1:0,botPicked:m.botPicked?1:0,bought:(s.relicHistory||[]).some(w=>w.milestoneDay===day&&w.purchased===id)?1:0,
   bands:BANDS.map(band),all:band([1,29]),day:s.day,reach:s.day>=30?1:0,win:s.win?1:0,deaths:s.stats.deaths||0,
   bal:BAL_DAYS.map(d=>rh.find(x=>x.day===d)?.balance??null),rare:s.stats.rare||0,
   commission:rh.reduce((a,h)=>a+(h.commission||0),0),revenue:s.stats.revenue||0});
  return r;};
 G.Debug.trajectory({trajectories:N,runs:1,policy,build:'hybrid',prefix:'ab-'+id+day+'-'+part,purchaseOrder:[],relicAware:true,relicPriority:RANK});
 return {rows};
}

// 짝지은 평균 차이(with − without)와 표준오차. 값이 null인 쪽이 있는 짝은 그 지표에서 뺀다.
function paired(pairs,f){const d=pairs.map(([a,b])=>[f(a),f(b)]).filter(([x,y])=>x!=null&&y!=null).map(([x,y])=>x-y),n=d.length;
 if(n<2)return {n,mean:NaN,se:NaN};const mean=d.reduce((a,b)=>a+b,0)/n,v=d.reduce((a,b)=>a+(b-mean)**2,0)/(n-1);return {n,mean,se:Math.sqrt(v/n)};}
const METRICS=[
 ['클리어 %p',r=>100*r.win],['D30 도달 %p',r=>100*r.reach],['원정 성공 %p(전체)',r=>r.all[1]?100*r.all[0]/r.all[1]:null],
 ['성공 D1~7 %p',r=>r.bands[0][1]?100*r.bands[0][0]/r.bands[0][1]:null],['성공 D8~14 %p',r=>r.bands[1][1]?100*r.bands[1][0]/r.bands[1][1]:null],
 ['성공 D15~21 %p',r=>r.bands[2][1]?100*r.bands[2][0]/r.bands[2][1]:null],['성공 D22~29 %p',r=>r.bands[3][1]?100*r.bands[3][0]/r.bands[3][1]:null],
 ['사망/런',r=>r.deaths],['끝난 날',r=>r.day],['D15 잔액 G',r=>r.bal[0]],['D20 잔액 G',r=>r.bal[1]],['D25 잔액 G',r=>r.bal[2]],
 ['희귀↑ 발주 본 수(교환 포함)',r=>r.rare],['본사 수수료 합 G',r=>r.commission],['총매출 G',r=>r.revenue]];
function summary(res){
 const L=['','점포지원 짝 측정 · '+res.meta.id+' · 창 D'+res.meta.day+' · '+res.meta.policy+' · '+res.meta.sec+'s'];
 const by=a=>Object.fromEntries(res.rows.filter(r=>r.arm===a).map(r=>[r.seed,r])),W=by('with'),O=by('without');
 const seeds=Object.keys(W).filter(s=>O[s]&&W[s].appeared&&O[s].appeared),pairs=seeds.map(s=>[W[s],O[s]]);
 L.push('판 '+Object.keys(W).length+' 중 대상이 후보로 나온 판 '+pairs.length+' ('+(100*pairs.length/Math.max(1,Object.keys(W).length)).toFixed(1)+'%)');
 const forced=pairs.filter(([a])=>a.forced).length,picked=pairs.filter(([a])=>a.botPicked).length,bought=pairs.filter(([a])=>a.bought).length;
 L.push('with 쪽: 강제로 바꿔 산 판 '+forced+' · 봇이 원래 고른 판 '+picked+' · 실제로 산 판 '+bought+' (나머지는 돈이 모자라 봇이 넘긴 판)');
 L.push('with − without (짝지은 평균 ± 표준오차, 2×SE 안이면 흔들림으로 본다)');
 for(const [name,f] of METRICS){const p=paired(pairs,f);L.push('  '+name.padEnd(24)+(isNaN(p.mean)?'-':(p.mean>=0?'+':'')+p.mean.toFixed(2)+' ± '+p.se.toFixed(2))+'  (n='+p.n+')');}
 return L.join('\n');
}

if(process.env.AB_WORKER){process.on('message',j=>{const res=worker(j);process.send({j,...res},()=>process.exit(0));});}
else if(require.main===module){
 const args=process.argv.slice(2),flag=(k,d)=>{const i=args.indexOf(k);return i>=0?args[i+1]:d;};
 const here=path.resolve(__dirname,'..'),id=flag('--id',null),day=+flag('--day',10),policy=flag('--policy','investor'),N=+flag('--fresh',1000),out=flag('--out',null);
 const WORKERS=+flag('--workers',Math.max(1,os.cpus().length));
 if(!id)throw Error('--id <점포지원 id>가 필요합니다. 예: --id rareContract --day 10');
 if(![5,10,15,20,25].includes(day))throw Error('--day는 창이 열리는 날(5·10·15·20·25)이어야 합니다.');
 const jobs=[];for(const arm of ['with','without'])for(let p=0;p<PARTS;p++)jobs.push({root:here,id,day,arm,policy,N:Math.ceil(N/PARTS),part:p});
 if(!args.includes('--go')){console.log('계획(실행 안 함): '+id+' · 창 D'+day+' · '+policy+' · 프레시 '+N+'판 × 2조건(with/without) = 작업 '+jobs.length+'개, 동시 '+WORKERS+'개. 돌리려면 User 컨펌 뒤 --go.');process.exit(0);}
 const rows=[],t0=Date.now();let live=0,done=0,failed=false;
 const finish=()=>{if(failed){process.exitCode=1;return;}const res={meta:{id,day,policy,N,head:here,sec:Math.round((Date.now()-t0)/1000)},rows};if(out)fs.writeFileSync(out,JSON.stringify(res));console.log(summary(res));};
 const next=()=>{if(!jobs.length){if(!live)finish();return;}const j=jobs.shift();live++;
  const c=fork(__filename,[],{env:{...process.env,AB_WORKER:'1'}});let received=false;
  c.on('message',m=>{received=true;rows.push(...m.rows.map(r=>({...r,arm:m.j.arm})));});
  c.on('exit',code=>{if(code||!received){failed=true;process.stderr.write('\n측정 worker 실패: '+JSON.stringify(j)+' code='+code+'\n');}live--;done++;process.stderr.write('\r'+done+'/'+(done+jobs.length+live)+' jobs · '+Math.round((Date.now()-t0)/1000)+'s');next();});c.send(j);};
 for(let i=0;i<Math.min(WORKERS,jobs.length);i++)next();
}
module.exports={paired,summary};
