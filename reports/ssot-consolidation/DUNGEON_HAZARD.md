# DUNGEON_HAZARD consolidation ledger

BASELINE=09d819d
TARGET=design_ssot/DUNGEON_HAZARD_v2.8.0.md
CHAIN=design_ssot/DUNGEON_HAZARD_v2.8.0.md,design_ssot/history/DUNGEON_HAZARD_v2.7.0.md,design_ssot/history/DUNGEON_HAZARD_v2.6.0.md

Current-spec consolidation. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/DUNGEON_HAZARD_v2.8.0-patch.md`; the v2.7 and v2.6 versions stay in `history/`.
`DUNGEON_ITEM_QA_v2.8.0.md` is a separate owner and is not merged here. This owner carries no QA list of its own.

Layout: v2.6 section order is the skeleton (KEY, FAMILY, HAZARD PRESSURE, GLOBAL PRESSURES). The v2.7 Fatigue /
Excess-Supply / Preparation-sequence / Information-boundary sections follow GLOBAL PRESSURES, with the v2.8 Fatigue
display rule merged into the one INFORMATION BOUNDARY. Then PREPARED POWER, GATE POWER, HAZARD THREAT (v2.7), the v2.6
TIER CONTRACT (v2.7 neutral-fit intent as a subsection) through CURRENT-DAY GATE INFORMATION, one NEXT-DAY GATE FORECAST
(v2.7 Gate-count + v2.6/v2.7 Tier disclosure), EXPEDITION FORECAST, COMBAT VARIANCE (v2.6 hidden-luck rule as a
subsection), the v2.8 exact numeric block (Gate count / Tier anchors / labels / readiness / Supply deficit / ordinary
resolve / rewards), v2.7 DEATH RISK and injured Severe escalation, one GREAT SUCCESS / DEEP EXPEDITION section (v2.6
contract + v2.8 exact values inline), v2.8 RESULT-PROOF sections, BALANCE TARGET, one RELATED list.
Header keys `BASE_DOCUMENT=` / `PATCH_TYPE=` are replaced by `CONSOLIDATED_FROM=` / `CONSOLIDATION_LEDGER=`; OWNER is the
union of the three versions' OWNER keys.

## LEGACY — inheritance pointers / patch narration (the chain is now inline)

```text
## INHERITANCE
All unchanged v2.7 Gate Power, Hazard threat, Prepared Power, death-risk, Supply, Fatigue and
actual expedition resolution rules inherit DUNGEON_HAZARD_v2.7.0.md.
This patch closes the previously measurement-gated Great Success and Deep exact numeric baselines.
## INHERITANCE
Family identities, Hazard-to-Stat mappings, readiness labels, Day/Tier generation, combat variance, Deep Expedition structure, and unchanged Supply-Burden eligibility inherit `DUNGEON_HAZARD_v2.6.0.md`.
This patch overrides v2.6 prepared-Power weights, Hazard threat scale, Fatigue values/penalties, excess-Supply processing, ordinary expedition Death risk, stale third-slot wording, and the next-day Gate forecast disclosure contract.
The v2.6 prepare sequence is updated only where needed:
The inherited Day/Gate progression and controlled-random generation remain authoritative.
This patch changes what the Player is told before ORDER.
Keep the exact v2.7 Supply/Fatigue arithmetic.
## v2.6.0 UPDATE: FATIGUE & PREPARE SEQUENCE
```

## LEGACY — version headings / provenance tags (sections merged into their topic)

Replacement headings are declared in the `new` fence at the end.

```text
## PREPARED POWER — v2.7 BASELINE
`DIRECTOR DOCUMENT BASELINE`
## GATE POWER — LATE-DAY SLOPE — v2.7 BASELINE
## HAZARD THREAT — v2.7 BASELINE
## TIER PREPARATION INTENT — v2.7
## ORDINARY EXPEDITION FAILURE DEATH RISK — v2.7 BASELINE
## EXCESS SUPPLY -> FATIGUE — EXACT v2.7 ORDER
## PREPARATION SEQUENCE OVERRIDE
## NEXT-DAY GATE FORECAST — v2.7 DISCLOSURE
## FATIGUE INFORMATION BOUNDARY — SUPERSEDES v2.7 DISPLAY CLAUSE
## GREAT SUCCESS — DIRECTOR DOCUMENT BASELINE
## DEEP EXPEDITION — DIRECTOR DOCUMENT BASELINE
## NEXT-DAY TIER FORECAST
## APPROVED_AMENDMENT_2026_09_12 — GREAT SUCCESS / DEEP EXPEDITION
status=APPROVED_V2.4_STARTING_VALUE
```

## LEGACY — tuning / playtest history and change narration

The binding parts stay: `fireCombat=0.90` (reworded), the Day-term formula, the Supply values, the ±17.5% noise and its recheck rule. FIRE-still-hardest is a v2.5 shipping note, not a rule (BALANCE TARGET still rejects an always-hardest Family).

```text
FIRE measured as the hardest Family for every Job, which the BALANCE TARGET clause below
rejects; the requirement is eased while the Hazard identity and Stat mapping stay untouched.
FIRE is still the hardest Family after it, and ships that way for v2.5.
These are approved retained starting values for v2.5 implementation.
Full-run simulation/playtest may tune frequency/requirement/scaling without changing the one-system contract.
Full-run simulation/playtest must rebaseline outcome spread after v2.5 adoption.
D1 through D9 are therefore bit-for-bit what they were. The change applies from D10 onward.
Reason this exists: measured preparedPower / requiredGatePower fell from a D1-9 median of 0.86
to 0.50 by D25-29, so a party grew steadily weaker against the Gate it was sent to across one
Run. At slope 0.40 the D20+ median returns to 0.87, matching the early band.
```

## SUPERSEDED — v2.6 PREPARE SEQUENCE (A~F) and v2.6 Fatigue penalty

Replaced by PREPARATION SEQUENCE (v2.7 A-G, preRecovery / fatigueBeforeExpedition / remainingSupplyBuffer), EXCESS SUPPLY -> FATIGUE and FATIGUE STAT PENALTY (-15% / -40%). NPC-side Trait / Injury % values are owned by the NPC_TRAIT chain (`NPC_TRAIT_v2.8.0.md` and its history: combat -15% / grit +20%, survival -20%), per the v2.7 step D and the INJURED RE-EXPEDITION pointer. The v2.6 `아침 자연 회복(-2/일) 삭제` line is kept (GLOBAL PRESSURES / FATIGUE).

```text
### PREPARE SEQUENCE (A~F)
`
A. NPC Base + Equipment 확보
B. 현재 Bag Item 평가 (Sold Item Stat, final Supply contribution, finalFoodDrinkSupply 산출. NPC Stat 미합산)
C. fatigueRecovery = max(0, finalFoodDrinkSupply - (requiredSupply||0))
effectiveFatigue = max(0, n.fatigue - fatigueRecovery) 산출
D. Base + Equip 영역에 Trait/Injury/Fatigue 등 NPC-side % modifier 적용
- Core Stat Trait % (reckless +10%, frail -10%) 적용
- 부상 % (투력 -15% (악바리 +20%), 강인함 -20%) 적용
- 피로 % (effectiveFatigue 기준, 기동/정신 10~19: -10%, 20: -25%) 적용
E. Sold Item Stat을 최종 Stat에 합산 (Item Stat에는 NPC-side % 적용 않음)
F. 기존 Supply Burden / Hazard 계산 진행
`
- Stat penalty: 0~9 (없음), 10~19 (기동/정신 -10%), 20 (기동/정신 -25%).
```

## SUPERSEDED — Lv10+ third Bag slot

Replaced by `No canonical route may require a third normal Bag slot.` (TIER CONTRACT) and `ITEM_v2.8.0.md` (late-Run progression improves one slot, `not add a third normal Bag slot`); v2.7 INHERITANCE named this `stale third-slot wording`.

```text
Lv10+.slot3=insurance/flex/luxury
- Lv10+ third slot=insurance/stat/loot/premium/safety choice
```

## SUPERSEDED — v2.6 approximate Day / Gate / Tier bands and PASS3 placeholders

Replaced by the exact Gate-count table and Tier anchor rows with linear interpolation (FULL-CHAIN NUMERIC CLOSURE). The D30 lines are restated by the D30 table row / `D30 does not use ordinary Tier generation.`; the Final / Boss pointers are in RELATED. The INTRA-BAND CURVE intent and CONTROLLED RANDOM are kept; the seven Day-band boundary lines (`D1–3:` ... `D30:`) are kept verbatim under INTRA-BAND CURVE because INTRA-BAND CURVE and BALANCE TARGET use the bands.

```text
## DAY / GATE PROGRESSION
gate=1
tier=I only
gate=1–2
tier=I dominant
tierII=very low, late-band only
gate≈2
I≈65–70%
II≈30–35%
gate=2
I≈30%
II≈60%
III≈10%
gate=2–3
I≈10%
II≈60%
III≈30%
gate=2–3
II≈45–50%
III≈50–55%
normal Gate/Tier progression=NO
Final composition/resolution:
-> FINAL_EXPEDITION
Boss identity/trait:
-> BOSS
Exact percentages=PASS3 tuning targets.
Exact curve=PASS3
```

## SUPERSEDED — Great Success / Deep PASS3 placeholders

Replaced by `signalMargin = 0.26` / `chanceSlope = 0.80` / `chanceCap = 0.30`, the 50% / 50% two-vs-three occurrence weighting and `deepRequiredPower = baseGateRequiredPower × 1.50`. The signal-threshold line keeps its live clause (REWORD below).

```text
Exact threshold / curve / maximum probability=PASS3.
Exact 2-vs-3 weighting=PASS3.
`deepRequiredPower = baseGateRequiredPower × deepPowerFactor`
Exact `deepPowerFactor`=PASS3.
```

## SUPERSEDED — v2.7 readiness / Supply-deficit placeholders

Replaced by the exact Hazard Defense / Readiness block (Counter + mapped Core-Stat contribution, ratio thresholds for 충분 / 대응 / 불안 / 취약) and the exact Supply-deficit penalty (`min(0.30, deficit × 0.06)`), both still hidden (`exact deficit formula remains hidden`, `These thresholds are Design Truth but remain hidden calculation detail.`).

```text
Hazard defense continues to use the current authoritative Hazard-to-Core-Stat mapping plus explicit Item/Trait Counter contributions.
Readiness labels remain:
충분 / 대응 / 불안 / 취약
with their existing owner calculation; no second v2.7 readiness formula is created.
The exact Supply-deficit penalty formula remains hidden and inherits the current owner unless later tuned by approved balance evidence.
```

## SUPERSEDED — v2.7 Fatigue branch display

Replaced by `Do not show the Player a branch table of hypothetical final Fatigue for 성공 / 퇴각 / 부상.` and the v2.8 SALE list (`departure Fatigue after committed preRecovery`); NIGHT shows the one resolved path.

```text
- departure Fatigue after preRecovery
- conditional final Fatigue for each relevant possible Outcome
Conditional Fatigue rows are arithmetic, not Outcome prediction.
```

## SUPERSEDED — v2.6 next-day design rule

Replaced by the v2.7 design intent kept under NEXT-DAY GATE FORECAST / Design boundary (`내일 얼마나 많이, 얼마나 위험한지는 안다.` / `정확히 무엇이 필요한지는 모른다.`).

```text
Design rule:
`난이도의 확률은 알지만, 정확히 무엇이 필요한지는 모른다.`
```

## LEGACY — restatements of rules kept elsewhere in the target

v2.7 SUPPLY BURDEN INPUT restates the kept v2.6 Tier eligibility / values. v2.8 hidden-deficit line restates `hidden Supply-deficit formula` (Do not expose). v2.8 Deep windows / no-inflation lines restate the kept v2.6 `Occurrence windows:` / `Do not inflate Hazard magnitude/count to manufacture difficulty.` v2.7 `Retain` restates the kept v2.6 exact Tier distribution lines. `Canonical presentation -> ECONOMY_ORDER` is carried by `Presentation owner -> ...`; `NPC reward -> NPC_TRAIT.` by `NPC bonus reward remains owned by NPC_TRAIT_v2.8.0.md.`

```text
## SUPPLY BURDEN INPUT
Unchanged Supply-Burden occurrence/required values remain owned by the base document, including:
- T1 ineligible
- T2 eligible / required Supply 3 baseline
- T3 eligible / required Supply 5 baseline
- D30 Final no additional random Supply Burden
Retain exact next-day T1/T2/T3 probability disclosure.
The hidden deficit formula remains hidden.
Keep the inherited occurrence windows:
D7 / D14 / D21 / D28
No Hazard magnitude/count inflation is added.
Canonical presentation -> ECONOMY_ORDER
NPC reward -> NPC_TRAIT.
```

## REWORD — version framing removed / pointers to current v2.8 files / dead clause trimmed

Each pair: original in `text`, new form in `new`. Pointer rewords name the current routed owner (exact player-facing copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`). The Gate-Power opening sentence drops `Only the Day term changes, and only after D9` (change narration; the formula itself carries `min(Day, 9)`). The Great-Success signal line drops the dead `=PASS3` clause. The Severe-chance escalation line points at the kept INJURED RE-EXPEDITION rule instead of `the current v2.7 rule`.

