# FINAL_EXPEDITION

DOC=FINAL_EXPEDITION
OWNER=final,D30,final_party,final_hazard,final_power,final_clear,final_prereveal,final_preparation
DOC_VERSION=2.8.0
CURRENT_ROLE=HISTORICAL_BASE  # pre-consolidation v2.8 patch; current owner is design_ssot/FINAL_EXPEDITION_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=FINAL_EXPEDITION_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged Final party size, survivor fallback, no class synergy, Final Roll, Boss-state input, one-resolution structure, and stock/lock boundaries inherit `FINAL_EXPEDITION_v2.5.0.md`.

Although this owner remains versioned v2.7, SPEC_INDEX_v2.8.0.md routes it as the current Final owner.
Any cross-system ownership reference below resolves to the current routed v2.8 owner unless this file
explicitly freezes a Final-specific v2.7 rule.

This patch moves Family/Hazard disclosure to D25, replaces Final Hazard aggregation/power penalty, and makes D30 preparation reuse the familiar two-slot shop handling while overriding ordinary end-of-Run price negotiation/refusal.

Current Final exclusions from the inherited base chain:
- no D30 generation / first disclosure of the Final Family Pair
- no standalone `Final Hazard Scale = 4.6` formula
- no Individual Final Power path using `환경피해 × 0.35`
- no Final-preparation flow that skips the current preparation step
- no ordinary 50/100/150 Final price choice or Final refusal RNG

When this v2.7 owner is inherited by the current project SSOT, use the rules below only together with current routed overrides from `SPEC_INDEX_v2.8.0.md`.
Inherited cross-spec references to older versioned filenames are not routing authority.

## D25 FINAL STATE GENERATION — EXACT

On D25, before ordinary D25 management decisions that can use the information:

1. select exactly two distinct authoritative Dungeon Families using the existing seeded/fixed Final selection principle
2. read each selected Family's authoritative T2 Hazard keys from `DUNGEON_HAZARD_v2.8.0.md`
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

No D30 generation path may produce a different Pair/Pool.

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

Current v2.8 override to the inherited party-size rule:

```text
maxParticipants = 3

eligible >= 1
-> Player may choose 1..min(3, eligible) participants

eligible == 0
-> Run Fail
```

This supersedes the inherited `survivors >= 3 -> exactly 3` requirement.

A Player may intentionally attempt a 1- or 2-person clear even when 3 or more eligible adventurers exist.
This is a valid challenge-play route and is not treated as an error state.

No Final-only participant-count modifier is added:
- no underfill bonus
- no underfill penalty
- no person-count multiplier
- no auto-fill NPC
- no forced minimum of 3

The natural cost of bringing fewer adventurers is the lower summed Party Power.

Before commitment, selection/removal remains free within the 1..3 limit.

Selection-stage information:
- no combat forecast is shown while the party is still provisional;
- tell the Player that up to 3 adventurers may depart;
- tell the Player that the subjugation forecast becomes available after party commitment.

If the Player commits fewer than 3 participants, show one explicit confirmation before the boundary:

```text
3명보다 적은 인원으로 출전할까요?
선택한 {N}명만 마왕성으로 향합니다.

돌아가기 / 이대로 확정
```

When the Player confirms party selection and enters Final preparation:
- the participant set is committed for this Final attempt;
- participant swapping is no longer allowed;
- Final Item transfer cannot begin before this commitment;
- Save/Load must not erase committed Final transfers or reopen party selection after that boundary.

