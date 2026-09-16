# GUILD24 v2.7 — Core Play, Feel & Product Legitimacy Vision

> Project: 《던전 앞 편의점 / GUILD24》  
> Document role: **CURRENT v2.7 DIRECTOR VISION / RELEASE INTENT / SCOPE CONTEXT**  
> Runtime semantic version target when adopted: **v2.7.0**  
> Current Design SSOT entry: `design_ssot/SPEC_INDEX_v2.7.0.md`  
> Design status: **v2.7 SSOT PROMOTED / FINAL CONFLICT SWEEP COMPLETE**  
> Source status: **v2.7 NOT YET ADOPTED**  
> Source gate: **v2.6.1 Adoption Recovery close first**  
>
> This document explains **why v2.7 exists, what player experience it is trying to create, how the major changes connect, and what is intentionally not part of v2.7**.  
> Exact Rule / Numeric / UX / QA truth remains owned by the current routed Owner Specs and QA under `SPEC_INDEX_v2.7.0.md`.

---

# 0. DOCUMENT AUTHORITY / HOW TO READ THIS

## 0.1 Authority

Priority:

1. User's newest confirmed decision
2. Current Design SSOT
3. Current Source
4. Older chat / proposal / history

`DESIGN TRUTH = Current Design SSOT`  
`IMPLEMENTATION TRUTH = Current Source`

If this Vision and a current Owner Spec ever differ:

> **Current Owner Spec wins.**

This Vision is not a second numeric SSOT.
It exists so a new Director / WORK session can understand:

- what problem v2.7 is solving
- why the individual rule changes exist
- how those changes are meant to interact
- what should be preserved during implementation
- what should not be "helpfully" expanded

## 0.2 Current SSOT status

v2.7 is no longer a future planning umbrella.

Current Design SSOT has already been promoted to:

`design_ssot/SPEC_INDEX_v2.7.0.md`

The final cross-owner conflict sweep is complete, with the latest approved amendments added afterward and routed into the same v2.7 owner set.

Current index status:

```text
SSOT_AUDIT_STATUS = FINAL_CONFLICT_SWEEP_COMPLETE_WITH_LATEST_APPROVED_AMENDMENTS
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED = NONE
NON_BLOCKING_PLAYER_COPY_UNRESOLVED = NONE
SOURCE_ADOPTION_STATUS = NOT_YET_ADOPTED
V2_7_SOURCE_EDIT_GATE = BLOCKED_UNTIL_V2_6_1_ADOPTION_RECOVERY_CLOSE
```

Therefore:

- Design is ready as a v2.7 implementation baseline.
- v2.7 Source is **not** yet implemented.
- Do not change the v2.7 Design to match current v2.6.1 Source.
- Finish v2.6.1 Adoption Recovery first.
- Then begin v2.7 Source Adoption from the current v2.7 SSOT.

## 0.3 DIRECTOR DOCUMENT BASELINE

Several current Owner Specs use:

`DIRECTOR DOCUMENT BASELINE`

Meaning:

- it is the approved implementation starting value
- WORK must not invent a different value
- frozen QA must not auto-tune it
- it still requires full-run validation
- a later adjustment is allowed only through a separate approved balance cycle

This is important because v2.7 contains a number of interconnected rebalances.
The purpose of the baseline is not to pretend the numbers are mathematically optimal.
The purpose is to give implementation a coherent, testable starting point.

---

# 1. v2.7 RELEASE VISION

## 1.1 One-line player experience

> **두 칸뿐인 Bag으로 누구에게 무엇을 포기할지 고민하고, 직접 챙겨 보낸 선택이 NIGHT와 다음 방문에 남으며, 30일의 준비가 Final로 이어지고, 그 모든 과정이 웹앱이 아니라 하나의 게임 세계를 조작하는 것처럼 느껴지는 버전.**

## 1.2 Why v2.7 exists

Current play can converge toward a familiar safe sequence:

```text
전투 전망을 접전~우세로 맞춤
→ Hazard 취약 제거
→ 자원 부족 시 평범한 NPC 포기
→ 희귀/고렙/유망 NPC 집중 투자
```

The problem is not lack of content.

The deeper problem is:

> **different situations can collapse into the same rational answer.**

If the optimal answer is repeatedly:

- raise generic expedition strength
- remove the obvious Hazard weakness
- concentrate resources into the already-good NPC

then adding more Item names, more dialogue, or more visual decoration does not create deeper play.

At the same time SALE can still feel like:

> select an option in a web form → submit → see result

instead of:

> I am the shopkeeper deciding what this person actually leaves with.

v2.7 therefore solves **decision convergence + weak action feel + weak memory continuity** together.

## 1.3 The seven connected axes

v2.7 improves seven connected areas:

1. **Decision Constraint**  
   Late game does not erase scarcity. Ordinary Bag remains exactly two slots.

2. **Decision Diversity**  
   Combat / Hazard / Fatigue-Supply / Insurance / Store Build compete instead of stacking into one universal answer.

3. **Memory & Causality**  
   What the player sold is remembered and connected to NIGHT and the next visit.

4. **Run Purpose**  
   D0~D30 communicates a visible Final horizon; D25 gives usable Final information before the run ends.

5. **Physical Play Feel**  
   SALE becomes handling: choose, place, price, commit, see acceptance/refusal, then reconsider the remaining slot.

6. **Product Legitimacy**  
   The game keeps its existing wood/paper/metal/slate world language but removes generic SaaS / AI-template visual grammar.

7. **Information Trust**  
   The game exposes decision ingredients, but does not calculate the answer for the player or teach mechanics that do not exist.

## 1.4 Core design sentence

v2.7 should create more situations where the player thinks:

> “둘 다 챙겨줄 수는 없는데, 오늘은 뭘 포기하지?”

and then later:

> “아, 지난번에 내가 저렇게 챙겨 보냈었지.”

That is more important than increasing feature count.

---

# 2. NON-GOALS

v2.7 is NOT:

- a content-count expansion patch
- a new combat game
- a crafting minigame
- a Hunger / Thirst simulation
- a product mastery / product XP system
- a large NPC dialogue expansion
- a large character-expression asset expansion
- a full store-background remake
- a new UI framework
- a new theme engine
- a third font family / icon-font system
- a broad Meta progression expansion
- a fail-to-power permanent stat system
- a large Final-exclusive cinematic system
- an Expedition Purpose system by default

Rule:

