# GUILD24 v2.7+ — Core Play, Feel & Product Legitimacy Vision

> Project: 《던전 앞 편의점 / GUILD24》  
> Document role: **USER-APPROVED DIRECTOR VISION / v2.7 release design + v2.8+ defer routing**  
> Runtime semantic version target when adopted: **v2.7.0**  
> Planning label: **v2.7+**  
> Current live Design SSOT remains: `design_ssot/SPEC_INDEX_v2.6.1.md` until v2.7 adoption is formally promoted.  
> This document must not be used to alter v2.6.1 Adoption Recovery scope early.

---

# 0. DOCUMENT AUTHORITY / BASELINE RULE

## 0.1 Authority

Priority remains:

1. User's newest confirmed decision
2. current Design SSOT
3. current Source
4. older chat / proposal / report

This document is User-approved as the **future v2.7+ Director vision and scope router**.
It is not yet the current implementation Design SSOT while v2.6.1 Recovery is unfinished.

When v2.7 implementation begins, the required owner Specs / QA must be promoted or amended from this vision. WORK must not treat this single document as a substitute for owner Specs.

## 0.2 What `v2.7+` means

`v2.7+` is a planning/vision umbrella, not a runtime semantic version.

It defines:

- what must land in v2.7.0
- what is deliberately deferred to v2.8+
- what must not be added unless v2.7 playtest proves a real need

## 0.3 DIRECTOR DOCUMENT BASELINE rule

Where this document proposes a new number, threshold, timing, layout dimension, or tuning value without completed simulation/full-run playtest evidence, it is labeled:

`DIRECTOR DOCUMENT BASELINE`

Meaning:

- it is an intentional starting point, not a measured optimum
- it exists so WORK is not forced to invent a number
- it may change substantially after implementation/playtest
- a large later adjustment is acceptable and is not considered design failure
- it must not be presented as simulation-proven

Existing v2.6.1 Canonical numbers are not relabeled as Director baselines; they remain current inherited truth until explicitly revised.

---

# 1. v2.7+ RELEASE VISION

## 1.1 One-line player experience

> **두 칸뿐인 Bag으로 누구에게 무엇을 포기할지 고민하고, 직접 챙겨 보낸 선택이 NIGHT와 다음 방문에 남으며, 30일의 준비가 Final로 이어지고, 그 모든 과정이 웹앱이 아니라 하나의 게임 세계를 조작하는 것처럼 느껴지는 버전.**

## 1.2 Why v2.7 exists

Current play can converge toward:

`전투 전망을 접전~우세로 맞춤`
→ `Hazard 취약 제거`
→ `자원 부족 시 평범한 NPC 포기`
→ `희귀/고렙/유망 NPC 집중 투자`

The problem is not lack of content.
The problem is that too many situations converge to the same rational answer and the act of selling still risks feeling like form/UI operation instead of shop play.

v2.7 therefore improves seven connected axes:

1. **Decision Constraint** — Bag 2 slots remain scarce even late game.
2. **Decision Diversity** — Combat / Hazard / long-term Condition compete.
3. **Memory & Causality** — the player can remember what was sold and what happened.
4. **Run Purpose** — D0~D30 preparation has a visible final target.
5. **Physical Play Feel** — SALE decision itself becomes handling, not a separate minigame.
6. **Product Legitimacy** — remove generic generated/web-app visual grammar without expensive re-skinning.
7. **Information Trust** — player-facing copy must not imply mechanics that do not exist.

## 1.3 Non-goals

v2.7 is NOT:

- a content-count expansion patch
- a new combat game
- a new crafting minigame
- a new expedition-purpose system by default
- a whole-background art remake
- a new UI framework
- a new font package
- a character-expression asset expansion
- a product mastery/XP system
- a broad meta-progression expansion

Rule:

`REMOVE / REUSE / MERGE / CLARIFY / REBALANCE → only then ADD.`

---

# 2. ENTRY GATE — v2.6.1 MUST CLOSE FIRST

v2.7 implementation does not begin until v2.6.1 Adoption Recovery has completed its frozen acceptance.

Required gate:

- current v2.6.1 owner Specs adopted
- main loop runtime blocker = 0
- ORDER confirm / start-sale separation works
- SALE wallet / environment / layout / scroll continuity works
- NIGHT causality / fatigue report truth works
- Save v7 exact behavior works
- mobile and desktop smoke complete
- Console Runtime Error = 0
- frozen QA run is performed from a clean known state

Reason:

v2.7 changes decision structure. It must not be balanced against a partially recovered v2.6 implementation.

