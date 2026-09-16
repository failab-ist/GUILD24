# GUILD24 v2.7 — Core Play, Feel & Product Legitimacy Vision

> Project: 《던전 앞 편의점 / GUILD24》  
> Document role: **CURRENT v2.7 DIRECTOR VISION / RELEASE INTENT / SCOPE CONTEXT**  
> Runtime semantic version target when adopted: **v2.7.0**  
> Current Design SSOT entry: `design_ssot/SPEC_INDEX_v2.7.0.md`  
> Source status: **v2.7 NOT YET ADOPTED**  
> Source gate: **v2.6.1 Adoption Recovery close first**
>
> This document explains why v2.7 exists and how its major decisions connect.
> Exact Rule / Numeric / UX / QA truth belongs only to the current routed Owner Specs and QA under `SPEC_INDEX_v2.7.0.md`.

---

# 0. AUTHORITY / DOCUMENT ROLE

Authority:

1. User's newest confirmed decision
2. Current Design SSOT
3. Current Source
4. Older chat / proposal / history

`DESIGN TRUTH = Current Design SSOT`  
`IMPLEMENTATION TRUTH = Current Source`

If this Vision and a current Owner Spec differ:

> **Current Owner Spec wins.**

This Vision must not become a second numeric SSOT.
Use it to understand intent, then use `SPEC_INDEX_v2.7.0.md` to resolve exact owner truth.

Current phase:

```text
v2.7 Design SSOT promoted
v2.7 Source not yet adopted
v2.6.1 Adoption Recovery must close first
```

No v2.7 Source change is authorized before that gate closes.

---

# 1. RELEASE VISION

## 1.1 One-line player experience

> **두 칸뿐인 Bag으로 누구에게 무엇을 포기할지 고민하고, 직접 챙겨 보낸 선택이 NIGHT와 다음 방문에 남으며, 30일의 준비가 Final로 이어지는 턴제 편의점 경영 로그라이트.**

## 1.2 Core problem

The issue is not lack of content.

The deeper issue is that different situations can converge into the same rational answer:

```text
generic strength
+ obvious Hazard answer
+ strongest NPC concentration
```

v2.7 aims to create more situations where the player thinks:

> “둘 다 챙겨줄 수는 없는데, 오늘은 뭘 포기하지?”

and later:

> “아, 지난번에 내가 저렇게 챙겨 보냈었지.”

## 1.3 Core loop

```text
관찰
→ 추론
→ 선택
→ 결과 확인
→ 기억
→ 다음 판단
```

UI principle:

> **산수는 대신할 수 있다. 판단은 대신하지 않는다.**

---

# 2. NON-GOALS

v2.7 is not:

- a separate combat game
- a crafting minigame
- a Hunger / Thirst simulation
- a product XP / mastery system
- a new UI framework
- a broad Meta power expansion
- a fail-to-power permanent-stat system
- a large dialogue/asset expansion
- a Final-only QTE or turn battle

Director order remains:

```text
REMOVE
→ REUSE
→ MERGE / CLARIFY / REBALANCE
→ only then ADD
```

The late-Run Epic Item layer is an approved exception because it solves a specific slot-value/progression problem after reuse/rebalance alone was judged insufficient.

---

# 3. TWO-SLOT SCARCITY IS THE CORE CONSTRAINT

Every ordinary SALE expedition Bag stays at exactly two slots for every NPC.

Growth must not erase the central choice.

The intended fantasy is not:

> “this NPC grew, so I no longer have to choose.”

It is:

> **“this NPC grew, so the same two slots can now be used in more sophisticated ways.”**

Level growth therefore stays readable through the four Core Stats rather than milestone clutter.

Exact ownership:
- Bag / SALE -> `SALE_v2.7.0.md`
- Level / growth -> `NPC_TRAIT_v2.7.0.md`

---

# 4. PREPARATION HAS MULTIPLE COMPETING AXES

The player should routinely trade among:

- direct expedition strength
- Hazard response
- Supply / Fatigue management
- Insurance / future NPC value
- Store Build effects
- price / Wallet / inventory opportunity cost

No one axis should become the universal answer.

Prepared-Power, Hazard, Supply, Fatigue, and exact numeric baselines belong to `DUNGEON_HAZARD_v2.7.0.md`.

---

# 5. FATIGUE / SUPPLY / INJURY MUST CREATE LONG-TERM PRESSURE

## 5.1 Supply

Food/Drink Supply exists to:

- satisfy expedition Supply requirements
- reduce existing Fatigue when excess remains
- buffer result Fatigue when excess still remains

