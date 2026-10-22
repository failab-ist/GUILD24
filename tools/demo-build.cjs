#!/usr/bin/env node
// 체험판 빌드 (User 2026-10-22, 「체험판 구현 플랜」 2단계). Never part of npm test, never deployed by Pages.
//   node tools/demo-build.cjs [tag]   -> build/demo/ (the site) and build/guild24-<tag>.zip (Cloudflare direct upload; tag demo-1, demo-2, ...)
// An allowlist build: every file under dist/ must match exactly one rule below, or the build stops. A file nobody has
// classified (a new asset, a new script) is never shipped by accident, and never dropped silently either.
// What the demo cuts (CUT) leaves the shipped data here, at build time, so its names, numbers and text are not in the
// download; demo/demo.js holds the demo's rules, and the shipped scripts are bundled, minified and obfuscated into one file.
const fs=require('node:fs'),path=require('node:path'),{execSync}=require('node:child_process');
const acorn=require('acorn'),walk=require('acorn-walk'),{minify}=require('terser'),Obfuscator=require('javascript-obfuscator');
const ROOT=path.join(__dirname,'..'),SRC=path.join(ROOT,'dist'),OUT=path.join(ROOT,'build','demo');

/* 「체험판 구성」 cut list (User 2026-10-22). Hazards, families and the five family sets stay. */
const CUT={
 items:['battlelunch','bananamilk','hyperenergy','sageelixir','worldcharm','coupon','toppotion'],
 decorations:['sponsorSign','honorFrame','trainingSign','infirmaryPlaque','cheerBanner','heroSign'],
 bosses:['WRATH','ENVY','GREED','GLUTTONY','LUST','SLOTH'],
 jobs:['rogue','berserker']};
const CUT_IDS=new Set(Object.values(CUT).flat());

/* The demo's own rules, read the way the game reads them: the systems, then demo.js. FACES is how many portraits
   of each gender the demo keeps (NORMAL/<M|F>/001..n; the one X portrait always stays). */
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])
 require(path.join(SRC,f+'.js'));
require(path.join(ROOT,'demo','demo.js'));
const DEMO=globalThis.GUILD24_DEMO,FACES=DEMO.faces;
/* What must not be readable in the shipped game: the player-facing names of everything cut, taken from the full data
   (the systems above loaded it before any pruning). A boss counts by its full name and its short one (래스). */
const FORBIDDEN=(()=>{const D=globalThis.DATA,by=(list,id)=>list.find(x=>x.id===id)?.name;
 const w=[...CUT.items.map(id=>by(D.items,id)),...CUT.decorations.map(id=>by(D.decorations,id)),...CUT.jobs.map(id=>by(D.jobs,id)),
  ...CUT.bosses.flatMap(id=>{const n=by(D.bosses,id);return [n,n.split(' ').pop()];})];
 if(w.some(x=>!x))throw new Error('a cut id has no entry in the data: '+JSON.stringify(CUT));
 return w;})();
/* Every string the minified game carries (literals and template text), each forbidden word that occurs in one. */
function leaks(code){const strings=[];
 walk.full(acorn.parse(code,{ecmaVersion:'latest'}),n=>{if(n.type==='Literal'&&typeof n.value==='string')strings.push(n.value);
  if(n.type==='TemplateElement')strings.push(n.value.cooked??n.value.raw);});
 return FORBIDDEN.map(w=>[w,strings.filter(t=>t.includes(w))]).filter(([,hits])=>hits.length);}

/* Scripts, in index.html order. demo.js goes in right before ui/app.js, which reads it. */
const SCRIPT={
 'ui/vendor/anime.umd.min.js':'vendor',       // shipped as is, beside its licence
 'systems/simulation.js':'drop',               // the measuring bots
 'build.js':'bundle','ui/app.js':'bundle'};
const isBundled=src=>SCRIPT[src]?SCRIPT[src]==='bundle':/^(data|systems|ui)\/[\w/.-]+\.js$/.test(src);

