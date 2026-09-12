(function(G){
const D=G.DATA,keys=['combat','survival','mobility','spirit'];
// COPY_WORLD_VOICE 15: 한국어 어감 + 판타지 변형 + 가끔 자연스러운 말장난.
// Tone anchors: 지오니아 / 민자이 / 고쉬스앵.
// 서양 High-Fantasy 이름은 존재하되 normal pool의 주류가 되지 않는다.
/* The shipped pool IS the production name pool, kept in that pool's own binding order:
   names[0..99] are NORMAL/M/001..100 and names[100..199] are NORMAL/F/001..100. A name is
   therefore its own portrait address and no second catalogue exists to drift from it.
   The three Easter identities are random_eligible:false and are absent from this pool.
   Derived from GUILD24_NPC_PRODUCTION/00_NAME_POOL/PRODUCTION_NAME_POOL.json and re-checked
   against that file by tests/npc-assets.cjs - never maintained by hand. */
const names=[
 "민자이","고쉬스앵","마루진","한도람","태오람","도하르","산도르","장보르","박하르","오름찬",
 "로엔담","베르한","파크지송","봉쥬노","지드라고니아","유제삭","모다크","장마르","우바크","세베크",
 "자가르","파도르","홍차드","도라지오","보리안","차우엔","리븐헌","이유넬","최연센","이제도르",
 "이그라수","원비노","정우센","마돈세크","조세로","박테민","도토릭","구마유샤","미수가르","솔바울",
 "달마지오","참세르","민들로","담비르","호두안","밤톨란","두루미르","송로안","감초르","대쥬안",
 "데프틴","쇼메르","카니온","피네트","벤기르","마티아","오네르","스메브","리헨스","바이페르",
 "오두막스","누룬지오","된자르","생가르","참케르","대쥬르","고드렐","버드나르","태베크","설라크",
 "다시마로","옥수렌","감자크","앵두르","가마솔","룰레인","스코렌","프레이든","택욘","문호젠",
 "솔키르","제스틴","로구엔","트래븐","도란테","나루베","산드람","메아룬","쵸베른","골모크",
 "장도크","메도르","그루멜","베루안","부엔기","갈데오","주렌타","바소트","모시락","도르레오",
 "지오니아","나린솔","다래온","소담린","가람비","모아린","새온비","여울라","은결비","초롱하",
 "아라온","세아린","보름하","나래온","미르아","다온설","서리안","카르미나","진달레아","수지엘",
 "카리냐","개나리아","메이실","모레아","김고웬","킴연느","전지엔","송헤이오","소네진","킴타리",
 "박시네아","배두니아","하지웬","정유메","박은비나","민드레아","금잔느","모크렌","목레아","복샤나",
 "살구엔","달무리아","반디루","라이라크","오미자니아","보리샤","유자샤","해바라니","라벤느","자두아",
 "타래안","카라멜리","아지랑","차부나니","인젤미","제시콧","복숭애","시나몽","다르미","팔레",
 "세냥","바그니","차잔느","수겐","오란데","마카렌","자몽드","모카벨","비닐라","새초미",
 "아리둥","몽그리","고구메","호테카","수세나","나파콧","봉수애","맨드라민","참웨라","물망쵸",
 "달고네","야콰","단쥬","주메니","비녜","노르게","바넬","실타렌","비자룬","누가렛",
 "양프네","데야","리보나","자게미","쿠레미","아프리마","레니콧","바라게","구세라","바울리"];
function name(r,rarity){return r.pick(names);}
/* Where a name's portrait lives, from its position in the pool. Nothing per-NPC is stored,
   so a save carried forward cannot hold a portrait id that no longer addresses anything. */
const SLOTS=100,portraits=new Map(names.map((n,i)=>[n,{gender:i<SLOTS?'M':'F',slot:(i%SLOTS)+1}]));
const portraitOf=name=>portraits.get(name)||null;
function create(r,index,day,account,opts={}){
 const rarity=r.weighted([0,1,2,3,4],opts.royal?[40,36,17,6,1]:opts.premium?[51,30,14,4,1]:[60,27,10,2.5,.5]);
 const pool=D.jobs.filter(j=>G.Meta.jobUnlocked(account,j));const job=r.pick(pool);
 const level=Math.max(1,r.int(1,3)+Math.floor((day-1)*.25)+(opts.royal?3:0));
 let n=name(r,rarity),traits=[],target=r.int(1,rarity>1?3:2);for(const t of r.shuffle(D.traits)){if(traits.length>=target)break;if(!D.traitExclusions.some(pair=>pair.includes(t.id)&&pair.some(id=>traits.includes(id))))traits.push(t.id);}
 let potential=1+rarity*.06+r.next()*.10,stats={};keys.forEach((k,i)=>stats[k]=Math.round(job.stats[i]+(level-1)*job.growth[i]*potential));
 return {id:'npc-'+index,name:n,appearance:r.int(1,2147483647),job:job.id,rarity,level,xp:0,potential,stats,traits,traitSlots:rarity>=2?4:3,status:'건강',injury:0,recovery:0,fatigue:0,equipment:{name:'길드 지급 '+({warrior:'검',archer:'활',mage:'지팡이',priest:'성서',rogue:'단검',berserker:'도끼'}[job.id]),power:0,tier:0},loyalty:0,money:0,destination:null,claimedDestination:null,destinationFinal:true,history:[],records:[],visits:0,alive:true,pack:[],refused:[],rank:Math.floor(level/5),introduced:false};
}
function grow(n,xp,r){const old=n.level;n.xp+=xp;while(n.xp>=18+n.level*7){n.xp-=18+n.level*7;n.level++;keys.forEach((k,i)=>n.stats[k]+=D.jobBy[n.job].growth[i]*n.potential);}
 const notes=[];if(n.level>old){notes.push('Lv.'+old+' → Lv.'+n.level);for(let milestone=Math.floor(old/5)+1;milestone<=Math.floor(n.level/5);milestone++){if(n.traits.length<Math.min(4,n.traitSlots)&&r.next()<.65){let t=r.pick(D.traits.filter(t=>!n.traits.includes(t.id)&&!D.traitExclusions.some(pair=>pair.includes(t.id)&&pair.some(id=>n.traits.includes(id)))));n.traits.push(t.id);notes.push('새 특성 「'+t.name+'」');}n.rank=Math.min(3,Math.floor(n.level/5));if(milestone<=3)notes.push(D.jobBy[n.job].ranks[Math.min(3,milestone)]+' 승급');}}return notes;}
/* Trusted Regular / 단골. NPC_TRAIT owns this state, so the judgement lives here and
   nothing else re-states the threshold - a Boss that reads it (LUST) consumes the result
   rather than keeping a number of its own. */
const TRUSTED_REGULAR=51;
const isTrustedRegular=n=>!!n&&n.loyalty>=TRUSTED_REGULAR;
G.Adventurer={create,name,names,portraitOf,grow,keys,isTrustedRegular,TRUSTED_REGULAR,rank:n=>D.jobBy[n.job].ranks[Math.min(3,Math.floor(n.level/5))],slots:n=>n.level>=10?3:2};
})(globalThis);
