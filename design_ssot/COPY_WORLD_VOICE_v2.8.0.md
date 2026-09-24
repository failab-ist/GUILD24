# COPY_WORLD_VOICE

DOC=COPY_WORLD_VOICE
OWNER=copy,world_voice,player_terms,help_copy,boss_report_copy,result_copy,event_copy
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/COPY_WORLD_VOICE_v2.8.0-patch.md,history/COPY_WORLD_VOICE_v2.7.0.md,history/COPY_WORLD_VOICE_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/COPY_WORLD_VOICE.md

## ROLE

> Player-facing Copy / Terminology / Flavor / NPC Voice / Culture Reference의 Authoritative Design Spec.
>
> 이 문서는 Gameplay Rule / Balance / Item Effect / Trait Function / NPC progression을 변경하지 않는다.
> 현재 게임 위에서 정보 전달을 명확하게 유지하면서 GUILD24의 생활감, Character, 재치를 만든다.

## EXACT COPY ROUTING

Exact approved Player-facing replacements, deletions, Event Flavor, Store Support descriptions,
NPC dialogue pools, Boss/Deep text, Settings/Help text and death narration are owned by:

    COPY_AUDIT_APPROVED_v2.8.0.md

This owner holds terminology, truth boundaries, exposure/cooldown rules and non-duplicated
copy-system rules. Do not maintain a second exact-copy list here.

## MUST READ FIRST — NON-NEGOTIABLE

### Copy는 세 역할로 분리한다

Player-facing Text는 기본적으로 다음 세 종류다.

1. **DATA**
2. **FUNCTION**
3. **FLAVOR**

규칙:

- DATA와 FUNCTION은 정확성을 우선한다.
- FLAVOR는 세계 / Character / 사건을 기억하게 할 때만 사용한다.
- 정보를 Flavor로 포장하지 않는다.
- Flavor가 Function을 다시 설명하지 않는다.
- 모든 Text에 Flavor를 붙이지 않는다.
- 모든 Text를 웃기게 만들지 않는다.
- 좋은 Flavor가 없으면 아무것도 추가하지 않는다.

### 기본 Voice

GUILD24의 Voice는:

- 담담하다.
- 명확하다.
- 생활감이 있다.
- 가끔 상황 자체가 웃긴다.

목표는:

> "작가가 계속 농담하는 게임"

이 아니라:

> "이 세계가 원래 조금 이상한 게임."

이다.

판타지 세계의 사람들에게 던전 / 마왕 / 포션 / 부상 / 귀환석 / 몬스터는 일상이다.
편의점도 그 일상의 일부다.
게임은 자신의 Concept이나 Design을 계속 설명하지 않는다.

### Copy 때문에 새 시스템을 만들지 않는다

이 문서의 모든 예시보다 우선한다.

Copy / Flavor / Joke / Meme 하나를 위해 현재 없는 Gameplay / UI / Dialogue System을 추가하지 않는다.

금지 예:

- Dialogue Choice 신설
- 계산 중 NPC 티키타카 Step 신설
- 봉투 선택 Mechanic 신설
- 결제 Minigame 신설
- Meme 전용 History / Counter 신설
- Meme 전용 Save Schema / Migration 신설
- 상품 패러디용 새 Item Mechanic 신설
- Joke용 Event System 신설

**현재 존재하는 게임 위에서 표현을 개선한다.**

## TRUTH-CRITICAL COPY

Priority:
    TRUTH -> FRESHNESS -> DECISION VALUE -> PLACEMENT -> SCAN -> VOICE

Do not make explanations longer merely to sound friendly.
Reduce internal calculation language and strengthen choice -> actual change -> result.

Priority:

```text
Rule Truth
-> Terminology Truth
-> Interaction Flow Truth
-> Flavor Polish
```

Change copy when it would otherwise imply:
- an old number/rule
- a removed Item/category
- purchase preference that runtime does not own
- false destination/cause
- Store Gold vs NPC Wallet confusion
- old SALE/ORDER flow
- Item/result causality not proven by runtime

Do not rewrite unrelated NPC dialogue merely to make the text feel newer.

Where an example in this owner names a Rule/value that changed in its current owner, the current owner wins and the stale example is not Design Truth.

## OWNERSHIP / CROSS-SPEC BOUNDARY

COPY_WORLD_VOICE는 Gameplay Content의 소유 문서가 아니다.

다음 Rule은 기존 owning Authoritative Design Spec이 계속 소유한다.

- Item Category / Functional Role / Effect / Counter / Insurance / Interaction / Item Pool
  - -> ITEM
- Job / Trait Function / Trait Direction / NPC Growth / Loyalty / Wallet / Revisit / Destination / Death permanence
  - -> NPC_TRAIT
- Sale customer flow / purchase / refusal / price behavior
  - -> SALE
- Expedition causality / Injury / Death / Growth Result
  - -> NIGHT_CLOSING
- Phase layout / information hierarchy / returning-history presentation / visual emphasis
  - -> UI_UX
- Event timing / eligibility / effect / Event-specific Reveal Copy
  - -> EVENT
- D30 Final mechanics / party / Power / clear
  - -> FINAL_EXPEDITION
- Boss Identity / Boss Trait / fixed Boss names / Sloth Seal rule
  - -> BOSS
- Job Mastery / Meta unlock / Monster Knowledge rule
  - -> META

COPY_WORLD_VOICE가 소유하는 것은:

- DATA / FUNCTION / FLAVOR의 표현 원칙
- Player-facing terminology
- Global Voice / Tone
- Function과 Flavor의 언어적 분리
- Item / Relic / Trait Flavor 작성 기준
- NPC Dialogue의 Voice와 Variant
- 기존 Rule로 발생한 NPC Result의 Flavor Variant
- 기존 데이터로 가능한 Callback의 실제 Copy와 Copy 밀도
- Player-facing NPC Name Voice와 승인된 Rare Reference Name/Copy
- Culture / Easter Egg Copy의 표현 방식
- Global Copy QA

특정 Item / Trait / NPC Gameplay Rule이 변경되어야 하면 해당 소유 Spec을 수정한다.
COPY에서 Gameplay Rule을 중복 정의하지 않는다.

### Item boundary

Item의 실제 기능 정보는 ITEM을 따른다.

특히 다음은 Flavor 때문에 숨기거나 약화하지 않는다.

- Category
- relevant Functional Role
- actual Stat effect
- Counter effect
- Condition effect
- Insurance behavior
- explicit penalty / tradeoff
- materially important explicit interaction

