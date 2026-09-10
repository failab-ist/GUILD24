(function(G){
const KEY='guild24.save.v5';

/* 저장 검증. 한 절이라도 어긋나면 그 저장은 받아들이지 않는다.
   각 검사는 이름을 갖고 따로 서 있다 — 이 함수는 v2.4에서만 두 번 확장됐고
   앞으로도 상태가 늘 때마다 손대는 자리라, 무엇을 검사하는지 읽히는 것이 중요하다.
   순서는 값싼 검사부터다. 중간에 무엇이 던지든 바깥 try가 받아 거절로 돌린다. */

const PHASES=['foundation','morning','order','sell','night','closing','final','end'];
const RELIC_WINDOWS=[0,5,10,15,20,25,30];

/* 계정 — Run을 넘어 유지되는 것. 해금 키와 발견 상품은 실제 카탈로그에 있어야 한다. */
function accountOk(a,D){
 return !!a
  && Array.isArray(a.unlocked) && a.unlocked.every(k=>k in D.unlocks)
  && Array.isArray(a.discovered) && a.discovered.every(k=>D.itemBy[k])
  && !!a.progress && !!a.knowledge && !!a.settings
  && (a.tutorial===undefined || (typeof a.tutorial==='object' && !!a.tutorial))
  && Number.isFinite(a.xp)
  && Number.isInteger(a.grade) && a.grade>=1 && a.grade<=6;
}

/* Run의 뼈대 — 있어야 할 배열과 값이 있고, DAY와 단계가 실재하는 범위인가. */
function runShapeOk(r){
 return !!r
  && ['npcs','inventory','facilities','offers','queue','dungeons','results','team','reportHistory']
     .every(k=>Array.isArray(r[k]))
  && !!r.stats && !!r.daily && !!r.pity
  && Number.isInteger(r.day) && r.day>=1 && r.day<=30
  && Number.isFinite(r.money)
  && typeof r.seed==='string' && Number.isFinite(r.rngState)
  && PHASES.includes(r.phase);
}

/* 명단 — 같은 모험가가 두 번 있지 않고, 대기열과 최종팀이 실재하는 사람만 가리킨다. */
function rosterOk(r,ids){
 return new Set(ids).size===ids.length
  && r.queue.every(id=>ids.includes(id))
  && r.team.every(id=>ids.includes(id))
  && r.team.length<=3;
}

/* 모험가 한 명 — 직업·특성·소지품이 전부 실재하는 카탈로그 항목인가. */
function npcOk(n,D){
 return typeof n.id==='string' && typeof n.name==='string'
  && !!D.jobBy[n.job]
  && Number.isFinite(n.appearance) && Number.isFinite(n.level)
  && !!n.stats && Object.values(n.stats).every(Number.isFinite)
  && Array.isArray(n.traits) && n.traits.every(t=>D.traitBy[t])
  && Array.isArray(n.pack) && n.pack.every(i=>D.itemBy[i])
  && Array.isArray(n.history) && n.history.every(h=>D.itemBy[h.item])
  && Array.isArray(n.records) && Array.isArray(n.refused)
  && !!n.equipment && Number.isFinite(n.loyalty)
  && typeof n.alive==='boolean';
}

/* 재고 · 발주 후보 · 오늘의 게이트. 은퇴한 어휘를 읽는 항목은 여기서 걸린다. */
function stockOk(r,D){
 return r.inventory.every(st=>D.itemBy[st.item] && typeof st.id==='string'
    && (st.expires===null || Number.isFinite(st.expires)))
  && r.offers.every(o=>D.itemBy[o.item] && Number.isFinite(o.price) && Number.isFinite(o.quantity))
  && r.dungeons.every(d=>D.dungeonBy[d.id]
    && Array.isArray(d.hazards) && d.hazards.every(h=>h in D.hazards)
    && Number.isFinite(d.power)
    && (d.requiredSupply===undefined || (Number.isInteger(d.requiredSupply) && d.requiredSupply>=0)));
}

/* 진행 중인 판이 들고 있는 나머지 — 읽던 위치, 오늘의 사건, 손님의 한마디,
   점포지원 갱신 상태, 최종 구성. 저장/불러오기가 재추첨이 되지 않게 하는 절들이다. */
function progressOk(r,ids,D){
 if(!Number.isInteger(r.cursor) || r.cursor<0) return false;
 if(r.phase==='sell' && r.cursor>=r.queue.length) return false;
 if(r.nightCursor!==undefined
   && (!Number.isInteger(r.nightCursor) || r.nightCursor<0 || r.nightCursor>r.results.length)) return false;
 if(!r.results.every(rep=>ids.includes(rep.npcId) && D.dungeonBy[rep.dungeon]
   && typeof rep.outcome==='string'
   && Array.isArray(rep.items) && rep.items.every(i=>D.itemBy[i])
   && Number.isFinite(rep.xp))) return false;
 if(r.event && !D.events.some(e=>e.id===r.event.id)) return false;
 if(r.eventSeen!==undefined && typeof r.eventSeen!=='boolean') return false;
 if(r.phase==='end' && typeof r.win!=='boolean') return false;
 if(r.say && (typeof r.say.text!=='string' || !ids.includes(r.say.npc))) return false;
 if(r.special && (typeof r.special.kind!=='string' || typeof r.special.used!=='boolean')) return false;
 if(r.final && !finalOk(r.final,D)) return false;
 if(r.finalReport && !(typeof r.finalReport.cleared==='boolean'
   && Array.isArray(r.finalReport.members)
   && r.finalReport.members.every(m=>ids.includes(m.npcId)))) return false;
 if(r.relicWindow && !relicWindowOk(r.relicWindow,D)) return false;
 if(r.cart && !(Object.values(r.cart).every(q=>Number.isInteger(q) && q>=0)
   && !Object.keys(r.cart).some(i=>!r.offers[i]))) return false;
 return true;
}

/* 최종 원정 — 서로 다른 두 Family가 D30에 공개돼 있어야 한다. */
function finalOk(f,D){
 return Array.isArray(f.families) && f.families.length===2
  && new Set(f.families).size===2 && f.families.every(x=>D.familyTiers[x])
  && f.day===30
  && Array.isArray(f.hazards) && f.hazards.every(h=>h in D.hazards);
}

/* 점포지원 갱신 — 후보와 가격이 고정돼 있어야 불러오기가 재추첨이 되지 않는다. */
function relicWindowOk(w,D){
 return Array.isArray(w.candidateIds)
  && new Set(w.candidateIds).size===w.candidateIds.length
  && w.candidateIds.every(id=>D.relicBy[id])
  && Array.isArray(w.candidatePrices)
  && w.candidatePrices.length===w.candidateIds.length
  && w.candidatePrices.every(x=>Number.isInteger(x) && x>=0)
  && RELIC_WINDOWS.includes(w.milestoneDay)
  && Number.isInteger(w.expiryDay)
  && typeof w.focusedRevealSeen==='boolean'
  && (!w.purchased || w.candidateIds.includes(w.purchased));
}

G.Save={
 error:null,
 migrate(s){return s;},

 write(account,run){
  try{
   const json=JSON.stringify({version:5,account,run});
   const previous=localStorage.getItem(KEY);
   if(previous)localStorage.setItem(KEY+'.backup',previous);
   localStorage.setItem(KEY,json);
   this.error=null;
   return true;
  }catch(e){
   this.error='자동저장 불가 — 저장 내보내기로 진행을 보관하세요.';
   return false;
  }
 },

 read(){
  if(typeof localStorage==='undefined')return null;
  if(!localStorage.getItem(KEY)&&!localStorage.getItem(KEY+'.backup')){
   /* 이전 형식만 남아 있는 경우. 원본은 지우지 않고, 사람 말로 알린다. */
   if(['v1','v2','v3','v4'].some(v=>localStorage.getItem('guild24.save.'+v)))
    this.error='규칙 개편으로 이전 영업은 이어갈 수 없습니다. 새 점포를 열어 주세요. 이전 저장 원본은 보관됩니다.';
   return null;
  }
  /* 최신 저장이 읽히지 않으면 직전 백업으로 내려간다. */
  for(const key of [KEY,KEY+'.backup'])try{
   const raw=localStorage.getItem(key);
   if(!raw)continue;
   const s=JSON.parse(raw);
   if(this.valid(s))return this.migrate(s);
  }catch(e){}
  this.error='저장된 진행을 읽지 못했습니다. 원본 저장은 보존됩니다. 설정에서 저장 파일을 가져올 수 있습니다.';
  return null;
 },

 valid(s){
  try{
   const D=G.DATA,a=s?.account,r=s?.run;
   if(s?.version!==5)return false;
   if(!accountOk(a,D))return false;
   if(r===null)return true;              // 계정만 있고 진행 중인 Run이 없는 저장
   if(!runShapeOk(r))return false;
   const ids=r.npcs.map(n=>n.id);
   if(!rosterOk(r,ids))return false;
   if(!r.npcs.every(n=>npcOk(n,D)))return false;
   if(!stockOk(r,D))return false;
   if(!progressOk(r,ids,D))return false;
   return true;
  }catch(e){return false;}
 },

 export(account,run){return JSON.stringify({version:5,account,run},null,2);},
 import(raw){
  const s=JSON.parse(raw);
  if(!this.valid(s))throw Error('이 버전의 저장 파일이 아닙니다.');
  return this.migrate(s);
 }
};
})(globalThis);
