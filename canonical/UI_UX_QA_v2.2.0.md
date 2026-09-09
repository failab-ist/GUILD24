# UI_UX_QA

DOC=UI_UX_QA
OWNER=qa,ui,ux,event_reveal,mobile

DOC_VERSION=2.2.0
CANONICAL_SET=GUILD24_CANONICAL_v2.2.0


Status values are NOT stored here.
This file defines acceptance criteria only.

## UI-Q01 — PHASE IDENTITY
SETUP:
Review Morning/Order/Sale/Night/Closing side by side.

EXPECT:
Each has distinct primary purpose/composition.

PASS:
They do not look like the same dashboard template with different text.

## UI-Q02 — DASHBOARD SLOP CHECK
SETUP:
Inspect major screens.

EXPECT:
No excessive:
- nested cards
- chips/badges
- same-radius containers
- thin-border boxes
- full-screen brand green

PASS:
Gameplay object/action hierarchy is stronger than container decoration.

## UI-Q03 — MORNING HIERARCHY
SETUP:
Open Morning on both Event and non-Event Days.

EXPECT:
Non-Event Day:
- visitor forecast / Gate / known Hazard are quickly readable

Event Day:
- Event receives a focused opening reveal before Gate detail
- Event title and actual effect are understandable immediately
- after confirmation, the normal Morning Situation shows the Event-modified state
- no separate EVENT Phase is created

PASS:
Today's situation is understandable and a meaningful Event is not buried among ordinary cards.

## UI-Q04 — ORDER SCENE
SETUP:
Open Order.

EXPECT:
No unnecessary convenience-store scene dominating the page.

PASS:
Management information is primary.

## UI-Q05 — ORDER FUNDS
SETUP:
Change order quantities.

EXPECT:
Persistent:
- current Gold
- selected spend
- Gold after order

PASS:
Values remain visible and correct.

## UI-Q06 — ORDER OFFERS
SETUP:
Open mobile/desktop Order with base offer count, then with any canonical offer-count modifier.

EXPECT:
Base count=6. Modified counts may exceed 6. In both cases the offer list remains compact and scannable.

PASS:
UI supports the actual offer count without excessive card height or unnecessary scrolling.

## UI-Q07 — ORDER PRIMARY ACTION
SETUP:
Select order items.

EXPECT:
Confirm action is obvious and sticky/accessible.

PASS:
Player does not need to scroll back to find final action.

## UI-Q08 — REROLL VISIBILITY
SETUP:
Open Order with and without `발주 교환권`, then use Reroll repeatedly.

EXPECT:
- control clearly means Full-offer Reroll
- current cost is easy to find before use
- with `발주 교환권`, first daily cost is visibly 0G
- after use, the next same-Day cost updates to the next normal step

PASS:
No hidden/ambiguous Reroll scope, free-use state, or current cost.

## UI-Q09 — TIER FORECAST VISIBILITY
SETUP:
Open Morning/Order before spend.

EXPECT:
T1/T2/T3 next-day percentages visible and compact.

PASS:
Player can act on them before order commitment.

## UI-Q10 — SALE STORE PRIORITY
SETUP:
Open Sale.

EXPECT:
Store/customer is visual focus.

PASS:
Secondary cards do not overpower NPC decision.

## UI-Q11 — SALE NPC MOBILE STACK
SETUP:
Open narrow mobile viewport.

EXPECT:
NPC info stacks vertically:
identity/job
destination
stats
traits
condition
bag

PASS:
No tiny compressed multi-column block.

## UI-Q12 — INVENTORY REACHABILITY
SETUP:
Sale with many items.

EXPECT:
All sellable inventory can be reached/compared.

PASS:
No hidden items due to consumer-slot UI.

## UI-Q13 — PRICE BUTTONS
SETUP:
Sale on mobile.

EXPECT:
50/100/150 are visually distinct, large enough, and easy to switch.

PASS:
No mis-tap-prone tiny buttons.

## UI-Q14 — FORECAST LANGUAGE
SETUP:
Inspect Sale forecast.

EXPECT:
Combat:
우세/접전/불리

Hazard:
취약/불안/대응/충분

PASS:
No exact probability or master score.

## UI-Q15 — FORECAST TUTORIAL
SETUP:
Trigger first forecast explanation.

EXPECT:
Explains estimate can differ from actual outcome.

PASS:
Does not reveal exact RNG/formula.

## UI-Q16 — NIGHT RESULT
SETUP:
Open Night.