```text
Gate required Combat Power carries a Family factor `fireCombat=0.90` (v2.5 final).
```

```new
Gate required Combat Power carries a Family factor `fireCombat=0.90`.
```

```text
v2.8 does not change Fire-family occurrence weighting.
```

```new
Fire has no special occurrence weighting: Families are drawn uniformly.
```

```text
-> UI_UX
```

```new
-> `UI_UX_v2.8.0.md`
```

```text
v2.5 retained starting values:
```

(v2.9.0: its reworded form `Supply Burden values:` was deleted with the SUPPLY_BURDEN section; see the v2.9.0 AMENDMENT below.)

```text
All active Food/Drink have Supply > 0 according to ITEM.
```

```new
All active Food/Drink have Supply > 0 according to `ITEM_v2.8.0.md`.
```

```text
Trait result modifiers and their outcome scope -> `NPC_TRAIT_v2.7.0.md`.
```

```new
Trait result modifiers and their outcome scope -> `NPC_TRAIT_v2.8.0.md`.
```

```text
This is the same `preparedSupply` field exposed by `NIGHT_CLOSING_v2.7.0.md`.
```

```new
This is the same `preparedSupply` field exposed by `NIGHT_CLOSING_v2.8.0.md`.
```

```text
Field naming is shared with `NIGHT_CLOSING_v2.7.0.md`.
```

