# SALE

DOC=SALE
OWNER=sale,customer,price,bag,sale_decision_ux,great_signal,fatigue_surface,loyalty_surface,refusal,purchase_flow,deep_nomination
DOC_VERSION=2.12.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.12.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

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

SALE = 게임의 핵심 개별 판단 구간.

Player는 한 NPC씩 보고 누구인가 / 어디에 가는가 / 무엇이 약한가 / 무엇을 준비시키는가 / 얼마에 파는가 /
지금 돈을 벌 것인가 / 장기적으로 투자할 것인가를 결정한다.

핵심 긴장: `현재 Margin vs NPC 미래가치`

## CORE DECISION CONTRACT

Before the Player chooses a price, the same decision surface makes readable:
- NPC identity / name / Job / Level
- 4 core Stats
- active Traits / conditions (current injury / Fatigue / condition)
- **NPC current Persistent Wallet**
- current purchased Bag / remaining consumer slots
- Expected Destination
- current Gate / Hazard core environment information
- qualitative expedition Forecast
- available sellable stock
- 50 / 100 / 150 sale price
- whether the NPC can afford that price

NPC Wallet is not optional secondary detail: the Player must be able to judge affordability before committing a price.
Exact layout -> UI_UX_v2.8.0.md.

## CUSTOMER FLOW

Sale은 한 번에 한 Customer를 처리한다.

Flow: customerEnter → inspect → selectItem → selectPrice → purchase/refusal → remainingSlotDecision → finalizeCustomer → nextCustomer

`finalizeCustomer -> nextCustomer` carries the customer exit-then-entry beat (the current customer exits, then the next arrives with the existing entry). It is presentation only and changes no state (contract -> `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT).

The purchase/refusal result may inform the next remaining-slot decision, so do not batch the whole Customer into a
single irreversible cart action.

한 Customer의 판매가 완료되기 전 다음 Customer의 상세 정보를 미리 공개하지 않는다.

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
- the chosen Item is shown on the counter tray (fixed above the dock) with its `판매 후 변화` and the three price keys; the shelf rows never change height (`UI_UX_v2.8.0.md` §SALE — COUNTER TRAY)
- the hand/commit step is shown by the transaction beats (presentation only, contract -> `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT); the two Bag slots stay in the customer-state strip beside the status line and remain the handling surface (`UI_UX_v2.8.0.md` §BAG PRESENTATION)

## CURRENT CUSTOMER COMPACT STATE

Mobile current-customer state includes Injury state (without numeric duplication), Fatigue and Loyalty:

    부상 · 피로 8 · 단골도 37

- If Loyalty >= 51, show the 단골 badge on the customer card's nameplate (right side); the state line does not repeat 단골.
- Omit `건강`; name the Injury state only while injured. Fatigue and Loyalty remain visible as before.
- Normal SALE places no separate Loyalty `?` / popover trigger beside this value; the tutorial/coach teaches its
  contextual meaning. The global compact Help may retain its separately owned reference text.
- Equipment text is not part of the compact top strip; it stays readable in NPC detail and may appear as a proven Core-Stat source.
- Bag is exactly two slots (§NORMAL CONSUMER BAG — EXACT). Exact compact/mobile layout -> UI_UX_v2.8.0.md.

Fatigue in this strip:

    피로 2

This single `피로 N` is `Dungeon.prepare()`'s `fatigueBeforeExpedition`, from the committed Bag, matching the effective Stat grid. Selecting an uncommitted Item does not move it. A fatigued arrival fully relieved by committed Items keeps `피로 0` visible; a zero-Fatigue arrival retains the existing omission.

A committed purchase reducing preparation Fatigue from 12 to 8 changes the single number to:

    피로 8

Do not show:

    성공 N · 퇴각 N · 부상 N

Stored Fatigue is unchanged by a sale; resolution settles recovery and outcome Fatigue. NPC detail labels that stored reading `현재 피로 (상품 사용 전)`. Detailed deterministic arithmetic follows DUNGEON_HAZARD; NIGHT shows the result.

## PRE-REVEAL BOUNDARY

Morning/Order에서 공개 가능: 오늘 방문 예정 인원.

미리 공개하지 않음: 이름 / Job / Trait / Wallet / 목적지 정보.

