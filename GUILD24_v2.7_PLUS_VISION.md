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
- font proliferation or a multi-font theme system beyond the approved v2.7 replacement pair
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

The preferred dependency order is:

1. v2.6.1 Recovery close
2. **Expedition Power weight re-review / baseline freeze**
3. **Bag always 2 slots** as the structural constraint used by all following balance work
4. **Item + Relic + related Trait integrated audit/rebalance** under the frozen Power formula and 2-slot constraint
5. **Fatigue / Supply pressure tuning** against the rebalanced catalog
6. Last Bag + NIGHT causality + revisit connection
7. D-Day / Recon / D25 Final prereveal
8. SALE Counter Handling / Action Layer
9. Anti-AI-Slop Visual Pass, including the approved font replacement
10. Truth-Critical Copy Pass
11. full-run playtest / balance
12. v2.7 freeze

Dependency rules:

- Do not tune Item Stat values against the current Source Power formula if that formula is about to change.
- Do not judge Food/Drink viability before the Bag is fixed at 2 and the relevant Relic/Trait multipliers are included.
- Do not solve weak Food/Drink by adding more unrelated effects before Fatigue/Supply pressure is measured.
- Do not move Visual polish before core SALE interaction is structurally stable if that would cause the same surface to be redesigned twice.

---

# 3-A. P0 — EXPEDITION POWER WEIGHT RE-REVIEW

## 3-A.1 Why this is first

Normal expedition success currently combines the four visible core Stats into one prepared expedition ability.
Because Item Stat value, Job growth value, Great Success margin, and the Combat forecast all read this ability, changing its weights after Item rebalance would invalidate the Item audit.

Therefore the Power formula is reviewed and frozen **before** v2.7 Item numeric tuning.

## 3-A.2 Previous decision is a reference, not an automatic final value

A previous approved direction reduced the excessive importance of 투력 and used the following candidate balance:

```text
투력 0.50
강인함 0.34
기동 0.27
정신 0.20
```

For v2.7 this table is **not automatically re-adopted as the final numeric answer**.
It is the primary historical reference for the new audit.

v2.7 must re-check the weights against:

- current Job base/growth distribution
- current Dungeon Power curve
- current Hazard stat routes
- Great Success margin behavior
- the fixed 2-slot Bag
- the reworked Potion / Food / Drink architecture
- Final consistency where the existing Final formula already uses the same 0.50 / 0.34 / 0.27 / 0.20 family

The audit may return to the previous table, keep only its direction, or move materially away from it.

## 3-A.3 Design direction

Even after rebalancing, **투력 remains the largest single direct Power contributor**.
The purpose is not to make all four coefficients equal.
The purpose is to stop 투력 from crowding out meaningful investment in 강인함 / 기동 / 정신.

Expected hierarchy:

```text
투력 = strongest direct expedition-Power lever
강인함 = second direct lever + important survival/Hazard utility
기동 / 정신 = lower direct Power, but meaningful because they also own Hazard / escape / fatigue-sensitive value
```

Do not create a new player-facing `Power` Stat or aggregate score.
The player continues to see the four existing Stats and qualitative forecast.

## 3-A.4 Numeric status

Exact v2.7 weights are intentionally **UNRESOLVED UNTIL THE POWER AUDIT**.

The audit must produce a `DIRECTOR DOCUMENT BASELINE` before Item numeric rebalance begins.
That baseline:

- may be simulation-assisted
- is still a starting point rather than a permanent optimum
- may move substantially after full-run playtest
- must be adopted consistently by forecast / resolve / Great Success signal and every other ordinary-expedition path that reads the same ability

Do not leave different ordinary-expedition weights in preview and resolution.

## 3-A.5 Acceptance

The frozen v2.7 baseline must satisfy all of the following directionally:

- 투력 remains valuable and visibly worth specializing in
- a high-투력 Potion is strong, but does not make every other Stat item irrelevant
- naturally high 강인함 / 기동 / 정신 Jobs retain meaningful preparation advantages
- the best generic answer is not always `add as much 투력 as possible`
- forecast and actual resolution use the same weights
- Great Success opportunity uses the same prepared-ability truth unless its owner explicitly defines a narrower margin rule

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

