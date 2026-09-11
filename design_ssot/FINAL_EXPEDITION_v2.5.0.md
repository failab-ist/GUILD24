# 《던전 앞 편의점 / GUILD24》

DOC=FINAL_EXPEDITION
OWNER=final,D30,final_party,final_hazard,final_power,final_clear
# FINAL EXPEDITION — AUTHORITATIVE DESIGN SPEC

DOC_VERSION=2.5.0  
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.5.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

---

# 0. ROLE / NON-NEGOTIABLE

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


v2.5 Boss Identity / Boss Trait / Sloth Seal state is owned by BOSS.
FINAL_EXPEDITION receives that Boss state as input and performs the existing Final resolution.


---

# 1. D30 FINAL STRUCTURE

D30에는 일반 Gate 생성 로직을 사용하지 않는다.

Final 시작 시:

1. 서로 다른 기존 Dungeon Family 2개를 랜덤 선택한다.
2. 선택된 두 Family를 플레이어에게 공개한다.
3. Family 공개는 D30 Relic decision / Sloth Seal decision보다 먼저 이루어진다.
4. 공개 이후 Final 파티 선택 및 최종 준비가 가능하다.
5. 각 Family의 기존 T2 Hazard를 가져온다.
6. 두 Family의 T2 Hazard를 하나의 Final Hazard Pool로 합쳐 사용한다.
7. 선택된 Family 조합은 생성된 Final state이며 Save/Load로 다시 뽑히지 않는다.

Final Hazard Pool에는 각 Family의 authoritative **Hazard key**만 들어간다.
Family의 non-Hazard second axis는 별도 Final modifier로 중복 추가하지 않는다.
예: FIRE의 higher Dungeon Combat Power는 Final Hazard Pool에 들어가지 않으며, 마왕 자체의 강함 축은 effective Boss Power가 소유한다.

Family의 T2 정의 자체는 이 문서에서 재정의하지 않는다.

Authoritative:
→ DUNGEON_HAZARD

---

# 2. FINAL HAZARD PRESSURE

각 선택 Family는 해당 Family의 기존 T2 Hazard를 사용한다.

Final Hazard Pool의 Hazard severity는 D30의 기존 T2 산식에 따른다.

기존 산식:

```text
scale = 1 + day × 0.10 + (tier - 1) × 0.6
```

D30 / T2:

```text
1 + 30 × 0.10 + (2 - 1) × 0.6
= 4.6
```

따라서:

```text
Final Hazard Scale = 4.6
```

기존 v1 Boss의 고정 scale 5.5는 Final Hazard 계산에 사용하지 않는다.

역할 분리:

```text
마왕 자체의 강함 = effective Boss Power
환경 압박 = 선택된 두 Family의 T2 Hazard
```

Final이 별도의 T3 Dungeon처럼 동작하도록 만들지 않는다.

---

# 3. FAMILY DISCLOSURE

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

---

# 4. FINAL PARTY

Final 출전 인원 최대값:

```text
maxParticipants = 3
```

생존 NPC 수에 따라:

```text
survivors >= 3
→ 플레이어가 직접 정확히 3명 선택

survivors == 2
→ 2명으로 출전

survivors == 1
→ 1명으로 출전

survivors == 0
→ Run Fail
```

1~2인 출전에 별도의 보정이나 인원수 패널티를 추가하지 않는다.

적은 인원으로 인해 합산 Power가 낮아지는 것 자체가 자연스러운 불리함이다.

Final 전용:

- Underfill Bonus
- Person-count Multiplier
- 강제 최소 3인
- 부족 인원 자동 NPC 보충

을 추가하지 않는다.

---

# 4.1 FINAL PREP / LOCK / STOCK

D30 Family disclosure와 필요한 Boss/Sloth reveal 이후, Final lock 전에는 기존 Design SSOT가 허용하는 Final-relevant 준비를 완료할 수 있다.

포함:
- 출전 NPC 선택
- 합법적인 Item / 보급품 준비
- D30 Relic decision
- 기타 기존 시스템이 허용하는 Final-relevant management choice

Supply Burden boundary:
- D30 Final does not roll an additional random Supply Burden modifier
- Food/Drink may still be chosen for their ordinary Stat/Counter/other authoritative effects
- no Final-only Supply requirement is invented
- authoritative ownership -> DUNGEON_HAZARD / ITEM

Final Lock 시점에 확정:
- 출전 NPC
- NPC Final Snapshot
- 적용 Item / Supply state
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

# 5. NPC PREPARATION

각 출전 NPC는 기존 `prepare` 로직을 사용한다.

Final 전용 대체 Prepare 계산을 만들지 않는다.

Prepare에는 기존 시스템에서 반영하는 요소를 그대로 사용한다.

예:

- 투력 (`combat`)
- 강인함 (`survival`)
- 기동 (`mobility`)
- 정신 (`spirit`)
- Equipment
- Supply / Item
- Trait
- Injury / Fatigue 등 Condition
- Final Hazard Pool에 대한 환경피해 (`hazard`)

각 요소의 기본 계산 / Item Effect / Trait Effect / Hazard 계산은
각 owning Authoritative Design Spec을 따른다.

---


# 5.1 FINAL CALCULATION ORDER

Shared order:

```text
1. locked NPC base/growth/current Condition state
2. locked Item / Supply / equipment effects
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
Final Power remains internal and is not introduced as a Player-facing Stat.

# 6. INDIVIDUAL FINAL POWER

각 출전 NPC의 Final Power는 기존 v1 Final 공식을 재사용한다.

```text
Individual Final Power
=
  투력 × 0.58
