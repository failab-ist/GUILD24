# COPY_WORLD_VOICE

DOC=COPY_WORLD_VOICE
OWNER=copy,voice,flavor,dialogue,terminology,culture

DOC_VERSION=2.2.0
CANONICAL_SET=GUILD24_CANONICAL_v2.2.0

> Player-facing Copy / Terminology / Flavor / NPC Voice / Culture Reference의 Canonical.
>
> 이 문서는 Gameplay Rule / Balance / Item Effect / Trait Function / NPC progression을 변경하지 않는다.
> 현재 게임 위에서 정보 전달을 명확하게 유지하면서 GUILD24의 생활감, Character, 재치를 만든다.

# 0. MUST READ FIRST — NON-NEGOTIABLE

## 0.1 Copy는 세 역할로 분리한다

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

## 0.2 기본 Voice

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

## 0.3 Copy 때문에 새 시스템을 만들지 않는다

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

# 1. OWNERSHIP / CROSS-SPEC BOUNDARY

COPY_WORLD_VOICE는 Gameplay Content의 소유 문서가 아니다.

다음 Rule은 기존 Canonical이 계속 소유한다.

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

## 1.1 Item boundary

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

## 1.2 NPC boundary

NPC gameplay identity / Trait behavior / History / Revisit / Death / Injury Rule은 NPC_TRAIT 및 관련 Spec을 따른다.

COPY는:

- 무엇을 저장할지 새로 정하지 않는다.
- 새 Relationship System을 만들지 않는다.
- 가짜 History를 만들지 않는다.
- 실제 사용할 수 있는 현재 데이터 안에서 문장만 선택한다.

Returning NPC의 history/change를 어디에 어떻게 보여줄지는 UI_UX가 소유한다.
COPY는 그 안에서 사용되는 문장 Voice만 소유한다.

# 2. PLAYER COPY MATRIX

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

# 3. PLAYER-FACING TERMINOLOGY

Source 내부 이름과 Player UI 용어를 구분한다.

- `combat` = **투력**
- `survival` = **강인함**
- `mobility` = **기동**
- `spirit` = **정신**

실제 싸움 / battle 자체는 **전투**라고 쓴다.

내부 계산용:

- Power
- Party Power

는 Director / Work 내부 표현으로 사용할 수 있다.
Player에게 별도 능력치로 노출하지 않는다.

# 4. DATA — 사실은 표시한다

DATA는 "쓰는 것"이 아니라 **표시하는 것**이다.

숫자 / 상태 / 확률로 정확하게 표현할 수 있다면 게임이 대신 해석해서 문장으로 바꾸지 않는다.

## GOOD

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

## BAD

> 내일은 상급 게이트 비중이 높다.

> 현재 모험가는 전투에서 우위를 점하고 있다.

이미 정확한 정보를 보여줄 수 있는데 AI가 Player 대신 해석하지 않는다.

# 5. FUNCTION — 기능은 정확하게 쓴다

FUNCTION은:

> "이게 무엇이고 Gameplay에 어떤 영향을 주는가"

를 정확하게 전달한다.

말맛보다 정확성이 우선이다.

- Rule을 모호하게 만들지 않는다.
- 효과를 문학적으로 표현하지 않는다.
- 실제 Penalty / Tradeoff를 숨기지 않는다.
- 의미 없는 수식어를 붙이지 않는다.
- Design을 해설하지 않는다.

## GOOD

### 허세

실제 목적지와 다른 정보를 말할 수 있다.

### Item Effect

공포 대응 증가  
기동 감소

### 가맹 효과

발주 횟수 +1  
매입가 +5%

## BAD

> 강력한 공포 대응 효과를 제공하지만 기동 부담을 전략적으로 고려해야 한다.

# 6. FLAVOR — 설명이 아니라 기억

FLAVOR는 없어도 Gameplay Rule 이해에는 문제가 없어야 한다.

목적은 다음 중 하나다.

- Character
- 생활감
- 작은 사건
- 사용감
- 세계의 문화
- 재치

Flavor는 Function과 분리한다.

## GOOD

> 용 그림은 장식이 아니다.

> 뚜껑이 잘 안 닫힌다.

> 오늘까지.

> 늘 먹던 걸로.

## BAD

> 냉기 위험에 효과적인 매운 음식이다.

Function을 다른 말로 반복했을 뿐이다.

## 6.1 Flavor 우선순위

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

## 6.2 Trait Flavor