# 5. P0 — FATIGUE / SUPPLY AS A REAL THIRD PREPARATION AXIS

## 5.1 Role

The target decision is not `전투 + Hazard` alone.

It becomes:

`today's Power / Hazard / long-term Condition`

with only two Bag slots.

Example:

- Power forecast = 접전
- Cold readiness = 취약
- Fatigue = 8

Then the player may choose:

- Potion/Power + Cold specialist → maximize today's expedition; fatigue ignored
- Cold specialist + Food/Drink → survival/condition-first; direct Power investment reduced
- Potion/Power + Food/Drink → protect Power and condition while accepting Cold risk

Each option must be plausible in at least some states.

## 5.2 Current inherited reference

Current v2.6.1 outcome fatigue values are:

- Success +2
- Great Success +2
- Retreat +3
- Injury +4
- Severe Injury 0
- Death 0

Current fatigue thresholds are:

- 0~9: no Stat penalty
- 10~19: mobility/spirit -10%
- 20: mobility/spirit -25%

Natural morning recovery remains removed.

These values are an inherited measurement reference, **not a guarantee that they are strong enough for v2.7**.
The v2.7 design intent is that Fatigue matters often enough to make Food/Drink compete with Power and Hazard preparation.

## 5.3 Tuning order

Do not finalize new Fatigue numbers before the Power formula and Item/Relic architecture are audited.

Order:

1. freeze v2.7 Power-weight baseline
2. fix Bag at 2
3. rebalance Item / Relic / related Trait roles
4. measure Food/Drink pick pressure and repeat-NPC Fatigue trajectory
5. tune Fatigue outcome gain / threshold / recovery values only as needed

The previous Director fallback `Success/Great Success +3, Retreat +4, Injury +5` remains a **pre-audit reference only**, not an approved v2.7 number.
The audit may choose a stronger or weaker table.

## 5.4 Desired pressure window

`DIRECTOR DOCUMENT BASELINE — NOT SIMULATION-DERIVED`

Desired feel before final numeric audit:

- repeatedly sending the same NPC without recovery should create a meaningful first-penalty risk within roughly several expeditions, not only at the extreme end of a run
- Fatigue 20 should be a credible consequence of overuse, not an automatic state for every active NPC
- Food/Drink must sometimes be worth one of only two slots because preserving a valuable NPC's future condition matters
- `stamina / weary / grit` Fatigue modifiers must remain noticeable without becoming destiny Traits

Exact expedition count and gains are to be simulation/playtest baselined after the integrated Item audit.

## 5.5 Current Supply conversion and its design problem

Current structure:

```text
fatigueRecovery = max(0, finalFoodDrinkSupply - requiredSupply)
effectiveFatigue = max(0, currentFatigue - fatigueRecovery)
```

This has two legitimate uses:

1. meet active Supply Burden
2. convert remaining Food/Drink Supply into Fatigue recovery

But it also creates a known diminishing-value / waste case:

- NPC fatigue is already 0
- or excess Supply is greater than the current Fatigue that can be recovered

Then additional Supply has no further value.

This is now an explicit v2.7 audit item.

## 5.6 Supply guardrails

Do NOT immediately solve excess Supply by converting every unused point into generic Power, success chance, loot, or another hidden bonus.
That would turn high-Supply Food into a universal answer and collapse the 2-slot tradeoff again.

First response order:

1. make Fatigue consequential enough that recovery is regularly relevant
2. tune Food vs Drink Supply amounts so overshoot is not the normal outcome
3. audit active Supply-Burden frequency/requirements against those values
4. only if meaningful Supply waste remains structurally frequent, propose one explicit secondary treatment in the owning Spec

Any later secondary treatment must be visible and must not create a hidden hunger/thirst/caffeine subsystem.

## 5.7 Recovery interaction guardrails

Keep:

- visible Food/Drink Supply
- no Hunger gauge
- no Thirst gauge
- no hidden Food+Drink pairing combo
- no caffeine stack subsystem
- no generic bonus merely for excess Supply

