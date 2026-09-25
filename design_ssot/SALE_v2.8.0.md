# SALE

DOC=SALE
OWNER=sale,customer,price,bag,sale_decision_ux,great_signal,fatigue_surface,loyalty_surface,refusal,purchase_flow,deep_nomination
DOC_VERSION=2.9.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/SALE_v2.8.0-patch.md,history/SALE_v2.7.0.md,history/SALE_v2.6.1.md,history/SALE_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/SALE.md

## KEY

customerFlow=oneAtATime
inventoryView=allSellable
priceModes=[50%,100%,150%]

destination:
playerFacingLabel=예상 목적지
defaultExpectedEqualsActual=YES
explicitTraitOrEventMayVary=YES

normalFreeSale=NO
exactSuccessProb=HIDDEN

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

## CORE DECISION CONTRACT

Core question remains:
`이 손님에게 무엇을, 얼마에 팔까?`

Before the Player chooses a price, the same decision surface must make readable:
- NPC identity / Job / Level
- 4 core Stats
- active Traits / conditions
- **NPC current Persistent Wallet**
- current purchased Bag / remaining consumer slots
- Expected Destination
- current Gate / Hazard core environment information
- qualitative expedition Forecast
- available sellable stock
- 50 / 100 / 150 sale price
- whether the NPC can afford that price

NPC Wallet is not optional secondary detail.
The Player must be able to judge affordability before committing a price.

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

`finalizeCustomer -> nextCustomer` carries the customer exit-then-entry beat (the current customer exits, then the next arrives with the existing entry). It is presentation only and changes no state (contract -> `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT) (User 2026-09-24, v2.9.0).

The purchase/refusal result may inform the next remaining-slot decision.
Therefore do not batch the whole Customer into a single irreversible cart action
if that removes this sequential decision.

한 Customer의 판매가 완료되기 전
다음 Customer의 상세 정보를 미리 공개하지 않는다.

## COUNTER HANDLING / ACTION LAYER

The ordinary SALE decision should feel like handling two items, not submitting a two-item form.

Canonical sequence per ordinary customer:

```text
choose/focus a Bag slot
-> choose an Item for that slot
-> choose price
-> hand/commit transaction
-> purchase or refusal resolves
-> current state updates
-> judge remaining slot
```

Rules:
- first purchase/refusal resolves before the second slot decision is finished
- do not merge both slots into one cart checkout
- no separate handling minigame/resource/QTE
- Item tap is sufficient for the full flow; drag is optional enhancement only
- the chosen Item is shown on the counter tray (fixed above the dock) with its `판매 후 변화` and the three price keys; the shelf rows never change height (`UI_UX_v2.8.0.md` §SALE — COUNTER TRAY; (User 2026-09-24, v2.9.0))
- the hand/commit step is shown by the transaction beats (presentation only, contract -> `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT); the two Bag slots stay in the customer-state strip beside the status line and remain the handling surface (`UI_UX_v2.8.0.md` §BAG PRESENTATION); tap remains sufficient, no drag is required (User 2026-09-24, v2.9.0)

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
-> UI_UX_v2.8.0.md

## CURRENT CUSTOMER COMPACT STATE

Mobile current-customer state includes:
- Injury state without numeric duplication
- Fatigue
- Loyalty

Example:
    부상 · 피로 8 · 단골도 37

If Loyalty >= 51, show the existing 단골 state/badge.

Normal SALE does not place a separate Loyalty `?` / popover trigger beside this value.
The contextual meaning of Loyalty is taught by the tutorial/coach.
The global compact Help may retain its separately owned reference text.

Equipment text is not part of the compact SALE top strip.
Equipment remains readable in NPC detail and may appear as a proven Core-Stat source.

Bag remains exactly two slots under the NORMAL CONSUMER BAG rule.
Exact compact/mobile layout -> UI_UX_v2.8.0.md.

## FATIGUE AS CURRENT CUSTOMER STATE

(User 2026-09-24, v2.9.0)

Fatigue is visible in the compact current-customer state during SALE.

Normal example:
    피로 2

If a committed purchase reduces departure Fatigue:
    피로 12 -> 출발 8

Do not show:
    성공 N · 퇴각 N · 부상 N