Customer로 실제 등장한 시점부터 introduced/notebook 등록 가능. Canonical NPC rule -> NPC_TRAIT_v2.8.0.md.

## QUEUE INFORMATION BOUNDARY

No new future-customer information (future Job, Level, Destination, Preparation Need, importance score); the currently
authorized queue count stays. Not knowing who comes next is part of inventory allocation judgment.

One approved aggregate reference exception (User 2026-10-09): while in SALE, the existing queue/progress area may reveal on demand, per open Gate, **how many of today's customers are still to be served, counting the one at the counter** (the player need not remember ORDER's line). Counts use ORDER's source (`claimedGateFor` over the Day's queue), so a Trait's or Event's uncertainty stays: the claimed Gate, never the actual one. Near the end of the queue the remaining counts can imply the next customer's claimed Gate (User-accepted); nothing reveals their identity, Job, Traits, needs or actual destination. No outcome / Item recommendation follows from this reference. Presentation / coach / QA -> UI_UX §SALE — QUEUE GATE COUNT REFERENCE.

## DESTINATION

Player-facing label: `예상 목적지`

Default:
- expected destination = actual assigned destination
- destination is random among eligible open Gates according to `NPC_TRAIT_v2.8.0.md`
- when a Day has at least as many visitors as open Gates, every open Gate is some visitor's expected destination: a Gate the draw left empty takes one visitor from a Gate that holds two or more (`NPC_TRAIT_v2.8.0.md` destinationCoverage)

Canonical uncertainty:
- an explicitly defined Event may change actual destination while leaving the earlier expected destination as the player-facing expectation
- no other system may silently falsify destination information

`liar / 거짓말쟁이`: applies only when Open Gate >= 2; 50% chance; **actual destination changes to a different currently
Open Gate**; claimed / expected destination remains the original destination; no additional Power condition.

On `게이트 순례 주간`: Sale still shows the NPC's expected destination; affected NPC identity and changed actual
destination remain hidden; Night reveals actual changed destination for affected NPCs.

System must not auto-route NPC to best Job fit / best Stat fit / safest Dungeon / hardest Dungeon.

Explicit Event destination changes and confirmed Deep Expedition destination replacement follow their owning rules
(Deep -> §DEEP EXPEDITION NOMINATION). Canonical routing / information reliability -> NPC_TRAIT_v2.8.0.md, EVENT_v2.8.0.md.

## DEEP EXPEDITION NOMINATION

Deep Expedition stays inside the ordinary one-customer-at-a-time Sale flow; no separate Sale Phase exists.

While today's Deep Expedition is unassigned, **any ordinary current visiting NPC** who is already eligible to be served may expose:
`심층원정에 추천`

No additional Job / Level / rarity gate exists.

Nomination is allowed only **before the first committed purchase/supply transaction for that NPC on that Day**.
The Store must be able to pay the fixed sponsorship amount.

Player may nominate the current NPC, skip them and wait for a later visitor, or nominate nobody.
Future visitor identity remains hidden under normal Sale rules.

On nomination confirmation: 1. charge sponsorship exactly once; 2. mark today's Deep Expedition assigned; 3. replace
that NPC's actual destination for today with the Deep Gate; 4. make the Deep destination the relevant Player-facing
destination; 5. recalculate forecast; 6. continue ordinary Sale flow.

Deep nomination is an explicit authoritative destination replacement. After confirmation: no cancellation, no NPC swap,
no second nominee, no sponsorship refund, and no later Trait/Event/Special destination reassignment may overwrite the
Deep destination.

Deep nomination and any other explicit Player destination-reassignment action are mutually exclusive for that NPC on
that Day: if a Player destination reassignment was already consumed on that NPC, that NPC cannot then be nominated.

Any pre-existing reported/claimed destination ambiguity (for example a Trait) is resolved by the nomination: after
confirmation the Player-facing destination is the confirmed Deep Gate.

If nobody is nominated by Sale end: sponsorship=0, no NPC penalty, no Store penalty, the opportunity expires for that Day.

After nomination, ordinary Sale rules remain: sell nothing allowed, 50 / 100 / 150, Wallet, purchase slots, Item,
Fatigue recovery (Food/Drink), refusal logic. No free Item / free sale / Deep-only purchase slot.

