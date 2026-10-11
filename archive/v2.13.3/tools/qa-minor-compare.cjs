// Screenshot report: render the unaltered browser captures side by side.
const fs=require('node:fs'),path=require('node:path'),{chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'reports/ui/minor-feedback'),out=path.join(root,'compare');
const data=(phase,name)=>'data:image/png;base64,'+fs.readFileSync(path.join(root,phase,name)).toString('base64');
const img=(phase,name,height,top=0)=>`<div class="crop" style="height:${height}px"><img src="${data(phase,name)}" style="margin-top:-${top}px"></div>`;
const cases=[
 ['fatigue','밤 · 피로 결과와 상세',p=>img(p,'night-390.png',250,380)+img(p,'fatigue-390.png',780)],
 ['order','발주 · 위험 보기 정렬과 여백',p=>img(p,'order-390.png',460)],
 ['sale','판매 · 건강 삭제와 바가지 거절 영수증',p=>'<h3>상황창</h3>'+img(p,'sale-390.png',155)+'<h3>바가지 거절 직후</h3>'+img(p,'refusal-detail-390.png',220)],
 ['reroll','발주 후보 교환 · 화살표와 코치 일정',p=>'<h3>화살표</h3>'+img(p,'reroll-390.png',400,380)+`<h3>코치 · DAY ${p==='before'?2:4}</h3>`+img(p,'reroll-coach-390.png',780)]
];
(async()=>{fs.mkdirSync(out,{recursive:true});const b=await chromium.launch({executablePath:process.env.QA_CHROMIUM||chromium.executablePath()});
 try{const p=await b.newPage({viewport:{width:848,height:100},deviceScaleFactor:1});
  for(const[id,title,body]of cases){await p.setContent(`<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;padding:24px;background:#ece9e2;color:#30291f;font:16px/1.5 Arial,"Malgun Gothic",sans-serif}h1{margin:0 0 14px;font-size:22px}header{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:12px}header b{background:#30291f;color:#fff;padding:6px 12px}main{display:grid;grid-template-columns:390px 390px;gap:20px}.crop{width:390px;overflow:hidden;margin-bottom:12px;background:#161009}img{display:block;width:390px}h3{font-size:15px;margin:8px 0}</style><h1>${title}</h1><header><b>BEFORE · main a23a47be</b><b>AFTER · 수정안</b></header><main><section>${body('before')}</section><section>${body('after')}</section></main>`);await p.locator('img').evaluateAll(es=>Promise.all(es.map(e=>e.decode())));await p.screenshot({path:path.join(out,id+'.png'),fullPage:true});}
 }finally{await b.close();}
 console.log('CAPTURE comparison: '+out);
})().catch(e=>{console.error(e);process.exitCode=1;});
