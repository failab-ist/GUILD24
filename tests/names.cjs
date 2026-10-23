const assert=require('node:assert/strict');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])require('../dist/'+f+'.js');
/* 반복 느낌 줄이기: a Run never draws a name the account's previous Run drew */
let account=null,prev=null;
for(let i=0;i<12;i++){
 const g=account?new Game(account):new Game();g.autosave=false;account=g.account;g.start('names-'+i);
 for(let k=0;k<20;k++)g.addNPC();
 const names=g.run.npcs.map(n=>n.name);
 if(prev)assert.ok(names.every(n=>!prev.includes(n)),'run '+i+' reused a name from the previous run');
 g.end(false,'test');assert.deepEqual(account.lastNames,names);
 prev=names;
}
assert.ok(Save.valid(JSON.parse(Save.export(account,null))));
console.log('PASS names: no name from the previous Run');