Function / Flavor 분리는 **의미와 표현의 분리**다.
이를 위해 반드시 새 data field / 새 description architecture를 만들 필요는 없다.
현재 Source 구조 안에서 명확히 구분 가능하면 그것을 재사용한다.

COPY의 상품 예시는 새 Item 추가 지시가 아니다.
실제 Item 채택 / 이름 / Effect는 ITEM이 우선한다.

### NPC boundary

NPC gameplay identity / Trait behavior / History / Revisit / Death / Injury Rule은 NPC_TRAIT 및 관련 Spec을 따른다.

COPY는:

- 무엇을 저장할지 새로 정하지 않는다.
- 새 Relationship System을 만들지 않는다.
- 가짜 History를 만들지 않는다.
- 실제 사용할 수 있는 현재 데이터 안에서 문장만 선택한다.

Returning NPC의 history/change를 어디에 어떻게 보여줄지는 UI_UX가 소유한다.
COPY는 그 안에서 사용되는 문장 Voice만 소유한다.

### RELATED

Item truth -> `ITEM_v2.8.0.md`
Boss identity/trait function -> `BOSS_v2.8.0.md`
Final reveal timing -> `CORE_RUN_v2.8.0.md` / `FINAL_EXPEDITION_v2.8.0.md`
Run abandon function/UI -> `CORE_RUN_v2.8.0.md` / `UI_UX_v2.8.0.md`
Event function -> `EVENT_v2.8.0.md`
Sale/UI -> `SALE_v2.8.0.md` / `UI_UX_v2.8.0.md`
Night causality -> `NIGHT_CLOSING_v2.8.0.md`

## PLAYER COPY MATRIX

| 요소 | DATA | FUNCTION | FLAVOR | 반복 Variant |
|---|---|---|---|---|
| 능력치 | 필수 | X | X | X |
| Gold / 가격 / 재고 | 필수 | 거의 X | X | X |
| Gate 확률 | 필수 | X | X | X |
| Forecast | 필수 | 필요시 | X | X |
| Button | 행동명 | X | X | X |
| Tutorial | 필요한 정보 | 필수 | 거의 X | X |
| Item | 수치 | 필수 | 권장 | X |
| Trait | 필요시 | 필수 | 선택 | Dialogue만 가능 |
| Relic | 수치 | 필수 | 권장 | X |
| Dungeon / Hazard | 상태 | 필수 | 소량 | X |
| NPC Profile | 필수 | 필요시 | 높음 | Dialogue에서 적용 |
| NPC Dialogue | 필요시 | 필요시 | 핵심 | **O** |
| Sale Reaction | 결과 | 필요시 | 소량 | **O** |
| Night 일반 성공 | 결과 | 최소 | 거의 X | 낮음 |
| 부상 / 중상 / 퇴각 / Death Avoid / 사망 | 결과 필수 | 필요시 | 중요 | **O** |
| Final | 결과 필수 | 최소 | 선택 | 낮음 |

## PLAYER-FACING TERMINOLOGY

Source 내부 이름과 Player UI 용어를 구분한다.

- `combat` = **투력**
- `survival` = **강인함**
- `mobility` = **기동**
- `spirit` = **정신**
- Monster Knowledge progress = **보급 생환 N회**
- old Monster Knowledge progress wording `관찰 N회` = 사용하지 않음

실제 싸움 / battle 자체는 **전투**라고 쓴다.

내부 계산용:
- Power
- Party Power

는 Director / Work 내부 표현으로 사용할 수 있다.
Player에게 별도 능력치로 노출하지 않는다.

### LOCKED PLAYER TERMS

Use:
- 강인함, not player-facing 생존 Stat
- 점포지원, not 유물
- 심층원정
- 원정 소지금 획득 for expedition-Wallet modifiers
- 귀환 후 피로 for the settled NIGHT value

Do not expose:
- 성장 잠재력
- 남은 특성
- internal potion marker
- internal fatigue accounting labels

### Deep Expedition
Locked term=`심층원정`.

Do not rename to `긴급의뢰`, `길드 긴급의뢰`, `특별원정`, `고난도 의뢰`
without later User approval.

### Sponsorship
Preferred concept=`원정 후원금`.

It is a Store Gold sink, not a refundable deposit.

Deep Expedition voice communicates:
- deeper/harder version of today's Gate
- optional nomination
- Store sponsorship
- NPC Growth/Wallet return
- **unlike normal Great Success**, no Store Gold payout even on Deep Great Success

### Great Success opportunity
Exact required signal:
`대성공을 노려볼 만합니다.`

Do not replace with vague wording that omits `대성공`.

Help:
    구매가 확정되면 현재 준비 상태를 반영해 이 신호만 다시 확인합니다.
    정확한 확률은 표시하지 않습니다.

Do not say Supply always increases Great Success.

### Run abandon

Exact Player-facing action label:

```text
현재 지점 포기
```

Confirm title / body / button -> `COPY_AUDIT_APPROVED_v2.8.0.md` §1-3.

The function remains the current Run-only abandon action; Account/Meta preservation and Full Data Reset remain separate mechanics.

Do not imply XP, settlement, compensation or reward.

### ITEM CATEGORY TERMINOLOGY

Authoritative player-facing category identities are owned by `ITEM_v2.8.0.md`:

```text
Food
Drink
Potion
Field Gear
Insurance
Special
```

`Medical` is not an active category.
Do not remap the Potion line to `Special` merely because stale Source used that key.

This owner does not create a second localized-category taxonomy.
Exact Korean display strings, where needed, must preserve these six identities and follow approved existing copy style; they must not invent a seventh category or restore `Medical`.

## DATA — 사실은 표시한다

DATA는 "쓰는 것"이 아니라 **표시하는 것**이다.

숫자 / 상태 / 확률로 정확하게 표현할 수 있다면 게임이 대신 해석해서 문장으로 바꾸지 않는다.

### GOOD

투력 32  
강인함 24  
기동 18  
정신 21

내일 게이트 등장 확률  
T1 50%  
T2 35%  
T3 15%

전투 예측  
우세

환경 대응  
불안

### BAD

> 내일은 상급 게이트 비중이 높다.

> 현재 모험가는 전투에서 우위를 점하고 있다.

이미 정확한 정보를 보여줄 수 있는데 AI가 Player 대신 해석하지 않는다.

## FUNCTION — 기능은 정확하게 쓴다

FUNCTION은:

> "이게 무엇이고 Gameplay에 어떤 영향을 주는가"