Detailed deterministic arithmetic belongs in the shared anchored explanation popover.

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
-> NPC_TRAIT_v2.8.0.md

## QUEUE INFORMATION BOUNDARY

Do not reveal new future-customer information such as:
- future Job
- Level
- Destination
- Preparation Need
- importance score

Existing currently-authorized queue-count information remains unchanged.
The uncertainty of who comes next is part of inventory allocation judgment.

## DESTINATION

Player-facing label:
`예상 목적지`

Default:
- expected destination = actual assigned destination
- destination is random among eligible open Gates according to `NPC_TRAIT_v2.8.0.md`

Canonical uncertainty:
- an explicitly defined Event may change actual destination while leaving the earlier expected destination as the player-facing expectation
- no other system may silently falsify destination information

`liar / 거짓말쟁이`:
- applies only when Open Gate >= 2
- 50% chance
- **actual destination changes to a different currently Open Gate**
- claimed / expected destination remains the original destination
- no additional Power condition

On `게이트 순례주간`:
- Sale still shows the NPC's expected destination
- affected NPC identity and changed actual destination remain hidden
- Night reveals actual changed destination for affected NPCs

System must not auto-route NPC to:
- best Job fit
- best Stat fit
- safest Dungeon
- hardest Dungeon

Explicit Event destination changes and confirmed Deep Expedition destination replacement continue to follow their owning rules.
Confirmed Deep nomination remains final and cannot be overwritten afterward.

Canonical routing / information reliability:
-> NPC_TRAIT_v2.8.0.md
-> EVENT_v2.8.0.md

## DEEP EXPEDITION NOMINATION

Deep Expedition stays inside the ordinary one-customer-at-a-time Sale flow.
No separate Sale Phase is added.

While today's Deep Expedition is unassigned, **any ordinary current visiting NPC**
who is already eligible to be served may expose:
`심층원정에 추천`

No additional Job / Level / rarity gate is added.

Nomination is allowed only **before the first committed purchase/supply
transaction for that NPC on that Day**.
The Store must be able to pay the fixed sponsorship amount.

Player may:
- nominate current NPC
- skip current NPC and wait for a later visitor
- nominate nobody

Future visitor identity remains hidden under normal Sale rules.

On nomination confirmation:
1. charge sponsorship exactly once
2. mark today's Deep Expedition assigned
3. replace that NPC's actual destination for today with the Deep Gate
4. make the Deep destination the relevant Player-facing destination
5. recalculate forecast
6. continue ordinary Sale flow

After confirmation:
- no cancellation
- no NPC swap
- no second nominee
- no sponsorship refund
- no later Trait/Event/Special destination reassignment may overwrite the Deep destination

Deep nomination and any other explicit Player destination-reassignment action are
mutually exclusive for that NPC on that Day. If a Player destination reassignment
was already consumed on that NPC, that NPC cannot then be nominated for Deep Expedition.

Any pre-existing reported/claimed destination ambiguity (for example a Trait) is
resolved by the explicit Deep nomination: after confirmation the Player-facing
destination is the confirmed Deep Gate.

If nobody is nominated by Sale end:
- sponsorship=0
- no NPC penalty
- no Store penalty
- opportunity expires for that Day

After nomination, ordinary Sale rules remain:
- sell nothing allowed
- 50 / 100 / 150
- Wallet
- purchase slots
- Item
- Fatigue recovery (Food/Drink)
- refusal logic

No free Item / free sale / Deep-only purchase slot.

Deep nomination is an explicit authoritative destination replacement.
Once confirmed, ordinary Trait/Event destination logic may not silently overwrite
the confirmed Deep destination afterward.

Save/Load persistence -> `CORE_RUN_v2.8.0.md`.

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
-> ITEM_v2.8.0.md
-> CORE_RUN_v2.8.0.md

## NORMAL CONSUMER BAG — EXACT

Every normal SALE expedition Bag has exactly:

```text
2 slots
```

For all NPCs regardless of:
- Level
- Job
- Rarity
- Trait

No Lv10+ third slot.
No disabled/ghost third slot.
No hidden extra normal slot.

Special Final ownership may define its own party/preparation surface but must not silently restore the removed normal Lv10+ slot rule.