```text
REMOVE
→ REUSE
→ MERGE / CLARIFY / REBALANCE
→ only then ADD
```

A feature is not progress merely because it is new.

---

# 3. ENTRY GATE — v2.6.1 RECOVERY MUST CLOSE FIRST

v2.7 Design is ready, but implementation is intentionally gated.

Exact dependency:

```text
finish and close v2.6.1 Adoption Recovery acceptance
→ User / Director confirms Recovery close
→ begin v2.7 Source Adoption
```

Until then:

- do not implement v2.7 Source
- do not mix v2.7 runtime changes into v2.6.1 Recovery
- do not use partial/uncommitted Recovery work as a v2.7 base
- do not "prepare ahead" by changing Source
- v2.7 documentation may be audited, but Source remains the v2.6.1 Recovery target

Reason:

v2.7 changes decision structure.
It must be adopted onto a trustworthy recovered baseline, not a partially broken one.

---

# 4. v2.7 SYSTEM CONNECTION MAP

The point of v2.7 is not any one numeric change.
The important thing is **how the systems connect**.

```text
Bag always 2
        ↓
Power / Hazard / Fatigue / Insurance must compete
        ↓
Item roles become more distinct
        ↓
Relics amplify a store strategy instead of deleting specialist value
        ↓
Traits create character variation without adding hidden sub-systems
        ↓
SALE choice becomes more meaningful
        ↓
NIGHT proves actual consequences
        ↓
Returning NPC shows recent continuity
        ↓
D25 Final info changes late-run preparation
        ↓
D30 feels like the result of the Run
```

If implementation preserves each feature but breaks this connection, v2.7 misses its purpose.

---

# 5. P0 — EXPEDITION POWER AS THE COMMON PREPARATION BASELINE

## 5.1 Why it matters

Normal expedition preparation, Forecast, Resolve, and Great Success all depend on the same four visible Core Stats.

The v2.7 approved baseline is:

```text
Prepared Power
= 투력 × 0.50
+ 강인함 × 0.34
+ 기동 × 0.27
+ 정신 × 0.20
```

This is now the current v2.7 implementation baseline.

It is no longer an unresolved pre-audit candidate.

## 5.2 Design direction

투력 remains the strongest direct expedition-power lever.

The goal was never:

> make all four coefficients equal.

The goal is:

> stop 투력 from making investment in 강인함 / 기동 / 정신 feel irrelevant.

Expected role:

```text
투력
= strongest direct generic expedition lever

강인함
= strong direct contribution + survival / Hazard utility

기동 / 정신
= lower direct contribution but important through Hazard / escape / fatigue-sensitive routes
```

No new player-facing aggregate `Power` stat is created.

The player still sees:

- 투력
- 강인함
- 기동
- 정신
- qualitative Forecast

The formula remains internal.

## 5.3 Trust rule

Forecast and actual Resolve must use the same four-weight truth.

Do not allow:

- preview using one coefficient set
- resolution using another
- Great Success reading a stale third formula

That would destroy information trust.

---

# 6. P0 — BAG CAPACITY: ALWAYS TWO

## 6.1 Rule

Every ordinary SALE expedition Bag has exactly:

```text
2 slots
```

for all NPCs regardless of:

- Level
- Job
- Rarity
- Trait

The old Lv10+ third ordinary slot is removed.

No ghost third slot.
No hidden Level capacity.
No silent Trait capacity.
No "visual only" disabled third slot.

## 6.2 Why

The third slot weakened late-run decisions.

With three slots, one strong NPC could too often cover:

- direct expedition Power
- Hazard response
- Supply/Fatigue
- Insurance/flex

at the same time.

The intended growth fantasy is not:

> “this NPC grew, so I no longer need to choose.”

It is:

> **“this NPC grew, so the same two slots can now be used in more sophisticated ways.”**

## 6.3 NPC growth consequence

Level-up therefore focuses on visible character growth:

```text
Job Growth × Potential
→ four Core Stats increase
```

v2.7 removes Level-milestone growth clutter:

- no Lv10 third Bag
- no automatic milestone Trait
- no milestone Rank/Title reward
- no hidden Level passive
- no Level-only Equipment grant
- no separate Level combat multiplier

This keeps growth readable:

> Job + Level + actual four Core Stats.

## 6.4 Acceptance intent

Late game should still contain real choices because:

- stronger NPCs reduce some preparation needs
- but never gain enough ordinary slots to solve everything at once

---

# 7. P0 — FATIGUE / SUPPLY AS A REAL THIRD PREPARATION AXIS

## 7.1 Role

The decision is not only:

```text
Combat + Hazard
```

It becomes:

```text
today's Power
vs Hazard response
vs long-term Condition
```

with only two Bag slots.

Example:

```text
Power Forecast = 접전
Cold Readiness = 취약
Fatigue = 8
```

Plausible choices:

**Potion / Power + Cold specialist**  
→ maximize today's chance, accept future Fatigue pressure

**Cold specialist + Food/Drink**  
→ protect Hazard + condition, give up direct Power

**Potion / Power + Food/Drink**  
→ maintain current strength + condition, accept Cold risk

The correct answer should depend on context.

## 7.2 Current v2.7 Fatigue baseline

Outcome Fatigue:

```text
성공      +3
대성공    +3
퇴각      +5
부상      +6
중상       0
사망       0
```

Fatigue penalties:

```text
0~9   : no Stat penalty
10~19 : 기동 / 정신 -15%
20    : 기동 / 정신 -40%
```

The 20 state is intentionally severe.
It is a credible consequence of repeated overuse, not a mild second tier.

## 7.3 Trait interaction

Current result-Fatigue Trait modifiers remain meaningful:

- `지구력 / stamina` = -1
- `쉽게 지침 / weary` = +1
- `악바리 / grit` = +1 where its current rule applies

They apply to:

- 성공
- 대성공
- 퇴각
- 부상

They do not turn 중상/사망 into positive Fatigue gain.
Those remain 0.

## 7.4 Supply exact role

Food / Drink Supply is not converted into generic Power.

Exact conceptual order:

1. pay Required Supply
2. remaining Supply reduces current Fatigue
3. any still-remaining Supply buffers this expedition's resulting Fatigue gain 1:1
4. leftover after that is discarded

Key fields:

```text
preparedSupply
requiredSupply
excessSupply
preRecovery
fatigueBeforeExpedition
remainingSupplyBuffer
rawOutcomeFatigueGain
outcomeBufferUsed
actualOutcomeFatigueGain
finalFatigue
```

