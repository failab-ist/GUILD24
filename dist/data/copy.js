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
/* `exclude`, when given, is a Set of line TEXTS this pick must avoid where possible - falling
   back to the unfiltered pool only when every candidate is excluded, so a small pool never
   throws. Still a pure function of its inputs: no RNG, no hidden state. */
const pick=(pool,key,exclude)=>{
 if(!pool||!pool.length)return '';
 if(exclude&&exclude.size){
  const eligible=pool.filter(l=>!exclude.has(l));
  if(eligible.length)return eligible[fnv(key)%eligible.length];
 }
 return pool[fnv(key)%pool.length];
};
/* COPY_WORLD_VOICE_v2.8 §DIALOGUE EXPOSURE / RECENT REPEAT. Two trackers, both plain saved
   state on `run`/`n` - never Gameplay RNG:
   - `run.recentLines[surface]` holds the last (up to 3) lines actually shown on that Surface,
     across every NPC, so the same exact line does not repeat within 3 visible beats there.
   - `n.lastLine[surface]` holds this NPC's own immediately previous line on that Surface.
     Every line is unique across every Pool (§11.1/§11.2), so "the same NPC may not repeat its
     previous line from the same Pool" reduces to "may not repeat that exact text".
   Both are read-only inputs here; `run` is an OPTIONAL trailing argument on every exported
   picker below. Omitting it (every direct pool/unit-test call in this repo) skips tracking
   entirely and falls back to the plain deterministic hash pick this file always had - so nothing
   here can move a line an existing caller already depends on being pure/stateless. Only the
   real Run call sites (systems/shop.js, systems/dungeon.js) pass `run`, and each of those
   fires exactly once per real visible beat, so the write below never doubles up. */
const exclusionFor=(run,n,surface)=>{
 if(!run)return null;
 const ex=new Set(run.recentLines?.[surface]||[]);
 if(n?.lastLine?.[surface])ex.add(n.lastLine[surface]);
 return ex;
};
const remember=(run,n,surface,line)=>{
 if(!run||!line)return;
 run.recentLines??={arrival:[],sale:[],night:[]};
 const recent=run.recentLines[surface]??=[];
 recent.push(line);if(recent.length>3)recent.shift();
 (n.lastLine??={})[surface]=line;
};

/* §11.1 일반 방문. 관찰·상황·반응이 서로 다른 문장만 넣는다. 동의어 교체는 Variant가 아니다.
   COPY_WORLD_VOICE_v2.8 §DIALOGUE EXPOSURE / RECENT REPEAT: v2.8 raises every high-frequency
   Pool to its approved minimum size, so the recent-repeat rule above has real room to work
   with instead of cycling a 3-4 line pool. */
