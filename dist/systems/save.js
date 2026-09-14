(function(G){
const KEY='guild24.save.v7';
/* Every schema this game has ever written, current one apart. Read() uses it to tell a
   player their old save cannot be continued; reset() uses the same list to erase it, so a
   version bump is made in one place and both paths follow. */
const LEGACY=['v1','v2','v3','v4','v5','v6'];

/* Save validation. One clause out of line and the save is refused.
   Each check stands alone under its own name. This function was extended twice in v2.4
   alone and gets touched again every time run state grows, so what it checks has to be
   readable. Cheap checks run first; anything that throws on the way is caught by the
   outer try and turned into a refusal.
   Comments here are ASCII on purpose: the subset check scans every character in dist/,
   so Korean in a comment is shipped font bytes for text no player ever sees. */

const PHASES=['foundation','morning','order','sell','night','closing','final','end'];
const RELIC_WINDOWS=[0,5,10,15,20,25,30];

/* Account: what is kept across Runs. Unlock keys and discovered goods must exist in the catalog. */
/* Account: what is kept across Runs. The Job x Boss matrix is the only progression truth,
   so it is checked as the exact current Cartesian set - every Job, every Boss, a boolean in
   each cell. A partial or unknown-key matrix is malformed, not partial progress, and is
   refused rather than read. Mastery, distinct clears and the Grade are derived from it, so
   there is no cached value here that could disagree with it. */
function accountOk(a,D){
 if(!a||!a.knowledge||!a.settings)return false;
 if(!a.unlocks||typeof a.unlocks!=='object')return false;
 if(typeof a.unlocks.premium!=='boolean'||typeof a.unlocks.tree!=='boolean')return false;
 /* Mix levels are a presentation preference, not progression truth: checked for shape when
    present, the way tutorial is, and defaulted by the audio layer when a save predates them.
    A save that carries a level carries a real one - a string or a 7 is malformed, not old. */
 for(const k of ['bgm','sfx'])
  if(a.settings[k]!==undefined&&!(Number.isFinite(a.settings[k])&&a.settings[k]>=0&&a.settings[k]<=1))return false;
 if(!Array.isArray(a.discovered)||!a.discovered.every(k=>D.itemBy[k]))return false;
 if(a.tutorial!==undefined&&(typeof a.tutorial!=='object'||!a.tutorial))return false;
 const m=a.matrix,jobs=D.jobs.map(j=>j.id),bosses=D.bosses.map(b=>b.id);
 if(!m||typeof m!=='object')return false;
 if(Object.keys(m).length!==jobs.length)return false;
 return jobs.every(job=>{const row=m[job];
  return !!row&&typeof row==='object'&&Object.keys(row).length===bosses.length
   &&bosses.every(boss=>typeof row[boss]==='boolean');});
}

/* The shape of a Run: the arrays and values that must be there, with DAY and phase in real range. */
function runShapeOk(r,D){
 return !!r
  && ['npcs','inventory','facilities','offers','queue','dungeons','results','team','reportHistory']
     .every(k=>Array.isArray(r[k]))
  && !!r.stats && !!r.daily && !!r.pity
  && Number.isInteger(r.day) && r.day>=1 && r.day<=30
  && Number.isFinite(r.money)
  && typeof r.seed==='string' && Number.isFinite(r.rngState)
  && PHASES.includes(r.phase)
  /* How many deficit Closings this Run has already traded its way out of. Required, and bounded
     by the rule - a save that claims more rescues than the Run is allowed, or a fractional
     count, is not a Run this build produced. */
  && Number.isInteger(r.rescueUsed) && r.rescueUsed>=0 && r.rescueUsed<=D.balance.rescueLimit
  && Number.isInteger(r.rescueDay) && r.rescueDay>=0 && r.rescueDay<=30;
}

/* The roster: no adventurer twice, and the queue and final team point only at people who exist. */
function rosterOk(r,ids){
 return new Set(ids).size===ids.length
  && r.queue.every(id=>ids.includes(id))
  && r.team.every(id=>ids.includes(id))
  && r.team.length<=3;
}

/* One adventurer: job, traits and pack are all real catalog entries. */
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

/* Stock, order candidates and today's gates. An entry naming retired vocabulary is caught here. */
function stockOk(r,D){
 return r.inventory.every(st=>D.itemBy[st.item] && typeof st.id==='string'
    && (st.expires===null || Number.isFinite(st.expires)))
  && r.offers.every(o=>D.itemBy[o.item] && Number.isFinite(o.price) && Number.isFinite(o.quantity))
  && r.dungeons.every(d=>D.dungeonBy[d.id]
    && Array.isArray(d.hazards) && d.hazards.every(h=>h in D.hazards)
    && Number.isFinite(d.power)
    && (d.requiredSupply===undefined || (Number.isInteger(d.requiredSupply) && d.requiredSupply>=0)));
}

/* The rest of what a run in progress carries: where it was reading, today's event, the
   customer's line, the store-support window, the final line-up. These are the clauses that
   stop save/load from turning into a re-roll. */
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
 if(r.finalLock && !finalLockOk(r.finalLock,ids)) return false;
 if(r.finalReport && !(typeof r.finalReport.cleared==='boolean'
   && Array.isArray(r.finalReport.members)
   && r.finalReport.members.every(m=>ids.includes(m.npcId)))) return false;
 if(r.relicWindow && !relicWindowOk(r.relicWindow,D)) return false;
 if(r.cart && !(Object.values(r.cart).every(q=>Number.isInteger(q) && q>=0)
   && !Object.keys(r.cart).some(i=>!r.offers[i]))) return false;
 return true;
}

/* The Boss this Run was dealt. One identity, its two reveal flags, and - only when that
   identity is SLOTH - the seal opportunity Days and the breaks committed so far. Reload
   must not be able to re-roll or undo any of it, so all of it is checked here, and a
   non-SLOTH Run must not be carrying SLOTH state at all. */
function bossOk(r,D){
 if(!D.bossBy[r.bossId])return false;
 const seen=r.bossReveal;
 if(!seen || typeof seen.identitySeen!=='boolean' || typeof seen.traitSeen!=='boolean')return false;
 if(seen.familySeen!==undefined && typeof seen.familySeen!=='boolean')return false;
 if(r.bossId!=='SLOTH')return r.slothDays===undefined && r.sealBreakCount===undefined;
 return Array.isArray(r.slothDays) && r.slothDays.length===2
  && new Set(r.slothDays).size===2 && r.slothDays.every(d=>[15,20,25].includes(d))
  && Number.isInteger(r.sealBreakCount) && r.sealBreakCount>=0 && r.sealBreakCount<=3;
}

/* What the Final was locked against. Reload restores this rather than recomputing it, so
   a Boss cannot be re-targeted and a committed sales figure cannot be re-read from a
   later state. */
function finalLockOk(l,ids){
 return !!l.bossId
  && Array.isArray(l.families) && l.families.length===2
  && Number.isFinite(l.revenue)
  && Array.isArray(l.members) && l.members.length>0 && l.members.length<=3
  && (l.envyTargetNpcId===undefined || ids.includes(l.envyTargetNpcId))
  && l.members.every(m=>ids.includes(m.npcId) && Number.isFinite(m.hazard)
    && (m.regular===undefined || typeof m.regular==='boolean')
    && !!m.stats && ['combat','survival','mobility','spirit'].every(k=>Number.isFinite(m.stats[k])))
  && (l.sealBreakCount===undefined
    || (Number.isInteger(l.sealBreakCount) && l.sealBreakCount>=0 && l.sealBreakCount<=3));
}

/* DUNGEON_HAZARD / CORE_RUN §DEEP EXPEDITION SAVE CONTRACT. The schedule is decided once per
   Run and today's base Gate once it is generated, so a reload can neither re-roll them nor
   reopen a nomination that was already spent. A Day with no Deep carries no `today` at all. */
function deepOk(r,ids){
 const p=r.deep;
 if(!p||!Array.isArray(p.days))return false;
 if(p.days.length<2||p.days.length>3)return false;
 if(new Set(p.days).size!==p.days.length)return false;
 if(!p.days.every(d=>[7,14,21,28].includes(d)))return false;
 if(!p.days.some(d=>d===7||d===14)||!p.days.some(d=>d===21||d===28))return false;
 if(p.today===null)return true;
 const t=p.today;
 return !!t && p.days.includes(t.day)
  && Number.isInteger(t.gateIndex) && t.gateIndex>=0 && t.gateIndex<r.dungeons.length
  && (t.nomineeId===null || ids.includes(t.nomineeId))
  && Number.isFinite(t.paid) && t.paid>=0
  && (t.nomineeId!==null || t.paid===0);
}

/* The final expedition: two different Families, revealed on D30. */
function finalOk(f,D){
 return Array.isArray(f.families) && f.families.length===2
  && new Set(f.families).size===2 && f.families.every(x=>D.familyTiers[x])
  && f.day===30
  && Array.isArray(f.hazards) && f.hazards.every(h=>h in D.hazards);
}

/* Store-support window: candidates and prices must stay pinned, or loading becomes a re-roll. */
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
  && [w.slothSealOpportunity,w.consumedBySealBreak,w.sealBreakCommitted].every(x=>x===undefined||typeof x==='boolean')
  && !(w.consumedBySealBreak&&w.purchased)
  && (!w.purchased || w.candidateIds.includes(w.purchased));
}