/* Every other file. First match wins; `keep` copies, `drop` leaves out, a function decides per file. */
const num=f=>+path.basename(f,path.extname(f));
const RULES=[
 [/^index\.html$/,'page'],
 [/^(qa-mobile|privacy)\.html$/,'drop'],      // QA page; the privacy page has its own site
 [/^favicon\.svg$/,'keep'],
 [/^ui\/(ui|director-review)\.css$/,'style'], // one sheet, in this order
 [/^ui\/fonts\/.+\.woff2$/,'keep'],
 [/^ui\/fonts\/(OFL.*|coverage\.json)$/,f=>/OFL/.test(f)],
 [/^ui\/vendor\/anime\.LICENSE\.md$/,'keep'],
 [/^ui\/assets\/audio\/.+$/,'keep'],
 [/^ui\/assets\/bgm\/.+$/,'drop'],           // no music in the demo (User 2026-10-22)
 [/^ui\/assets\/deco\/(\w+)\.svg$/,f=>!CUT.decorations.includes(path.basename(f,'.svg'))],
 [/^ui\/assets\/npc\/npc-0\d\.png$/,'keep'],
 [/^ui\/assets\/npc\/boss\/B\d+_(\w+?)_.+\.webp$/,f=>/_PRIDE_/.test(f)],
 [/^ui\/assets\/npc\/normal\/(M|F)\/\d+\.webp$/,f=>num(f)<=FACES[f.split('/')[4]]],
 [/^ui\/assets\/npc\/normal\/X\/\d+\.webp$/,'keep'],
 [/^ui\/assets\/presentation\/final\/.+$/,'drop'], // the Final never comes
 [/^ui\/assets\/presentation\/\w+\/[\w-]+\.(png|webp|jpg)$/,'keep']];
const classify=f=>{const r=RULES.find(([re])=>re.test(f));if(!r)return null;return typeof r[1]==='function'?(r[1](f)?'keep':'drop'):r[1];};

/* ---- source edits: what the cut leaves behind ---- */
const log=[];
const idOf=n=>{
 if(!n)return null;
 if(n.type==='Literal'&&typeof n.value==='string')return n.value;
 if(n.type==='ArrayExpression')return idOf(n.elements[0]);
 if(n.type==='CallExpression')return n.arguments[0]?.type==='Literal'?n.arguments[0].value:null;
 if(n.type==='ObjectExpression'){const p=n.properties.find(p=>p.type==='Property'&&(p.key.name||p.key.value)==='id');return p?idOf(p.value):null;}
 return null;};
const keyOf=p=>p.type==='Property'&&!p.computed?(p.key.name??p.key.value):null;
/* An && chain any of whose terms is `x === '<cut id>'` can never hold in the demo. */
const cutTest=t=>t.type==='LogicalExpression'&&t.operator==='&&'?cutTest(t.left)||cutTest(t.right)
 :t.type==='BinaryExpression'&&t.operator==='==='&&[t.left,t.right].some(s=>s.type==='Literal'&&CUT_IDS.has(s.value));
/* Removing elements of a list also removes the commas beside them: each one up to the next element, and a run at the
   end of the list from the last element that stays. */
function dropItems(list,gone,edits){
 const last=list.reduce((k,_,i)=>gone.has(i)?k:i,-1);
 list.forEach((n,i)=>{if(gone.has(i)&&i<last)edits.push([n.start,list[i+1].start,''])});
 const tail=list.map((_,i)=>i).filter(i=>i>last);
 if(tail.length)edits.push([last>=0?list[last].end:list[tail[0]].start,list[tail.at(-1)].end,'']);}
/* Lists and keys are cut only in data and in the asset lists named here: in the systems a cut id can be a field a Save
   is checked for (account.unlocks.worldcharm), which must stay. A test that can never hold goes everywhere. */