---

# 3. v2.7 IMPLEMENTATION SEQUENCE

The preferred sequence is:

1. v2.6.1 Recovery close
2. Bag always 2 slots
3. Fatigue measurement / tuning
4. Item Role Rebalance
5. Last Bag + NIGHT causality + revisit connection
6. D-Day / Recon / D25 Final prereveal
7. SALE Counter Handling / Action Layer
8. Anti-AI-Slop Visual Pass
9. Truth-Critical Copy Pass
10. full-run playtest / balance
11. v2.7 freeze

Do not move Visual polish before core SALE interaction is structurally stable if that would cause the same surface to be redesigned twice.

---

# 4. P0 — BAG CAPACITY: ALWAYS 2

## 4.1 Rule

All normal SALE customer expedition Bags are exactly **2 consumer slots**.

Remove the current `Lv10+ = 3 slots` growth rule for v2.7.

No hidden Job / Trait / rarity / level rule may create a third normal consumer slot unless a later explicit Design owner adds one.

## 4.2 Why

The third slot erodes late-run decisions by allowing one NPC to cover too many axes at once:

- Combat
- Hazard
- Supply/Fatigue
- Insurance/Economy/flex

NPC growth should mean:

> the same 2 slots can be used in more sophisticated ways

not:

> the player eventually stops having to choose.

## 4.3 Required adoption audit

Before implementation, audit all current paths that can affect capacity:

- level-based slot increase
- Trait / Event / Relic effects if any
- tutorial/help/copy
- Sale Bag UI
- save/load state
- test fixtures
- notebook/history display
- any hidden constants or stale labels

If a current system explicitly rewards extra slots, do not silently convert that reward into another bonus. Report it as a separate design migration item.

## 4.4 UI / interaction

- two slots remain visibly present even when empty
- each slot remains a practical 44px-class touch target on mobile
- empty and occupied states must be immediately distinguishable
- no third disabled ghost slot for high-level NPCs
- Bag enlargement is visual/touch-size only; it does not create capacity

## 4.5 Acceptance

PASS only when:

- low-level and high-level NPCs both expose exactly 2 normal slots
- no late-run state grants a silent third slot
- save/reload cannot restore a third slot
- no stale copy claims Lv10+ capacity growth
- Final/other special owner behavior is not accidentally changed unless separately adopted

---

# 5. P0 — FATIGUE AS A REAL THIRD PREPARATION AXIS

## 5.1 Role

The target decision is not `전투 + Hazard` alone.

It becomes:

`Combat / Hazard / long-term Condition`

with only two Bag slots.

Example:

- Combat forecast = 접전
- Cold readiness = 취약
- Fatigue = 8

Then the player may choose:

- Combat + Cold → today-first; fatigue ignored
- Cold + Food/Drink → survival/condition-first; combat investment reduced
- Combat + Food/Drink → accept Cold risk

Each option must be plausible in at least some states.

## 5.2 Current inherited baseline

Current v2.6.1 outcome fatigue baseline is already:

- Success +2
- Great Success +2
- Retreat +3
- Injury +4
- Severe Injury 0
- Death 0

Current fatigue thresholds remain:

- 0~9: no Stat penalty
- 10~19: mobility/spirit -10%
- 20: mobility/spirit -25%

Natural morning recovery remains removed.

Do NOT describe the current +2/+3/+4 values as a new v2.7 increase. They are the measurement baseline inherited from v2.6.1.

## 5.3 Tuning procedure

### Step A — first playable measurement

First test `Bag=2` with the current v2.6.1 fatigue numbers unchanged.

Reason:

fixing Bag capacity already increases the opportunity cost of bringing Food/Drink. Changing both scarcity and fatigue gain at once would make root-cause reading harder.

### Step B — Director fallback tuning baseline

`DIRECTOR DOCUMENT BASELINE — NOT SIMULATION-DERIVED`

Only if Step A still makes fatigue routinely ignorable, first tuning step:

- Success +3
- Great Success +3
- Retreat +4
- Injury +5
- Severe Injury 0
- Death 0

Do not simultaneously change fatigue penalties, recovery formula, outcome gain, and item Supply in one balance pass.

### Step C — desired pressure window

`DIRECTOR DOCUMENT BASELINE — NOT SIMULATION-DERIVED`

Desired full-run feel:

- a repeatedly used NPC can realistically reach the first penalty band after roughly 3~5 expeditions if the player never spends a slot on recovery
- Fatigue 20 is a credible overuse consequence, not a normal automatic state for every active NPC
- using Food/Drink to reduce fatigue must consume a slot that could otherwise solve Combat/Hazard
- one Food/Drink should not trivially erase all accumulated fatigue every visit in the common case