G.Save={
 error:null,
 migrate(s){return s;},

 write(account,run){
  try{
   const json=JSON.stringify({version:7,account,run});
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
   /* Only an older format is left. The original is never erased; the player is told in plain words. */
   if(LEGACY.some(v=>localStorage.getItem('guild24.save.'+v)))
    this.error='규칙 개편으로 이전 영업은 이어갈 수 없습니다. 새 점포를 열어 주세요. 이전 저장 원본은 보관됩니다.';
   return null;
  }
  /* If the newest save will not read, fall back to the previous backup. */
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
   if(s?.version!==7)return false;
   if(!accountOk(a,D))return false;
   if(r===null)return true;              // an account-only save, with no run in progress
   if(r?.version!==7)return false;
   if(!runShapeOk(r,D))return false;
   if(!bossOk(r,D))return false;
   const ids=r.npcs.map(n=>n.id);
   if(!deepOk(r,ids))return false;
   if(!rosterOk(r,ids))return false;
   if(!r.npcs.every(n=>npcOk(n,D)))return false;
   if(!stockOk(r,D))return false;
   if(!progressOk(r,ids,D))return false;
   return true;
  }catch(e){return false;}
 },

 /* Full game data reset. Everything this game owns lives under the current key, its backup
    and the legacy keys, so those are derived from the two constants above rather than listed
    again here. The legacy keys have to go too: leaving them would make the very next read()
    warn about an older save, which is not a first launch. There is no partial variant - the
    caller starts over from Meta.fresh(), which is the same path a new player takes. */
 reset(){
  if(typeof localStorage==='undefined')return false;
  try{
   for(const key of [KEY,KEY+'.backup',...LEGACY.map(v=>'guild24.save.'+v)])localStorage.removeItem(key);
   this.error=null;
   return true;
  }catch(e){
   this.error='저장 삭제에 실패했습니다. 브라우저 저장소를 확인해 주세요.';
   return false;
  }
 },

 export(account,run){return JSON.stringify({version:7,account,run},null,2);},
 import(raw){
  const s=JSON.parse(raw);
  if(!this.valid(s))throw Error('이 버전의 저장 파일이 아닙니다.');
  return this.migrate(s);
 }
};
})(globalThis);