+ 강인함 × 0.32
+ 기동 × 0.24
+ 정신 × 0.16
- 환경피해 × 0.35
```

이 계산에서:

- `투력`은 Player-facing `combat` Stat 용어다.
- `환경피해`는 Prepare가 Final Hazard Pool을 기준으로 계산한 값이다.
- Final Power는 내부 계산값이며 별도 Player Stat으로 추가하지 않는다.

---

# 7. PARTY POWER

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

---

# 8. FINAL ROLL

기존 Final Roll을 유지한다.

```text
Final Roll = 0.88 ~ 1.12
```

Party Power에 Final Roll 배율을 적용한다.

```text
Rolled Party Power
=
Raw Party Power × Final Roll
```

Roll 범위는 현재 구조의 시작값이며
Full Run Playtest에서 체감 검증한다.

---

# 9. BOSS CLEAR

Final 판정:

```text
Rolled Party Power >= effective Boss Power
→ 마왕 토벌 성공

Rolled Party Power < effective Boss Power
→ 마왕 토벌 실패
```

effective Boss Power는 Final의 마왕 자체 강함을 담당한다.

effective Boss Power exact numeric value는 현재 구조 확정값이 아니다.

Full Run Balance 결과를 보고 조정한다.

---

# 10. RUN CLEAR / FAILURE

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

생존 NPC 0명으로 Final에 진입하면 즉시 Run Fail이다.

---

# 11. PLAYTEST / BALANCE CONTRACT

구조는 위 규칙으로 고정한다.

아래 항목의 Exact Numeric은 Full Run Playtest로 검증한다.

---

## A. HAZARD PRESSURE

확인:

- `환경피해 × 0.35`가 실제로 두 T2 Family를 고려하게 만드는가?
- Hazard 대응을 무시하고 투력 높은 NPC 3명만 고르는 것이 항상 유리하지 않은가?
- 반대로 Counter Item이 없으면 사실상 Clear 불가능한 강제세가 되지는 않는가?

목표:

```text
T2답게:
대응하면 확실히 유리하지만
반드시 특정 Counter를 요구하지는 않는다.
```

---

## B. BOSS POWER

확인:

- 정상적으로 성장시킨 3인 파티가 충분히 준비했을 때 현실적으로 Clear 가능한가?
- 아무 준비 없이 Level / 투력만 올려도 쉽게 뚫리지는 않는가?
- 장기 투자 NPC가 Last-day Random Newcomer보다 Final에서 의미 있게 작동하는가?

effective Boss Power는 Full Run 결과를 보고 최종 튜닝한다.

---

## C. 1~2인 PARTY

확인:

- 매우 잘 성장한 에이스 1~2명으로도 극단적으로 Final Clear가 가능한가?
- 1~2인 Clear를 시스템적으로 금지하지 않는다.
- 지나치게 쉽거나 사실상 절대 불가능할 때만 effective Boss Power / 계수를 검토한다.

우선 추가하지 않는 것:

- 인원수 전용 Bonus
- 인원수 전용 Penalty
- 강제 인원 보정 System

---

## D. FINAL ROLL 0.88~1.12

확인:

- 30일 동안 준비한 결과가 마지막 ±12% 난수 때문에 과도하게 뒤집히지 않는가?
- 적정한 긴장감을 주는 정도인가?
- 플레이어가 `내 선택보다 운이 결정했다`고 느끼지 않는가?

문제가 있을 때만 Roll 범위를 재검토한다.

---

## E. TWO-FAMILY COMBINATION

확인:

- 어떤 두 Family 조합이 나와도 합리적인 준비 선택지가 존재하는가?
- 특정 조합만 지나치게 쉽거나 어렵지 않은가?
- 두 Family 압박 때문에 특정 NPC / Item 조합 하나만 사실상 정답이 되지 않는가?
- 기존 2-slot Preparation 구조 안에서 의미 있는 대응 Route가 남는가?

---

## F. FINAL STATE / SAVE STABILITY

확인:
- 선택된 두 Family가 Save/Load로 바뀌지 않는가?
- Save/Load가 Family reroll 수단이 되지 않는가?
- Final lock 이후 관리 행동이 이미 잠긴 결과를 바꾸지 않는가?

## G. FINAL PREP / STOCK TIMING

확인:
- 두 Family 공개 후 파티 / Item / D30 Relic 판단이 가능한가?
- D30 재고/유통기한 표시와 실제 Final 사용 가능 상태가 일치하는가?
- Player가 commitment 전에 사용할 수 없는 재고를 사용할 수 있다고 오해하지 않는가?

# 12. IMPLEMENTATION GUARDRAIL

Final 구현은 기존 시스템을 최대한 재사용한다.

REUSE:

- 기존 Dungeon Family
- 기존 T2 Hazard
- 기존 Hazard Formula
- 기존 Prepare
- 기존 NPC Stats / Growth
- 기존 Equipment / Supply
- 기존 Trait / Condition
- 기존 Final Power Formula
- 기존 Final Roll 구조

REMOVE / DO NOT USE:

- 일반 D30 Gate 생성
- v1 Boss Hazard scale 5.5
- Final 전용 Job Diversity Synergy
- Boss Clear 후 일반 Expedition Resolve
- Clear 후 별도 생존 Gate

새 시스템을 추가하기 전에
기존 구조로 구현 가능한지 우선 확인한다.

---

# 13. CROSS-SPEC OWNERSHIP

FINAL_EXPEDITION이 소유:

- D30 Final Flow
- Final Family 2종 Selection
- Family Disclosure Timing
- Final Hazard Pool 구성 방식
- Final Hazard Scale 4.6
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

---

# 14. FINAL TARGET

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
