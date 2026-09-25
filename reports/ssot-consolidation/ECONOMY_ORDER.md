# ECONOMY_ORDER consolidation ledger

BASELINE=09d819d
TARGET=design_ssot/ECONOMY_ORDER_v2.8.0.md
CHAIN=design_ssot/ECONOMY_ORDER_v2.8.0.md,design_ssot/history/ECONOMY_ORDER_v2.7.0.md,design_ssot/history/ECONOMY_ORDER_v2.6.1.md,design_ssot/history/ECONOMY_ORDER_v2.6.0.md

Current-spec consolidation. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/ECONOMY_ORDER_v2.8.0-patch.md`; v2.7.0 / v2.6.1 / v2.6.0 stay in `history/`.
`ECONOMY_ORDER_QA_v2.8.0.md` is a separate owner and is not merged. The chain carries no Grade ORDER
discount text (retired per META_v2.8.0), so nothing is dropped for it.

Layout: v2.6.0 section order is the skeleton. ROLE, KEY, PRICE MODES, GOLD ROUNDING, ZERO-PRICE,
ITEM ECONOMY, GOLDEN 1+1, GROSS SALES, MARGIN; NPC WALLET (v2.6.0 targets + the Wallet-inflation
constraint and purpose of the 2026-09-12 amendment + v2.8 exact visit Wallet + v2.6.1 Wallet rules /
`rich` / Event budget); PURCHASE / REFUSAL LOGIC; ORDINARY SALE PURCHASE ACCEPTANCE (v2.8, with the
v2.6.0 정가 threshold explanation after the mode table); ORDER ARRIVAL; ORDER FLOW (v2.6.1); ORDER
OFFERS; ORDER RARITY PROGRESSION (v2.7 table + v2.8 Rare+ / Known-Hazard pity); ORDER QUANTITY; ORDER
DECISION INFORMATION (v2.6.1); REROLL (v2.6.0 + v2.6.1 cart rules); NEXT-DAY FORECAST (v2.7 Gate count
/ Tier, v2.6.0 Tier forecast lines, FORECAST TIMING, INFORMATION BOUNDARY); MORNING / ORDER
PRESENTATION; VISITOR FORECAST; BASE OPERATING COST (v2.8); RELIC GOLD SINK; GREAT SUCCESS STORE
GOLD (v2.8 values + v2.6.0 Deep exception); DEEP EXPEDITION SPONSORSHIP COST (v2.8 formula + v2.6.0
rules); D30 FINAL PREPARATION (v2.7); balance measurement (ECONOMY REBASELINE, D29 KPI, ECONOMY
METRICS, STRATEGY CHECK); RELATED (v2.6.0 + v2.7 lists merged, v2.8 filenames). Header keys
`BASE_DOCUMENT=` / `PATCH_TYPE=` are replaced by `CONSOLIDATED_FROM=` / `CONSOLIDATION_LEDGER=`.

## LEGACY — inheritance pointers / patch scaffolding (the chain is now inline)

```text
## INHERITANCE
All unchanged v2.7 Economy / Order / Wallet / pricing / Final-preparation rules inherit
`ECONOMY_ORDER_v2.7.0.md` and its base chain.
All unchanged Wallet, ordinary Price Mode, Order confirm/start-sale separation, Reroll, Gold, offer, quantity, warehouse, same-day arrival, operating-cost, and other economy/order rules inherit `ECONOMY_ORDER_v2.6.1.md`.
This patch changes:
- next-day preparation forecast contract
- Day-band Item Rarity progression for ORDER offers
- D30 Final preparation price/Wallet/Gold handling
All unchanged economy/order behavior inherits `ECONOMY_ORDER_v2.6.0.md`.
This patch resolves the D1 Wallet baseline numeric and exact ORDER adoption requirements.
```

## LEGACY — version headings / change narration (sections merged into their topic)

`The former one-Bag-slot-filled -0.10 purchase modifier is retired.` and the stale `operating=60`
line are kept in the target as current exclusions.

```text
## v2.6.0 UPDATE: WALLET & ORDER REROLL
### WALLET
### ORDER REROLL
## APPROVED_AMENDMENT_2026_09_12 — WALLET / GREAT SUCCESS GOLD / D30 CASH TARGET
### NPC WALLET GLOBAL BASELINE
### PURCHASE INTENT BOUNDARY
### NORMAL GREAT SUCCESS STORE GOLD
### DEEP EXPEDITION SPONSORSHIP COST
### D29 CLOSING -> D30 PREP START GOLD KPI
## NPC WALLET — DIRECTOR RESOLUTION
## ORDER FLOW — EXACT
## BALANCE BOUNDARY
## NEXT-DAY FORECAST — EXACT v2.7
## ORDER RARITY PROGRESSION — EXACT v2.7
The inherited fixed all-Run Rarity weight table is superseded.
## D30 FINAL PREPARATION PRICE / WALLET / GOLD OVERRIDE — EXACT
### FINAL ACCOUNTING — EXACT
## GREAT SUCCESS STORE GOLD — DIRECTOR DOCUMENT BASELINE
## DEEP SPONSORSHIP — EXACT RETAINED BASELINE
Base = 200G.
Rarity step, Level step and rounding remain as specified above.
No compensating Deep reward/difficulty rebalance is introduced.
## FULL-CHAIN NUMERIC CLOSURE — SALE ACCEPTANCE / OPERATING COST / ORDER PITY
USER_APPROVAL_DATE=2026-09-20
These rules are the required v2.8 economy baseline.
### Ordinary SALE purchase acceptance — exact hidden calculation
### Base operating cost — exact
- failed-expedition Loot is unchanged by this amendment
## TIER FORECAST
## FORECAST TIMING
## ORDER / ECONOMY INFORMATION
## PASS3 METRICS
```

## LEGACY — Wallet re-measure amendment (tuning history; result is the exact visit Wallet formula)

The 2026-09-22 outcome (Fresh base 180, Level ×8, random 0..80, carry, 2000 cap, acceptance and Deep
sponsorship unchanged) is carried by the kept `Ordinary NPC Wallet on visit — exact` formula and rules
and the kept acceptance / sponsorship sections.

```text
### Ordinary NPC Wallet re-measure amendment — 2026-09-22
After the four-arm SA-Q48 / SA-Q49 / SA-Q50 re-measure:
- accessible-mode acceptance remains unchanged
- Deep sponsorship remains unchanged
- Fresh Wallet base remains 180
- visit-income random range is reduced from 0..100 to 0..80
- returning NPC persistent Wallet carry remains unchanged
preserve the intended recovery from the failure -> low Wallet -> under-supplied loop while reducing
the excessive purchasing-capacity / Store-Gold expansion isolated to the SA-Q49 Wallet step.
This is the only balance amendment promoted from that re-measure.
```

## LEGACY — restatements of rules kept verbatim elsewhere in the target

Wallet cap / carry / Level / random / Trait-Event interactions: kept v2.8 visit Wallet rules and v2.6.1
`every permanent increase path clamps ... 2000G`; `rich`: kept v2.6.1 `rich` block; Event budget: kept
v2.6.0 bullet (it also says 이월 안됨); Day-based inflation: kept v2.6.0 `Do not add a new Day-based
Wallet inflation system...`. Charged / judged multipliers and the 정가-only burden term: kept v2.8 mode
table and `burdenIntentBonus` lines. Order flow: kept v2.6.1 ORDER FLOW. Reroll reset / pity: kept
`next day: cost/resetCount=RESET`, KEY `rerollDailyReset=YES`, `- does not advance pity`. Hidden forecast
items: kept v2.7 INFORMATION BOUNDARY `Keep hidden:` list. Order information: kept v2.6.1 ORDER DECISION
INFORMATION list. Great Success Store Gold: kept v2.8 rules and v2.6.0 Deep exception list. Hidden
purchase probability: kept `Exact acceptance probability remains hidden from the Player.`
`tier generation -> DUNGEON_HAZARD`: kept `Gate-count / Tier generation -> ...`.

```text
- **Persistent Wallet Cap**: 2,000G (상시 유지)
- **금수저 (rich)**: arrive() 내 실제 방문 시 1회 한정하여 +50G 적용 (morning() 공식 미포함).
Event temporary purchase budget remains separate from Persistent Wallet and outside the 2000 cap.
- existing Level contribution remains
- existing random variation remains
- revisit carry remains 100%
- no Day-based Wallet inflation subsystem
Preserve the existing Wallet model's:
- NPC-to-NPC variation
- existing Level contribution
- existing Wallet carry
- existing Trait / Event / Relic interactions
What the customer is CHARGED is unchanged: 할인 x0.50, 정가 x1.00, 바가지 x1.50.
What the customer JUDGES the offer at is a separate threshold:
할인 0.50 / 정가 **0.65** / 바가지 1.50.
The judged price reaches the decision through the offer's weight against the customer's purse,
for 정가 only: `intentPivot=0.36` `intentWeight=0.50` (v2.5 final), centred on the measured
median 정가 burden so the term redistributes rather than taxes.
할인 and 바가지 carry no such term and are decided exactly as they were.
The exact purchase probability remains hidden from the Player.
- **Flow 분리**: 선택 발주 확정(Inventory 반영, Phase 유지) → 필요 시 Reroll (미확정 cart 초기화, 전체 Offer 교환, 비용 1회 차감, 확정된 인벤토리 유지) → 영업 시작 시 전환.
Base current curve:
Daily reset = YES.
Reroll does not advance pity.
Hidden:
- actual next-day Family
- actual Gate result
- visitor identities
- NPC destination
- expedition success probability
- death probability
Order screen must make decision inputs directly readable:
- inventory impact
- current-day Gate / known Hazard reference
- next-day Tier forecast (secondary future signal)
- reroll cost/state
Normal expedition:
- ordinary Success -> no extra Store Gold
- Great Success -> additional Store Gold bonus
Same-day sale to that NPC is not required.
The bonus is a flat amount for the Day band it happened in:
- Deep Expedition Store Gold remains 0
tier generation -> DUNGEON_HAZARD
```

## SUPERSEDED — first-visit Wallet 100G / 150G, random 0..60 (now 180 + Level×8 + 0..80)

```text
- 첫 방문 지급: 100 + Lv×8 + rng(0,60). (100G 기본 지급은 최초 방문에만)
- 재방문: 이전 Persistent 100% + Lv×8 + rng(0,60).
Raise the NPC Wallet **global baseline from D1**.
Exact baseline increase=PASS3.
The approved "higher global baseline from D1" is fixed for v2.6.1 as the smallest direct change to the existing model.
First Visit:
150G + Level×8 + random(0,60)
Revisit:
previous Persistent Wallet 100%
+ Level×8
+ random(0,60)
- only the first-visit fixed base changes: **100G -> 150G**
The 150G Wallet base is the only Wallet baseline production numeric authorized by this Director recovery decision.
```

## SUPERSEDED — Great Success Store Gold 100 / 200 / 300G (now +50 / +100 / +200G)

```text
D1-10 100G / D11-20 200G / D21-30 300G (v2.5 final), so the reward is legible before it is earned.
```

## SUPERSEDED — Deep sponsorship sponsorBase 350 (now 200G formula)

The symbolic formula is replaced by the explicit v2.8 formula (Rarity step 0.20, Level step 0.05,
nearest 10G), which carries the same steps and rounding.

```text
`sponsorship = sponsorBase x (1 + sponsorRarityStep x rarity) x (1 + sponsorLevelStep x (Level - 1))`
rounded to `sponsorRounding`.
`sponsorBase=350` `sponsorRarityStep=0.20` `sponsorLevelStep=0.05` `sponsorRounding=10` (v2.5 final).
```

## SUPERSEDED — PASS3 placeholders now fixed by later exact rules

Rarity weights -> v2.7 Day-band table; pity -> v2.8 Rare+ / Known-Hazard pity; Reroll cost -> fixed
curve; overhead -> v2.8 BASE OPERATING COST.

```text
Exact rarity weights/pity values=PASS3. Initial v2.5 implementation retains the current canonical-compatible Source baseline, then rebalances after full-run simulation/playtest.
Exact cost/scaling=PASS3
Exact overhead rebalance remains PASS3 after integrated v2.5 simulation.
```

## SUPERSEDED — Tier-only next-day forecast (v2.7 adds the next-day Gate-count forecast, MORNING required)

Replaced by NEXT-DAY FORECAST (Gate count + Tier, `MORNING exposure is required`, design intent
`내일 얼마나 많이, 얼마나 위험한지는 안다. / 정확히 무엇이 필요한지는 모른다.`).

```text
- only T1/T2/T3 probability distribution is exposed as a secondary future signal
`오늘은 알고 준비하고, 내일은 위험도만 살짝 읽는다.`
Design rule:
`난이도의 확률은 알지만, 정확히 무엇이 필요한지는 모른다.`
Morning/Order can surface it.
```

## REWORD — version framing removed

```text
Curve (v2.5 final):
v2.6.1 retained exact economy:
For 바가지, preserve the existing pre-amendment need calculation:
- new v2.7 Epic preparation Items use the ordinary Epic pool; they do **not** receive a separate D20 hard unlock
- pity/guarantee systems, where inherited and still valid, must operate on top of this current Day-band truth rather than restoring the old fixed table
Retain the existing exact T1/T2/T3 probability forecast:
Ordinary SALE keeps inherited 50% / 100% / 150% price modes and ordinary purchase/refusal behavior.
The approved playtest-response formula is:
Further Wallet tuning after Recovery is a separate balance finding and must not be auto-applied during QA.
PASS3 must jointly balance:
Great Success probability and NPC growth reward are not reduced by this economic adjustment.
```

```new
Curve:
Exact economy:
For 바가지:
- new Epic preparation Items use the ordinary Epic pool; they do **not** receive a separate D20 hard unlock
- pity/guarantee systems must operate on top of this current Day-band truth rather than restoring the old fixed table
Ordinary SALE keeps the 50% / 100% / 150% price modes and ordinary purchase/refusal behavior.
The sponsorship formula is:
Further Wallet tuning is a separate balance finding and must not be auto-applied during QA.
Economy rebalancing must jointly balance:
Great Success probability and NPC growth reward are not reduced by this Store-Gold rule.
```

## REWORD — owner pointers name current v2.8 files

The unnamed "inherited growth rules" are NPC growth, owned by `NPC_TRAIT_v2.8.0.md` (OWNER includes
growth). Refusal copy: refusal UX stays with SALE, exact player-facing copy is routed to
`COPY_AUDIT_APPROVED_v2.8.0.md`. The two ITEM and two SALE RELATED lines are merged.

```text
Canonical item role -> ITEM
Boss consumer -> BOSS
Canonical presentation -> NIGHT_CLOSING
-> NPC_TRAIT
Player-facing copy -> SALE
Canonical Gate generation/reveal -> DUNGEON_HAZARD
Canonical phase flow -> CORE_RUN
Inventory capacity canonical -> CORE_RUN / relevant Store rule.
Detailed visual layout -> UI_UX
Canonical Relic rule -> RELIC
Canonical Tier generation -> DUNGEON_HAZARD
Exact visual layout is owned by `UI_UX_v2.7.0.md`.
Canonical NPC reveal -> SALE / NPC_TRAIT
Canonical Relic pricing/window -> RELIC
Those remain owned by DUNGEON_HAZARD_v2.8.0.md and the inherited growth rules.
D30 Final preparation is an explicit exception owned jointly with `FINAL_EXPEDITION_v2.7.0.md`.
Gate-count / Tier generation -> `DUNGEON_HAZARD_v2.7.0.md`
Morning / Order presentation -> `UI_UX_v2.7.0.md`
Item catalog / Rarity identities -> `ITEM_v2.7.0.md`
item roles -> ITEM
Ordinary Sale -> `SALE_v2.7.0.md`
sale/refusal UX -> SALE
Final preparation -> `FINAL_EXPEDITION_v2.7.0.md`
Boss/GREED accounting -> `BOSS_v2.7.0.md`
Economy/Order QA -> `ECONOMY_ORDER_QA_v2.7.0.md`
npc wallet/loyalty -> NPC_TRAIT
relic costs/build -> RELIC
closing settlement -> NIGHT_CLOSING
run starting resources/inventory -> CORE_RUN
```

```new
Canonical item role -> `ITEM_v2.8.0.md`
Boss consumer -> `BOSS_v2.8.0.md`
Canonical presentation -> `NIGHT_CLOSING_v2.8.0.md`
-> `NPC_TRAIT_v2.8.0.md`
Player-facing refusal UX -> `SALE_v2.8.0.md`; exact player-facing copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`
Canonical Gate generation/reveal -> `DUNGEON_HAZARD_v2.8.0.md`
Canonical phase flow -> `CORE_RUN_v2.8.0.md`
Inventory capacity canonical -> `CORE_RUN_v2.8.0.md` / relevant Store rule.
Detailed visual layout -> `UI_UX_v2.8.0.md`
Canonical Relic rule -> `RELIC_v2.8.0.md`
Exact visual layout is owned by `UI_UX_v2.8.0.md`.
Canonical NPC reveal -> `SALE_v2.8.0.md` / `NPC_TRAIT_v2.8.0.md`
Canonical Relic pricing/window -> `RELIC_v2.8.0.md`
Those remain owned by DUNGEON_HAZARD_v2.8.0.md and NPC_TRAIT_v2.8.0.md.
D30 Final preparation is an explicit exception owned jointly with `FINAL_EXPEDITION_v2.8.0.md`.
Gate-count / Tier generation -> `DUNGEON_HAZARD_v2.8.0.md`
Morning / Order presentation -> `UI_UX_v2.8.0.md`
Item catalog / Rarity identities / item roles -> `ITEM_v2.8.0.md`
Ordinary Sale / sale/refusal UX -> `SALE_v2.8.0.md`
Final preparation -> `FINAL_EXPEDITION_v2.8.0.md`
Boss/GREED accounting -> `BOSS_v2.8.0.md`
Economy/Order QA -> `ECONOMY_ORDER_QA_v2.8.0.md`
npc wallet/loyalty -> `NPC_TRAIT_v2.8.0.md`
relic costs/build -> `RELIC_v2.8.0.md`
closing settlement -> `NIGHT_CLOSING_v2.8.0.md`
run starting resources/inventory -> `CORE_RUN_v2.8.0.md`
```

