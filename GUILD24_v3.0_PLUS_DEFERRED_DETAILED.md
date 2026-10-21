# GUILD24 v3.0+ — Deferred Expansion Router

> Project: 《마왕 잡는 편의점: 길드24 / GUILD24》
> Document role: **v3.0+ DEFERRED DESIGN ROUTER / FUTURE CANDIDATE CONTEXT**
> Status: **NOT CURRENT DESIGN SSOT**
> Retired sections (rejected ideas, 2026-09 reviews, v2.8 entry gate): `archive/v2.8/DEFERRED_ROUTER_RETIRED.md`
> Current Design Truth entry: `design_ssot/SPEC_INDEX_v2.13.17.md`
>
> User decision:
> work classified as P2 or later is not part of v2.8 or v2.9.0.
> It is deferred to v3.0+ unless the User later promotes it.
> (2026-09-24: v2.9.0 was scoped to readability / onboarding / transaction visibility / rule
> simplification only — see `archive/changelog/CHANGELOG_v2.8.0-v2.9.11.md` §v2.9.0 — so every section here moved to v3.0+.)

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

For all current truth, use `design_ssot/SPEC_INDEX_v2.13.17.md`.

---

## STILL-DEFERRED SMALL CANDIDATES (User 2026-09-25)

- daily reward loop: one line of "today vs yesterday" (e.g. `어제보다 +N`) at CLOSING on top of the per-customer
  receipt stub; a short loop between the per-sale beat and the D30 goal
- ORDER allowed-range surface: before confirming, what today's stock can serve (how many of today's customers) —
  sits on the boundary of "the judgement is the player's"; needs a User decision before any design

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
