(function(G){
/* COPY_WORLD_VOICE §11 — NPC DIALOGUE & RESULT VARIATION.

   반복되는 상황에서 같은 한 줄만 나오지 않게 하는 Variant Pool이다. 대상은 §11이 정한
   두 가지뿐 — NPC가 말하는 반복 Dialogue와 NPC에게 일어나는 반복 상황 Result.
   DATA / FUNCTION / Button / Tutorial 핵심 설명 / 능력치명 / Item·Relic 고유 Flavor는
   여기서 다루지 않는다.

   선택은 난수가 아니다. `pick`은 이미 저장되는 상태(NPC id, DAY, 방문 횟수)만으로
   결정되므로 같은 Seed는 같은 문장을 내고, 저장했다 불러와도 문장이 바뀌지 않으며,
   게임의 RNG를 한 번도 소모하지 않는다. Balance와 재현성 계약이 그대로 유지된다. */

const fnv=s=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;};
const pick=(pool,key)=>pool&&pool.length?pool[fnv(key)%pool.length]:'';

/* §11.1 일반 방문. 관찰·상황·반응이 서로 다른 문장만 넣는다. 동의어 교체는 Variant가 아니다. */
const visit={
 first:['“여기가 길드24인가요?”','“문 연 지 얼마 안 됐다면서요.”','“게이트 앞에 가게가 있다길래.”','“들어와도 되죠? 잠깐 볼게요.”'],
 back:['“다시 왔어요.”','“오늘도 열었네요.”','“오는 길에 불 켜진 게 여기뿐이더라고요.”','“빈손으로 가긴 좀 그래서요.”'],
 hurt:['“아직 조금 욱신거리네요.”','“괜찮아요. 걷는 데는 지장 없어요.”','“이 정도면 나간 편이죠.”','“오늘은 무리 안 할 거예요.”'],
 regular:['“늘 보던 얼굴이네요.”','“말 안 해도 아시죠?”','“자리 그대로네요, 다행이다.”','“오늘도 부탁 좀 할게요.”','“늘 먹던 걸로 주세요.”'],
 /* §12 Callback — 실제로 남아 있는 History만 쓴다. 없는 과거를 만들지 않는다. */
 helped:['“지난번에 챙긴 거, 도움이 됐어요.”','“저번 거 쓰고 나서 생각이 좀 바뀌었어요.”','“그때 산 거, 값은 했습니다.”'],
 /* Trait 기반. Canonical의 절약 성향 / 겁 많은 성향 예시를 따른다. */
 trait:{
  frugal:['“더 싼 건 없어요?”','“이거 행사 안 해요?”','“지난번엔 이것보다 쌌는데.”','“오늘은 싼 걸로 주세요.”'],
  thrifty:['“그램당으로 치면 이게 낫죠?”','“싼 거 말고, 값하는 걸로요.”','“이거 하나면 오늘은 되겠네요.”'],
  coward:['“귀환석 있습니까?”','“이쪽, 위험한 데 맞죠?”','“살아서 오면 또 들를게요.”','“가까운 게이트는 없어요?”'],
  showoff:['“오늘은 좀 깊게 들어가 볼까 해서요.”','“제가 그쪽은 좀 압니다.”','“어려운 데로 간다고 다들 말리던데요.”'],
  eater:['“많이 든 걸로 주세요.”','“이거 하나로 하루 되나요?”','“먹을 게 제일 급해요.”'],
  greed:['“비싼 게 좋은 거 아닌가요?”','“이왕이면 좋은 걸로 봅시다.”','“돈은 나중에 벌면 되죠.”'],
  shy:['“…저, 이거 얼마예요?”','“구경만 해도 되나요?”','“아, 아니에요. 천천히 볼게요.”'],
  social:['“사장님, 요즘 어떠세요?”','“앞에서 다들 여기 얘기하던데요.”','“오늘 누구 왔다 갔어요?”'],
  collector:['“새로 들어온 거 있어요?”','“이런 건 잘 안 보이던데요.”','“종류별로 하나씩은 있어야 하는데.”'],
  aloof:['“필요한 것만 볼게요.”','“설명은 됐어요.”','“빨리 가야 해서요.”']}};

/* §11.1 구매 / 거절 / 가격 반응. */
const sale={
 full:['“이걸로 주세요.”','“네, 담아 주세요.”','“이 정도면 적당하네요.”','“그럼 하나만.”'],
 half:['“다녀와서 또 들를게요.”','“이 가격이면 안 살 이유가 없죠.”','“사장님 손해 아니에요?”','“오늘은 운이 좋네요.”'],
 overcharge:['“가격이 좀 올랐네요.”','“…뭐, 급하니까요.”','“이번만입니다.”','“원래 이 값이었나요?”'],
 refuse:{
  price:['“그 가격에는 못 사겠어요.”','“그건 좀 부담스럽네요.”','“다음에 여유 있을 때 살게요.”','“조금만 더 싸면 좋을 텐데.”'],
  need:['“그건 오늘 필요 없어요.”','“오늘 가는 데선 쓸 일이 없어서요.”','“그건 딱히 안 급해요.”','“그건 다음에 볼게요.”'],
  choice:['“이번엔 안 살게요.”','“조금 더 생각해 볼게요.”','“오늘은 여기까지 할게요.”','“음… 아니요, 괜찮아요.”']}};

/* §11.2 반복되는 중요한 NPC Result.
   사망은 DATA로 명확히 전달되고, 여기 Flavor는 별도다. 사망 Pool에는 살아 있는 사람의
   대사를 넣지 않는다. 영수증 문장은 실제 거래 History가 있을 때만 쓴다(§12). */
const night={
 deathTraded:['마지막 영수증만 카운터에 남았다.','여기서 산 것들은 끝내 다 쓰이지 못했다.','거래는 이미 다 끝나 있었다.'],
 deathKnown:['수첩에 남은 건 지난 원정 기록뿐이다.','다음 줄은 비어 있다.','이름 옆에 아무것도 적히지 않았다.'],
 deathStranger:['문을 열고 들어온 그날이 마지막이었다.','오늘은 돌아오지 않았다.','한 번 왔다 간 손님으로 남았다.'],
 avoided:['“사장님, 이거 없었으면 못 돌아왔어요.”','“오늘은 진짜 아슬아슬했어요.”','“그거 사길 잘했다는 생각만 했어요.”'],
 rescued:['“챙겨 간 보급이 귀환을 도왔어요.”','“가방에 있던 게 마지막에 일했어요.”','“돌아오는 길은 사장님이 열어 준 셈이에요.”'],
 severe:['“며칠만 쉬고 올게요. 제 자리 남겨 둬요.”','“당분간은 못 나갈 것 같아요.”','“다음에 올 때는 멀쩡한 얼굴로 올게요.”'],
 hurt:['“좀 다쳤지만, 살아 돌아왔어요.”','“이 정도는 다친 축에도 안 들어요.”','“내일은 좀 쉬엄쉬엄 갈게요.”','“생각보다 안쪽이 사납더라고요.”'],
 retreat:['“일단 살고 봐야죠. 내일 다시 올게요.”','“오늘은 아니다 싶어서 돌아섰어요.”','“무리했으면 큰일 날 뻔했어요.”','“길만 보고 왔습니다.”'],
 grew:['“조금은 익숙해진 것 같아요.”','“지난번보다 손에 붙네요.”','“이제 어디를 봐야 할지 알겠어요.”'],
 supplied:['“다녀왔습니다.”','“오늘은 별일 없었어요.”','“챙겨 간 건 잘 썼습니다.”'],
 shaken:['“예상하지 못한 일이 있었어요. 잠깐 쉬어야겠어요.”','“오늘은 운이 안 따랐네요.”','“가는 길이 생각보다 사나웠어요.”'],
 plain:['“오늘도 무사히요.”','“내일도 열죠?”','“별일 없었습니다.”']};

/* 선택 키는 전부 저장되는 상태에서만 만든다 — 그래야 불러오기가 문장을 바꾸지 않는다. */
const key=(n,tag,day)=>n.id+':'+tag+':'+day;

const Copy={
 pick,pools:{visit,sale,night},
 /* 카운터에 도착한 손님의 한마디. Callback > Trait > 상태 > 일반 순으로 고른다. */
 arrive(n,day,hasCallback){
  if(hasCallback)return pick(visit.helped,key(n,'callback',day));
  for(const id of n.traits||[]){const pool=visit.trait[id];
   if(pool&&fnv(key(n,'traitgate',day))%3===0)return pick(pool,key(n,'trait'+id,day));}
  if(n.newToday)return pick(visit.first,key(n,'first',day));
  if(n.injury)return pick(visit.hurt,key(n,'hurt',day));
  if(n.loyalty>=60)return pick(visit.regular,key(n,'regular',day));
  return pick(visit.back,key(n,'back',day));
 },
 buy(n,itemId,mode,day){return pick(sale[mode]||sale.full,key(n,'buy'+itemId+mode,day));},
 refuse(n,itemId,reason,day){return pick(sale.refuse[reason]||sale.refuse.choice,key(n,'no'+itemId+reason,day));},
 /* 밤의 한 줄. 상태 선택 순서는 기존 결과 판정과 같고, 문장만 Pool에서 고른다. */
 night(report,n){
  const k=key(n,'night',report.day);
  if(report.outcome==='사망')
   return pick(n.history.length?night.deathTraded:n.records.length>1?night.deathKnown:night.deathStranger,k);
  if(report.avoidedDeath)return pick(night.avoided,k);
  if(report.rescued)return pick(night.rescued,k);
  if(report.outcome==='중상')return pick(night.severe,k);
  if(report.outcome==='부상')return pick(night.hurt,k);
  if((report.changes||[]).length)return pick(night.grew,k);
  if((report.items||[]).length)return pick(night.supplied,k);
  if(report.environmentHurt)return pick(night.shaken,k);
  if(report.outcome==='퇴각')return pick(night.retreat,k);
  return pick(night.plain,k);
 },
 /* 사망 Pool과 생존 Pool은 절대 겹치지 않는다. 테스트가 이 경계를 고정한다. */
 deathPool(){return [...night.deathTraded,...night.deathKnown,...night.deathStranger];},
 livingPool(){return [...night.avoided,...night.rescued,...night.severe,...night.hurt,
  ...night.retreat,...night.grew,...night.supplied,...night.shaken,...night.plain];}
};

/* COPY_WORLD_VOICE 18.5 - BOSS REVEAL. Verbatim from the spec: D5 gives identity and a
   Flavor line that may hint at the Trait but never states it, D15 gives the exact
   Function, D30 gives the Family facts and nothing else. No strategy advice is appended
   anywhere - the information itself is the decision material. GLUTTONY's rarity boundary
   is a DATA slot, not prose, and stays empty until PASS3 approves it. */
Copy.boss={
 d5:{header:'길드 토벌 공고',sub:'이번 토벌 대상',button:'토벌 대상 확인',
  flavor:{
   WRATH:'공성추도 없이 성문이 안쪽으로 무너졌다.',
   PRIDE:'검은 갑주에는 아직 흠집 하나 남지 않았다.',
   ENVY:'승전 보고서마다 가장 빛나던 이름 하나가 붉게 지워져 있었다.',
   GREED:'금고가 빈 마을일수록, 놈의 군세는 이상할 만큼 강했다.',
   GLUTTONY:'최정예 토벌대의 보급품만 유난히 처참한 꼴로 발견됐다.',
   LUST:'오래 손발을 맞춘 자들만 서로의 이름을 잊지 않았다고 한다.',
   SLOTH:'놈은 움직이지 않았다. 몸을 얽은 봉인만이 낮게 울리고 있었다.'}},
 d15:{intro:'길드 정보원이 추가 정보를 확보했다.',button:'정보 확인',
  trait:{
   WRATH:['특수 효과 없음',['별도의 변칙은 확인되지 않았다.','래스는 순수한 전력으로 맞선다.']],
   PRIDE:['오만의 갑주',['최종전에서 모든 출전자의 투력이 감소한다.','강인함·기동·정신은 그대로 적용된다.']],
   ENVY:['질투의 시선',['최종전에서 가장 크게 기여하는 모험가 한 명이 표적이 된다.','표적의 투력·강인함·기동·정신은 최종전 동안 감소한다.']],
   GREED:['탐욕의 장부',['최종전까지 누적 총매출이 목표에 미달하면, 부족한 만큼 그리드가 강해진다.','강화에는 한도가 있으며, 목표를 넘겨도 추가 이득은 없다.']],
   GLUTTONY:['폭식의 권능',['최종전에서 [등급] 이상 보급품의 능력치 증가 효과가 감소한다.','대응·보급·보험·기타 특수 효과는 그대로 적용된다.']],
   LUST:['매혹의 권능',['단골이 아닌 출전자는 최종전에서 투력·강인함·기동·정신이 모두 감소한다.','단골은 영향을 받지 않는다.']],
   SLOTH:['나태의 봉인',['슬로스에게는 세 개의 봉인이 남아 있다.','15일·20일·25일 중 두 차례와 30일에, 유물을 받는 대신 봉인 하나를 풀 수 있다.','봉인을 풀면 그때의 유물은 받을 수 없으며, 풀린 봉인이 많을수록 슬로스가 약해진다.']]}},
 d30:{header:'최종 정찰 보고',intro:'마왕군의 최종 전장이 확인됐다.',button:'최종 준비'}
};

G.Copy=Copy;
})(globalThis);
