/* 체험판 전용 규칙 (User 2026-10-22, 「체험판 구현 플랜」). The demo build alone loads this file, after the systems and before
   ui/app.js; the full game never ships it, so nothing here can be switched on in the paid build.
   - one Boss for every demo Run: 오만의 마왕 프라이드 (no in-Run rule, only the Final it never reaches)
   - a Run that closes DAY 20 still standing ends there: no Boss clear is recorded, Store Capital settles as usual,
     and the ending offers the next store (Runs are unlimited; the meta keeps growing)
   - Job Mastery ranks 1 and 2 only (3~5 need Boss clears the demo cannot make)
   The rules wrap the shared Game methods; the shared source keeps two empty hooks in ui/app.js (GUILD24_DEMO). */
(function(G){
const P=G.Game.prototype,D=G.DATA;
const END_DAY=20,BOSS='PRIDE',REASON='체험판은 DAY '+END_DAY+'까지입니다.';
/* The Play store page, once it is public. Left empty the ending shows no link. */
const STORE_URL='';

const start=P.start;
P.start=function(){const r=start.apply(this,arguments),s=this.run;
 s.bossId=BOSS;delete s.slothDays;delete s.sealBreakCount;return r;};

/* After the DAY 20 night, where closeDay would open DAY 21. A death-limit or bankrupt close still ends the usual way. */
const closeDay=P.closeDay;
P.closeDay=function(){const s=this.run;
 if(s.phase==='closing'&&s.day>=END_DAY&&s.stats.deaths<G.Meta.deathLimit(s)&&s.money>=0){this.end(false,REASON);return true;}
 return closeDay.apply(this,arguments);};

D.masteryRanks.length=Math.min(D.masteryRanks.length,2);

/* Customers: a portrait belongs to a name (systems/adventurer.js), so the demo keeps the names whose portraits it ships,
   NORMAL/<M|F>/001..FACES and the one X. A DAY 20 Run meets about 15 customers. The portrait map was built when
   adventurer.js loaded, so trimming the pool in place leaves every kept name on its own portrait. */
const FACES={M:15,F:15};
{const A=G.Adventurer,keep=A.names.filter(n=>{const p=A.portraitOf(n);return p&&(p.gender==='X'||p.slot<=FACES[p.gender]);});
 A.names.splice(0,A.names.length,...keep);}
if(G.NPCAssets)G.NPCAssets.normal={...G.NPCAssets.normal,...FACES};

/* The prep slip: the full game's says 30 days and a Boss on the last day */
function prepNote(){
 return '<div class="slip prep-note"><span class="pin"></span><b class="welcome-title">체험판은 DAY '+END_DAY+'까지 길드24 편의점을 운영한다.</b>'
 +'<span class="flavor">찾아오는 모험가를 보급하고, 성장시킨다.</span>'
 +'<span class="welcome-band">마왕 토벌은 정식판에서. 정식판은 처음부터 새로 시작한다.</span></div>';}

/* The DAY 20 ending: what the Run reached and moved, who carried it, the castle ahead, and the next store */
function endScreen(k){const {stage,btn,ledger,portrait,E,game,Scene}=k,s=game.run,boss=D.bosses.find(b=>b.id===s.bossId);
 const tape='<div class="tape end-tape"><div class="tear top"></div><div class="print">'
  +'<div class="head"><b>GUILD24</b><span>DAY '+END_DAY+' 도달<span class="sp">'+E(s.branch)+'</span></span></div>'
  +'<p class="closed">DAY '+END_DAY+'까지 점포를 지켜 냈다.</p>'
  +'<p class="reason">'+E(REASON)+'</p>'
  +ledger()+'</div><div class="tear bottom"></div></div>';
 const best=s.npcs.filter(n=>n.alive&&n.introduced).sort((a,b)=>b.level-a.level||b.loyalty-a.loyalty).slice(0,3);
 const crew=best.length?'<section class="sent-off"><h3>DAY '+END_DAY+'까지 함께한 사람들</h3><div class="went">'
  +best.map(n=>'<div class="goer" style="cursor:default">'+portrait(n,88)+'<div><b>'+E(n.name)+'</b><span class="who-line">Lv.'+n.level+' '+E(D.jobBy[n.job]?.name||n.job)+'</span>'
   +'<span class="carried">단골도 '+n.loyalty+'</span></div></div>').join('')+'</div></section>':'';
 const art=Scene.bossArt(s.bossId,s.day,0);
 const castle='<section class="sent-off demo-castle"><h3>마왕성이 보인다</h3><div class="went" style="padding:12px 16px">'
  +(art?'<img class="demo-boss" src="'+E(art)+'" alt="" style="display:block;width:100%;max-width:320px;margin:8px auto">':'')
  +'<p>'+E(boss?boss.name:'마왕')+'가 기다린다. 키운 모험가들을 마왕성으로 보내는 마지막 원정은 정식판에서 이어진다.</p></div></section>';
 const full='<section class="sent-off demo-full"><h3>정식판</h3><div class="went" style="padding:12px 16px">'
  +'<p>DAY 30과 마왕전, 마왕 7종, 직업 6종, 장식 12종. 체험판 기록은 정식판으로 이어지지 않는다.</p></div></section>';
 const dock=(STORE_URL?'<a class="bare" href="'+E(STORE_URL)+'" target="_blank" rel="noopener">정식판 보기</a>':'')+btn('다음 점포 열기','new','stamp');
 return stage('end','점포 종료','',tape+crew+castle+full,dock);}

G.GUILD24_DEMO={endDay:END_DAY,boss:BOSS,reason:REASON,storeUrl:STORE_URL,faces:FACES,prepNote,endScreen};
})(globalThis);