const LISTS=f=>/^data\//.test(f)||['ui/assets/npc/manifest.js','ui/preload.js','ui/scene.js'].includes(f);
function prune(file,src){
 const ast=acorn.parse(src,{ecmaVersion:'latest'}),edits=[],lists=LISTS(file);
 walk.full(ast,n=>{
  if(lists&&n.type==='ArrayExpression'){
   const gone=new Set(n.elements.map((e,i)=>CUT_IDS.has(idOf(e))?i:-1).filter(i=>i>=0));
   for(const i of gone)log.push(file+': list item '+idOf(n.elements[i]));
   if(gone.size)dropItems(n.elements,gone,edits);}
  if(lists&&n.type==='ObjectExpression'){
   const gone=new Set(n.properties.map((p,i)=>CUT_IDS.has(keyOf(p))?i:-1).filter(i=>i>=0));
   for(const i of gone)log.push(file+': key '+keyOf(n.properties[i]));
   if(gone.size)dropItems(n.properties,gone,edits);}
  /* A line that names something cut sits on a path the demo cannot reach (the Final, a cut Decoration's effect): it
     is emptied rather than shipped. leaks() below proves none is left. */
  if(n.type==='Literal'&&typeof n.value==='string'&&FORBIDDEN.some(w=>n.value.includes(w))){log.push(file+': text '+n.value.slice(0,50));edits.push([n.start,n.end,"''"]);}
  if(n.type==='TemplateElement'&&FORBIDDEN.some(w=>n.value.raw.includes(w))){log.push(file+': text '+n.value.raw.slice(0,50));edits.push([n.start,n.end,'']);}
  if(n.type==='IfStatement'&&!n.alternate&&cutTest(n.test)){log.push(file+': if '+src.slice(n.test.start,n.test.end).slice(0,60));edits.push([n.start,n.end,';']);}});
 return apply(src,edits);}
/* Edits never overlap except where an outer removal already covers an inner one: keep the outer. */
function apply(src,edits){
 edits.sort((a,b)=>a[0]-b[0]||b[1]-a[1]);const out=[];let at=0;
 for(const [s,e,t] of edits){if(s<at)continue;out.push(src.slice(at,s),t);at=e;}
 return out.join('')+src.slice(at);}
/* Edits the generic prune cannot see, each one named and checked to have happened exactly once. */
const SPECIAL={
 'systems/run.js':[[/if\(this\.run\.day===G\.Meta\.ITEM_UNLOCK_DAY\.worldcharm&&[^\n]*\n/,'\n','the DAY 14 「새 상품 해금」 toast for a product the demo does not have']],
 'data/decorations.js':[[/G\.DATA\.decorationSlots=\['sign','wall','counter','display'\];/,"G.DATA.decorationSlots=['counter','display'];",'the 1000G and 1500G places (간판, 벽) have no Decoration left: the store shows the two it sells']],
 'ui/preload.js':[[/const BOSS=\[[^\]]*\];/,'const BOSS=[];','no Final backdrops to warm']],
 'ui/app.js':[[/,simulate:Debug\.simulate,showDebug:\(\)=>setModal\('debug'\)\}/,'}','the console handle without the bots (simulation.js is not shipped) or the debug panel']],
 'ui/audio.js':[[/const trackFor=phase=>/,'const trackFor=()=>\'\',fullTrackFor=phase=>','no music: every phase plays none'],
  [/function bgmPrime\(key\)\{/,'function bgmPrime(key){return;','no music fetched ahead (the prologue primes one)']]};
function special(file,src){
 for(const [re,to,why] of SPECIAL[file]||[]){const m=src.match(new RegExp(re.source,'g'));
  if(!m||m.length!==1)throw new Error(file+': expected one match for '+re+' ('+why+')');
  src=src.replace(re,to);log.push(file+': '+why);}
 return src;}

/* Top-level names must stay unique once the scripts share one file. */
function topLevel(file,src,seen){
 for(const n of acorn.parse(src,{ecmaVersion:'latest'}).body){
  const ids=n.type==='VariableDeclaration'?n.declarations.map(d=>d.id.name):n.type==='FunctionDeclaration'||n.type==='ClassDeclaration'?[n.id.name]:[];
  for(const id of ids){if(seen.has(id))throw new Error('top-level '+id+' in '+file+' and '+seen.get(id));seen.set(id,file);}}}

/* The pruned game must still play: the shipped data and systems (before minifying), the bots and demo.js run in a
   fresh context, every Run ends by DAY 20 against 프라이드, and a Save written there reads back. */