It does not become a generic hidden Power bonus.

## 5.2 Injury

The ordinary Injury Stat penalty is intentionally **not** increased in this pass.

Instead, Injury becomes meaningful through:

- stricter natural recovery
- persistence across Retreat
- higher Severe/Death risk when an already-injured NPC is sent again

The intended decision is:

> **쉬게 할까 / 보험을 쓸까 / 그래도 다시 보낼까**

The broader ordinary Death baseline is also raised so repeated poor preparation can produce actual loss, while keeping Death inside the existing failed-combat / failed-escape resolution shape rather than adding arbitrary instant-death rolls.

Exact Injury state/recovery -> `NPC_TRAIT_v2.7.0.md`  
Exact Death/Severe risk -> `DUNGEON_HAZARD_v2.7.0.md`  
Result truth -> `NIGHT_CLOSING_v2.7.0.md`

---

# 6. ITEM REBALANCE — EARLY/MID VALUE + LATE-RUN SLOT PROGRESSION

## 6.1 Original-catalog rebalance

v2.7 already strengthens flat direct Stat value and realigns several prices so:

- direct Stat Items remain perceptible on mid/late NPCs
- narrow Hazard specialists with similar roles live in practical price bands
- Rare label alone does not make a simple Counter Item unsellable
- Potion remains the clean pure raw-Power line
- Food/Drink retain category-specific Supply / Stat / Fresh interactions

Exact values -> `ITEM_v2.7.0.md`.

## 6.2 Active catalog expands to 40

The previous 30-item ceiling is superseded.

v2.7 adds exactly 10 Epic preparation Items:

```text
5 Epic Field Gear
= Family-shaped Hybrid breadth

5 Epic Food / Drink / Potion
= top-end Stat / Supply slot efficiency
```

Purpose:

> **D20+ preparation should not feel like the player is still operating under the same early/mid-game slot-value ceiling.**

Epic does not add a third slot.
Epic is not a mandatory T3 key.
Existing lower/Main routes remain valid.

Exact Item names/effects/prices -> `ITEM_v2.7.0.md`.

## 6.3 Field Gear Epic identity

The five Epic Field Gear Items compress each Family's relevant preparation into stronger one-slot breadth.

They trade peak specialist strength for flexibility.

FIRE keeps its existing one-Hazard + high-combat identity rather than inventing a fake second Hazard.

## 6.4 Food / Drink / Potion Epic identity

The other five Epic Items extend the established category roles upward:

- Food = stronger Supply + secondary Core Stat
- Drink = sharper Core Stat with lower Supply
- Potion = top-end pure raw-Power investment

Fresh / Food-affinity / Potionbody continue to use their existing owners.
No Epic-only hidden multiplier is added.

---

# 7. LATE-RUN PROGRESSION COMES FROM DAY-BASED RARITY MIX

The 10 new Epic preparation Items do **not** receive a separate D20 hard unlock.

Instead, ORDER Rarity weights shift by Day.

Experience target:

```text
early
→ Common / Uncommon dominant
→ Epic is a rare high-roll

mid
→ Rare becomes a normal decision

late
→ Rare / Epic become a normal mixture

Final
→ high-end preparation is frequently visible
→ Legendary remains exceptional
```

This avoids maintaining both:

```text
hard Day unlock
+ separate late-Rarity curve
```

for the same purpose.

Exact Day-band weights, Reroll interaction, and QA -> `ECONOMY_ORDER_v2.7.0.md` / `ECONOMY_ORDER_QA_v2.7.0.md`.

---

# 8. SALE MUST FEEL LIKE HANDLING A CUSTOMER

Canonical feel:

```text
choose/focus Bag slot
→ choose Item
→ choose price
→ hand/commit transaction
→ purchase or refusal resolves
→ current state updates
→ judge remaining slot
```

Do not merge the two slots into a cart checkout.

A committed first transaction may change the real state before the second decision.

## 8.1 Pre-commit information boundary

Before commitment, show ingredients:

- exact Item effect
- price / affordability
- deterministic Supply/Fatigue arithmetic

Do not show hypothetical answer transitions such as:

- Forecast upgrade
- Readiness upgrade
- Great Success answer
- exact success/death probability
- best/recommended Item

After real purchase commitment, current qualitative state may update because the state is now real.

## 8.2 Decision-only detail

Remove from the SALE decision surface:

- `이 손님에게 안 걸리는 효과`
- flavor-only `상품 설명`

Do not add a replacement accordion just to preserve non-decision flavor.

## 8.3 Post-commit delta truth

An Item directly changes only the channels written on that Item.

