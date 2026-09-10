(function(G){
const D=G.DATA;

/* 계정 — Run을 넘어 남는 것. 누적 경험치가 가맹등급을 올리고, 진행도가 해금을 연다.
   v2.5에서 Job Mastery 중심으로 재설계될 자리라, 무엇이 어디서 올라가는지 읽히게 둔다. */

const GRADE_STEPS=[0,120,300,550,850,1250];

function fresh(){
 return {version:1,xp:0,grade:1,unlocked:[],knowledge:{},progress:{},discovered:[],
  runs:0,wins:0,discoveries:[],tutorial:{},settings:{muted:true},lastUnlocks:[]};
}

/* 진행도가 목표에 닿은 해금을 연다. 등급은 누적 경험치가 넘긴 문턱의 개수다. */
function check(a){
 const newly=[];
 for(const [id,[,target]] of Object.entries(D.unlocks))
  if((a.progress[id]||0)>=target && !a.unlocked.includes(id)){a.unlocked.push(id);newly.push(id);}
 a.grade=GRADE_STEPS.filter(x=>a.xp>=x).length;
 a.lastUnlocks=newly;
 return newly;
}

/* 진행도 한 칸. max면 누적이 아니라 최고 기록을 남긴다(최고 레벨 같은 것). */
function bump(a,k,n=1,max=false){
 a.progress[k]=max?Math.max(a.progress[k]||0,n):(a.progress[k]||0)+n;
}

/* 원정 하나가 계정에 남기는 것. 던전 지식은 보급을 받은 모험가가 살아 돌아왔을 때만
   쌓인다 — 맨몸으로 내보내 지식을 파밍하는 경로는 없다. */
function observe(a,report,n){
 a.discoveries??=[];
 report.discoveries=[];
 for(const e of report.events||[])
  if(!a.discoveries.some(x=>x.id===e.id)){a.discoveries.push({...e,day:report.day});report.discoveries.push(e);}

 const d=D.dungeonBy[report.dungeon]||D.dungeonBy.spider;
 if(report.items.length && report.outcome!=='사망'){
  a.knowledge[d.id]=(a.knowledge[d.id]||0)+1;
  bump(a,'knowledge15');
 }
 if(n.alive){
  if(d.id==='snow')bump(a,'cold5');
  if(d.hazards.includes('fear'))bump(a,'fear5');
  if(report.poison)bump(a,'poison10');
  if(report.outcome==='퇴각')bump(a,'escape10');
  if(report.outcome==='중상')bump(a,'wounded5');
  if(report.won&&d.id==='fire')bump(a,'fire12');
  bump(a,'level15',n.level,true);
  if(n.job==='mage')bump(a,'mage10',n.level,true);
 }
 return check(a);
}

/* Run 종료 보상. 한 판은 한 번만 정산된다(rewarded 가드).
   가중치는 PASS3 항목이며 사용자 승인 없이 바꾸지 않는다. */
function finish(a,run,win){
 if(run.rewarded)return;
 run.rewarded=true;
 a.runs++;
 if(win){a.wins++;bump(a,'boss1');}
 bump(a,'run1');
 const xp=Math.round(
  run.day*3
  +(win?100:0)
  +run.stats.discoveries*5
  +Math.max(...run.npcs.map(n=>n.level))*3
  +run.stats.regulars*5);
 a.xp+=xp;
 run.metaReward=xp;
 return check(a);
}

G.Meta={fresh,check,bump,observe,finish};
})(globalThis);
