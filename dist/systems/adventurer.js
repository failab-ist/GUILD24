(function(G){
const D=G.DATA,keys=['combat','survival','mobility','spirit'];
const names=["도하르", "세아린", "라윤", "연화린", "태무르", "서유렌", "민재온", "아란", "로한", "유란", "이솔", "가온", "나린", "라온", "다온", "루아", "세린", "하린", "아린", "소란", "서린", "유하", "온유", "미루", "라미르", "세온", "도란", "하온", "렌하", "아루", "네린", "카단", "레아", "시온", "리안", "노아", "에단", "테오", "로엔", "에린", "마린", "사야", "나엘", "루엔", "아델", "카린", "루카", "세라", "티아", "리오", "로아", "제나", "베른", "키란", "타란", "시란", "라헬", "아벨", "오린", "이렌", "루델", "바론", "아몬", "카엘", "레온", "제온", "디온", "아론", "노엘", "샤린", "카야", "미아", "리엘", "바엘", "제르", "카르", "노르", "루벤", "에르단", "라단", "세단", "아셀", "테린", "렌도", "카도", "벨라", "샤론", "오르난", "헤린", "메란", "바린", "누리", "다린", "비안", "소마", "유안", "재온", "하람", "이룬", "에반", "라빈", "사린", "레빈", "테란", "류안", "도린", "메이란", "여울", "소하", "은하란", "서란", "모란", "아율", "리하", "벨렌", "네온", "시아란", "루산", "카산", "아건", "제린", "파란", "로단", "케른", "베라", "타린", "리나", "소렌", "하젤", "엘다", "미렌", "레이라", "아스란", "베르나", "카르만", "루시아", "셀마", "오르카", "데란", "로잔", "네이란", "타미르", "수란", "카이렌", "제이란", "리산", "마르단", "네이라", "티란", "사비르", "유렌", "하란"];
function name(r,rarity){return r.pick(names);}
function create(r,index,day,account,opts={}){
 const rarity=r.weighted([0,1,2,3,4],opts.royal?[40,36,17,6,1]:opts.premium?[51,30,14,4,1]:[60,27,10,2.5,.5]);
 const pool=D.jobs.filter(j=>!j.unlock||account.unlocked.includes(j.unlock));const job=r.pick(pool);
 const level=Math.max(1,r.int(1,3)+Math.floor((day-1)*.25)+(opts.royal?3:0));
 let n=name(r,rarity),traits=[],target=r.int(1,rarity>1?3:2);for(const t of r.shuffle(D.traits)){if(traits.length>=target)break;if(!D.traitExclusions.some(pair=>pair.includes(t.id)&&pair.some(id=>traits.includes(id))))traits.push(t.id);}
 let potential=1+rarity*.06+r.next()*.10,stats={};keys.forEach((k,i)=>stats[k]=Math.round(job.stats[i]+(level-1)*job.growth[i]*potential));
 return {id:'npc-'+index,name:n,appearance:r.int(1,2147483647),job:job.id,rarity,level,xp:0,potential,stats,traits,traitSlots:rarity>=2?4:3,status:'건강',injury:0,recovery:0,fatigue:0,equipment:{name:'길드 지급 '+({warrior:'검',archer:'활',mage:'지팡이',priest:'성서',rogue:'단검',berserker:'도끼'}[job.id]),power:0,tier:0},loyalty:0,money:0,destination:null,claimedDestination:null,destinationFinal:true,history:[],records:[],visits:0,alive:true,pack:[],refused:[],rank:Math.floor(level/5),introduced:false};
}
function grow(n,xp,r){const old=n.level;n.xp+=xp;while(n.xp>=18+n.level*7){n.xp-=18+n.level*7;n.level++;keys.forEach((k,i)=>n.stats[k]+=D.jobBy[n.job].growth[i]*n.potential);}
 const notes=[];if(n.level>old){notes.push('Lv.'+old+' → Lv.'+n.level);for(let milestone=Math.floor(old/5)+1;milestone<=Math.floor(n.level/5);milestone++){if(n.traits.length<Math.min(4,n.traitSlots)&&r.next()<.65){let t=r.pick(D.traits.filter(t=>!n.traits.includes(t.id)&&!D.traitExclusions.some(pair=>pair.includes(t.id)&&pair.some(id=>n.traits.includes(id)))));n.traits.push(t.id);notes.push('새 특성 「'+t.name+'」');}n.rank=Math.min(3,Math.floor(n.level/5));if(milestone<=3)notes.push(D.jobBy[n.job].ranks[Math.min(3,milestone)]+' 승급');}}return notes;}
G.Adventurer={create,name,grow,keys,rank:n=>D.jobBy[n.job].ranks[Math.min(3,Math.floor(n.level/5))],slots:n=>n.level>=10?3:2};
})(globalThis);
