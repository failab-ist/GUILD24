# GUILD24 v2.8+ — Deferred Design Candidates / Post-v2.7 Expansion Router

> Project: 《던전 앞 편의점 / GUILD24》  
> Document role: **POST-v2.7 DEFERRED DESIGN ROUTER / FUTURE CANDIDATE CONTEXT**  
> Status: **NOT CURRENT DESIGN SSOT**  
> Current Design SSOT: `design_ssot/SPEC_INDEX_v2.7.0.md`  
>
> This document preserves ideas that were deliberately **not required for v2.7**.  
> It exists so future sessions understand the idea, why it was deferred, and what evidence would justify revisiting it.  
> Nothing here may be implemented merely because it is written here.

---

# 0. AUTHORITY / PROMOTION RULE

Priority remains:

1. User's newest confirmed decision
2. Current Design SSOT
3. Current Source
4. This deferred document
5. Older chat / proposals

This file is **planning context only**.

An item becomes real Design only through:

```text
v2.7 playtest / product evidence
→ Director identifies a concrete problem
→ REMOVE / REUSE / MERGE / CLARIFY / REBALANCE checked first
→ User approves ADD or structural change
→ current-version Owner Spec is created/amended
→ QA is created/amended
→ WORK implements
```

Do not:

- pre-build these systems
- add data fields "for later"
- add generic framework abstractions
- keep dormant runtime branches
- alter v2.7 balance in anticipation of them

---

# 1. WHY THESE ITEMS ARE DEFERRED

v2.7 already makes major structural changes to:

- Bag scarcity
- Item role competition
- Fatigue / Supply
- Relic / Trait interaction
- SALE handling
- returning-NPC memory
- Final preparation
- visual legitimacy
- information trust

If another system is added before these are measured, it becomes impossible to tell:

> did v2.7 solve the original problem, or did the new feature merely cover it?

Therefore v2.8+ should respond to **evidence**, not imagination.

---

# 2. EXPEDITION PURPOSE / 원정 목적

**Potential importance: HIGH**  
**Cost: HIGH**  
**Status: CONDITIONAL DEFER**

## 2.1 Original appeal

Each NPC visit could have a current-expedition purpose such as:

- 토벌
- 채집
- 수련

This is not a fixed Personality.
The same NPC could have a different purpose on a later visit.

Potential value:

> the same Stats / Items could matter differently depending on what that expedition is trying to achieve.

This can add a genuinely new Decision Axis.

## 2.2 Why it was not put in v2.7

v2.7 already tries to break convergence using:

- exactly 2 Bag slots
- Power / Hazard / Fatigue competition
- rebalanced Item roles
- Store Build variation
- NPC continuity

If those already produce meaningful diversity, Expedition Purpose would add complexity without solving a real remaining problem.

Project rule:

```text
REBALANCE / CLARIFY first
→ ADD only if needed
```

## 2.3 Promotion trigger

Revisit only if full-run evidence shows that even after v2.7:

- most common decisions still converge into the same two preparation lanes
- Food/Drink/Insurance/Counter choices remain too predictable
- destination + Hazard + NPC state are not enough to produce varied strategy
- stronger NPC concentration still erases situational variety

## 2.4 If adopted later

Purpose must alter:

> **what result channel matters**

rather than directly buffing generic combat.

Avoid:

```text
토벌 = Combat +20%
채집 = Loot +20% if Great Success
수련 = XP +20% if Great Success
```

because this can collapse back into:

> maximize Great Success / generic Power.

Better future direction:

- 토벌 values combat-specific outcomes
- 채집 values extraction / Loot channels
- 수련 values development / growth channels

Exact mechanics remain intentionally undefined.

Do not treat these examples as approved rules.

---

# 3. STORE GROWTH VISUAL OVERLAY

**Importance: MEDIUM**  
**Cost: MEDIUM~HIGH + ART**  
**Status: DEFER**

## 3.1 Goal

A D3 store and D27 store could visibly feel like:

> the same physical shop after a long Run.

Potential visual traces:

- Relic props
- unlock/product traces
- Guild notices
- regular-customer notes
- Final preparation signs
- small fixtures / stickers / shelf changes

## 3.2 Why deferred

v2.7 Anti-AI-Slop pass is primarily:

- material cleanup
- hierarchy cleanup
- typography
- phase/action semantics

Store-growth overlay is different.

It requires:

- new art production
- asset consistency
- state mapping
- persistence presentation
- QA combinations

This is new content production, not cleanup.

## 3.3 Future guardrail

If adopted:

- prefer small overlay assets / props
- avoid whole-background replacement
- tie every visible change to real progression
- do not add decoration that has no system meaning
- avoid large combinatorial art matrix

The store should feel more lived-in, not become an expensive skin system.

---

# 4. PRODUCT RUN HISTORY / ITEM MEMORY SURFACE

**Importance: LOW~MEDIUM**  
**Cost: LOW~MEDIUM**  
**Status: CONDITIONAL DEFER**

## 4.1 Original idea

Examples:

```text
이번 Run 판매 8회
최근 구매자 윤비노
최근 생환 원정 3회
```

or a product-centric history surface.

Potential value:

- increase Item attachment
- make products feel like recurring objects in the Run
- help the player remember successful patterns

## 4.2 Why deferred

v2.7 already adds continuity through:

```text
ORDER
→ Inventory
→ SALE Bag
→ NIGHT result
→ returning NPC Last Bag
```

First test whether that is enough.

Do not add analytics because "history sounds useful."

## 4.3 Promotion trigger

Only revisit if players still say:

- items feel interchangeable/anonymous
- they remember NPCs but not the products they repeatedly chose
- Last Bag is not enough to connect products across the Run

## 4.4 Future guardrail

Do not turn GUILD24 into a statistics dashboard.

Any history surface should answer a player decision or emotional memory question, not merely expose telemetry.

---

# 5. PRODUCT MASTERY / XP / FAVORITE METER

**Importance: LOW by default**  
**Status: DEFAULT REJECT / REVISIT ONLY WITH STRONG EVIDENCE**

Possible ideas:

- Item XP
- Product Level
- Familiarity
- Favorite Item
- mastery tree
- repeated-sale bonuses

These were deliberately not added.

Reason:

> if the existing loop cannot create attachment to an Item, adding a meter may only disguise the problem.

v2.7 expects attachment from actual continuity.

Only revisit if:

- players clearly want long-term product specialization
- it creates meaningful Store Build decisions
- it does not become grind / compulsory optimization
- it cannot be achieved through existing Relic / catalog / economy systems

Default answer remains:

> do not add.

---

# 6. ADDITIONAL NPC EXPRESSION ASSETS / DIALOGUE EXPANSION

**Importance: LOW~MEDIUM**  
**Cost: HIGH**  
**Status: DEFER**

## 6.1 Potential value

More:

- price reactions
- injury reactions
- returning-customer comments
- Final-related comments
- character-specific voice

could strengthen attachment.

## 6.2 Why deferred

The current bottleneck is not lack of lines.

The more important question is whether:

- the player remembers the NPC
- the previous Bag/result is visible
- SALE and NIGHT connect
- existing reaction timing feels good

Expression expansion also has high art-consistency cost.

## 6.3 Promotion trigger

Revisit only after v2.7 proves:

- the memory loop works
- repeated NPCs matter
- but emotional expression still feels flat

Then add the smallest high-value set, not a broad dialogue rewrite.

---

# 7. ADVANCED DRAG / PHYSICS HANDLING

**Importance: LOW as a system**  
**Status: OPTIONAL DEFER**

v2.7 baseline:

> Tap must complete the entire SALE flow.

Drag may later be added as tactile enhancement if it is nearly free.

Do not make it mandatory.

Avoid future implementation that requires:

- precision drag
- physics collision
- item tossing
- timing windows
- gesture-only removal
- inaccessible mobile interaction

Why:

- mobile precision
- accessibility
- implementation complexity
- animation/state-sync risk
- little added decision value

The tactile fantasy should remain lightweight.

---

# 8. NEW SHOP MINIGAMES

