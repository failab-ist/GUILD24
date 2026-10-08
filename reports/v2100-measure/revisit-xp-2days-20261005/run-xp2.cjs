const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
const root=__dirname,arm=path.join(root,'xp2'),manifest=JSON.parse(fs.readFileSync(path.join(root,'provenance-xp2.json')));
function check(){for(const f of manifest.files)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(arm,f.file))).digest('hex'),f.sha256,f.file);}
async function run(args,cwd,logname){const log=fs.createWriteStream(path.join(root,logname)),p=spawn(process.execPath,args,{cwd,windowsHide:true,stdio:['ignore','pipe','pipe']});p.stdout.on('data',s=>log.write(s));p.stderr.on('data',s=>log.write(s));await new Promise((resolve,reject)=>{p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(Error(logname+' exit '+code)));});await new Promise(resolve=>log.end(resolve));}
(async()=>{
 check();console.log('START xp2 standard · 15000 runs');
 await run([path.join(arm,'tools/measure-v2100.cjs'),'--traj','200','--fresh','1000','--out',path.join(root,'xp2.json')],arm,'xp2.log');
 const result=JSON.parse(fs.readFileSync(path.join(root,'xp2.json'))),rows=Object.values(result.arms).reduce((n,a)=>n+a.rows.length,0);assert.equal(rows,15000);console.log('DONE xp2 standard · '+result.meta.sec+'s · '+rows+' runs');
 console.log('START xp2 save profile · 2000 runs');
 await Promise.all(['reader','expert'].map(policy=>run([path.join(root,'profile.cjs'),'--worker','xp2',policy],root,'profile-xp2-'+policy+'.log')));
 for(const policy of ['reader','expert']){const p=JSON.parse(fs.readFileSync(path.join(root,'profile-xp2-'+policy+'.json')));assert.equal(p.rows.length,1000);assert.equal(new Set(p.rows.map(r=>r.seed)).size,1000);console.log('DONE xp2 profile '+policy+' · '+p.meta.sec+'s');}
 check();console.log('COMPLETE xp2 · 17000 runs');
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
