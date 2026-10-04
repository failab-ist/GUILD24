// Save balance check — READ-ONLY dev tool, never part of npm test. User 2026-10-02: the User hands in saves and each one
// was being read by hand; this reads one save and writes the recurring checks as a Korean report. It plays nothing: every
// number is read off the save (reportHistory, npcs[].records, the current roster) or computed from it with the game's own
// formulas, so it is not a simulation (AGENTS §9-A). Its §2 reads the save on the same lines as the balance measurement
// (tools/measure-v2100.cjs, AGENTS §9-B): success by Day band, deaths, injured departures, the four highest Levels against the rest.
//   node tools/save-check.cjs <save.json> [--out report.md]
// Accepts the in-game `저장 내보내기` file, the raw localStorage value, or a Playwright storageState that holds it.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
for(const f of ['data/catalog','data/relics','data/decorations','data/copy','systems/rng','systems/adventurer','systems/dungeon','systems/meta','systems/save','systems/shop','systems/relics','systems/run'])
 require(path.join(root,'dist',f+'.js'));
const G=globalThis.GUILD24||globalThis,D=G.DATA;
const {BANDS,split}=require('./measure-v2100.cjs');

function readSave(file){
 const text=fs.readFileSync(file,'utf8');let raw=text;
 try{const o=JSON.parse(text);
  if(o&&Array.isArray(o.origins)){const hit=o.origins.flatMap(x=>x.localStorage||[]).find(x=>/^guild24\.save/.test(x.name));
   if(!hit)throw Error('storageState에 guild24 저장이 없습니다.');raw=hit.value;}}
 catch(e){if(/storageState/.test(e.message))throw e;}
 return G.Save.import(raw);
}

const pct=(x,dp=0)=>(x*100).toFixed(dp)+'%';
const sum=(a,f=x=>x)=>a.reduce((v,x)=>v+(f(x)||0),0);
const quant=(a,q)=>{if(!a.length)return null;const s=[...a].sort((x,y)=>x-y),i=(s.length-1)*q,lo=Math.floor(i);return s[lo]+(s[Math.ceil(i)]-s[lo])*(i-lo);};
// DUNGEON_HAZARD combat roll: score = ability x noise, noise uniform on 1 +- combatNoise. Assist and an Item's variance are
// not in the record, so the odds below are the plain roll.
const W=D.balance.combatNoise;
const winOdds=ratio=>Math.max(0,Math.min(1,.5-(1/ratio-1)/(2*W)));
// P(sum of k independent uniform 3..6 draws <= x) - the base visitor count before Store Support / Decoration extras
function lowTrafficOdds(days,x){let dist=new Map([[0,1]]);
 for(let i=0;i<days;i++){const nx=new Map();for(const [v,p] of dist)for(let c=3;c<=6;c++)nx.set(v+c,(nx.get(v+c)||0)+p/4);dist=nx;}
 let p=0;for(const [v,q] of dist)if(v<=x)p+=q;return p;}

// The lowest Level a newcomer can arrive at that Day - Adventurer.create itself with every roll at its low end (META §Exact
// spawn-Level model, a fresh account so no Mastery bonus). A reference line for how far a returning adventurer has fallen behind.
const LOW={next:()=>0,int:a=>a,pick:a=>a[0],weighted:a=>a[0],shuffle:a=>a.slice()},FRESH=G.Meta.fresh();
const newcomerMin=day=>G.Adventurer.create(LOW,0,day,FRESH).level;
function departLevel(rec){const m=(rec.changes||[]).map(c=>/^Lv\.(\d+) → Lv\.(\d+)$/.exec(c)).find(Boolean);return m?+m[1]:rec.level;}

// The game's own Morning weighting (shop.js visitor draw), drawn many times without replacement on a fixed seed.
function visitOdds(s,k){
 const pool=s.npcs.filter(n=>n.alive&&!n.recovery),fac=s.facilities||[],rng=new G.RNG('save-check'),hits=new Map(pool.map(n=>[n.id,0]));
 const weight=(n,sel,day)=>{const rest=pool.filter(x=>!sel.includes(x)),ex=rest.filter(x=>x.introduced),fr=rest.filter(x=>!x.introduced);
  const exSum=sum(ex,x=>1+x.loyalty*D.balance.loyaltyRevisit);
  const base=n.introduced?(day>20?.8:.62)*(1+n.loyalty*D.balance.loyaltyRevisit)/Math.max(1,exSum):(day>20?.2:.38)/Math.max(1,fr.length);
  return base*n.traits.reduce((a,t)=>a*(D.traitBy[t].effects.revisitMult||1),1)*(n.introduced&&fac.includes('member')?D.relicParams.member.revisitMult:1)
   *(G.Adventurer.isTrustedRegular(n)&&fac.includes('lifetime')?D.relicParams.lifetime.revisitMult:1);};
 const N=4000;
 for(let t=0;t<N;t++){const sel=[];for(let i=0;i<Math.min(k,pool.length);i++){const rest=pool.filter(x=>!sel.includes(x));sel.push(rng.weighted(rest,n=>weight(n,sel,s.day)));}
  for(const n of sel)hits.set(n.id,hits.get(n.id)+1);}
 return new Map([...hits].map(([id,h])=>[id,h/N]));
}

