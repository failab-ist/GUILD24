# v2.7 FINAL BALANCE DECISION — PASS 1 결과

CLASSIFICATION: `QA EVIDENCE` + `BALANCE FINDING` (§8)
STATUS: 제안. **Production Source 변경 없음.** Canonical만 갱신했다.
MEASURED AT: harness-only override, 300 seeds/arm, 동일 Seed cohort
확정 적용: Gate slope 0.40 / Hazard Counter 현행 / wall 10% proc / counter +300G /
board base-roll 최소 4 / hub 30%·5%·65% + overheadBase +20%

---

## 0. 판단의 중심

이번 결정은 **전체 Run Balance**와 **cross-run progression** 두 축으로 내린다.
개별 Relic / Decoration 단독 arm 수치는 보조 진단이며, 그 자체로 Wallet이나 가격을
결정하지 않는다.

앞선 세 리포트가 좁혀 온 질문은 하나였다 — D20~D30 구간이 왜 닫혀 있는가.
Franchise Grade로도(`BALANCE_GRADE_ISOLATION`), Achievement 임계값으로도(`BALANCE_FIX1`),
EnvironmentDeathContribution으로도(`BALANCE_DEATH_CANDIDATES`) 열리지 않았고,
`BALANCE_POLICY_SENSITIVITY`가 원인을 preparedPower / GatePower 비율의 후반 붕괴로 지목했다.
**이번 Pass의 핵심은 그 지목에 대한 답이 실제로 작동하는지다.**

## 1. 전체 Run Balance — Gate slope가 후반 붕괴를 복구한다

balanced, Decoration 없음, 300 seeds:

| | 현행 slope 1.70 | **확정 slope 0.40** |
|---|---|---|
| D20 | 12.7% | 24.0% |
| D25 | 1.0% | 7.7% |
| D30 | 0.0% | 2.7% |
| **ratio(D20+) 중앙값** | **0.598** | **0.871** |
| combatSuccess | 20.9% | 25.6% |
| 원정당 Death | 0.1237 | 0.1124 |
| **파산 종료** | **47.7%** | **47.3%** |
| 매출 | 6,807 | 8,101 |

두 가지가 동시에 성립한다.

1. **후반 전투 균형이 초반 수준으로 복귀한다.** D20+ 구간의 preparedPower/GatePower 중앙값이
   0.598 → 0.871로, D1-9 밴드(0.86)와 같은 자리에 온다. 파티가 Run 내내 Gate에 비해
   약해지기만 하던 구조가 해소된다.
2. **경제는 건드리지 않는다.** 파산 종료가 47.7% → 47.3%로 사실상 불변이다.
   전투 축 하나만 움직였고 경제 실패 모드는 그대로 남았다.

D30이 0.0% → 2.7%가 된 것이 이 Pass의 실질이다 — **닫혀 있던 구간이 열렸고, 흔해지지는
않았다.**

## 2. Fresh S0 전체 Run 상태 (W0, 확정 Bundle)

| policy | D20 | D25 | D30 | ratio(D20+) | combatSuc | 파산 | 사망 | 매출 | 정산액 |
|---|---|---|---|---|---|---|---|---|---|
| balanced | 24.0% | 7.7% | 2.7% | 0.871 | 25.6% | 47.3% | 50.0% | 8,101 | 584 |
| spender | 39.0% | 16.7% | 8.0% | 0.878 | 27.3% | 36.3% | 55.7% | 10,257 | 913 |
| skilled | 50.7% | 19.3% | 7.3% | 0.883 | 26.9% | 22.0% | 70.7% | 11,683 | 1,507 |

세 policy 모두 후반 ratio가 0.87~0.88로 모이고, 종료 사유는 파산과 사망으로 갈린다.
정책 품질이 결과를 크게 바꾸되(D20 24%~51%) 어느 정책도 D30을 흔하게 만들지 않는다.

## 3. Cross-run progression — S0 → S4 (W0)