If recovery proves too strong or too weak, tune the existing channel before inventing a new Condition subsystem.

## 5.8 Acceptance questions

- Is Food/Drink rationally chosen over Potion/Power or a Hazard specialist in some common states?
- Does the player sometimes protect a familiar NPC's future instead of maximizing today's result?
- Can high-level NPCs still become unattractive to overuse because condition matters?
- Is Supply often useful without usually overcapping into meaningless waste?
- Are Fatigue and expected recovery readable before the decision and truthfully reported after NIGHT?

---

# 6. P0 — ITEM + RELIC + RELATED TRAIT INTEGRATED AUDIT / REBALANCE

## 6.1 Rule

Bag=2, Item roles, Relic amplification, and category Traits are one balance problem.
Do not rebalance the 30-item catalog in isolation and only later discover that a Fresh Relic or Trait re-collapses the choices.

Current catalog remains the starting set.

`REWORK EXISTING BEFORE ADD`

remains the default, but new SKUs are allowed when the audit proves a real missing role that cannot be made legible by reworking an existing product.

No new player-facing `Power` product category is added.

## 6.2 Player-facing category architecture

Keep the existing understandable product categories.
The functional distinction is sharpened inside them.

### Food

Primary identity:

> **higher Supply / Fatigue-management value, with modest native Power or flexible secondary value**

Direction:

- generally the strongest Supply values among ordinary consumables
- native Stat gain should normally be smaller than Potion and typically smaller than a Drink built for immediate performance
- some Food may keep a light Hybrid/Hazard or Economy hook
- high Supply must not be bundled with high Power + strong Hazard answer + strong Economy on one ordinary SKU

Food must not become `Supply only` by default.
It needs a small but readable secondary reason so it is not a dead slot when Fatigue is moderate.

### Drink

Primary identity:

> **lower/moderate Supply with sharper immediate Stat / Counter / RiskReward value than ordinary Food**

Direction:

- Supply generally lower than Food
- stronger immediate native Stat or tactical effect is allowed
- specialist drinks may remain Hazard answers
- Drink must not simply become `Food with a different icon`

### Medical — Potion line

Medical remains clearly separate from Food/Drink for category-affinity, Relic, Trait, UI, and catalog logic.

Within Medical, **Potion is the dedicated immediate Power line**.

Potion direction:

- Supply = 0
- primary benefit = visible core-Stat increase for the current expedition
- because 투력 remains the largest direct Power coefficient after re-review, the Potion line is **투력-forward** overall
- individual Potions may add smaller secondary core Stats where needed for product differentiation
- Potion does not gain Hazard Counter / Insurance / Supply merely to look versatile
- Potion Power must remain additive through the existing visible Stats; do not create `성공 확률 +X%` or a hidden master-Power buff

Non-Potion Medical keeps separate identities:

- Bandage / First Aid = injury protection / condition
- Antidote = poison specialist
- other explicitly owned Medical effects stay in their role

Therefore `Medical = Power` is NOT the rule; `Potion line = Power specialist` is the rule.

### Field Gear

Primary identity:

- narrow high-reliability Hazard specialist
- or explicit lower-strength Hybrid coverage

A lower-rarity exact specialist may remain better than a premium generalist on its owned Hazard.

### Insurance

Primary identity:

- bad-outcome mitigation / conversion

Insurance does not become direct generic Power.

### Special / Economy

Primary identity:

- explicit exceptional operation or economy direction

Do not create a micro-system to justify a single Special item.

## 6.3 Functional competition with only two slots

The catalog must create understandable competition between:

1. **Potion Power** — strongest direct current-expedition Stat investment, 투력-forward
2. **Food / Drink Condition value** — Supply/Fatigue with modest flexible Power/tactical value
3. **Hazard specialist / Hybrid**
4. **Condition / Insurance**
5. **Economy / explicit Utility / RiskReward**

These are design-analysis lanes, not new player-facing tabs.

The desired question is:

> `오늘 Power를 더 밀까 / Hazard를 막을까 / 피로를 관리할까 / 실패 보험을 들까?`