Save/Load persistence -> `CORE_RUN_v2.8.0.md`.

## INVENTORY VIEW

Sale 화면에는 현재 판매 가능한 Inventory 전체를 보여준다.

Rule:
inventoryVisibility != consumerSlotLimit

모든 판매 가능 상품을 보여주되 NPC가 실제로 구매 가능한 개수는 Consumer Slot이 제한한다.

- Same Item: stack display=YES
- Player chooses: item type
- Consumed physical unit: nearest expiry first

Canonical inventory/item -> ITEM_v2.8.0.md, CORE_RUN_v2.8.0.md.

## NORMAL CONSUMER BAG — EXACT

Every normal SALE expedition Bag has exactly:

```text
2 slots
```

For all NPCs regardless of Level / Job / Rarity / Trait.

No Lv10+ third slot. No disabled/ghost third slot. No hidden extra normal slot.
Special Final ownership may define its own party/preparation surface but must not add a Lv10+ normal slot.

Consumer Slot은 한 방문에서 해당 NPC가 구매 가능한 Item 개수 제한이다.

Do not:
- hide inventory because slot is low
- allow infinite item sales
- create extra slot rules by hidden Job/Trait unless explicitly canonical

## MOBILE BAG INTERACTION

- both Bag slots remain visibly present even when empty; each is a practical ~44px-class touch target
- first empty slot may receive default focus; tapping an occupied slot changes focus
- tapping an Item places/replaces it in the focused uncommitted slot; after filling one, another empty slot may receive focus
- explicit remove/return action exists; destructive gesture is not required
- Bag enlargement is presentation only and never changes capacity

## ITEM SELECTION

Player must be able to compare relevant Item information without leaving Sale repeatedly.

Useful decision info may include: major Stat effect, Counter effect, Condition effect, Insurance behavior, explicit
penalty, sell price at current selected mode. Exact UI -> UI_UX_v2.8.0.md.

The compared Item's detail lives on the counter tray, so comparing two Items never moves the shelf list.

Shelf order: rows are ordered by kind, then days left before discard (nearest first), then higher Rarity, ties in the
existing order, held for the Day; every row carries its shelf life (`폐기까지 N일 / 내일까지 / 오늘까지`) and a row on its
last day is emphasized (exact -> `UI_UX_v2.8.0.md` §SALE — SHELF ORDER). This is stock management, never a best-fit or
recommendation order; only the Hazard-answer lead follows the current customer's own Gate (User 2026-10-09).

### MATCHING-EFFECT EMPHASIS — RETIRED

No effect text is emphasized against the customer's Gate: every effect text keeps the default style on every row,
whatever the customer's Gate. The judgement is the player's; the row states what the Item does and nothing about fit.
No badge, no verdict word, no reorder, no recommendation.

### ITEM ROW EFFECT ORDER — FIXED

Every Item row (ORDER offer, SALE shelf, counter tray, codex) lists its effects in one fixed order, never by the
situation -> `ITEM_v2.8.0.md` §PRESENTATION ORDER — EXACT.

## SALE DECISION-ONLY DETAIL — REMOVE NON-DECISION DISCLOSURES

The SALE customer decision surface has none of these expandable/detail treatments:

```text
이 손님에게 안 걸리는 효과
상품 설명
```

(`상품 설명` where it contains only flavor text rather than a current decision effect.)

Rules:
- SALE shows the exact Item effects that can actually matter to the current transaction/expedition
- do not create a disclosure control that looks strategically important but opens only flavor prose
- flavor text may continue to exist in Item data or another existing non-decision context; this rule does not require adding a new catalog/detail screen
- do not hide actual Counter / Core Stat / 피로 회복 / penalty / Insurance behavior merely to remove flavor

## PRE-COMMIT INFORMATION BOUNDARY

Always readable: the §CORE DECISION CONTRACT ingredients (identity / Job / Level, four Core Stats, active Trait /
Condition, Wallet / affordability, committed Bag / remaining slots, Expected Destination, known environment/Hazard),
the pre-supply qualitative Combat Forecast and Hazard Readiness, the exact pre-supply 실패 시 사망 위험 %, and exact Item
Stat / Counter / `피로 회복 N` / explicit penalty.

