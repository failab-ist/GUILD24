# FINAL_EXPEDITION

DOC=FINAL_EXPEDITION
OWNER=final,D30,final_party,final_hazard,final_power,final_clear,final_prereveal,final_preparation
DOC_VERSION=2.9.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.9.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
CONSOLIDATED_FROM=history/FINAL_EXPEDITION_v2.8.0-patch.md,history/FINAL_EXPEDITION_v2.5.0.md
CONSOLIDATION_LEDGER=reports/ssot-consolidation/FINAL_EXPEDITION.md

## ROLE / NON-NEGOTIABLE

FINAL EXPEDITION은 별도의 새로운 전투 게임을 추가하는 시스템이 아니다.

D30 Final은 30일 동안 플레이어가:

- 어떤 NPC를 성장시켰는지
- 어떤 NPC를 살아남게 했는지
- 어떤 보급품을 확보했는지
- 공개된 두 Dungeon Family를 보고 누구에게 무엇을 준비시켰는지

를 기존 시스템으로 최종 평가하는 시험이다.

Final은 기존:

- NPC
- Stat / Growth
- Item / Equipment
- Trait / Condition
- Dungeon Family / Hazard
- Prepare

시스템을 재사용한다.

Final만을 위한 별도 Class Synergy, 전용 Combat System, 전용 생존 판정은 추가하지 않는다.

Boss Identity / Boss Trait / Sloth Seal state is owned by BOSS.
FINAL_EXPEDITION receives that Boss state as input and performs the existing Final resolution.

## FINAL TARGET

Final은 새로운 미니게임이 아니다.

30일 동안 쌓아온:

```text
NPC 성장
+ 생존
+ 재고 / 보급
+ Hazard 이해
+ 마지막 파티 선택
```

을 기존 시스템 그대로 압축해 평가한다.

좋은 Final은:

> 마지막 날에 갑자기 다른 게임을 하는 느낌

이 아니라:

> 지금까지 키우고 준비한 것들이 여기서 전부 쓰인다.

는 느낌이어야 한다.

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

Final Hazard Pool에는 각 Family의 authoritative **Hazard key**만 들어간다.
Family의 non-Hazard second axis는 별도 Final modifier로 중복 추가하지 않는다.
예: FIRE의 higher Dungeon Combat Power는 Final Hazard Pool에 들어가지 않으며, 마왕 자체의 강함 축은 effective Boss Power가 소유한다.

Family의 T2 정의 자체는 이 문서에서 재정의하지 않는다.

Authoritative:
→ DUNGEON_HAZARD

## D30 — REUSE D25 STATE

D30에는 일반 Gate 생성 로직을 사용하지 않는다.

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

## FAMILY DISCLOSURE

선택된 두 Family는 다음보다 먼저 공개한다.

- Final 출전 NPC 선택
- Final 보급품 / 준비 결정
- D30 Relic decision을 포함한 Final-relevant management decision

플레이어는 공개된 두 Family를 보고:

- 누구를 출전시킬지
- 어떤 NPC가 Hazard에 더 적합한지
- 어떤 보급품을 누구에게 줄지

판단할 수 있어야 한다.

Final에서 정확한 성공 확률이나 내부 Power Formula를 Player에게 직접 노출하지 않는다.

Player-facing 정보 공개 원칙은 기존 Design SSOT를 따른다.

## D30 PLAYER FLOW — EXACT

Player-facing Final flow is:

```text
마지막 발주
-> 출전 NPC 선택
-> FINAL 준비
-> 결과
```

(User 2026-09-25, recommended form taken while the User is away - to reconfirm.) D30 opens on the last order - the
ordinary order form, optional, confirmed on its own 발주 확정; `원정대 선택` moves on once no cart is pending. In 출전 NPC
선택 a roster card opens that adventurer's notebook (Stats, Traits, equipment, condition, expedition records) and the pick
or release is made from the notebook's footer. FINAL 준비 shows the Stat grid of the adventurer being supplied; the order
form is not repeated there.

Purpose:
Final must remain the culmination of the shop-management decisions learned during the Run rather than switching to an opaque separate combat interaction.

### Final party selection