not:

> `가장 많은 효과가 붙은 상품 두 개가 무엇인가?`

## 6.4 Potion catalog direction

The current lower/upper Potion line is too narrow if it remains only a same-axis numeric upgrade.
The audit must test whether existing products can support a small readable Potion ladder before adding SKUs.

Required audit questions:

- Is there a clear low-cost Potion Power option?
- Is there a higher-cost stronger Power option that is not simply an automatic strict upgrade at every stage?
- Does the line provide enough 투력-forward choice to make `Power slot` legible without creating a new category?
- Can one or two existing Medical/Special items be repurposed cleanly before adding a new Potion SKU?

Catalog expansion is permitted only after this review.
If the current 30 cannot express the required line cleanly, **up to the existing soft-cap space** may be used for new Potion/Power products before proposing a larger catalog expansion.

Exact Potion Stat/price values are **UNRESOLVED UNTIL THE POWER WEIGHT AUDIT**.

## 6.5 Food / Drink differentiation audit

Every current Food and Drink must be audited for:

- Supply amount
- native core Stat value
- Hazard/Hybrid value
- rarity and price
- shelf life
- Fatigue-recovery value
- Fresh Relic amplification
- category Trait amplification

Expected direction:

```text
Food  = more Supply, less immediate Power
Drink = less Supply, more immediate/tactical Power
```

This is a category center of gravity, not an absolute formula.
Deliberate exceptions are allowed when they create a clear product identity rather than erase the category boundary.

Existing high-overlap items that combine strong Supply + strong Power + strong Hazard/Economy are mandatory first-pass audit candidates.

## 6.6 Hazard coverage remains

Every canonical Hazard retains:

- 1 Main specialist route
- at least 2 meaningful Alternative routes

But with a 2-slot Bag, no single ordinary item should collapse an entire Family plus Power/Fatigue into one universal answer.

## 6.7 Fresh Relic direction — change from raw Supply amplification to felt Food/Drink performance

Current Fresh build support includes effects that directly increase Food/Drink Supply or Survival/native values.
For v2.7, **raw `+Supply` is not the preferred headline reward for a Fresh Relic** because additional Supply can be invisible or wasted once the current recovery need is already satisfied.

Fresh build identity becomes:

> `Food/Drink를 많이 쓰는 편의점은, 원래 작았던 Food/Drink의 즉시 성능도 체감 가능하게 끌어올릴 수 있다.`

Direction:

- shelf-life / ordering / inventory advantages may remain
- Relics that currently mainly multiply Food/Drink `Supply + survival` must be audited
- where a Fresh Relic is intended as a power payoff, prefer boosting the product's **native visible Stat contribution** rather than simply adding more raw Supply
- do not automatically amplify explicit Hazard Counter, Insurance, RiskReward penalty, or unrelated attached effect
- Fresh build may make Food/Drink a stronger flexible alternative, but must not make them equal to a dedicated Potion for raw Power or Field Gear for exact Hazard reliability

This makes Fresh a build choice that changes how Food/Drink feels without deleting category specialists.

Exact Relic multipliers are **UNRESOLVED UNTIL THE Item/Relic audit**.

## 6.8 Relics that must be included in the same audit

At minimum audit the current Fresh / Expedition support that touches these categories:

- 대형 냉장고
- 즉석식품 코너
- 원정 도시락 코너
- 냉장 쇼케이스
- 새벽 공동배송
- 24시간 신선체계
- 긴급보급 선반

Questions:

- Does this Relic strengthen the intended category identity or blur it?
- Does it create too much free Power on top of Supply?
- Does it make a dedicated Potion or Field Gear specialist obsolete?
- Is its benefit felt during SALE/NIGHT, or only visible as a hidden/overcapped number?
- Does it distort offer frequency so strongly that the 2-slot decision stops being about choice?

Do not add a new Potion-specific Relic by default. Reuse/rebalance existing store-support structure first.

## 6.9 Traits that must be included in the same audit

At minimum:

### Food affinity

- `대식가`
- `소식가`

