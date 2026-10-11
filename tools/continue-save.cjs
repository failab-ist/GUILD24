// Continue a save — MEASUREMENT ONLY, dev tool, never part of npm test (AGENTS §9-A: run on User approval).
// User 2026-10-11: one of the User's saves played on from where it stands, N times with only the roll stream changed, so a rule
// change can be read against the User's own run (before / after on the same save). A finished run cannot be continued.
//   node tools/continue-save.cjs <save.json> [--n 200] [--policy investor|reader] [--root <checkout>] [--out result.json]
// Reports the clear chance, how the runs ended, and how many of the save's top four (by Level) are alive at the end.
const fs=require('node:fs'),path=require('node:path');
const {RANK}=require('./measure-v2100.cjs');
const arg=(k,d)=>{const i=process.argv.indexOf('--'+k);return i>0?process.argv[i+1]:d;};
const file=process.argv[2];if(!file||file.startsWith('--')){console.error('사용법: node tools/continue-save.cjs <save.json> [--n 200] [--policy investor] [--root <checkout>] [--out file.json]');process.exit(1);}
const root=path.resolve(arg('root',path.resolve(__dirname,'..'))),n=+arg('n',200),policy=arg('policy','investor');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/simulation'])
 require(path.join(root,'dist',f+'.js'));
const G=globalThis.GUILD24||globalThis;
if(!G.Debug.continueRun){console.error(root+' 의 simulation.js에 continueRun이 없습니다.');process.exit(1);}

// the in-game 저장 내보내기 file, the raw localStorage value, or a Playwright storageState that holds it (as save-check.cjs)
let raw=fs.readFileSync(file,'utf8');
try{const o=JSON.parse(raw);if(o&&Array.isArray(o.origins)){const hit=o.origins.flatMap(x=>x.localStorage||[]).find(x=>/^guild24\.save/.test(x.name));if(!hit)throw Error('storageState에 guild24 저장이 없습니다.');raw=hit.value;}}
catch(e){if(/storageState/.test(e.message))throw e;}
const {account,run}=G.Save.import(raw);
if(!run||run.phase==='end'||run.settled){console.error('끝난 판이라 이어서 둘 수 없습니다.');process.exit(1);}

const top=[...run.npcs].filter(x=>x.alive).sort((a,b)=>b.level-a.level).slice(0,4);
const t0=Date.now(),rows=G.Debug.continueRun(account,run,n,policy,{relicPriority:RANK});
const pct=x=>(x*100).toFixed(1)+'%',by=k=>rows.filter(r=>r.end===k).length;
for(const r of rows)r.end=r.win?'클리어':r.final?'마왕 실패':r.deaths>=r.limit?'사망 한도':'파산';
const survive=rows.map(r=>top.filter(x=>r.alive.includes(x.id)).length),reached=rows.filter(r=>r.final);
const lines=[
 `세이브 ${path.basename(file)} · DAY ${run.day} ${run.phase} · ${policy} 봇 × ${n}판 (${((Date.now()-t0)/1000).toFixed(0)}초)`,
 `클리어 ${pct(by('클리어')/n)} · 마왕까지 간 판 ${pct(reached.length/n)} (그중 클리어 ${reached.length?pct(by('클리어')/reached.length):'-'})`,
 `끝난 이유: 클리어 ${by('클리어')} · 마왕 실패 ${by('마왕 실패')} · 사망 한도 ${by('사망 한도')} · 파산 ${by('파산')}`,
 `저장 때 상위 4명(${top.map(x=>x.name+' Lv.'+x.level).join(', ')}) 중 끝까지 산 수: 평균 ${(survive.reduce((a,b)=>a+b,0)/n).toFixed(2)}명`+
 ` · 0~4명 ${[0,1,2,3,4].map(k=>survive.filter(v=>v===k).length).join('/')}`];
console.log(lines.join('\n'));
if(arg('out'))fs.writeFileSync(arg('out'),JSON.stringify({save:path.basename(file),day:run.day,policy,n,top:top.map(x=>({id:x.id,name:x.name,level:x.level})),rows},null,1));