const visit={
 first:['“여기가 길드24인가요?”','“문 연 지 얼마 안 됐다면서요.”','“게이트 앞에 가게가 있다길래.”','“들어와도 되죠? 잠깐 볼게요.”',
  '“소문 듣고 한번 와봤어요.”','“이 근처엔 가게가 없어서 반갑네요.”','“처음이라 뭐가 뭔지 잘 모르겠어요.”','“아는 사람이 여기 추천해줬어요.”'],
 back:['“다시 왔어요.”','“오늘도 열었네요.”','“오는 길에 불 켜진 게 여기뿐이더라고요.”','“빈손으로 가긴 좀 그래서요.”',
  '“또 왔습니다.”','“지나가는 길에 들렀어요.”','“오늘은 뭐가 새로 들어왔나 보러 왔어요.”','“여기 아니면 딱히 갈 데가 없어서요.”',
  '“며칠 만이네요.”','“시간 맞춰 와봤어요.”','“근처 지나가다 생각나서요.”','“문 닫기 전에 왔네요.”',
  '“오늘도 별일 없으시죠?”','“자리 비운 사이 뭐 바뀐 거 있어요?”','“원정 전에 들를 데가 여기뿐이에요.”','“얼굴 비추러 왔어요.”'],
 hurt:['“아직 조금 욱신거리네요.”','“괜찮아요. 걷는 데는 지장 없어요.”','“이 정도면 나간 편이죠.”','“오늘은 무리 안 할 거예요.”',
  '“어제보다는 한결 낫습니다.”','“팔이 좀 뻐근하긴 해요.”','“이 정도로 쉴 순 없죠.”','“상처는 아물고 있어요.”',
  '“몸이 무겁긴 한데 버틸 만해요.”','“다친 데는 신경 안 써도 돼요.”'],
 regular:['“늘 보던 얼굴이네요.”','“말 안 해도 아시죠?”','“자리 그대로네요, 다행이다.”','“오늘도 부탁 좀 할게요.”','“이 정도면 단골 맞죠?”',
  '“여기만큼 편한 데가 없어요.”','“얼마 만인지 세어보지도 않았네요.”','“오늘도 늘 하던 대로 갈게요.”','“사장님 얼굴 보니 마음이 놓이네요.”',
  '“이제 여기 오는 게 습관이 됐어요.”','“다른 데는 눈에 안 들어와요.”','“오래 다니다 보니 편해졌어요.”'],
 /* §12 Callback — 실제로 남아 있는 History만 쓴다. 없는 과거를 만들지 않는다. */
 helped:['“지난번에 챙긴 거, 도움이 됐어요.”','“저번 거 쓰고 나서 생각이 좀 바뀌었어요.”','“그때 산 거, 값은 했습니다.”',
  '“그때 사길 잘했다는 생각이 들었어요.”','“덕분에 이번엔 덜 힘들었어요.”','“지난번 그 선택, 후회 없었습니다.”',
  '“미리 준비해 둔 게 이번에 도움이 됐어요.”','“그거 없었으면 더 고생했을 거예요.”'],
 /* Trait 기반. Canonical의 절약 성향 / 겁 많은 성향 예시를 따른다. */
 trait:{
  frugal:['“더 싼 건 없어요?”','“이거 행사 안 해요?”','“조금이라도 아끼고 싶어서요.”','“오늘은 싼 걸로 주세요.”',
   '“이 가격 그대로 계속 가나요?”','“묶음으로 사면 더 싸지나요?”'],
  thrifty:['“그램당으로 치면 이게 낫죠?”','“싼 거 말고, 값하는 걸로요.”','“이거 하나면 오늘은 되겠네요.”',
   '“오래 쓸 수 있는 쪽으로 볼게요.”','“딱 필요한 만큼만 살게요.”','“제값 하는 물건이면 됩니다.”'],
  coward:['“오늘은 무사히 다녀오는 게 목표입니다.”','“이쪽, 위험한 데 맞죠?”','“살아서 오면 또 들를게요.”','“가까운 게이트는 없어요?”',
   '“여기서 오래 안 걸리는 데로 갈게요.”','“위험하면 바로 돌아올게요.”'],
  liar:['“오늘은 좀 깊게 들어가 볼까 해서요.”','“제가 그쪽은 좀 압니다.”','“어려운 데로 간다고 다들 말리던데요.”',
   '“이 정도는 늘 하던 일입니다.”','“걱정할 실력은 아니라서요.”','“다들 저를 과소평가하더라고요.”'],
  eater:['“원정 끝나면 밥부터 먹어야겠어요.”','“속이 든든해야 마음이 놓여요.”','“배고픈 채로 돌아오는 건 딱 질색입니다.”',
   '“뭐든 넉넉하게 챙길게요.”','“든든해야 움직일 힘이 나죠.”','“배 속까지 준비를 마쳐야죠.”'],
  greed:['“오늘은 빈손으로 돌아올 생각 없습니다.”','“이번엔 전리품 좀 제대로 챙겨와야죠.”','“돈은 나중에 벌면 되죠.”',
   '“손해 보고는 못 다닙니다.”','“오늘은 크게 한 건 하고 올게요.”','“빈 가방으로는 안 돌아옵니다.”'],
  shy:['“…저, 이거 얼마예요?”','“구경만 해도 되나요?”','“아, 아니에요. 천천히 볼게요.”',
   '“그, 저기… 여쭤봐도 될까요.”','“오래 붙잡진 않을게요.”','“혼자 조용히 고를게요.”'],
  social:['“사장님, 요즘 어떠세요?”','“앞에서 다들 여기 얘기하던데요.”','“오늘 누구 왔다 갔어요?”',
   '“오늘 여기 분위기 어때요?”','“다른 손님들은 뭐라고 하던가요?”','“사장님이랑 얘기하는 게 재미있어요.”'],
  collector:['“새로 들어온 거 있어요?”','“이런 건 잘 안 보이던데요.”','“종류별로 하나씩은 있어야 하는데.”',
   '“안 본 거 있으면 꼭 보여주세요.”','“진열이 자주 바뀌는 게 좋아요.”','“하나씩 모으는 재미가 있어요.”'],
  aloof:['“필요한 것만 볼게요.”','“설명은 됐어요.”','“빨리 가야 해서요.”',
   '“오래 걸리는 건 별로예요.”','“굳이 권하지 않으셔도 돼요.”','“바로 고르고 갈게요.”']}};

