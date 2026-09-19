# GUILD24 v2.9+ — Deferred Expansion Router

> Project: 《던전 앞 편의점 / GUILD24》
> Document role: **v2.9+ DEFERRED DESIGN ROUTER / FUTURE CANDIDATE CONTEXT**
> Status: **NOT CURRENT DESIGN SSOT**
> Current v2.8 planning scope: `GUILD24_v2.8_DIRECTOR_PLAN.md`
>
> User decision:
> work classified as P2 or later is not part of v2.8.
> It is deferred to v2.9+ unless the User later promotes it.

---

# 0. PROMOTION RULE

Priority:

1. User's newest confirmed decision
2. Current Design SSOT
3. Current Source
4. v2.8 Director Plan when discussing v2.8 scope
5. This deferred router
6. Older proposals / chat

This file does not authorize implementation.

Promotion requires:

```text
current-play evidence
→ concrete player problem
→ REMOVE / REUSE / MERGE / CLARIFY / REBALANCE first
→ User approval
→ current-version owner spec
→ QA
→ implementation
```

---

# 1. EXPEDITION PURPOSE / 원정 목적

Potential importance: HIGH
Cost: HIGH
Status: CONDITIONAL DEFER

Possible future axis:

- 토벌
- 채집
- 수련

The same NPC may have a different purpose on a later visit.

Only revisit if, after v2.8 readability/rebalance work, preparation decisions still converge too strongly and destination + Hazard + NPC condition + current Store Build do not create enough strategic variety.

If adopted, Purpose should change what result channel matters rather than simply adding generic Power.

Exact mechanics remain undefined.

---

# 2. STORE GROWTH VISUAL OVERLAY

Importance: MEDIUM
Cost: MEDIUM~HIGH + ART
Status: DEFER

Potential goal:

> a late-Run store visibly feels like the same shop after weeks of operation.

Potential traces:
- Store Support props
- Guild notices
- regular-customer traces
- Final-preparation signage
- small shelf / fixture changes

Guardrails:
- tie visible changes to real state
- prefer small overlays over whole-background replacement
- avoid combinatorial skin systems

---

# 3. PRODUCT RUN HISTORY / ITEM MEMORY

Importance: LOW~MEDIUM
Status: CONDITIONAL DEFER

Potential examples:
- current-Run sales
- recent buyers
- recent successful expeditions using the product

Only revisit if Items remain emotionally anonymous after v2.8 causal feedback improvements.

Do not turn the game into a telemetry dashboard.

---

# 4. PRODUCT MASTERY / XP / FAVORITE SYSTEM

Status: DEFAULT REJECT

Examples:
- Item XP
- Product Level
- familiarity meter
- favorite Item
- mastery tree

Only revisit with strong evidence that persistent product specialization creates meaningful Store Build decisions rather than grind.

---

# 5. DIALOGUE POOL / EXPRESSION EXPANSION

Importance: MEDIUM
Cost: MEDIUM~HIGH
Status: v2.9+ DEFER

The earlier broad Dialogue Pool expansion is not part of v2.8.

If revisited:
- calculate actual per-Run exposure first
- size arrival / purchase / refusal / NIGHT pools from that exposure
- suppress immediate/recent repeats deterministically
- do not consume Gameplay RNG
- expand character-specific expression only where it strengthens recurring-NPC attachment

v2.8 may still fix false, stale, duplicated, or badly placed dialogue/copy.
It does not perform the broad content expansion.

---

# 6. AUDIO / BGM / PRESENTATION EXPANSION

Importance: MEDIUM for game feel
Status: v2.9+ DEFER

Potential work:
- stronger phase-specific BGM identity
- additional audio cues
- targeted graphics / presentation assets

Do not add assets merely to increase production volume.

First verify v2.8 core readability and interaction flow.

Prefer reusing the current audio/presentation system before adding a larger asset framework.

---

# 7. ADVANCED DRAG / PHYSICS

Importance: LOW
Status: OPTIONAL DEFER

Tap must continue to complete the SALE flow.

Do not require:
- precision drag
- collision physics
- item tossing
- timing windows
- gesture-only interaction

---

# 8. NEW SHOP MINIGAMES