| policy | D25 | D30 | ratio(D20+) | full-bag | 파산 |
|---|---|---|---|---|---|
| balanced | 7.7% → 17.3% | 2.7% → **7.0%** | 0.871 → 0.916 | 43.1% → 46.7% | 47.3% → 47.0% |
| spender | 16.7% → 24.3% | 8.0% → **11.3%** | 0.878 → 0.922 | 49.7% → 53.6% | 36.3% → 29.7% |
| skilled | 19.3% → 27.7% | 7.3% → **14.0%** | 0.883 → 0.913 | 50.7% → 54.0% | 22.0% → 13.3% |

**세 policy 모두 aggregate D30 접근성이 오르고, 경제 실패는 남는다.**
이것이 `META_v2.8.0` §PROGRESSION TARGET이 요구한 신호다 —
Fresh Store가 첫 클리어 가능성을 유지한 채 Store 성장이 접근성을 밀어 올린다.

Store Capital 축적도 같은 방향이다: Run당 **219G(0개) → 419G(4개)**.
성장이 성장을 사는 구조이되, 배수는 1.9배로 폭주하지 않는다.

## 4. 추천 Wallet — **W0 (현재 Production Wallet 유지)**

Fresh S0 → Full S4:

| policy | | W0 (현재) | W1 (B175) |
|---|---|---|---|
| balanced | 파산 | **47.3% → 47.0%** | 40.0% → 32.0% |
| | D30 | 2.7% → 7.0% | 6.7% → 10.0% |
| spender | 파산 | 36.3% → 29.7% | 25.3% → 19.0% |
| | D30 | 8.0% → 11.3% | 10.0% → 14.0% |
| skilled | 파산 | 22.0% → 13.3% | **5.3% → 4.3%** |
| | D30 | 7.3% → 14.0% | 8.7% → 14.3% |

근거는 전부 전체 Run / cross-run 축이다.

1. **D30 종착점은 두 안이 사실상 같다** (W0 7~14%, W1 10~14%). 차이는 출발점이다.
2. **W0는 성장 폭이 크다** — balanced ×2.6, skilled ×1.9. W1은 Fresh에서 이미 올라가
   Decoration이 채울 자리를 미리 소비한다.
3. **W0는 4개를 다 갖춰도 balanced 파산 47.0%로 경제 압력을 유지한다.**
   W1 skilled는 S0에서 이미 5.3%로 경제 실패 모드가 사라진다.
4. **Wallet 병목이 progression을 막지 않는다** — W0에서도 full-bag 43.1%→46.7%,
   D25 7.7%→17.3%로 열린다. 병목이라면 Decoration 성장이 이만큼 전달되지 않는다.

## 5. Decoration 세트 균형 — 필수픽 없음

balanced, 단독 장착 (W0):

| | D25 | D30 | 파산 | 매출 | 정산액 |
|---|---|---|---|---|---|
| 없음 | 7.7% | 2.7% | 47.3% | 8,101 | 584 |
| counter (+300G) | 9.7% | 3.7% | 48.7% | 8,424 | 650 |
| wall (10% proc) | 10.0% | 5.3% | 49.7% | 8,621 | 720 |
| sign (후보 +1) | 12.3% | 3.7% | 49.7% | 8,896 | 770 |
| display (rare 가중) | 9.7% | 4.0% | 52.3% | 8,156 | 561 |

정산액 스프레드 561~770(**1.37배**), 최고는 wall이 아니라 sign이다.
이전 Pass의 "wall 압도적 필수픽" FAIL 조건은 10% proc 설계 변경으로 해소되었다.

## 6. 추천 Store Capital rate / Decoration 가격 / 획득 Run

**Day-band conversion rate — 5 / 15 / 30 / 45 / 60%**

```text
D1-9 = 5%   D10-19 = 15%   D20-24 = 30%   D25-29 = 45%   D30 = 60%
```

Canonical 구조 그대로: `Ending Gold + 잔여 재고(기존 Closing 청산 기준)` × Day-reach rate,
Manual Abandon = 0, Boss CLEAR 배수 없음.

**farm 검증 통과** — `zero-supply` / `meta-farm` / `poverty` 전부 정산액 0G, 비율 **0.00**.
팔지 않거나 일찍 접는 전략은 자본을 만들지 못한다. 가장 가파른 이 후보가 조기 종료를
가장 강하게 처벌한다.

**초기 가격**

```text
sign 800G   wall 700G   counter 650G   display 550G
```