Consumer Slot은
한 방문에서 해당 NPC가 구매 가능한 Item 개수 제한이다.

Do not:
- hide inventory because slot is low
- allow infinite item sales
- create extra slot rules by hidden Job/Trait unless explicitly canonical

## MOBILE BAG INTERACTION

- both Bag slots remain visibly present even when empty
- each is a practical ~44px-class touch target
- first empty slot may receive default focus
- tapping an occupied slot changes focus
- tapping an Item places/replaces it in the focused uncommitted slot
- after filling one uncommitted slot, another empty slot may receive focus
- explicit remove/return action exists
- destructive gesture is not required

Bag enlargement is presentation only and never changes capacity.

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
-> UI_UX_v2.8.0.md

The compared Item's detail lives on the counter tray, so comparing two Items never moves the shelf list (User 2026-09-24, v2.9.0).

### MATCHING-EFFECT EMPHASIS

In SALE Item rows, the effect text that answers the customer's Gate is set in the emphasis style (bold, ink colour): a Counter for one of the Gate's Hazards, or the Core Stat that one of its Hazards presses. Every other effect keeps the default style. No badge, no verdict word, no reorder (User 2026-09-24, v2.9.0).

## SALE DECISION-ONLY DETAIL — REMOVE NON-DECISION DISCLOSURES

Remove the following SALE-only expandable/detail treatments from the customer decision surface:

```text
이 손님에게 안 걸리는 효과
상품 설명
```

when `상품 설명` contains only flavor text rather than a current decision effect.

Rules:
- SALE shows the exact Item effects that can actually matter to the current transaction/expedition
- do not create a disclosure control that looks strategically important but opens only flavor prose
- flavor text may continue to exist in Item data or another existing non-decision context; this rule does not require adding a new catalog/detail screen
- do not hide actual Counter / Core Stat / 피로 회복 / penalty / Insurance behavior merely to remove flavor

Purpose:
reduce false information weight on the decision screen and keep SALE focused on actionable truth.

## PRE-COMMIT INFORMATION BOUNDARY

Always readable ingredients remain:
- NPC identity / Job / Level
- four Core Stats
- active Trait / Condition
- NPC Wallet / affordability
- current committed Bag / remaining slots
- Expected Destination
- known current environment/Hazard
- pre-supply qualitative Combat Forecast
- pre-supply qualitative Hazard Readiness
- exact pre-supply 실패 시 사망 위험 %
- exact Item Stat / Counter / `피로 회복 N` / explicit penalty

When the Player focuses/selects an **uncommitted** Item, UI may additionally show:
- that Item's exact effects
- selected price / affordability
- deterministic Fatigue-recovery arithmetic (`피로 A -> 출발 B`) owned by `DUNGEON_HAZARD_v2.8.0.md`

Before actual purchase commitment, do **not** show a hypothetical post-Item derived answer such as:
- `접전 -> 우세`
- `불안 -> 충분`
- 실패 시 사망 위험 `% -> %` change
- Great Success signal change
- exact expedition success chance
- system-recommended/best Item

The exact 실패 시 사망 위험 % shown here is the fixed **pre-supply** snapshot owned by `DUNGEON_HAZARD_v2.8.0.md`, not a hypothetical post-Item answer. It is conditional on the expedition entering a failure path and is not the unconditional whole-expedition Death probability.

This boundary prevents the UI from turning the decision into answer-following.

## PREVIEW

Item selection should preview direct, player-readable changes where useful.

Examples:
- 투력 +X
- 강인함 +X
- 독 대응 +X
- 피로 회복 N
- 보험 효과