Trait에는 Flavor가 필수가 아니다.

Trait 이름 + 정확한 Function만으로 Character가 충분히 생길 수 있다.
좋은 문장이 있을 때만 추가한다.

## 6.3 Item Flavor

Item Flavor는 "판타지 세계의 편의점 상품"이라는 정체성을 강화한다.

좋은 Item Flavor는:

- 한 가지 사용감
- 한 가지 상품 특징
- 한 가지 생활 관찰
- 한 가지 짧은 재치

중 하나만 잡는다.

Order / Sale의 핵심 판단 정보보다 앞서지 않는다.
Flavor 때문에 실제 Effect / Counter / Penalty를 찾기 어려워지면 실패다.

# 7. VOICE — 실제 작성 기준

"담담하게" 같은 추상 지시만으로 끝내지 않는다.
아래 Anchor를 직접 따른다.

## 7.1 정상 문장이 대부분이다

GOOD:

> 독거미 동굴이 열렸다.

> 포션 품절.

> 세아린이 돌아왔다.

> 발주 완료.

평범한 Text가 대부분이어야 드문 재치가 기억된다.

## 7.2 Joke를 설명하지 않는다

BAD:

> 계산은 끝났지만 손님은 아직 가지 않고 있습니다. 아무래도 할 말이 있는 것 같습니다.

BETTER:

> 계산은 끝났다.  
> 손님은 아직 안 갔다.

농담이 왜 웃긴지 설명하지 않는다.

## 7.3 문장 Rhythm을 균일하게 만들지 않는다

가능:

> 오늘까지.

> 독. 속박.

> 늘 먹던 걸로.

> 뚜껑이 잘 안 닫힌다.

모든 문장을 동일한 길이 / 동일한 문법으로 맞추지 않는다.

## 7.4 NPC Character는 말끝보다 "무엇을 말하는가"로 만든다

겁쟁이:

> 귀환석 있습니까?

절약가:

> 더 싼 건 없어요?

단골:

> 늘 먹던 걸로.

대식가:

> 먹을 건 이게 다예요?

억지 Accent / 말끝 변형으로 Character를 만들지 않는다.

## 7.5 AI식 Copy 금지

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

## 7.6 SaaS / App 문체 금지

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

# 8. WIT / CULTURE PLAYBOOK

재치를 추상적으로 "센스 있게" 쓰지 않는다.
문화 표현은 밀도를 나눈다.

## 8.1 LEVEL 1 — 편의점 생활문화

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

## 8.2 LEVEL 2 — 현실 상품 패러디

핵심 Item의 체감 약 15–20% 이하.

단순히 이름만 비틀지 않는다.

구조:

**현실 상품의 특징  
→ 판타지식 변형  
→ 이미 존재하는 Gameplay Effect**

방향 예:

### 생수 계열

현실의 지역 수원지 이미지를 판타지 산맥 / 수원지로 변형.

> 세 봉우리 아래에서 올라온 물이라고 한다.

### 가성비 도시락 계열

내용물이 꽉 찬 상품 Character.

> 뚜껑이 잘 안 닫힌다.

### ITEM의 `불룡볶음면`

현재 ITEM의 실제 Identity인 Food / Supply / 투력 support / Cold flexibility와 연결되는 방향:

> 용 그림은 장식이 아니다.

### 크림빵 계열

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

## 8.3 LEVEL 3 — Game / eSports / Internet Easter Egg

전체 체감 약 1–2% 이하.
한 Run에 하나도 없어도 정상이다.

이번 Copy Canonical에서 직접 다루는 LEVEL 3은:

**희귀 Reference NPC + 해당 NPC 전용 Easter Egg**

이다.

독립형 Rare Easter Egg Event의 Trigger / Effect / Event-specific Reveal Copy는 EVENT가 소유한다.
COPY_WORLD_VOICE는 그 Event의 전역 Voice / Context 원칙만 제공하며, 이 문서만으로 새 Event를 추가하지 않는다.

# 9. RARE REFERENCE NPC

Player-facing Name Voice는 COPY_WORLD_VOICE가 소유한다.
NPC의 Gameplay generation / stats / traits / progression은 NPC_TRAIT가 소유한다.

일반 Name Pool 안에 극히 낮은 확률로 다음 Rare Reference Name을 포함할 수 있다.

초기 승인:

- 요화니우스
- 상혀크
- 진호르