## NEW — merged section headings (level / version tag normalized)

```new
## ORDINARY SALE PURCHASE ACCEPTANCE
## ORDER FLOW
## ORDER RARITY PROGRESSION
## BASE OPERATING COST
## GREAT SUCCESS STORE GOLD
## DEEP EXPEDITION SPONSORSHIP COST
## D30 FINAL PREPARATION PRICE / WALLET / GOLD
### FINAL ACCOUNTING
## D29 CLOSING -> D30 PREP START GOLD KPI
## ECONOMY METRICS
```

## UNRESOLVED — kept verbatim, reported to User

- `Stage 9 reports at minimum:` (D29 KPI) — "Stage 9" is defined in no current owner.

Note (not a conflict): the kept v2.6.1 `rich` block matches `NPC_TRAIT_v2.8.0.md` RICH (+50G once per
actual visit, first and revisit, arrival path, cap 2000); the rule is stated in both owners.

## REVIEW NOTES (independent review: 0 MUST-FIX)

- All 45 "restated elsewhere" drops verified line by line; only non-binding rationale was lost.
- "Stage 9 reports at minimum:" is a live requirement under an old stage label (also used in
  EVENT); kept verbatim. UNRESOLVED (label only), reported to the User.
- Retired -0.10 bag modifier / stale `operating=60` lines are current negative rules (Source still
  holds both values); kept.

