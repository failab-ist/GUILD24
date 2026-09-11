# SALE

DOC=SALE
OWNER=sale,customer,price,refusal,purchase_flow

DOC_VERSION=2.5.0
CANONICAL_SET=GUILD24_CANONICAL_v2.5.0


## KEY

customerFlow=oneAtATime
inventoryView=allSellable
priceModes=[50%,100%,150%]

consumerSlots:
base=2
Lv10+=3

destination:
playerFacingLabel=예상 목적지
defaultExpectedEqualsActual=YES
explicitTraitOrEventMayVary=YES

normalFreeSale=NO
exactSuccessProb=HIDDEN
exactDeathProb=HIDDEN

coreQuestion:
`이 손님에게 무엇을, 얼마에 팔까?`

## ROLE

SALE =
게임의 핵심 개별 판단 구간.

Player는 한 NPC씩 보고:

- 누구인가
- 어디에 가는가
- 무엇이 약한가
- 무엇을 준비시키는가
- 얼마에 파는가
- 지금 돈을 벌 것인가
- 장기적으로 투자할 것인가

를 결정한다.

핵심 긴장:
`현재 Margin vs NPC 미래가치`

## CUSTOMER FLOW

Sale은 한 번에 한 Customer를 처리한다.

Flow:
customerEnter
→ inspect
→ selectItem
→ selectPrice
→ purchase/refusal
→ remainingSlotDecision
→ finalizeCustomer
→ nextCustomer

The purchase/refusal result may inform the next remaining-slot decision.
Therefore do not batch the whole Customer into a single irreversible cart action
if that removes this sequential decision.

한 Customer의 판매가 완료되기 전
다음 Customer의 상세 정보를 미리 공개하지 않는다.

## CUSTOMER INFORMATION

Customer 등장 시 Player가 판단에 필요한 정보를 확인할 수 있어야 한다.

Minimum readable info:
- name / identity
- Job
- level
- 4 Stats
- Traits
- current injury/fatigue/condition
- destination
- current bag / purchased items
- consumer slots remaining

Exact layout:
-> UI_UX

## PRE-REVEAL BOUNDARY

Morning/Order에서 공개 가능:
- 오늘 방문 예정 인원

미리 공개하지 않음:
- 이름
- Job
- Trait
- Wallet
- 목적지 정보

Customer로 실제 등장한 시점부터
introduced/notebook 등록 가능.

Canonical NPC rule:
-> NPC_TRAIT

## DESTINATION

Player-facing label:
`예상 목적지`

Default:
- expected destination = actual assigned destination
- destination is random among eligible open Gates according to NPC_TRAIT

Canonical uncertainty:
- an explicitly defined Trait may alter what the NPC reports without changing actual destination
- an explicitly defined Event may change actual destination while leaving the earlier expected destination as the player-facing expectation
- no other system may silently falsify destination information

On `게이트 순례주간`:
- Sale still shows the NPC's expected destination
- affected NPC identity and changed actual destination remain hidden
- Night reveals actual changed destination for affected NPCs

System must not auto-route NPC to:
- best Job fit
- best Stat fit
- safest Dungeon
- hardest Dungeon

Canonical routing / information reliability:
-> NPC_TRAIT
-> EVENT

## INVENTORY VIEW

Sale 화면에는 현재 판매 가능한 Inventory 전체를 보여준다.

Rule:
inventoryVisibility != consumerSlotLimit

즉:
모든 판매 가능 상품을 보여주되
NPC가 실제로 구매 가능한 개수는 Consumer Slot이 제한한다.

Same Item:
stack display=YES

Player chooses:
item type

Consumed physical unit:
nearest expiry first

Canonical inventory/item:
-> ITEM
-> CORE_RUN

## CONSUMER SLOT

baseSlots=2

Lv10+:
slots=3

Consumer Slot은
한 방문에서 해당 NPC가 구매 가능한 Item 개수 제한이다.

Do not:
- hide inventory because slot is low
- allow infinite item sales
- create extra slot rules by hidden Job/Trait unless explicitly canonical

## ITEM SELECTION

Player must be able to compare relevant Item information
without leaving Sale repeatedly.

Useful decision info may include:
- major Stat effect
- Counter effect
- Condition effect
- Insurance behavior
- explicit penalty
- sell price at current selected mode

Exact UI:
-> UI_UX

## PRICE SELECTION

Normal sale price modes:

50%
100%
150%

No normal:
- free
- service
- 25%

A zero-price action exists only when another Canonical rule explicitly defines it.
It is not a normal Sale price mode.

Canonical economy:
-> ECONOMY_ORDER

## PRICE ROLE

### 50%
- lower current Margin
- easier purchase
- NPC investment

### 100%
- stable default trade

### 150%
- higher current Margin
- higher refusal risk

