// v2.9.2 balance measurement - single-lever arms against the Run Progression Arc (GAME_VISION, User 2026-09-26).
// Measurement only: every arm is applied inside this process to a patched COPY of dist, and no Source or Canonical value changes.
// Paired D10 fork (as tools/measure-late-fork-v292.cjs): each seed is replayed through DAY 1~10 on Production, the D10 state is
// fingerprinted at DAY 11's morning (before its Gates are rolled), and only then the arm switches on for DAY 11~30. The
// fingerprint must match across arms for every seed. Arms (one lever each):
//   base  Production
//   G     Gate Day term: D1~10 as Production; +1.10 per Day for D11~20; +0.90 per Day for D21~29 (Final rules unchanged)
//   L     Level Death protection off: levelFactor = 1 (preparedFactor and everything else unchanged)
//   T     D21~29: T3 weight +0.10, taken from T2 (T1 unchanged)
//   E     D21~30 Great Success Store Gold 200 -> 150 (D1~10 50, D11~20 100 unchanged)
//   node tools/measure-arms-v292.cjs <out.json> [seeds=5000] [arms=base,G,L,T,E]      (PAR workers, default CPU count)
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{spawn}=require('node:child_process');
const ARMS=['base','G','L','T','E'];
if(process.argv[2]==='--worker'){
 const [,,,,arm,from,count,dir]=process.argv;
 // one patched copy per worker process; every patch is inert until its flag is set at the fork
 fs.rmSync(dir,{recursive:true,force:true});fs.cpSync(path.join(__dirname,'..','dist'),dir,{recursive:true});
 const dj=path.join(dir,'systems','dungeon.js');let t=fs.readFileSync(dj,'utf8');
 const patch=(old,nw)=>{if(!t.includes(old))throw Error('patch site moved: '+old.slice(0,60));t=t.replace(old,nw);};
 patch("function levelFactor(level){return Math.max(.75,1-.015*((level||1)-1));}","function levelFactor(level){if(globalThis.__L_OFF)return 1;return Math.max(.75,1-.015*((level||1)-1));}");
 patch("const gateDayTerm=day=>Math.min(day,GATE.knee)*GATE.early+Math.max(0,day-GATE.knee)*GATE.late;",
  "const gateDayTerm0=day=>Math.min(day,GATE.knee)*GATE.early+Math.max(0,day-GATE.knee)*GATE.late;\nconst gateDayTerm=day=>globalThis.__G_ON&&day>10?gateDayTerm0(10)+1.10*(Math.min(day,20)-10)+.90*Math.max(0,day-20):gateDayTerm0(day);");
 patch("  const rolledDeathChance=deathChance*prepared*levelFactor(n.level);","  const rolledDeathChance=deathChance*prepared*levelFactor(n.level);if(globalThis.__DEATH_ROLL)globalThis.__DEATH_ROLL(deathRoll,deathChance*prepared,rolledDeathChance,n.level,d.day);");
 fs.writeFileSync(dj,t);
 for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])require(path.join(dir,f+'.js'));
 const tier0=Dungeon.tierWeights;Dungeon.tierWeights=day=>{const w=tier0(day);if(!globalThis.__T_ON||day<21||day>29)return w;const m=Math.min(.10,w[1]);return [w[0],w[1]-m,w[2]+m];};
 const gold=DATA.greatSuccess.storeGoldByBand,late=gold.find(b=>b.maxDay>20),lateGold=late?.gold;
 const on=a=>{globalThis.__G_ON=a==='G';globalThis.__L_OFF=a==='L';globalThis.__T_ON=a==='T';if(late)late.gold=a==='E'?150:lateGold;};
 const P=Game.prototype,start=P.start,end=P.end,morning=P.morning,night=P.night,off=Number(from),rows=[];
 const hash=str=>{let h=2166136261>>>0;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h.toString(16);};
 const top3=(R,d)=>{const lv={};for(const x of R)if(x.day<=d)lv[x.npcId]=x.level;const v=Object.values(lv).sort((a,b)=>b-a).slice(0,3);return v.length?v.reduce((a,b)=>a+b,0)/v.length:0;};
 const seg=d=>d<=10?'s1':d<=20?'s2':'s3',lvBand=l=>l<=5?'1-5':l<=10?'6-10':l<=15?'11-15':'16+';
 let cur=null;
 // Level protection accounting on the real roll: a Death the Level factor turned away (roll inside the removed band), or,
 // in L, a Death that the Production factor would have turned away.
 globalThis.__DEATH_ROLL=(roll,unreduced,rolled,level,day)=>{if(!cur||!cur.fork)return;const lf=Math.max(.75,1-.015*((level||1)-1)),prod=unreduced*lf;
  if(roll>=prod&&roll<unreduced){const k=seg(day)+':'+lvBand(level);cur.lvlSaved[k]=(cur.lvlSaved[k]||0)+1;}
  if(globalThis.__L_OFF&&roll<rolled&&roll>=prod){const k=seg(day)+':'+lvBand(level);cur.lvlExtra[k]=(cur.lvlExtra[k]||0)+1;}};
 P.start=function(seed,...x){on('base');const m=/^revision-(\d+)$/.exec(seed);const r=start.call(this,m?'revision-'+(Number(m[1])+off):seed,...x);
  cur={seed:Number(/^revision-(\d+)$/.exec(this.run.seed)?.[1]??-1),fork:null,lvlSaved:{},lvlExtra:{},t3:{n:0,worst:{}},at:{}};this.__cur=cur;return r;};
 P.morning=function(...x){const s=this.run,c=this.__cur;
  if(s.day===11&&c&&!c.fork){const R=s.npcs.flatMap(n=>n.records||[]);
   c.fork={fp:hash(JSON.stringify(s)+'|'+JSON.stringify(this.account)+'|'+this.rng.state),top3:Math.round(top3(R,10)*1000)/1000,deaths:R.filter(r=>r.day<=10&&r.outcome==='사망').length};on(arm);}
  if(c&&(s.day===21||s.day===30)){const R=s.npcs.flatMap(n=>n.records||[]),d=s.day-1;c.at[d]={alive:s.npcs.filter(n=>n.alive&&n.introduced).length,top3:Math.round(top3(R,d)*1000)/1000,gold:s.money};}
  return morning.apply(this,x);};
 // T3 readiness at departure, D21~29: the weakest Hazard band of each T3 expedition as it leaves
 P.night=function(...x){const s=this.run,c=this.__cur;
  if(c&&c.fork&&s.day>=21&&s.day<=29)for(const id of s.queue){const n=s.npcs.find(k=>k.id===id),d=s.dungeons[n.destination];if(!d||d.tier!==3)continue;
   const e=Dungeon.prepare(n,d,s.facilities).effects,rank={'취약':0,'불안':1,'대응':2,'충분':3};
   const w=d.hazards.map(h=>Dungeon.hazardState(h,e,d).label).sort((a,b)=>rank[a]-rank[b])[0]||'none';c.t3.n++;c.t3.worst[w]=(c.t3.worst[w]||0)+1;}
  return night.apply(this,x);};
 P.end=function(w,y){const s=this.run,c=this.__cur;const r=end.call(this,w,y);
  if(c&&c.fork){const R=s.npcs.flatMap(n=>n.records||[]),O={s2:{},s3:{}},T3={};
   for(const x of R){if(x.day<=10||x.deep)continue;const g=x.day<=20?'s2':'s3';O[g][x.outcome]=(O[g][x.outcome]||0)+1;
    if(x.day>=21&&x.day<=29&&/ III$/.test(x.dungeonName||''))T3[x.outcome]=(T3[x.outcome]||0)+1;}
   const deaths=d=>R.filter(x=>x.day<=d&&x.outcome==='사망').length,deathLv={};
   for(const x of R.filter(x=>x.day>10&&x.outcome==='사망')){const k=seg(x.day)+':'+lvBand(x.level);deathLv[k]=(deathLv[k]||0)+1;}
   const great29=R.filter(x=>x.day>=21&&x.day<=29&&x.outcome==='대성공'&&!x.deep);
   rows.push({i:c.seed,fp:c.fork.fp,d10top3:c.fork.top3,d10deaths:c.fork.deaths,day:s.day,end:s.stats.deaths>=Meta.deathLimit(s)?'D':s.bossDebug?(s.win?'C':'F'):'B',
    O,T3,t3prep:c.t3,deaths20:s.day>=20?deaths(20):null,deaths29:s.day>=29?deaths(29):null,at20:c.at[20]||null,at29:c.at[29]||null,
    lvlSaved:c.lvlSaved,lvlExtra:c.lvlExtra,deathLv,great29:great29.length,greatGold29:great29.reduce((a,x)=>a+(x.storeBonus||0),0)});}
  else if(c)rows.push({i:c.seed,fp:null,day:s.day});
  on('base');return r;};
 Debug.simulate(Number(count),'reader',null,'adaptive','hybrid',{});
 fs.rmSync(dir,{recursive:true,force:true});
 process.stdout.write(JSON.stringify(rows));return;}