The important design result is:

> excess Supply has a second legitimate use after current-Fatigue recovery, but still does not become universal Power.

## 7.5 Guardrails

Excess Supply does NOT automatically become:

- success chance
- combat Power
- Loot
- Hazard defense
- persistent next-expedition buffer

No Hunger gauge.
No Thirst gauge.
No caffeine stack.
No hidden Food+Drink pairing system.

The current channel is deliberately simple:

> **Supply pays expedition needs and protects condition.**

## 7.6 Player-facing information

The game may do deterministic arithmetic for the player.

Allowed:

- Required Supply
- Prepared Supply
- deficit amount
- current Fatigue
- departure Fatigue after recovery
- remaining Supply buffer
- conditional Night Fatigue values by possible Outcome

Forbidden:

- exact hidden success probability
- hidden Hazard threshold
- automatic answer/recommendation

Principle:

> **산수는 대신할 수 있다. 판단은 대신하지 않는다.**

---

# 8. P0 — ITEM ARCHITECTURE / CATALOG REBALANCE

## 8.1 Category architecture

Current v2.7 player-facing categories are exactly:

```text
Food
Drink
Potion
Field Gear
Insurance
Special
```

`Medical` is removed.

This is an important update from the old planning document.

## 8.2 Category centers of gravity

### Food

Primary role:

> high Supply / Fatigue management + modest secondary value

Food is not Supply-only.
It can carry a small Stat or narrow secondary hook.

But an ordinary Food should not simultaneously be:

- top Supply
- top direct Power
- top Hazard solution
- top Economy

without a clear exceptional cost/tradeoff.

### Drink

Primary role:

> lower Supply + sharper immediate Stat / Counter / RiskReward value

Drink should not feel like:

> Food with a different icon.

It often gives less condition value and more immediate tactical value.

### Potion

Primary role:

> generic immediate raw-Power specialist

Potion line is now explicit:

```text
하급 포션   투력 +8
중급 포션   투력 +12
상급 포션   투력 +16
```

v2.7 also raises the flat native Core-Stat contribution of ordinary Food/Drink Stat routes.
The previous values were too easy to become visually and strategically negligible against mid/late-Run NPC growth.

The rebalance principle is:

> **NPC growth remains the long-term body of strength, but one appropriate Item must still be felt when it is sold late in the Run.**

Representative current native-Stat baselines include:

```text
삼각김밥       강인함 +8
생수           강인함 +6
핫바           투력 +6
초코바         기동 +8
캔커피         기동 +12
진정 허브티    정신 +15
불룡볶음면     강인함 +8
에너지드링크   기동 +15
길드 프리미엄 도시락 강인함 +10
```

Fresh / Food-affinity amplification still works from these Item base values through the existing additive modifier rule.
No new late-game percentage-scaling system is added.

All Potion tiers:

- Supply 0
- Counter 0
- Insurance 0

Potion provides a clear answer to:

> “I want to invest one slot directly into today's expedition strength.”

It does not become a Hazard/Insurance universal item.

### Field Gear

Primary role:

> narrow Hazard specialist / explicit Hybrid

Dedicated specialist value is intentionally strong on its owned target.

### Insurance

Primary role:

> bad-outcome conversion / mitigation / aftercare

Insurance is not generic Power.

### Special

Primary role:

> explicit exceptional utility / economy behavior

Special is not a dumping category for normal Stat items.

## 8.3 Catalog philosophy

Current active catalog remains exactly 30 items.

v2.7 reworked existing roles before adding unnecessary products.

Retired active identities include:

- 붕대
- 마석 보조배터리

New / migrated identities include:

- 진정 허브티
- 중급 포션

The point is not that these exact names are the vision.
The point is:

> the 30-item catalog now expresses distinct preparation lanes without requiring a larger content count.

The same pass also realigns prices by gameplay role rather than rarity alone.

Important current examples:

```text
농축 해독제          80 / 170
쿨링 이온음료        80 / 170
길드 프리미엄 도시락 170 / 360
구급키트             100 / 210
```

Narrow Main Hazard specialists should generally live near the same economic band.
A simple `+18 Counter` Item should not become practically unsellable only because its rarity label is Rare.
Higher prices are reserved for genuinely broader value such as multi-role premium Food, strong Insurance, or exceptional utility.

## 8.4 Hazard specialist structure

The game retains specialist / lower / hybrid-natural alternative logic.

Examples:

- Poison: 농축 해독제 / 방진마스크 / natural-Trait alternatives
- Cold: 핫팩 / 컵라면 / 불룡볶음면
- Fire: 쿨링 이온음료 / 얼음컵
- Fear: 용사의 곡주 / 집중 사탕
- Corrosion: 코팅제 / 방수망토
- Mire: 장화 / 방수망토

The exact numbers live in ITEM.

The vision is:

> **dedicated specialist is reliably strong on its exact target, but the player can still solve or partially solve the situation through natural stats, lower-tier answers, or hybrids.**

## 8.5 Insurance architecture

The three important insurance identities remain distinct.

### 구급키트

Aftercare.

It does not change the expedition Outcome.

It changes persistent injury state after resolution.

This matters because the item is about:

> protecting the future value of the NPC

not rewriting the current expedition into success.

### 귀환석

Emergency escape / crisis conversion.

### 세계수 생환부적

Remaining Death → Severe Injury once.

Resolution ordering is explicit in current ITEM.

This keeps Insurance legible rather than stacking hidden rescue rules.

## 8.6 Antidote boundary

`농축 해독제` is a Poison specialist.

v2.7 does **not** add a hidden Poison Condition/cure subsystem just because the item is called an antidote.

This is a good example of v2.7's truth principle:

> theme does not invent an unowned mechanic.

---

# 9. P0 — TRAIT ROLE CLARITY

## 9.1 Food affinity

`대식가` and `소식가` are narrowed to exact Food behavior.

### 대식가

```text
Food positive native Core-Stat +30%
each Food Supply -1, minimum 1
```

### 소식가

```text
Food positive native Core-Stat -20%
each Food Supply +1
```

They do not secretly modify:

- Hazard Counter
- Insurance
- harmful RiskReward penalty
- separate native-recovery subsystem

## 9.2 Potionbody

`포션체질`:

```text
Potion positive native Core-Stat ×1.15
```

It does not amplify:

- Counter
- Supply
- Insurance
- unrelated effects

This keeps Trait identity strong without making it a universal multiplier.

