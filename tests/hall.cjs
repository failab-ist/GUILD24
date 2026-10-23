const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require('../dist/'+f+'.js');
/* 명예의 전당 (User 2026-10-23): a Boss clear keeps its party on the account, newest first; a failure keeps nothing */
const g=new Game();g.autosave=false;g.start('hall-1');
for(let k=0;k<3;k++)g.addNPC();
const team=g.run.npcs.slice(0,3);team[0].visits=7;
g.run.finalReport={cleared:true,families:[],members:team.map(n=>({npcId:n.id,name:n.name,level:n.level,job:n.job,items:['potion']}))};
g.end(true,'test');
const e=g.account.hall[0];
assert.equal(g.account.hall.length,1);assert.equal(e.run,g.account.runs);assert.equal(e.boss,g.run.bossId);
assert.deepEqual(e.members.map(m=>m.name),team.map(n=>n.name));assert.equal(e.members[0].visits,7);
assert.ok(Save.valid(JSON.parse(Save.export(g.account,g.run))),'the record saves');
const f=new Game(g.account);f.autosave=false;f.start('hall-2');f.end(false,'test');
assert.equal(f.account.hall.length,1,'a failure adds nothing');
/* User 2026-10-23: a hall or last-names value that is not a list reads as empty, so the next Run still ends cleanly */
{const raw=JSON.parse(Save.export(f.account,null));raw.account.hall={};raw.account.lastNames='x';
 const m=Save.migrate(raw);assert.deepEqual(m.account.hall,[]);assert.deepEqual(m.account.lastNames,[]);
 const h=new Game(m.account);h.autosave=false;h.start('hall-3');h.end(false,'test');assert.ok(Array.isArray(h.account.lastNames)&&h.account.lastNames.length>0,'the Run ends and records its names');}
console.log('PASS hall: a clear keeps its party, a failure nothing');