## AMENDMENT — User decisions 2026-09-23 (decision list A / B / C)

C: old stage label renamed.

```text
Stage 9 reports at minimum:
```

```new
Full-run balance measurement reports at minimum:
```

## AMENDMENT — User decision 2026-09-23: Store Support rebalance

The 길드24 원정전문점 인증 ORDER Counter guarantee no longer exists (remade into 원정 전문 인증); the base-pity line no longer points at it.

```text
This base pity is separate from the stronger `길드24 원정전문점 인증` guarantee owned by RELIC.
```

```new
No Store Support adds a further Counter-offer guarantee (RELIC).
```


## AMENDMENT — v2.9.0 Supply→Fatigue / Fatigue bands / Hazard pressure (User decision 2026-09-24)

Supply is no longer a Player-facing expedition effect; the Deep sponsorship line names Fatigue recovery instead.

```text
The sponsorship itself grants no Stat, Supply, Counter, Insurance or other expedition effect.
```

```new
The sponsorship itself grants no Stat, Fatigue recovery, Counter, Insurance or other expedition effect (User 2026-09-24, v2.9.0).
```

## AMENDMENT — v2.9.0 onboarding / ORDER (User decision 2026-09-24)

ORDER decision information gains the per-Gate visitor count (only with two or more open Gates, by claimed destination) and the today-fit emphasis pointer; the next-day boundary and the pre-SALE reveal list are narrowed to individual identity / individual destination, the count per open Gate being public at MORNING and ORDER.