Status: DO NOT ADD WITHOUT EVIDENCE

Examples:
- checkout QTE
- packing puzzle
- barcode minigame
- crafting
- shelf-placement puzzle
- manual register math

The existing game is already the preparation / stocking / selling / pricing decision loop.

---

# 9. LARGE DESKTOP REDESIGN

Importance: LOW~MEDIUM
Status: DEFER

Desktop may use extra width for comparison and reduced scrolling.

Do not create a separate PC-only mental model or control architecture.

---

# 10. ADDITIONAL FONT / ICON / THEME SYSTEM

Status: DEFAULT REJECT

Do not add visual systems merely to look more authored.

Use meaning, hierarchy, material consistency, and restraint first.

---

# 11. LARGE NEW ITEM WAVE

Importance: CONDITIONAL
Status: DEFER

Before adding Items, measure:
- dead-pick rate
- universal-best rate
- category distribution
- Hazard coverage gaps
- price gaps
- Store Build gaps

Prefer rebalance / repurpose / merge over catalog growth.

---

# 12. FINAL SPECTACLE / CUTSCENE EXPANSION

Importance: MEDIUM presentation / LOW core
Cost: HIGH
Status: DEFER

Only after Final information and preparation decisions are proven should the project consider:
- cinematic sequence
- Final-only scenes
- larger Demon King presentation
- unique ending staging

Do not use spectacle to cover a weak decision structure.

---

# 13. BROAD WORLD / FLAVOR EXPANSION

Importance: MEDIUM eventually
Status: DEFER

Potential:
- more NPC voice
- Item flavor
- Guild notices
- convenience-store culture
- world jokes
- recurring callbacks
- Easter Eggs

Guardrails:
- Flavor must sit on top of truth
- no fake callbacks without state
- no mechanic invented only to justify a joke

---

# 14. NEW META POWER PROGRESSION

Status: DO NOT ADD BY DEFAULT

Do not automatically solve difficulty with:
- failure currency
- permanent universal combat multipliers
- account-wide raw stats
- pity Power

Verify implementation, balance, information quality, and existing Meta first.

---

# 15. NEW CONDITION SUBSYSTEMS

Status: DO NOT ADD BY DEFAULT

Examples:
- Hunger
- Thirst
- Caffeine
- Nutrition
- morale
- Food+Drink combo meter

Existing Supply / Fatigue / native Stat / Hazard / RiskReward channels must be exhausted first.

---

# 16. EXPANDED STORE-BUILD AXES

Status: CONDITIONAL DEFER

Possible future identity:
- Fresh
- Expedition
- Economy
- Visitor / Regular
- Inventory / shelf-life
- Risk / premium

Only add a new axis if v2.8 proves current Store Supports cannot create distinct operating styles through rebalance and clearer feedback.

Target remains:

> 이번 판은 어떤 편의점이었는가?

---

# 17. DEEPER REGULAR-CUSTOMER RELATIONSHIP SYSTEM

Status: CONDITIONAL DEFER

Possible future ideas:
- relationship tiers
- special requests
- remembered preferences
- customer arcs

Avoid hidden preference math, obligation quests, and bar-filling optimization.

Any future relationship system should strengthen understanding of a recurring NPC.

---

# 18. FINAL / BOSS CONTENT EXPANSION

Status: FUTURE CONTENT

Potential:
- more Bosses
- new Boss-specific modifiers
- alternate Final structures
- additional Family interaction
- more ending presentation

A new Boss must change preparation decisions, not merely Power.

---

# 19. ART / STORE WORLD EXPANSION

Status: FUTURE

Potential:
- more portraits
- more shop props
- seasonal presentation
- additional Demon King sheets
- more dungeon/world environmental art

Asset count is not a substitute for game depth.

---

# 20. v2.9+ ENTRY GATE

Do not enter structural expansion merely because v2.8 is numerically complete.

First verify:

- v2.8 information-trust issues are closed
- current Store Build effects are actually understood by Players
- Fatigue is read and used
- SALE → NIGHT causality is legible
- Boss presence remains visible through the Run
- remaining strategy convergence is real rather than a presentation problem

Only then promote a P2 candidate.