After an Item is chosen, `판매 후 변화` is one delta list of what changes only: direct Stat rows (`강인함 17 → 23`), derived rows (`피로 완화`) and `피로 {A} → 출발 {B}`. The outlook (Combat Forecast / Hazard Readiness / Death risk) is never shown moving for an uncommitted Item and the frozen four-cell outlook is not repainted inside the till; `특수 효과` and the shelf-life line stay (heading and row copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`) (User 2026-09-24, v2.9.0).

Preview must not expose:
- exact expedition success %
- exact death %
- internal formula
- fake master safety score

Canonical information principle:
-> 00_GAME_CORE_v2.8.0.md

## NO RELATIVE ANSWER GRADER

Do not add:
- relative Stat-contribution percent
- a contribution score
- a new live post-Item Combat/Hazard/Death answer
- qualitative best/worse Item labels

The Player sees exact ingredients and learns the final contribution from resolved NIGHT evidence.

## FORECAST

Sale may show qualitative expedition forecast.

Combat:
[우세,접전,불리]

Hazard:
[취약,불안,대응,충분]

No single final safety score.

The always-on outlook is two cells, 전투 전망 + 환경 대응. The exact failure-conditioned Death risk is still exposed at SALE entry, as the second line of the 전투 전망 help (`실패 시 사망 위험 {N}%`) and in the NPC detail, not as an always-on readout cell; it is frozen like the rest (exact help copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`) (User 2026-09-24, v2.9.0).

Forecast is:
estimate, not guarantee.

Canonical Dungeon:
-> DUNGEON_HAZARD_v2.8.0.md

## ENVIRONMENT / FORECAST INFORMATION HIERARCHY

Do not repeat the same decision signal as multiple equal-priority labels.

Hazard name, pressured Stat/readiness, and qualitative preparedness belong to one readable hierarchy.
Long explanatory prose is secondary Help/Tooltip content, not always-on Core Decision copy.
The exact 실패 시 사망 위험 % sits at that Help level (전투 전망 help, NPC detail), not as an always-on cell (User 2026-09-24, v2.9.0).

No exact Success %, hidden Power, or master safety score.

## FROZEN OUTLOOK

For the whole customer visit, keep the SALE-entry snapshot frozen for:
- Combat Forecast
- Hazard Readiness
- failure-conditioned Death risk %

Selecting or previewing an Item never changes those answers.
The Death risk % is frozen where it is now shown: the 전투 전망 help and the NPC detail (User 2026-09-24, v2.9.0).

One exception: confirming a Deep Expedition nomination (allowed only before the first committed
transaction) re-takes this pre-supply snapshot once, against the Deep Gate. The nomination cannot be
cancelled.

## POST-COMMIT CURRENT STATE

Once an Item is actually purchased and committed into the NPC's Bag, it is no longer hypothetical.

However, the decision-surface expedition outlook remains the **SALE-entry / pre-supply snapshot** for the entire customer visit.

After a purchase commits:
- pre-supply Combat Forecast does **not** update
- pre-supply Hazard Readiness does **not** update
- pre-supply 실패 시 사망 위험 % does **not** update
- exact Item/direct-effect changes may be shown
- exact proven derived changes from Fatigue/other owned systems may be shown with their source
- current Fatigue-recovery arithmetic (`피로 A -> 출발 B`) may update where it is deterministic public arithmetic

A refusal does not grant the Item effect.

Purpose:
- the Player receives a clear baseline before deciding whether this NPC is worth supporting
- the UI does not grade the Player's first Item choice before the remaining-slot decision
- post-commit feedback explains **what actually changed and why**, without converting that change into a new Forecast/Readiness/Death answer

The actual expedition Resolve still uses the final prepared state after all committed Items.
Freezing the displayed outlook does not freeze the runtime preparation state.

## GREAT SUCCESS SIGNAL — POST-COMMIT EXCEPTION

The Great Success signal is the one approved exception to the frozen displayed outlook.

Rules:
- uncommitted selection/preview does not change the signal
- after every successful committed purchase, recompute the signal from the current committed Bag
- false -> true and true -> false are both allowed
- exact Great Success probability remains hidden
- Combat Forecast / Hazard Readiness / failure-conditioned Death risk remain frozen
- refusal changes nothing

This is feedback on an already committed choice, not a pre-purchase answer.

## POST-COMMIT DELTA SOURCE TRUTH — EXACT

Do not present a generic aggregate panel that makes every changed value look like a direct Item Stat effect.

Current preparation can legitimately change through more than one channel after a Food/Drink Item is committed (User 2026-09-24, v2.9.0):

```text
A. direct Item effect
B. current-Fatigue recovery / Fatigue band change
C. another explicitly owned Trait / Relic / Boss modifier
```