```new
Field naming is shared with `NIGHT_CLOSING_v2.8.0.md`.
```

```text
- A stale ordinary-expedition `.58/.32/.24/.16` path is invalid in v2.7.
```

```new
- A stale ordinary-expedition `.58/.32/.24/.16` path is invalid.
```

```text
Gate required Power keeps its current generation inputs. Only the Day term changes, and only
after D9:
```


```text
D9  = 15.30   (unchanged)
```


```text
The new Epic layer in `ITEM_v2.7.0.md` improves late-Run slot efficiency but is not a mandatory T3 key.
```

```new
The Epic layer in `ITEM_v2.8.0.md` improves late-Run slot efficiency but is not a mandatory T3 key.
```

```text
Canonical item matrix -> ITEM
```

```new
Canonical item matrix -> `ITEM_v2.8.0.md`
```

```text
item -> ITEM
```

```new
item -> `ITEM_v2.8.0.md`
```

```text
job -> NPC_TRAIT
```

```new
job -> `NPC_TRAIT_v2.8.0.md`
```

```text
Exact Monster Knowledge gain contract -> CORE_RUN.
```

```new
Exact Monster Knowledge gain contract -> `CORE_RUN_v2.8.0.md`.
```

```text
When the inherited next-Day Gate count is randomized, expose the exact probability distribution across the possible counts for that next Day.
```


```text
When the inherited next-Day Gate count is deterministic, expose the fixed count as confirmed information.
```


```text
Presentation owner -> `ECONOMY_ORDER_v2.7.0.md` / `UI_UX_v2.7.0.md`.
```


```text
These values are the required v2.8 baseline. Later tuning requires measured evidence and a new
```

```new
These values are the required baseline. Later tuning requires measured evidence and a new
```

```text
The injured-departure escalation remains +15%p under the current v2.7 rule.
```

```new
The injured-departure escalation is +15%p under INJURED RE-EXPEDITION SEVERE ESCALATION.
```

```text
These values are the v2.8 Source-adoption baseline, not player-facing exact probability disclosure.
```

```new
These values are the Source-adoption baseline, not player-facing exact probability disclosure.
```

```text
v2.7 Death risk is a **failure-conditional escalation risk** produced by the Player's actual preparation state.
```

```new
Death risk is a **failure-conditional escalation risk** produced by the Player's actual preparation state.
```

```text
Death is no longer gated behind the stale specific chain:
```

```new
Death is not gated behind the specific chain:
```

```text
Existing Insurance conversion / Aftercare ordering remains owned by `ITEM_v2.7.0.md` and is not duplicated here.
```

```new
Existing Insurance conversion / Aftercare ordering remains owned by `ITEM_v2.8.0.md` and is not duplicated here.
```

```text
Exact presentation/copy -> `SALE_v2.7.0.md` / `UI_UX_v2.7.0.md` / `COPY_WORLD_VOICE_v2.7.0.md`.
```

```new
Exact presentation/copy -> `SALE_v2.8.0.md` / `UI_UX_v2.8.0.md` / `COPY_AUDIT_APPROVED_v2.8.0.md`.
```

```text
- the ordinary Injury Stat penalty itself remains unchanged under `NPC_TRAIT_v2.7.0.md`
```

```new
- the ordinary Injury Stat penalty itself is owned by `NPC_TRAIT_v2.8.0.md`
```

```text
Exact copy -> COPY_WORLD_VOICE.
```

