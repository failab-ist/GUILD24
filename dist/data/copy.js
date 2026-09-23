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
 first:['“여기가 길드24인가요?”','“게이트 앞에 가게가 있다길래 왔어요.”','“원정 전에 들르라고 하더라고요.”','“여기서 보급 챙기면 되는 거죠?”',
  '“처음 와봤습니다. 잠깐 볼게요.”','“길드에서 이쪽으로 가보라던데요.”','“생각보다 게이트랑 가깝네요.”','“던전 앞 편의점이라더니, 진짜 바로 앞이네요.”'],
 back:['“다시 왔어요.”','“오늘도 열었네요.”','“오는 길에 들렀습니다.”','“원정 전엔 여기부터 보게 되네요.”',
  '“오늘도 잠깐 보고 갈게요.”','“또 신세 좀 지겠습니다.”','“문 열려 있어서 다행입니다.”','“이번에도 먼저 들렀습니다.”',
  '“오늘은 좀 일찍 왔네요.”','“안녕하세요. 또 왔습니다.”','“익숙한 데가 편하긴 하네요.”','“오늘도 챙길 게 있나 보려고요.”',
  '“이번 원정도 여기서 준비할게요.”','“그냥 지나치긴 좀 그래서요.”','“이제 길은 안 헤매겠네요.”','“또 들르게 됐네요.”'],
 hurt:['“아직 좀 욱신거리네요.”','“걷는 데는 괜찮습니다.”','“오늘은 무리하지 않으려고요.”','“지난번엔 좀 거칠었어요.”',
  '“상처가 아직 덜 아물었습니다.”','“움직일 수는 있어요.”','“오늘은 몸 상태부터 봐야겠네요.”','“이번엔 좀 조심해서 다녀오려고요.”',
  '“아직 뻐근하긴 하네요.”','“오늘은 진짜 무리 안 하려고요. 진짜로요.”'],
 regular:['“사장님, 저 왔어요.”','“오늘도 잘 부탁합니다.”','“이제는 익숙하네요.”','“들르지 않으면 허전하더라고요.”',
  '“또 왔습니다. 뭐 좀 볼게요.”','“여기부터 들르는 게 습관이 됐네요.”','“오늘도 문 열었군요.”','“이번에도 부탁 좀 할게요.”',
  '“또 얼굴 보네요.”','“이 정도면 단골 맞죠?”','“다녀오면 또 들르겠습니다.”','“이쯤 되면 길드보다 여기서 더 자주 보는 것 같네요.”'],
 /* §12 Callback — 실제로 남아 있는 History만 쓴다. 없는 과거를 만들지 않는다. */
 helped:['“지난번에 챙긴 거, 도움이 됐어요.”','“그때 산 거, 정말 쓸모 있었습니다.”','“지난번 보급 덕분에 한숨 돌렸어요.”','“그때 준비해 간 게 결정적이었어요.”',
  '“저번에 챙긴 거, 괜히 산 게 아니더라고요.”','“지난번 물건이 제 몫을 했습니다.”','“그때 산 거, 생각보다 크게 도움 됐어요.”','“지난번엔 여기서 챙기길 잘했습니다.”'],
 /* Trait 기반. Canonical의 절약 성향 / 겁 많은 성향 예시를 따른다. */
 trait:{
  frugal:['“더 싼 건 없어요?”','“이거 행사 안 해요?”','“가격부터 좀 볼게요.”','“살 건 사도 아낄 건 아껴야죠.”',
  '“오늘은 지출을 좀 줄여야 해서요.”','“조금만 싸면 바로 살 텐데.”','“가격표가 조금만 눈치가 있었으면 좋겠네요.”'],
  thrifty:['“꼭 비싼 걸 살 필요는 없죠.”','“값어치만 하면 됩니다.”','“실속 있는 걸로 보고 있어요.”','“쓸 만큼만 챙기면 되죠.”',
  '“화려한 건 됐고, 쓸 만한 걸로요.”','“가격보다 쓸모부터 볼게요.”','“저한텐 잘 산 물건이 좋은 물건입니다.”'],
  coward:['“이쪽, 위험한 데 맞죠?”','“살아서 오면 또 들를게요.”','“오늘은 무사히 다녀오는 게 목표입니다.”','“너무 깊이 들어가진 않을 겁니다.”',
  '“괜히 불안하네요.”','“돌아오는 길만 멀쩡했으면 좋겠습니다.”','“중요한 건 꺾이지 않는 마음이라던데… 저는 일단 안 꺾이게 다녀올게요.”'],
  liar:['“오늘 목적지는 확실합니다. 아마도요.”','“길은 잘 압니다. 지난번에 길 잃은 건 예외였어요.”','“오늘은 가까운 데만 갑니다. 아마 길드에는 다르게 말했을 텐데요.”','“계획대로입니다. 계획이 뭔지는 돌아와서 말씀드릴게요.”',
  '“길드에서 제가 반대로 간다던가요? 과장입니다. 조금 틀렸을 뿐이죠.”','“어디 가냐고요? 돌아와서 맞았던 쪽으로 말씀드리겠습니다.”'],
  eater:['“원정 끝나면 밥부터 먹어야겠어요.”','“배고픈 채로 돌아오는 건 딱 질색입니다.”','“원정 가면 왜 이렇게 배가 고픈지 모르겠어요.”','“돌아오면 제일 먼저 먹을 생각부터 납니다.”',
  '“몸 쓰고 나면 뭐라도 먹어야죠.”','“이번엔 끼니를 거르지 말아야겠네요.”','“몬스터보다 배고픔이 더 끈질기더라고요.”'],
  greed:['“오늘은 빈손으로 돌아올 생각 없습니다.”','“이번엔 전리품 좀 제대로 챙겨와야죠.”','“좋은 건 놓치면 아깝잖아요.”','“안쪽까지 갔으면 뭐라도 건져 와야죠.”',
  '“돌아올 때 손이 무거우면 좋겠네요.”','“기왕 가는 거, 빈손은 싫습니다.”','“나, 지름신 강림.”'],
  shy:['“…저, 이거 얼마예요?”','“구경만 해도 되나요?”','“아, 아니에요. 천천히 볼게요.”','“저기… 잠깐만 볼게요.”',
  '“사람 없을 때 올 걸 그랬나…”','“필요한 것만 보고 갈게요.”','“계산할 때는… 어디 보고 있으면 되죠?”'],
  social:['“사장님, 요즘 어떠세요?”','“앞에서 다들 여기 얘기하던데요.”','“오늘 누가 먼저 왔다 갔어요?”','“요즘 길드 쪽 분위기 아세요?”',
  '“여기 오면 소식이 빠르더라고요.”','“오늘도 이야기 좀 듣고 갈게요.”','“물건도 보고, 소식도 듣고. 한 번에 해결되네요.”'],
  collector:['“새로 들어온 거 있어요?”','“이런 건 잘 안 보이던데요.”','“종류가 많으면 괜히 눈이 가요.”','“못 보던 물건이 있으면 알려주세요.”',
  '“흔한 건 이미 많이 봤죠.”','“이런 건 하나쯤 갖고 싶네요.”','“없는 걸 보면 갖고 싶고, 갖고 나면 또 없는 게 보입니다.”'],
  aloof:['“필요한 것만 볼게요.”','“설명은 됐어요.”','“빨리 가야 해서요.”','“오래 있을 생각은 없습니다.”',
  '“필요한 건 제가 고르겠습니다.”','“말 많이 안 해도 됩니다.”','“표정은 신경 쓰지 마세요. 원래 이렇습니다.”']}};