Rules:
- an Item directly changes only the exact channels stated by `ITEM_v2.8.0.md`
- if a post-commit delta is shown, the changed value must be actual and its source must be provable
- post-commit delta rows may show exact Core-Stat / Counter / Fatigue changes (`피로 {A} → 출발 {B}`); they must not recalculate, replace or repaint the pre-supply Combat Forecast / Hazard Readiness / 실패 시 사망 위험 readout, and no outlook delta row exists (User 2026-09-24, v2.9.0)
- ordinary SALE must keep the pre-supply Forecast/Readiness/실패 시 사망 위험 snapshot frozen; post-commit feedback should instead show exact changed values/effects with readable source attribution rather than a new derived expedition answer
- Food/Drink Fatigue recovery that reduces current Fatigue may restore effective Core Stats when a canonical Fatigue band changes (bands -> `DUNGEON_HAZARD_v2.8.0.md`); this is a **Fatigue/Condition effect**, not a hidden direct Item Stat
- Trait/Relic/Boss modifiers may change an Item contribution only within their exact owned scope

Example boundary:
- current `집중 사탕` shows `공포 대응 +10 / 피로 회복 3`
- it has no direct positive four-Core-Stat contribution
- if there is no Fatigue band change, selling it must not create a Core-Stat delta
- if its 피로 회복 releases a Fatigue band, effective Core Stats may rise through Fatigue recovery
- that indirect change must be presented as `피로 완화` or an equivalent source-readable system effect, never as if 집중 사탕 itself granted those Stats

A generic heading such as `판매 후 변화` is acceptable only if the rows clearly distinguish direct Item effects from derived system changes.
If that distinction is not readable, remove the synthetic delta block rather than replacing the pre-supply outlook with post-commit Forecast/Readiness/Death answers.

## STAT SOURCE UX

When an actual source changes a core Stat:
- changed number uses the approved highlight treatment
- actual applied beneficial source name may be shown in green
- actual applied detrimental source name may be shown in red
- do not show inactive sources
- do not add always-on numeric percent/delta ledgers

Examples:
- grit injured combat: `악바리` source only for combat
- injury survival: `부상` source
- fatigue mobility/spirit: `피로` source

Excluded from Stat Source labels:
- Wallet
- purchase intent
- revisit weighting

Stat touch/click detail may show:
- actual source
- actual applied value
- calculation breakdown

### STAT GRID PRESSURE TAG

Under each of the four Stat cells, when the customer's Gate presses that Stat, a small tag names the pressing Hazard(s) (icon + name, e.g. `냉기`, or `독 · 속박` for two). 투력 never carries a tag. No number, no verdict. The tag is the one place the Stat grid links to the Gate (User 2026-09-24, v2.9.0).

## NPC DETAIL — CONDITION TRUTH

NPC detail must expose when relevant:
- actual injury effect
- current fatigue
- current fatigue tier and active penalty
- Severe Injury remaining rest days
- fatigue recovery method

`injury=2` itself has no Stat penalty.

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
-> ECONOMY_ORDER_v2.8.0.md

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

Each price button carries its role word with the mode and price (`할인 50%` / `정가` / `바가지 150%`) and the small line `이익 {N}G` (or the existing disabled reason) under it; exact face copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`. Three modes only, no extra depth (User 2026-09-24, v2.9.0).

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

Exact hidden purchase acceptance, NPC Wallet income and Deep sponsorship are owned by
`ECONOMY_ORDER_v2.8.0.md`.

SALE does not duplicate those numbers and does not expose exact purchase probability.

The two-slot Bag is a capacity decision, not an additional hidden acceptance penalty.

## EVENT PURCHASE BUDGET

When an Event grants temporary purchase budget without changing persistent NPC Wallet, affordability
must remain truthful.

Do not present n.money alone as if it were the whole spendable amount.

The UI may state, for example:
    소지 100G · 급여일 예산 +20G

Unused temporary Event budget is not persistent NPC Wallet.

## REFUSAL

Refusal reason must match actual Engine reason.

Player-facing valid reasons include:
- 돈이 부족함
- 가격이 너무 높음
- 이 물건은 필요하지 않음

Do not use vague intermediate copy
that obscures what happened.

Presentation only (User 2026-09-24, v2.9.0): the refused price button shakes once and locks with the existing `오늘 거절됨` / `더 싼 값을 거절함` text, and the refusal reply stays 5 s (contract -> `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT). The refusal rules below are unchanged.

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