/* §11.1 구매 / 거절 / 가격 반응. */
const sale={
 full:['“이걸로 주세요.”','“네, 담아 주세요.”','“이 정도면 적당하네요.”','“그럼 하나만.”',
  '“좋아요, 가져갈게요.”','“이걸로 하겠습니다.”','“딱 필요했던 거예요.”','“이 값이면 괜찮네요.”',
  '“망설일 이유가 없네요.”','“바로 챙길게요.”','“마음에 드는 걸로 골랐어요.”','“이거면 충분하겠어요.”',
  '“값은 신경 안 쓸게요.”','“필요한 거니까요.”','“더 볼 것도 없이 이걸로요.”','“좋은 조건이네요, 주세요.”',
  '“고민할 필요 없겠어요.”','“이걸로 결정했어요.”','“딱 맞는 걸 찾았네요.”','“이 정도면 살 만하죠.”'],
 half:['“다녀와서 또 들를게요.”','“이 가격이면 안 살 이유가 없죠.”','“사장님 손해 아니에요?”','“오늘은 운이 좋네요.”',
  '“이 값이면 무조건 사야죠.”','“이런 가격은 놓치면 안 되죠.”','“오늘 온 보람이 있네요.”','“이 정도 할인이면 챙겨야죠.”',
  '“반값이면 두말할 것 없죠.”','“이건 정말 남는 장사 같은데요.”','“이 가격에 파셔도 괜찮으세요?”','“마다할 이유가 없네요.”',
  '“다음엔 또 이 가격 안 되겠죠?”','“이런 날 자주 오면 좋겠어요.”','“부담 없이 가져갈게요.”','“이건 사장님이 손해 보시는 거 아니에요?”',
  '“오늘 발걸음이 헛되지 않았네요.”','“이 값이면 하나 더 볼까요.”','“놓치기 아까운 가격이네요.”','“이 정도면 서두를 만하죠.”'],
 overcharge:['“가격이 좀 올랐네요.”','“…뭐, 급하니까요.”','“이번만입니다.”','“원래 이 값이었나요?”',
  '“급한 대로 사야겠네요.”','“값을 따질 여유가 없네요.”','“오늘은 어쩔 수 없죠.”','“이 값에 살 줄은 몰랐는데.”',
  '“아쉽지만 지금은 필요해서요.”','“좀 비싸긴 해도 지금은 사야죠.”','“다음엔 더 싸게 사길 바라야죠.”','“형편이 어렵지만 어쩔 수 없네요.”',
  '“값은 나중에 생각할게요.”','“급하게 필요하니 별수 없죠.”','“이 가격도 감수해야겠어요.”','“지금 안 사면 후회할 것 같아서요.”',
  '“살짝 비싸긴 하네요.”','“그래도 없는 것보단 낫죠.”','“이번엔 값을 안 따질게요.”','“아깝지만 사겠습니다.”'],
 refuse:{
  price:['“그 가격에는 못 사겠어요.”','“그건 좀 부담스럽네요.”','“다음에 여유 있을 때 살게요.”','“조금만 더 싸면 좋을 텐데.”',
   '“이 값까지는 못 쓰겠어요.”','“이 값은 좀 세네요.”','“다음 기회에 살게요.”','“이 가격까진 쓰고 싶지 않아요.”',
   '“값을 보니 손이 안 가네요.”','“이 가격이면 오늘은 넘어갈게요.”','“이 가격엔 손이 떨려서요.”','“이 값은 오늘 쓰기엔 아깝네요.”'],
  need:['“그건 오늘 필요 없어요.”','“오늘 가는 데선 쓸 일이 없어서요.”','“그건 딱히 안 급해요.”','“그건 다음에 볼게요.”',
   '“지금은 딱히 필요가 없네요.”','“이번엔 안 챙겨도 될 것 같아요.”','“그건 아직 손이 안 가요.”','“오늘 갈 데엔 필요 없는 거예요.”',
   '“굳이 지금 살 건 아닌 것 같아요.”','“그건 있어도 안 쓸 것 같아요.”','“지금 당장은 쓸모가 없어서요.”','“다음 원정 때나 볼게요.”'],
  choice:['“이번엔 안 살게요.”','“조금 더 생각해 볼게요.”','“오늘은 여기까지 할게요.”','“음… 아니요, 괜찮아요.”',
   '“오늘은 이만하면 됐어요.”','“다른 걸 더 보고 정할게요.”','“지금은 마음이 안 가네요.”','“좀 더 둘러보고 올게요.”',
   '“오늘은 그냥 넘어갈게요.”','“아직 결정을 못 했어요.”','“이건 다음에 다시 볼게요.”','“지금은 됐어요, 감사합니다.”']}};