When the Player focuses/selects an **uncommitted** Item, UI may additionally show:
- that Item's exact effects
- selected price / affordability
- a Food/Drink's own `피로 회복 N` row (no `피로 {A} → 출발 {B}` line; the arithmetic is `DUNGEON_HAZARD_v2.8.0.md`'s and NIGHT shows it)

Before actual purchase commitment, do **not** show a hypothetical post-Item derived answer such as `접전 -> 우세`,
`불안 -> 충분`, a 실패 시 사망 위험 `% -> %` change, a Great Success signal change, exact expedition success chance, or a
system-recommended/best Item. Exception (User 2026-10-02): the 환경 대응 meter previews its own number for the selected Item
(`6 → 16/23`, UI_UX §SALE — ENVIRONMENT METER) - the environment is arithmetic the Player could do; the fight never previews.

Nor add a relative Stat-contribution percent, a contribution score, a new live post-Item Combat/Hazard/Death answer or
qualitative best/worse Item labels. The Player sees exact ingredients and learns the final contribution from resolved
NIGHT evidence; this boundary keeps the decision from turning into answer-following.

The exact 실패 시 사망 위험 % shown here is the fixed **pre-supply** snapshot owned by `DUNGEON_HAZARD_v2.8.0.md`, not a hypothetical post-Item answer. It is conditional on the expedition entering a failure path and is not the unconditional whole-expedition Death probability.

## PREVIEW

Item selection previews direct, player-readable changes where useful, e.g. 투력 +X / 강인함 +X / 독 대응 +X / 피로 회복 N / 보험 효과.

After an Item is chosen, `판매 후 변화` lists only what the Item itself changes — its own effect rows (`피로 회복 2 → 9`, `강인함 17 → 23`, `손님 소지금 획득 0%p → 40%p`); no derived `피로 완화` row and no `피로 {A} → 출발 {B}` line, on the counter tray, the till and FINAL preparation. The outlook (Combat Forecast / Hazard Readiness / Death risk) is never shown moving for an uncommitted Item and the frozen four-cell outlook is not repainted inside the till; `특수 효과` and the shelf-life line stay (heading and row copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`).

Preview must not expose exact expedition success %, exact death %, internal formula, or a fake master safety score.
Canonical information principle -> SPEC_INDEX §GAME CORE.

## FORECAST

Sale may show qualitative expedition forecast.

Combat:
[우세,접전,불리]

Hazard:
[취약,불안,대응,충분]

No single final safety score, exact Success %, hidden Power or master safety score. Forecast is an estimate, not a guarantee.

The always-on outlook is two cells, 전투 전망 + 환경 대응. On a Gate with two Hazards (T2 on) 환경 대응 names each Hazard with its own state (`{위험} {충분|대응|불안|취약}` per Hazard) instead of the worst one alone: the sum of both gaps decides the environment, so one worst label would hide which side is open. It is the same frozen snapshot and gives no number, threshold or Item. The exact failure-conditioned Death risk is exposed at SALE entry at Help level — the second line of the 전투 전망 help (`실패 시 사망 위험 {N}%`) and the NPC detail — not as an always-on readout cell; it is frozen like the rest (exact help copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`).

Hazard name, pressured Stat/readiness and qualitative preparedness form one readable hierarchy; do not repeat the same
decision signal as multiple equal-priority labels. Long explanatory prose is secondary Help/Tooltip content, not
always-on Core Decision copy.

Canonical Dungeon -> DUNGEON_HAZARD_v2.8.0.md.

## FROZEN OUTLOOK

For the whole customer visit, the decision surface keeps the SALE-entry / pre-supply snapshot frozen for:
- Combat Forecast
- Hazard Readiness
- failure-conditioned Death risk % (where it is shown: the 전투 전망 help and the NPC detail)

Selecting or previewing an Item never changes those answers, and a committed purchase does **not** update them either.

One exception: confirming a Deep Expedition nomination (allowed only before the first committed transaction) re-takes
this pre-supply snapshot once, against the Deep Gate. The nomination cannot be cancelled.

## POST-COMMIT CURRENT STATE