모르는 Player에게는 그냥 Fantasy NPC 이름처럼 보여야 한다.

Reference NPC 이름 자체가 첫 번째 Easter Egg다.
관련 Special Copy는 **해당 NPC가 실제 Run에 존재할 때만** Eligible하다.

관련 NPC가 없는 Run에서 전용 Meme을 일반 System Message나 다른 NPC에게 출력하지 않는다.

## 9.1 요화니우스 — 임요환 / 3연벙 계열

핵심은 숫자 `3` 자체가 아니다.
같거나 매우 유사한 행동이 실제로 세 번 반복되는 Context가 핵심이다.

BAD:

- DAY 3이라서 출력
- 상품 3개라서 출력
- 세 번째 NPC라서 출력
- 능력치가 3이라서 출력

사용 조건:

1. 요화니우스가 실제 Run에 존재한다.
2. 요화니우스와 관련된 같거나 매우 유사한 행동이 실제로 세 번 반복된다.
3. 현재 Source가 이미 보유한 History만으로 이를 정확히 판정할 수 있다.

Copy 방향:

> 설마 세 번은 아니겠지.

실제 세 번째 반복:

> 세 번째다.

현재 데이터만으로 정확히 판정할 수 없다면 **요화니우스 이름만 사용하고 Special Copy는 구현하지 않는다.**

새 Counter / History / Save Field를 만들지 않는다.

## 9.2 상혀크 — Faker / 기습숭배 계열

핵심은:

> "상혀크가 잘했으므로 칭찬한다."

가 아니다.

핵심은:

> 평범하고 관계없는 상황에서 갑자기 찬양이 튀어나오는 뜬금없음.

이다.

단, 상혀크가 실제로 존재하는 Run이어야 한다.

### Initial Harness

대상:

- NPC name = 상혀크

출력 위치:

- 기존 Sale 거래 종료 후 / 해당 NPC 퇴장 직전의 현재 출력 Hook

조건:

- 상혀크의 재방문
- 구매 거래 정상 종료
- 기존 Visit Count만으로 단 한 번의 희귀 노출 지점을 만들 수 있을 때

기본 후보:

- 상혀크의 2번째 방문 거래 종료

`2번째` 자체는 Meme 의미가 아니다.
새 Seen Flag 없이 반복 출력만 피하기 위해 기존 데이터를 재사용하는 Harness다.

Copy:

> 문득 타이 상 혀크가 대단하다는 생각이 들었다.

승인된 대체 방향:

> 젠장. 또 타이 상 혀크입니다.

이 문장은 NPC Dialogue가 아니라 짧은 Narration / System Flavor다.

BAD:

- 상혀크 원정 성공 때마다 출력
- Level Up 때마다 출력
- 좋은 Result 때마다 출력
- 상혀크가 없는 Run에서 출력
- 다른 NPC에게 출력

구조:

**상혀크가 실제 존재  
→ 평범한 순간  
→ 갑작스러운 찬양**

## 9.3 진호르 — 홍진호 / 숫자 2 계열

진호르가 실제 Run에 존재해야 한다.

핵심은 화면 어디엔가 숫자 `2`가 있는 것이 아니다.
**진호르 자신의 현재 상황과 숫자 2가 자연스럽게 연결되어야 한다.**

### Initial Harness

대상:

- NPC name = 진호르

출력 위치:

- 기존 구매 완료 NPC Reaction

우선 조건:

- 현재 거래에서 실제 구매 Item 수 = 2

Copy:

> 두 개요. 두 개.

현재 거래 정보만 사용한다.

반복 노출이 과하면 현재 존재하는 Visit Count와 결합한다.
새 Seen Flag는 만들지 않는다.

추가 후보는 실제 기존 2+1 상황과 진호르의 구매가 자연스럽게 연결될 때만 사용할 수 있다.

금지:

- 진호르가 없는데 DAY 22라서 출력
- 재고가 2라서 출력
- 숫자 2가 아무 곳에서나 보여서 출력
- Reward를 실제 2배로 변경
- Meme 때문에 Balance 변경

# 10. CULTURAL REFERENCE CONTEXT CHECK

새 Reference를 Work가 임의로 추가하지 않는다.
새 후보가 필요하면 Design Candidate로 보고하고 User 승인 후 Canonical에 추가한다.

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

# 11. NPC DIALOGUE & RESULT VARIATION

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

## 11.1 NPC Dialogue Variation