The Final resolver itself must enforce the same commitment boundary.
A UI bypass may not auto-commit a non-empty party.

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
-> Player Gold increases by the fixed amount
-> Gross Sales increases by the fixed amount exactly once
-> current Final preparation state updates
-> judge remaining slot
```

Exact ordinary SALE handling -> `SALE_v2.8.0.md`.
Exact fixed-price Wallet/Gold truth -> `ECONOMY_ORDER_v2.8.0.md`.

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
- if committed, Player Gold increases by exactly that fixed amount
- if committed, Gross Sales increases by exactly that fixed amount once
- sequential transaction state remains; do not convert the two slots into a bundle/cart checkout

Final preparation is not free equipment.
The Player may finish a participant with an empty slot / no additional transfer.

No normal future-customer queue is introduced inside Final preparation.
Only the already selected Final participants are processed.

### 2.1 Final subjugation forecast — party-wide

The ordinary one-NPC expedition forecast is not used in Final preparation.

Selection stage:
- show no `전투 전망`;
- show no individual failure-to-death percentage;
- show no one-NPC environment forecast as if it represented the Final party.

After party commitment, show exactly one party-wide qualitative forecast:

```text
토벌 전망 · {우세|접전|불리}
```

Exact explanation copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`.

The forecast:
- reads the entire committed party, whether it contains 1, 2 or 3 participants;
- uses each participant's current Final preparation state;
- uses the known D25 Final Hazards;
- uses the current Boss participant-side and Boss-side modifiers;
- updates after each committed Final Item transfer;
- consumes no Gameplay RNG;
- exposes no Final Power number, Boss Power number, exact success probability or Final Roll.

Reuse the existing shared qualitative forecast bands:

```text
ratio = current pre-roll Final Party Power / current effective Boss Power

ratio > 1.2   -> 우세
ratio >= 0.8  -> 접전
otherwise     -> 불리
```

The ratio is a preview only.
The actual result still resolves once with the authoritative Final Roll after Final Lock.

When the Player focuses an Item, that focused surface may show the target participant's concrete
before/after changes. It must not replace the one party-wide `토벌 전망`.

### FINAL ACCOUNTING — EXACT

A committed fixed-price Final transfer is a real paid transaction for economy accounting even though it does not use the ordinary customer haggling/refusal flow.

```text
NPC Wallet -= fixed Final transfer price
Player Gold += fixed Final transfer price
Gross Sales += fixed Final transfer price exactly once
```

GREED uses the resulting Gross Sales total at Final Lock after all selected Final participants finish preparation.
Do not exclude these transfers from GREED.
Do not double-count them in Final resolution.

### 3. Final-specific Item boundary

Items with no effect in the Demon Castle must be visibly blocked from Final Bag placement.

Current no-effect Insurance:
- 구급키트
- 귀환석
- 세계수 생환부적

Player-facing copy must not use the internal term `Final`.
Exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`.

Boss-caused visible Item changes must use the same current Final truth that resolution will use.
This applies to both the shelf summary and the focused Item preview; they may not contradict each other.

Audit all seven Bosses, including participant-side rules for PRIDE / ENVY / GLUTTONY / LUST.
The preview consumes no Gameplay RNG and mutates no Final state.

Final preparation has no ordinary SALE purchase/refusal roll.
A valid affordable transfer succeeds deterministically when:
- the party is committed;
- the target NPC is a committed participant;
- the target has an open Final Bag slot;
- the Item has an effect in the Demon Castle;
- the NPC Wallet covers the fixed Final price.

Ordinary SALE refusal dialogue / customer chatter does not appear in Final preparation.

If Wallet is insufficient, block the transfer and show the system reason with exact required and owned
Gold values. Exact copy -> `COPY_AUDIT_APPROVED_v2.8.0.md`.

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

Each Final Hazard uses the current Hazard Threat / defense / gap truth as ordinary expeditions with:

```text
Day = 30
Tier = T2
```

Exact threat ownership -> `DUNGEON_HAZARD_v2.8.0.md`.
No separate Final-only Hazard defense table.
No standalone `scale=4.6` path is used in Final resolution.

## FINAL HAZARD AGGREGATION — v2.7 BASELINE

`DIRECTOR DOCUMENT BASELINE`

For each participant:

```text
FinalMeanHazardGap
= sum(each Final Hazard gap) / Final Hazard Count

