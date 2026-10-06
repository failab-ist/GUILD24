const fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process');
const name=process.argv[2],dir=__dirname,root=path.join(dir,name),start=Date.now();
if(!['env25','env20','potion0','potion1'].includes(name))throw Error('후보 이름 오류');
const stdout=fs.openSync(path.join(dir,name+'.log'),'w'),stderr=fs.openSync(path.join(dir,name+'.err.log'),'w');
const p=spawn(process.execPath,['tools/measure-v2100.cjs','--traj','200','--fresh','1000','--workers','4','--out',path.join(dir,name+'.json')],{cwd:root,stdio:['ignore',stdout,stderr],windowsHide:true});
fs.writeFileSync(path.join(dir,name+'.running.json'),JSON.stringify({pid:p.pid,started:new Date().toISOString()}));
p.on('close',(code,signal)=>{fs.closeSync(stdout);fs.closeSync(stderr);fs.writeFileSync(path.join(dir,name+'.exit.json'),JSON.stringify({code,signal,seconds:(Date.now()-start)/1000}));});