function selfCheck(files,scripts){
 const vm=require('node:vm'),store=new Map();
 const ctx=vm.createContext({console,localStorage:{getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v)),removeItem:k=>store.delete(k)}});
 const sim=prune('systems/simulation.js',fs.readFileSync(path.join(SRC,'systems','simulation.js'),'utf8'));
 const order=files.filter(([f])=>/^(data|systems)\//.test(f)).concat([['systems/simulation.js',sim]],files.filter(([f])=>f==='demo/demo.js'));
 for(const [f,s] of order)vm.runInContext(s,ctx,{filename:f});
 const out=vm.runInContext(`(()=>{const G=globalThis,P=G.Game.prototype,end=P.end,ends=[];
  P.end=function(){const s=this.run;if(s.phase!=='end')ends.push({day:s.day,boss:s.bossId,win:s.win});const r=end.apply(this,arguments);
   if(ends.length===1){G.Save.write(this.account,this.run);ends.read=!!G.Save.read();}return r;};
  G.Debug.trajectory({trajectories:4,runs:3,policy:'investor',prefix:'demo-build'});P.end=end;return ends;})()`,ctx);
 const bad=out.filter(e=>e.boss!=='PRIDE'||e.day>DEMO.endDay||e.win);
 if(out.length!==12||bad.length)throw new Error('self-check: '+out.length+' Runs, off-rule '+JSON.stringify(bad.slice(0,3)));
 if(!out.read)throw new Error('self-check: a Save written by the demo does not read back');
 return out.filter(e=>e.day===DEMO.endDay).length;}