## 9.3 Trait / Relic stacking rule

When Food Trait affinity and Fresh Relics modify the same positive native Core-Stat contribution, they use one base-additive modifier pool.

Example:

```text
대식가 + 즉석식품 코너 + 24시간 신선체계
= +30% +40% +80%
= base ×2.50
```

With active 원정 도시락 코너 Stat condition:

```text
+30% +40% +80% +25%
= base ×2.75
```

This was intentionally resolved as additive, not sequential Trait×Relic multiplication.

Reason:

- easier to reason about
- less explosive build scaling
- consistent with Fresh-to-Fresh stacking
- preserves coherent-build reward without making one category uncontrollably dominant

---

# 10. P0 — RELIC AS STORE BUILD, NOT GENERIC POWER

## 10.1 Influence hierarchy

Use the intended influence hierarchy:

```text
NPC Base / Level / Growth / Equipment
> Sold Item
> single Store Support
> Event
> Trait
```

A single Relic should not directly overpower an appropriate Item in the same moment.

But a coherent multi-Relic build can exceed one Item cumulatively because it affects the Run repeatedly.

## 10.2 Build feel

Target:

```text
1 Piece = direction visible
2 Pieces = operation meaningfully changes
3 Pieces = Build Engine
4 Pieces = strong completed Build
5+ Pieces = rare high-roll
```

This is the Store Build fantasy.

## 10.3 Fresh identity

Fresh is no longer mainly:

> “make Supply number bigger.”

Its current identity is:

> **make Food/Drink a much stronger store strategy while keeping specialist boundaries readable.**

Important Fresh examples:

- 대형 냉장고 → shelf-life support
- 즉석식품 코너 → positive native Core Stat +40%
- 원정 도시락 코너 → conditional Counter / Stat amplification
- 24시간 신선체계 → shelf + native Stat payoff
- 냉장 쇼케이스 / 새벽 공동배송 → offer / inventory / bulk identity

Fresh native-Stat bonuses stack additively from base.

Current high-point examples:

```text
+40% +80% = base ×2.20
+40% +80% +25% = base ×2.45
```

Food affinity may join this same additive pool.

## 10.4 Fresh guardrail

A strong completed Fresh build is allowed to be strong.

But it must not erase:

- dedicated Potion raw-Power identity
- dedicated Field Gear Hazard reliability
- Insurance identity
- explicit RiskReward downside

Fresh changes how Food/Drink feels.
It does not convert Food/Drink into every category at once.

## 10.5 Reroll Relic alignment

`발주 교환권` follows the current Economy owner.

Current daily sequence:

```text
normal: 50 → 100 → 200 → 400 → 800 → ×2
with coupon: 0 → 100 → 200 → 400 → 800 → ×2
```

This is an example of why current Vision must reference current SSOT rather than preserve stale planning examples.

---

# 11. P0 — LAST BAG + NIGHT CAUSALITY + REVISIT MEMORY

## 11.1 Goal

Complete the core loop:

```text
SALE choice
→ NIGHT result
→ memory
→ next SALE judgment
```

without building a second History system.

## 11.2 Stored recent snapshot

Each persistent NPC keeps exactly one latest completed-expedition snapshot.

It contains:

- completed Day
- actual destination
- final Outcome
- exact accepted/purchased Bag Item IDs
- only contribution/cause tokens actually proven by the resolved report

It does not keep an unlimited new timeline.

## 11.3 Returning NPC quick surface

Compact form:

```text
지난 원정 · DAY X · 결과 · [item] [item]
```

The point is not data collection.

The point is:

> “지난번에 얘한테 뭘 줬고 어떻게 됐지?”

within a few seconds.

## 11.4 Causality standard

Item presence alone is not proof.

NIGHT may say an Item contributed only when runtime can prove it changed something.

New v2.7 provable examples include:

- Supply pre-expedition recovery
- Supply result-Fatigue buffer
- First Aid Kit Aftercare

Do not invent diagnoses like:

- 전투 부족
- 독 대응 부족

unless the report can actually prove that exact causal claim.

## 11.5 Item attachment without product XP

Do not add:

- Product XP
- Product Mastery
- Favorite Meter
- Familiarity bonus

Attachment comes from continuity:

```text
ORDER purchase
→ inventory
→ SALE Bag
→ NIGHT result
→ returning NPC last Bag
```

The same object becomes memorable because it persists through the loop.

---

# 12. P1 — D0~D30 FINAL HORIZON / D25 RECON

## 12.1 Purpose

The 30-day Run needs a visible strategic horizon.

The player should not learn the relevant Final environment only after meaningful preparation time is gone.

## 12.2 Current timeline

```text
D0  : Final objective notice
D5  : Boss information flow
D10 : FINAL까지 20일
D15 : additional Boss information flow
D20 : FINAL까지 10일 + Recon dispatch
D25 : FINAL까지 5일 + exact Final Family Pair / Hazard Pool generated, revealed, persisted
D30 : reuse exact D25 persisted state; no reroll
```

## 12.3 Important clarification

Final does not mean:

> arbitrary two Hazard keys.

The current structure is:

1. select exactly two distinct authoritative Dungeon Families
2. read their T2 Hazards
3. merge into the Final Hazard Pool
4. persist exact Family Pair + Pool
5. reveal that state on D25
6. D30 uses that exact state

This preserves the existing Family architecture while moving decision-useful information earlier.

## 12.4 Preparation contract

D25 information does not grant the answer.

No:

- guaranteed Counter offer
- free counter
- free Final item
- special Final-only shop

The remaining days are ordinary management preparation:

- Order
- Warehouse
- Reroll
- NPC preservation
- stock retention
- Final participant planning

**Preparation itself is the play.**

## 12.5 Save / reroll integrity

D25 state is persistent.

Save/Load cannot reroll it.

A controlled development/migration repair may generate missing v8 D25 state exactly once, then persist it.

This is not a Player fishing path.

---

# 13. FINAL EXPEDITION — RUN CULMINATION

## 13.1 Final is not a separate game

Final should feel like:

> the accumulated consequence of the Run's preparation.

Not:

> a new minigame added on Day 30.

The D30 climax now deliberately reuses the game's core retail action instead of jumping from party selection into an opaque combat calculation.

Player-facing Final flow:

```text
출전 NPC 선택
→ FINAL 판매
→ 결과
```

After the Final party is confirmed, the selected NPCs are handled one by one through the familiar SALE logic.
The Player sells the actual Final items to them, sees acceptance/refusal and the current prepared state, then proceeds to the one Final result.