Their Food native-core/Supply tradeoff must remain meaningful after Food values change.
Do not let them multiply attached Hazard/Insurance effects.

### Food/Drink Supply

- `준비성`

Current per-item Supply bonus must be checked against the new Fatigue pressure and Supply-overcap problem.
A flat +Supply Trait is not automatically protected if it becomes mostly wasted or too strong.

### Potion

- `포션체질`

Because Potion becomes the dedicated Power line, its current native Potion multiplier must be re-audited rather than blindly carried over.
It should create a noticeable character affinity without making Potion the mandatory answer whenever the Trait appears.

### Fatigue

- `지구력`
- `쉽게 지침`
- `악바리` fatigue cost

Any change to baseline Fatigue gain must be checked against these ± modifiers.

## 6.10 Director review baseline

`DIRECTOR DOCUMENT BASELINE — NOT SIMULATION-DERIVED`

For ordinary items, design toward:

- one immediately understandable primary identity
- normally one meaningful secondary hook at most
- broader multi-role identity only where rarity/cost/tradeoff clearly pays for it

This is a review baseline, not a hard mechanical cap.
The audit judges actual dominance and decision collapse, not the number of internal role tags alone.

## 6.11 Price rule

Do not globally raise prices as the first response.

Reason:

`less money → abandon ordinary NPCs → concentrate on ace NPCs`

would reinforce the convergence v2.7 is trying to break.

Price tuning follows actual SKU role, affordability, margin, rarity, Wallet pressure, and Relic interaction after Stat/Supply values are set.

## 6.12 Required full catalog audit

For **all active items**, record:

- player-facing category
- rarity / buy / sell / shelf life
- current exact effects
- intended v2.7 primary identity
- intended secondary hook, if any
- direct prepared-Power contribution under the frozen v2.7 formula
- Supply / expected Fatigue-recovery value
- Hazard / Insurance / Economy value
- affected Relics
- affected Traits
- universal-best risk
- dead-pick risk
- whether a cheaper/lower-rarity specialist is invalidated
- whether price reinforces or distorts the role
- whether the effect is visible and understandable before sale
- proposed v2.7 baseline numeric changes
- simulation/playtest metrics required to validate them

The audit is incomplete if it changes Item values without also checking the relevant Relic/Trait multipliers.

## 6.13 Acceptance

v2.7 Item/Relic/Trait rebalance is successful when:

- more than one rational Bag pair can exist in the same broad situation
- `Potion = raw current Power` is legible without a new player-facing category
- Food/Drink has a real slot opportunity cost and a real condition-management reason to be chosen
- Food and Drink do not feel interchangeable
- Fresh Relics make Food/Drink noticeably better without turning them into universal specialists
- direct specialist / hybrid / natural Stat routes remain distinct
- rare/premium does not mean universally superior
- there is no mandatory single SKU for a common Hazard
- no category-affinity Trait or Relic silently reintroduces a one-best-answer meta

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
- approved v2.7 typography split: Mulmaru atmosphere role / Wanted Sans information role

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

## 10.15 Typography — v2.7 approved replacement

The current Galmuri + Pretendard pair is intentionally replaced in v2.7.
The reason is not font quality or license failure; it is product identity. Both current faces are common, practical free-font choices and the resulting combination contributes to the generic indie/web-template impression the Anti-AI-Slop pass is explicitly trying to reduce.

### Atmosphere = Mulmaru / 물마루 — APPROVED

Use Mulmaru as the GUILD24 atmosphere face.

Roles:

- DAY / world signage
- atmospheric labels
- short phase/display headings
- selected diegetic readouts

Use Mulmaru Mono where a genuinely fixed-width diegetic/numeric treatment is useful.
Do not create a third decorative font.

Rendering rule:

- prefer 12px and clean integer multiples where practical for its pixel construction
- do not force long body copy into Mulmaru merely for identity
- avoid synthetic/fake bold if the shipped face does not provide the required weight; use size, spacing, material hierarchy instead

License / asset rule:

- SIL OFL 1.1
- local vendoring allowed
- modification/subsetting/embedding allowed under the license
- continue the current no-runtime-font-request policy

