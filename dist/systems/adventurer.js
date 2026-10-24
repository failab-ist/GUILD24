(function(G){
const D=G.DATA,keys=['combat','survival','mobility','spirit'];
// COPY_WORLD_VOICE 15: 한국어 어감 + 판타지 변형 + 가끔 자연스러운 말장난.
// Tone anchors: 지오닝 / 민자이 / 고쉬스앵.
// 서양 High-Fantasy 이름은 존재하되 normal pool의 주류가 되지 않는다.
/* The shipped pool IS the production name pool, kept in that pool's own binding order:
   names[0..99] are NORMAL/M/001..100, names[100..199] are NORMAL/F/001..100 and names[200] is NORMAL/X/001. A name is
   therefore its own portrait address and no second catalogue exists to drift from it.
   Every name is drawn with the same chance (name()); no identity is rarer than another.
   Derived from GUILD24_NPC_PRODUCTION/00_NAME_POOL/PRODUCTION_NAME_POOL.json and re-checked
   against that file by tests/npc-assets.cjs - never maintained by hand. */
const names=[
 "민자이","고쉬스앵","마루진","한도람","태오람","도하르","산도르","장보르","박하르","오름찬",
 "로엔담","베르한","도바름","알바른","편도르","한결로","모다크","장마르","우바크","세베크",
 "자가르","파도르","홍차드","도라지오","보리안","차우엔","리븐헌","이유넬","최연센","적리반",
 "이그라수","다올찬","영수안","고사리오","조세로","야간도","도토릭","바코린","미수가르","솔바울",
 "달마지오","참세르","민들로","담비르","호두안","밤톨란","두루미르","송로안","감초르","대쥬안",
 "진렐도","쇼메르","봉투라크","석바르","벤기르","마티아","포스탄","새벽찬","리헨스","택배르",
 "오두막스","누룬지오","된자르","생가르","참케르","대쥬르","고드렐","버드나르","태베크","설라크",
 "다시마로","옥수렌","감자크","앵두르","가마솔","계산도","한우람","삼각진","우직산","문호젠",
 "솔키르","만두르","로구엔","트래븐","문고리오","나루베","산드람","메아룬","마감로","골모크",
 "장도크","메도르","그루멜","베루안","부엔기","갈데오","주렌타","바소트","모시락","도르레오",
 "다래온","나린솔","지오닝","소담린","가람비","모아린","새온비","여울라","은결비","초롱하",
 "아라온","세아린","보름하","나래온","미르아","다온설","서리안","카르미나","진달레아","다오네아",
 "카리냥","개나리아","메이실","모레아","솔레안","벨하리","은설리아","신상아","가오렌","할리네",
 "매실라","보라미에","동벨리나","포인세라","라오니엔","민드레아","금잔느","모크렌","목레아","복샤나",
 "살구엔","달무리아","반디루","라이라크","오미자니아","보리샤","유자샤","해바라니","라벤느","자두아",
 "타래안","카라멜리","아지랑","차부나니","인젤미","제시콧","복숭애","시나몽","다르미","팔레",
 "세냥","바그니","차잔느","수겐","오란데","마카렌","자몽드","모카벨","비닐라","새초미",
 "아리둥","몽그리","고구메","호테카","수세나","나파콧","봉수애","맨드라민","참웨라","물망쵸",
 "달고네","야콰","단쥬","주메니","비녜","노르게","바넬","실타렌","비자룬","누가렛",
 "양프네","데야","리보나","자게미","쿠레미","아프리마","레니콧","바라게","구세라","바울리",
 "고더기"];
function name(r,rarity){return r.pick(names);}
/* Where a name's portrait lives. Nothing per-NPC is stored, so a save carried forward cannot
   hold a portrait id that no longer addresses anything - a name resolves to its slot from its
   position in the pool; a name no longer in the pool (the Rare Reference customers, removed in
   v2.9.11, or a renamed customer) resolves to nothing and the scene draws its placeholder. */
const SLOTS=100,genderOf=i=>i<SLOTS?'M':i<2*SLOTS?'F':'X';
const portraits=new Map(names.map((n,i)=>[n,{gender:genderOf(i),slot:i<2*SLOTS?(i%SLOTS)+1:i-2*SLOTS+1}]));
const portraitOf=name=>portraits.get(name)||null;
/* META / NPC_TRAIT §JOB MASTERY (User 2026-10-22, v2.13.21). Mastery is bought with Store
   Capital, one account-wide rank 0..5 (D.masteryRanks), and applies to EVERY Job's new
   adventurers at creation. Two parts, both read from the rank's row:
   - stat: added to the Job's two main Base Stats (its two highest Growth values), once, at
     creation. Not a Growth multiplier - later level-ups are untouched.
   - level: one exclusive roll [p(+1), p(+2)] on top of the ordinary spawn Level. The roll is
     ALWAYS drawn, including at rank 0, so buying a rank cannot shift the seeded stream out
     from under a comparison.
   Beating Bosses no longer raises it; the Job x Boss matrix stays as the record the Franchise
   Grade reads. There is no hidden multiplier and no combat bonus anywhere. */
const mainStats=job=>job.growth.map((v,i)=>[v,i]).sort((p,q)=>q[0]-p[0]).slice(0,2).map(([,i])=>i).sort((x,y)=>x-y);
const masteryRow=account=>{const rank=account?G.Meta.masteryRank(account):0;return rank?D.masteryRanks[rank-1]:null;};
function masterySpawnBonus(r,account){
 const roll=r.next();
 const row=masteryRow(account)?.level||[];
 const p1=row[0]||0,p2=row[1]||0;
 if(roll<p2)return 2;
 if(roll<p2+p1)return 1;
 return 0;
}
function create(r,index,day,account,opts={}){
 /* META §wall — 명예 모험가 액자: the weights are the Decoration's own param, one owner. */
 const rarity=r.weighted([0,1,2,3,4],opts.royal?[40,36,17,6,1]:opts.premium?D.decorationParams.honorFrame.weights:D.decorationParams.honorFrame.baseWeights);
 const pool=D.jobs.filter(j=>G.Meta.jobUnlocked(account,j));const job=r.pick(pool);
 /* META §Exact spawn-Level model: the ordinary spawn Level, 1~2 + the Day term (User 2026-10-10: no min+2 newcomer) */
 const spawnLevel=Math.max(1,r.int(1,2)+(newcomerMinLevel(day)-1)+(opts.royal?3:0));
 const level=spawnLevel+masterySpawnBonus(r,account)+(opts.levelBonus||0);
 let n=name(r,rarity),traits=[],target=r.int(1,rarity>1?3:2);for(const t of r.shuffle(D.traits)){if(traits.length>=target)break;if(!D.traitExclusions.some(pair=>pair.includes(t.id)&&pair.some(id=>traits.includes(id))))traits.push(t.id);}
 /* NPC_TRAIT §NPC RARITY: growth potential 1 + 0.10 x Rarity + a 0~0.10 roll */
 let potential=1+rarity*.10+r.next()*.10,stats={};keys.forEach((k,i)=>stats[k]=Math.round(job.stats[i]+(level-1)*job.growth[i]*potential));
 /* META §JOB MASTERY: the bought stat lands on the two main Base Stats after rounding, as measured. */
 {const add=masteryRow(account)?.stat||0;if(add)for(const i of mainStats(job))stats[keys[i]]+=add;}
 return {id:'npc-'+index,name:n,appearance:r.int(1,2147483647),job:job.id,rarity,level,xp:0,potential,stats,traits,status:'건강',injury:0,recovery:0,fatigue:0,equipment:{name:'길드 지급 '+({warrior:'검',archer:'활',mage:'지팡이',priest:'성서',rogue:'단검',berserker:'도끼'}[job.id]),power:0,tier:0},loyalty:0,money:0,destination:null,claimedDestination:null,destinationFinal:true,history:[],records:[],visits:0,alive:true,pack:[],refused:[],introduced:false};
}
const growthCost=level=>18+level*9;
const newcomerMinLevel=day=>day<=4?1:1+Math.floor((day-1)*.4);
const CATCHUP_MULT=1.5,CATCHUP_GAP_SHARE=.25,CATCHUP_GAP_OUTCOMES=['퇴각','부상','중상'];
/* NPC_TRAIT §LAGGING ADVENTURER EXPERIENCE: preserve base EXP, cap only the extra bonus; a failed return takes the larger of ×1.5 and 25% of the gap. */
function catchupXP(n,xp,day,outcome){
 const floor=newcomerMinLevel(day);
 if(!n.alive||n.level>=floor||xp<=0)return xp;
 let needed=-n.xp;for(let level=n.level;level<floor;level++)needed+=growthCost(level);
 let bonus=Math.round(xp*(CATCHUP_MULT-1));
 if(CATCHUP_GAP_OUTCOMES.includes(outcome))bonus=Math.max(bonus,Math.round(needed*CATCHUP_GAP_SHARE));
 return xp+Math.min(Math.max(0,needed-xp),bonus);
}
function grow(n,xp,r){const old=n.level;n.xp+=xp;while(n.xp>=growthCost(n.level)){n.xp-=growthCost(n.level);n.level++;keys.forEach((k,i)=>n.stats[k]+=D.jobBy[n.job].growth[i]*n.potential);}
 /* NPC_TRAIT §LEVEL-UP REWARD: Job Growth × Potential only; no RNG draw. */
 const notes=[];if(n.level>old)notes.push('Lv.'+old+' → Lv.'+n.level);return notes;}
/* Trusted Regular / 단골. NPC_TRAIT owns this state, so the judgement lives here and
   nothing else re-states the threshold - a Boss that reads it (LUST) consumes the result
   rather than keeping a number of its own. */
const TRUSTED_REGULAR=51;
const isTrustedRegular=n=>!!n&&n.loyalty>=TRUSTED_REGULAR;
G.Adventurer={create,mainStats,masteryRow,masterySpawnBonus,name,names,portraitOf,grow,growthCost,newcomerMinLevel,catchupXP,CATCHUP_MULT,CATCHUP_GAP_SHARE,keys,isTrustedRegular,TRUSTED_REGULAR,
 /* SALE_v2.7 §NORMAL CONSUMER BAG and FINAL_EXPEDITION_v2.7: exactly two slots, for every NPC
    regardless of Level, Job, Rarity or Trait, and the Final uses the same two-slot handling.
    The Lv10+ third slot is gone - not disabled, not ghosted, not hidden. */
 slots:()=>2};
})(globalThis);