This keeps the Boss battle legible as:

> **누구를 데려갈지 고르고, 무엇을 팔아 준비시켰는지의 결과**

rather than a detached combat screen.

Final SALE is not a new minigame:
- ordinary 2-slot handling is reused
- Wallet / price / refusal / stock rules remain meaningful
- Final-only no-effect Items are blocked
- Boss-specific changes are shown on the preparation information that they actually modify
- no extra attack/QTE/combat-input layer is added

## 13.2 Hazard aggregation direction

Current Final uses each participant's actual gap against the persisted Final Hazard Pool.

The v2.7 baseline aggregates by mean gap rather than blindly punishing Family pairs with more Hazard entries.

Current baseline:

```text
FinalMeanHazardGap
= sum(each Final Hazard gap) / Final Hazard Count

Final Hazard Penalty
= FinalMeanHazardGap × 1.70
```

Individual Final Power follows the same four-stat family:

```text
투력 ×0.50
+ 강인함 ×0.34
+ 기동 ×0.27
+ 정신 ×0.20
- FinalMeanHazardGap ×1.70
```

Final Roll remains inherited:

```text
0.88 ~ 1.12
```

## 13.3 Final Insurance no-op

Ordinary Final resolution does not run the normal Retreat/Injury/Severe/Death chain after Boss resolution.

Therefore:

- 구급키트
- 귀환석
- 세계수 생환부적

have no ordinary Final effect.

The preparation UI should communicate:

`Final 효과 없음`

and should block placement when practical.

This is better than silently inventing a Final-only Insurance effect just to avoid a dead pick.

---

# 14. BOSS — DIFFERENT FINAL DECISIONS, NOT JUST DIFFERENT NUMBERS

## 14.1 WRATH

WRATH baseline remains 200.

First clear at Mastery 0 must still be possible through:

- strong Run growth
- preparation
- Build
- player mastery

The game does not solve first-clear difficulty by granting permanent power for failure.

## 14.2 PRIDE

Current v2.7 baseline:

```text
prideCombatFactor = 0.92
```

It affects Final participant 투력 under its existing scope.

## 14.3 GREED

Keep the existing Gross-Sales metric / target.

Current strengthening cap:

```text
shortfallCap = +12 Boss Power
```

The point is to make economic performance matter without overwhelming the rest of the Final.

Because D30 Final now contains real SALE transactions, successful Final sales count as ordinary Gross Sales exactly once.
GREED's committed snapshot is taken at Final Lock after the Final SALE sequence completes.

## 14.4 GLUTTONY / 탐식

Player-facing identity:

```text
탐식
탐식의 마왕 글러트니
```

Current mechanic:

> all positive Core-Stat contribution originating from Items ×0.50 in Final

after Item-side positive Stat amplification.

Unaffected:

- natural/base/growth/equipment
- Hazard Counter
- Supply
- Insurance
- Utility
- Loot/economy
- harmful RiskReward penalty

No Rarity threshold remains.

Exact D15 copy:

```text
탐식의 권능
아이템의 투력·강인함·기동·정신 증가량 50% 감소
환경 대응·보급·보험 효과는 유지
```

This makes the Boss punish Item-stat dependency without deleting every preparation channel.

## 14.5 SLOTH

SLOTH turns Relic acquisition into a real sacrifice decision.

Opportunity schedule:

```text
exactly 2 from D15 / D20 / D25
+ D30 always
= 3 total opportunities
```

Each opportunity:

```text
Relic
OR
Seal Break
```

Current Boss Power by committed breaks:

```text
0 = 225
1 = 210
2 = 190
3 = 165
```

The intended question is:

> “더 강한 가게 Build를 가져갈까, Final 자체를 약하게 만들까?”

A Seal is not free power.
It gives up the Relic opportunity and its remaining-Run value.

---

# 15. P1 — SALE COUNTER HANDLING / ACTION LAYER

## 15.1 Rule

Do not add a separate shop minigame.

Transform the existing decision from:

```text
select item
→ select price
→ purchase/refusal
```

into the felt action:

```text
choose/focus Bag slot
→ choose Item
→ choose price
→ hand/commit transaction
→ purchase or refusal resolves
→ state updates
→ judge remaining slot
```

## 15.2 Why sequential matters

Do not merge two Bag slots into one cart checkout.

The first transaction may change:

- NPC Wallet
- committed Bag
- current Forecast
- current Hazard Readiness
- Supply/Fatigue arithmetic

Then the player judges the second slot with the new state.

That is part of the decision.

## 15.3 Mobile baseline

Tap is the complete control path.

Drag is optional only.

Requirements:

- both Bag slots always visible
- practical ~44px-class targets
- focused slot readable
- tap item to place/replace
- explicit remove/return action
- no destructive gesture required
- no third ghost slot

## 15.4 Price

Keep authoritative modes:

```text
50%
100%
150%
```

Wallet / affordability remains visible before commitment.

## 15.5 Pre-commit information boundary

Before commitment the player may see:

- exact Item effect
- selected price / affordability
- deterministic Supply/Fatigue arithmetic

But not:

- `접전 → 우세`
- `불안 → 충분`
- Great Success signal change
- exact success/death chance
- best/recommended Item

After actual purchase:

> it is no longer hypothetical.

Current qualitative Forecast / Readiness may update.

## 15.6 Refusal price monotonicity — approved

A same-customer, same-item refusal creates a price ceiling for the rest of that visit.

Rule:

```text
if a price mode is refused for the same SKU
→ every higher price mode for that same SKU is disabled for that customer visit
→ lower price modes may still be attempted
```

Exact examples:

```text
50% refused
→ 100% disabled
→ 150% disabled

100% refused
→ 150% disabled
→ 50% may still be attempted

150% refused
→ 100% / 50% may still be attempted
```

Why:

- a customer who refused the same product at a lower price must not later accept it at a higher price because of another RNG roll
- otherwise price negotiation becomes retry/fishing rather than a coherent judgment
- the player should be able to infer a consistent upper bound from an actual refusal

UI:

- blocked higher-price buttons become visibly disabled
- the reason must be readable, e.g. the customer already refused this item at a lower price
- the lock applies only to the same customer + same SKU + current visit
- it must not silently lock unrelated items
- a new customer visit starts from that visit's normal pricing state unless another owner explicitly defines persistent behavior

