# FINAL_EXPEDITION

DOC=FINAL_EXPEDITION
OWNER=final,D30,final_party,final_hazard,final_power,final_clear,final_prereveal,final_preparation
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=FINAL_EXPEDITION_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged Final party size, survivor fallback, no class synergy, Final Roll, Boss-state input, one-resolution structure, and stock/lock boundaries inherit `FINAL_EXPEDITION_v2.5.0.md`.

This patch moves Family/Hazard disclosure to D25, replaces Final Hazard aggregation/power penalty, and makes D30 preparation reuse the familiar two-slot shop handling while overriding ordinary end-of-Run price negotiation/refusal.

The following inherited v2.5 text is explicitly stale and does not remain live v2.7 truth:
- D30 generation / first disclosure of the Final Family Pair
- `Final Hazard Scale = 4.6` as a standalone Final formula
- Individual Final Power using `환경피해 × 0.35`
- Playtest text that evaluates the old `환경피해 × 0.35` path
- Implementation guardrail wording that says to reuse the old Final Power formula unchanged
- any inherited QA/ownership wording that assumes Family information first appears on D30
- any inherited Final-preparation presentation that jumps directly from party selection/preparation into resolution without the current v2.7 Final preparation step
- any prior v2.7 wording that keeps ordinary 50/100/150 Final price choice or Final refusal RNG

v2.7 uses the rules below plus current routed owners from `SPEC_INDEX_v2.7.0.md`.
Inherited cross-spec references to older versioned filenames are not routing authority.

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
- Final party selection resolves
- selected participants complete Final preparation
- Final Lock occurs
- one Final resolution occurs

Any stale D30 generation path that can produce a different Pair/Pool is invalid.

## D30 PLAYER FLOW — EXACT

Player-facing Final flow is:

```text
출전 NPC 선택
-> FINAL 준비
-> 결과
```

Purpose:
Final must remain the culmination of the shop-management decisions learned during the Run rather than switching to an opaque separate combat interaction.

### 1. Final party selection

Use the inherited current Final party-size / survivor-fallback rules.

The Player selects the Final participants first.
When the Player confirms party selection and enters Final preparation:
- the participant set is committed for this Final attempt
- ordinary participant swapping after committed Final Item transfers begin is not allowed
- Save/Load must not be usable to erase already committed Final transfers or reopen the party-selection decision after that boundary

### 2. Final preparation — fixed 50% / 매입가 transfer

Process selected participants one at a time through the familiar two-slot SALE handling language, but use the Final-specific deterministic price/refusal override below.

For each selected participant:

```text
2 visible Bag slots
-> choose/focus slot
-> choose Item
-> fixed Final price = ordinary 50% price-mode amount = 매입가 기준
-> affordability check
-> commit transfer
-> stock is consumed
-> NPC Wallet is reduced by the fixed amount
-> current Final preparation state updates
-> judge remaining slot
```

Exact ordinary SALE handling -> `SALE_v2.7.0.md`.
Exact fixed-price Wallet truth -> `ECONOMY_ORDER_v2.7.0.md`.

Final-specific override:
- exactly 2 Item slots per participant
- NPC Wallet / affordability remains real
- actual inventory stock consumption remains real
- Final price is fixed to the ordinary 50% / 매입가 amount
- 100% / 150% price choices are unavailable
- no purchase/refusal probability roll occurs
- same-SKU refusal price ceiling does not apply because Final has no refusal roll
- if NPC Wallet is below the fixed amount, that Item cannot be committed to that NPC
- if committed, NPC Wallet decreases by exactly that fixed amount
- sequential transaction state remains; do not convert the two slots into a bundle/cart checkout

Final preparation is not free equipment.
The Player may finish a participant with an empty slot / no additional transfer.

No normal future-customer queue is introduced inside Final preparation.
Only the already selected Final participants are processed.

### FINAL ACCOUNTING — IMPLEMENTATION-BLOCKING UNRESOLVED

The approved Final rule fixes the NPC-side cost/affordability behavior, but the following accounting consequence is not yet approved:

```text
Does a committed Final transfer also:
- increase Player Gold?
- increase Gross Sales used by GREED?
```

Do not infer either direction.
Until User approval:
- Wallet deduction and stock consumption are authoritative
- Player Gold change is unresolved
- Gross Sales contribution is unresolved
- GREED snapshot timing remains Final Lock, but whether these Final transfers are included in that metric is unresolved under `BOSS_v2.7.0.md`

### 3. Final-specific Item boundary

Items marked by this owner as `Final 효과 없음` must be visibly blocked from Final Bag placement when practical.

Current no-effect Insurance:
- 구급키트
- 귀환석
- 세계수 생환부적

Boss-caused visible Item changes, including GLUTTONY, must use the current Boss/UI preview truth during Final preparation so the Player is assigning Items against the actual Final state.