를 정확하게 전달한다.

말맛보다 정확성이 우선이다.

- Rule을 모호하게 만들지 않는다.
- 효과를 문학적으로 표현하지 않는다.
- 실제 Penalty / Tradeoff를 숨기지 않는다.
- 의미 없는 수식어를 붙이지 않는다.
- Design을 해설하지 않는다.

### GOOD

#### Trait Effect

수족냉증  \
냉기 대응 감소

Trait 기능 예시는 특정 한 Trait을 Tutorial 대표로 만들지 않는다.

#### Item Effect

공포 대응 증가  
기동 감소

### BAD

> 강력한 공포 대응 효과를 제공하지만 기동 부담을 전략적으로 고려해야 한다.

## FLAVOR — 설명이 아니라 기억

FLAVOR는 없어도 Gameplay Rule 이해에는 문제가 없어야 한다.

목적은 다음 중 하나다.

- Character
- 생활감
- 작은 사건
- 사용감
- 세계의 문화
- 재치

Flavor는 Function과 분리한다.

### GOOD

> 용 그림은 장식이 아니다.

> 뚜껑이 잘 안 닫힌다.

> 오늘까지.

> 늘 먹던 걸로.

### BAD

> 냉기 위험에 효과적인 매운 음식이다.

Function을 다른 말로 반복했을 뿐이다.

### Flavor 우선순위

1. NPC Dialogue / Callback
2. Item
3. Relic
4. Trait — 선택적
5. 중요한 NPC Result

다음에는 Flavor를 거의 사용하지 않는다.

- 능력치
- Gold
- 가격
- 재고
- Gate 확률
- Forecast
- 발주 수치
- 일반 Button
- 단순 상태표시

### Trait Flavor

Trait에는 Flavor가 필수가 아니다.

Trait 이름 + 정확한 Function만으로 Character가 충분히 생길 수 있다.
좋은 문장이 있을 때만 추가한다.

### Item Flavor

Item Flavor는 "판타지 세계의 편의점 상품"이라는 정체성을 강화한다.

좋은 Item Flavor는:

- 한 가지 사용감
- 한 가지 상품 특징
- 한 가지 생활 관찰
- 한 가지 짧은 재치

중 하나만 잡는다.

Order / Sale의 핵심 판단 정보보다 앞서지 않는다.
Flavor 때문에 실제 Effect / Counter / Penalty를 찾기 어려워지면 실패다.

## VOICE — 실제 작성 기준

"담담하게" 같은 추상 지시만으로 끝내지 않는다.
아래 Anchor를 직접 따른다.

### 정상 문장이 대부분이다

GOOD:

> 독거미 동굴이 열렸다.

> 포션 품절.

> 세아린이 돌아왔다.

> 발주 완료.

평범한 Text가 대부분이어야 드문 재치가 기억된다.

### Joke를 설명하지 않는다

BAD:

> 계산은 끝났지만 손님은 아직 가지 않고 있습니다. 아무래도 할 말이 있는 것 같습니다.

BETTER:

> 계산은 끝났다.  
> 손님은 아직 안 갔다.

농담이 왜 웃긴지 설명하지 않는다.

### 문장 Rhythm을 균일하게 만들지 않는다

가능:

> 오늘까지.

> 독. 속박.

> 늘 먹던 걸로.

> 뚜껑이 잘 안 닫힌다.

모든 문장을 동일한 길이 / 동일한 문법으로 맞추지 않는다.

### NPC Character는 말끝보다 "무엇을 말하는가"로 만든다

겁쟁이:

> 귀환석 있습니까?

절약가:

> 더 싼 건 없어요?

단골:

> 늘 먹던 걸로.

대식가:

> 먹을 건 이게 다예요?

억지 Accent / 말끝 변형으로 Character를 만들지 않는다.

### AI식 Copy 금지

다음 Pattern을 반복하지 않는다.

- 강력하다. 하지만 위험하다.
- 단순히 A가 아니라 B
- 핵심은
- 중요한 것은
- 결국
- 전략적으로 활용
- 효과적으로 대응
- 다양한 상황에서
- 특별한 경험
- 강력한 선택지

게임이 자신의 Design을 해설하지 않는다.

### SaaS / App 문체 금지

BAD:

> 효율적인 플레이를 위해 게이트 정보를 확인해보세요!

> 발주 프로세스가 완료되었습니다.

> 옵션을 선택해주세요.

Button은 가능하면 실제 행동을 쓴다.

- 발주 확정
- 영업 시작
- 손님 보내기
- 밤 결과 보기
- 마감하기

## WIT / CULTURE PLAYBOOK

재치를 추상적으로 "센스 있게" 쓰지 않는다.
문화 표현은 밀도를 나눈다.

### LEVEL 1 — 편의점 생활문화

가장 자주 사용한다.
Easter Egg라기보다 GUILD24 세계의 일상이다.

소재 예:

- 1+1
- 2+1
- 도시락
- 폐기
- 봉투 / 보따리
- 결제
- PB
- 행사 POP
- 재고 Box
- 영수증
- 진열
- 품절
- 유통기한
- 계산대
- 단골

목표:

> "편의점 알바 해본 사람이 쓴 것 같다."

현재 시스템과 연결될 때만 사용한다.

예:

폐기:

> 오늘까지.

> 안 팔리면 저녁이다.

가격 반응:

> 지난번엔 이것보다 쌌는데.

재방문:

> 늘 먹던 걸로.

다음은 **Tone Reference**다.

> 보따리 필요하세요?

NPC:

> ……

계산 후:

> 아니, 그럼 이걸 들고 가요?

필요하다면:

> 아까 물어봤다.

현재 게임에 이런 티키타카 Step이 없다면 이 장면을 구현하기 위해 새 Dialogue Flow를 만들지 않는다.
이 예시는 **생활 유머의 방향**을 보여주는 것이다.

### LEVEL 2 — 현실 상품 패러디

핵심 Item의 체감 약 15–20% 이하.

단순히 이름만 비틀지 않는다.

구조:

**현실 상품의 특징  
→ 판타지식 변형  
→ 이미 존재하는 Gameplay Effect**

방향 예:

#### 생수 계열

현실의 지역 수원지 이미지를 판타지 산맥 / 수원지로 변형.

> 세 봉우리 아래에서 올라온 물이라고 한다.

#### 가성비 도시락 계열

내용물이 꽉 찬 상품 Character.

> 뚜껑이 잘 안 닫힌다.

#### ITEM의 `불룡볶음면`

