// Single-Decoration contribution — MEASUREMENT ONLY, dev tool, never part of npm test.
// Same seeds; a fresh account wearing exactly one Decoration vs wearing none. Every Run is new.
//   node tools/deco-single.cjs [seeds=1000] [--policy balanced] [--aware] [--set '{"memorialBoard":{"deathLimitBonus":1}}'] [--sets a+b+c+d,...] [--out file]
// --sets: measure whole loadouts (ids joined with +) instead of one Decoration each.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{fork}=require('node:child_process');
const root=path.resolve(__dirname,'..');
function load(){for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
 require(path.join(root,'dist',f+'.js'));return globalThis.GUILD24||globalThis;}
if(process.env.DECO_WORKER){
 process.on('message',({id,N,policy,aware,set})=>{const G=load();if(set)for(const [k,v] of Object.entries(set))Object.assign(G.DATA.decorationParams[k]??={},v);
  const a=G.Meta.fresh();if(id!=='none')for(const x of id.split('+')){G.Meta.addCapital(a,G.DATA.decorationBy[x].price);G.Meta.buyDecoration(a,x);}
  const r=G.Debug.simulate(N,policy,a,'adaptive','hybrid',{relicAware:aware});
  process.send({id,reach:r.reach30,win:r.clearsPerRun,deaths:r.deathsMedian,deathFail:r.deathFailRate},()=>process.exit(0));});
}else{
 const args=process.argv.slice(2),flag=k=>{const i=args.indexOf(k);return i>=0?args[i+1]:null;};
 const N=Number(args.find((a,i)=>/^\d+$/.test(a)&&!['--policy','--set','--out','--sets'].includes(args[i-1])))||1000,policy=flag('--policy')||'balanced',aware=args.includes('--aware');
 const set=flag('--set')?JSON.parse(flag('--set')):null;
 const G0=load(),ids=['none',...(flag('--sets')?flag('--sets').split(','):G0.DATA.decorations.map(d=>d.id))],res={};let live=0;const q=ids.slice();
 const next=()=>{if(!q.length){if(!live)done();return;}const id=q.shift();live++;const c=fork(__filename,[],{env:{...process.env,DECO_WORKER:'1'}});
  c.on('message',m=>{res[m.id]=m;});c.on('exit',()=>{live--;next();});c.send({id,N,policy,aware,set});};
 const done=()=>{const b=res.none;for(const id of ids){const r=res[id];console.log(id.padEnd(16),'D30 '+(100*r.reach).toFixed(1).padStart(5)+'% ('+(r.reach>=b.reach?'+':'')+(100*(r.reach-b.reach)).toFixed(1)+')','clear '+(100*r.win).toFixed(1).padStart(5)+'% ('+(r.win>=b.win?'+':'')+(100*(r.win-b.win)).toFixed(1)+')','deathFail '+(100*r.deathFail).toFixed(0)+'%');}
  if(flag('--out'))fs.writeFileSync(flag('--out'),JSON.stringify({N,policy,aware,set,results:res},null,1));};
 for(let i=0;i<os.cpus().length;i++)next();}
