const fs=require('fs'),root=process.argv[2],lim=process.argv[3];
const cat=root+'/dist/data/catalog.js',dun=root+'/dist/systems/dungeon.js';
let c=fs.readFileSync(cat,'utf8');
const set=(id,from,to)=>{const re=new RegExp("(item\\('"+id+"',[^\\n]*\\{[^}]*)"+from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));if(!re.test(c))throw Error('miss '+id+' '+from);c=c.replace(re,'$1'+to);};
set('midpotion','combat:18','combat:14');set('highpotion','combat:25','combat:19');set('toppotion','combat:35','combat:25');
for(const [id,k] of [['water','survival'],['coffee','mobility'],['herbtea','spirit']])set(id,k+':12',k+':14');
set('energy','mobility:17','mobility:19');
for(const [id,k] of [['kingwater','survival'],['hyperenergy','mobility'],['sageelixir','spirit']])set(id,k+':20',k+':22');
for(const [id,k] of [['rice','survival'],['choco','mobility'],['yanggaeng','spirit']])set(id,k+':6',k+':9');
set('lunchbox','survival:9','survival:12');set('guildlunch','survival:12','survival:15');set('battlelunch','survival:15','survival:18');
for(const [id,k] of [['ice','fire'],['soda','corrosion'],['ramen','cold'],['candy','fear']])set(id,k+':10',k+':12');
fs.writeFileSync(cat,c);
// mask & hybrids by name (ids unknown)
c=fs.readFileSync(cat,'utf8');
const byName=(name,from,to)=>{const re=new RegExp("(item\\('[a-z0-9]+','"+name+"',[^\\n]*\\{)"+from);if(!re.test(c))throw Error('miss '+name);c=c.replace(re,'$1'+to);};
byName('방진마스크','poison:12','poison:14');byName('방한 두건','cold:8','cold:10');byName('방독 작업장갑','poison:8','poison:10');byName('축성 손전등','fear:8','fear:10');byName('방수망토','corrosion:8','corrosion:10');
if(lim){const [a,b,d]=lim.split('/');const o="deathLimitSegments:[{maxDay:10,limit:6},{maxDay:20,limit:8},{maxDay:30,limit:10}]";if(!c.includes(o))throw Error('lim');c=c.replace(o,`deathLimitSegments:[{maxDay:10,limit:${a}},{maxDay:20,limit:${b}},{maxDay:30,limit:${d}}]`);}
fs.writeFileSync(cat,c);
let u=fs.readFileSync(dun,'utf8');
const t="+((d.tier||1)-1)*6,defense";if(!u.includes(t))throw Error('threat');u=u.replace(t,"+((d.tier||1)-1)*6+((d.tier||1)===1?2:0),defense");
const w="'퇴각':.50,'부상':.35";if(!u.includes(w))throw Error('wallet');u=u.replace(w,"'퇴각':.40,'부상':.25");
fs.writeFileSync(dun,u);console.log('ok',root,lim||'6/8/10');