EXPECT:
One NPC result at a time with hierarchy:
what happened
why
what changed

PASS:
Not a debug log or modifier ledger.

## UI-Q17 — NIGHT CONTROLS
SETUP:
Night on mobile/desktop.

EXPECT:
Next / Skip / Skip All accessible.

PASS:
Presentation can be advanced quickly.

## UI-Q18 — CLOSING ECONOMICS
SETUP:
Open Closing.

EXPECT:
Economic result is visually primary:
revenue/COGS/margin/overhead/waste/relic/final Gold

PASS:
Night story is not duplicated as dominant content.

## UI-Q19 — TUTORIAL OVERLAY
SETUP:
Trigger tutorial steps.

EXPECT:
- dim background
- spotlight target
- anchored bubble
- no layout push
- next/skip

PASS:
No in-flow instructional green card.

## UI-Q20 — TUTORIAL RESPONSIVE POSITION
SETUP:
Trigger tutorial near viewport edges on mobile.

EXPECT:
Bubble repositions and target remains reachable/visible.

PASS:
No clipped or offscreen instruction.

## UI-Q21 — TUTORIAL PERSISTENCE
SETUP:
Complete tutorial and reload.

EXPECT:
Completed tutorial does not restart.

PASS:
Completion state persists.

## UI-Q22 — TOUCH TARGETS
SETUP:
Inspect repeated mobile actions.

EXPECT:
Practical ~44px-class targets for:
- +/-
- price
- confirm
- next
- reroll
- item/customer selection

PASS:
No dense tiny tap zones.

## UI-Q23 — SAFE AREA
SETUP:
Test mobile browser with top/bottom chrome and safe-area devices.

EXPECT:
No clipped:
- header
- sticky footer
- primary action

PASS:
Controls remain reachable.

## UI-Q24 — COLOR-INDEPENDENT SIGNAL
SETUP:
Inspect Traits/preparedness/selected/disabled states.

EXPECT:
Icon/label/shape/text reinforces color.

PASS:
Meaning is not color-only.

## UI-Q25 — ITEM DECISION INFO
SETUP:
Order/Sale item comparison.

EXPECT:
Player can see key:
- effect
- relevant Counter
- explicit penalty
- price

PASS:
Basic choice does not require encyclopedia hopping.

## UI-Q26 — HAZARD NUDGE
SETUP:
Inspect known hazard presentation.

EXPECT:
Hazard relevance is clear.

PASS:
UI does not directly prescribe exact optimal Item.

## UI-Q27 — COPY COMPACTNESS
SETUP:
Review all primary screens.

EXPECT:
Short concrete state-based text.

PASS:
No repeated explanatory paragraphs that compete with gameplay.

## UI-Q28 — DESKTOP/MOBILE PRIORITY
SETUP:
Compare wide and narrow layouts.

EXPECT:
Same information priority, different composition where needed.

PASS:
Mobile is not just shrunken desktop.

## UI-Q29 — RETURNING NPC DELTA VISIBILITY
SETUP:
Revisit an NPC after meaningful growth/injury/recovery/expedition history change.

EXPECT:
Relevant since-last-visit change/history is immediately noticeable while full current profile remains accessible.

PASS:
Player does not need to reread the entire unchanged profile to understand what changed.

## UI-Q30 — SALE CONTINUITY WITHOUT DECISION LOSS
SETUP:
Process a Customer through multiple Consumer Slots including a purchase/refusal that can change the next-slot choice.

EXPECT:
Inspect -> Item -> price -> result -> remaining-slot decision is continuous with no unnecessary modal/page round trip or redundant routine confirmation.

PASS:
Interaction cost is reduced without batching away the sequential decision.

## UI-Q31 — NIGHT IMPORTANCE WEIGHTING
SETUP:
Compare routine success with meaningful level-up/injury/death/decisive-Item/callback results.

EXPECT:
Routine result is compact; meaningful result receives stronger visual emphasis.

PASS:
Night does not force every NPC result to consume equal presentation time.

## UI-Q32 — PLAYER STAT TERMINOLOGY
SETUP:
Inspect NPC profile, Item previews, growth/result displays, and any stat labels.

EXPECT:
Player-facing core stats are consistently:
- 투력
- 강인함
- 기동
- 정신

Actual battle/fight wording may still use `전투`.
Internal Power/Party Power is not exposed as another player stat.

PASS:
No player stat remains mislabeled as `전투`.