```new
Exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`.
```

```text
Presentation -> UI_UX.
```

```new
Presentation -> `UI_UX_v2.8.0.md`.
```

```text
Signal threshold=PASS3 and must match the actual calculation.
```

```new
Signal threshold must match the actual calculation.
```

```text
Keep the existing margin formula:
```

```new
Margin formula:
```

```text
Exact v2.8 values:
```

```new
Exact values:
```

```text
Each Run still has exactly 2 or 3 Deep occurrences, with:
```

```new
Each Run has exactly 2 or 3 Deep occurrences, with:
```

```text
Event exclusion owner -> EVENT.
```

```new
Event exclusion owner -> `EVENT_v2.8.0.md`.
```

```text
NPC nomination flow -> SALE.
```

```new
NPC nomination flow -> `SALE_v2.8.0.md`.
```

```text
Sponsorship cost remains owned by the Economy owner.
```

```new
Sponsorship cost -> `ECONOMY_ORDER_v2.8.0.md`.
```

```text
Normal Great Success Store Gold -> ECONOMY_ORDER.
```

```new
Normal Great Success Store Gold -> `ECONOMY_ORDER_v2.8.0.md`.
```

```text
item counters -> ITEM
```

```new
item counters -> `ITEM_v2.8.0.md`
```

```text
job/stat coverage -> NPC_TRAIT
```

```new
job/stat coverage -> `NPC_TRAIT_v2.8.0.md`
```

```text
order/tier forecast -> ECONOMY_ORDER
```

```new
order/tier forecast -> `ECONOMY_ORDER_v2.8.0.md`
```

```text
forecast UI -> UI_UX
```

```new
forecast UI -> `UI_UX_v2.8.0.md`
```

```text
night causality -> NIGHT_CLOSING
```

```new
night causality -> `NIGHT_CLOSING_v2.8.0.md`
```

```text
final expedition -> FINAL_EXPEDITION
```

```new
final expedition -> `FINAL_EXPEDITION_v2.8.0.md`
```

```text
boss modifier -> BOSS
```

```new
boss modifier -> `BOSS_v2.8.0.md`
```

```text
Item Supply/Counter/Epic preparation -> `ITEM_v2.7.0.md`
```

```new
Item Supply/Counter/Epic preparation -> `ITEM_v2.8.0.md`
```

```text
Injury persistence/re-expedition state -> `NPC_TRAIT_v2.7.0.md`
```

```new
Injury persistence/re-expedition state -> `NPC_TRAIT_v2.8.0.md`
```

```text
Fatigue Trait -> `NPC_TRAIT_v2.7.0.md`
```

```new
Fatigue Trait -> `NPC_TRAIT_v2.8.0.md`
```

```text
Sale preview -> `SALE_v2.7.0.md`
```

```new
Sale preview -> `SALE_v2.8.0.md`
```

```text
Night resolved fields -> `NIGHT_CLOSING_v2.7.0.md`
```

```new
Night resolved fields -> `NIGHT_CLOSING_v2.8.0.md`
```

```text
Next-day forecast presentation -> `ECONOMY_ORDER_v2.7.0.md`
```

```new
Next-day forecast presentation -> `ECONOMY_ORDER_v2.8.0.md`
```

```text
Final Hazard aggregation -> `FINAL_EXPEDITION_v2.7.0.md`
```

```new
Final Hazard aggregation -> `FINAL_EXPEDITION_v2.8.0.md`
```

## NEW — headings replacing version-tagged headings

```new
## SUPPLY -> FATIGUE
## PREPARATION SEQUENCE
## PREPARED POWER
## GATE POWER — LATE-DAY SLOPE
## HAZARD THREAT
### NEUTRAL-FIT PREPARATION INTENT
## ORDINARY EXPEDITION FAILURE DEATH RISK
## GREAT SUCCESS / DEEP EXPEDITION
```

## UNRESOLVED (reported, not decided)

- Gate required Power: `Every other term is unchanged: the base constant, the Tier term, the Family adjustment and the Family Combat multiplier all keep their current values.` Only `fireCombat=0.90` is stated in the chain; the base constant, Tier term and Family adjustment values are defined in no Canonical file (Source only). Kept verbatim.
- `Gate scale` (escapeChance `- Gate scale × 0.024`) and `Gate reward multiplier` (expeditionWalletReward) are used by the v2.8 exact baseline but defined in no current Canonical file. Kept verbatim.
- `v2.8 does not change Fire-family occurrence weighting.` No Fire occurrence weighting is defined anywhere in the chain; kept as the binding constraint `Fire-family occurrence weighting is not changed.` (see also `SOURCE_ADOPTION_QA_v2.8.0.md`: no special occurrence weighting currently proven). The reword has no reference point: Source picks Families uniformly.
- Source locations for items 1-2 (review finding): the Gate-Power base constant / Tier term / Family adjustment and `Gate scale` / `Gate reward multiplier` exist only in Source (`shop.js:134` / `shop.js:209`, `catalog.js` Family base / reward). Reported to the User; no text change.
- `departure Fatigue`: the v2.7 general Expose item `- departure Fatigue after preRecovery` is superseded by the v2.8 `SALE may expose:` item `- departure Fatigue after committed preRecovery`; the display surface is now stated only under SALE may expose. Reported to the User; no text change.

## AMENDMENT — User decisions 2026-09-23 (decision list A / B / C)

A3: the Gate Power terms, Gate scale, Gate reward multiplier and the region factor are written down
from Source (dist/systems/shop.js makeDungeon / morning, dist/data/catalog.js). B13: Fire weighting
stated as uniform draw (Source).

(Fire line: its earlier declaration above now carries the new wording.)

```text
Every other term is unchanged: the base constant, the Tier term, the Family adjustment and the
Family Combat multiplier all keep their current values.
Reference anchors (Tier 1, ordinary Family):
```

```new
Full required Power (Source-exact):
Gate Power
= (21 + Day term + (Tier - 1) × 5 + FireTerm + (familyBase - 2) × 1.3) × FamilyCombat
× Event danger multiplier × (1 + (50 - region) × 0.001)
FireTerm = 6 + (Tier - 1) × 8 for fire, else 0
FamilyCombat = fireCombat 0.90 for fire, else 1
familyBase: spider 2 · slime 2 · fire 3 · crypt 3 · snow 4
region: 0..100, starts 50; each Night +2 per win, -4 per death, -1 per other result
Gate scale = 1 + Day × 0.10 + (Tier - 1) × 0.6   (Final: 4.6)
Gate reward multiplier = familyReward × (1 + (Tier - 1) × 0.12) × Event reward multiplier
familyReward: spider 1 · slime 1 · fire 1.15 · crypt 1.10 · snow 1.25 · Final 2
Day-term reference anchors:
```

## AMENDMENT — v2.9.0 Supply→Fatigue / Fatigue bands / Hazard pressure (User decision 2026-09-24)

The Supply Burden Gate modifier, required Supply, Supply Deficit and the deficit penalty are removed; Food/Drink
Supply is Fatigue recovery only (current Fatigue first, remainder buffers this expedition's gain, shown as
`피로 회복 N`), with Severe-Injury rest days recovering 5 per day. Fatigue runs 0~40 in five named bands
(정상 / 지침 / 과로 / 소진 / 탈진), outcome gains rise to +4 / +4 / +7 / +9 (first set at +5 / +5 / +8 / +10, re-tuned -1 after the I-2 re-measure, User 2026-09-24), and Fatigue 40 adds the injured-style
+10%p failure-Death term. Each Hazard presses exactly one non-투력 Stat (강인함 3 / 기동 3 / 정신 3: 화염 -> 기동
×0.40, 어둠 / 화이트아웃 -> 정신 ×0.40) with one player-facing pressure label per Stat and one full sentence per
Hazard. The `## EXCESS SUPPLY -> FATIGUE` heading declaration above now carries `## SUPPLY -> FATIGUE`; the
`Supply Burden values:` declaration is retired in place.

```text
- Prepared Supply / Required Supply / excess
Mapped Core-Stat coefficients:
| 화염 | 강인함 ×0.32 |
| 어둠 | 정신 ×0.30 + 기동 ×0.12 |
| 화이트아웃 | 정신 ×0.30 + 기동 ×0.12 |
### Supply-deficit penalty — exact
If Required Supply is not met:
deficit = max(0, requiredSupply - preparedSupply)
sharedPenalty = min(0.30, deficit × 0.06)
Apply the same percentage reduction to the prepared four Core Stats before ordinary combat/Hazard
resolution. This remains one shared Supply system, not four independent penalties.
성공      +3
대성공    +3
퇴각      +5
부상      +6
0~9    : no Stat penalty
10~19  : 기동 / 정신 -15%
20     : 기동 / 정신 -40%
Fatigue 20 is an explicit overuse state, not a mild second tier.
excessSupply
= max(0, preparedSupply - requiredSupply)
= min(currentFatigue, excessSupply)
= excessSupply - preRecovery
= clamp(fatigueBeforeExpedition + actualOutcomeFatigueGain, 0, 20)
1. Required Supply is paid first.
2. Remaining Supply reduces current Fatigue first.
C. pay required Supply, calculate preRecovery, fatigueBeforeExpedition, remainingSupplyBuffer
D. apply NPC-side Trait / Injury / Fatigue modifiers using fatigueBeforeExpedition
F. apply existing Supply Deficit / Hazard calculations
G. after actual expedition Outcome is known, calculate rawOutcomeFatigueGain, outcomeBufferUsed, actualOutcomeFatigueGain, finalFatigue
Expose exact decision ingredients:
- Required Supply
- Supply Deficit amount
- remaining Supply buffer
- hidden Supply-deficit formula
fire -> 강인함
dark -> 정신(primary)+기동(secondary)
whiteout -> 정신(primary)+기동(secondary)
Canonical pressure labels:
- poison / 독 -> 강인함 압박
- bind / 속박 -> 기동 압박
- corrosion / 부식 -> 강인함 압박
- mire / 진창 -> 기동 압박
- fire / 화염 -> 강인함 압박
- fear / 공포 -> 정신 압박
- dark / 어둠 -> 정신 중심 + 기동 보조 압박
- cold / 냉기 -> 강인함 압박
- whiteout / 화이트아웃 -> 정신 중심 + 기동 보조 압박
recovery may include:
- rest
- explicit Condition items/effects
### SUPPLY_BURDEN
playerLabel=보급 부담
type=globalGateModifier
familyHazard=NO
familyExclusive=NO
Purpose:
장거리/장시간 원정의 준비 압박을 별도 Hazard가 아니라 원정 전체 보급 문제로 표현한다.
Tier eligibility:
- T1 = NO
- T2 = eligible
- T3 = eligible
- D30 Final = no additional random Supply Burden modifier
T2 Supply Burden chance = 35% per generated Gate
T2 requiredSupply = 3
T3 Supply Burden chance = 55% per generated Gate
T3 requiredSupply = 5
Food/Drink provide visible `Supply` values.
Resolution:
- actualSupply >= requiredSupply => no Supply Deficit
- actualSupply < requiredSupply => Supply Deficit
- Supply Deficit applies one shared expedition-wide penalty across effective Combat/Hazard readiness
- implementation may express the shared penalty through effective 투력/강인함/기동/정신 values, but must remain one unified Supply system
- excess Supply does not create an additional success bonus by itself
Player-facing:
- Supply Burden is visible before Order when active
- required Supply is visible
- current prepared Supply is visible where preparation is shown
- Item Supply contribution is visible
- exact deficit formula remains hidden
Slot contract:
Supply Burden must not turn T3 into a forced 3-slot tax.
A normal T2/T3 route with Supply Burden must still respect the canonical <=2 meaningful required-prep-slot contract.
```

