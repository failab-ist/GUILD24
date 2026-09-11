(function(G){
const D=G.DATA,keys=['combat','survival','mobility','spirit'];
// COPY_WORLD_VOICE 15: 한국어 어감 + 판타지 변형 + 가끔 자연스러운 말장난.
// Tone anchors: 요화니우스 / 지오니아 / 민자이 / 고쉬스앵.
// 서양 High-Fantasy 이름은 존재하되 normal pool의 주류가 되지 않는다.
const names=["요화니우스","상혀크","진호르","지오니아","민자이","고쉬스앵","윤화니우스","최고쉬스","남궁비앙","황보루엔","선우하르","제갈나린","강철민우스","나선우스","마루하스","배달로스","서라벌린","소나기르","오미자니아","이슬비앙","진달레아","초롱하스","해오라스","김보리스","박하연우스","백두란","양파니아","여명하르","오두막스","유자차니","은하수린","두루미르","보름달스","사또린","놀부니아","대장금스","광개토린","검단우스","하리수스","카라멜리","타래안","파도린","자유린","라온하제","떡보리스","국밥니아","순두부린","미역국르","도라온","아라찬","장터린","하늘가온","한도림","문서린","서동해","손사린","신월하","안개비","우렁찬","윤슬비","임도담","정한별","조약린","차오름","가온누리","나래찬","다솜비","마음이르","바람개","사라랑","아지랑","차분하니","밤톨란","솔개비","아리아랑","새벽별","노을진","달무리","별똥별","서리꽃","이슬한","구름하리","미르안","세하린","아루한","은결비","이든하","재하린","태오르","하람비","현우스","루엔하르","베른하르트","레오니아","카시엘","아델린","세라피나","로엔그린","이졸데","가웨인"];
function name(r,rarity){return r.pick(names);}
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
G.Adventurer={create,name,grow,keys,isTrustedRegular,TRUSTED_REGULAR,rank:n=>D.jobBy[n.job].ranks[Math.min(3,Math.floor(n.level/5))],slots:n=>n.level>=10?3:2};
})(globalThis);
