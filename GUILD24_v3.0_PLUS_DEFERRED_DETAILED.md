# GUILD24 v3.0+ — Deferred Expansion Router

> Project: 《던전 앞 편의점 / GUILD24》
> Document role: **v3.0+ DEFERRED DESIGN ROUTER / FUTURE CANDIDATE CONTEXT**
> Status: **NOT CURRENT DESIGN SSOT**
> Current Design Truth entry: `design_ssot/SPEC_INDEX_v2.8.0.md`
>
> User decision:
> work classified as P2 or later is not part of v2.8 or v2.9.0.
> It is deferred to v3.0+ unless the User later promotes it.
> (2026-09-24: v2.9.0 was scoped to readability / onboarding / transaction visibility / rule
> simplification only — see SPEC_INDEX §CURRENT v2.9.0 PURPOSE — so every section here moved to v3.0+.)

---

# 0. PROMOTION RULE

Priority:

1. User's newest confirmed decision
2. Current Design SSOT
3. Current Source
4. This deferred router
5. Older proposals / chat

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

## REVIEWED AGAINST THE 2026-09 PLAYTEST (User 2026-09-24)

Findings: "너무 복잡하다", "뭘 어떻게 하는 건지 모르겠다", "손님에게 직접 파는 것이 보이지 않는다".
Nothing here answers them better than the v2.9.0 owner amendments (SPEC_INDEX §CURRENT v2.9.0
PURPOSE), so no section is promoted. Deferred here from v2.9.0 as not needed now:
- SALE: move the folded `지난 원정` line below the Stat grid (phone reading order)
- ORDER: render the next-day forecast at secondary weight
- Store Support cards: clause-per-line wrapping (the v2.9.0 two-clause copy makes it moot)

## REVIEWED AGAINST A GAME-DESIGN TALK (User 2026-09-25)

Source: a design talk the User watched (themes: allowed-action clarity and expectation/function match; simplicity
built around the core fun; "kind lies" — situational difficulty / probability adjustment and control assist;
detail; information density; short reward loops). Read against the v2.9.0 state. Nothing is promoted now.

Already covered by v2.9.0 (not deferred): expectation/function match (category grammar line, fixed effect order),
simplicity around the core fun (Supply → Fatigue only, one Stat per Hazard, two-clause cards), detail (receipt stub,
hand-over, reason-specific refusal lines).

Routed to the balance session, not here (see `reports/v29-balance-finding-handoff.md`):
- kind lies as hidden assists: bad-luck protection after consecutive failures, an overhead easing on the day before
  bankruptcy — allowed by `재료는 공개, 공식은 숨김`, must never contradict the NIGHT proof surface; an alternative or
  companion to re-tuning the F3 / F4 values
- tension vs freedom: keeping Fatigue recovery scarce is the tension route, but it must stay a cost, not a dead end
  (Food that surely clears Fatigue at a price / short shelf life) — decisions 1 and 5 of the handoff

Deferred here (v3.0+ candidates):
- daily reward loop: one line of "today vs yesterday" (e.g. `어제보다 +N`) at CLOSING on top of the per-customer
  receipt stub; a short loop between the per-sale beat and the D30 goal
- ORDER allowed-range surface: before confirming, what today's stock can serve (how many of today's customers) —
  sits on the boundary of "the judgement is the player's"; needs a User decision before any design

Playtest checklist, not features (record only):
- control assist: 바가지 next to 정가 as a mis-tap risk; whether the same-SKU refusal ceiling reads as a penalty
- information density: SALE at 360 with the tray filled (three shelf rows visible is the current floor); one more
  screenshot review pass for what can still go

Not applicable: choice-control / narrative manipulation (Stanley Parable); any probability adjustment the player
could catch, which would break `재료는 공개`.

---

## ROUTER BOUNDARY

This file contains only still-deferred future candidates.
Anything already promoted into v2.8 is removed from this router rather than kept as historical status.

It does not own:
- current mechanics
- current numbers
- current copy
- current UX
- current QA
- current Source-adoption work

For all current truth, use `design_ssot/SPEC_INDEX_v2.8.0.md`.

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

# 6. ADVANCED DRAG / PHYSICS

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

# 7. NEW SHOP MINIGAMES

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

# 8. LARGE DESKTOP REDESIGN

Importance: LOW~MEDIUM
Status: DEFER

Desktop may use extra width for comparison and reduced scrolling.

Do not create a separate PC-only mental model or control architecture.

---

# 9. ADDITIONAL FONT / ICON / THEME SYSTEM

Status: DEFAULT REJECT

Do not add visual systems merely to look more authored.

Use meaning, hierarchy, material consistency, and restraint first.

---

# 10. LARGE NEW ITEM WAVE

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

# 11. LARGE FINAL CUTSCENE / CINEMATIC EXPANSION

Importance: MEDIUM presentation / LOW core
Cost: HIGH
Status: DEFER

Potential future scope:
- bespoke cinematic sequence
- large Final-only scene set
- large Demon King presentation asset package
- alternate / unique ending staging that needs new scene infrastructure

Keep this deferred unless the existing v2.8 Final presentation is already carrying its decision and
result meaning clearly.

Do not use large spectacle to cover a weak decision structure.

---

# 12. BROAD WORLD / FLAVOR EXPANSION

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

# 13. NEW META POWER PROGRESSION

Status: DO NOT ADD BY DEFAULT

Do not automatically solve difficulty with:
- failure currency
- permanent universal combat multipliers
- account-wide raw stats
- pity Power

Verify implementation, balance, information quality, and existing Meta first.

---

# 14. NEW CONDITION SUBSYSTEMS

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

# 15. EXPANDED STORE-BUILD AXES

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

# 16. DEEPER REGULAR-CUSTOMER RELATIONSHIP SYSTEM

Status: CONDITIONAL DEFER

Possible future ideas:
- relationship tiers
- special requests
- remembered preferences
- customer arcs

Avoid hidden preference math, obligation quests, and bar-filling optimization.

Any future relationship system should strengthen understanding of a recurring NPC.

---

# 17. FINAL / BOSS CONTENT EXPANSION

Status: FUTURE CONTENT

Potential:
- more Bosses
- new Boss-specific modifiers
- alternate Final structures
- additional Family interaction
- more ending presentation

A new Boss must change preparation decisions, not merely Power.

---

# 18. LARGE ART / WORLD CONTENT EXPANSION

Status: FUTURE

Potential:
- more portrait waves
- seasonal presentation sets
- additional Demon King sheets
- larger shop-environment replacements
- more dungeon/world environmental art

Asset count is not a substitute for game depth.

---

# 19. v3.0+ ENTRY GATE

Do not enter structural expansion merely because v2.8 is numerically complete.

First verify:

- v2.8 information-trust issues are closed
- current Store Build effects are actually understood by Players
- Fatigue is read and used
- SALE → NIGHT causality is legible
- Boss presence remains visible through the Run
- remaining strategy convergence is real rather than a presentation problem

Only then promote a P2 candidate.