```text
maxParticipants = 3

eligible
= alive
+ introduced (has visited the store at least once)
+ not in 중상 recovery (recovery Days remaining = 0)

eligible >= 1
-> Player may choose 1..min(3, eligible) participants

eligible == 0
-> Run Fail
```

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

### Final preparation — fixed 50% / 매입가 transfer

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

### Final subjugation forecast — party-wide

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

### Final-specific Item boundary

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

### Result

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

## FINAL PREP / LOCK / STOCK

필요한 Boss/Sloth reveal 이후, Final lock 전에는 기존 Design SSOT가 허용하는 Final-relevant 준비를 완료할 수 있다.

포함:
- 출전 NPC 선택
- 합법적인 Item / 보급품 준비
- D30 Relic decision
- 기타 기존 시스템이 허용하는 Final-relevant management choice

Food/Drink boundary (User 2026-09-24, v2.9.0):
- Food/Drink may still be chosen for their ordinary Stat/Counter/other authoritative effects
- authoritative ownership -> DUNGEON_HAZARD / ITEM

Final Lock 시점에 확정:
- 출전 NPC
- NPC Final Snapshot
- 적용 Item / Food·Drink Fatigue recovery state
- Final Family Pair
- Hazard preparation state
- Boss Trait application state
- ENVY target when applicable
- GREED committed gross-sales snapshot
- LUST trusted-regular state
- SLOTH sealBreakCount

Final lock 이후에는 Relic 구매나 일반 management action으로 이미 잠긴 Final state를 소급 변경할 수 없다.

D30 stock / expiry는 별도 Override가 없는 한 일반 Design SSOT stock/expiry 규칙을 따른다.
플레이어는 Final commitment 전에 해당 재고가 Final 준비에 실제 사용 가능한지 이해할 수 있어야 한다.

Authoritative stock / Relic / UI:
-> ITEM
-> RELIC
-> UI_UX

## NPC PREPARATION — `prepare` stat calculation

각 출전 NPC는 기존 `prepare` 로직을 사용한다.

Final 전용 대체 Prepare 계산을 만들지 않는다.

Prepare에는 기존 시스템에서 반영하는 요소를 그대로 사용한다.

예:

- 투력 (`combat`)
- 강인함 (`survival`)
- 기동 (`mobility`)
- 정신 (`spirit`)
- Equipment
- Food·Drink Fatigue recovery / Item
- Trait
- Injury / Fatigue 등 Condition

각 요소의 기본 계산 / Item Effect / Trait Effect / Hazard 계산은
각 owning Authoritative Design Spec을 따른다.

## FINAL CALCULATION ORDER

Shared order:

```text
1. locked NPC base/growth/current Condition state
2. locked Item / Food·Drink Fatigue recovery / equipment effects
3. Final Family Hazard preparation result
4. participant-side Boss Final Snapshot modifier
5. Individual Final Power
6. Party sum
7. Boss-side effective Boss modifier
8. Final Roll
9. CLEAR / FAIL
```

Participant-side Boss mechanics are owned by BOSS:
- PRIDE
- ENVY
- GLUTTONY raw-Stat Item adjustment
- LUST

Boss-side modifiers are owned by BOSS:
- GREED
- SLOTH

WRATH adds no special Boss modifier.

This ordering does not redefine the individual Boss mechanics.

## FINAL HAZARD THREAT

각 선택 Family는 해당 Family의 기존 T2 Hazard를 사용한다.

Each Final Hazard uses the current Hazard Threat / defense / gap truth as ordinary expeditions with:

```text
Day = 30
Tier = T2
```

Exact threat ownership -> `DUNGEON_HAZARD_v2.8.0.md`.
No separate Final-only Hazard defense table.
No standalone `scale=4.6` path is used in Final resolution.

Player-facing: the FINAL 확인된 위협 rows and the D25 scouting report read the numbered short row with this Day / Tier (`대응 29 필요 · {능력치} {n}당 대응 1 제공`); the mean-gap ×1.70 term stays hidden (User 2026-09-24, v2.9.0).

기존 v1 Boss의 고정 scale 5.5는 Final Hazard 계산에 사용하지 않는다.

역할 분리:

```text
마왕 자체의 강함 = effective Boss Power
환경 압박 = 선택된 두 Family의 T2 Hazard
```

Final이 별도의 T3 Dungeon처럼 동작하도록 만들지 않는다.

## FINAL HAZARD AGGREGATION

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

## INDIVIDUAL FINAL POWER

```text
Individual Final Power
= 투력 × 0.50
+ 강인함 × 0.34
+ 기동 × 0.27
+ 정신 × 0.20
- FinalMeanHazardGap × 1.70
```

이 계산에서:

- `투력`은 Player-facing `combat` Stat 용어다.

Final Power remains internal; do not expose it as a new Player Stat.

Participant-side Boss modifiers still apply in the ordering owned by `BOSS_v2.8.0.md` before this participant's final contribution is summed where that Boss rule requires a changed Snapshot/Item contribution.

## PARTY POWER

출전 NPC 전원의 Individual Final Power를 합산한다.

```text
Raw Party Power
=
Σ Individual Final Power
```

직업 다양성 / 직업 조합에 따른 Final 전용 Synergy Bonus는 없다.

기존 v1의:

```text
distinct Job 수에 따른 +3.5% 계열 보너스
```

는 사용하지 않는다.

특정 Job 조합을 Final의 고정 정답으로 만들지 않는다.

Party의 강점은 기존:

- Stats
- Growth
- Items
- Traits
- Conditions
- Hazard 대응

의 조합에서 나온다.

## FINAL ROLL

```text
Final Roll = 0.88 ~ 1.12
```

Party Power에 Final Roll 배율을 적용한다.

```text
Rolled Party Power
=
Raw Party Power × Final Roll
```

Do not retune it merely to make current baseline simulations hit a desired first-Run clear rate.

## BOSS CLEAR

Final 판정:

```text
Rolled Party Power >= effective Boss Power
→ 마왕 토벌 성공

Rolled Party Power < effective Boss Power
→ 마왕 토벌 실패
```

effective Boss Power는 Final의 마왕 자체 강함을 담당한다.

effective Boss Power exact numeric value -> `BOSS_v2.8.0.md`.

## RUN CLEAR / FAILURE

마왕 토벌 성공:

```text
즉시 Run Clear
```

마왕 토벌 성공 이후
일반 원정의 `resolve`를 다시 실행하지 않는다.

따라서 Final 성공 후 별도의:

- 개별 부상 판정
- 개별 중상 판정
- 개별 사망 판정
- 개별 생존 판정

으로 이미 성공한 마왕 토벌 결과를 뒤집지 않는다.

Final Clear 자체가 Run Victory다.

마왕 토벌 실패는 Run Clear가 아니다.

Display order (User 2026-09-25, v2.9.2 H5): on the ending tape one seal bearing the Boss's name is struck first - clean for a
clear, faint and crooked for a failure, never one per member and never the NIGHT death tape - and the existing result
sentence follows it. Result, wording and settlement are unchanged. Timing -> UI_UX_v2.8.0.md §FINAL RESULT — SEAL STAMP.

## FINAL INSURANCE VALUE — EXACT

The ordinary Final resolution does not run normal expedition Retreat/Injury/Severe/Death outcome resolution after the Boss check.
Therefore the following Insurance Items have no Final effect:

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

## BALANCE QA

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

### HAZARD PRESSURE

확인:

- Hazard 대응을 무시하고 투력 높은 NPC 3명만 고르는 것이 항상 유리하지 않은가?
- 반대로 Counter Item이 없으면 사실상 Clear 불가능한 강제세가 되지는 않는가?

목표:

```text
T2답게:
대응하면 확실히 유리하지만
반드시 특정 Counter를 요구하지는 않는다.
```

### BOSS POWER

확인:

- 정상적으로 성장시킨 3인 파티가 충분히 준비했을 때 현실적으로 Clear 가능한가?
- 아무 준비 없이 Level / 투력만 올려도 쉽게 뚫리지는 않는가?
- 장기 투자 NPC가 Last-day Random Newcomer보다 Final에서 의미 있게 작동하는가?

### 1~2인 PARTY

확인:

- 매우 잘 성장한 에이스 1~2명으로도 극단적으로 Final Clear가 가능한가?
- 1~2인 Clear를 시스템적으로 금지하지 않는다.
- 지나치게 쉽거나 사실상 절대 불가능할 때만 effective Boss Power / 계수를 검토한다.

### FINAL ROLL 0.88~1.12

확인:

- 30일 동안 준비한 결과가 마지막 ±12% 난수 때문에 과도하게 뒤집히지 않는가?
- 적정한 긴장감을 주는 정도인가?
- 플레이어가 `내 선택보다 운이 결정했다`고 느끼지 않는가?

문제가 있을 때만 Roll 범위를 재검토한다.

### TWO-FAMILY COMBINATION

확인:

- 어떤 두 Family 조합이 나와도 합리적인 준비 선택지가 존재하는가?
- 특정 조합만 지나치게 쉽거나 어렵지 않은가?
- 두 Family 압박 때문에 특정 NPC / Item 조합 하나만 사실상 정답이 되지 않는가?
- 기존 2-slot Preparation 구조 안에서 의미 있는 대응 Route가 남는가?

### FINAL STATE / SAVE STABILITY

확인:
- 선택된 두 Family가 Save/Load로 바뀌지 않는가?
- Save/Load가 Family reroll 수단이 되지 않는가?
- Final lock 이후 관리 행동이 이미 잠긴 결과를 바꾸지 않는가?

### FINAL PREP / STOCK TIMING

확인:
- 두 Family 공개 후 파티 / Item / D30 Relic 판단이 가능한가?
- D30 재고/유통기한 표시와 실제 Final 사용 가능 상태가 일치하는가?
- Player가 commitment 전에 사용할 수 없는 재고를 사용할 수 있다고 오해하지 않는가?


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
마지막 발주
-> 출전 NPC 선택
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

## IMPLEMENTATION GUARDRAIL

Final 구현은 기존 시스템을 최대한 재사용한다.

REUSE:

- 기존 Dungeon Family
- 기존 T2 Hazard
- 기존 Hazard Formula
- 기존 Prepare
- 기존 NPC Stats / Growth
- 기존 Equipment / Food·Drink 피로 회복
- 기존 Trait / Condition
- 기존 Final Roll 구조

REMOVE / DO NOT USE:

- 일반 D30 Gate 생성
- v1 Boss Hazard scale 5.5
- Final 전용 Job Diversity Synergy
- Boss Clear 후 일반 Expedition Resolve
- Clear 후 별도 생존 Gate

새 시스템을 추가하기 전에
기존 구조로 구현 가능한지 우선 확인한다.

## CROSS-SPEC OWNERSHIP

FINAL_EXPEDITION이 소유:

- D30 Final Flow
- Final Family 2종 Selection
- Family Disclosure Timing
- Final Hazard Pool 구성 방식
- Final Party 인원 규칙
- Final Power Formula
- Party 합산
- Final Roll
- Boss Clear 판정
- Run Clear / Fail 조건
- Final 전용 Balance / QA Contract

FINAL_EXPEDITION이 소유하지 않음:

Dungeon Family / T1-T3 Hazard 정의
→ DUNGEON_HAZARD

기본 Hazard Threat / Forecast / Counter
→ DUNGEON_HAZARD

NPC Stat / Growth / Trait / Roster
→ NPC_TRAIT

Item / Equipment / Counter Effect
→ ITEM

일반 Run Phase / Save
→ CORE_RUN

일반 Night Expedition Resolve
→ NIGHT_CLOSING

Final Presentation Layout / UI
→ UI_UX

Player-facing Voice / Copy
→ COPY_WORLD_VOICE

다른 Spec의 소유 Rule을 이 문서에 중복 정의하지 않는다.

## RELATED

Timeline/save -> `CORE_RUN_v2.8.0.md`
Hazard truth -> `DUNGEON_HAZARD_v2.8.0.md`
Item/Insurance -> `ITEM_v2.8.0.md`
Boss -> `BOSS_v2.8.0.md`
Relic D30 window -> `RELIC_v2.8.0.md`
Sale handling -> `SALE_v2.8.0.md`
Economy/Wallet/Gold -> `ECONOMY_ORDER_v2.8.0.md`
UI -> `UI_UX_v2.8.0.md`