A Supply Item may still change other effective preparation through real system channels such as:

- Supply Deficit relief
- Fatigue penalty-band recovery

If such a derived change is shown, it must be attributed to the system source rather than presented as a hidden Item Stat.

Prefer updating the primary current state in place over showing a large synthetic `보급 후 변화` wall.

Exact SALE truth -> `SALE_v2.7.0.md`  
Presentation -> `UI_UX_v2.7.0.md`

## 8.4 Refusal price coherence

A refusal at one price creates a same-customer / same-SKU ceiling for higher price modes during that visit.

Purpose:

> prevent RNG fishing where a customer refuses a lower price and later accepts the same item at a higher price.

Exact rule -> `SALE_v2.7.0.md`.

---

# 9. NIGHT / RETURNING NPC MUST PROVE CONSEQUENCES

NIGHT should explain only what actually happened.

It may expose:

- real Supply/Fatigue arithmetic
- actual persistent Injury change
- proven Item/Trait/Event contribution
- actual accepted Bag

It must not invent failure diagnosis without runtime proof.

Each persistent NPC keeps one latest completed-expedition snapshot so the next visit can quickly answer:

> “지난번에 내가 뭘 챙겨 보냈고, 어떻게 돌아왔지?”

No unlimited personal timeline is added.

Exact snapshot -> `NPC_TRAIT_v2.7.0.md`  
Result/causality -> `NIGHT_CLOSING_v2.7.0.md`

---

# 10. MORNING / ORDER SHOULD SUPPORT PLANNING WITHOUT REVEALING THE SOLUTION

Before ORDER, MORNING exposes:

- current-day real Gate/Hazard context
- next-day Gate-count forecast
- next-day Tier forecast

It does not reveal:

- next-day Family
- exact future Hazard set
- future customer/destination
- recommended SKU
- success/death probability

The player knows:

> **내일 얼마나 많이, 얼마나 위험한지는 안다.  
> 정확히 무엇이 필요한지는 모른다.**

Exact forecast generation -> `DUNGEON_HAZARD_v2.7.0.md`  
Economy/presentation contract -> `ECONOMY_ORDER_v2.7.0.md` / `UI_UX_v2.7.0.md`

---

# 11. FINAL MUST REUSE THE CORE RETAIL LOOP

Final is not a separate game.

The player-facing climax is:

```text
출전 NPC 선택
→ FINAL 판매
→ 결과
```

After party selection is committed:

- selected participants are processed through familiar sequential SALE handling
- normal Wallet / price / affordability / refusal / stock rules remain meaningful
- actual Final sales are real economy transactions
- Final-only no-effect Items are blocked/readable
- no free equipment bypass exists
- no QTE / attack-selection layer is added

After all selected participants finish Final SALE:

```text
Final Lock
→ one Boss resolution
→ one result
```

This makes Final legible as:

> **누구를 데려갔고, 무엇을 실제로 팔아 준비시켰는지의 결과**

Final Families/Hazards are already known from the persisted D25 state.

GREED reads the committed gross-sales state at Final Lock after Final SALE.

Exact Final truth -> `FINAL_EXPEDITION_v2.7.0.md`  
Boss modifier truth -> `BOSS_v2.7.0.md`

---

# 12. STORE BUILD / TRAIT / BOSS MUST MODIFY EXISTING DECISIONS

Relic should alter store strategy, access, economy, or Item value without becoming generic hidden Power.

Traits should make NPCs different people without creating invisible sub-systems.

Bosses should change which existing Final preparation choices matter rather than introducing a second combat game.

Fresh, Food-affinity, Potionbody, GLUTTONY, SLOTH, and other exact modifier composition belongs to their routed owners.

---

# 13. PRODUCT LEGITIMACY / UX

The game should feel like a fantasy convenience store, not a generated dashboard.

Preserve/reinforce:

- store / board / paper / wood / metal / slate / receipt material language
- character-centered SALE
- compact but readable decision information
- mobile tap-first interaction
- semantic phase/action treatment

Avoid:

- round-all-card SaaS grammar
- recommendation badges everywhere
- icon-on-every-row decoration
- nested modal proliferation
- decorative information that looks actionable but is not

Strong Sign Green remains a specific semantic action rather than a generic CTA color.

Exact UI/material/typography -> `UI_UX_v2.7.0.md`.

---

# 14. SAVE / META CONTINUITY

v2.7 uses the current Save-v8 boundary.

Principle:

```text
validated previous Account/Meta
→ preserve where current owner approves

legacy Run
→ not continued as v2.7 Run
→ fresh v8 Run
```