Current function truth is owned by `ITEM_v2.8.0.md`.

> 용 그림은 장식이 아니다.

Existing flavor such as `용 그림은 장식이 아니다.` may remain only as Flavor; it must not be used to imply the retired combat-stat function.

#### 크림빵 계열

크림 양 자체가 Character일 때:

> 반으로 갈라도 아직 크림이다.

이 예시는 새 Item 추가 지시가 아니다.
실제 Item 이름 / Effect / 채택 여부는 ITEM을 따른다.

금지:

- 이름만 비슷하게 만들기
- Effect와 상관없는 패러디
- 패러디 때문에 Balance 변경
- 실제 Logo 복제
- 실제 Package 복제
- 실제 Typeface / 고유 Visual Identity 복제

### LEVEL 3 — Game / eSports / Internet Easter Egg

전체 체감 약 1–2% 이하.
한 Run에 하나도 없어도 정상이다.

이번 COPY_WORLD_VOICE Authoritative Design Spec에서 직접 다루는 LEVEL 3은:

**희귀 Reference NPC + 해당 NPC 전용 Easter Egg**

이다.

독립형 Rare Easter Egg Event의 Trigger / Effect / Event-specific Reveal Copy는 EVENT가 소유한다.
COPY_WORLD_VOICE는 그 Event의 전역 Voice / Context 원칙만 제공하며, 이 문서만으로 새 Event를 추가하지 않는다.

## RARE REFERENCE NPC

Player-facing Name Voice는 COPY_WORLD_VOICE가 소유한다.
NPC의 Gameplay generation / stats / traits / progression은 NPC_TRAIT가 소유한다.

다음 Exact Name은 Rare Reference NPC로 유지한다.

초기 승인:
- 요화니우스
- 상혀크
- 진호르

중요:
normal Name Pool의 기본 Voice 자체도 `한국식 + 판타지 + 유쾌한 비틀기`다.
따라서 Rare Reference와 일반 이름이 완전히 다른 언어권처럼 느껴지면 안 된다.

`요화니우스`는 일반 Name Voice의 강한 Tone Anchor이기도 하지만,
이 Exact Name의 전용 Easter Egg 조건은 아래 Rare Reference 규칙을 따른다.

모르는 Player에게는 그냥 이 세계의 자연스러운 NPC 이름처럼 보여야 한다.

Reference NPC 이름 자체가 첫 번째 Easter Egg다.
관련 Special Copy는 해당 NPC가 실제 Run에 존재할 때만 Eligible하다.

관련 NPC가 없는 Run에서 전용 Meme을 일반 System Message나 다른 NPC에게 출력하지 않는다.

## CULTURAL REFERENCE CONTEXT CHECK

새 Reference를 Work가 임의로 추가하지 않는다.
새 후보가 필요하면 Design Candidate로 보고하고 User 승인 후 owning Authoritative Design Spec에 추가한다.

후보마다 확인한다.

1. 원본은 무엇인가?
2. 왜 유명한가?
3. 실제로 어떤 Context에서 소비되는가?
4. GUILD24의 어떤 기존 상황과 연결되는가?
5. 현재 Source에 그 상황 / Hook이 존재하는가?
6. Reference를 몰라도 장면 자체가 성립하는가?

하나라도 성립하지 않으면 제외한다.

금지:

- 유명하니까 넣기
- 숫자가 우연히 같아서 넣기
- 이름만 비슷하게 만들기
- 원본 Context와 무관한 곳에 출력
- 관련 Reference NPC가 없는데 전용 Meme 출력
- Meme 때문에 새 Gameplay / History / Save System 만들기

## NPC DIALOGUE & RESULT VARIATION

Variation은 모든 Copy에 적용하지 않는다.

대상은 딱 두 종류다.

1. **NPC가 말하는 반복 Dialogue**
2. **NPC에게 일어나는 반복 상황 Result / Flavor**

Variation하지 않는 것:

- DATA
- FUNCTION
- Button
- Tutorial 핵심 설명
- 능력치명
- Forecast명
- Item 고유 Flavor
- Relic 고유 Flavor

### NPC Dialogue Variation

같은 상황에서 NPC가 항상 같은 한 문장만 반복하지 않는다.

대상:

- 일반 방문
- Trait 기반 Dialogue
- 구매
- 구매 거절
- 가격 반응
- 재방문
- Callback


예: 절약 성향

> 더 싼 건 없어요?

> 이거 행사 안 해요?

> 지난번엔 이것보다 쌌는데.

> 오늘은 싼 걸로 주세요.

예: 겁 많은 성향

> 귀환석 있습니까?

> 이쪽, 위험한 데 맞죠?

> 살아서 오면 또 들를게요.

> 가까운 게이트는 없어요?

Variant는 단순 동의어 치환이 아니다.

BAD:

> 다쳤어요.

> 부상을 입었어요.

> 상처를 입었어요.

좋은 Variant는 다른 관찰 / 상황 / Character 반응 중 하나를 가져야 한다.

### NPC Result Variation

반복해서 발생하는 중요한 NPC 상황은 동일 Flavor 한 줄을 계속 반복하지 않는다.

대상:

- 부상
- 중상
- 퇴각
- Death Avoid
- 사망
- 중요한 귀환

Result 발생 조건 / Severity / Gameplay Consequence는 NIGHT_CLOSING 및 관련 Spec을 따른다.
COPY는 문장 Variant만 소유한다.

예: 사망

**DATA**

사망

**FLAVOR** -> exact DEATH NARRATION pools: `COPY_AUDIT_APPROVED_v2.8.0.md`


History가 필요한 문장은 실제 해당 History가 있을 때만 사용한다.
가짜 과거를 만들지 않는다.

사망이라는 사실은 Flavor로 숨기지 않는다.
DATA로 명확하게 전달하고 Flavor는 별도로 사용한다.

### VARIATION HARNESS

Work는 모든 문자열을 랜덤화하지 않는다.

A. 반복 NPC 일반 / Trait Dialogue  
→ 소규모 Variant Pool

B. 반복 Sale Reaction  
→ 구매 / 거절 / 가격 반응 Variant Pool

C. 기존 History 기반 Callback  
→ 상황별 소규모 Variant Pool

D. 반복되는 중요한 NPC Result  
→ 부상 / 중상 / 퇴각 / Death Avoid / 사망 Variant Pool

목표:

> "녹음된 한 줄을 다시 듣는 느낌"

을 줄이는 것.

