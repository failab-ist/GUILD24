// Review images from actual captures and the actual icon asset; no gameplay measurement.
const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process'),{chromium}=require('playwright');
const root=path.resolve('reports/ui'),out=path.join(root,'feedback-review');
const img=file=>'<img src="data:image/png;base64,'+fs.readFileSync(path.join(root,file)).toString('base64')+'">';
const icon=source=>source.match(/const REROLL_ICON='([^']+)';/)[1];
const oldIcon=icon(execFileSync('git',['show','a23a47be:dist/ui/app.js'],{encoding:'utf8'})),newIcon=icon(fs.readFileSync('dist/ui/app.js','utf8')).replace(/src="([^"]+)"/,(_,file)=>'src="data:image/png;base64,'+fs.readFileSync(path.join('dist',file)).toString('base64')+'"');
const cases=[
 ['fatigue','피로 변화 · 모바일 글자와 배치','이전 수정안','재수정',img('minor-feedback/after/fatigue-390.png'),img('minor-feedback/revised/fatigue-390.png')],
 ['reroll','발주 후보 교환 · 원호 사이의 틈','main','재수정','<div class="icon">'+oldIcon+'</div>','<div class="icon">'+newIcon+'</div>'],
 ['final-environment','원정대 준비 · 같은 게이트의 위험을 한 줄로','이전 수정안','재수정',img('final-feedback/after/party-390.png'),img('final-feedback/grouped/party-390.png')]
];
(async()=>{fs.mkdirSync(out,{recursive:true});const b=await chromium.launch({executablePath:process.env.QA_CHROMIUM||chromium.executablePath()});
 try{const p=await b.newPage({viewport:{width:848,height:100},deviceScaleFactor:1});
  for(const[id,title,left,right,a,z]of cases){await p.setContent('<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;padding:24px;background:#ece9e2;color:#30291f;font:16px/1.5 Arial,"Malgun Gothic",sans-serif}h1{margin:0 0 14px;font-size:22px}header,main{display:grid;grid-template-columns:390px 390px;gap:20px}header{margin-bottom:12px}header b{background:#30291f;color:white;padding:6px 12px}img{display:block;max-width:100%;margin:0 auto}.icon{display:grid;place-items:center;height:160px;background:#f4e6c4;color:#8d774d}.icon svg,.icon img{width:96px;height:96px;object-fit:contain}p{margin:12px 0 0;font-size:13px}</style><h1>'+title+'</h1><header><b>BEFORE · '+left+'</b><b>AFTER · '+right+'</b></header><main><section>'+a+'</section><section>'+z+'</section></main>'+(id==='reroll'?'<p>모양 확인을 위한 확대. 실제 버튼에서는 16px로 표시합니다.</p>':''));await p.locator('img').evaluateAll(es=>Promise.all(es.map(e=>e.decode())));await p.screenshot({path:path.join(out,id+'.png'),fullPage:true});}
 }finally{await b.close();}console.log('CAPTURE feedback review: '+out);
})().catch(e=>{console.error(e);process.exitCode=1;});