Player should understand the role difference
without seeing exact purchase probability.

## PURCHASE DECISION

Purchase logic may consider:
- Wallet
- price resistance
- Item need/interest
- Loyalty
- visible Trait effects
- explicit Relic effects
- other canonical visible systems

Hidden Job-based purchase bonus=NO

Exact purchase probability=HIDDEN

## REFUSAL

Refusal reason must match actual Engine reason.

Player-facing valid reasons include:
- 돈이 부족함
- 가격이 너무 높음
- 이 물건은 필요하지 않음

Do not use vague intermediate copy
that obscures what happened.

Logical retry rules:

### insufficient wallet
If 50% is unaffordable:
same Item at 100/150 is not a meaningful retry.

### price resistance
If 150% is refused because price is too high:
100/50 may remain available.

### item not wanted
Lowering price does not guarantee purchase.

Refusal state must not incorrectly block
other logically valid choices.

## PREVIEW

Item selection should preview direct, player-readable changes where useful.

Examples:
- 투력 +X
- 강인함 +X
- 독 대응 +X
- 피로 변화
- 보험 효과

Preview must not expose:
- exact expedition success %
- exact death %
- internal formula
- fake master safety score

Canonical information principle:
-> 00_GAME_CORE

## FORECAST

Sale may show qualitative expedition forecast.

Combat:
[우세,접전,불리]

Hazard:
[취약,불안,대응,충분]

No single final safety score.

Forecast is:
estimate, not guarantee.

Canonical Dungeon:
-> DUNGEON_HAZARD

## PRICE / ITEM COMMIT

A confirmed purchase must atomically update:
- NPC Wallet
- Player Gold
- Inventory physical unit
- NPC purchased bag
- Consumer Slot
- Loyalty/relationship effects if applicable
- sale/history record

Avoid partial state where:
Gold changed but stock did not,
or stock changed without purchase state.

## SALE FINALIZATION

When Customer is finalized:
- selected purchases are locked
- actual destination remains fixed
- expedition prep is committed
- Customer proceeds to later Night resolution

After finalization:
normal management actions must not retroactively alter
this Customer's committed expedition setup.

## NO-SALE CHOICE

Player may choose to sell nothing.

This is a valid strategic choice.

Potential benefit:
- preserve stock
- preserve cash/inventory strategy
- avoid low-margin sale

Potential cost emerges from existing systems:
- NPC may be less prepared
- future customer value may be lost
- long-term roster strength may fall

Do not require a separate punishment subsystem
solely because Player sold nothing.

## RELATIONSHIP

Paid purchases may affect Loyalty according to
canonical NPC/economy rules.

50%:
future-value investment direction

150%:
higher current-profit direction

Free/Event actions:
must not create repeatable Loyalty farming.

Canonical:
-> NPC_TRAIT
-> ECONOMY_ORDER

## SALE INFORMATION HONESTY

Player-facing text must reflect actual state.

Do not:
- claim an Item is required when it is not
- imply guaranteed survival
- blame blocked Hazard for unrelated failure
- show a destination as certain if Engine state is not certain
- hide a materially important Trait effect

Rule:
`Player가 보는 정보와 실제 성능이 최대한 정직하게 연결되어야 한다.`

## MOBILE / INTERACTION

Sale is a high-frequency interaction phase.

Design goal:
preserve meaningful Item/price/remaining-slot decisions
while reducing repeated reading and navigation cost.

Requirements:
- NPC detail readable in vertical stack on mobile
- returning NPC shows relevant since-last-visit changes/history prominently while full profile remains accessible
- inspect -> Item -> price -> result -> next-slot flow should stay continuous without unnecessary page/modal round trips
- avoid redundant confirmation steps and mandatory long animations for routine sales
- no tiny multi-column compression
- repeat actions use practical touch targets (~44px class)
- price choice and item choice stay visually clear
- primary action remains obvious

Do not solve pacing by removing a decision that can change after a purchase/refusal result.

Detailed presentation:
-> UI_UX

## QA

Acceptance criteria:
- CORE_RUN_QA_v2.5.0.md
- ECONOMY_ORDER_QA_v2.5.0.md
- NPC_TRAIT_QA_v2.5.0.md
- UI_UX_QA_v2.5.0.md

## RELATED

game philosophy -> 00_GAME_CORE
npc/trait/destination -> NPC_TRAIT
item/inventory -> ITEM
price/wallet -> ECONOMY_ORDER
dungeon forecast -> DUNGEON_HAZARD
run/phase -> CORE_RUN
night result -> NIGHT_CLOSING
presentation -> UI_UX


## CROSS-SYSTEM REVENUE SIGNAL

Committed sale revenue contributes to Canonical Cumulative Gross Sales owned by ECONOMY_ORDER.
BOSS/GREED may read that metric; SALE does not create a Boss-only sales counter.
