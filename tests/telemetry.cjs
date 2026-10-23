// Anonymous run statistics (privacy.html 제1조): numbers only, the switch is honoured, no endpoint sends nothing, a failed send waits.
const assert=require('node:assert/strict'),path=require('node:path'),root=path.join(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','systems/telemetry'])require(path.join(root,'dist',f+'.js'));
const G=globalThis,T=G.Telemetry;
const store={};globalThis.localStorage={getItem:k=>store[k]??null,setItem:(k,v)=>{store[k]=String(v);},removeItem:k=>{delete store[k];}};
const sent=[];let fail=false;globalThis.fetch=async(u,o)=>{sent.push([u,o.body]);return{ok:!fail};};
let app=false;G.Native={inApp:()=>app};
const mk=seed=>{const g=new G.Game();g.autosave=false;g.start(seed);return g;};
const tick=()=>new Promise(r=>setTimeout(r,5));
(async()=>{
 let g=mk('tele-a');
 const p=T.build(g,'end');
 assert.equal(p.schema,1);assert.ok(/^[0-9a-f]{16}$/.test(p.anon),'a random anonymous code');
 const text=JSON.stringify(p);
 for(const n of g.run.npcs)assert.ok(!text.includes(n.name),'no adventurer name in the payload');
 const bad=text.match(/email|device|location|"name"/i);assert.ok(!bad,'no identity keys '+(bad&&text.slice(bad.index-40,bad.index+40)));
 assert.equal(T.on(g.account),true,'on by default');
 T.endpoint='';T.report(g,'abandon');await tick();assert.equal(sent.length,0,'no endpoint, nothing sent');
 T.endpoint='https://example.invalid/exec';
 g.account.settings.stats=true;T.report(g,'abandon');await tick();assert.equal(sent.length,0,'the web build sends nothing');
 app=true;
 g.account.settings.stats=false;T.report(g,'abandon');await tick();assert.equal(sent.length,0,'switched off, nothing sent');
 g.account.settings.stats=true;g.abandon();await tick();assert.equal(sent.length,1,'abandon sends one');assert.equal(JSON.parse(sent[0][1]).kind,'abandon');
 fail=true;g=mk('tele-b');g.run.day=3;g.end(false,'소문');await tick();assert.equal(sent.length,2,'tried once');
 assert.equal(JSON.parse(store['guild24.stats.queue']).length,1,'a failed send waits in the queue');
 fail=false;await T.flush();assert.equal(JSON.parse(store['guild24.stats.queue']).length,0,'and goes out next time');
 /* a report that arrives while a send is in flight is kept and sent after it (User 2026-10-23) */
 {const release=[];const plain=globalThis.fetch;globalThis.fetch=async(u,o)=>{sent.push([u,o.body]);await new Promise(r=>release.push(r));return{ok:true};};
  const n0=sent.length;g=mk('tele-r1');g.run.day=3;g.end(false,'소문');await tick();
  const g2=mk('tele-r2');g2.run.day=3;g2.end(false,'소문');await tick();
  assert.equal(JSON.parse(store['guild24.stats.queue']).length,2,'the second report waits behind the first');
  release.shift()();await tick();release.shift()();await tick();
  assert.equal(sent.length-n0,2,'both reports go out');assert.equal(JSON.parse(store['guild24.stats.queue']).length,0,'and none is lost');
  globalThis.fetch=plain;}
 g=mk('tele-c');g.run.playMs=12345;g.run.reportHistory.push({day:1,playMs:5,refuse:2,refusePrice:1});
 assert.ok(G.Save.valid(JSON.parse(G.Save.export(g.account,g.run))),'a save carrying the new fields is valid');
 const old=mk('tele-d');delete old.run.playMs;assert.ok(G.Save.valid(JSON.parse(G.Save.export(old.account,old.run))),'and one without them still is');
 g=mk('tele-e');g.run.money=5000;g.relicWindow(5);const before=[...g.run.relicWindow.candidateIds];g.rerollRelics();
 const w5=T.build(g,'end').run.relics.find(w=>w.d===5);
 assert.equal(w5.rr,1,'the window reroll count');assert.deepEqual(w5.x[0].map(c=>c[0]),before,'the three traded away');
 assert.ok(G.Save.valid(JSON.parse(G.Save.export(g.account,g.run))),'a save carrying the traded-away three is valid');
 /* BALANCE DETAIL (User 2026-10-23): the Day's trace and the expedition detail go to the statistics' own store, not the save */
 {app=true;const h=mk('tele-live');h.account.settings.stats=true;const r=h.run;
  h.buyRelic(r.relicWindow.candidateIds[0]);h.open();h.beginOrder();h.setQuantity(0,1);h.finishOrder();while(r.phase==='sell')h.depart();h.closeDay();
  const live=JSON.parse(store['guild24.stats.live']);
  assert.equal(live.days.length,1,'one Day taken');assert.ok(live.days[0].tr,'with its order / sale trace');
  assert.ok(!r.reportHistory.some(x=>x.trace),'and the save keeps no trace');
  const pl=T.build(h,'end');assert.ok(pl.run.days[0].tr,'the report carries the Day trace');assert.equal(pl.detail.length,live.days[0].x.length,'and the expedition detail');
  h.end(false,'소문');await tick();assert.equal(store['guild24.stats.live'],undefined,'sent with the Run and cleared');}

 /* a Run that stops half way: every third Day goes out as a part, the app going to the background sends the rest, the web demo sends too */
 for(const k of Object.keys(store))delete store[k];sent.length=0;app=true;fail=false;
 g=mk('tele-part');const closeDay=(d)=>{g.run.day=d;g.run.results=[];T.day(g,{sheets:[[1]],bought:[],sold:[]},{revenue:10*d,spent:5,operating:2,sales:1,waste:0});};
 closeDay(1);closeDay(2);await tick();assert.equal(sent.length,0,'two Days wait');
 closeDay(3);await tick();assert.equal(sent.length,1,'the third Day sends a part');
 const p1=JSON.parse(sent[0][1]);assert.equal(p1.schema,2);assert.equal(p1.kind,'part');assert.deepEqual(p1.days.map(d=>d.d),[1,2,3]);assert.ok(p1.head&&p1.head.seed,'the first part carries the head');
 assert.ok(!JSON.stringify(p1).includes(g.run.npcs[0].name),'no names in a part');
 closeDay(4);T.part(g);await tick();assert.equal(sent.length,2,'going to the background sends what is left');
 const p2=JSON.parse(sent[1][1]);assert.deepEqual(p2.days.map(d=>d.d),[4]);assert.equal(p2.head,undefined,'the head goes once');
 T.part(g);await tick();assert.equal(sent.length,2,'nothing new, nothing sent');
 const SC=require(path.join(root,'tools/save-check.cjs'));
 const nd=path.join(require('node:os').tmpdir(),'guild24-parts.ndjson');require('node:fs').writeFileSync(nd,sent.map(x=>x[1]).join('\n'));
 const rs=SC.readStats(nd);assert.equal(rs.length,1,'two parts of one Run read as one unfinished Run');assert.equal(rs[0].run.reportHistory.length,4);
 g.end(false,'소문');await tick();assert.ok(JSON.parse(store['guild24.stats.live']||'null')===null,'the end report clears the store');
 G.GUILD24_DEMO={};app=false;sent.length=0;g=mk('tele-demo');closeDay(1);closeDay(2);closeDay(3);await tick();assert.equal(JSON.parse(sent[0][1]).demo,1,'the demo sends parts, marked');delete G.GUILD24_DEMO;
 console.log('telemetry ok');
})();