const out=process.argv[2]||'reports/v292-arms.json',seeds=Number(process.argv[3]||5000),arms=(process.argv[4]||ARMS.join(',')).split(','),
 PAR=Number(process.env.PAR||os.cpus().length),BLOCK=250,TMP=fs.mkdtempSync(path.join(os.tmpdir(),'g24-arms-'));
const by=Object.fromEntries(arms.map(a=>[a,new Map()]));let w=0;
const job=(arm,from,count)=>new Promise((ok,no)=>{let buf='';const c=spawn(process.execPath,[__filename,'--worker','',arm,from,count,path.join(TMP,'w'+(w++))]);
 c.stdout.on('data',d=>buf+=d);c.stderr.pipe(process.stderr);c.on('close',code=>code?no(Error('worker '+arm+'@'+from+' exit '+code)):ok(JSON.parse(buf)));});
(async()=>{
 const q=[];for(const a of arms)for(let s=0;s<seeds;s+=BLOCK)q.push([a,s,Math.min(BLOCK,seeds-s)]);let i=0;
 await Promise.all(Array.from({length:PAR},async()=>{while(i<q.length){const [a,s,n]=q[i++];for(const r of await job(a,s,n))by[a].set(r.i,r);}}));
 fs.rmSync(TMP,{recursive:true,force:true});
 const base=by[arms[0]],bank=[...base.values()].filter(r=>r.fp),ids=bank.map(r=>r.i);
 let same=0,diff=0;for(const id of ids){const fp=base.get(id).fp;if(arms.every(a=>by[a].get(id)?.fp===fp))same++;else diff++;}
 const qn=(v,p)=>{v=[...v].sort((a,b)=>a-b);return v.length?v[Math.min(v.length-1,Math.floor((v.length-1)*p))]:null;};
 const top=bank.map(r=>r.d10top3),pct=Object.fromEntries([50,75,80,85,90,95].map(p=>['p'+p,qn(top,p/100)]));
 const low=bank.filter(r=>r.d10deaths<=1);
 const cohorts={ALL_D10:ids,CURRENT_SKILLED_D10_top15:low.filter(r=>r.d10top3>=pct.p85-1e-9).map(r=>r.i),CURRENT_SKILLED_D10_top10:low.filter(r=>r.d10top3>=pct.p90-1e-9).map(r=>r.i),
  OLD_USER_MATCH:bank.filter(r=>r.d10top3>=7.666666666666667-1e-9&&r.d10deaths<=1).map(r=>r.i)};
 const med=v=>qn(v.filter(x=>x!==null&&x!==undefined),.5),share=(set,f)=>set.length?set.filter(f).length/set.length:null;
 const sum=(set,f)=>{const o={};for(const r of set){const x=f(r)||{};for(const [k,v] of Object.entries(x))o[k]=(o[k]||0)+v;}return o;};
 const res={generated:'v2.9.2 single-lever arms, paired D10 fork',policy:'reader',account:'fresh',seeds:'revision-0..'+(seeds-1),arms,
  allSeeds:{n:seeds,reach10:ids.length/seeds},
  d10Bank:{snapshots:bank.length,identicalAcrossArms:same,mismatched:diff,top3LevelPercentiles:pct,deathsLe1:low.length,
   deathsLe1AtOrAbove:Object.fromEntries(Object.entries(pct).map(([k,t])=>[k+' ('+t+')',low.filter(r=>r.d10top3>=t-1e-9).length]))},cohorts:{}};
 for(const [name,set] of Object.entries(cohorts)){const c={n:set.length,byArm:{}};
  for(const a of arms){const R=set.map(id=>by[a].get(id)).filter(Boolean),r20=R.filter(r=>r.day>=20),r29=R.filter(r=>r.day>=29);
   const band=r=>r.day<=20?'D11-20':r.day<=29?'D21-29':'D30';
   const ends={};for(const r of R.filter(r=>r.end==='D'||r.end==='B')){const k=band(r);ends[k]??={deathLimit:0,bankrupt:0};ends[k][r.end==='D'?'deathLimit':'bankrupt']+=1/R.length;}
   const x={reach20:share(R,r=>r.day>=20),reach30:share(R,r=>r.day>=30),d10to20:share(R,r=>r.day>=20),d20to30:share(r20,r=>r.day>=30),
    endsByBand:ends,endDeathLimit:share(R,r=>r.end==='D'),endBankrupt:share(R,r=>r.end==='B'),clearRef:share(R,r=>r.end==='C'),
    outcomesD11_20:sum(R,r=>r.O.s2),outcomesD21_29:sum(R,r=>r.O.s3),
    aliveD20:med(r20.map(r=>r.at20?.alive)),aliveD29:med(r29.map(r=>r.at29?.alive)),top3D20:med(r20.map(r=>r.at20?.top3)),top3D29:med(r29.map(r=>r.at29?.top3)),
    goldD20:med(r20.map(r=>r.at20?.gold)),goldD29:med(r29.map(r=>r.at29?.gold)),deathsD20:med(r20.map(r=>r.deaths20)),deathsD29:med(r29.map(r=>r.deaths29)),
    T3:{expeditions:sum(R,r=>({n:r.t3prep.n})).n||0,outcomes:sum(R,r=>r.T3),worstHazardAtDeparture:sum(R,r=>r.t3prep.worst)},
    levelSavedDeaths:sum(R,r=>r.lvlSaved),levelExtraDeaths:sum(R,r=>r.lvlExtra),deathsByBand:sum(R,r=>r.deathLv),
    great21_29:sum(R,r=>({n:r.great29})).n||0,greatGold21_29:sum(R,r=>({g:r.greatGold29})).g||0};
   if(a!==arms[0]){let lost=0,gained=0;for(const id of set){const p=by[arms[0]].get(id)?.day>=30,q=by[a].get(id)?.day>=30;if(p&&!q)lost++;if(!p&&q)gained++;}x.vsBaseD30={lost,gained};}
   c.byArm[a]=x;}
  res.cohorts[name]=c;}
 fs.writeFileSync(out,JSON.stringify(res,null,1)+'\n');console.log(JSON.stringify(res.d10Bank,null,1));
})().catch(e=>{console.error(e);process.exit(1);});