**Status: DO NOT ADD WITHOUT EVIDENCE**

Examples that should not be added by default:

- timing checkout QTE
- packing puzzle
- barcode minigame
- crafting
- physical shelf placement puzzle
- manual register math

The shop already has a game:

> decide what to stock, whom to invest in, what to sell, and at what price.

A minigame is justified only if future evidence shows a specific missing player fantasy that cannot be solved inside existing decisions.

"Needs more game feel" alone is not enough.

---

# 9. LARGE DESKTOP REDESIGN

**Importance: LOW~MEDIUM**  
**Status: DEFER**

v2.7 remains mobile-first in information hierarchy.

Desktop can use extra width for:

- more simultaneous comparison
- less scrolling
- side-by-side layout

But should not become a separate:

- dashboard product
- PC-only control model
- card-grid architecture

Future desktop improvement should preserve the same mental model across devices.

---

# 10. ADDITIONAL FONT / ICON / THEME SYSTEM

**Status: DEFAULT REJECT**

v2.7 already adopts:

```text
Atmosphere = Mulmaru
Information = Wanted Sans
```

Do not add:

- third display font
- icon font
- theme framework
- per-phase font families
- decorative typography stack
- large bespoke icon language

unless a future specific problem requires it.

Anti-generic quality comes from:

- meaning
- hierarchy
- material consistency
- restraint

not from more assets.

---

# 11. LARGE NEW ITEM WAVE

**Importance: CONDITIONAL**  
**Status: DEFER**

v2.7 intentionally reworked the existing 30-item catalog.

Before adding more products, measure:

- dead-pick rate
- universal-best rate
- category pick distribution
- Hazard coverage gaps
- price-band gaps
- Store Build gaps

Only add a new Item if there is a clear missing role that cannot be solved by:

- rebalance
- repurpose
- merge
- category clarification

Do not add products just so the shop feels "bigger."

---

# 12. LARGE FINAL-EXCLUSIVE SPECTACLE / CUTSCENE

**Importance: MEDIUM for presentation, LOW for core**  
**Cost: HIGH**  
**Status: DEFER**

Final should first prove:

- D25 information matters
- preparation changes behavior
- Boss identity changes Final decisions
- the player reads Day 30 as the culmination of the Run

Only after that consider:

- cinematic sequence
- Final-only scene assets
- larger Demon King presentation
- unique end-run staging

Do not use spectacle to hide weak Final decision structure.

---

# 13. BROAD COPY / WORLD FLAVOR EXPANSION

**Importance: MEDIUM eventually**  
**Status: DEFER**

v2.7 only required Truth-Critical Copy.

Possible future expansion:

- more NPC voice
- item flavor
- world jokes
- convenience-store culture
- Guild notices
- Easter Eggs
- recurring character callbacks

Guardrails:

- do not imply mechanics that do not exist
- do not fake historical callbacks without real state
- do not let Meme density replace worldbuilding
- do not create a gameplay system merely to justify a joke

Flavor should sit on top of truth.

---

# 14. NEW META POWER PROGRESSION

**Status: DO NOT ADD BY DEFAULT**

Do not automatically solve difficulty using:

- failure currency
- account-wide combat multiplier
- permanent universal stats
- pity Power

v2.7 already defines that first clear must be possible at Mastery 0.

If later full-run evidence shows first clear is unreasonable:

1. verify implementation
2. verify current balance
3. verify information quality
4. verify existing Meta
5. tune the smallest existing owner first

Only then consider a new Meta system.

---

# 15. NEW CONDITION SUBSYSTEMS

**Status: DO NOT ADD BY DEFAULT**

Examples:

- Hunger
- Thirst
- Caffeine
- Nutrition
- morale meter
- Food+Drink combo meter

v2.7 already gives Food/Drink a real role through:

- Supply
- Fatigue
- native Stat
- Hazard / RiskReward exceptions
- Fresh Build

If this remains weak, first tune those existing channels.

A new Condition system is the last step, not the first.

---

# 16. EXPANDED STORE-BUILD AXES

**Status: CONDITIONAL DEFER**

v2.7 strengthens Relic as Store Build.