희귀 Callback은 1–3개여도 충분하다.
좋은 문장이 없으면 개수를 채우기 위해 나쁜 문장을 추가하지 않는다.

### NPC DIALOGUE TRUTH

Dialogue must not imply a purchase preference that the owning Trait does not implement.

Exact active ARRIVAL / TRAIT / SALE / NIGHT / DEATH pools are owned by
COPY_AUDIT_APPROVED_v2.8.0.md.

### DIALOGUE EXPOSURE / RECENT REPEAT — EXACT

Dialogue production target is sized for repeated Run exposure.

Target minimum pool sizes:

#### ARRIVAL
- first: 8
- back: 16
- hurt: 10
- regular: 12
- helped callback: 8
- each active Trait-arrival pool: 6

#### SALE
- 100% accept: 20
- 50% accept: 20
- 150% accept: 20
- refusal / price: 12
- refusal / need: 12
- refusal / choice: 12

#### NIGHT
- ordinary success: 16
- great success: 10
- retreat: 12
- hurt: 12
- severe: 8
- avoided death / life-saving: 8
- rescued return: 8
- success + growth: 10

#### DEATH NARRATION
- traded: 6
- known: 6
- stranger: 6

Recent-repeat rule:
- ARRIVAL / SALE / NIGHT track recent visible dialogue separately.
- The same exact line is not eligible if it appeared within the previous 3 visible dialogue beats
  on that same Surface.
- The same NPC may not immediately repeat its previous line from the same Pool.
- Reuse later in the same Run is allowed.
- Selection remains deterministic for the same saved state.
- Dialogue selection must not consume Gameplay RNG.
- Save/Load must not change an already-determined visible line.

This is a readability/content-density rule, not a relationship or personality mechanic.

## CALLBACK

Callback은 현재 이미 존재하는 데이터 / History만 사용한다.

가능한 예:

- 방문
- 구매
- 원정 결과
- 부상 / 회복
- Loyalty
- Dungeon
- 실제 보급품 사용 결과

새 History를 만들지 않는다.

Copy 예:

> 저번에 산 거 있죠.

> 이번엔 해독제부터 볼게요.

> 그거, 진짜 쓸모 있던데요.

> 아직 좀 욱신거려요.

> 이번엔 준비해 왔습니다.

> 늘 먹던 걸로.

실제 해당 데이터가 있을 때만 사용한다.

Copy density target:

- Eligible 상황의 약 15–20%
- NPC 방문당 최대 1개

좋은 Callback이 없으면 일반 Dialogue를 사용하거나 아무것도 추가하지 않는다.

History 기반 Callback이 Eligible하면 일반 Trait Dialogue보다 우선할 수 있다.

Returning NPC의 변화를 화면에서 어떻게 보여줄지는 UI_UX를 따른다.

### RETURN-VISIT HELPED CALLBACK

The helped callback may be selected only when the immediately previous expedition has a proven
sold-Item contribution under the current result-proof boundary.

Do not use:
- `events.length > 0`
- Trait-only `injury-guard`
- a generic Hazard/Result event with no sold-Item proof

as sufficient evidence.

The callback consumes no Gameplay RNG and creates no new proof system; it reads the persisted
previous-result proof already needed for NIGHT.

## SYSTEM / TUTORIAL / BUTTON

### System Message

System은 계속 해설하지 않는다.

예:

> 발주 완료.

> 재고가 가득 찼다.

> 진호르 중상.

> 세아린 Lv.8.

### Tutorial

필요한 Gameplay Information은 유지한다.
Copy Polish 때문에 Rule 설명을 빼지 않는다.

목적지 신뢰도는 특정 Trait 이름을 중심으로 가르치지 않는다.
Authoritative wording: the 목적지 tutorial coach step below.

App Onboarding 문체를 피한다.

BAD:

> 효율적인 플레이를 위해 게이트 정보를 확인해보세요!

### Button

가능하면 실제 행동을 쓴다.

- 발주 확정
- 영업 시작
- 손님 보내기
- 밤 결과 보기
- 마감하기

`확인 / 진행 / 다음`만 반복하지 않는다.

### TUTORIAL VOICE

Tutorial teaches system reading, not solution memorization.

Allowed function:
- Hazard presses a Core Stat
- natural Stat and Item Counter both contribute
- readiness labels summarize current preparation
- Required Supply is paid first
- remaining Supply can reduce current and outcome Fatigue

Forbidden solution script:
```text
독에는 방진마스크를 사세요.
```

Tutorial may point to the relevant UI value without selecting the answer for the Player.

### TUTORIAL COACH COPY

Keep each coach step short: one system-reading job, usually one or two sentences.

Exact copy for the 심층원정 / 수량 / 발주 확정 / 대성공 / 환경 대응 (HAZARD) / 전망 / 보급 / 재방문 손님 / 가방 (상품 사용) / 가격 (PRICING) steps -> `COPY_AUDIT_APPROVED_v2.8.0.md` §3.

```text
점포지원 (DAY 0, User 2026-09-24)
점포지원은 이번 영업 내내 적용되는 효과다. 첫 지원은 하나를 무료로 고른다.


점포지원 카드
카드마다 효과와 가격이 적혀 있다. 이번 영업을 어떻게 꾸릴지 떠올리며 고른다.


점포지원 구매
누르면 바로 확보된다. 이후 DAY 5·10·15·20·25·30에 새 후보가 오고, 최대 7개까지 들일 수 있다.


방문객
오늘 올 손님 수. 점포지원·장식·사건에 따라 달라진다.

게이트
열린 게이트의 위험을 보고 오늘 필요한 상품을 준비한다.


보유 골드
보유 골드와 현재 발주 후 잔액을 확인한다.


후보 교환
후보 전체를 교환한다. 같은 날 반복하면 비용이 오른다.


목적지
이 손님이 향할 게이트. 특성·당일 상황에 따라 바뀔 수 있다.


NIGHT
한 명씩 원정 결과와 변화를 확인한다. ‘전체 건너뛰기’로 바로 정산할 수 있다.

CLOSING
오늘 영업 손익을 확인한다. 발주·점포지원 지출은 따로 표시된다.
```

The `전망` step explains display behavior and uncertainty; it does not imply that purchased Items have no runtime effect. Actual Resolve still uses the final committed preparation.

The `보급` step names the visible consequence but does not expose the hidden deficit formula.

## IMPORTANT RESULT

Copy가 담담하다고 중요한 Result까지 평평하게 만들지 않는다.

중요도는 필요하면 UI_UX의:

- Typography
- Frame / Icon
- Contrast
- 작은 Motion
- Sound

등으로 전달한다.

Copy를 장황하게 써서 Severity를 표현하지 않는다.

## NPC NAME VOICE

NPC 이름도 World Voice의 일부다.

### MAIN VOICE — 한국식 + 판타지 + 유쾌한 비틀기

normal Name Pool의 중심은:

`한국어 어감`
+
`판타지식 변형`
+
`가끔 자연스러운 말장난`

이다.

목표:
정통 서양 High-Fantasy 인명록이 아니라,
한국어 Player가 읽자마자 기억하고 피식할 수 있는 생활형 Fantasy 이름.

Tone Anchor 예시:
- 요화니우스
- 지오니아
- 민자이
- 고쉬스앵

이 예시는 방향 기준이다.
모든 이름을 Meme/실존인물 패러디로 만들라는 뜻이 아니다.

Good pool mix:
- 한국어 어감이 남아 있는 Fantasy 변형
- 익숙한 음절을 한두 번 비튼 이름
- 말장난을 알아채도 되고 못 알아채도 자연스러운 이름
- 드물게 더 정통 Fantasy스러운 이름

Strong Western High-Fantasy names may exist,
but they must not dominate the normal pool.

Avoid a pool where:
`노아 / 바엘 / 카엘 / 아몬 / 레온 ...`
같은 서양/성서/정통 Fantasy 느낌이 연속적으로 주류를 이룬다.

### READABILITY

기본 Name Pool은:
- 한국어 화자가 한 번에 읽을 수 있다.
- 현실 한국 실명 그대로만 반복하지 않는다.
- 말장난을 모르면 이름 자체가 붕괴하지 않는다.
- 의미 없는 Random Syllable Soup을 피한다.
- 특정 접미사를 남발하지 않는다.
- 한두 개의 음절 규칙으로 전체 Pool이 자동 생성된 티가 나지 않는다.

Reject:
- 의미 없는 띄어쓰기
- 읽기 어려운 음절
- Random Syllable Soup
- 모든 이름이 `-우스 / -엘 / -리온` 계열
- 서양 High-Fantasy 이름이 normal pool의 대부분
- 모든 이름이 억지 Meme이라 세계가 개그 명단처럼 보이는 상태

Rare Reference Name도 모르는 Player에게는
normal Name Voice 안에서 자연스럽게 섞여 보여야 한다.

## GLOBAL COPY SCOPE

이 기준은 Item Flavor만 대상으로 하지 않는다.

Player가 보는 전체 문자열에 적용한다.

- 최초 실행
- Title
- New Game
- DAY / Phase
- Tutorial
- HUD
- Menu
- Button
- Tooltip
- Item Name / Effect / Flavor
- Trait
- Dungeon
- Event
- System Message
- 구매 / 거절
- NPC Dialogue
- Empty State
- Warning
- Level Up
- Unlock
- Night
- Closing
- Codex
- Meta
- Settings / Save

단, 이미 명확하고 좋은 Copy를 변화 자체를 위해 다시 쓰지 않는다.

## IMPLEMENTATION GUARDRAIL

Copy 수정 때문에 Source 구조를 먼저 Refactor하지 않는다.

현재 문자열이 dungeon.js / shop.js / run.js / catalog.js 등 관련 로직에 있어도 Copy 작업만을 위해 별도 Dialogue Architecture를 만들지 않는다.

현재 Source가 이미 하는 방식을 재사용하고 가장 작은 변경을 우선한다.

별도 구조는 실제 필요가 생겼을 때만 검토한다.

예:

- Dialogue Variant가 관리 불가능할 정도로 증가
- 여러 시스템의 공용 문자열 중복이 실제 문제화
- 다국어 지원 시작
- 현재 구조에서 유지보수 문제가 실제 발생

## MORNING / SUPPLY COPY

Where required Supply is known, prefer direct data:

```text
필요 보급 0
필요 보급 3
필요 보급 5
```

Do not restate it as recommendation prose such as:
- `오늘은 보급 준비가 중요합니다`
- `추천 준비: 음식`

unless an owning tutorial explicitly requires instructional text.

## SUPPLY SHORTFALL

Main compact line:

    보급 부족 {N} · 능력치 감소

On-demand explanation:

    투력·강인함·기동·정신이 함께 감소한다.

Do not expose the hidden deficit formula.

## FIRST AID KIT

Concise player function:

    원정 후 남는 부상을 1단계 완화한다. 사망에는 적용되지 않는다.

Do not append redundant 원정 결과는 유지 prose on the primary Item line.

## HAZARD / ITEM COPY BOUNDARY

Gate copy communicates:
- Hazard identity
- pressured Stat
- qualitative readiness

Item copy communicates exact owned values:
- Stat +N
- Counter +N
- Supply +N
- explicit penalty
- Insurance behavior

Do not turn those ingredients into strategy advice such as `오늘 최적`, `추천`, `반드시 준비` unless another owner explicitly defines a forced rule.

## PRE-SUPPLY EXPEDITION OUTLOOK — EXACT COPY

Ordinary SALE uses this exact heading:

```text
보급 전 원정 전망
```

Exact Death-risk label:

```text
실패 시 사망 위험
```

This block covers:
- qualitative Combat Forecast
- qualitative Hazard Readiness
- exact pre-supply 실패 시 사망 위험 %

The `실패 시 사망 위험` percentage means the conditional chance that an ordinary failed expedition escalates to Death. It is not the unconditional whole-expedition Death probability.

After an Item purchase commits, the displayed outlook remains the original pre-supply snapshot for that customer visit.
Do not rewrite the copy to imply the shown Forecast / Readiness / 실패 시 사망 위험 is a post-supply recalculation.

## ANCHORED HELP ROUTING

Exact Player-facing SALE Help for 전투 전망 / 환경 대응 / 실패 시 사망 위험 is owned by
COPY_AUDIT_APPROVED_v2.8.0.md.

보급 / 피로 explanation:
    필요량을 채우고 남은 보급은 출발 전 현재 피로를 먼저 줄입니다.
    그래도 남으면 귀환 후 쌓이는 피로를 줄입니다.

## LOYALTY COPY BOUNDARY

Normal SALE shows only the compact Loyalty value/state and no separate Loyalty `?`.

Exact normal-SALE, tutorial/coach and compact global Help wording is owned by
COPY_AUDIT_APPROVED_v2.8.0.md.

Do not append Store Support/Boss condition detail to the normal SALE state.
Boss-specific information must obey its reveal boundary.