## SAME-ITEM REFUSAL PRICE CEILING — EXACT

For the same ordinary customer + same SKU + same visit, an actual refusal creates a price ceiling for the remainder of that visit.

Rule:

```text
if a price mode is refused for the same SKU
-> every higher price mode for that same SKU is disabled for that customer visit
-> lower price modes may still be attempted
```

Exact cases:

```text
50% refused
-> 100% disabled
-> 150% disabled

100% refused
-> 150% disabled
-> 50% may still be attempted

150% refused
-> 100% / 50% may still be attempted
```

Rules:
- this lock applies only to the same customer + same SKU + current ordinary visit
- it must not lock unrelated SKUs
- a new customer visit begins from that visit's normal pricing state unless another owner explicitly defines persistence
- higher-price controls blocked by this rule must be visibly disabled
- the reason for the disabled state must be readable in UI
- do not reroll purchase acceptance at a higher price after the same customer already refused the lower price for that SKU

Purpose:
prevent retry/RNG fishing where a lower-price refusal can paradoxically be followed by a higher-price purchase of the same item.

This is a coherence rule for the existing ordinary 50/100/150 pricing system, not a new Loyalty or negotiation subsystem.

## REFUSAL RETRY TRUTH — EXACT

If a customer refuses a given Item at price mode P during the current visit:

- that same Item at P becomes unavailable
- every more expensive price mode for that same Item also becomes unavailable
- cheaper price modes remain eligible unless separately refused/blocked
- other Item IDs are unaffected

Player help copy:

    한 가격을 거절하면 같은 상품은 그 가격과 더 비싼 가격으로 그날 다시 제안할 수 없다.

Do not describe the rule as only \`같은 상품·같은 가격\`.

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

## RETURNING NPC — LAST EXPEDITION QUICK SURFACE

When a returning NPC has a recent-expedition snapshot owned by `NPC_TRAIT_v2.8.0.md`, show one compact quick surface:

```text
지난 원정 · DAY X · 결과 · [item] [item]
```

Rules:
- only actually accepted/purchased Item IDs from that expedition
- empty slot remains empty
- no causal claim from Item presence alone
- the quick surface is desk-only (≥1024); on phone the NPC detail 원정 기록 holds the last expedition (User 2026-09-24, v2.9.0)
- detail may expand actual destination, Outcome, Item names, and only proven contribution tokens

No Product XP / Favorite Meter / Familiarity Bonus is created.

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
-> NPC_TRAIT_v2.8.0.md
-> ECONOMY_ORDER_v2.8.0.md

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

## CROSS-SYSTEM REVENUE SIGNAL

Committed sale revenue contributes to Canonical Cumulative Gross Sales owned by ECONOMY_ORDER.
BOSS/GREED may read that metric; SALE does not create a Boss-only sales counter.

## SALE LAYOUT — DESKTOP

Authoritative composition:
- Character / Portrait on the left
- use the upper-right area as the Core Decision area
- Bag is materially larger in visual and touch size
- Bag enlargement does **not** change consumer-slot capacity
- Forecast + Expected Destination occupy the upper-right Core Decision area
- duplicate lower destination / forecast panels are removed
- NPC Wallet remains visible inside the Core Decision hierarchy

Do not restore the older layout where forecast/destination are repeated lower on the page.

## SALE LAYOUT — MOBILE

- vertical mobile composition
- Character / status top footprint reduced without cropping artwork
- Bag absolute visual/touch size enlarged
- Bag may not overflow or overlap status/card boundaries
- Expected Destination compact and immediately readable
- Forecast follows the relevant recent-expedition/current-decision information
- core environment information visible without tap
- remove duplicated environment / forecast blocks
- no tiny compressed multi-column layout
- the counter tray sits fixed above the dock; the price keys are always in the same place (User 2026-09-24, v2.9.0)

Core environment example form:
`북부 설원 폐허 I · 냉기 · 대응 13 필요 · 강인함 3당 대응 1 제공` (User 2026-09-24 revision 2, v2.9.0: the numbered row, no label, no `?`)

Tap/tooltip may add detail; it may not hide the core risk needed for the sale decision.

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
- transaction beats follow `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT: one sale's beats total < 600 ms, never block input, skipped under `prefers-reduced-motion` with the same end state (User 2026-09-24, v2.9.0)
- no tiny multi-column compression
- repeat actions use practical touch targets (~44px class)
- price choice and item choice stay visually clear
- primary action remains obvious