Future possibilities might include stronger identity around:

- Fresh
- Expedition
- Economy
- Visitor / Regular
- Inventory / shelf-life
- Risk / premium

But do not automatically create more Relic families.

Promotion requires evidence that:

- current builds do not produce distinct operation styles
- existing Relics cannot be rebalanced into clearer identities
- a new axis creates real Order/Sale decisions rather than passive bonuses

The target remains:

> “이번 판은 어떤 편의점이었는가?”

---

# 17. DEEPER REGULAR-CUSTOMER RELATIONSHIP SYSTEM

**Status: CONDITIONAL / NOT CURRENTLY REQUIRED**

Possible future ideas:

- relationship tiers
- special requests
- remembered preferences
- dedicated customer arcs

Potentially powerful, but dangerous because they can add:

- hidden preference math
- obligation quests
- extra meters
- repetitive gift optimization

v2.7 deliberately avoids this.

First prove that simple revisit memory + growth already creates attachment.

If a relationship system is ever added, it should strengthen:

> understanding a recurring NPC

not turn the game into:

> filling a relationship bar.

---

# 18. FINAL / BOSS EXPANSION AFTER v2.7

**Status: FUTURE CONTENT, NOT v2.7 REQUIREMENT**

After the v2.7 Final structure proves itself, future versions may consider:

- more Bosses
- new Boss-specific decision modifiers
- alternate Final structures
- more Family interaction
- additional ending presentation

But the bar is high:

A new Boss should change preparation decisions, not merely have a different Power number.

A new Final variant should still feel like:

> Run culmination

not a disconnected battle mode.

---

# 19. ART / STORE WORLD EXPANSION

**Status: FUTURE**

Possible long-term content:

- more character portraits
- more shop props
- seasonal store presentation
- additional Demon King sheets
- more dungeon/world environmental art

These are valuable only when tied to actual product value.

Avoid treating visual asset count as a substitute for game-system depth.

---

# 20. PRIORITY AFTER v2.7

If v2.7 full-run validation is successful, future work should be chosen from actual findings.

A plausible evaluation order:

1. unresolved v2.7 balance findings
2. usability / mobile friction
3. Store Build distinctiveness
4. NPC attachment / revisit depth
5. strategic convergence still remaining?
6. only then structural additions such as Expedition Purpose
7. then presentation/content expansions

Do not assume the numbered sections in this document are a release roadmap.

They are candidates.

---

# 21. PROMOTION CHECKLIST

Before promoting any deferred candidate, answer:

1. What actual player problem was observed?
2. Is the evidence from current v2.7, not older pre-v2.7 behavior?
3. Can REMOVE solve it?
4. Can REUSE solve it?
5. Can MERGE / CLARIFY / REBALANCE solve it?
6. Does the new feature create a meaningful Player Decision?
7. Does it strengthen Core Fun?
8. Does its complexity / asset / QA cost justify its value?
9. Which existing Owner should own it?
10. Does it create overlap with another system?
11. Has User explicitly approved promotion?

If these are not clear:

> keep it deferred.

---

# 22. WHAT THIS DOCUMENT MUST NOT BECOME

Do not turn this into:

- a backlog that WORK is expected to complete
- a list of "nice to have" implementation tasks
- a hidden roadmap
- a second Design SSOT
- a dump for every future idea

Only preserve ideas that have enough design value/context that future sessions could otherwise repeat the same discussion from zero.

Anything else should be discarded.

---

# 23. FINAL DIRECTOR INTENT FOR v2.8+

v2.8+ is not:

> “v2.7, but with more features.”

It should mean:

> **after v2.7 has made the existing game sharper, use real play evidence to decide whether the game needs to become broader.**

The default response to a problem remains:

```text
REMOVE
→ REUSE
→ MERGE / CLARIFY / REBALANCE
→ only then ADD
```

The best future feature is one that solves a real remaining player problem while preserving the core fantasy:

> you are the GUILD24 shopkeeper, making imperfect preparation decisions for adventurers you learn to care about.

This file keeps future possibilities visible.

It does not grant them authority.
