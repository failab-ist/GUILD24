(function(G){
const D=G.DATA;
function fresh(){return {version:1,xp:0,grade:1,unlocked:[],knowledge:{},progress:{},discovered:[],runs:0,wins:0,discoveries:[],tutorial:{},settings:{muted:true},lastUnlocks:[]};}
function check(a){const newly=[];for(const[id,[,target]]of Object.entries(D.unlocks))if((a.progress[id]||0)>=target&&!a.unlocked.includes(id)){a.unlocked.push(id);newly.push(id);}a.grade=[0,120,300,550,850,1250].filter(x=>a.xp>=x).length;a.lastUnlocks=newly;return newly;}
function bump(a,k,n=1,max=false){a.progress[k]=max?Math.max(a.progress[k]||0,n):(a.progress[k]||0)+n;}
function observe(a,report,n){a.discoveries??=[];report.discoveries=[];for(const e of report.events||[]){if(!a.discoveries.some(x=>x.id===e.id)){a.discoveries.push({...e,day:report.day});report.discoveries.push(e);}}const d=D.dungeonBy[report.dungeon]||D.dungeonBy.spider;if(report.items.length&&report.outcome!=='사망'){a.knowledge[d.id]=(a.knowledge[d.id]||0)+1;bump(a,'knowledge15');}if(n.alive){if(d.id==='snow')bump(a,'cold5');if(d.hazards.includes('fear'))bump(a,'fear5');if(report.poison)bump(a,'poison10');if(report.outcome==='퇴각')bump(a,'escape10');if(report.outcome==='중상')bump(a,'wounded5');if(report.won&&d.id==='fire')bump(a,'fire12');bump(a,'level15',n.level,true);if(n.job==='mage')bump(a,'mage10',n.level,true);}return check(a);}
function finish(a,run,win){if(run.rewarded)return;run.rewarded=true;a.runs++;if(win){a.wins++;bump(a,'boss1');}bump(a,'run1');const xp=Math.round(run.day*3+(win?100:0)+run.stats.discoveries*5+Math.max(...run.npcs.map(n=>n.level))*3+run.stats.regulars*5);a.xp+=xp;run.metaReward=xp;return check(a);}
G.Meta={fresh,check,bump,observe,finish};
})(globalThis);