/* §11.1 구매 / 거절 / 가격 반응. */
const sale={
 full:['“이걸로 주세요.”','“네, 하나 주세요.”','“이 정도면 괜찮네요.”','“그럼 이걸로 하죠.”',
  '“이건 챙겨 갈게요.”','“좋습니다. 주세요.”','“하나 부탁합니다.”','“그걸로 계산해 주세요.”',
  '“네, 사겠습니다.”','“이건 필요하겠네요.”','“그 정도면 괜찮습니다.”','“하나 가져갈게요.”',
  '“좋아요. 이걸로.”','“그럼 이걸 사죠.”','“네. 담아 주세요.”','“이 정도면 살 만하네요.”',
  '“하나면 되겠습니다.”','“이건 가져가겠습니다.”','“계산해 주세요.”','“이 정도면 바로 고르죠. 이걸로 주세요.”'],
 half:['“이 가격이면 안 살 이유가 없죠.”','“오늘은 덕 좀 보네요.”','“이렇게 받아도 되는 거예요?”','“고맙습니다. 잘 쓸게요.”',
  '“이 가격이면 바로 살게요.”','“오늘 잘 왔네요.”','“이건 놓치면 아깝겠는데요.”','“정말 이 가격 맞죠?”',
  '“그럼 하나 주세요.”','“오늘은 운이 좋네요.”','“사장님, 고맙습니다.”','“그 가격이면 좋습니다.”',
  '“오늘 꽤 후하시네요.”','“감사합니다. 하나 주세요.”','“이 정도면 부담 없네요.”','“그럼 바로 사겠습니다.”',
  '“이건 고민할 필요 없겠네요.”','“잘 쓰고 오겠습니다.”','“반값? 이건 못 참지.”','“오늘은 제가 계산을 잘못 본 줄 알았네요.”'],
 overcharge:['“비싸긴 한데, 지금은 필요하네요.”','“하… 급하니까 살게요.”','“이번만입니다.”','“가격이 꽤 세네요.”',
  '“원래 이렇게 비쌌나요?”','“지금 아니면 못 살 것 같으니…”','“알겠습니다. 주세요.”','“비싸도 어쩔 수 없네요.”',
  '“오늘은 그냥 사겠습니다.”','“한숨 나오네요. 그래도 주세요.”','“이 가격이면 기억해 두겠습니다.”','“급한 게 죄죠. 살게요.”',
  '“다음엔 좀 싸게 부탁합니다.”','“이 정도까지 쓸 줄은 몰랐네요.”','“필요하니 사긴 하겠습니다.”','“와, 비싸네요. 하나 주세요.”',
  '“가격 보고 놀랐지만… 주세요.”','“지금은 선택지가 없네요.”','“네. 일단 사겠습니다.”','“가격은 아픈데, 지금은 필요하네요.”'],
 refuse:{
  price:['“그 가격에는 못 사겠어요.”','“너무 비싸네요.”','“그건 좀 부담스럽습니다.”','“조금만 싸면 생각해 볼게요.”',
  '“오늘은 그 정도까지 쓰기 어렵네요.”','“그 가격이면 안 살게요.”','“지금 가진 돈으로는 무리예요.”','“그 정도 값이면 고민되네요.”',
  '“가격이 너무 셉니다.”','“오늘 예산으로는 안 되겠네요.”','“그 가격은 좀 어렵습니다.”','“조금 내려가면 다시 볼게요.”',
  '“제 지갑 쪽에서 거절했습니다.”'],
  need:['“그건 오늘 필요 없어요.”','“이번 원정엔 안 쓸 것 같아요.”','“그건 딱히 안 급합니다.”','“오늘은 다른 걸 챙겨야 해서요.”',
  '“가방 자리 쓰긴 아깝네요.”','“이번엔 그건 빼겠습니다.”','“오늘 준비에는 안 맞네요.”','“그건 다음에 볼게요.”',
  '“지금 필요한 건 아닌 것 같습니다.”','“이번엔 안 챙겨도 되겠네요.”','“오늘은 다른 쪽이 더 급합니다.”','“그건 두고 갈게요.”',
  '“좋은 물건인 건 알겠는데, 오늘 제 차례는 아닌 것 같네요.”'],
  choice:['“이번엔 안 살게요.”','“조금 더 생각해 볼게요.”','“오늘은 여기까지 할게요.”','“음… 아니요, 괜찮아요.”',
  '“이번엔 넘어가겠습니다.”','“그건 됐습니다.”','“오늘은 안 살게요.”','“다른 걸 좀 더 볼게요.”',
  '“이번엔 패스하겠습니다.”','“생각이 바뀌었어요. 안 살게요.”','“오늘은 그만 보겠습니다.”','“그건 다음 기회에 볼게요.”']}};

