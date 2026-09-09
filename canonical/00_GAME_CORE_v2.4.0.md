# 00_GAME_CORE

DOC=00_GAME_CORE
OWNER=game_core,core_fantasy,core_loop,system_ownership

DOC_VERSION=2.4.0
CANONICAL_SET=GUILD24_CANONICAL_v2.4.0


## BRAND
brand=GUILD24 / 길드24
slogan=`던전 가기 전, 길드24.`
parent=길드리테일

## ONE-LINE
《던전 앞 편의점》 = RPG 세계를 편의점 카운터 뒤에서 플레이하는 턴제 경영 로그라이트.

## CORE FANTASY
플레이어는 용사가 아니라 던전 앞 `GUILD24` 점주다.

직접 싸우지 않는다.
대신 모험가가 원정을 떠나기 전에:
- 무엇을 준비해 둘지
- 누구에게 무엇을 팔지
- 얼마에 팔지

결정한다.

그 선택이 모험가의 생환/부상/죽음, 성장, 재방문, 그리고 Run 후반의 전력에 누적된다.

## CORE LOOP

MORNING — `오늘 어떤 날인가?`
- 오늘의 상황/게이트/위험/이벤트를 읽는다.

ORDER — `무엇을 준비할까?`
- 제한된 Gold와 재고 공간으로 상품/수량/현금 여유를 결정한다.

SALE — `이 손님에게 무엇을, 얼마에 팔까?`
- NPC의 상태/성격/성장/목적지를 보고 상품과 가격을 정한다.
- 현재 이익과 NPC 미래가치를 동시에 판단한다.

NIGHT — `내 선택이 어떻게 됐을까?`
- 원정 결과와 판매/준비의 실제 영향을 확인한다.

CLOSING — `오늘 장사는 어땠을까?`
- 매출/비용/손익을 정리하고 다음 날 판단으로 연결한다.

## CORE FUN
핵심은:
`관찰 → 추론 → 선택 → 결과 확인 → 다음 선택에 반영`

정답 계산보다 불완전한 정보에서의 판단이 중요하다.

지향 감정:
- `이 정도면 괜찮겠지?`
- `이거 하나 더 챙겨줘야 하나?`
- `비싸게 팔아도 사려나?`
- `지난번에 다쳤던 애네.`
- `처음엔 약했는데 많이 컸네.`
- `그때 하나 더 팔 걸.`

## EMOTIONAL CORE
Run에서 가장 기억에 남아야 하는 것은 `모험가`다.

플레이어가 몇몇 NPC를:
- 기억하고
- 약점/성격을 파악하고
- 반복해서 만나고
- 성장시키고
- 다치면 걱정하고
- 살아 돌아오면 안도하고
- 죽으면 손실을 느끼는

관계가 자연스럽게 생겨야 한다.

정상 Run 중후반에는 약 `2~4명`의 믿을 만한 단골이 생기는 느낌을 목표로 한다.

## STORE / ROGUELITE CORE
경영과 Roguelite Build는 NPC Loop와 분리되지 않는다.

장기 흐름:
발주
→ 판매/가격
→ 현재 Gold 또는 NPC 투자
→ 원정 결과
→ 성장/Wallet/Loyalty/Revisit
→ 미래 고객 가치
→ Gold 축적
→ Relic 투자
→ 점포 Build 변화
→ 이후 발주/판매 전략 변화
→ 후반 고객 Pool / Final Expedition 변화

Player가 Run을 끝낸 뒤:
`이번 판은 어떤 편의점이었는가`
를 설명할 수 있어야 한다.

Run Variation의 중심은 단순 NPC Rarity가 아니라
Player가 선택한 Store Build와 그 안에서의 운영 판단이다.

## INFORMATION PRINCIPLE
`재료는 공개, 공식은 숨김.`

플레이어가 볼 수 있어야 하는 것:
- NPC의 판단용 Stat/상태
- Item의 실제 주요 효과
- 알려진 Hazard
- Trait의 실제 의미
- 정성적 Expedition Forecast
- 발주용 다음날 Dungeon Tier 실제 확률

숨기는 것:
- 정확한 성공확률
- 정확한 사망확률
- 내부 계수/Threshold
- 최종 정답을 대신 계산하는 단일 안전점수

준비는 `확신`을 높여야 하지만 `확정`을 만들지는 않는다.

## SYSTEM OWNERSHIP
JOB = Base Stats + Growth
TRAIT = Character Variation
RELIC = Store Build
ITEM = Expedition Preparation
DUNGEON = Stat/Hazard Puzzle
FORECAST = 판단 재료
EVENT = Daily Decision Modifier
FINAL = Run Culmination
COPY = Player-facing Voice / Expression

각 시스템은 다른 시스템의 역할을 불필요하게 침범하지 않는다.

## DESIGN JUDGMENT
새 아이디어/수정안은 먼저 확인한다.

1. Core Loop의 판단을 더 재미있게 만드는가?
2. 의미 있는 Player Decision을 만드는가?
3. NPC 애착 또는 경영 판단을 강화하는가?
4. 기존 시스템으로 해결 가능한가?
5. 복잡성 증가가 재미 증가보다 큰가?

기본 우선순위:
`ADD`보다 필요하면 `REMOVE / MERGE / CLARIFY / REBALANCE`

기능 수 증가 자체를 게임 발전으로 보지 않는다.

## RUN GOAL
하루의 작은 경영/판매 판단이 30일 동안 누적되어:
- 가게의 운영 스타일이 달라지고
- 반복 방문 NPC가 성장하며
- 최종 원정이 그 Run 전체의 결과처럼 느껴져야 한다.

세부 규칙/수치/구현 상태는 각 Canonical System Spec을 따른다.