### Information = Wanted Sans — APPROVED

Wanted Sans replaces Pretendard as the information face.

Roles:

- body copy
- price
- Stats / Item effects
- Wallet / Gold / counts
- utility text
- button labels
- longer Korean text

Use only the weights actually needed by the UI, with the current two-weight information pattern as the default implementation target unless visual QA proves another weight necessary.
Do not ship all available weights merely because the family provides them.

License / asset rule:

- SIL OFL
- commercial use / modification / redistribution permitted under the license
- local subsetting/vendoring remains the preferred implementation

### Font adoption QA

The font replacement is incomplete until real screens verify:

- 360~390px and 412px mobile Korean body readability
- 1024px and 1280px+ desktop hierarchy
- no new line-wrap overflow in ORDER / SALE / Settings
- price / percentage / stat numerals remain immediately distinguishable
- `50 / 100 / 150%` price choices remain scannable
- Mulmaru does not dominate the material/art identity
- Wanted Sans does not recreate the same generic web-app feel the replacement is intended to reduce
- local subset contains every player-facing glyph
- no runtime network font request
- required OFL notices are retained with vendored assets

Typography remains a two-role system:

```text
ATMOSPHERE = Mulmaru
INFORMATION = Wanted Sans
```

Do not pixel-font all body copy.

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
- add any additional font family beyond the approved Mulmaru + Wanted Sans pair
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
- Mulmaru atmosphere text remains crisp/readable at approved sizes
- Wanted Sans information text remains readable in dense ORDER/SALE states
- no fallback to Galmuri/Pretendard remains in normal player-facing UI except temporary migration/fallback explicitly owned by implementation

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

## 13.9 Additional fonts / icon system / UI theme framework

Status: **DO NOT ADD beyond the approved v2.7 font replacement**

v2.7 already adopts:

- Atmosphere = Mulmaru
- Information = Wanted Sans

Do not add a third display family, icon-font system, or UI theme framework for anti-slop purpose.
The approved replacement pair is sufficient; further font proliferation increases visual inconsistency and maintenance cost.

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
| Gate | v2.6.1 Adoption Recovery + Frozen QA | before v2.7 | Blocking | existing | trustworthy runtime baseline |
| 1 | Expedition Power weight re-review | v2.7 | Critical | Medium | freeze the math all Item Stat value depends on |
| 2 | Bag always 2 | v2.7 | Critical | Low~Medium | restore scarcity and define the balance constraint |
| 3 | Item + Relic + related Trait integrated audit/rebalance | v2.7 | Critical | High | make 2-slot choices genuinely different without hidden category collapse |
| 4 | Fatigue / Supply pressure tuning | v2.7 | Critical | Medium | make Food/Drink a real long-term-condition choice and control Supply waste |
| 5 | Last Bag + NIGHT causality + revisit | v2.7 | Critical/High | Low~Medium | close memory loop |
| 6 | D-Day / D25 Final prereveal | v2.7 | High | Low~Medium | give run a visible horizon |
| 7 | SALE Counter Handling | v2.7 | High/Critical feel | Medium~High | physical shop play |
| 8 | Anti-AI-Slop Visual Pass + font adoption | v2.7 | High | Medium | remove product-rejection grammar; establish distinct type identity |
| 9 | Truth-Critical Copy | v2.7 | High | Low~Medium | protect information trust |
| 10 | Full-run balance / QA | v2.7 | Blocking | Medium~High | validate actual convergence |
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
- RELIC
- NPC_TRAIT where category affinity / fatigue modifiers are affected
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
- Potion offers a clear direct-Power choice without a new player-facing Power category
- Food/Drink compete through condition/Supply plus restrained flexible value rather than effect stacking
- three or more concerns matter
- what was sold matters later
- the player knows what the 30-day run is preparing toward
- the sale action feels like shop handling
- the UI and typography read as GUILD24 rather than a generated application skin
- the text teaches only mechanics that are actually true

v2.8+ is where the project may become broader.

v2.7 must first make the existing game **sharper, more memorable, more tactile, and more legitimate as a finished indie game** without unnecessary feature count growth.