/* §11.2 반복되는 중요한 NPC Result.
   사망은 DATA로 명확히 전달되고, 여기 Flavor는 별도다. 사망 Pool에는 살아 있는 사람의
   대사를 넣지 않는다. 영수증 문장은 실제 거래 History가 있을 때만 쓴다(§12).
   `great`는 v2.8에서 새로 분리된 대성공 전용 Pool이다 - 예전에는 grew/plain으로 흩어져
   대성공이라고 말하는 줄이 하나도 없었다. `supplied`/`shaken`은 실제로는 한 번도 선택되지
   않던 죽은 Pool이었으므로(§DIALOGUE EXPOSURE 채택), 쓸 만한 줄은 `plain`으로 합치고 나머지는
   새로 썼다 - 별도 이름을 유지할 실제 분기가 없었다. */
const night={
 deathTraded:['마지막 영수증만 카운터에 남았다.','여기서 산 것들은 끝내 다 쓰이지 못했다.','거래는 이미 다 끝나 있었다.',
  '마지막 구매 기록이 카운터에 남아 있다.','계산대에 섰던 마지막 모습이 눈에 선하다.','그날의 거래가 마지막 거래가 됐다.'],
 deathKnown:['수첩에 남은 건 지난 원정 기록뿐이다.','다음 줄은 비어 있다.','이름 옆에 아무것도 적히지 않았다.',
  '기록은 있지만 그 뒤로 이어지지 않았다.','마지막 페이지에서 이름이 멈췄다.','더 적을 이야기가 남지 않았다.'],
 deathStranger:['문을 열고 들어온 그날이 마지막이었다.','오늘은 돌아오지 않았다.','한 번 왔다 간 손님으로 남았다.',
  '얼굴도 채 익히기 전에 끝이 났다.','몇 마디 나누지 못한 채였다.','스쳐 간 인연으로 남았다.'],
 avoided:['“사장님, 이거 없었으면 못 돌아왔어요.”','“오늘은 진짜 아슬아슬했어요.”','“그거 사길 잘했다는 생각만 했어요.”',
  '“정말 마지막 순간에 살았어요.”','“하마터면 큰일 날 뻔했어요.”','“그 순간이 아직도 아찔해요.”',
  '“준비해 간 게 저를 살렸어요.”','“오늘은 운도 실력도 다 필요했어요.”'],
 rescued:['“챙겨 간 보급이 귀환을 도왔어요.”','“가방에 있던 게 마지막에 일했어요.”','“돌아오는 길은 사장님이 열어 준 셈이에요.”',
  '“그거 없었으면 여기 못 왔을 거예요.”','“마지막에 챙긴 게 결정적이었어요.”','“사장님 덕에 무사히 돌아왔습니다.”',
  '“그 선택 하나가 저를 구했어요.”','“준비한 게 끝까지 버텨줬어요.”'],
 severe:['“며칠만 쉬고 올게요. 제 자리 남겨 둬요.”','“당분간은 못 나갈 것 같아요.”','“다음에 올 때는 멀쩡한 얼굴로 올게요.”',
  '“이번엔 크게 당했어요.”','“한동안은 나서기 힘들 것 같아요.”','“몸이 완전히 회복돼야 다시 나갈게요.”',
  '“생각보다 심하게 다쳤어요.”','“얼마간은 쉬어야 할 것 같습니다.”'],
 hurt:['“좀 다쳤지만, 살아 돌아왔어요.”','“이 정도는 다친 축에도 안 들어요.”','“내일은 좀 쉬엄쉬엄 갈게요.”','“생각보다 안쪽이 사납더라고요.”',
  '“조금 긁혔지만 괜찮습니다.”','“다치긴 했는데 걸을 만해요.”','“며칠 지나면 나을 것 같아요.”','“방심한 대가를 좀 치렀네요.”',
  '“이 정도 상처는 금방 낫죠.”','“아프긴 한데 큰일은 아니에요.”','“다음엔 더 조심할게요.”','“몸이 좀 놀랐나 봐요.”'],
 retreat:['“일단 살고 봐야죠. 내일 다시 올게요.”','“오늘은 아니다 싶어서 돌아섰어요.”','“무리했으면 큰일 날 뻔했어요.”','“길만 보고 왔습니다.”',
  '“더 들어가긴 위험할 것 같았어요.”','“오늘은 여기까지가 한계였어요.”','“몸을 사리는 게 맞다고 봤어요.”','“다음엔 더 단단히 준비해서 갈게요.”',
  '“무리하지 않고 발길을 돌렸어요.”','“이 정도서 멈춘 게 다행이에요.”','“상황이 심상치 않아서 물러났어요.”','“오늘은 얌전히 돌아오는 걸로 했어요.”'],
 grew:['“조금은 익숙해진 것 같아요.”','“지난번보다 손에 붙네요.”','“이제 어디를 봐야 할지 알겠어요.”',
  '“확실히 실력이 늘었어요.”','“예전보다 몸이 가벼워요.”','“이제 조금은 자신이 붙었어요.”','“한 단계 성장한 기분이에요.”',
  '“배운 게 오늘 제대로 쓰였어요.”','“다음번엔 더 잘할 수 있을 것 같아요.”','“경험이 쌓이는 게 느껴져요.”'],
 /* 대성공 전용. 평범한 성공/성장과 달리 이번만큼은 확실히 잘됐다고 말한다. */
 great:['“오늘은 뭘 해도 잘 풀렸어요.”','“생각보다 훨씬 수월했어요.”','“손 댈 때마다 다 맞아떨어졌어요.”','“이런 날은 흔치 않죠.”',
  '“준비한 보람이 제대로 났어요.”','“오늘만큼은 자신 있게 말할 수 있어요.”','“이 정도면 완벽했다고 봐야죠.”','“운도 실력도 다 따라줬어요.”',
  '“예상보다 훨씬 잘 끝났어요.”','“오늘은 특별히 잘 됐습니다.”'],
 plain:['“오늘도 무사히요.”','“내일도 열죠?”','“별일 없었습니다.”','“다녀왔습니다.”','“오늘은 별일 없었어요.”','“챙겨 간 건 잘 썼습니다.”',
  '“발걸음이 가벼운 하루였어요.”','“오늘은 운이 안 따랐네요.”','“가는 길이 생각보다 사나웠어요.”',
  '“오늘 하루도 그냥 지나갔어요.”','“특별한 일은 없었어요.”','“다녀오니 딱 평소 같네요.”','“이번에도 무난하게 끝났어요.”',
  '“몸은 멀쩡합니다.”','“오늘은 조용히 다녀왔어요.”','“늘 하던 대로 마치고 왔어요.”']};