These are playtest targets, not guaranteed turn counts.

## 5.4 Recovery interaction

Keep the existing single-system approach:

- Food/Drink Supply remains visible
- excess final Food/Drink Supply can contribute to fatigue recovery according to current owner rule
- no Hunger gauge
- no Thirst gauge
- no hidden Food+Drink pairing combo
- no caffeine stack subsystem

If recovery proves too strong or too weak, tune existing Supply/recovery values before inventing a new Condition subsystem.

## 5.5 Acceptance questions

- Is Food/Drink ever chosen over a combat or Hazard solution for a rational reason?
- Does the player sometimes protect a familiar NPC's future instead of maximizing today's result?
- Can high-level NPCs still become unattractive to overuse because condition matters?
- Is Fatigue readable before the decision and truthfully reported after NIGHT?

---

# 6. P0 — ITEM ROLE REBALANCE

## 6.1 Rule

Do not solve v2.7 by adding a new Item taxonomy UI or a large new catalog.

Current active catalog target remains around the existing 30-item structure.

`REWORK EXISTING BEFORE ADD` remains the default.

## 6.2 Required strategic lanes

The current catalog must create competing reasons to occupy one of only two Bag slots:

1. Combat/Stat support
2. narrow Hazard specialist
3. flexible Hybrid response
4. Supply/Fatigue management
5. Condition/Insurance
6. Economy / loot-value direction
7. explicit RiskReward / special utility

These are design analysis lanes, not mandatory player-facing labels.

## 6.3 Category identity guardrails

### Food / Drink

Primary value:

- Supply / Fatigue management
- plus limited Stat or Hybrid identity where already appropriate

Do not let a common Food/Drink become simultaneously:

- top Supply
- top Combat
- top Hazard counter
- top economy

without a clear cost or rarity reason.

### Medical

Primary value:

- condition / injury / recovery / insurance identity

Potion remains general Stat/recovery, not the best injury insurance.
Bandage/First Aid remain injury-specialist lines.

### Field Gear

Primary value:

- Hazard specialist or explicit hybrid coverage

A lower-rarity specialist may remain better than a higher-rarity generalist on its exact Hazard.

### Insurance

Primary value:

- bad-outcome mitigation/conversion

Insurance must not become hidden direct success chance.

### Special

Primary value:

- explicit exceptional operation

Do not create micro-systems merely to justify one Special item.

## 6.4 Hazard coverage remains

Every canonical Hazard must retain:

- 1 Main specialist route
- at least 2 meaningful Alternative routes

But with a 2-slot Bag, no single item should collapse an entire Family plus Combat/Fatigue into one universal answer.

## 6.5 Director rebalance baseline

`DIRECTOR DOCUMENT BASELINE — NOT SIMULATION-DERIVED`

For ordinary items, design toward:

- one immediately understandable primary identity
- at most one important secondary decision hook in the common case
- broader multi-role identity reserved for items whose rarity/cost/tradeoff justifies it

This is a review baseline, not a mechanical hard cap. Existing items with three listed internal roles are not automatically invalid; they must be checked for actual dominance.

## 6.6 Do not globally raise prices

Global price inflation is specifically rejected as the first response.

Reason:

`less money → abandon ordinary NPCs → concentrate on ace NPCs`

would reinforce the exact convergence v2.7 is trying to break.

Price tuning must follow item role, affordability, margin, and wallet pressure per SKU/role.

## 6.7 Required catalog audit

For all active items, record:

- current primary gameplay reason
- current secondary reason if material
- which of the 7 strategic lanes it competes in
- whether it is a universal-best candidate
- whether it is a dead pick
- whether a cheaper/lower-rarity specialist is invalidated
- whether its price reinforces or distorts its intended role
- whether its effect is visible and understandable before sale

Do not add a new item until a missing role cannot reasonably be solved by rebalancing an existing item.

## 6.8 Acceptance

v2.7 Item rebalance is successful when:

- more than one rational Bag pair can exist in the same broad situation
- the strongest combat item is not always the strongest overall item
- Food/Drink has a real slot opportunity cost and a real reason to be chosen
- direct specialist / hybrid / natural stat routes remain distinct
- rare/premium does not mean universally superior
- there is no mandatory single SKU for a common Hazard

---

# 7. P0 — LAST BAG + NIGHT CAUSALITY + REVISIT MEMORY

## 7.1 Goal

