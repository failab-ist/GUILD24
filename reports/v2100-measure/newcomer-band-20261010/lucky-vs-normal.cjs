const pct=(a,b)=>b?(100*a/b).toFixed(1):'-';
for(const [name,file,pre] of process.argv.slice(2).map(s=>s.split(':'))){const j=require(file);
 for(const pol of ['investor','reader']){const rows=j.arms[pre+'/fresh/'+pol+'/none'].rows;
  const L=rows.filter(r=>r.core.top[1]>=30&&r.core.top[0]/r.core.top[1]>=.8),N=rows.filter(r=>!L.includes(r));
  const c=a=>a.filter(r=>r.win).length,re=a=>a.filter(r=>r.reach).length;
  console.log(name.padEnd(6),pol.padEnd(8),'reach',pct(re(rows),rows.length),'clear',pct(c(rows),rows.length),'| lucky n',L.length,'clear',pct(c(L),L.length),'| normal clear',pct(c(N),N.length),'reach',pct(re(N),N.length),'ratio',(c(L)/L.length/(c(N)/N.length)).toFixed(1));}}