## DEEP EXPEDITION COPY BOUNDARY

The first contextual tutorial may explain the system.
Repeat surfaces use the compact exact copy owned by COPY_AUDIT_APPROVED_v2.8.0.md.

Do not repeat the full Hazard/cost/growth/store-income tutorial paragraph on every Morning and again
inside SALE.

## NIGHT HERO FEEDBACK

Use the short proven-result grammar owned by NIGHT_CLOSING_v2.8.0.md and the exact active copy in
COPY_AUDIT_APPROVED_v2.8.0.md.

Do not use generic 위험 감소 as Hero feedback.

## NIGHT REACTION SELECTOR

Living reaction selection priority:

    avoided death / rescue
    -> 중상
    -> 부상
    -> 퇴각
    -> growth
    -> ordinary living return

Item presence alone is not a selector.
Remove supplied as a Primary selector.

Environment flavor may be used only where it does not override the actual Outcome priority.
Death uses narration, not quoted living dialogue.

## FIRST STORE SUPPORT COPY BOUNDARY

Exact DAY 0 first-support copy is owned by COPY_AUDIT_APPROVED_v2.8.0.md.

The candidate price/state communicates the free first choice, and the flow itself requires a
selection. The D0 Boss objective belongs to the separate Boss-information beat after the first
support choice; it is not embedded on the Store Support surface.

## SALE COPY BOUNDARY

Exact selected-Item headings, conditional-effect labels, forecast Help and global Help text are owned
by COPY_AUDIT_APPROVED_v2.8.0.md.

Direct and derived changed rows remain readable under the current single-heading structure.
Internal markers such as `potion` are never Player effects.

## RESULT CAUSALITY COPY

NIGHT may describe:
- Supply pre-expedition recovery actually applied
- Supply outcome-Fatigue buffer actually consumed
- First Aid Kit Aftercare actually changed persistent Injury state
- existing proven Item/Trait/Event contributions

Do not diagnose a loss with unproven statements such as:
- `전투력이 부족했다`
- `독 대응이 부족했다`

when the resolved report cannot prove that exact cause.

## EVENT COPY ROUTING

Event mechanic truth -> EVENT_v2.8.0.md
Exact approved Event Function / Flavor text -> COPY_AUDIT_APPROVED_v2.8.0.md

### EVENT 05

Mechanic ownership -> `EVENT_v2.8.0.md`.


Required mechanic truth:
- Potion-category buy-price pressure
- current-day Potion buy price +35%
- retired `마석 가격 폭등` / `Special 매입가 +35%` wording is forbidden

Exact player-facing Function / Flavor -> `COPY_AUDIT_APPROVED_v2.8.0.md` §13-5.

Do not maintain a second exact Event-copy list here.

## TRAIT / CURRENCY / SETTINGS COPY ROUTING

Exact active Trait-effect labels, Store Capital display text and Settings localization are owned by
COPY_AUDIT_APPROVED_v2.8.0.md.

Use mathematically truthful weighting terms such as 재방문 가중치 where replacing them with 확률
would be false.

The reproducibility Seed control remains developer/debug functionality and does not appear in the
ordinary Player pre-Run surface.

## BOSS / META COPY BOUNDARY

Boss fixed Player-facing names follow BOSS exactly.
Do not rename `색욕` to a softer synonym or substitute another sin label.

Boss reveal copy follows the same DATA / FUNCTION / FLAVOR split used elsewhere:
- D5 = identity + short FLAVOR; Trait Function remains hidden
- D15 = exact Trait FUNCTION + necessary current DATA

Do not attach separate strategy advice to the D15 rule explanation.
The game gives the ingredients; the Player decides the response.

Player-facing Boss copy must not use internal design/runtime terms such as:
- Run
- Relic Window
- Final Snapshot
- Final Power
- Factor
- Modifier
- sealBreakCount
- effectiveBossPower

when an approved world/player term exists.

### BOSS INFORMATION COPY ROUTING

Exact D0 / D5 / D10 / D15 / D20 / D25 Player-facing Boss information copy is owned by
COPY_AUDIT_APPROVED_v2.8.0.md.

Reveal timing and information ownership remain governed by BOSS_v2.8.0.md.

Retained current copy (`COPY_AUDIT_APPROVED_v2.8.0.md` §14-2 / §14-4 / §23): the six non-GLUTTONY D5 Flavor lines and the D15 Trait names / Function lines below.

### Final Family / Hazard reveal timing

Current timing is:

```text
D25 = exact persisted Final Family Pair / Hazard Pool reveal
D30 = reuse the already-known persisted state; no new Family reveal/reroll
```

If the existing `최종 정찰 보고` header/copy block is reused, it belongs to the D25 disclosure beat rather than a new D30 reveal.
Do not add a second D30 Family-intro copy that implies newly generated information.

### D5

Header / Label / Button and GLUTTONY Flavor -> `COPY_AUDIT_APPROVED_v2.8.0.md` §14-2.

#### 분노의 마왕 래스

> 공성추도 없이 성문이 안쪽으로 무너졌다.

#### 오만의 마왕 프라이드

> 검은 갑주에는 아직 흠집 하나 남지 않았다.

#### 질투의 마왕 엔비

> 승전 보고서마다 가장 빛나던 이름 하나가 붉게 지워져 있었다.

#### 탐욕의 마왕 그리드

> 금고가 빈 마을일수록, 놈의 군세는 이상할 만큼 강했다.

#### 색욕의 마왕 러스트

> 오래 손발을 맞춘 자들만 서로의 이름을 잊지 않았다고 한다.

#### 나태의 마왕 슬로스

> 놈은 움직이지 않았다. 몸을 얽은 봉인만이 낮게 울리고 있었다.

D5 Flavor:
- Trait을 암시할 수 있다
- exact Function을 공개하지 않는다
- 별도 전략 조언을 붙이지 않는다

### D15

Header / Intro / Button and GLUTTONY exact Function -> `COPY_AUDIT_APPROVED_v2.8.0.md` §14-4.

#### 분노의 마왕 래스

**특성 — 특수 효과 없음**

> 별도의 변칙은 확인되지 않았다.  
> 래스는 순수한 전력으로 맞선다.

#### 오만의 마왕 프라이드

**특성 — 오만의 갑주**

> 최종전에서 모든 출전자의 투력이 감소한다.  
> 강인함·기동·정신은 그대로 적용된다.

#### 질투의 마왕 엔비

**특성 — 질투의 시선**