/* 선택 키는 전부 저장되는 상태에서만 만든다 — 그래야 불러오기가 문장을 바꾸지 않는다. */
const key=(n,tag,day)=>n.id+':'+tag+':'+day;

const Copy={
 pick,pools:{visit,sale,night},
 /* 카운터에 도착한 손님의 한마디. Callback > Trait > 상태 > 일반 순으로 고른다. */
 arrive(n,day,hasCallback,run){
  const ex=exclusionFor(run,n,'arrival'),emit=line=>{remember(run,n,'arrival',line);return line;};
  if(hasCallback)return emit(pick(visit.helped,key(n,'callback',day),ex));
  for(const id of n.traits||[]){const pool=visit.trait[id];
   if(pool&&fnv(key(n,'traitgate',day))%3===0)return emit(pick(pool,key(n,'trait'+id,day),ex));}
  if(n.newToday)return emit(pick(visit.first,key(n,'first',day),ex));
  if(n.injury)return emit(pick(visit.hurt,key(n,'hurt',day),ex));
  /* SA-Q13: 단골 Flavor is the same judgement the badge uses - Adventurer owns the threshold
     and nothing here keeps a second one. */
  if(G.Adventurer.isTrustedRegular(n))return emit(pick(visit.regular,key(n,'regular',day),ex));
  return emit(pick(visit.back,key(n,'back',day),ex));
 },
 buy(n,itemId,mode,day,run){const ex=exclusionFor(run,n,'sale');
  const line=pick(sale[mode]||sale.full,key(n,'buy'+itemId+mode,day),ex);remember(run,n,'sale',line);return line;},
 refuse(n,itemId,reason,day,run){const ex=exclusionFor(run,n,'sale');
  const line=pick(sale.refuse[reason]||sale.refuse.choice,key(n,'no'+itemId+reason,day),ex);remember(run,n,'sale',line);return line;},
 /* SA-Q09: 밤의 한 줄. Bag이 있었다는 사실 하나만으로는 어떤 말도 고르지 않는다 - 예전 순서는
    report.items.length(가방에 뭐가 있었는지)를 성장보다도, 퇴각보다도 먼저 물었는데, 그건 그
    보급이 실제로 무언가를 했는지와 무관한 존재 여부일 뿐이었다. v2.8 우선순위는 실제로 일어난
    결과만 묻는다: 생환/구조 -> 대성공 -> 중상 -> 부상 -> 퇴각 -> 성장 -> 평범한 귀환. */
 night(report,n,run){
  const k=key(n,'night',report.day),ex=exclusionFor(run,n,'night'),emit=line=>{remember(run,n,'night',line);return line;};
  if(report.outcome==='사망')
   return emit(pick(n.history.length?night.deathTraded:n.records.length>1?night.deathKnown:night.deathStranger,k,ex));
  if(report.avoidedDeath)return emit(pick(night.avoided,k,ex));
  if(report.rescued)return emit(pick(night.rescued,k,ex));
  /* COPY_WORLD_VOICE_v2.8 §DIALOGUE EXPOSURE: 대성공 is its own named Pool now, distinct from
     an ordinary 성공's growth/plain lines - Source used to fall through to `grew`/`plain` for
     every non-injury success alike, with no line that actually said a 대성공 happened. */
  if(report.outcome==='대성공')return emit(pick(night.great,k,ex));
  if(report.outcome==='중상')return emit(pick(night.severe,k,ex));
  if(report.outcome==='부상')return emit(pick(night.hurt,k,ex));
  if(report.outcome==='퇴각')return emit(pick(night.retreat,k,ex));
  if((report.changes||[]).length)return emit(pick(night.grew,k,ex));
  return emit(pick(night.plain,k,ex));
 },
 /* 사망 Pool과 생존 Pool은 절대 겹치지 않는다. 테스트가 이 경계를 고정한다. */
 deathPool(){return [...night.deathTraded,...night.deathKnown,...night.deathStranger];},
 livingPool(){return [...night.avoided,...night.rescued,...night.severe,...night.hurt,
  ...night.retreat,...night.grew,...night.great,...night.plain];}
};