같은 상황에서 NPC가 항상 같은 한 문장만 반복하지 않는다.

대상:

- 일반 방문
- Trait 기반 Dialogue
- 구매
- 구매 거절
- 가격 반응
- 재방문
- Callback

반복 빈도가 높은 기본 상황은 대략 **3–5개의 좋은 Variant**를 우선한다.

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

## 11.2 NPC Result Variation

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

**FLAVOR 후보**

> 돌아오지 않았다.

> 오늘은 돌아오지 않았다.

> 예약해 둔 물건은 그대로 남았다.

> 마지막 영수증만 카운터에 남았다.

History가 필요한 문장은 실제 해당 History가 있을 때만 사용한다.
가짜 과거를 만들지 않는다.

사망이라는 사실은 Flavor로 숨기지 않는다.
DATA로 명확하게 전달하고 Flavor는 별도로 사용한다.

## 11.3 VARIATION HARNESS

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

# 12. CALLBACK

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

# 13. SYSTEM / TUTORIAL / BUTTON

## 13.1 System Message

System은 계속 해설하지 않는다.

예:

> 발주 완료.

> 재고가 가득 찼다.

> 진호르 중상.

> 세아린 Lv.8.

## 13.2 Tutorial

필요한 Gameplay Information은 유지한다.
Copy Polish 때문에 Rule 설명을 빼지 않는다.

App Onboarding 문체를 피한다.

BAD:

> 효율적인 플레이를 위해 게이트 정보를 확인해보세요!

## 13.3 Button

가능하면 실제 행동을 쓴다.

- 발주 확정
- 영업 시작
- 손님 보내기
- 밤 결과 보기
- 마감하기

`확인 / 진행 / 다음`만 반복하지 않는다.

# 14. IMPORTANT RESULT

Copy가 담담하다고 중요한 Result까지 평평하게 만들지 않는다.

중요도는 필요하면 UI_UX의:

- Typography
- Frame / Icon
- Contrast
- 작은 Motion
- Sound

등으로 전달한다.

Copy를 장황하게 써서 Severity를 표현하지 않는다.

# 15. NPC NAME VOICE

NPC 이름도 World Voice의 일부다.

기본 Name Pool은:

- 한국어 화자가 한 번에 읽을 수 있다.
- 현실 한국 실명 그대로는 아니다.
- 의미 없는 Random Syllable Soup을 피한다.
- 특정 접미사를 남발하지 않는다.

Reject:

- 의미 없는 띄어쓰기
- 읽기 어려운 음절
- Random Syllable Soup
- 모든 이름이 `-우스 / -엘 / -리온` 계열

Rare Reference Name도 모르는 Player에게는 자연스러운 Fantasy Name처럼 보여야 한다.

# 16. GLOBAL COPY SCOPE

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

# 17. IMPLEMENTATION GUARDRAIL

Copy 수정 때문에 Source 구조를 먼저 Refactor하지 않는다.

현재 문자열이 dungeon.js / shop.js / run.js / catalog.js 등 관련 로직에 있어도 Copy 작업만을 위해 별도 Dialogue Architecture를 만들지 않는다.

현재 Source가 이미 하는 방식을 재사용하고 가장 작은 변경을 우선한다.

별도 구조는 실제 필요가 생겼을 때만 검토한다.

예:

- Dialogue Variant가 관리 불가능할 정도로 증가
- 여러 시스템의 공용 문자열 중복이 실제 문제화
- 다국어 지원 시작
- 현재 구조에서 유지보수 문제가 실제 발생

# 18. COPY QA

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

# 19. FINAL COPY FILTER

새 Text마다 순서대로 묻는다.

## Q1. 반드시 알아야 하는 정보인가?

YES  
→ DATA / FUNCTION으로 명확하게 쓴다.

## Q2. 없어도 Rule 이해에는 문제가 없는가?

YES  
→ Flavor 후보.

## Q3. 세계 / Character / 사건을 실제로 더 기억하게 만드는가?

NO  
→ 삭제.

## Q4. 기존 Function을 다른 말로 다시 설명하는가?

YES  
→ 삭제.

## Q5. 웃기려고 애쓰는 문장처럼 보이는가?

YES  
→ 정상 문장으로 되돌린다.

## Q6. 반복 NPC 상황에서 항상 같은 한 줄만 나오게 되는가?

YES  
→ NPC Dialogue / Result Variation 대상인지 확인한다.

# 20. FINAL GOAL

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