> 최종전에서 가장 크게 기여하는 모험가 한 명이 표적이 된다.  
> 표적의 투력·강인함·기동·정신은 최종전 동안 감소한다.

#### 탐욕의 마왕 그리드

**특성 — 탐욕의 장부**

> 최종전까지 누적 총매출이 목표에 미달하면, 부족한 만큼 그리드가 강해진다.  
> 강화에는 한도가 있으며, 목표를 넘겨도 추가 이득은 없다.

DATA:

```text
목표 매출      [value]G
현재 매출      [value]G
달성률         [value]%
탐욕 강화      +[value]%
```

#### GLUTTONY / 탐식

Internal ID remains `GLUTTONY`.
Player-facing identity follows `BOSS_v2.8.0.md`:

```text
탐식
탐식의 마왕 글러트니
```

All `폭식 / 폭식의 마왕 글러트니 / 폭식의 권능` wording is stale.

Current mechanic truth is:
- all positive Core-Stat contribution originating from Items is reduced to 50%
- Hazard Counter / Supply / Insurance / Utility / harmful RiskReward penalty are unaffected

Exact D15 Trait name:

```text
탐식의 권능
```

Do not reuse the old Rare+-based sentence.

#### 색욕의 마왕 러스트

**특성 — 매혹의 권능**

> 단골이 아닌 출전자는 최종전에서 투력·강인함·기동·정신이 모두 감소한다.  
> 단골은 영향을 받지 않는다.

#### 나태의 마왕 슬로스

**특성 — 나태의 봉인**

> 슬로스에게는 세 개의 봉인이 남아 있다.  

Opportunity / Seal lines -> `COPY_AUDIT_APPROVED_v2.8.0.md` §14-5.
Use 점포지원 consistently in all active Player-facing SLOTH lines.

### D25 — 최종 정찰 보고

Header / Intro -> `COPY_AUDIT_APPROVED_v2.8.0.md` §14-7.

Then show the two selected Family names and each Family's actual T2 Hazard pressure information.

Authoritative Hazard wording:

```text
독 · 강인함 압박
속박 · 기동 압박

부식 · 강인함 압박
진창 · 기동 압박

화염 · 강인함 압박

공포 · 정신 압박
어둠 · 정신 중심 + 기동 보조 압박

냉기 · 강인함 압박
화이트아웃 · 정신 중심 + 기동 보조 압박
```

Button:

> 확인

Do not add a strategy-summary sentence after these facts.
The information itself is the decision material.

### Meta copy

Meta copy:
- use Job Mastery / 직업 숙련 language consistently with META
- do not present legacy Global Meta XP as current progression
- Monster Knowledge progress remains `보급 생환 N회`


## COPY QA

문자열만 따로 읽고 끝내지 않는다.
실제 Playthrough 화면 흐름에서 확인한다.

확인:

- DATA를 불필요하게 문장으로 바꿨는가?
- Function과 Flavor가 섞였는가?
- Item의 실제 Effect / Counter / Penalty가 Flavor 때문에 묻혔는가?
- System이 너무 수다스러운가?
- Tutorial이 App Onboarding처럼 보이는가?
- Button이 추상적인가?
- NPC가 모두 같은 작가처럼 말하는가?
- 같은 NPC가 같은 문장을 계속 반복하는가?
- 사망 / 부상 등이 항상 같은 Flavor로 출력되는가?
- 모든 화면에 억지 Joke가 있는가?
- 같은 Sentence Rhythm이 반복되는가?
- AI식 Design 설명 문장이 남아 있는가?
- Result가 Debug Log처럼 보이는가?
- 중요한 Result가 너무 평평한가?
- Meme / Easter Egg가 관련 NPC / Context 없이 출력되는가?
- Reference 때문에 새 시스템이 생겼는가?
- Copy 때문에 기존 Gameplay Rule이나 Balance가 달라졌는가?
- normal NPC Name Pool이 한국식+판타지+유쾌한 비틀기보다 서양 High-Fantasy 이름에 치우쳤는가?
- 이름이 Random Syllable Soup 또는 억지 Meme 목록처럼 보이는가?
- Monster Knowledge 진행도가 아직 `관찰 N회`로 표시되는가?
- D5 Boss Flavor가 Trait을 암시하되 exact Function을 미리 공개하지 않는가?
- D15 Boss copy가 실제 Trait effect를 정확히 말하고 별도 공략 조언으로 대체하지 않는가?
- Player-facing Boss copy에 Run / Final Snapshot / Factor / Modifier 같은 내부 설계어가 노출되는가?
- ENVY 문구가 능력치 감소가 최종전 동안 유지됨을 명확히 하는가?
- LUST가 `비단골=4 Stats 감소 / 단골=영향 없음`으로 정확히 설명되는가?
- 최종 정찰 보고가 실제 두 Family의 T2 Hazard pressure를 그대로 보여주며 별도 공략문을 덧붙이지 않는가?
- exact signal remains `대성공을 노려볼 만합니다.`
- `심층원정` term is not replaced by a synonym
- Run abandon never promises XP/settlement/reward
- Deep copy never promises Store cash payout

## FINAL COPY FILTER

새 Text마다 순서대로 묻는다.

### Q1. 반드시 알아야 하는 정보인가?

YES  
→ DATA / FUNCTION으로 명확하게 쓴다.

### Q2. 없어도 Rule 이해에는 문제가 없는가?

YES  
→ Flavor 후보.

### Q3. 세계 / Character / 사건을 실제로 더 기억하게 만드는가?

NO  
→ 삭제.

### Q4. 기존 Function을 다른 말로 다시 설명하는가?

YES  
→ 삭제.

### Q5. 웃기려고 애쓰는 문장처럼 보이는가?

YES  
→ 정상 문장으로 되돌린다.

### Q6. 반복 NPC 상황에서 항상 같은 한 줄만 나오게 되는가?

YES  
→ NPC Dialogue / Result Variation 대상인지 확인한다.

## FINAL GOAL

Player가:

> "게임 설명서를 읽은 느낌"

보다:

> "길드24에서 며칠 일한 느낌"

을 받아야 한다.

대부분은 정상적인 판타지 편의점이다.

가끔 현실 편의점 같은 생활감이 보인다.

더 드물게 재치 있는 상품 패러디가 보인다.

아주 드물게 Rare Reference NPC를 발견한다.

모르면 그냥 세계 속의 일이다.
알면 한 겹 더 재미있다.

**세계가 먼저다.**

**재치와 패러디는 발견물이다.**
