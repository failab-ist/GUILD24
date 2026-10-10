for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run','ui/presentation'])require('/home/user/GUILD24/dist/'+f+'.js');
const save=require(process.argv[2]).run;
const b=save.npcs.find(n=>n.name==='바그니');
for(const d of save.dungeons){const e=Dungeon.prepare(b,d,[]).effects;console.log('바그니',d.id,(Dungeon.preparedPower(e)/d.power).toFixed(2));}
const g=new Game();g.autosave=false;g.start('nb');const acc=g.account;
const ids=['spider','slime','golem','crypt','snow'];
for(let day=3;day<=29;day++){g.run.day=day;const gates=ids.map(id=>g.makeDungeon(id,1));
 const r=new RNG('nb'+day);let tot=0,adv=0;const byLv={},byJob={};
 for(let i=0;i<2000;i++){const n=Adventurer.create(r,900+i,day,acc);for(const d of gates){const ratio=Dungeon.preparedPower(Dungeon.prepare(n,d,[]).effects)/d.power;tot++;const u=ratio>1.2;adv+=u;(byLv[n.level]??=[0,0]);byLv[n.level][0]++;byLv[n.level][1]+=u;(byJob[n.job]??=[0,0]);byJob[n.job][0]++;byJob[n.job][1]+=u;}}
 const f=o=>Object.entries(o).map(([k,[a,u]])=>k+':'+(100*u/a).toFixed(0)+'%').join(' ');
 console.log('D'+day,'min',Adventurer.newcomerMinLevel(day),'gate',(gates.reduce((a,d)=>a+d.power,0)/gates.length).toFixed(1),'우세 '+(100*adv/tot).toFixed(1)+'%','| Lv',f(byLv));}