/* COPY_WORLD_VOICE 18.5 - BOSS REVEAL. D5 gives identity and a Flavor line that may
   hint at the Trait but never states it, D15 gives the exact Function, and D25 gives the exact
   Final Family/Hazard facts. D30 adds no new Boss information. No strategy advice is appended
   anywhere - the information itself is the decision material. GLUTTONY has no rarity boundary:
   the effect reaches every Item contribution, which is what its D15 line says. */
Copy.boss={
 /* COPY_AUDIT_APPROVED_v2.8.0 §14. The Boss information cadence is D0 / D5 / D10 / D15 / D20 /
    D25, and D30 adds nothing new. D0, D10 and D20 had no active Copy at all. */
 /* COPY_AUDIT §14-1 D0 — the first-Morning briefing: the Run objective and the investigation
    cadence, and nothing about the Boss itself. Verbatim. */
 d0:{header:'마왕 조사 개시',lead:'길드 조사대가 마왕의 정체를 추적하러 출발했다.',
  steps:[['DAY 5',['첫 조사 보고에서 토벌 대상이 공개된다.','이후 조사 소식은 5일마다 이어진다.']],
         ['DAY 30',['성장한 모험가 3명을 마왕성으로 보내 최종 토벌에 나선다.']]],
  close:'조사 정보를 확인하며 토벌대를 준비하고, DAY 30까지 점포를 운영해야 한다.',button:'확인'},
 d5:{header:'1차 조사 보고',sub:'토벌 대상 확인',button:'확인',
  flavor:{
   WRATH:'공성추도 없이 성문이 안쪽으로 무너졌다.',
   PRIDE:'검은 갑주에는 아직 흠집 하나 남지 않았다.',
   ENVY:'승전 보고서마다 가장 빛나던 이름 하나가 붉게 지워져 있었다.',
   GREED:'금고가 빈 마을일수록, 놈의 군세는 이상할 만큼 강했다.',
   GLUTTONY:'챙겨 간 물건을 써도 몸이 평소만큼 따라주지 않았다.',
   LUST:'오래 손발을 맞춘 자들만 서로의 이름을 잊지 않았다고 한다.',
   SLOTH:'놈은 움직이지 않았다. 몸을 얽은 봉인만이 낮게 울리고 있었다.'}},
 /* one-tap information beats: they open a question the next report answers. */
 d10:{header:'2차 조사 시작',line:'{보스명}의 전투 기록을 추적한다.',next:'다음 보고 · DAY 15',button:'확인'},
 d20:{header:'최종 정찰 시작',line:'마왕성으로 향하는 원정 경로와 주변 환경을 정찰한다.',next:'최종 보고 · DAY 25',button:'확인'},
 d15:{header:'2차 조사 보고',intro:'전투 기록에서 변칙이 확인됐다.',button:'확인',
  trait:{
   WRATH:['특수 효과 없음',['별도의 변칙은 확인되지 않았다.','래스는 순수한 전력으로 맞선다.']],
   PRIDE:['오만의 갑주',['최종전에서 모든 출전자의 투력이 감소한다.','강인함·기동·정신은 그대로 적용된다.']],
   ENVY:['질투의 시선',['최종전에서 가장 크게 기여하는 모험가 한 명이 표적이 된다.','표적의 투력·강인함·기동·정신은 최종전 동안 감소한다.']],
   GREED:['탐욕의 장부',['최종전까지 누적 총매출이 목표에 미달하면, 부족한 만큼 그리드가 강해진다.','강화에는 한도가 있으며, 목표를 넘겨도 추가 이득은 없다.']],
   /* COPY_WORLD_VOICE_v2.7 §GLUTTONY: verbatim. v2.7 has no Rarity threshold for this Boss,
      so the inherited sentence claimed a Rarity boundary the mechanic does not have - every
      positive Core-Stat contribution from an Item is halved, whatever the Item cost. */
   GLUTTONY:['탐식의 권능',['아이템의 투력·강인함·기동·정신 증가량 50% 감소','환경 대응·보급·보험 효과는 유지']],
   LUST:['매혹의 권능',['단골이 아닌 출전자는 최종전에서 투력·강인함·기동·정신이 모두 감소한다.','단골은 영향을 받지 않는다.']],
   SLOTH:['나태의 봉인',['슬로스에게는 세 개의 봉인이 남아 있다.','15일·20일·25일 중 두 차례와 30일에, 점포지원을 받는 대신 봉인 하나를 풀 수 있다.','봉인을 풀면 그때의 점포지원은 받을 수 없으며, 풀린 봉인이 많을수록 슬로스가 약해진다.']]}},
 /* The scouting report is the D25 disclosure now, so its button acknowledges the report
    rather than announcing a preparation that is still five days away. */
 final:{header:'최종 정찰 보고',intro:'마왕성으로 향하는 최종 원정 환경이 확인됐다.',button:'확인'}
};