This is a coherence rule, not a new loyalty/purchase-intent subsystem.

## 15.7 Decision-only detail / truthful delta

SALE should not contain expandable sections that look decision-relevant but contain only flavor.

Remove from the SALE decision surface:

- `이 손님에게 안 걸리는 효과`
- `상품 설명` when it only exposes flavor text

Keep the exact effect that can actually matter to the transaction and expedition.

Also remove the generic habit of showing a large `보급 후 변화` list that makes unrelated Stats appear to move together.

After a real purchase commits:

- update the main current state in place
- if a delta is shown, it must be an actual changed value with a proven source
- an Item can directly change only the exact channels written on that Item
- Supply may indirectly change **기동/정신** only when canonical Fatigue penalty recovery actually changes those effective Stats
- such an indirect change must read as Fatigue/condition-derived, not as the Item secretly granting that Stat
- Supply/Fatigue must not make unrelated **투력/강인함** rise

Example:

`집중 사탕` in the current v2.7 catalog is `공포 +10 / Supply 3`.
It has no direct four-Core-Stat increase.
If selling it causes 투력 or 강인함 to rise, that is not a valid direct Item effect.

The intent is:

> **보여주는 변화는 적게, 하지만 보이는 변화는 전부 진짜여야 한다.**

## 15.8 Motion baseline

Short local motion is useful only if it clarifies state:

- item → Bag
- accepted → customer side
- refused → return

Avoid:

- long blocking animation
- physics simulation
- character hand rig
- new facial-animation requirement

The sale should feel tactile without becoming slower.

---

# 16. P1 — INFORMATION TRUST / QUEUE BOUNDARY

## 16.1 Always show ingredients, not the answer

SALE should keep:

- NPC identity
- Job / Level
- four Core Stats
- active Trait / Condition
- Wallet
- Expected Destination
- known Hazard
- qualitative Forecast
- qualitative Hazard Readiness
- Item exact Stat / Counter / Supply / penalty
- Bag state

## 16.2 Queue uncertainty remains

Do not newly reveal future customer:

- Job
- Level
- Destination
- Preparation Need
- importance score

The uncertainty of who comes next is part of inventory allocation judgment.

Existing queue-count information may remain.

---

# 17. P1 — ANTI-AI-SLOP VISUAL / UX PASS

## 17.0 MORNING next-day Gate forecast — required

The next-day forecast is player decision information and must be visible in MORNING before ORDER.

It must expose both:

1. **how many Gates may open tomorrow**
2. **how dangerous tomorrow's Gates are likely to be by Tier**

Required MORNING signal:

```text
내일 전망

게이트 수
1개 xx% · 2개 xx% · 3개 xx%

게이트 위험도
T1 xx% · T2 xx% · T3 xx%
```

When Gate count is deterministic for the next Day, show the fixed result rather than a fake distribution:

```text
게이트 수
2개 확정
```

Exact copy/layout may follow the current UI language, but the data contract is:

### Gate count forecast

- expose the exact next-day Gate-count probability distribution when count is randomized
- if next-day count is fixed by the current Day-band rule, expose the fixed count
- the forecast must use the same seeded/current run generation rules that will actually determine the next Day
- do not reveal which Family will occupy those Gates
- do not reveal the exact future Gate combination
- Save/Load must not be able to change the forecast independently from the actual next-day generation state

### Tier forecast

- expose the exact next-day T1 / T2 / T3 probability distribution
- this is the existing future-risk signal used for stock / quantity / reroll / cash-reserve judgment

### Information boundary

This is a secondary future signal, not the primary current-day preparation context.

Current-day open Gate / known Hazard remains the primary information for today's Order/Sale.

Do not reveal:

- next-day Family
- exact next-day Gate identities/composition
- next-day Hazard set
- future visitor identity
- future visitor destination
- expedition success/death probability
- recommended stock or quantity

Design intent:

> **내일 얼마나 많이, 얼마나 위험한지는 안다. 정확히 무엇이 필요한지는 모른다.**

This improves two distinct ORDER judgments:

- **Gate count forecast** → how much stock / cash reserve may be needed
- **Tier forecast** → how premium / defensive / risky tomorrow's preparation may need to be

The same forecast may also remain available compactly in ORDER so the player does not need to navigate back to remember it.

If Gate-count forecast or Tier forecast is absent from MORNING, that is an implementation mismatch against the v2.7 information contract.

## 17.1 Purpose

This is not a high-end graphics remake.

Target:

> **remove generic AI-generated / SaaS / template-game grammar while preserving the GUILD24 material language that already works.**

Strong existing identities to preserve:

- MORNING store / board / room
- ORDER paper / form
- SALE character-centered asymmetry
- NIGHT dark/slate
- CLOSING receipt / register
- wood / paper / metal / brass

## 17.2 Root diagnosis

The main problem is not:

- lack of gradients
- lack of shadows
- square corners
- insufficient decoration

The repeated generic grammar is:

> unrelated important actions all looking like the same big green "primary CTA."

This makes the product read like a web application.

## 17.3 Strong Green semantic

Strong GUILD24 Sign Green is reserved for:

```text
영업 시작
```

Do not reuse it as the default primary color for:

- 발주 확정
- Relic purchase
- SALE progress
- NIGHT next
- CLOSING next day
- Save / Export

This gives Green a meaningful world/action role again.

## 17.4 Phase material direction

| Action | Material direction |
|---|---|
| 영업 시작 | Strong Sign Green |
| 발주 확정 | Brass / Paper Transaction |
| 점포지원 구매 | Metal / Brass |
| SALE 진행 | Dark Wood |
| NIGHT 다음 | Slate / Dark Steel |
| CLOSING 다음 날 | Dark Register / Steel + restrained Brass |
| Utility | Steel |
| Destructive | Muted Red |

This is not permission to create a new component framework.
Reuse current primitives.

## 17.5 Menu

Menu should read as one surface with row navigation, not six independent dashboard cards.

Direction:

- single-column index
- subtle separators
- ~44px+ touch rows
- destructive action separated
- `현재 지점 포기` as the exact Run-abandon label
- restrained brass marker allowed
- no icon set added just for decoration

## 17.6 Settings

Settings should read as one coherent utility panel.

Keep native semantic controls.

Range sliders:

- retain native `input[type=range]`
- CSS reskin only
- no custom JS slider framework
- mobile hit area stays practical

## 17.7 ORDER

Two different meanings must look different:

### 발주 확정

Money/inventory transaction.