Complete the core loop:

`SALE choice → NIGHT result → memory → next SALE judgment`

without a new History subsystem.

## 7.2 Stored snapshot

For each NPC, retain the most recent completed expedition summary needed for revisit display:

- expedition day
- destination actually resolved
- outcome
- exact accepted/sold Bag items for that expedition
- proven item contribution/cause tokens already available from resolved report

Do not store a new unlimited per-NPC timeline for v2.7.

`DIRECTOR DOCUMENT BASELINE`

The player-facing quick memory surface uses only the **most recent completed expedition**. Older history remains wherever the existing notebook/history already owns it; v2.7 does not create another chronology UI.

## 7.3 Returning customer collapsed state

Show compactly, before the new sale decision:

`지난 원정 · DAY X · 결과 · [item icon] [item icon]`

Rules:

- icons are the actual purchased Bag, not inferred recommendations
- empty slot remains empty; do not invent a second item
- no text claiming causal credit merely because an item was present
- this summary must not push current Wallet / destination / forecast below the fold on common mobile viewports

## 7.4 Detail state

Expandable detail may show:

- previous Bag item names
- previous destination/result
- only proven contribution where runtime report contains evidence

Allowed causal language only when the report proves that an item/trait/event:

- prevented
- reduced
- converted
- or otherwise changed a resolved risk/outcome

If not provable, say only that the item was carried/purchased.

## 7.5 Item attachment without a new system

Do NOT add:

- product XP
- product mastery
- favorite-item meter
- hidden familiarity bonus

Attachment comes from repeated continuity:

`ORDER buy`
→ `inventory/shelf`
→ `SALE Bag`
→ `NIGHT result`
→ `Last Bag on revisit`

## 7.6 Acceptance

A returning NPC should allow the player to answer, without opening a separate history screen:

> “지난번에 뭘 줬고, 어떻게 됐지?”

within a few seconds.

---

# 8. P1 — D0~D30 D-DAY / RECON / FINAL PREREVEAL

## 8.1 Purpose

The 30-day run must have a visible strategic horizon from the beginning.

The player should not discover the relevant Final environment only at D30 after the preparation window is already over.

## 8.2 Timeline

### D0

- tell the player that D30 contains the Final expedition / Demon King objective
- establish that the Guild is gathering information during the run

### D5

- retain existing Demon King information event if currently owned elsewhere

### D10

- show `FINAL까지 20일`
- communicate that investigation is progressing

### D15

- retain existing additional Demon King information event if currently owned elsewhere

### D20

- show `FINAL까지 10일`
- dispatch the final-environment recon in narrative/presentation

### D25

- show `FINAL까지 5일`
- generate/finalize the exact **Final Family Pair** that D30 will use
- derive and reveal the resulting authoritative Final Hazard Pool from those Families
- persist this Final recon state immediately

### D30

- use the exact persisted D25 Final Family Pair / Hazard Pool
- do not reroll at D30

## 8.3 Clarification vs old wording

The Final system currently operates from **two Dungeon Families** and derives their T2 Hazard Pool.

Therefore v2.7+ does NOT reinterpret the plan as “pick any arbitrary two Hazard keys.”

The D25 prereveal is:

> exact Final Family Pair + the resulting actual Hazard information the D30 Final will use.

This preserves current Final architecture while moving information generation earlier.

## 8.4 Preparation contract

After D25, the remaining five days may be used to:

- Order
- Warehouse planning
- Reroll decisions
- NPC preservation/growth
- stock retention
- Final participant planning

Do NOT:

- guarantee required counter items in offers
- grant free counters
- add Final-only emergency stock
- create a special D25 shop

Preparation itself is the play.

## 8.5 Persistence / migration

D25 Final recon state must be run-seeded/persisted and immune to Save/Load reroll.

`DIRECTOR DOCUMENT BASELINE`

For migrated or development saves entering D25+ without the new recon snapshot:

- generate it exactly once on first valid load/entry
- persist immediately
- never regenerate on subsequent reload

Exact migration implementation belongs to CORE_RUN/Save owner at adoption.

## 8.6 Presentation

The player should be able to find the Final countdown and D25 revealed environment without opening a buried help modal.

Preferred reuse:

- MORNING board / current-run objective surface
- ORDER context secondary Final reminder after D25
- existing Final preparation surfaces

Do not create a new permanent dashboard card if the information can be placed in existing phase surfaces.

---

# 9. P1 — SALE COUNTER HANDLING / ACTION LAYER

## 9.1 Rule

Do not add a separate shop minigame.