Once an Item is actually purchased and committed into the NPC's Bag, it is no longer hypothetical. After a purchase commits:
- the pre-supply Combat Forecast / Hazard Readiness / 실패 시 사망 위험 % stay frozen (§FROZEN OUTLOOK)
- exact Item/direct-effect changes may be shown
- exact proven derived changes from Fatigue/other owned systems may be shown with their source
- the status strip's single `피로 N` reads departure Fatigue from the committed Bag, matching prepared Stats; no `피로 {A} → 출발 {B}` line is added

A refusal does not grant the Item effect.

Constraint: the Player gets a clear baseline before deciding whether this NPC is worth supporting, the UI does not
grade the first Item choice before the remaining-slot decision, and post-commit feedback explains **what actually
changed and why** without converting it into a new Forecast/Readiness/Death answer.

The actual expedition Resolve uses the final prepared state after all committed Items.
Freezing the displayed outlook does not freeze the runtime preparation state.

## GREAT SUCCESS SIGNAL — POST-COMMIT EXCEPTION

The Great Success signal is the one approved exception to the frozen displayed outlook.

Rules:
- uncommitted selection/preview does not change the signal; refusal changes nothing
- after every successful committed purchase, recompute the signal from the current committed Bag; false -> true and true -> false are both allowed
- exact Great Success probability remains hidden
- Combat Forecast / Hazard Readiness / failure-conditioned Death risk remain frozen

This is feedback on an already committed choice, not a pre-purchase answer.

## POST-COMMIT DELTA SOURCE TRUTH — EXACT

Do not present a generic aggregate panel that makes every changed value look like a direct Item Stat effect.

Current preparation can change through more than one channel after a Food/Drink Item is committed:

```text
A. direct Item effect
B. current-Fatigue recovery / Fatigue band change
C. another explicitly owned Trait / Relic / Boss modifier
```

Rules:
- an Item directly changes only the exact channels stated by `ITEM_v2.8.0.md`
- if a post-commit delta is shown, the changed value must be actual and its source must be provable
- post-commit delta rows may show the exact Core-Stat / Counter / 피로 회복 changes the Item itself makes, never a Fatigue arithmetic line; they must not recalculate, replace or repaint the pre-supply Combat Forecast / Hazard Readiness / 실패 시 사망 위험 readout, and no outlook delta row exists
- post-commit feedback shows exact changed values/effects with readable source attribution rather than a new derived expedition answer
- Food/Drink Fatigue recovery that reduces current Fatigue may restore effective Core Stats when a canonical Fatigue band changes (bands -> `DUNGEON_HAZARD_v2.8.0.md`); this is a **Fatigue/Condition effect**, not a hidden direct Item Stat
- Trait/Relic/Boss modifiers may change an Item contribution only within their exact owned scope

Example boundary:
- current `집중 사탕` shows `공포 대응 +8 / 피로 회복 2`
- it has no direct positive four-Core-Stat contribution
- if there is no Fatigue band change, selling it must not create a Core-Stat delta
- if its 피로 회복 releases a Fatigue band, effective Core Stats may rise through Fatigue recovery
- that indirect change is never presented as if 집중 사탕 itself granted those Stats, and `판매 후 변화` does not list it — only the Item's own effects are listed (no `피로 완화` row)

A generic heading such as `판매 후 변화` is acceptable only if the rows clearly distinguish direct Item effects from derived system changes.
If that distinction is not readable, remove the synthetic delta block rather than replacing the pre-supply outlook with post-commit Forecast/Readiness/Death answers.

## STAT SOURCE UX

When an actual source changes a core Stat, the changed number uses the approved highlight treatment and the actual
applied source name may be shown (beneficial green, detrimental red). No inactive sources, no always-on numeric
percent/delta ledgers.

Examples: grit injured combat -> `악바리` source only for combat; injury survival -> `부상` source; fatigue mobility/spirit -> `피로` source.

Excluded from Stat Source labels: Wallet, purchase intent, revisit weighting.

Stat touch/click detail may show actual source, actual applied value and calculation breakdown.

### STAT GRID PRESSURE TAG

The four Stat cells carry no Hazard tag (User 2026-10-03); the 환경 대응 meter and the destination plate state the Gate's pressure.

## NPC DETAIL — CONDITION TRUTH

NPC detail exposes when relevant: actual injury effect, stored fatigue before Item use and its pre-recovery band/penalty,
Severe Injury remaining rest days, fatigue recovery method.

`injury=2` itself has no Stat penalty.

