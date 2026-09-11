# UI_UX_QA

DOC=UI_UX_QA
OWNER=qa,ui,ux,event_reveal,mobile

DOC_VERSION=2.5.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.5.0
DOC_AUTHORITY=DESIGN_QA_SPEC


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
Open mobile/desktop Order with base offer count, then with any authoritative offer-count modifier.

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
Inspect Trait effect lines, preparedness, selected, disabled states.

EXPECT:
- Trait benefit/cost meaning is not inferred from color alone
- effect wording remains clear without color
- preparedness/selected/disabled states also have text/icon/shape reinforcement

PASS:
Meaning is not color-only and Trait header color is not used as a hidden quality grade.

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

## UI-Q33 — DESTINATION UNCERTAINTY / PILGRIMAGE RESULT
SETUP:
Trigger the destination reliability tutorial, 허세, and 게이트 순례주간.

EXPECT:
- Tutorial says: `특성이나 당일 상황에 따라 예상 목적지와 실제 목적지가 달라질 수 있습니다.`
- Tutorial does not frame 허세 as the whole destination system
- Sale label uses 예상 목적지 where uncertainty is possible
- 게이트 순례주간 Morning reveal states 1–3 affected range
- actual N / affected identity / changed Gate remain hidden until Night
- Night shows actual changed count and expected -> actual destination on affected NPC results

PASS:
Information is uncertain but not unfairly opaque, and no extra Event-result phase is created.

## UI-Q34 — TRAIT HEADER DOES NOT PRE-JUDGE QUALITY
SETUP:
Open NPCs with positive, mixed, and negative internal Traits.

EXPECT:
- no Player-facing `이점/양면/약점`
- no ▲/◆/▼ Trait quality label
- each effect line follows authoritative semantic tone metadata
- mixed Trait can visibly contain both helpful and harmful lines

PASS:
Player reads effects and makes the judgment.

## UI-Q35 — HAZARD EFFECT ACCESS
SETUP:
Inspect all authoritative Hazards on PC and mobile.

EXPECT:
- each Hazard provides its short Stat-pressure explanation
- PC hover/focus works where tooltip is used
- mobile tap/inline gives equivalent information
- current Gate summary can surface the explanation without encyclopedia hopping

PASS:
No hover-only or inconsistent Hazard explanation.

## UI-Q36 — RELIC VISIBILITY / QUICK VIEW
SETUP:
Own Relics and move through Morning -> Order -> Sale.

EXPECT:
Owned Relic effects remain quickly accessible in all three phases.
Sale view is read-only.

PASS:
Player can recall store-build effects while making decisions without violating purchase timing.

## UI-Q37 — RELIC MILESTONE REVEAL
SETUP:
Reach D5/D10/D15/D20/D25/D30.

EXPECT:
New candidate window receives one focused reveal.
Buy / `나중에 결정` are clear.

PASS:
D10/D15 etc. never feel like the Relic choice simply failed to appear.

## UI-Q38 — MOBILE 360 / 390 / 430 SCREENSHOT QA
SETUP:
Capture actual browser screenshots at 360px, 390px, 430px for:
- Morning
- Order
- Sale
- Night
- Closing
- Relic reveal
- Final prep

EXPECT:
- core text readable without zoom
- unnecessary side gutter minimized
- current decision/action is clear in first viewport
- game art/object does not push necessary decision information excessively downward
- layout is recomposed, not merely shrunken desktop
- sticky action/safe area remains reachable

PASS:
All three widths are practically playable and do not feel like a tiny desktop page.

## UI-Q39 — MONSTER KNOWLEDGE PROGRESS COPY
SETUP:
Open Monster Knowledge/Codex with progress.

EXPECT:
Progress label is:
`보급 생환 N회`

PASS:
Old `관찰 N회` progress wording is absent.

## UI-Q40 — BOSS / RELIC REVEAL ORDER
SETUP:
Reach D5, D15, D30 with relevant Boss state.

EXPECT:
- D5 Identity is read before D5 Relic choice
- D15 exact Trait is read before D15 Relic choice
- D30 Family Pair is read before D30 Relic/Sloth choice
- Save/Reload does not reorder or replay reveals as an exploit