### 4. Result

After all selected participants finish Final preparation:
- commit Final Lock
- snapshot the Final state
- resolve the existing single Final calculation once
- show the Final result

Do not add:
- attack selection
- combat QTE
- separate Final combat resource
- repeated turn-by-turn Boss battle
- a second post-preparation equipment screen

The climax is the consequence of:

```text
who was selected
+ what they actually received through valid Final preparation
+ their Run growth/condition
+ known Final Hazards
+ known Boss rule
```

## FINAL HAZARD THREAT

Each Final Hazard uses the same v2.7 Hazard Threat / defense / gap truth as ordinary expeditions with:

```text
Day = 30
Tier = T2
```

Exact threat ownership -> `DUNGEON_HAZARD_v2.7.0.md`.
No separate Final-only Hazard defense table.
No standalone inherited `scale=4.6` path is used in v2.7 Final resolution.

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

## v2.7 ACCEPTANCE OVERRIDES

Where inherited Final QA/playtest language conflicts, use these checks.

### FINAL-Q70 — D25 DISCLOSURE / D30 REUSE
PASS:
- exact two-Family state and Hazard Pool are generated/revealed/persisted on D25
- Save/Load cannot reroll them
- D30 uses the exact same state
- no new D30 generation path exists

### FINAL-Q71 — HAZARD THREAT SOURCE
PASS:
- each Final Hazard uses current D30/T2 threat and defense/gap truth from `DUNGEON_HAZARD_v2.7.0.md`
- no standalone old `scale=4.6` Final path survives

### FINAL-Q72 — MEAN GAP PENALTY
For each participant:
PASS exact:
```text
FinalMeanHazardGap = sum(gaps) / hazardCount
FinalHazardPenalty = FinalMeanHazardGap × 1.70
```

No inherited `환경피해 ×0.35` path contributes in parallel.

### FINAL-Q73 — INDIVIDUAL FINAL POWER
PASS exact:
```text
투력*.50 + 강인함*.34 + 기동*.27 + 정신*.20 - FinalMeanHazardGap*1.70
```
using the Boss modifier ordering owned by current BOSS.

### FINAL-Q74 — INSURANCE NO-OP
PASS:
- 구급키트 / 귀환석 / 세계수 생환부적 do not alter ordinary Final CLEAR/FAIL resolution
- Final prep clearly communicates no Final effect and blocks placement when practical
- normal SALE/ordinary expedition usefulness remains unchanged

### FINAL-Q75 — SELECT -> FIXED-PRICE PREP -> RESULT

Controlled D30 with three eligible survivors.

PASS exact Player-facing order:

```text
출전 NPC 선택
-> FINAL 준비
-> 결과
```

PASS:
- participant selection is confirmed before Final preparation begins
- selected participants are processed one at a time
- each uses exactly two Bag slots
- only the fixed 50% / 매입가 amount is used
- 100% / 150% choices are absent
- no purchase/refusal roll occurs
- Wallet affordability is real
- committed transfer consumes stock and reduces NPC Wallet by the exact fixed amount
- unaffordable Item cannot be committed
- committed Final transfers cannot be erased by Save/Load fishing
- no second free-equip screen exists
- after all selected participants finish, one Final Lock and one result occur

### FINAL-Q76 — FINAL ACCOUNTING BOUNDARY

Current approved PASS:
- inventory stock is actually consumed
- NPC Wallet is actually reduced by the fixed 50% / 매입가 amount
- GREED snapshot timing remains Final Lock after Final preparation

UNRESOLVED / DO NOT TEST AS PASS YET:
- whether committed Final transfers grant Player Gold
- whether committed Final transfers increase Gross Sales / GREED metric

Frozen QA must not choose either accounting interpretation to make implementation pass.

## v2.7 BALANCE QA

Measure separately:
- Mastery-0 early/first-clear attempts
- partially progressed Meta runs
- mature runs
- Final participant count 1/2/3
- Final successful-transfer/empty-slot distribution
- Boss clear rate by Boss
- Final Party Raw Power distribution
- Final Item quality and fixed transfer affordability

Do not auto-tune Final/Boss values during frozen QA.
Report `BALANCE FINDING` and run a separate approved tuning cycle.

## RELATED

Timeline/save -> `CORE_RUN_v2.7.0.md`
Hazard truth -> `DUNGEON_HAZARD_v2.7.0.md`
Item/Insurance -> `ITEM_v2.7.0.md`
Boss -> `BOSS_v2.7.0.md`
Relic D30 window -> `RELIC_v2.7.0.md`
Sale handling -> `SALE_v2.7.0.md`
Economy/Wallet -> `ECONOMY_ORDER_v2.7.0.md`
UI -> `UI_UX_v2.7.0.md`