async function main(){
 const commit=execSync('git rev-parse --short=7 HEAD',{cwd:ROOT}).toString().trim(),tag=process.argv[2]||'demo-'+commit;
 const page=fs.readFileSync(path.join(SRC,'index.html'),'utf8');
 const scripts=[...page.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m=>m[1]);
 if(!scripts.includes('ui/app.js'))throw new Error('index.html: no ui/app.js');
 const files=[],seen=new Map();
 for(const src of scripts){
  if(SCRIPT[src]==='drop'||SCRIPT[src]==='vendor')continue;
  if(!isBundled(src))throw new Error('unclassified script '+src);
  if(src==='ui/app.js')files.push(['demo/demo.js',fs.readFileSync(path.join(ROOT,'demo','demo.js'),'utf8')]);
  let s=fs.readFileSync(path.join(SRC,src),'utf8');
  if(src==='build.js')s=s.replace("commit:'dev'","commit:'"+commit+"-demo'");
  files.push([src,special(src,prune(src,s))]);}
 for(const [f,s] of files)topLevel(f,s,seen);
 const reached=selfCheck(files,scripts);
 /* The pruned sources, readable, beside the site (never in the zip): what tests and the capture tools load. */
 const SRCOUT=path.join(ROOT,'build','demo-src');fs.rmSync(SRCOUT,{recursive:true,force:true});
 for(const [f,s] of files.concat([['systems/simulation.js',prune('systems/simulation.js',fs.readFileSync(path.join(SRC,'systems','simulation.js'),'utf8'))]])){
  const to=path.join(SRCOUT,f);fs.mkdirSync(path.dirname(to),{recursive:true});fs.writeFileSync(to,s);}
 for(const [f,want] of Object.entries(SPECIAL))if(!scripts.includes(f))throw new Error('SPECIAL names '+f+', which index.html does not load');

 fs.rmSync(OUT,{recursive:true,force:true});fs.mkdirSync(OUT,{recursive:true});
 const joined=files.map(([f,s])=>s.trimEnd()+'\n;').join('\n');
 /* G24_DEMO_PLAIN=1: the same build, unminified and readable, for finding a fault in it. Never upload that one. */
 const plain=process.env.G24_DEMO_PLAIN==='1';
 const min=plain?{code:joined}:await minify(joined,{ecma:2020,compress:{passes:2},mangle:true,format:{comments:false}});
 const leak=leaks(min.code);
 if(leak.length)throw new Error('cut names still in the game:\n  '+leak.map(([w,h])=>w+': '+h.slice(0,3).map(t=>JSON.stringify(t.slice(0,90))).join(' / ')).join('\n  '));
 const code=plain?min.code:Obfuscator.obfuscate(min.code,{compact:true,target:'browser',stringArray:true,stringArrayThreshold:1,stringArrayEncoding:['base64'],
  stringArrayRotate:true,stringArrayShuffle:true,splitStrings:false,controlFlowFlattening:false,deadCodeInjection:false,
  identifierNamesGenerator:'mangled',renameGlobals:false,selfDefending:false,sourceMap:false,unicodeEscapeSequence:false}).getObfuscatedCode();
 const hash=require('node:crypto').createHash('sha256').update(code).digest('hex').slice(0,10);
 const game='g.'+hash+'.js';fs.writeFileSync(path.join(OUT,game),code);

 /* Every file under dist/ */
 const all=[];(function list(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);e.isDirectory()?list(p):all.push(path.relative(SRC,p).split(path.sep).join('/'));}})(SRC);
 const counts={keep:0,drop:0},missing=[];let css='';
 for(const f of all.sort()){
  if(f.endsWith('.js')&&scripts.includes(f)&&SCRIPT[f]!=='vendor')continue;
  if(SCRIPT[f]==='vendor'){const to=path.join(OUT,f);fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(path.join(SRC,f),to);counts.keep++;continue;}
  const a=classify(f);if(!a){missing.push(f);continue;}
  if(a==='keep'){const to=path.join(OUT,f);fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(path.join(SRC,f),to);counts.keep++;}
  else if(a==='drop')counts.drop++;}
 const loose=all.filter(f=>f.endsWith('.js')&&!scripts.includes(f));
 if(loose.length)missing.push(...loose.map(f=>f+' (a script index.html does not load)'));
 if(missing.length)throw new Error('unclassified file(s):\n  '+missing.join('\n  '));
 for(const f of ['ui/ui.css','ui/director-review.css'])css+=fs.readFileSync(path.join(SRC,f),'utf8').replace(/\/\*[\s\S]*?\*\//g,'')+'\n';
 const sheet='ui/s.'+require('node:crypto').createHash('sha256').update(css).digest('hex').slice(0,10)+'.css';
 // in ui/, beside the fonts its url()s are relative to
 fs.writeFileSync(path.join(OUT,sheet),css.replace(/\n\s*\n/g,'\n'));

 /* The page: one sheet, the vendor script, the game. The description says what the demo is. */
 let html=page.replace(/<link rel="stylesheet" href="ui\/ui\.css"><link rel="stylesheet" href="ui\/director-review\.css">/,'<link rel="stylesheet" href="'+sheet+'">')
  .replace(/(<script src="[^"]+"><\/script>\s*)+/,'<script src="ui/vendor/anime.umd.min.js"></script><script src="'+game+'"></script>')
  .replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="마왕 잡는 편의점: 길드24 체험판. 발주하고, 보급하고, 단골을 키워 DAY 20까지 점포를 지킨다.">')
  .replace('<title>마왕 잡는 편의점: 길드24</title>','<title>마왕 잡는 편의점: 길드24 체험판</title>');
 if(/<script src="(?!ui\/vendor|g\.)/.test(html)||!html.includes(sheet)||!html.includes('체험판</title>'))throw new Error('index.html did not take the demo page edits');
 fs.writeFileSync(path.join(OUT,'index.html'),html);

 const zip=path.join(ROOT,'build','guild24-'+tag+'.zip');fs.rmSync(zip,{force:true});
 execSync('zip -qr '+JSON.stringify(zip)+' .',{cwd:OUT});
 const size=d=>fs.readdirSync(d,{withFileTypes:true}).reduce((t,e)=>t+(e.isDirectory()?size(path.join(d,e.name)):fs.statSync(path.join(d,e.name)).size),0);
 fs.writeFileSync(path.join(ROOT,'build','demo-edits.txt'),log.join('\n')+'\n');
 console.log('demo '+tag+' from '+commit+': '+files.length+' scripts -> '+game+' ('+Math.round(code.length/1024)+' KB), '
  +counts.keep+' files kept, '+counts.drop+' dropped, '+log.length+' source edits (build/demo-edits.txt), self-check 12 Runs ('+reached+' at DAY '+DEMO.endDay+'), site '+(size(OUT)/1048576).toFixed(1)+' MB, '+path.relative(ROOT,zip));}
main().catch(e=>{console.error('demo build stopped: '+e.message);process.exit(1);});
