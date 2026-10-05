const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{spawn}=require('node:child_process');
const base=__dirname,manifest=JSON.parse(fs.readFileSync(path.join(base,'provenance.json'))),started=Date.now();
async function arm(name){
 const root=path.join(base,name);
 for(const f of manifest.arms[name].files){const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f.file))).digest('hex');if(hash!==f.sha256)throw Error('Candidate changed: '+name+'/'+f.file);}
 const log=fs.createWriteStream(path.join(base,name+'.log'));
 console.log('START '+name+' · elapsed '+Math.round((Date.now()-started)/1000)+'s');
 const p=spawn(process.execPath,[path.join(root,'tools/measure-v2100.cjs'),'--traj','200','--fresh','1000','--out',path.join(base,name+'.json')],{cwd:root,windowsHide:true,stdio:['ignore','pipe','pipe']});
 p.stdout.on('data',s=>log.write(s));p.stderr.on('data',s=>log.write(s));
 await new Promise((resolve,reject)=>{p.on('error',reject);p.on('exit',code=>code===0?resolve():reject(Error(name+' exited '+code)));});
 await new Promise(resolve=>log.end('\n',resolve));
 const result=JSON.parse(fs.readFileSync(path.join(base,name+'.json')));
 const rows=Object.values(result.arms).reduce((n,a)=>n+a.rows.length,0);
 if(rows!==15000)throw Error('Incomplete arm '+name+': '+rows+'/15000');
 console.log('DONE '+name+' · '+result.meta.sec+'s · '+rows+' runs');
}
(async()=>{for(const name of ['baseline','visit','xp','both'])await arm(name);console.log('COMPLETE 4 arms · '+Math.round((Date.now()-started)/1000)+'s');})().catch(e=>{console.error(e.stack);process.exitCode=1;});