function report(save){
 const s=save.run;if(!s)throw Error('진행 중인 런이 없는 저장입니다.');
 const L=[],row=a=>L.push('| '+a.join(' | ')+' |'),head=a=>{row(a);row(a.map(()=>'---'));};
 const rel=id=>D.relicBy[id]?.name||id,item=id=>D.itemBy[id]?.name||id;
 const npcs=s.npcs,recs=npcs.flatMap(n=>(n.records||[]).map(r=>({...r,npc:n}))).sort((a,b)=>a.day-b.day);
 const hist=s.reportHistory||[];

 L.push('# 세이브 밸런스 점검 — '+s.branch+' · DAY '+s.day+' ('+s.phase+')','');
 L.push('빌드: '+(save.build?'v'+save.build.version+' · '+save.build.commit:'기록 없음 (빌드 정보가 들어가기 전의 세이브)'),'');
 L.push('도구: `tools/save-check.cjs` · 세이브만 읽는다(재생·시뮬 없음). 승률은 저장된 준비 마진에 일반 전투 흔들림(±'+pct(W,1)+')만 적용한 값이다(지원·상품 변동폭은 기록에 없어 빠진다).','');

 L.push('## 1. 개요','');
 head(['항목','값']);
 row(['자금',s.money+'G']);row(['점포지원',(s.facilities||[]).map(rel).join(', ')||'없음']);
 row(['생존 손님 / 전체',npcs.filter(n=>n.alive).length+' / '+npcs.length]);row(['사망',(s.stats?.deaths||0)+'명']);
 row(['단골(51+) 달성',(s.stats?.regulars||0)+'명']);row(['원정 기록',recs.length+'회']);
 L.push('');

 L.push('## 2. 밸런스 지표','');
 L.push('밸런스 측정(`tools/measure-v2100.cjs`, AGENTS §9-B)과 같은 기준으로 이 세이브 하나를 읽는다. 심층 원정과 DAY 30은 뺀다.','');
 const ord=recs.filter(r=>!r.deep&&r.day<30),ok=r=>r.outcome==='성공'||r.outcome==='대성공',rate=l=>l.length?pct(l.filter(ok).length/l.length)+' ('+l.length+'회)':'-';
 const inj=ord.filter(r=>r.departedInjured),grp=split(npcs,ok),g=x=>(x[1]?pct(x[0]/x[1]):'-')+' ('+x[1]+'회) · 사망 '+x[2]+'명';
 const late=ord.filter(r=>r.day>=20);
 head(['항목','값']);
 row(['구간별 원정 성공률',BANDS.map(([a,b])=>'D'+a+'~'+b+' '+rate(ord.filter(r=>r.day>=a&&r.day<=b))).join(' · ')]);
 row(['사망 / 지금 사망 한도',(s.stats?.deaths||0)+' / '+G.Meta.deathLimit(s)+'명 (DAY 10까지 '+ord.filter(r=>r.day<=10&&r.outcome==='사망').length+'명)']);
 row(['부상 출발',inj.length+'회 · 그중 사망 '+inj.filter(r=>r.outcome==='사망').length+'회']);
 row(['상위 4명(레벨) 성공',g(grp.top)]);row(['나머지 성공',g(grp.rest)]);
 row(['DAY 20부터 성공률',late.length?rate(late)+(s.day>=25&&late.filter(ok).length/late.length<.35?' — 좀비 기준(35%) 아래':''):'아직 없음']);
 row(['현금 / 일',hist.length?Math.round((hist.at(-1).balance-700)/hist.length)+'G':'-']);
 L.push('');

 L.push('## 3. 현금 흐름','');
 const k=key=>sum(hist,d=>d[key]);
 head(['매출','유물 추가 지급','발주','운영비','후보 교환','점포지원','폐기 원가','할인액','바가지 초과분','대성공 수입','기타 수입']);
 row([k('revenue'),k('commission'),k('spent'),k('operating'),k('rerollSpent'),k('relicSpent'),k('wasteCost'),k('discount'),k('overcharge'),k('greatSuccess'),k('subsidy')+k('liquidation')].map(v=>v+'G'));
 L.push('');head(['DAY','매출','발주','운영비','교환','지원','할인','판매 수','잔액']);
 for(const d of hist)row([d.day,d.revenue||0,d.spent||0,d.operating||0,d.rerollSpent||0,d.relicSpent||0,d.discount||0,d.sales||0,d.balance]);
 L.push('');

 L.push('## 4. 손님 흐름','');
 const byDay=new Map();for(const r of recs)if(!r.deep)byDay.set(r.day,(byDay.get(r.day)||0)+1);
 const days=hist.map(d=>d.day),seen=sum(days,d=>byDay.get(d)||0);
 if(days.length){L.push('마감한 '+days.length+'일 동안 원정 출발 '+seen+'명, 하루 평균 '+(seen/days.length).toFixed(2)+'명 (기본 방문 3~6명, 평균 4.5명).');
  L.push('기본 방문 수만으로 '+days.length+'일 합계가 '+seen+'명 이하일 확률: **'+pct(lowTrafficOdds(days.length,seen),1)+'** (점포지원·장식의 추가 방문은 빼고 본 값이라, 그런 지원이 있으면 실제보다 높게 나온다).','');}
 head(['DAY',...days]);row(['출발',...days.map(d=>byDay.get(d)||0)]);L.push('');

 L.push('## 5. 원정 기록 (준비 대 게이트)','');
 L.push('준비/요구 = 출발 시 준비 전력 ÷ 게이트 요구 전력. `승리 불가`는 최고 흔들림('+(1+W).toFixed(3)+'배)으로도 못 미치는 원정이다.','');
 head(['DAY','손님','출발 Lv','신규 최저 Lv','게이트','상품','결과','준비/요구','전투 승률','판정']);
 let impossible=0,belowFloor=0;
 for(const r of recs){const ratio=1+(r.greatMargin??0),odds=winOdds(ratio),lv=departLevel(r),fl=newcomerMin(r.day);
  const tag=ratio*(1+W)<1?'승리 불가':ratio*(1-W)>=1?'확정 승리':'';if(tag==='승리 불가')impossible++;if(lv<fl)belowFloor++;
  row([r.day,r.name,lv,lv<fl?fl+' ▲':fl,r.dungeonName+(r.deep?' (심층)':''),(r.items||[]).map(item).join(' + ')||'-',r.outcome,ratio.toFixed(2),pct(odds),tag]);}
 L.push('','승리 불가 원정 **'+impossible+'회** / '+recs.length+'회 · 신규 손님 최저 레벨보다 낮게 출발 **'+belowFloor+'회** (▲).','');

 L.push('## 6. 손님 상태 · 성장 · 방문','');
 const floorNow=newcomerMin(s.day),k2=Math.max(1,Math.round(s.expectedVisitors||4.5)),odds=visitOdds(s,k2);
 const alive=npcs.filter(n=>n.alive&&n.introduced),lv=alive.map(n=>n.level);
 L.push('오늘(DAY '+s.day+') 신규 손님 최저 레벨 **Lv'+floorNow+'** (그날 새 손님이 올 수 있는 가장 낮은 레벨, 참고선). 소개된 생존 손님 레벨: 최저 '+Math.min(...lv)+' · 하위 25% '+quant(lv,.25)?.toFixed(1)+' · 중앙 '+quant(lv,.5)?.toFixed(1)+' · 최고 '+Math.max(...lv)+'.');
 L.push('방문 확률은 오늘 손님 '+k2+'명을 뽑는다고 보고 게임의 가중치(단골도·특성·점포지원)로 4000번 뽑은 값이다.','');
 head(['손님','직업','희귀도','Lv','신규 최저 대비','단골도','지갑','방문일','최대 공백','상태','오늘 방문 확률']);
 for(const n of npcs.filter(x=>x.introduced)){const dd=[...new Set((n.records||[]).map(r=>r.day))].sort((a,b)=>a-b);
  const gaps=dd.slice(1).map((d,i)=>d-dd[i]),gap=Math.max(0,...gaps,n.alive&&dd.length?s.day-dd.at(-1):0);
  const st=!n.alive?'사망':n.recovery?'회복 '+n.recovery+'일':n.injury===2?'중상':n.injury===1?'부상':'건강';
  row([n.name,D.jobBy[n.job]?.name||n.job,D.npcRarities[n.rarity]||n.rarity,n.level,n.alive?(n.level-floorNow>=0?'+':'')+(n.level-floorNow):'-',n.loyalty,n.money+'G',dd.join(',')||'-',gap+'일',st,odds.has(n.id)?pct(odds.get(n.id)):'-']);}
 L.push('');

 L.push('## 7. 판매 가격','');
 const sold=sum(hist,d=>d.sales),disc=k('discount'),over=k('overcharge');
 L.push('판매 '+sold+'개 · 할인액 '+disc+'G · 정가 초과 수입 '+over+'G. 할인이 투자였는지 지갑 부족이었는지는 판매 순간의 지갑이 기록에 없어 이 도구로는 가리지 않는다.','');
 return L.join('\n');
}

if(require.main===module){
 const args=process.argv.slice(2),file=args.find(a=>!a.startsWith('--')&&args[args.indexOf(a)-1]!=='--out'),out=args.includes('--out')?args[args.indexOf('--out')+1]:null;
 if(!file){console.error('사용법: node tools/save-check.cjs <save.json> [--out report.md]');process.exit(2);}
 const md=report(readSave(file));
 if(out){fs.writeFileSync(out,md+'\n');console.log('작성: '+out);}else console.log(md);
}
module.exports={readSave,report};