No fail-to-power Meta currency or generic permanent combat multiplier is added.

Exact save/migration -> `CORE_RUN_v2.7.0.md` / `META_v2.7.0.md`.

---

# 15. FULL-RUN VALIDATION — WHAT v2.7 MUST PROVE

v2.7 succeeds because decisions change, not because feature count rises.

Validate at minimum:

1. More than one rational two-slot Bag exists in representative situations.
2. Strong NPC concentration is not the only rational strategy.
3. Food/Drink genuinely compete with direct Power and Counter preparation.
4. Late NPC growth does not erase slot scarcity.
5. Injury creates a real `rest / insure / risk another expedition` decision.
6. Poor late-Run preparation makes Severe/Death a credible consequence without making good preparation feel arbitrary.
7. Direct Stat Items remain perceptible on mid/late NPCs.
8. The Epic layer improves late-Run slot-value progression without becoming mandatory.
9. Day-based Rarity progression makes Epic meaningfully visible late without deleting Common/Uncommon decisions.
10. Counter specialists remain economically usable.
11. SALE feels like handling a customer.
12. Post-commit changes are source-truthful.
13. NIGHT proves consequences without inventing causes.
14. D25 information changes late-Run planning.
15. Final reads clearly as `선택 → 판매 → 결과`.
16. UI helps arithmetic without giving the answer.
17. The game looks and reads like GUILD24 rather than a generic application.

Balance mismatch becomes a `BALANCE FINDING`.
Frozen QA does not auto-tune production values.

---

# 16. IMPLEMENTATION ADOPTION ORDER — AFTER RECOVERY CLOSE

Dependency guide only:

1. Save v8 / compatibility boundary
2. Prepared-Power common baseline
3. Bag always 2 + Level simplification
4. Item categories / 40-item catalog / price and Stat rebalance / Epic layer
5. Day-based ORDER Rarity progression
6. Trait modifier scopes
7. Injury persistence / Death-risk baseline
8. Relic/Fresh composition
9. Fatigue/Supply exact pipeline
10. SALE sequential handling + information boundary
11. recent-expedition snapshot + NIGHT causality
12. D0~D30 timeline / D25 persistence
13. Final formula / Final SALE / Final no-effect Insurance
14. Boss modifiers / SLOTH
15. Event/copy migration
16. visual/typography pass
17. frozen QA / full-run validation

No unrelated Refactor.
QA findings go to separate Fix Cycles.

---

# 17. OWNER ROUTING

Always start from:

`design_ssot/SPEC_INDEX_v2.7.0.md`

Key owners:

- Run / Save / Final timeline -> `CORE_RUN_v2.7.0.md`
- Economy / Order / Wallet / Reroll / Day Rarity -> `ECONOMY_ORDER_v2.7.0.md`
- NPC / Trait / Level / Injury / recent snapshot -> `NPC_TRAIT_v2.7.0.md`
- Dungeon / Hazard / Power / Supply / Fatigue / Death risk -> `DUNGEON_HAZARD_v2.7.0.md`
- Item / catalog / price / Epic / Potion / Insurance -> `ITEM_v2.7.0.md`
- Relic / Fresh -> `RELIC_v2.7.0.md`
- SALE -> `SALE_v2.7.0.md`
- NIGHT -> `NIGHT_CLOSING_v2.7.0.md`
- UI/UX -> `UI_UX_v2.7.0.md`
- Copy -> `COPY_WORLD_VOICE_v2.7.0.md`
- Event -> `EVENT_v2.7.0.md`
- Boss -> `BOSS_v2.7.0.md`
- Final -> `FINAL_EXPEDITION_v2.7.0.md`

Vision is context.
Owner Specs are Design Truth.

---

# 18. FINAL DIRECTOR INTENT

v2.7 should make the existing game sharper rather than merely larger.

The Run should create difficulty through constrained, legible choices:

- only two Items fit
- generic Power matters but is not every answer
- Hazard specialists matter
- Food/Drink and Condition management matter
- injured NPCs create future-risk decisions
- late-game Item slot value progresses
- the store's offer mix visibly matures with the Run
- Insurance protects future value through a distinct channel
- what was sold matters later
- Day 30 is visible as a destination
- Final reuses the act of selling instead of becoming another game
- UI shows truth without solving the decision for the player

The central loop remains:

```text
관찰
→ 추론
→ 선택
→ 결과 확인
→ 기억
→ 다음 판단
```

v2.7 should feel:

> **more constrained, more consequential, more readable, more tactile, and more legitimate as a finished indie game.**