Do not solve pacing by removing a decision that can change after a purchase/refusal result.

Detailed presentation:
-> UI_UX_v2.8.0.md

## SALE RUNTIME CONTINUITY

Within the same Customer, the current scroll position and practical focus must be preserved across:
- item selection
- counter tray fill / clear (the shelf list never changes height; (User 2026-09-24, v2.9.0))
- purchase success
- refusal and reselection
- accordion/detail open/close

Re-rendering may not throw the Player to the top of the Sale page.

Only advancing to a new Customer may intentionally return the Sale decision surface to its start position.

## PORTRAIT PRELOAD

- current Customer portrait renders normally
- preload only the next Customer portrait
- simple browser preload is sufficient
- do not add a cache framework

Acceptance is based on real mobile transition behavior, not existence of preload code.

## FINAL PREPARATION OVERRIDE — EXACT WHERE APPROVED

Final preparation reuses the familiar two-slot Item handling and real inventory, but it does **not** reuse ordinary end-of-Run haggling/refusal behavior.

For each selected Final participant:

```text
2 visible Bag slots
-> choose/focus slot
-> choose Item
-> fixed 50% / 매입가 amount is shown
-> affordability check
-> commit transfer
-> stock and NPC Wallet update
-> judge remaining slot
```

Rules:
- no 100% or 150% price selection in Final preparation
- no purchase/refusal RNG in Final preparation
- same-SKU refusal price ceiling does not apply because there is no Final refusal roll
- exactly two Item slots remain
- actual inventory stock is consumed on committed transfer
- NPC Wallet must cover the fixed 50%/매입가 amount
- committed transfer reduces NPC Wallet by that exact amount
- if unaffordable, the Item cannot be committed to that NPC
- Player may leave a slot empty
- sequential slot handling remains; do not create a bundle/cart checkout
- Save/Load must not erase committed Final transfers or reopen committed participant selection for fishing

Ordinary SALE outside Final remains unchanged.

For each committed Final transfer, Player Gold and Gross Sales both increase by the exact fixed 50% / 매입가 amount once, matching `ECONOMY_ORDER_v2.8.0.md` / `FINAL_EXPEDITION_v2.8.0.md` / `BOSS_v2.8.0.md`.
Do not double-count the transfer.

## FINAL ITEM USABILITY

If `FINAL_EXPEDITION_v2.8.0.md` marks an Item as having no Final effect, the Final preparation surface must clearly expose that fact and should block placing it into a Final Bag when practical.
Normal SALE behavior for the same Item remains unchanged.

## QA

Acceptance criteria:
- CORE_RUN_QA_v2.8.0.md
- ECONOMY_ORDER_QA_v2.8.0.md
- NPC_TRAIT_QA_v2.8.0.md
- UI_UX_QA_v2.8.0.md

Deep Expedition nomination acceptance:
- one nominee maximum
- current visitor only
- no extra Job/Level/rarity eligibility
- nomination before first committed transaction
- unaffordable sponsorship cannot confirm
- confirmed Deep destination cannot be overwritten
- skip/expiry costs 0 and adds no penalty

## RELATED

game philosophy -> `00_GAME_CORE_v2.8.0.md`
NPC / Trait / destination / growth / recent snapshot -> `NPC_TRAIT_v2.8.0.md`
Item / inventory / Item effects -> `ITEM_v2.8.0.md`
price / Economy / Wallet -> `ECONOMY_ORDER_v2.8.0.md`
dungeon forecast / Hazard / Fatigue / Supply -> `DUNGEON_HAZARD_v2.8.0.md`
run / phase -> `CORE_RUN_v2.8.0.md`
night result / Night proof -> `NIGHT_CLOSING_v2.8.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.8.0.md`
presentation -> `UI_UX_v2.8.0.md`
