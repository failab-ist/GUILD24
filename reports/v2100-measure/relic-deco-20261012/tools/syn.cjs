// Store Support random-pick discovery - MEASUREMENT ONLY (User 2026-10-12 OK).
// The investor bot plays fresh accounts as measure-v2100 does, but every Store Support it buys is swapped for a random
// affordable one of the three on offer (same money floor). Per run: every window (day, offered, picked), expedition
// records (day, success, death), nightly balance, end. Analysis reads "picked X vs offered X but picked other" at the same window.
//   node syn.cjs <N> --out rows.json [--prefix syn]
const fs=require('node:fs'),path=require('node:path'),{fork}=require('node:child_process');
const root=path.resolve(process.env.ROOT||path.resolve(__dirname,'../../../..'));
function load(){for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
 require(path.join(root,'dist',f+'.js'));return globalThis.GUILD24||globalThis;}
function hash(str){let h=2166136261>>>0;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h/4294967296;}
function install(G,tag){const P=G.Game.prototype,buy=P.buyRelic;
 P.buyRelic=function(id){const s=this.run,w=s.relicWindow,floor=s.phase==='foundation'?0:s.day===30?180:500;
  const ok=w.candidateIds.filter((c,i)=>!this.has(c)&&s.money-w.candidatePrices[i]>=floor);
  const pick=ok.length?ok[Math.floor(hash(tag()+'|'+s.seed+'|'+w.milestoneDay+'|'+(w.rerolls||0))*ok.length)]:id;
  return buy.call(this,pick);};}
function rowOf(G,s){const D=G.DATA,wins=[...(s.relicHistory||[]),...(s.relicWindow?[s.relicWindow]:[])];
 const seen=new Set(),windows=[];for(const w of wins){if(seen.has(w.milestoneDay))continue;seen.add(w.milestoneDay);windows.push([w.milestoneDay,w.candidateIds,w.purchased||null]);}
 const exps=s.npcs.flatMap(n=>(n.records||[]).filter(r=>!r.deep&&r.day<30).map(r=>[r.day,Number(r.outcome==='성공'||r.outcome==='대성공'),Number(r.outcome==='사망')]));
 return {seed:s.seed,day:s.day,win:s.win?1:0,reach:s.day>=30?1:0,deaths:s.stats.deaths||0,windows,exps,bal:(s.reportHistory||[]).map(h=>[h.day,h.balance]),owned:s.facilities.slice()};}
if(process.env.SYN_WORKER){process.on('message',({T,part,prefix})=>{const G=load(),P=G.Game.prototype,end=P.end,seen=new WeakSet(),rows=[];
 install(G,()=>prefix);
 P.end=function(){const r=end.apply(this,arguments),s=this.run;if(!seen.has(s)){seen.add(s);rows.push(rowOf(G,s));}return r;};
 G.Debug.trajectory({trajectories:T,runs:1,policy:'investor',build:'hybrid',prefix:prefix+'-'+part,purchaseOrder:[],relicAware:true,relicPriority:require(path.join(root,'tools/measure-v2100.cjs')).RANK});
 fs.writeFileSync(process.env.SYN_OUT+'.'+part,JSON.stringify(rows));process.send('ok',()=>process.exit(0));});}
else if(require.main===module){const N=+process.argv[2],a=process.argv,out=a[a.indexOf('--out')+1],prefix=a.includes('--prefix')?a[a.indexOf('--prefix')+1]:'syn',W=4,t0=Date.now();let done=0;
 for(let p=0;p<W;p++){const c=fork(__filename,[],{env:{...process.env,SYN_WORKER:'1',SYN_OUT:out}});c.send({T:Math.ceil(N/W),part:p,prefix});
  c.on('exit',()=>{if(++done<W)return;const rows=[];for(let q=0;q<W;q++){rows.push(...JSON.parse(fs.readFileSync(out+'.'+q,'utf8')));fs.unlinkSync(out+'.'+q);}
   fs.writeFileSync(out,JSON.stringify(rows));console.log(rows.length+' runs, '+Math.round((Date.now()-t0)/1000)+'s');});}}
module.exports={install,rowOf,hash,load};
