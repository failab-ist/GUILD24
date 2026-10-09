// 승인된 reader 4조건을 표준 도구로 순서대로 실행한다. 기존 결과는 덮어쓰지 않는다.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{execFileSync,spawn}=require('node:child_process');
const outDir=path.resolve(process.argv[2]||'');if(!process.argv[2])throw Error('사용법: node run.cjs <새 결과 폴더>');
const base=path.resolve(__dirname,'../../..'),parent=path.resolve(base,'../..');
const conditions=[['A',base],['B',path.join(parent,'gate-fire-study','GUILD24')],['C',path.join(parent,'growth-boost-study','GUILD24')],['D',path.join(parent,'gate-growth-study','GUILD24')]];
const modules=['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'];
const files=[...modules.map(f=>'dist/'+f+'.js'),'tools/measure-v2100.cjs'];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const git=(root,args)=>execFileSync('git',args,{cwd:root,encoding:'utf8'}).trim();
function frozen(root){assert.equal(git(root,['status','--porcelain']),'','측정 사본 clean 확인');return {root,head:git(root,['rev-parse','HEAD']),files:Object.fromEntries(files.map(f=>[f,sha(fs.readFileSync(path.join(root,f)))]))};}
(async()=>{
 assert.ok(!fs.existsSync(outDir),'새 결과 폴더가 필요합니다');fs.mkdirSync(outDir,{recursive:true});
 const snapshots=Object.fromEntries(conditions.map(([id,root])=>[id,frozen(root)]));
 for(const [id]of conditions){const changed=files.filter(f=>snapshots[id].files[f]!==snapshots.A.files[f]);assert.deepEqual(changed,id==='B'?['dist/systems/shop.js']:id==='C'?['dist/systems/adventurer.js']:id==='D'?['dist/systems/adventurer.js','dist/systems/shop.js']:[],'허용된 Source 차이만 존재');}
 const manifest={status:'running',started:new Date().toISOString(),pid:process.pid,policy:'reader',traj:200,fresh:1000,runs:10,decos:['none','economy','survival'],runsPerCondition:7000,totalRuns:28000,firstRunLessons:true,source:snapshots,runnerHash:sha(fs.readFileSync(__filename)),completed:[]};
 const save=()=>fs.writeFileSync(path.join(outDir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');save();
 for(const [id,root]of conditions){
  for(const [key,dir]of conditions)assert.deepEqual(frozen(dir),snapshots[key],'실행 전 고정 상태 '+key);
  const out=path.join(outDir,id+'.json'),log=path.join(outDir,id+'.log');
  const args=[path.join(root,'tools/measure-v2100.cjs'),'--traj','200','--fresh','1000','--runs','10','--policies','reader','--workers','4','--out',out];
  manifest.current={id,started:new Date().toISOString(),command:[process.execPath,...args],log};save();console.log('START '+id+' '+manifest.current.started);
  const start=Date.now(),fd=fs.openSync(log,'wx');
  const child=spawn(process.execPath,args,{cwd:root,stdio:['ignore',fd,fd],windowsHide:true});fs.closeSync(fd);
  const code=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',resolve);});assert.equal(code,0,'측정 종료 코드 '+id);
  for(const [key,dir]of conditions)assert.deepEqual(frozen(dir),snapshots[key],'실행 중 고정 상태 변경 '+key);
  const bytes=fs.readFileSync(out),result=JSON.parse(bytes);assert.equal(result.meta.firstRunLessons,true);assert.equal(result.meta.TT,200);assert.equal(result.meta.FN,1000);assert.equal(result.meta.R,10);
  assert.deepEqual(Object.keys(result.arms).sort(),['after/fresh/reader/none','after/traj/reader/economy','after/traj/reader/none','after/traj/reader/survival']);
  for(const [arm,{rows}]of Object.entries(result.arms)){assert.equal(rows.length,arm.includes('/fresh/')?1000:2000);for(const r of rows){assert.equal(r.firstRun,r.idx===0);assert.equal(r.bands.reduce((v,b)=>v+b[1],0),r.all[1]);if(r.final)assert.ok(Math.abs(r.final.members.reduce((v,m)=>v+m.power,0)-r.final.power)<1e-6);}}
  manifest.completed.push({id,seconds:(Date.now()-start)/1000,file:out,bytes:bytes.length,sha256:sha(bytes),logSha256:sha(fs.readFileSync(log))});save();console.log('DONE '+id+' '+manifest.completed.at(-1).seconds+'s');
 }
 manifest.status='complete';manifest.finished=new Date().toISOString();delete manifest.current;save();console.log('COMPLETE 28000런');
})().catch(error=>{console.error(error.stack);process.exitCode=1;});