```new
fire -> 기동 (User 2026-09-24, v2.9.0)
dark -> 정신 (User 2026-09-24, v2.9.0)
whiteout -> 정신 (User 2026-09-24, v2.9.0)
- 강인함: 독 · 냉기 · 부식
- 투력 is never a Hazard-pressured Stat (it already carries the largest combat coefficient).
- `{위험} — 대응 {N} 필요 · {능력치} {n}당 대응 1 제공 · {위험} 대응 상품이 막는다` — N = the Counter that alone reaches 충분 on that Gate that Day (`ceil(Hazard Threat)`); n = 3 for 강인함 (×1/3), 2 for 기동 / 정신 (×1/2) — integer conversions, each rounded in the player's favour from the earlier ×0.30 / ×0.40 (User 2026-09-24 revision 4, v2.9.0)
- e.g. `독 — 대응 13 필요 · 강인함 3당 대응 1 제공 · 독 대응 상품이 막는다` (DAY 1 T1)
- e.g. `냉기 — 대응 13 필요 · 강인함 3당 대응 1 제공 · 냉기 대응 상품이 막는다` (DAY 1 T1)
- e.g. `부식 — 대응 13 필요 · 강인함 3당 대응 1 제공 · 부식 대응 상품이 막는다` (DAY 1 T1)
- e.g. `속박 — 대응 13 필요 · 기동 2당 대응 1 제공 · 속박 대응 상품이 막는다` (DAY 1 T1)
- e.g. `진창 — 대응 13 필요 · 기동 2당 대응 1 제공 · 진창 대응 상품이 막는다` (DAY 1 T1)
- e.g. `화염 — 대응 13 필요 · 정신 2당 대응 1 제공 · 화염 대응 상품이 막는다` (DAY 1 T1)
- e.g. `공포 — 대응 13 필요 · 정신 2당 대응 1 제공 · 공포 대응 상품이 막는다` (DAY 1 T1)
- e.g. `화이트아웃 — 대응 13 필요 · 정신 2당 대응 1 제공 · 화이트아웃 대응 상품이 막는다` (DAY 1 T1)
recovery (User 2026-09-24, v2.9.0):
- Food/Drink Supply: each point reduces Fatigue by 1 -> §SUPPLY -> FATIGUE
(User 2026-09-24, v2.9.0)
성공      +4
대성공    +4
퇴각      +7
부상      +9
Re-tuned -1 from the first v2.9.0 table (+5 / +5 / +8 / +10) after the I-2 re-measure (User 2026-09-24, v2.9.0).
Fatigue scale 0~40 (max / clamp 40), five bands (User 2026-09-24, v2.9.0):
0~9    : 정상 — no Stat penalty
10~19  : 지침 — 기동 / 정신 -15%
20~29  : 과로 — 기동 / 정신 -40%
30~39  : 소진 — 기동 / 정신 -40% + 투력 / 강인함 -20%
40     : 탈진 — 투력 / 강인함 / 기동 / 정신 -40% + failure-conditioned Death risk +10%p
The band is judged on `fatigueBeforeExpedition`.
The Fatigue-40 Death term is the same additive +10%p term as re-sending an injured NPC, and raises the cap the same way -> §ORDINARY EXPEDITION FAILURE DEATH RISK.
Fatigue 40 (탈진) is an explicit overuse state, not a mild top band.
NIGHT main line shows the band name from 20 up: `귀환 후 피로 22 · 과로` (`정상` / `지침` are not named).
= min(currentFatigue, preparedSupply)
= preparedSupply - preRecovery
= clamp(fatigueBeforeExpedition + actualOutcomeFatigueGain, 0, 40)
netFatigueDelta
= finalFatigue - beforeFatigue
restRecovery
1. No Gate has a required Supply; there is no Supply Deficit and no excess Supply. Every Supply point is Fatigue recovery.
2. Supply reduces current Fatigue first (1:1, before departure).
5. The Item value is shown as `피로 회복 N` (never `보급 +N`). One-sentence rule: `음식·음료는 피로를 줄인다.`
Result fields: beforeFatigue, preparedSupply, preRecovery, fatigueBeforeExpedition, remainingSupplyBuffer, rawOutcomeFatigueGain, outcomeBufferUsed, actualOutcomeFatigueGain, finalFatigue, netFatigueDelta.
Removed: requiredSupply, excessSupply.
C. calculate preRecovery, fatigueBeforeExpedition, remainingSupplyBuffer
D. apply NPC-side Trait / Injury / Fatigue-band modifiers using fatigueBeforeExpedition
F. apply existing Hazard calculations
G. after the actual Outcome is known, calculate rawOutcomeFatigueGain, outcomeBufferUsed, actualOutcomeFatigueGain, finalFatigue
Expose exact decision ingredients (User 2026-09-24, v2.9.0):
- current Fatigue band name from 20 up
- that departing at Fatigue 40 (탈진) increases failure-Death risk
| 화염 | 정신 ×1/2 |
| 화이트아웃 | 정신 ×1/2 |
투력 is never a Hazard-pressured Stat. Counter keys, Items, readiness labels and thresholds are unchanged.
Fatigue 40 departure (User 2026-09-24, v2.9.0): if `fatigueBeforeExpedition = 40` (탈진), the same additive term applies, and the cap is raised the same way:
injuryEscalation  = 0.10 if injury=1, else 0
fatigueEscalation = 0.10 if fatigueBeforeExpedition = 40, else 0
- departing at Fatigue 40 (탈진) adds the same visible material risk
- Fatigue-40 conditional cap is 40%; injured and Fatigue-40 together 50%
```

## AMENDMENT — v2.9.0 transaction beat / SALE at a glance (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0), D-3 rule sheet C5: the exact pre-supply `실패 시 사망 위험` % stays exposed at SALE entry, but its surface moves from an always-on readout cell to the 전투 전망 help (second line) and the NPC detail. The boundary line is extended in place; nothing else changes.