Final Hazard Penalty
= FinalMeanHazardGap × 1.70
```

Final uses this mean-gap penalty path.

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

Participant-side Boss modifiers still apply in the ordering owned by `BOSS_v2.8.0.md` before this participant's final contribution is summed where that Boss rule requires a changed Snapshot/Item contribution.

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

Player-facing Final preparation must use the approved Demon-Castle wording and block placing them into the Final Bag.

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

## CURRENT FINAL ACCEPTANCE

### FINAL-Q70 — D25 DISCLOSURE / D30 REUSE
PASS:
- exact two-Family state and Hazard Pool are generated/revealed/persisted on D25
- Save/Load cannot reroll them
- D30 uses the exact same state
- no new D30 generation path exists

### FINAL-Q71 — HAZARD THREAT SOURCE
PASS:
- each Final Hazard uses current D30/T2 threat and defense/gap truth from `DUNGEON_HAZARD_v2.8.0.md`
- no standalone `scale=4.6` Final path exists

### FINAL-Q72 — MEAN GAP PENALTY
For each participant:
PASS exact:
```text
FinalMeanHazardGap = sum(gaps) / hazardCount
FinalHazardPenalty = FinalMeanHazardGap × 1.70
```

No `환경피해 ×0.35` path contributes in parallel.

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

Controlled D30 across 1-, 2- and 3-person committed parties, including voluntary underfill when 3+ are eligible.

PASS exact Player-facing order:

```text
출전 NPC 선택
-> FINAL 준비
-> 결과
```

PASS:
- the Player may commit 1..min(3, eligible) participants; 0 eligible still fails
- fewer than 3 may be chosen intentionally even when 3+ are eligible
- a sub-3 commitment receives the explicit confirmation step
- no participant-count bonus/penalty/auto-fill exists
- participant selection is confirmed before Final preparation begins
- selected participants are processed one at a time
- each uses exactly two Bag slots
- only the fixed 50% / 매입가 amount is used
- 100% / 150% choices are absent
- no purchase/refusal roll or ordinary SALE dialogue occurs
- a valid affordable Final transfer succeeds deterministically
- Wallet affordability is real and an unaffordable Item gives a system reason
- committed transfer consumes stock and reduces NPC Wallet by the exact fixed amount
- unaffordable Item cannot be committed
- committed Final transfers cannot be erased by Save/Load fishing
- no second free-equip screen exists
- after all selected participants finish, one Final Lock and one result occur

### FINAL-Q76 — FINAL ACCOUNTING EXACT

For each committed Final transfer, PASS only if:
- inventory stock decreases by 1
- NPC Wallet decreases by the fixed 50% / 매입가 amount
- Player Gold increases by the same amount
- Gross Sales increases by the same amount exactly once
- GREED committed Gross Sales snapshot occurs at Final Lock after all Final preparation transfers
- no Final transfer is excluded from GREED Gross Sales
- no Final transfer is counted twice

### FINAL-Q77 — PARTY-WIDE SUBJUGATION FORECAST

PASS:
- no ordinary one-NPC `전투 전망` appears during Final party selection or preparation
- no individual failure-to-death percentage appears in Final preparation
- before commitment the Player sees the approved guidance that commitment unlocks the forecast
- after commitment exactly one party-wide `토벌 전망` appears
- 1-person, 2-person and 3-person parties each use the actual committed party
- the forecast updates after committed Final Item transfers
- it uses the actual known Final Hazards and current Boss modifiers
- it reuses the shared `우세 / 접전 / 불리` ratio bands without consuming RNG
- it exposes no internal Final Power / Boss Power / exact probability / Final Roll
- focused Item detail may show one participant's before/after delta without being labelled as the party forecast

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

Timeline/save -> `CORE_RUN_v2.8.0.md`
Hazard truth -> `DUNGEON_HAZARD_v2.8.0.md`
Item/Insurance -> `ITEM_v2.8.0.md`
Boss -> `BOSS_v2.8.0.md`
Relic D30 window -> `RELIC_v2.8.0.md`
Sale handling -> `SALE_v2.8.0.md`
Economy/Wallet/Gold -> `ECONOMY_ORDER_v2.8.0.md`
UI -> `UI_UX_v2.8.0.md`