/* COPY_WORLD_VOICE §LOCKED PLAYER-FACING TERMS, 2026-09-12. Two of these are exact: the Great
   Success signal must contain 대성공 and read word for word, and 심층원정 is not to be renamed
   to 긴급의뢰 / 특별원정 / 고난도 의뢰. The sponsorship is a Store Gold sink, never a deposit,
   so nothing here may promise it back. The Deep voice says what the Store gets - the
   adventurer's growth - and never a cash payout, 대성공 included. */
Copy.great={signal:'대성공을 노려볼 만합니다.'};
Copy.deep={
 term:'심층원정',sponsor:'원정 후원금',
 header:'길드 심층원정 공고',
 intro:'오늘 하루, 길드가 더 깊은 구역의 정찰을 의뢰했다.',
 gate:'대상 게이트',
 note:'같은 게이트의 더 깊은 구역이다. 위험 특성은 그대로이고, 요구 전투력만 올라간다.',
 cost:'후원금은 추천하는 모험가에 따라 달라진다. 희귀하고 노련한 모험가일수록 비싸다.',
 gain:'성공하면 그 모험가의 성장과 소지금이 늘어난다.',
 sink:'후원금은 돌려받지 않는다. 이 원정으로 가게가 버는 돈은 없다.',
 optional:'추천하지 않아도 된다. 오늘 안에 추천하지 않으면 기회는 지나간다.',
 action:'심층원정에 추천',
 done:'심층원정에 나선다',
 paid:'원정 후원금 지급',
 blocked:'이미 배치를 조정한 손님은 추천할 수 없다.',
 poor:'후원금이 모자란다.',
 /* COPY_AUDIT §15: the two operational surfaces repeat every applicable Day, so each says only
    what its own decision needs. The full explanation is the first-occurrence coach mark. */
 brief:'같은 게이트의 더 깊은 원정. 손님 1명을 후원하면 성공 시 더 성장한다.',
 terms:'성공 시 추가 성장 · 점포 수익 없음',
 confirmed:'심층원정 확정',
 result:'심층원정',
 reward:'심층원정 보상'
};

G.Copy=Copy;
})(globalThis);