Stay in ORDER.

Use Brass / Paper transaction language.

### 영업 시작

Phase transition into actual customer operation.

Use Strong Sign Green.

This distinction is both functional and visual.

## 17.8 SALE / NIGHT / CLOSING

SALE progress:
- Dark Wood family

NIGHT next:
- Slate / Dark Steel

CLOSING next day:
- Dark Register / Steel + restrained Brass

The purpose is not style variety for its own sake.
It is:

> action meaning should survive color/material.

## 17.9 Typography

Approved v2.7 pair:

```text
ATMOSPHERE = Mulmaru / 물마루
INFORMATION = Wanted Sans
```

### Mulmaru

Use for:

- DAY / signage
- short atmospheric headings
- diegetic labels
- selective fixed-width role where appropriate

Do not use it for long body copy.

Avoid fake bold.
Use size/spacing/material hierarchy.

### Wanted Sans

Use for:

- body
- price
- Stats
- Item effects
- Wallet / Gold / counts
- utility
- buttons
- long Korean information

Vendor only needed weights.

## 17.10 Font adoption QA

Verify:

- mobile 360~390 class
- mobile 412
- desktop 1024
- desktop 1280+
- no wrap overflow
- Korean body readability
- price/%/stat digit readability
- 50/100/150 immediate distinction
- no runtime network font request
- no glyph loss
- license notice retained

## 17.11 Explicit visual non-goals

Do not:

- turn buttons into literal-object interactions everywhere
- make 문 열기 a shutter minigame
- make 다음 날 a receipt-tear mechanic
- icon every row
- round all cards
- add gradient/shadow everywhere
- add third font
- create theme framework
- hide important gameplay info to make screens cleaner
- sacrifice touch targets
- create desktop dashboard proliferation

---

# 18. P1 — TRUTH-CRITICAL COPY

## 18.1 Priority

Copy priority:

```text
Rule Truth
→ Terminology Truth
→ Interaction Flow Truth
→ Flavor Polish
```

v2.7 is not a broad dialogue rewrite.

## 18.2 Fix copy when it would otherwise imply

- old number/rule
- removed Item/category
- purchase preference runtime does not own
- false destination/cause
- Store Gold vs NPC Wallet confusion
- old SALE/ORDER flow
- unsupported Item/result causality

## 18.3 Current important exact copy

### Run abandon

```text
현재 지점 포기
```

### GLUTTONY

```text
탐식의 권능
아이템의 투력·강인함·기동·정신 증가량 50% 감소
환경 대응·보급·보험 효과는 유지
```

### Event 05

```text
포션 가격 폭등
포션 값이 또 올랐다.
오늘 포션 매입가 +35%
```

The old Mana/Special framing is retired.

## 18.4 Tutorial voice

Teach how to read the system.

Allowed:

- Hazard presses a Stat
- natural Stat + Item Counter both matter
- readiness summarizes current preparation
- Supply is paid first
- remaining Supply can reduce Fatigue

Forbidden:

> “독이면 방진마스크를 사세요.”

The tutorial explains the language.
It does not solve the decision.

---

# 19. SAVE v8 / META CONTINUITY

## 19.1 Run compatibility

v2.7 uses new Save generation:

```text
guild24.save.v8
run.version = 8
```

Legacy v1~v7 Run state does not continue into v2.7.

Reason includes:

- Item ID changes
- Bag capacity changes
- milestone behavior changes
- D25 persisted Final state
- recent-expedition snapshot data

Partial in-place Run continuation is not approved.

## 19.2 Account / Meta preservation

Important final decision:

> **valid v7 Account/Meta is preserved; legacy Run is not.**

When no valid v8 exists and valid current v7 data exists:

```text
validated v7 Account/Meta
→ carry into v8

v7 Run
→ discard as continuation target
→ start fresh v8 Run
```

Preserve validated existing Meta such as:

- Job × Boss clear matrix
- derived Job Mastery
- distinct Boss clear progression
- Franchise Grade / Start Contract availability
- Monster Knowledge
- approved unlock state

Do not copy:

- old Run inventory
- NPC Run state
- Bag state
- Final state

Do not silently delete legacy bytes.

Full Data Reset remains the explicit deletion action.

## 19.3 Meta power boundary

v2.7 does not add:

- fail-to-power currency
- generic permanent combat multiplier
- automatic permanent stat from failure

First clear must be possible at Mastery 0 through the Run itself.

If full-run evidence later shows balance problems:

> report Balance Finding first.

Do not invent Meta power to patch difficulty.

---

# 19-A. LATEST CONFIRMED SALE / MORNING INFORMATION AMENDMENTS

These are current approved v2.7 decisions and supersede older ambiguous planning wording.

## 19-A.1 Post-commit feedback boundary

Uncommitted Item selection must not preview derived answer changes such as:

- `접전 -> 우세`
- `불안 -> 충분`

After an actual purchase commits, the customer's **current** Forecast / Readiness / deterministic Supply-Fatigue state may update before the Player judges the remaining slot.

Purpose:

> prevent preview fishing before commitment, while still allowing the Player to learn from the consequence of an actual transaction.

## 19-A.2 Same-item refusal creates a price ceiling

For the same customer + same SKU + same visit:

```text
50% refused  -> 100% / 150% disabled
100% refused -> 150% disabled
150% refused -> lower prices may still be attempted
```

Higher-price options must be visibly disabled after a lower-price refusal.

Do not apply this lock to unrelated SKUs.

Purpose:

> prevent repeated RNG fishing where the same customer rejects a lower price and then buys the same item at a higher price.

## 19-A.3 MORNING must expose next-day Gate count + Tier forecast

Before ORDER, MORNING must show:

- next-day Gate-count forecast
- next-day Tier probability forecast

Keep hidden:

- Family
- exact Gate composition
- Hazards
- future customer/destination

Purpose:

> let the Player judge both **quantity pressure** and **difficulty pressure** without revealing the exact solution.

## 19-A.4 SALE detail cleanup / delta truth

Remove the SALE-only `이 손님에게 안 걸리는 효과` and flavor-only `상품 설명` disclosure.

Do not present unrelated recomputed Stats under a generic `보급 후 변화` block.
After commit, only actual current-state changes may be shown, and indirect Fatigue-derived Stat changes must be source-readable.

## 19-A.5 Item value / price rebalance

v2.7 raises flat native Core-Stat Item values so direct Stat purchases remain perceptible in mid/late Run play.
It does this by increasing existing flat Item values rather than adding a new scaling system.