/* §11.2 반복되는 중요한 NPC Result.
   사망은 DATA로 명확히 전달되고, 여기 Flavor는 별도다. 사망 Pool에는 살아 있는 사람의
   대사를 넣지 않는다. 영수증 문장은 실제 거래 History가 있을 때만 쓴다(§12).
   `great`는 v2.8에서 새로 분리된 대성공 전용 Pool이다 - 예전에는 grew/plain으로 흩어져
   대성공이라고 말하는 줄이 하나도 없었다. `supplied`/`shaken`은 실제로는 한 번도 선택되지
   않던 죽은 Pool이었으므로(§DIALOGUE EXPOSURE 채택), 쓸 만한 줄은 `plain`으로 합치고 나머지는
   새로 썼다 - 별도 이름을 유지할 실제 분기가 없었다. */
const night={
 deathTraded:['마지막 영수증만 남았다. 그는 원정에서 돌아오지 못했다.','오늘의 거래가 그의 마지막 거래가 됐다.','계산대를 나선 뒤 다시 돌아오지 않았다.','장부에는 마지막 구매 기록과 사망 기록이 함께 남았다.',
  '그가 산 물건은 오늘이 마지막이었다.','다음 영수증은 없다. 게이트에서 목숨을 잃었다.'],
 deathKnown:['여러 번 돌아오던 사람이, 이번 원정에서는 돌아오지 못했다.','수첩의 지난 원정 기록이 마지막 기록이 됐다.','익숙한 이름 옆에 사망 기록이 남았다.','다음 방문 날짜는 끝내 적히지 않았다.',
  '늘 돌아오던 길에서 이번에는 목숨을 잃었다.','수첩의 다음 줄은 비었다. 더 적을 방문이 없다.'],
 deathStranger:['처음 들른 날이 마지막 방문이 됐다. 원정에서 돌아오지 못했다.','이름을 적은 날, 사망 기록까지 함께 남았다.','한 번 들렀고, 그날 게이트에서 목숨을 잃었다.','이름 한 줄만 남기고 다시 오지 않았다.',
  '얼굴을 익힐 새도 없이 사망 소식이 먼저 왔다.','첫 원정이 마지막 원정이 됐다.'],
 avoided:['“사장님이 챙겨준 거 없었으면 못 돌아왔어요.”','“오늘은 진짜 그 보급이 살렸습니다.”','“마지막 순간에 챙겨 간 게 버텨줬어요.”','“그 물건 아니었으면 거기서 끝났을 겁니다.”',
  '“이번엔 사장님 덕을 제대로 봤습니다.”','“오늘은 물건 하나가 사람 하나 살렸네요.”','“그거 안 샀으면 지금 여기 없었겠죠.”','“오늘은 그 물건 값이 하나도 안 아깝네요.”'],
 rescued:['“사장님이 챙겨준 게 마지막에 저를 돌려보냈어요.”','“정말 끝인 줄 알았는데, 그 물건이 귀환시켰습니다.”','“가방에 넣어 간 게 마지막에 제대로 작동했어요.”','“그거 없었으면 돌아오는 길 자체가 없었습니다.”',
  '“오늘은 준비해 간 물건 덕분에 돌아왔네요.”','“마지막에 작동한 게 딱 그거였습니다.”','“다음엔 그 물건부터 찾을 것 같아요.”','“그게 가방에 있어서 다행이었어요.”'],
 severe:['“당분간은 못 나갈 것 같습니다.”','“이번엔 제대로 쉬어야겠네요.”','“며칠은 누워 있어야 할 것 같아요.”','“다음엔 멀쩡하게 오겠습니다.”',
  '“이 상태로는 다시 못 나가겠네요.”','“이번엔 회복부터 해야겠습니다.”','“살아온 걸로 만족해야겠네요.”','“한동안은 원정 생각도 못 하겠습니다.”',
  '“며칠은 침대에서 못 나오겠네요.”'],
 hurt:['“좀 다쳤지만, 돌아오긴 했습니다.”','“생각보다 안쪽이 사납더군요.”','“오늘은 좀 아프네요.”','“그래도 제 발로 왔습니다.”',
  '“상처가 좀 남았습니다.”','“이번엔 꽤 거칠었어요.”','“아프긴 한데 괜찮습니다.”','“조금 쉬면 되겠죠.”',
  '“돌아오는 길이 쉽지 않았습니다.”','“이번엔 몸에 좀 남네요.”','“큰일은 피했지만 다치긴 했습니다.”','“다음엔 좀 더 조심해야겠어요.”',
  '“갑옷보다 제가 더 수리 필요하겠네요.”'],
 retreat:['“오늘은 아니다 싶어서 돌아섰어요.”','“무리했으면 큰일 날 뻔했네요.”','“일단 살아서 돌아왔습니다.”','“오늘은 여기까지가 한계였습니다.”',
  '“조금 더 갔으면 위험했겠어요.”','“이번엔 욕심내지 않았습니다.”','“다음에 다시 가보죠.”','“오늘은 물러나는 게 맞았습니다.”',
  '“끝까지 가기엔 무리였어요.”','“상황이 안 좋아서 돌아섰습니다.”','“아쉽지만 오늘은 접었습니다.”','“괜히 버티지 않길 잘했네요.”',
  '“돌아온 걸 보면 판단은 맞았던 셈이죠.”'],
 grew:['“조금은 익숙해진 것 같아요.”','“지난번보다 손에 붙네요.”','“이제 어디를 봐야 할지 알겠어요.”','“이번엔 확실히 배운 게 있습니다.”',
  '“전보다 움직이기 편해졌어요.”','“다음엔 더 잘할 수 있을 것 같습니다.”','“이제 감이 좀 잡히네요.”','“오늘은 한 단계 올라선 기분입니다.”',
  '“지난번과는 느낌이 다르네요.”','“오늘 좀 폼 미쳤는데요?”'],
 /* 대성공 전용. 평범한 성공/성장과 달리 이번만큼은 확실히 잘됐다고 말한다. */
 great:['“오늘은 제대로 해냈습니다.”','“생각보다 훨씬 잘 풀렸어요.”','“오늘 성과는 꽤 컸습니다.”','“이 정도면 자랑 좀 해도 되겠죠?”',
  '“오늘은 운도 실력도 따라줬네요.”','“이런 날도 있군요.”','“예상보다 훨씬 많이 해냈습니다.”','“오늘은 정말 잘 됐어요.”',
  '“이번 원정은 대박이었습니다.”','“이 맛에 원정 다니나 봅니다.”'],
 plain:['“다녀왔습니다. 오늘은 괜찮았어요.”','“생각보다 수월했습니다.”','“무사히 끝냈습니다.”','“오늘은 큰일 없었어요.”',
  '“이번 원정은 잘 풀렸습니다.”','“깔끔하게 끝났네요.”','“별일 없이 돌아왔습니다.”','“오늘은 운이 따라줬네요.”',
  '“잘 다녀왔습니다.”','“무사 귀환입니다.”','“이번엔 순조로웠어요.”','“오늘은 괜찮은 날이었네요.”',
  '“큰 문제 없이 끝냈습니다.”','“다녀오는 길까지 무사했습니다.”','“이번엔 마음 놓고 돌아왔네요.”','“오늘 원정은 여기까지입니다.”']};

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
         ['DAY 30',['성장한 모험가를 최대 3명까지 마왕성으로 보내 최종 토벌에 나선다.']]],
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

/* COPY_AUDIT_APPROVED_v2.8 §14-9 D30 원정대 선택 / 마왕성 준비, verbatim. Player copy never says
   `Final`. The forecast explanation is taught once by the coach and kept behind its ? (User
   decision 2026-09-23: no standing explanation line). */
Copy.finalPrep={
 cap:'최대 3명까지 출전할 수 있다.',
 unlock:'원정대를 확정하면 토벌 전망을 확인할 수 있다.',
 underTitle:'3명보다 적은 인원으로 출전할까요?',
 underBody:'선택한 {N}명만 마왕성으로 향합니다.',
 back:'돌아가기',under:'이대로 확정',
 forecast:'토벌 전망',
 forecastWhy:['확정된 원정대의 능력과 보급,','확인된 위협과 마왕의 특성을 함께 반영한 전망.','보급이 바뀌면 전망도 함께 갱신된다.'],
 noEffect:'마왕성에서는 효과 없음',
 noEffectWhy:'이번 원정에서는 효과를 발휘하지 않아 챙겨갈 수 없다.',
 wallet:'소지금 부족 · {need}G 필요 / {have}G 보유'
};

G.Copy=Copy;
})(globalThis);