```text
- future visitor identities
- future NPC destination
- destination
```

```new
- visitor count per open Gate, only when two or more Gates are open (counted by the destination each customer claims; a liar's or a pilgrimage-rerouted customer's true Gate stays hidden) (User 2026-09-24, v2.9.0)
Today-fit emphasis (User 2026-09-24, v2.9.0): in offer rows the effect text that answers today's open Gates (a Counter for one of today's Hazards, or the Core Stat one of them presses) is set in the emphasis style; no badge, no verdict word, no reorder, no recommended row -> `UI_UX_v2.8.0.md` §ORDER — ITEM INFORMATION HIERARCHY.
- individual future visitor identities
- individual future NPC destination (the visitor count per open Gate of the current day is public at MORNING and ORDER; User 2026-09-24, v2.9.0)
With two or more open Gates, also the count per open Gate, by the destination each customer claims (User 2026-09-24, v2.9.0).
- individual destination (the count per Gate is public; a liar's or a pilgrimage-rerouted customer's true Gate stays hidden) (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 Gate Hazard requirement number (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0 revision): the ORDER information list names the Gate-level requirement number.

```text

```

```new
- each open Gate's Hazard requirement number `대응 {N} 필요` and the Core-Stat conversion `{능력치} {n}당 대응 1 제공` (Gate detail; User 2026-09-24 revision, v2.9.0)
```

## AMENDMENT — v2.9.0 play feedback F2 (User decision 2026-09-24)

The next-day Gate / Tier forecast surface is retired (MORNING and ORDER; the generator rules stay internal), ORDER rows carry the
rarity name under the Item name, a Gold- or space-blocked quantity control answers a tap with the COPY_AUDIT §3-9 reason toast, and
Trait flavor notes are removed (거짓말쟁이 keeps its function line as an effect row). Superseded revision declarations were removed in place.

```text
Before ORDER commitment, MORNING must expose both:
1. next-day Gate-count forecast
2. next-day Tier forecast
The same information may remain available compactly in ORDER so the Player does not need to navigate back to remember it.
내일 얼마나 많이, 얼마나 위험한지는 안다.
정확히 무엇이 필요한지는 모른다.
### NEXT-DAY GATE COUNT FORECAST
If the next Day's Gate count is randomized by the current canonical Day/Gate generation rule, expose the exact probability distribution for each possible Gate count.
Example presentation:
게이트 수
2개 65% · 3개 35%
If the next Day's Gate count is deterministic, expose the fixed count instead of a fake probability distribution.
Example:
게이트 수
2개 확정
- forecast probabilities must come from the same current seeded/run generation rules that will actually determine the next Day
- Save/Load must not create an independently rerollable forecast
- forecast may inform stock quantity, cash reserve, reroll willingness, and inventory planning
- do not reveal next-day Family
- do not reveal exact next-day Gate identities/composition
- do not reveal next-day Hazard set
### NEXT-DAY TIER FORECAST
게이트 위험도
T1 xx% · T2 xx% · T3 xx%
- use the same canonical next-day Tier generation distribution that will govern the next Day
- this remains a future-risk signal, not an expedition success probability
- do not reveal exact next-day Gate result
### INFORMATION BOUNDARY
Current-day open Gate / known Hazard remains the primary preparation context for today's ORDER.
Next-day Gate Count + Tier Forecast is secondary future information.
Keep hidden:
The forecast informs planning without revealing the future solution.
MORNING exposure is required.
Recommended compact structure:
내일 전망
게이트 수
1개 xx% · 2개 xx% · 3개 xx%
게이트 위험도
T1 xx% · T2 xx% · T3 xx%
Fixed impossible counts may be omitted from presentation.
ORDER may repeat the forecast compactly as decision context.
- next-day Tier forecast
- next-day Family / actual Gate result remain hidden
The next-day forecast supplements today's preparation decision;
it does not replace the current-day Gate/Hazard context.
Before Order decision, show exact next-day Tier probability distribution.
Example:
T1 35%
T2 55%
T3 10%
Public:
- T1%
- T2%
- T3%
Forecast is World/Market information,
not expedition probability.
Tier Forecast must be visible before the player commits Order spending.
It should inform:
- cheap/general stock vs premium preparation
- insurance stocking
- reroll willingness
- cash reserve
without revealing exact future solution.
```

```new
- nothing about the next Day is shown; Family / actual Gate result remain hidden (User 2026-09-24, v2.9.0: the next-day forecast surface is retired)
- each offer's rarity name under the Item name (User 2026-09-24, v2.9.0)
- the reason when a quantity cannot be ordered — store Gold, warehouse space, or supply used up — as the COPY_AUDIT §3-9 toast on tap (User 2026-09-24, v2.9.0)
## NEXT-DAY FORECAST — RETIRED
(User 2026-09-24, v2.9.0) No next-day Gate-count or Tier forecast is shown at MORNING or ORDER. The seeded generation rules (`DUNGEON_HAZARD_v2.8.0.md`) are unchanged and remain internal; no forecast is drawn at all, so Save/Load cannot create a forecast-only RNG path.
Keep hidden (unchanged):
MORNING shows today's Gates and Hazards; ORDER repeats today's Gate / Hazard context, the per-Gate visitor count and the offer rows. No next-day block (User 2026-09-24, v2.9.0).
```