At the same time, narrow Hazard specialist prices are compressed into comparable economic bands so a useful Counter Item can actually be sold to ordinary relevant NPCs.

Exact catalog values remain owned only by `ITEM_v2.7.0.md`.

## 19-A.6 D30 Final uses the core retail loop

Final Player flow is:

```text
출전 NPC 선택
→ FINAL 판매
→ 결과
```

Party selection is confirmed before Final SALE.
Selected participants are then prepared through the ordinary sequential two-slot sale interaction.
After all selected participants finish Final SALE, Final Lock occurs and the Boss result resolves once.

Purpose:

> make the climax readable through the same decisions the Player learned for the entire Run, rather than switching to an opaque combat interaction.

---

# 20. FULL-RUN VALIDATION — WHAT v2.7 MUST PROVE

v2.7 is successful because decisions change, not because features exist.

Required questions:

1. In the same broad situation, are at least two rational Bag combinations plausible?
2. Is rare/high-level NPC concentration still always the dominant answer?
3. Does Food/Drink meaningfully compete for one of only two slots?
4. Do late-game NPCs still have to give something up?
5. Does Fatigue create real long-term customer-management pressure?
6. Does the Fresh build alter store strategy without deleting Potion / Field Gear specialist value?
7. Does Last Bag actually change the next revisit judgment?
8. Does NIGHT explain proven consequences clearly?
9. Does D25 Final prereveal change D25~D29 Order/Warehouse/NPC decisions?
10. Does SALE feel like handling a customer rather than submitting a form?
11. Do direct Stat Items still create a visible, decision-relevant change on representative late-Run NPCs?
12. Are narrow Counter specialists actually affordable enough to enter real SALE decisions?
13. Does FINAL read clearly as `선택 → 판매 → 결과`, without introducing a separate combat minigame?
14. Are every displayed post-commit Stat delta and readiness change traceable to a real source?
15. Does UI provide arithmetic without turning preparation into answer-following?
16. Does the visual system read as GUILD24 rather than a generic application?
17. Does any player-facing copy imply a rule the engine does not implement?
18. Can a player finish a Run and describe what kind of store/build they operated?

If the implementation is technically complete but these answers remain weak, v2.7 is not finished.

---

# 21. IMPLEMENTATION ADOPTION ORDER — AFTER RECOVERY CLOSE

This is a dependency guide, not a replacement for Owner Specs.

After v2.6.1 Recovery closes:

1. Save v8 / compatibility boundary
2. Prepared Power common baseline
3. Bag always 2 + Level-up simplification
4. Item categories/catalog/counters/insurance
5. Trait modifier scope
6. Relic/Fresh composition and category migration
7. Fatigue/Supply exact pipeline
8. SALE sequential handling + information boundary
9. Last Expedition snapshot + NIGHT causality
10. D0~D30 timeline / D25 persistence
11. Final formula / Final SALE / Final no-op Insurance
12. Boss v2.7 modifiers / SLOTH
13. Event/copy migration
14. Anti-AI-Slop visual / typography pass
15. frozen QA / full-run validation

Important:

- this ordering exists to minimize rework
- WORK should still implement in small auditable units
- no unrelated Refactor
- QA findings become separate Fix Cycles
- do not tune values during frozen QA just to make tests green

---

# 22. OWNER ROUTING

Detailed truth belongs to current routed owners.

Key v2.7 owners:

- Run / Save / Final timeline → `CORE_RUN_v2.7.0.md`
- Meta / Account continuity → `META_v2.7.0.md`
- NPC / Trait / Level / recent snapshot → `NPC_TRAIT_v2.7.0.md`
- Power / Dungeon / Hazard / Supply / Fatigue → `DUNGEON_HAZARD_v2.7.0.md`
- Item / Category / Counter / Potion / Insurance → `ITEM_v2.7.0.md`
- Relic / Store Build / Fresh → `RELIC_v2.7.0.md`
- Sale / Bag / sequential transaction → `SALE_v2.7.0.md`
- Night / causality / resolved report → `NIGHT_CLOSING_v2.7.0.md`
- UI / mobile / typography / visual material → `UI_UX_v2.7.0.md`
- Copy / terminology / truth-critical wording → `COPY_WORLD_VOICE_v2.7.0.md`
- Event → `EVENT_v2.7.0.md`
- Boss / Sloth → `BOSS_v2.7.0.md`
- Final → `FINAL_EXPEDITION_v2.7.0.md`
- Economy / Order / next-day forecast → `ECONOMY_ORDER_v2.7.0.md`
- Game core identity → `00_GAME_CORE_v2.5.0.md`

Always start from:

`SPEC_INDEX_v2.7.0.md`

rather than trusting filenames found in older documents.

---

# 23. WHAT MOVED OUT OF THIS DOCUMENT

The old `v2.7+` Vision mixed:

- current v2.7 release direction
- unresolved candidates
- v2.8+ possible additions

in one file.

That is no longer desirable.

Deferred ideas now belong in:

`GUILD24_v2.8_PLUS_DEFERRED_DETAILED.md`

Examples moved there:

- Expedition Purpose
- Store growth visual overlays
- Product Run History
- Product Mastery / XP
- additional NPC expression/dialogue asset expansion
- advanced Drag/physics
- new minigames
- large desktop redesign
- extra font/icon/theme systems
- large new Item wave
- large Final-exclusive spectacle
- broad Copy/Flavor expansion
- new Meta Power systems
- new Condition sub-systems

They are not v2.7 requirements.

---

# 24. FINAL DIRECTOR INTENT

v2.7 is complete when the game no longer needs “more stuff” to feel deeper.

The Run should create difficulty through constrained, legible choices:

- only two items fit
- generic Power matters but is not every answer
- Hazard specialists matter
- Food/Drink can be worth sacrificing immediate performance for
- Insurance protects future value through a different channel
- Store Build changes what kind of convenience store this Run becomes
- what was sold matters later
- the player knows what Day 30 is building toward
- the sale action feels physical enough to be a shop game
- the UI looks like GUILD24 instead of a generated application skin
- the text only teaches mechanics that are actually true

The central loop remains:

```text
관찰
→ 추론
→ 선택
→ 결과 확인
→ 기억
→ 다음 판단
```

v2.7 does not broaden the game for breadth's sake.

It makes the existing game:

> **sharper, more constrained, more memorable, more tactile, and more legitimate as a finished indie game.**