PASS:
The Player receives information before the decision it is intended to affect.

## UI-Q41 — SLOTH WINDOW CHOICE CLARITY
SETUP:
Open a selected SLOTH opportunity window.

EXPECT:
Player can distinguish the mutually exclusive outcomes:
- acquire normal Relic
- break one Sloth Seal for 0G

PASS:
No UI implies both can be obtained from the same window.

## UI-Q42 — META PROGRESSION PRESENTATION
SETUP:
Open Meta/HQ progression on accounts with different matrix states and Franchise Grades.

EXPECT:
- no Global Meta XP progress bar is presented as current truth
- Job × Boss clear cells are readable
- per-Job Mastery and Total Mastery derive consistently
- Distinct Boss unlock milestones 1/3/6 are clear
- Franchise Grade derives from Total Job Mastery
- Franchise Grade is presented as prestige/status plus Start Contract availability gate, not a hidden stat boost
- locked non-default Start Contracts communicate their required Franchise Grade
- unlocked Start Contracts are selectable options, not automatically active Grade bonuses
- legacy Day / Run-count / regular-customer / adventurer-level contract gates are absent as current progression truth

PASS:
UI matches META_v2.5.0 and does not resurrect legacy progression truth.

## UI-Q43 — BOSS REVEAL PRESENTATION / FINAL PREVIEW / VISUAL STATE
SETUP:
Reach D5 and D15 for multiple Bosses, then enter Final with:
- PRIDE
- ENVY
- GREED
- GLUTTONY
- LUST
- one non-SLOTH ordinary Boss
- SLOTH at Seal Break 0 and at 1/2/3 where practical

EXPECT:

D5:
- in-world `길드 토벌 공고` framing
- correct D5/D15 BASE art
- correct fixed Boss name
- correct Boss-specific Flavor
- exact Trait remains hidden

D15:
- `길드 정보 보고` framing
- same BASE identity art
- exact Trait Function visible
- no strategy advice replacing Function
- no internal design terminology in Player-facing copy

D30:
- `최종 정찰 보고` framing
- exactly two Families
- each Family's actual T2 Hazard set
- authoritative Hazard pressure wording
- Family count is not mistaken for a fixed Hazard-key count

Final preview:
- PRIDE participant 투력 original -> applied
- ENVY target 4 Stats original -> applied
- GLUTTONY affected 보급품 raw Stat original -> applied
- LUST affected non-regular participant 4 Stats original -> applied
- GREED display matches actual applied strengthening
- SLOTH displayed state matches Seal state

Final art:
- ordinary Boss uses D30 BATTLE
- SLOTH SB0 reuses BASE
- SLOTH SB1/SB2/SB3 uses matching D30 state
- Final confrontation is not text/name-only

PASS:
Boss art, exact information timing, and previewed applied values match the actual Final resolution without creating a new permanent Phase or exposing exact success probability.

## APPROVED_AMENDMENT_2026_09_12 — GREAT SUCCESS / DEEP TUTORIAL / NOMINATION QA

### GREAT SUCCESS SIGNAL
PASS:
- exact copy `대성공을 노려볼 만합니다.`
- visible while preparation can still change
- updates with preparation
- exact % / margin / formula hidden

### GREAT SUCCESS TUTORIAL
PASS:
- explicitly teaches Great Success exists
- extra preparation can raise its chance
- Great Success has additional reward

### FIRST DEEP TUTORIAL
PASS:
- not shown before actual first Deep occurrence
- shown on account's first actual occurrence
- not repeated next Run
- survives current Run abandon
- full reset clears it
- after full reset, appears again on next first occurrence
- teaches optionality, harder Combat, nomination, sponsorship,
  NPC EXP/Wallet reward, Store Gold return=0

### NOMINATION UX
PASS:
- one NPC maximum
- current visitor only
- before first committed transaction
- sponsorship exactly once
- destination + forecast update
- no cancel/swap
- skip has no cost/penalty
- future visitor identity remains hidden

Mobile follows existing touch/hierarchy rules.
