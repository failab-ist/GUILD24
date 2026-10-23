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
 console.log('telemetry ok');
})();
