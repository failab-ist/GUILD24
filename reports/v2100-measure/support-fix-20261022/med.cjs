// 중반 계정에서 장식 하나 · 점포지원 하나씩 클리어 차이 (2026-10-22, investor 오라클 끔)
// 중반 계정: 새 계정에서 「없음」 길(숙련만 삼)로 K판을 실제로 굴려 정산한 계정. 장식은 없음.
// 조건: none | deco:<id> (그 칸에 끼움) | relicAt:<id>@5 (D5 창에 공짜로 얹음, D5 간 판만)
// 후보 수치: 조건 뒤에 #키=값 (heal=의무실 · 응급 처치대 확률, sub=보증 지원 비율, min=보증 최소 판매가). 판마다 다른 굴림(continue-0 고침).
// 기록: 끝난 날 · 클리어 · 사망 · D15 · D25 잔액 · 매출
// usage: node mid2.cjs <T accounts> <S seeds> <K runs> <cond,...> [root] [outdir]
const fs=require('fs'),path=require('path'),{fork}=require('child_process');
const [TA,SA,KA,condArg,rootArg,outArg]=process.argv.slice(2);const T=+TA,S=+SA,K=+KA,root=rootArg||path.join(__dirname,'../../..'),out=outArg||process.cwd();
const load=()=>{for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(root,'dist',f+'.js'));return globalThis.GUILD24||globalThis;};
const copy=x=>JSON.parse(JSON.stringify(x));
if(process.env.MW==='build'){
 const G=load(),{RANK}=require(path.join(root,'tools/measure-v2100.cjs'));const accs=[];
 for(let t=0;t<T;t++){let acc=G.Meta.fresh();
  for(let i=0;i<K;i++){const g=new G.Game(acc);g.autosave=false;g.lessons=false;g.start('mid-'+t+'-'+i);
   G.Debug.continueRun(g.account,g.run,1,'investor',{relicPriority:RANK,onRun:(s,gg)=>{gg.end(!!s.win,s.endReason||'측정 종료');acc=gg.account;}});
   while(G.Meta.affordable(acc).mastery)G.Meta.buyMastery(acc);}
  accs.push(acc);}
 fs.writeFileSync(path.join(out,'accounts.json'),JSON.stringify(accs));process.exit(0);}
if(process.env.MW){
 const G=load(),D=G.DATA,{RANK}=require(path.join(root,'tools/measure-v2100.cjs'));const [cond,tweak]=process.env.MW.split('#');const RK0=require(path.join(root,'tools/measure-v2100.cjs')).RANK;const RNK=(tweak||'').includes('hq=1')?['logisticsHQ',...RK0.filter(x=>x!=='logisticsHQ')]:RK0;let [op,id]=cond.split(':');const rows=[];
 const R0=G.RNG;G.RNG=class extends R0{constructor(s,st){super(s==='continue-0'&&globalThis.__SEED?globalThis.__SEED:s,st);}};
 for(const tw of (tweak?tweak.split('~'):[])){const [k,v]=tw.split('=');const x=+v;
  if(k==='ih')D.decorationParams.infirmaryPlaque.healChance=x;if(k==='fh')D.relicParams.firstAidDesk.healChance=x;
  if(k==='sub')D.relicParams.guarantee.subsidyRate=x;if(k==='ks')D.relicParams.kitchen.supplyBonus=x;if(k==='kd')D.relicParams.kitchen.supplyDrink=x;if(k==='ko')D.relicParams.kitchen.overheadRate=x;if(k==='fs')D.relicParams.fresh24.statBonus=x;if(k==='min')D.relicBy.guarantee.minPrice=x;}
 const parts=cond.split('+').map(p=>p.split(':'));const decos=parts.filter(p=>p[0]==='deco').map(p=>p[1]),relics=parts.filter(p=>p[0]==='relicAt').map(p=>p[1]);
 const accs=JSON.parse(fs.readFileSync(path.join(out,'accounts.json')));
 if(relics.length){const P=G.Game.prototype,orig=P.relicWindow;
  P.relicWindow=function(day){const r=orig.apply(this,arguments),s=this.run;for(const x of relics){const [rid,dd]=x.split('@');if(day===+dd&&s&&!s.facilities.includes(rid)){s.facilities.push(rid);const w=s.relicWindow;const k=w?w.candidateIds.indexOf(rid):-1;if(k>=0){w.candidateIds.splice(k,1);w.candidatePrices.splice(k,1);}}}return r;};}
 if((tweak||'').includes('hq=1')){const P=G.Game.prototype,o2=P.relicWindow;P.relicWindow=function(day){const r=o2.apply(this,arguments),w=this.run&&this.run.relicWindow;if(day===0&&w&&!w.purchased&&w.candidateIds.includes('logisticsHQ')&&this.canBuyRelic())this.buyRelic('logisticsHQ');return r;};}
 if((tweak||'').includes('rr=1')){const P=G.Game.prototype,o3=P.relicWindow;P.relicWindow=function(day){const r=o3.apply(this,arguments),w=this.run&&this.run.relicWindow;if(day===0&&w&&!w.purchased&&!w.candidateIds.includes('logisticsHQ')&&this.canRerollRelics()&&this.run.money>=this.relicRerollPrice()){this.rerollRelics();globalThis.__RR=(globalThis.__RR||0)+1;}return r;};}
 for(let t=0;t<accs.length;t++)for(let k=0;k<S;k++){const a=copy(accs[t]);
  for(const id of decos){const d=D.decorationBy[id];if(!a.store.owned.includes(id))a.store.owned.push(id);a.store.loadout[d.slot]=id;}
  const g=new G.Game(a);g.autosave=false;g.lessons=false;g.start('mx-'+t+'-'+k);globalThis.__SEED='mx-roll-'+t+'-'+k;
  G.Debug.continueRun(g.account,g.run,1,'investor',{relicPriority:RNK,onRun:s=>{const W0=(s.relicHistory||[])[0]||{};const H=s.reportHistory||[];rows.push({t,k,day:s.day,win:!!s.win,deaths:s.stats.deaths,b15:(H.find(h=>h.day===15)||{}).balance,b25:(H.find(h=>h.day===25)||{}).balance,rev:H.reduce((a,h)=>a+h.revenue,0),days:H.length,c0:W0.candidateIds,p0:W0.purchased,rr:W0.rerolls||0});}});}
 fs.writeFileSync(path.join(out,process.env.MW.replace(/[:@#=.~+]/g,'_')+'.json'),JSON.stringify(rows));process.exit(0);}
const t0=Date.now(),W=require('os').cpus().length;
const run=(c,cb)=>fork(__filename,process.argv.slice(2),{env:{...process.env,MW:c}}).on('exit',code=>{console.error(c+' exit '+code+' '+Math.round((Date.now()-t0)/1000)+'s');cb();});
const go=()=>{const q=condArg.split(',');let live=0;const next=()=>{if(!q.length){if(!live)console.error('done '+Math.round((Date.now()-t0)/1000)+'s');return;}live++;run(q.shift(),()=>{live--;next();});};for(let i=0;i<W;i++)next();};
if(fs.existsSync(path.join(out,'accounts.json')))go();else run('build',go);