Transform the current decision itself from:

`select item → select price → purchase/refusal`

into the felt action:

`pick → place into Bag → set price → hand over → accept/refuse → continue remaining slot decision`

The existing sequential purchase logic remains important: a first purchase/refusal can change the second-slot decision.

## 9.2 Mobile baseline interaction

Tap is mandatory baseline. Drag is optional enhancement.

### Bag focus

`DIRECTOR DOCUMENT BASELINE`

- two Bag slots are always visible in the Counter area
- first empty slot is the default target
- tapping an occupied Bag slot focuses that slot
- tapping a sellable item places/replaces the currently focused target
- after filling the first empty slot, focus may advance to the other empty slot
- an occupied slot has a clear remove/return action
- no destructive gesture is required to remove an item

This interaction may be adjusted after runtime usability testing; the non-negotiable point is that Tap alone completes the entire flow.

### Price

Keep authoritative price modes:

- 50%
- 100%
- 150%

Price affordability / Wallet truth must remain visible before commit.

### Hand-over / transaction commit

The final transaction action should visually communicate that the currently prepared item is being offered to the current NPC.

Do not merge the entire two-slot customer visit into one irreversible cart checkout.

Purchase/refusal happens in the existing sequential slot flow.

### No-sale

Selling nothing remains a valid strategic choice.

Counter handling must not visually shame or mechanically punish the no-sale choice beyond existing consequences.

## 9.3 Motion baseline

`DIRECTOR DOCUMENT BASELINE — NOT A NEW ANIMATION SYSTEM`

Use short, local movement only where it clarifies state:

- item → Bag: brief local transfer
- accepted sale: Bag/item moves toward customer side
- refusal: offered item returns toward player/Bag side

Avoid:

- long blocking animation
- physics simulation
- character hand rig
- new facial animation requirement
- animation that hides refusal reason

Routine SALE pace remains fast.

## 9.4 Desktop

- Click is complete baseline
- Drag may be optional
- inventory, Bag, price, Wallet, forecast, destination remain comparable on the same decision surface
- preserve the current left-character / upper-right core-decision hierarchy

## 9.5 Scroll / focus

Same-customer interaction must preserve practical scroll position/focus across:

- item selection
- Bag replacement/removal
- price open/close
- purchase success
- refusal
- next remaining-slot decision

Advancing to a new customer may reset to the customer decision start.

## 9.6 Acceptance

Player should feel:

> “내가 이 사람에게 이 물건을 챙겨준다.”

not:

> “폼에서 옵션을 선택하고 제출했다.”

without adding decision latency or a separate minigame.

---

# 10. P1 — ANTI-AI-SLOP VISUAL / UX PASS

## 10.1 Purpose

This is NOT a graphics high-end pass.

The target is:

> remove the rejection caused by generic AI-generated / SaaS / template-game UI grammar, while preserving the GUILD24 visual language that already works.

Do not reskin the whole game.

Strong existing identities to preserve:

- MORNING store/board/room
- ORDER paper form
- SALE character-centered asymmetric composition
- NIGHT dark/slate outcome hierarchy
- CLOSING receipt/till-roll metaphor
- wood / paper / metal / brass material primitives
- Galmuri atmosphere role
- Pretendard information role

## 10.2 Root diagnosis

The major issue is not:

- square corners
- lack of gradients
- lack of fonts
- low visual ornament

The major repeated generic grammar is:

> unrelated important actions repeatedly using the same large green Primary CTA face.

That makes action meaning disappear behind “this screen's primary button.”

## 10.3 Global visual principle

Prefer:

1. existing surface/material
2. typography hierarchy
3. whitespace
4. separator
5. inset/edge only where required

Reduce:

- standalone rectangles for every section
- independent backgrounds for every block
- identical shadows on unrelated controls
- identical large CTA across phases
- generic card-stack menu patterns

## 10.4 Green role — fixed v2.7+ direction

Strong Sign Green is reserved for **`영업 시작`**, the explicit transition from preparation into actual customer operation.

Do not use strong Green Primary for:

- first store-support choice
- store-support purchase
- Order confirmation
- send/finalize customer
- NIGHT next
- CLOSING next day
- save/export

This restores semantic scarcity to Green.

## 10.5 Action meaning × phase material

| Action | v2.7+ visual direction |
|---|---|
| 영업 시작 | strong Sign Green |
| 발주 확정 | Brass / transaction on paper context |
| 점포지원 구매 | Metal/Brass transaction |
| 일반 진행 | local phase material, not universal green |
| SALE customer finalize/progress | dark wood family |
| NIGHT 다음 | slate/dark steel |
| CLOSING 다음 날 | dark register/steel + restrained brass edge |
| Utility/System | steel/utility |
| Destructive | muted red/danger |