스프레드 1.45배. 단독 효과 차이가 1.37배뿐이므로 가격 차이가 그보다 크면 가격이 선택을
대신 결정한다.

**획득 Run**

| 구매 순서 | 1번째 | 2번째 | 3번째 | 4번째 |
|---|---|---|---|---|
| 강한 것부터 (sign → wall → counter → display) | 4 | 6 | 8 | **10** |
| 약한 것부터 (display → counter → wall → sign) | 3 | 6 | 9 | **11** |
| 목표 | 1~3 | 4~7 | 4~7 | 8~12 |

**어느 순서로도 성장이 붕괴하지 않는다** — 차이는 최대 1~2 Run, 4개 완성은 양쪽 다
목표 밴드(8~12) 안이다. 3번째가 8~9로 밴드를 1~2 Run 넘기지만 2개 보유 시점은 양쪽 다
Run 6으로 밴드 안이다.

## 7. Visitor 구성 진단 (보조)

balanced 300 seeds, 단일 소스 arm. **Run Balance 판정 근거가 아니라 역할 분리 확인용이다.**

| | 방문객/일 | D25 | 파산 | 매출 | 정산액 |
|---|---|---|---|---|---|
| 없음 | 4.44 | 7.7% | 47.3% | 8,101 | 584 |
| board | 4.70 | 10.0% | 43.0% | 9,127 | 807 |
| hub | 4.75 | 6.7% | 60.0% | 7,685 | 476 |
| wall | 4.50 | 10.0% | 49.7% | 8,621 | 720 |
| 셋 전부 | 5.08 | 11.0% | 50.3% | 9,885 | 1,112 |

§8 확인 항목 판정:
- **wall 필수픽 재발 없음** — 방문객 +0.06/일로 세 소스 중 가장 작다.
- **board 저점 안정화 확인** — 유일하게 파산을 낮춘다(47.3% → 43.0%).
- **hub는 board의 상위호환이 아니다** — 방문객은 가장 많이 늘리고 비용을 실제로 치른다.
- **중첩으로 경제 실패가 붕괴하지 않는다** — 셋 전부에서도 파산 50.3%로 기준선보다 높다.

## 8. BALANCE FINDING / UNRESOLVED

### FINDING (낮은 우선순위) — hub의 비용 대비 회수

hub 단독 arm에서 파산 47.3% → 60.0%, 정산액 584 → 476, D25 7.7% → 6.7%.
역할(비용 감수 확장)은 Canonical 의도대로 작동하나, 치른 비용만큼 돌려받지 못한다.

**이 진단의 한계를 함께 적는다**: 단일 정책(balanced)·단일 Relic arm·300 seeds이며,
실제 플레이에서 Relic은 매 창마다 제시된 3개 중 고르는 **빌드 선택**이다. 약한 Relic 하나는
빌드 선택 문제이지 Run Balance 실패가 아니다. 전체 Run Balance(§1~§3)와 progression(§3, §6)
판정은 이 항목과 무관하게 성립한다.

`overheadBase +20%`는 User 확정 수치이므로 **조정하지 않았다.** 방향만 기록한다 —
비용 인하 / 확률 상향 / 운영비를 방문객이 실제 증가한 Day에만 부과. Design 결정이며,
다음 Pass의 Source 구현을 막지 않는다.

### UNRESOLVED

- **Boss**: D30 표본이 arm당 8~42건으로 Boss별 판정 불가. `INSUFFICIENT SAMPLE` 유지.
  이번 결정의 STOP 사유로 취급하지 않았다.

### 하지 않은 것

- Production Source를 변경하지 않았다. 모든 후보는 런타임 override 후 복원이다.
- Gate / Wallet / Hazard Counter / Decoration / Relic의 새 후보를 만들지 않았다.
- Decoration 효과를 위해 Relic id를 facilities에 주입하거나 보유 처리·후보 제거·slot 소비를
  하지 않는다. 이전 Pass harness에 남아 있던 그 처리는 제거했다.
- 확률 판정은 Run seed와 Day로 파생한 별도 스트림에서 뽑아 비교 대상 외 RNG가 밀리지 않게
  했다. 이 스트림 분리는 측정 장치이며 Production Design으로 승격하지 않는다.
