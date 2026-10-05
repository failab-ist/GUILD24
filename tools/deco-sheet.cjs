// Every Decoration picture side by side, each drawn at its Slot's one width as the store draws it, so a new picture is
// judged against the others of its Slot (UI_UX §DECORATION ART). Dev tool, not part of npm test.
//   node tools/deco-sheet.cjs out.png
const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/decorations'])require(path.join(root,'dist',f+'.js'));
const D=(globalThis.GUILD24||globalThis).DATA,out=path.resolve(process.argv[2]||'deco-sheet.png');
const SLOTS=['sign','wall','counter','display'],WIDTH={sign:200,wall:110,counter:120,display:130};
const cell=d=>'<div style="display:flex;flex-direction:column;align-items:center;justify-content:end;height:200px"><img src="data:image/svg+xml;base64,'
 +fs.readFileSync(path.join(root,'dist/ui/assets/deco',d.id+'.svg')).toString('base64')+'" style="image-rendering:pixelated;width:'+WIDTH[d.slot]+'px;height:auto">'
 +'<span style="margin-top:14px">'+d.name+'</span></div>';
const rows=SLOTS.map(s=>D.decorations.filter(d=>d.slot===s)),cols=Math.max(...rows.map(r=>r.length));
const html='<body style="margin:0;background:#c9b48f;display:grid;grid-template-columns:repeat('+cols+',260px);gap:12px;padding:12px;font:14px sans-serif">'
 +rows.map(r=>r.map(cell).join('')+'<div></div>'.repeat(cols-r.length)).join('')+'</body>';
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch({executablePath:process.env.QA_CHROMIUM||'/opt/pw-browsers/chromium',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:cols*272+12,height:880}});await p.setContent(html);await p.screenshot({path:out,fullPage:true});await b.close();console.log(out);})();
