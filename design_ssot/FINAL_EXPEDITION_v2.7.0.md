# FINAL_EXPEDITION

DOC=FINAL_EXPEDITION
OWNER=final,D30,final_party,final_hazard,final_power,final_clear,final_prereveal
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=FINAL_EXPEDITION_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged Final party size, survivor fallback, no class synergy, Final Roll, Boss-state input, one-resolution structure, and stock/lock boundaries inherit `FINAL_EXPEDITION_v2.5.0.md`.

This patch moves Family/Hazard disclosure to D25 and replaces Final Hazard aggregation/power penalty.

## D25 FINAL STATE GENERATION — EXACT

On D25, before ordinary D25 management decisions that can use the information:

1. select exactly two distinct authoritative Dungeon Families using the existing seeded/fixed Final selection principle
2. read each selected Family's authoritative T2 Hazard keys from `DUNGEON_HAZARD_v2.7.0.md`
3. merge those Hazard keys into the Final Hazard Pool without inventing a new Family table
4. persist the exact Family Pair and Final Hazard Pool
5. reveal that exact Pair/Hazard information to the Player

The generated D25 state is authoritative for D30.

Save/Load must not reroll:
- Family Pair
- Final Hazard Pool

D25 does not grant guaranteed Counter Items, free stock, or a special Final shop.

## D30 — REUSE D25 STATE

D30 does not generate/reveal a new Family Pair.
It consumes the exact persisted D25 Final state.

Ordering:
- persisted Final Families/Hazards are already known from D25
- D30 Relic / SLOTH window resolves under that known state
- Final-relevant preparation completes
- Final Lock
- one Final resolution

Any stale D30 generation path that can produce a different Pair/Pool is invalid.

## FINAL HAZARD THREAT

Each Final Hazard uses the same v2.7 Hazard Threat / defense / gap truth as ordinary expeditions with:

```text
Day = 30
Tier = T2
```

Exact threat ownership -> `DUNGEON_HAZARD_v2.7.0.md`.
No separate Final-only Hazard defense table.

## FINAL HAZARD AGGREGATION — v2.7 BASELINE

`DIRECTOR DOCUMENT BASELINE`

For each participant:

```text
FinalMeanHazardGap
= sum(each Final Hazard gap) / Final Hazard Count

Final Hazard Penalty
= FinalMeanHazardGap × 1.70
```

This replaces the prior aggregate-gap penalty path for Final only.

Reasoning boundary:
- two-Family combinations may contain different Hazard counts
- mean gap prevents a four-Hazard pair from being penalized merely because it has more entries
- exact specialist Counter can be worth more than generic Potion when a large matching gap actually exists
- if natural Stats already solve the gap, generic Stat preparation may be better

## INDIVIDUAL FINAL POWER — v2.7

`DIRECTOR DOCUMENT BASELINE` for the changed Hazard term; Core-Stat weights match the v2.7 Prepared-Power baseline.

```text
Individual Final Power
= 투력 × 0.50
+ 강인함 × 0.34
+ 기동 × 0.27
+ 정신 × 0.20
- FinalMeanHazardGap × 1.70
```

Final Power remains internal; do not expose it as a new Player Stat.

Participant-side Boss modifiers still apply in the ordering owned by `BOSS_v2.7.0.md` before this participant's final contribution is summed where that Boss rule requires a changed Snapshot/Item contribution.

## FINAL ROLL — UNCHANGED

Keep the inherited Final Roll:

```text
0.88 ~ 1.12
```

Do not retune it merely to make current baseline simulations hit a desired first-Run clear rate.

## FINAL INSURANCE VALUE — EXACT

The ordinary Final resolution does not run normal expedition Retreat/Injury/Severe/Death outcome resolution after the Boss check.
Therefore the following v2.7 Insurance Items have no Final effect:

```text
구급키트
귀환석
세계수 생환부적
```

Player-facing Final preparation must clearly mark `Final 효과 없음` and should block placing them into a Final Bag when practical.

Do not silently grant them a new Final-only effect merely to avoid a dead pick.

## FAMILY-PAIR BALANCE AUDIT

Boss numbers must not hide a materially excessive Family-Pair difficulty spread.
Full-run/Final simulation must record:
- Pair identity
- Hazard count
- Party Raw Power
- Clear rate
- FIRE-containing vs non-FIRE pairs

FIRE's ordinary `higher Combat Power` second axis is not automatically inserted as a new Hazard.
If Final Family Pair itself becomes a larger RNG difficulty source than intended Boss differentiation, treat it as a `BALANCE FINDING` in FINAL_EXPEDITION and make the smallest owner-level adjustment after approval.

## RELATED

Timeline/save -> `CORE_RUN_v2.7.0.md`
Hazard truth -> `DUNGEON_HAZARD_v2.7.0.md`
Item/Insurance -> `ITEM_v2.7.0.md`
Boss -> `BOSS_v2.7.0.md`
Relic D30 window -> `RELIC_v2.7.0.md`
UI -> `UI_UX_v2.7.0.md`