```text
- exact pre-supply `실패 시 사망 위험` % at SALE entry, owned by this failure-conditioned Death-risk model
```

```new
- exact pre-supply `실패 시 사망 위험` % at SALE entry, owned by this failure-conditioned Death-risk model, shown in the 전투 전망 help and the NPC detail rather than as an always-on readout cell (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 no always-on SALE Fatigue line (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0): the SALE-may-expose list names the counter tray as the only place for departure Fatigue; the always-on line is gone.

```text
- current Fatigue
- departure Fatigue after committed preRecovery
```

```new
- current Fatigue (the customer's status strip)
- departure Fatigue after committed preRecovery — not a SALE line: the counter tray lists a Food/Drink's own `피로 회복` only, current Fatigue is the status strip's `피로 N` and NIGHT answers the rest; no always-on Fatigue line under the outlook (User 2026-09-25; the v2.9.0 `피로 A → 출발 B` line is retired)
```

## AMENDMENT — v2.9.0 Gate Hazard requirement number (User decision 2026-09-24)

User decision 2026-09-24 (v2.9.0 revision): the Gate-level 충분 requirement number and Core-Stat conversion are public; the nine literal sentences (declared new in the Supply→Fatigue amendment) are replaced in place by the templated form and examples; the boundary and threshold lines are rewritten.

```text
- exact hidden Hazard threshold/formula
These thresholds are Design Truth but remain hidden calculation detail.
```

```new
The 0.75 / 0.40 thresholds remain hidden calculation detail; the 충분 requirement (`대응 {N} 필요`, N = ceil(Hazard Threat)) and the Core-Stat conversion (`{능력치} {n}당 대응 1 제공`) are shown per Gate (User 2026-09-24 revision, v2.9.0).
```

## AMENDMENT — v2.9.0 revision 2: pressure labels and the destination-plate ? retired (User decision 2026-09-24)

Every player-facing Hazard row (SALE destination plate, D25 scouting report, FINAL 확인된 위협 included) reads the numbered short row
`{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`; the labels `강인함으로 버틴다` / `기동으로 피한다` / `정신으로 견딘다` and the plate `?` help are
retired. The revision-1 declarations this replaces were edited out of the fences above in place.

```new
Pressure labels are retired (User 2026-09-24 revision 2, v2.9.0): `강인함으로 버틴다` / `기동으로 피한다` / `정신으로 견딘다` no longer appear anywhere, and the older `강인함 압박` / `기동 압박` / `정신 압박` / `정신 중심 + 기동 보조 압박` stay retired. Every player-facing Hazard row is the numbered short row below.
Full Hazard sentence (Gate detail only; the Gate-level requirement number first):
The destination-plate help (`?`) is retired: the numbered row carries the detail itself (User 2026-09-24 revision 2, v2.9.0).
- the readiness ratio thresholds 대응 / 불안 / 취약 (0.75 / 0.40) and the Hazard Defense formula; the Gate's 충분 requirement `대응 {N} 필요` (N = ceil(Hazard Threat)) and the Core-Stat conversion `{능력치} {n}당 대응 1 제공` are public Gate-level facts on every Hazard row (MORNING, ORDER Gate detail, SALE destination plate, D25 scouting report, FINAL) — never a per-customer remaining need (User 2026-09-24 revision 2, v2.9.0)
```

## AMENDMENT — v2.9.0 revision 3: 어둠 -> 기동, no Gate shares a Stat (User decision 2026-09-24)

어둠 presses 기동 ×0.40 so that 망자역 지하묘지 (공포 + 어둠) is answered by 정신 + 기동, never one Stat; the split is 강인함 3 /
기동 4 / 정신 2. The revision-1/2 declarations this replaces were edited out of the fences above in place.

```new
One non-투력 Stat per Hazard, 3 / 3 / 3 (User 2026-09-24 revision 5, v2.9.0: 어둠 -> 기동 and 화염 -> 정신, so that no Gate's Hazards share one Stat):
- 기동: 속박 · 진창 · 어둠
- 정신: 공포 · 화이트아웃 · 화염
- Gate constraint: within one Gate (a Family's Tier Hazard set) no two Hazards press the same Stat, so one Stat never answers a whole Gate (망자역 지하묘지 = 정신 + 기동). The Final's merged two-Family pool may repeat a Stat.
- e.g. `어둠 — 대응 13 필요 · 기동 2당 대응 1 제공 · 어둠 대응 상품이 막는다` (DAY 1 T1)
Mapped Core-Stat coefficients (one non-투력 Stat per Hazard, 3 / 3 / 3, no Gate sharing a Stat; User 2026-09-24 revision 5, v2.9.0):
| 어둠 | 기동 ×1/2 |
```

## AMENDMENT — v2.9.0 revision 4: integer Core-Stat conversion (User decision 2026-09-24)

The Hazard Defense coefficients become integer conversions read `{능력치} n당 1`: 강인함 ×1/3 (3당 1), 기동 / 정신 ×1/2 (2당 1), each rounded in the player's favour from ×0.30 / ×0.40. The revision-1..3 declarations that carried `10마다 대응 {k}` were rewritten in place above.

```text
| 독 | 강인함 ×0.30 |
| 냉기 | 강인함 ×0.30 |
| 부식 | 강인함 ×0.30 |
| 속박 | 기동 ×0.40 |
| 진창 | 기동 ×0.40 |
| 공포 | 정신 ×0.40 |
```

```new
| 독 | 강인함 ×1/3 |
| 냉기 | 강인함 ×1/3 |
| 부식 | 강인함 ×1/3 |
| 속박 | 기동 ×1/2 |
| 진창 | 기동 ×1/2 |
| 공포 | 정신 ×1/2 |
```

## AMENDMENT — v2.9.0 play feedback F2 (User decision 2026-09-24)

The next-day Gate / Tier forecast surface is retired (MORNING and ORDER; the generator rules stay internal), ORDER rows carry the
rarity name under the Item name, a Gold- or space-blocked quantity control answers a tap with the COPY_AUDIT §3-9 reason toast, and
Trait flavor notes are removed (거짓말쟁이 keeps its function line as an effect row). Superseded revision declarations were removed in place.

```text
The next-Day Gate-count forecast must read this same rule. It may not maintain a second probability
table.
The next-Day T1/T2/T3 forecast uses this exact same function. Save/Load must not create a separate
forecast roll or a second approximation table.
Before ORDER commitment, expose both:
1. next-day Gate-count forecast
2. next-day Tier forecast
### Gate-count forecast
- derive the forecast from the same canonical seeded/current-run generation rules that govern the actual next Day
- do not create a second forecast-only RNG path
- Save/Load must not reroll the forecast independently from the actual next-Day generation state
- do not reveal next-day Family
- do not reveal exact next-day Gate identities/composition
- do not reveal next-day Hazard set
### Tier forecast
### Design boundary
Current-day open Gate / known Hazard remains the primary preparation truth.
The next-day forecast is a secondary planning signal.
Design intent:
내일 얼마나 많이, 얼마나 위험한지는 안다.
정확히 무엇이 필요한지는 모른다.
The following NEXT-DAY forecast is supplemental only.
It must not replace or obscure today's Gate/Hazard information.
Before ordering, expose exact next-day Tier distribution:
T1 %
T2 %
T3 %
- exact next-day Family
- actual Gate result
- visiting NPC identities
- NPC destination
- expedition success/death probability
```

```new
## NEXT-DAY GATE FORECAST — RETIRED
(User 2026-09-24, v2.9.0) No player-facing next-day forecast exists. The Gate-count and Tier generation rules below stay the engine's; nothing derived from them is shown before the next Day opens.
No player-facing next-Day Gate-count forecast exists (User 2026-09-24, v2.9.0); the generator alone reads this rule.
No player-facing next-Day Tier forecast exists (User 2026-09-24, v2.9.0); the generator alone reads this function.
```

## AMENDMENT — v2.9.0 F2-b: two-line Hazard short row, inline Stat tag (User decision 2026-09-25)

The Hazard short row reads `대응 {N} 필요` over the smaller `{능력치} {n}당 대응 1 제공` (one line at 900px+); the SALE Stat grid tag sits
beside the Stat name and the value is one step smaller. Superseded declarations were edited in place.

```new
Short row (every other Hazard row — MORNING Gate plate, SALE destination plate, D25 scouting report, FINAL 확인된 위협; the number first): `{위험} · 대응 {N} 필요 · {능력치} {n}당 대응 1 제공`. N is that Gate's own Day / Tier (the Final: Day 30 / T2 -> 29). No label row and no per-customer remaining need survive (User 2026-09-24 revision 2, v2.9.0). The short row renders as two lines on a phone — `대응 {N} 필요` (body size) over the smaller sub-line `{능력치} {n}당 대응 1 제공` — and as one ` · ` line where the width allows (900px+) (User 2026-09-25, v2.9.0).
```

## AMENDMENT — v2.9.0 F3: kit Outcome step / no rest recovery / 중상 +9 / repeated-strain cut (User decision 2026-09-25)

User decisions 2026-09-25 (v2.9.0 F3): 구급키트 lowers the resolved Outcome one step (중상 → 부상 with the 부상 XP/Loot/Fatigue/injury 1; 부상 → 부상 with no lasting injury; 사망 excluded); no natural Fatigue recovery of any kind for any adventurer (the Severe-Injury rest-day -5 is retired); 중상 takes the 부상 Fatigue gain (+9) and only 사망 stays 0; repeated injured / weary (Fatigue 20+) departures escalate the failure Death chance (+8%p per repeat of each kind from the second, cap +30%p, from the adventurer's own records) with the NPC-detail row `무리한 출발 {n}회`; the route-change line names 거짓말쟁이 / 순례 with particles by final consonant. Earlier declarations this batch supersedes were removed from the fences above in place.

```text
중상       0
Severe Injury and Death remain final result-Fatigue gain 0; a Trait may not raise them above 0.
```

```new
- no rest recovery: a Severe-Injury recovery day does not change Fatigue (User 2026-09-25, v2.9.0)
= 0 (retired, User 2026-09-25, v2.9.0)
6. No natural recovery of any kind: neither a morning nor a Severe-Injury rest day changes Fatigue; only Food/Drink lower it (User 2026-09-25, v2.9.0).
healthyFailureDeathChance + injuryEscalation + fatigueEscalation + strainEscalation,
0.30 + injuryEscalation + fatigueEscalation + strainEscalation
```

## AMENDMENT — v2.9.0 F4: Fatigue recovery values / shelf life / operating cost / Wallet multipliers / 세계수 price (User decision 2026-09-24/25)

User decisions 2026-09-24/25 (v2.9.0 F4): Food/Drink Fatigue recovery redistributed (삼각김밥 4 · 컵라면 2 · 간단 도시락 5 · 초코바 3 · 집중 사탕 2 · 불룡볶음면 2 with 강인함 +5 · 길드 특제 도시락 6; 영웅 결전 도시락 stays 9; Drinks unchanged); every Item expires (ITEM §SHELF LIFE — EXACT, 2~5 days); the SALE shelf is ordered by days left with a `폐기 N일` chip; operating cost dayBase 90 + 5 × (Day − 1); expedition Wallet multipliers keyed on the Outcome (대성공/성공 0.90 · 퇴각 0.35 · 부상 0.20 · 중상 0.10 · 사망 0); 세계수 생환부적 400 / 800. Earlier rows this batch supersedes were removed from the fences above in place.

```text
퇴각 = 0.08
other surviving path = 0.18
```

```new
퇴각 = 0.35
부상 = 0.20
중상 = 0.10
사망 = 0
```

## AMENDMENT — v2.9.1 balance (User decision 2026-09-25)

User decisions 2026-09-25 (v2.9.1 balance, `reports/v29-balance-agreements.md`): 중상 Fatigue gain 0; Severe shares 0.36 / 0.11; the repeated-strain cut counts consecutive injured departures only; 만반의 준비 ×0.80 and Level factor on the failure Death roll; retreat healing; hidden bad-luck preparation assist; expedition Wallet 대성공 / 성공 1.00; Gate Day term 1.20 / 0.80. Earlier declarations this batch supersedes were removed from the fences above in place.

```text
0.42
0.13
= min(Day, 9) × 1.70 + max(0, Day - 9) × 0.40
D12 = 16.50
D18 = 18.90
D24 = 21.30
D29 = 23.30
5. if that roll hits, the ordinary Outcome becomes `사망`
```

```new
Severe Injury and Death are final result-Fatigue gain 0 and a Trait may not raise them; a Severe Injury already costs the adventurer rest days, and its rest day recovers no Fatigue (User 2026-09-25, v2.9.1 balance).
Gate required Power keeps its current generation inputs. The Day term is (User 2026-09-25, v2.9.1 balance: early slope 1.70 → 1.20, late slope 0.40 → 0.80 — the early Gates no longer outrun adventurer growth, the D20~30 Tier-3 pressure rises; v2.9.2 balance, User 2026-09-25: early slope 1.20 → 1.50, late 0.80 kept — a fresh first Run cleared the Boss; v2.9.2 third pass, User 2026-09-26: DAY 11~20 climb at 1.10 per Day — the NPC-growth check of GAME_VISION's Run Progression Arc — DAY 1~10 unchanged; DAY 21+ returns to the existing 0.80 slope while keeping the offset accumulated by D20, so its absolute Day term is higher than before):
= min(Day, 9) × 1.50 + max(0, min(Day, 10) - 9) × 0.80 + max(0, min(Day, 20) - 10) × 1.10 + max(0, Day - 20) × 0.80
D9  = 13.50
D10 = 14.30
D12 = 16.50
D18 = 23.10
D20 = 25.30
D24 = 28.50
D29 = 32.50
0.36
0.11
Base shares 0.36 / 0.11 (User 2026-09-25, v2.9.1 balance; were 0.42 / 0.13).
Outcome multiplier (User 2026-09-25, v2.9.0; keyed on the resolved Outcome, ordered 중상 < 부상 < 퇴각 < 성공; 대성공 / 성공 back to 1.00 in v2.9.1):
대성공 / 성공 = 1.00
strainEscalation  = min(0.30, 0.08 × max(0, consecutiveInjuredDepartures − 1))
consecutiveInjuredDepartures = this departure, if begun at injury=1, plus the unbroken run of this adventurer's
immediately preceding expeditions also begun at injury=1; 0 when this departure is healthy
(User 2026-09-25, v2.9.1 balance: only CONSECUTIVE injured departures count — a healthy departure, including the
return after a Severe-Injury rest, resets the chain; the first injured departure is free, every further one adds 8%p,
up to 30%p; Fatigue no longer feeds this term)
- sending an adventurer out injured again and again escalates further: +8%p per consecutive injured departure after the first, up to +30%p, and the cap rises with it; one healthy departure resets it (User 2026-09-25, v2.9.0)
### Preparation / Level Death reduction
(User 2026-09-25, v2.9.1 balance; the Level part removed User 2026-09-26, v2.9.2 fourth pass — Level no longer lowers the Death roll.) The failure Death roll uses
rolledDeathChance = failureDeathChance × preparedFactor
preparedFactor (만반의 준비) = 0.80 when ALL hold, else 1:
- departed without Injury (injury=0)
- fatigueBeforeExpedition < 20
- 2 or more Items in the Bag
- a Death roll inside `failureDeathChance` but outside `rolledDeathChance` does not become 사망: the Outcome becomes
중상 with a flat 0.36 chance, otherwise 부상 — one extra draw, no second Death roll
- the SALE `실패 시 사망 위험` snapshot is the raw `failureDeathChance` and never includes `preparedFactor`
(it depends on the Bag, which the snapshot excludes)
- the Night report names a 만반의 준비 save with one line; exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`
5. if that roll hits `rolledDeathChance`, the ordinary Outcome becomes `사망`; if it hits only the removed band, the Outcome becomes 중상 / 부상 (§Preparation / Level Death reduction)
## RETREAT HEALING
(User 2026-09-25, v2.9.1 balance.) An adventurer who began the expedition at `injury=1` and whose Outcome is
`퇴각` is healed (injury → 0) with chance
healChance = min(1, 0.25 × (1 + k))        → 25% · 50% · 75% · 100%
k = the unbroken run of this adventurer's immediately preceding expeditions that also began at injury=1 and ended 퇴각
- any other preceding expedition ends the run — in practice a `부상` / `중상` result resets it to 0 (an injured departure that
succeeds is already healed by the ordinary Injury step)
- independent of 구급키트; one draw, only on this path
- the Night report says the adventurer recovered with one line; the chance is never shown; exact copy ->
`COPY_AUDIT_APPROVED_v2.8.0.md`
## BAD-LUCK PREPARATION ASSIST (hidden)
(User 2026-09-25, v2.9.1 balance; a hidden correction kept minimal.) Within one Night's ordinary expeditions, in
resolution order:
- count only expeditions that carried 1+ Item; a bare-handed expedition neither counts nor breaks the chain
- a carried expedition that ends anything but `성공` / `대성공` adds 1 to the chain; a `성공` / `대성공` resets it to 0
- when the chain is 3 or more, the next carried expedition resolves with a preparation assist
`assist = 0.10 + 0.05 × (chain − 3)`: prepared ability × (1 + assist) for the combat check and
environmentIncidentChance × (1 − assist)
- Deep expeditions and the Final are excluded (neither counted nor assisted)
- never shown to the Player; no forecast, SALE or Night surface reads it
```

## AMENDMENT — v2.9.2 balance: Great Success EXP 1.40 -> 1.10 (User decision 2026-09-25)

User 2026-09-25: the 대성공 EXP multiplier becomes 1.10; occurrence, Store Gold and Wallet are unchanged. The superseded line is dropped.

```text
대성공 = 1.40
```

```new
 대성공 = 1.00   (User 2026-09-26, v2.9.2 balance; was 1.10, 1.40 before — Great Success occurrence, Store Gold and Wallet unchanged)
```

## AMENDMENT — v2.9.2 balance: Gate early slope 1.20 -> 1.50 (User decision 2026-09-25)

User 2026-09-25: the Day term's early slope becomes 1.50, the late slope 0.80 and the knee Day 9 are kept (a fresh first Run
cleared the Boss). The v2.9.1 slope lines were declared new above, not chain lines, so their `new` fence is edited in place
(formula, heading sentence, Day-term anchors) rather than dropped here.

## AMENDMENT — v2.9.2 balance, second pass: 대성공 EXP 1.10 -> 1.00, combat-success EXP 1.00 -> 0.90 (User decision 2026-09-26)

User 2026-09-26 (after the `reader` harness review, reports/v292-bot-harness.md): the 대성공 line declared above is edited in place;
the combat-success line is a chain line, dropped here for its new form. 퇴각 0.38 and other living 0.50 are unchanged.

```text
combat-success path = 1.00
```

```new
    combat-success path = 0.90   (User 2026-09-26, v2.9.2 balance; was 1.00 — 성공, or a won fight that came home hurt)
```

## AMENDMENT — v2.9.2 balance, third pass: Gate DAY 11~20 at 1.10, levelFactor floor 0.85, late T3 +0.10 (User decision 2026-09-26)

User 2026-09-26 (after the paired D10-fork arms, reports/v292-bot-harness.md §9-10; "g1 l2 t"): the Gate Day term climbs at 1.10 per
Day on DAY 11~20 (DAY 1~10 unchanged; DAY 21+ back on the 0.80 slope, carrying the D20 offset), the Level Death protection floor is 0.85 (identical through Lv11), and DAY 21~29 move
0.10 of T2 to T3. The Day-term sentence, formula, anchors and levelFactor lines declared above are edited in place; the late T3
paragraph is new.

```new
Late T3 pressure (User 2026-09-26, v2.9.2 third pass): after the interpolation, DAY 21~29 move 0.10 of the T2 weight to T3
(never more than T2 holds); T1 and every other Day keep the anchor values. The late Days lean on Hazard / Item preparation,
not raw Power alone. Examples: D24 10 / 50 / 40 · D25 5 / 40 / 55 · D29 0 / 35 / 65.
```

## AMENDMENT — v2.9.2 balance, fourth pass: Gate count D19~29, Level Death reduction removed, Warehouse +5 (User decision 2026-09-26)

User 2026-09-26 (after the package measurement, reports/v292-bot-harness.md §11; "PL"): DAY 19~24 open 3 Gates at 70% (2 at 30%),
DAY 25~29 exactly 3; the Level factor on the failure Death roll is removed. The §Preparation / Level Death reduction lines declared
above are edited in place (the levelFactor line is gone); the D19–29 Gate-count row is replaced by two rows.

```text
| D19–29 | 2 or 3, exactly 50% / 50% |
```

```new
| D19–24 | 3 at 70%, otherwise 2 (User 2026-09-26, v2.9.2 fourth pass; was 2 or 3 at 50% / 50% through D29) |
| D25–29 | exactly 3, no draw (User 2026-09-26, v2.9.2 fourth pass) |
```