This table is not a mandate to create a new button-component framework.
Reuse current primitives and add only minimal semantic modifiers.

## 10.6 Menu

Current repeated standalone brown buttons are replaced by one menu surface with row navigation.

### Structure

- single-column index
- no 2×3 dashboard grid on desktop
- each row is a 48~52px-class touch target
- no independent background/shadow for every row by default
- subtle separator between rows
- `현재 지점 포기` separated vertically from normal navigation
- destructive action uses muted red text/treatment, not a huge red CTA

### Focus/selected treatment

`DIRECTOR DOCUMENT BASELINE`

- 3~4px brass left marker
- brighter text
- optional subtle inset
- do not add an icon set solely to make the menu feel custom

Desktop target width:

`DIRECTOR DOCUMENT BASELINE`

- approximately 460~520px-class single menu surface

Mobile keeps single column and 44px+ hit targets.

## 10.7 Settings

Settings becomes one coherent utility panel, not a stack of generic web cards.

Order:

1. save explanation
2. export/import utility row
3. sound master state
4. BGM row
5. SFX row
6. separator/space
7. destructive data section
8. version/local info

### Save

- steel utility family
- export and import are peers
- neither is green primary

### Sound master

`DIRECTOR DOCUMENT BASELINE`

Use a compact inline steel state control rather than a large primary button.
Preserve current accessible semantics where possible; exact HTML element is implementation-owned.

### Range sliders

Keep native `input[type=range]` semantics and keyboard accessibility.
Reskin only.

`DIRECTOR DOCUMENT BASELINE`

- dark recessed metal track
- square/rectangular brass thumb
- visual thumb ~16~20px
- interaction hit area remains 44px-class on mobile
- numeric percentage remains visible
- radius 0

No custom JS drag implementation.

## 10.8 New Store / Contract

Contract alternatives may remain card-like because they are true parallel choices.

### Selected state

`DIRECTOR DOCUMENT BASELINE`

Use both:

- brass left marker
- stronger full outline

Reason: selected contract must remain clear in peripheral/mobile reading without relying on color alone.

### Locked state

- not opacity-only
- requirement/lock reason readable
- disabled state clear

### Footer progression

`첫 점포지원 고르기` is not green.
Use brass/wood confirmation consistent with contract surface.

No literal stamp/object imitation.

## 10.9 Relic / Store Support

Keep existing fixture/plate language:

- metal plate
- bolts
- brass/gold price
- heavy fixture feel

Purchase action:

- same metal/brass transaction family
- no green
- pressed offset may be used

`무료` price should remain independently legible and not require a stronger CTA color.

## 10.10 MORNING

No large redesign.

Keep:

- room/store identity
- board
- gold register
- current wood control language

Do not turn `문 열기` into literal shutter art.
Do not force green merely because it progresses the flow.

## 10.11 ORDER

Keep paper form and economic decision surface.

After v2.6.1 confirm/start separation:

### 발주 확정

- brass / dark ink / transaction family
- clearly commits money/inventory
- stays in ORDER
- not green

### 영업 시작

- strong Sign Green
- strongest transition action in ORDER
- appears only when the player is actually moving to SALE

### Reroll

- utility/secondary
- must not compete visually with confirm/start

## 10.12 SALE

Keep character-centered composition and current core information hierarchy.

Customer-finalize/progress control:

`DIRECTOR DOCUMENT BASELINE`

- dark wood family
- ivory text
- maintain large touch target
- no green

Counter Handling may alter the exact control arrangement, therefore final selector/layout work occurs after Counter interaction structure is stable.

## 10.13 NIGHT

Keep cool/dark identity.

`다음`:

- slate/dark steel
- cold highlight
- readable ivory text
- remains visually above `전체 건너뛰기`
- not green

`전체 건너뛰기` remains secondary/bare.

## 10.14 CLOSING

Keep receipt/till-roll identity.

`다음 날`:

`DIRECTOR DOCUMENT BASELINE`

- dark register/steel family
- ivory text
- restrained brass edge/accent only
- no green

Do not make the receipt itself tearable/clickable.
The receipt remains information; the action remains a button/control sharing the same material language.

## 10.15 Typography

Do not add a new font.

Galmuri:

- DAY/world signage
- atmospheric labels
- selected display/LED role

Pretendard:

- body copy
- price
- stats/effects
- utility
- button labels
- longer Korean text

Do not solve identity by converting all body copy to pixel font.

## 10.16 CSS implementation constraint

Reuse current primitives:

- `--tex-wood`
- `--tex-paper`
- `--tex-metal`
- `--gold`
- `--sign`
- `--blood`
- existing `.pull`, `.brass`, `.bare`, `.danger`
- current phase-scoped selectors

Break the universal-green meaning of `.stamp` rather than creating a new theme engine.

Allowed:

- minimal semantic modifier/selectors

Forbidden:

- new CSS framework
- theme engine
- JS style abstraction
- new CSS reset
- third presentation override stylesheet for the same ownership
- broad selector duplication to overpower old rules

## 10.17 Explicit visual non-goals

Do not:

- convert buttons into literal objects
- make `문 열기` a shutter object
- make `영업 시작` an OPEN-sign object button
- make `다음 날` a receipt-tear interaction
- make `다음` a page-turn object
- add icons to every menu row
- round all cards
- add gradients/shadows for richness
- add fonts
- add badge clutter
- introduce irregular spacing merely to look handmade
- hide gameplay information to make screens cleaner
- sacrifice touch targets

## 10.18 Visual acceptance

Mobile:

- 360~390px class
- 412px class

Desktop:

- 1024px class
- 1280px+ class

Must verify:

- Menu no longer reads as six identical cards
- Settings no longer reads as generic web settings
- sliders no longer look browser-default while retaining semantics
- Green is no longer universal primary
- ORDER confirm and start-sale are visually distinct
- SALE/NIGHT/CLOSING progression controls do not share the same green face
- gameplay info hierarchy is preserved
- touch targets remain practical
- no overflow
- focus-visible remains
- no new modal nesting
- no desktop dashboard-card proliferation

---

# 11. P1 — TRUTH-CRITICAL COPY PASS

## 11.1 Scope in v2.7

Copy is a release-quality system when it changes player judgment.

v2.7 must fix copy that:

- states a stale number/rule
- implies a purchase preference that the engine does not have
- implies a destination or cause that is not true
- mislabels Player Gold vs NPC Wallet value
- describes an old flow after UI/rule changes
- claims an item/result relationship not supported by runtime evidence

## 11.2 Trait / intent examples

If a trait dialogue sounds like:

- Coward always wants Return Stone
- Glutton explicitly prefers Food
- Greed explicitly prefers expensive/rare goods

but no corresponding purchase-intent rule exists, the copy must not teach that false mechanic.

Either the mechanic exists in the owner rule or the copy must become truthful flavor.

## 11.3 Copy timing

Do not perform broad flavor-polish before gameplay rules settle.

Order:

1. rule truth
2. terminology truth
3. interaction-flow truth
4. only then flavor/voice polish

## 11.4 Deferred copy

Move to v2.8+ unless separately needed:

- large dialogue expansion
- global humor pass
- per-NPC voice expansion
- broad flavor-text rewrite

---

# 12. FULL-RUN VALIDATION AFTER CORE CHANGES

v2.7 is successful because of changed decisions, not because features exist.

Required questions:

1. In the same broad situation, are there at least two rational Bag combinations?
2. Is rare/high-level NPC concentration still always the dominant answer?
3. Does Food/Drink meaningfully compete for a Bag slot?
4. Do late-game NPCs still have to give something up because Bag stays at 2?
5. Does a returning NPC's Last Bag materially affect the next decision?
6. Does D25 Final prereveal change remaining Order/Warehouse/NPC strategy?
7. Does SALE feel like handling a customer rather than submitting a form?
8. Does the game still communicate all decision-critical information clearly after the visual pass?
9. Does any copy imply a rule the engine does not implement?

If 1~4 remain weak after rebalance, then and only then escalate to a new Decision Axis such as Expedition Purpose.

---

# 13. v2.8+ DEFER ROUTING

## 13.1 Expedition Purpose

Status: **DEFER TO v2.8+ / only if needed**

Potential value is high, but it adds a new Decision Axis.

Do not add if:

- 2-slot scarcity
- Fatigue pressure
- Item role diversity

already break strategic convergence.

If later adopted, purpose must change what result channel matters, not simply add Combat %.

Avoid:

- `토벌 = Combat +20%`
- all purposes scaling upward from Great Success alone

Possible later categories such as 토벌/채집/수련 remain examples, not current rules.

## 13.2 Store growth visual overlay

Status: **DEFER TO v2.8+**

Reason:

Anti-AI-Slop pass is existing-language cleanup.
Store growth overlay is new visual content production and asset management.

