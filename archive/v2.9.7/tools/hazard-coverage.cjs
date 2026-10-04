// Hazard coverage by Day band - MEASUREMENT ONLY, dev tool, never part of npm test.
// User 2026-09-27: before filling the Counter ladder (초반 대응 / 초반 하이브리드 / 중반 대응 / 후반 하이브리드),
// measure where a Hazard actually hurts. `reader` bot, fresh account, no Decoration; the game files on disk are not
// touched - one observer line is added in memory after each ordinary expedition resolves.
// Per Hazard x band (D1-10 / D11-20 / D21-29):
//   exp        ordinary expeditions into a Gate carrying that Hazard
//   ratio      mean defense / threat (the Counter plus the pressed Stat's share; DUNGEON hazardState)
//   covered    share with defense >= threat
//   carried    share that carried at least one Item countering it
//   incident   share whose environment incident named that Hazard
//   success    share ending 성공 / 대성공
//   offered    share of those Days whose ORDER offers held an Item countering it
//   top        the Counter Items carried most
//   node tools/hazard-coverage.cjs [runs=300] [--out file]   (runs are split across workers by seed)
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm'),{fork}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const FILES=['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'];
const BANDS=[[1,10],[11,20],[21,29]];
const one=(src,a,b)=>{const n=src.split(a).length-1;if(n!==1)throw Error('patch point x'+n+': '+a.slice(0,60));return src.replace(a,b);};
function load(){for(const f of FILES){let src=fs.readFileSync(path.join(root,'dist',f+'.js'),'utf8');
  if(f==='systems/shop')src=one(src,'const rep=G.Dungeon.resolve(n,d,this.rng,s.facilities,s,assist);',
   'const rep=G.Dungeon.resolve(n,d,this.rng,s.facilities,s,assist);if(globalThis.__HZ)globalThis.__HZ(rep,d,s);');
  if(f==='systems/simulation')src=one(src,'for(let seed=0;seed<count;seed++){','for(let seed=opts?.from||0;seed<(opts?.from||0)+count;seed++){');
  vm.runInThisContext(src,{filename:f+'.js'});}}
if(process.env.HZ_WORKER){
 process.on('message',({from,to})=>{globalThis.window=globalThis;load();const D=DATA,acc={};
  const cell=(h,b)=>((acc[h]??={})[b]??={exp:0,ratio:0,covered:0,carried:0,incident:0,success:0,days:{},offerDays:{},items:{}});
  globalThis.__HZ=(rep,d,s)=>{if(d.deep||d.id==='final'||!rep.debug)return;const day=d.day||s.day,b=BANDS.findIndex(([a,z])=>day>=a&&day<=z);if(b<0)return;
   const e=rep.debug.effects,offerIds=(s.offers||[]).map(o=>o.item);
   for(const h of d.hazards){const c=cell(h,b),r=Dungeon.hazardRule(h),threat=12+day*.35+Math.max(0,day-7)*.25+((d.tier||1)-1)*6,def=(e[h]||0)+(e[r.stat]||0)*r.coef;
    c.exp++;c.ratio+=def/threat;if(def>=threat)c.covered++;
    const ctr=rep.items.filter(id=>(D.itemBy[id].effects[h]||0)>0);if(ctr.length)c.carried++;for(const id of ctr)c.items[id]=(c.items[id]||0)+1;
    if(rep.cause===h)c.incident++;if(['성공','대성공'].includes(rep.outcome))c.success++;
    const key=s.seed+':'+day;c.days[key]=1;if(offerIds.some(id=>(D.itemBy[id].effects[h]||0)>0))c.offerDays[key]=1;}};
  const t0=Date.now();
  // Runs from..to-1 through the production path (Debug.simulate, its seed loop offset in memory)
  Debug.simulate(to-from,'reader',null,'adaptive','hybrid',{relicAware:true,from});
  for(const h in acc)for(const b in acc[h]){const c=acc[h][b];c.days=Object.keys(c.days).length;c.offerDays=Object.keys(c.offerDays).length;}
  process.send({acc,ms:Date.now()-t0},()=>process.exit(0));});
}else{
 const args=process.argv.slice(2),N=Number(args.find(a=>/^\d+$/.test(a))||300),oi=args.indexOf('--out'),W=Math.min(os.cpus().length,N),parts=[];let live=0;
 for(let i=0;i<W;i++){const from=Math.floor(N*i/W),to=Math.floor(N*(i+1)/W);live++;
  const c=fork(__filename,[],{env:{...process.env,HZ_WORKER:'1'}});c.on('message',m=>parts.push(m.acc));c.on('exit',()=>{if(--live===0)done();});c.send({from,to});}
 const done=()=>{globalThis.window=globalThis;load();const D=DATA,tot={};
  for(const p of parts)for(const h in p)for(const b in p[h]){const c=p[h][b],t=((tot[h]??={})[b]??={exp:0,ratio:0,covered:0,carried:0,incident:0,success:0,days:0,offerDays:0,items:{}});
   for(const k of ['exp','ratio','covered','carried','incident','success','days','offerDays'])t[k]+=c[k];for(const id in c.items)t.items[id]=(t.items[id]||0)+c.items[id];}
  const pct=(a,b)=>b?(100*a/b).toFixed(0)+'%':'-';
  console.log('hazard'.padEnd(10),'band'.padEnd(7),'exp'.padStart(6),'ratio'.padStart(6),'covered'.padStart(8),'carried'.padStart(8),'incident'.padStart(9),'success'.padStart(8),'offered'.padStart(8),' top counters carried');
  for(const h of Object.keys(D.hazards))for(let b=0;b<BANDS.length;b++){const c=tot[h]?.[b];if(!c)continue;
   const top=Object.entries(c.items).sort((x,y)=>y[1]-x[1]).slice(0,3).map(([id,n])=>D.itemBy[id].name+' '+pct(n,c.exp)).join(', ');
   console.log(D.hazards[h].padEnd(8),('D'+BANDS[b][0]+'-'+BANDS[b][1]).padEnd(7),String(c.exp).padStart(6),(c.ratio/c.exp).toFixed(2).padStart(6),pct(c.covered,c.exp).padStart(8),pct(c.carried,c.exp).padStart(8),pct(c.incident,c.exp).padStart(9),pct(c.success,c.exp).padStart(8),pct(c.offerDays,c.days).padStart(8),' '+top);}
  if(oi>=0)fs.writeFileSync(args[oi+1],JSON.stringify({N,policy:'reader',aware:true,bands:BANDS,results:tot},null,1));};
}