## PRICE SELECTION

Normal sale price modes:

50%
100%
150%

No normal free / service / 25%.

A zero-price action exists only when another Canonical rule explicitly defines it; it is not a normal Sale price mode.
Canonical economy -> ECONOMY_ORDER_v2.8.0.md.

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

Player should understand the role difference without seeing exact purchase probability.

Each price button carries its role word with the mode and price (`할인 50%` / `정가` / `바가지 150%`) and the small line `이익 {N}G` (or the existing disabled reason) under it; exact face copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`. Three modes only, no extra depth.

## PURCHASE DECISION

Purchase logic may consider: Wallet, price resistance, Item need/interest, Loyalty, visible Trait effects, explicit
Relic effects, other canonical visible systems.

Hidden Job-based purchase bonus=NO

The acceptance floor for an accessible-mode offer reads 관련 준비 (a direct Counter for one of the customer's Gate Hazards, or the Stat that Hazard presses), one owner: `RELIC_v2.8.0.md` §COUNTER JUDGEMENT.

Exact purchase probability=HIDDEN

Exact hidden purchase acceptance, NPC Wallet income and Deep sponsorship are owned by `ECONOMY_ORDER_v2.8.0.md`;
SALE does not duplicate those numbers.

The two-slot Bag is a capacity decision, not an additional hidden acceptance penalty.

## EVENT PURCHASE BUDGET

When an Event grants temporary purchase budget without changing persistent NPC Wallet, affordability must remain truthful:
do not present n.money alone as if it were the whole spendable amount. The UI may state, for example:

    소지 100G · 급여일 예산 +20G

Unused temporary Event budget is not persistent NPC Wallet.

## REFUSAL

Refusal reason must match actual Engine reason.

Player-facing valid reasons include:
- 돈이 부족함
- 가격이 너무 높음
- 이 물건은 필요하지 않음

Do not use vague intermediate copy that obscures what happened.

Presentation only: the refused price button shakes once and locks with the existing `오늘 거절됨` / `더 싼 값을 거절함` / `바가지를 거절함` text, and the refusal reply stays 5 s (contract -> `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT).

Logical retry rules:

### insufficient wallet
If 50% is unaffordable: same Item at 100/150 is not a meaningful retry.

### 바가지 refused
If 150% is refused, the same Item is not sold to that customer this visit at any price (User 2026-10-04: a refusal that cost
nothing made `바가지 first, 정가 if refused` the dominant play), and the customer's Loyalty drops by 2
(`DATA.pricing.overcharge.refusalLoyalty`; NPC_TRAIT §NPC-Q-v28-2B).

### item not wanted
Lowering price does not guarantee purchase.

Refusal state must not incorrectly block other logically valid choices.

## SAME-ITEM REFUSAL PRICE CEILING — EXACT

For the same ordinary customer + same SKU + same visit, an actual refusal creates a price ceiling for the remainder of that visit.

Rule:

```text
if a price mode is refused for the same SKU
-> every higher price mode for that same SKU is disabled for that customer visit
-> lower price modes may still be attempted, except after a refused 150%, which disables every price mode for that SKU
```

Exact cases:

```text
50% refused  -> 100% disabled, 150% disabled
100% refused -> 150% disabled, 50% may still be attempted
150% refused -> 100% disabled, 50% disabled (the SKU is closed for that customer visit)
```

Rules:
- the refused price mode itself also becomes unavailable for that Item
- this lock applies only to the same customer + same SKU + current ordinary visit
- it must not lock unrelated SKUs (other Item IDs are unaffected)
- cheaper price modes remain eligible unless separately refused/blocked or the refusal was at 150%
- a new customer visit begins from that visit's normal pricing state unless another owner explicitly defines persistence
- higher-price controls blocked by this rule must be visibly disabled
- the reason for the disabled state must be readable in UI
- do not reroll purchase acceptance at a higher price after the same customer already refused the lower price for that SKU

Purpose (constraint): prevent retry/RNG fishing where a lower-price refusal is followed by a higher-price purchase of the
same item. This is a coherence rule for the ordinary 50/100/150 pricing system, not a Loyalty or negotiation subsystem.

## REFUSAL RETRY TRUTH — EXACT