If later added:

- prefer small overlays/props
- avoid whole-background replacement
- tie visual change to actual run progression

## 13.3 Product Run History

Status: **DEFER TO v2.8+**

Do not create per-product analytics/history until Last Bag continuity proves insufficient.

## 13.4 Product mastery / XP / attachment meter

Status: **DO NOT ADD by default**

The v2.7 continuity loop should create attachment without another progression system.

## 13.5 Additional NPC expression assets / large dialogue expansion

Status: **DEFER / low priority**

Current priority is making existing character interaction and remembered consequences work.
New expression production has high consistency/asset-management cost relative to core-fun gain.

## 13.6 Advanced Drag / physics handling

Status: **DEFER TO v2.8+ unless nearly free**

Tap is the v2.7 complete control path.
Drag is enhancement, never mandatory.

## 13.7 New minigames

Status: **DO NOT ADD unless future evidence requires it**

SALE itself is the physical decision game.

## 13.8 Large desktop redesign

Status: **DEFER**

Keep mobile-first information structure.
Desktop may use width better but does not become a separate dashboard product.

## 13.9 New fonts / icon system / UI theme framework

Status: **DO NOT ADD for anti-slop purpose**

These do not solve the diagnosed issue and increase maintenance cost.

## 13.10 Large new item wave

Status: **DEFER**

Rebalance the existing catalog first.
Only add where a required role cannot be supported through current items.

## 13.11 Large Final-exclusive spectacle/cutscene

Status: **DEFER**

Final strategic preparation/readability comes first.

---

# 14. PRIORITY TABLE

| Order | Work | Release | Importance | Cost | Main reason |
|---:|---|---|---|---|---|
| Gate | v2.6.1 Adoption Recovery + Frozen QA | before v2.7 | Blocking | existing | trustworthy baseline |
| 1 | Bag always 2 | v2.7 | Critical | Low~Medium | restore scarcity |
| 2 | Fatigue measure/tune | v2.7 | Critical | Medium | third decision axis |
| 3 | Item Role Rebalance | v2.7 | Critical | High | make 2-slot choices genuinely different |
| 4 | Last Bag + NIGHT causality + revisit | v2.7 | Critical/High | Low~Medium | close memory loop |
| 5 | D-Day / D25 Final prereveal | v2.7 | High | Low~Medium | give run a visible horizon |
| 6 | SALE Counter Handling | v2.7 | High/Critical feel | Medium~High | physical shop play |
| 7 | Anti-AI-Slop Visual Pass | v2.7 | High | Low~Medium if reused | remove product-rejection grammar |
| 8 | Truth-Critical Copy | v2.7 | High | Low~Medium | protect information trust |
| 9 | Full-run balance / QA | v2.7 | Blocking | Medium~High | validate actual convergence |
| Later | Expedition Purpose | v2.8+ conditional | Potentially High | High | add only if rebalance insufficient |
| Later | Store growth overlays | v2.8+ | Medium | Medium~High | new art content, not current bottleneck |
| Later | Product Run History | v2.8+ | Low | Low~Medium | Last Bag first |
| Later | Extra dialogue/expression asset | v2.8+ | Low~Medium | High | expensive compared with core value |

---

# 15. PROMOTION / OWNER-SPEC RULE

Before WORK implements v2.7:

1. promote this approved vision into the relevant owner Specs only where rules actually change
2. create/update the matching QA ownership
3. do not duplicate the full vision text into every owner
4. preserve a single owner per numeric/system truth
5. mark all unresolved tuning baselines that still need playtest

Expected owner areas include at minimum:

- SALE
- DUNGEON_HAZARD
- ITEM
- NIGHT_CLOSING
- FINAL_EXPEDITION
- UI_UX
- COPY_WORLD_VOICE
- CORE_RUN / Save where persistence changes
- corresponding QA owners

WORK must not implement a Director baseline that has been superseded by later User approval.

---

# 16. FINAL DIRECTOR INTENT

v2.7 is complete when the game no longer needs “more stuff” to feel deeper.

The run should create difficulty through constrained, legible choices:

- only two things fit
- three or more concerns matter
- what was sold matters later
- the player knows what the 30-day run is preparing toward
- the sale action feels like shop handling
- the UI reads as GUILD24 rather than a generated application skin
- the text teaches only mechanics that are actually true

v2.8+ is where the project may become broader.

v2.7 must first make the existing game **sharper, more memorable, more tactile, and more legitimate as a finished indie game** without unnecessary feature count growth.