Player help copy:

    한 가격을 거절하면 같은 상품은 그 가격과 더 비싼 가격으로 그날 다시 제안할 수 없다. 바가지를 거절하면 그 상품은 그날 그 손님에게 팔 수 없다.

Do not describe the rule as only \`같은 상품·같은 가격\`.

## PRICE / ITEM COMMIT

A confirmed purchase atomically updates NPC Wallet, Player Gold, Inventory physical unit, NPC purchased bag, Consumer
Slot, Loyalty/relationship effects if applicable, and the sale/history record.

No partial state where Gold changed but stock did not, or stock changed without purchase state.

## TRANSACTION RESULT — PER CUSTOMER

The real result of the player's own price choice is shown at the moment of each sale or refusal, for that customer, never as a summary at the end of the day.

- sale: a receipt stub appears at the counter for about 2.5 seconds and reads `단골도 {±N} · 소지금 {A} → {B}` (the customer's Loyalty change of this sale and their Wallet before → after; exact format -> `COPY_AUDIT_APPROVED_v2.8.0.md` §4-24). It reserves no layout height, overlaps the counter band, and a second sale to the same customer replaces it. It is not a system message and not a toast.
- refusal: the customer's reply line is drawn from the pool of the engine's actual refusal reason (§REFUSAL: 가격 / 필요도 / 일반 선택 — COPY_AUDIT §18-4 / §18-5 / §18-6) and stays the reply-line 5 seconds (PRESENTATION_PRINCIPLES §TRANSACTION BEAT A2). A refusal that reduces Loyalty also shows `단골도 {−N}` at the receipt-stub location for about 2.5 seconds, small and muted red, without a Wallet row or new motion. Use the actual clamped decrease. No new reply pool is added.
- both are presentation of the resolved state: no gameplay rule, Save field or RNG draw.

## SALE FINALIZATION

When Customer is finalized, selected purchases are locked, actual destination remains fixed, expedition prep is
committed, and the Customer proceeds to later Night resolution.

After finalization, normal management actions must not retroactively alter this Customer's committed expedition setup.

## NO-SALE CHOICE

Player may choose to sell nothing; this is a valid strategic choice.

Potential benefit: preserve stock, preserve cash/inventory strategy, avoid low-margin sale.
Potential cost emerges from existing systems: NPC may be less prepared, future customer value may be lost, long-term
roster strength may fall.

No separate punishment subsystem exists solely because Player sold nothing.

## RETURNING NPC — LAST EXPEDITION QUICK SURFACE

When a returning NPC has a recent-expedition snapshot owned by `NPC_TRAIT_v2.8.0.md`, show one compact quick surface:

```text
지난 원정 · DAY X · 결과 · [item] [item]
```

Rules:
- only actually accepted/purchased Item IDs from that expedition; empty slot remains empty; no causal claim from Item presence alone
- the quick surface is desk-only (≥1024); on phone the NPC detail 원정 기록 holds the last expedition
- detail may expand actual destination, Outcome, Item names, and only proven contribution tokens

No Product XP / Favorite Meter / Familiarity Bonus exists.

## RELATIONSHIP

Paid purchases may affect Loyalty according to canonical NPC/economy rules.

- 50%: future-value investment direction
- 150%: higher current-profit direction
- Free/Event actions must not create repeatable Loyalty farming.

Canonical -> NPC_TRAIT_v2.8.0.md, ECONOMY_ORDER_v2.8.0.md.

## SALE INFORMATION HONESTY

Player-facing text must reflect actual state. Do not claim an Item is required when it is not, imply guaranteed
survival, blame blocked Hazard for unrelated failure, show a destination as certain if Engine state is not certain, or
hide a materially important Trait effect.

Rule:
`Player가 보는 정보와 실제 성능이 최대한 정직하게 연결되어야 한다.`

## CROSS-SYSTEM REVENUE SIGNAL

Committed sale revenue contributes to Canonical Cumulative Gross Sales owned by ECONOMY_ORDER.
BOSS/GREED may read that metric; SALE does not create a Boss-only sales counter.

## SALE LAYOUT — DESKTOP

- Character / Portrait on the left; the upper-right area is the Core Decision area, holding Forecast + Expected Destination and the NPC Wallet
- Bag is materially larger in visual and touch size (capacity unchanged)
- forecast/destination are not repeated in lower panels

## SALE LAYOUT — MOBILE

- vertical composition; Character / status top footprint reduced without cropping artwork
- Bag absolute visual/touch size enlarged, never overflowing or overlapping status/card boundaries
- Expected Destination compact and immediately readable; Forecast follows the relevant recent-expedition/current-decision information
- core environment information visible without tap; no duplicated environment / forecast blocks
- no tiny compressed multi-column layout
- the counter tray sits fixed above the dock; the price keys are always in the same place

Core environment example form (the numbered row, no label, no `?`):
`북부 설원 폐허 I · 냉기 · 대응 13 필요 · 강인함 3당 대응 1 제공`

Tap/tooltip may add detail; it may not hide the core risk needed for the sale decision.

## MOBILE / INTERACTION

Sale is a high-frequency interaction phase. Design goal: preserve meaningful Item/price/remaining-slot decisions while
reducing repeated reading and navigation cost.

Requirements:
- NPC detail readable in vertical stack on mobile
- returning NPC shows relevant since-last-visit changes/history prominently while full profile remains accessible
- inspect -> Item -> price -> result -> next-slot flow stays continuous without unnecessary page/modal round trips
- no redundant confirmation steps or mandatory long animations for routine sales
- transaction beats follow `PRESENTATION_PRINCIPLES_v2.8.0.md` §TRANSACTION BEAT: one sale's beats total < 600 ms, never block input, skipped under `prefers-reduced-motion` with the same end state
- repeat actions use practical touch targets (~44px class); price choice and item choice stay visually clear; primary action remains obvious

Do not solve pacing by removing a decision that can change after a purchase/refusal result.

Detailed presentation -> UI_UX_v2.8.0.md.

## SALE RUNTIME CONTINUITY

Within the same Customer, the current scroll position and practical focus are preserved across item selection,
counter tray fill / clear (the shelf list never changes height), purchase success, refusal and reselection, and
accordion/detail open/close.

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
- no 100% or 150% price selection and no purchase/refusal RNG in Final preparation; the same-SKU refusal price ceiling does not apply because there is no Final refusal roll
- exactly two Item slots remain; Player may leave a slot empty; sequential slot handling remains (no bundle/cart checkout)
- actual inventory stock is consumed on committed transfer
- NPC Wallet must cover the fixed 50%/매입가 amount and is reduced by that exact amount; if unaffordable, the Item cannot be committed to that NPC
- Save/Load must not erase committed Final transfers or reopen committed participant selection for fishing

Ordinary SALE outside Final is unaffected.

For each committed Final transfer, Player Gold and Gross Sales both increase by the exact fixed 50% / 매입가 amount once, matching `ECONOMY_ORDER_v2.8.0.md` / `FINAL_EXPEDITION_v2.8.0.md` / `BOSS_v2.8.0.md`.
Do not double-count the transfer.

## FINAL ITEM USABILITY

If `FINAL_EXPEDITION_v2.8.0.md` marks an Item as having no Final effect, the Final preparation surface must clearly expose that fact and should block placing it into a Final Bag when practical.
Normal SALE behavior for the same Item is unaffected.

## QA

Acceptance criteria:
- CORE_RUN §QA
- ECONOMY_ORDER §QA
- NPC_TRAIT §QA
- UI_UX §QA

Deep Expedition nomination acceptance:
- one nominee maximum; current visitor only; no extra Job/Level/rarity eligibility
- nomination before first committed transaction
- unaffordable sponsorship cannot confirm
- confirmed Deep destination cannot be overwritten
- skip/expiry costs 0 and adds no penalty

## RELATED

game philosophy -> SPEC_INDEX §GAME CORE
NPC / Trait / destination / growth / recent snapshot -> `NPC_TRAIT_v2.8.0.md`
Item / inventory / Item effects -> `ITEM_v2.8.0.md`
price / Economy / Wallet -> `ECONOMY_ORDER_v2.8.0.md`
dungeon forecast / Hazard / Fatigue / Supply -> `DUNGEON_HAZARD_v2.8.0.md`
run / phase -> `CORE_RUN_v2.8.0.md`
night result / Night proof -> `NIGHT_CLOSING_v2.8.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.8.0.md`
presentation -> `UI_UX_v2.8.0.md`
