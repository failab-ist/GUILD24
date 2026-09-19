# v2.7 Integrated Balance + Decoration — 최종 Balance Proposal

CLASSIFICATION: `QA EVIDENCE` + `BALANCE FINDING` (§8)
STATUS: 제안만. **Production Source / Balance 변경 없음.**
MEASURED AT: `fb377b1` · harness-only override, 300 seeds/arm, 동일 Seed cohort
SCOPE: `SPEC_INDEX_v2.7.0.md` §CURRENT EXECUTION SCOPE — v2.7 유지 + Decoration Package 백포트
OWNER: `DUNGEON_HAZARD_v2.7.0.md`(Gate), `ECONOMY_ORDER_v2.7.0.md`(Wallet), `META_v2.8.0.md`(Decoration/Capital)

고정값은 전부 그대로다: Prepared Power weights, Death 계수/캡, Boss, Job Mastery, Bag 2,
Supply/Fatigue, ordinary pricing modes, Final rules. Gate = D10 이후 slope 0.40, Counter = 현행.

---

## 1. G0 vs G1 핵심 비교 (Decoration 0개, Fresh)

| policy | | G0 = A0.40 + 현재 Wallet | G1 = A0.40 + B175 |
|---|---|---|---|
| balanced | **파산 종료** | **47.3%** | 40.0% |
| | D30 | 2.7% | 6.7% |
| spender | 파산 종료 | 36.3% | 25.3% |
| | D30 | 8.0% | 10.0% |
| skilled | **파산 종료** | 22.0% | **5.3%** |
| | D30 | 7.3% | 8.7% |

G1은 Fresh 단계에서 이미 경제 실패를 크게 지운다. 특히 `skilled` S0에서 파산이 5.3%로,
Decoration을 하나도 사기 전에 경제 압력이 사실상 사라진다.

## 2. 추천 Wallet — **W0 (현재 Production Wallet 유지)**

근거는 §9 우선순위 순서 그대로다.

1. **Fresh 경제 실패 유지**: G0 balanced 47.3%로 "대략 절반" 방향에 부합. G1은 40.0%이고
   숙련 플레이에서는 5.3%까지 내려간다.
2. **Fresh D30 가능성 존재**: G0 balanced 2.7%, spender 8.0%, skilled 7.3% — 가능하지만
   흔하지 않다. 목표가 "Fresh 1Run D30 상시화"가 아니라는 방향과 맞는다.
3. **Decoration 성장 여지 보존**: G0는 S0→S4에서 D30이 2.7%→8.7%(balanced), 8.0%→18.0%
   (spender)로 열린다. G1은 그 출발점을 미리 올려 성장 폭을 소비한다.
4. **S4에서도 경제 실패 잔존**: G0 balanced S4 22.3% vs G1 10.7%.

Wallet 병목이 progression을 막지도 않는다 — G0에서도 Decoration 성장만으로 full-bag이
43.1%→52.4%(balanced), Wallet 부족 비중은 오르지만 D30은 3배로 열린다.

## 3. 추천 Bundle 최종안

```text
Late Gate Power : D1~D9 현행 유지, D10 이후 slope 1.70 -> 0.40
NPC Wallet      : 현행 유지 (150 + Level*8 + random(0,60), 누적, cap 2000)
Hazard Counter  : 현행 유지 (Main 16~18 / Lower 10~12 / Hybrid 6 / Epic 12~14)
```

Gate 단일 축 변경이다. 이것만으로 후반 preparedPower/GatePower 중앙값이
D20+ 구간에서 0.598 → 0.871로 회복되고 combatSuccess가 20.9% → 25.6%로 오른다.

## 4. S0 → S4 progression (G0)

D30 도달률 / 파산 종료율:

| policy | S0 | S1 counter | S2 +wall | S3 +sign | S4 +display |
|---|---|---|---|---|---|
| balanced | 2.7% / 47.3% | 4.0% / 50.0% | 8.0% / 26.7% | 9.3% / 20.3% | 8.7% / 22.3% |
| spender | 8.0% / 36.3% | 6.0% / 34.7% | 9.7% / 13.0% | 15.0% / 13.3% | 18.0% / 11.0% |
| skilled | 7.3% / 22.0% | 9.0% / 13.7% | 10.7% / 2.7% | 16.3% / 2.7% | 16.3% / **1.3%** |

후반 ratio는 세 policy 모두 S0 0.87~0.88 → S4 1.02~1.04로 오른다.
**aggregate 기준 D30 접근성 상승은 성립한다** (balanced ×3.2, spender ×2.3, skilled ×2.2).

## 5. 추천 Store Capital conversion rate — **Day-reach 5 / 15 / 30 / 45 / 60%**

```text
D1-9    =  5%
D10-19  = 15%
D20-24  = 30%
D25-29  = 45%
D30     = 60%
```

Canonical 구조 그대로 적용한다:
`Settlement Value = Ending Gold + 잔여 재고(기존 Closing 청산 기준)`,
`Store Capital Gain = Settlement Value × Day-reach rate`, Manual Abandon = 0,
Boss CLEAR 배수 없음.

Run당 Store Capital (G0 balanced): 보유 0개 **219G** → wall 656 → +counter 860 →
+sign 1,056 → 4개 1,070.

**farm 검증 통과.** `zero-supply` / `meta-farm` / `poverty` 전부 정산액 0G, 비율 **0.00**.
팔지 않거나 일찍 접는 전략은 자본을 만들지 못한다. 세 정산율 후보 모두 동일하게 통과했고,
가장 가파른 이 후보가 조기 종료를 가장 강하게 처벌한다.

## 6. 추천 초기 Decoration 가격

```text
wall    길드 제휴 현판       450G
sign    새벽배송 안내판     1300G
counter 알뜰 금고           1800G
display 프리미엄 쇼케이스   2300G
```

**이 가격표는 "가장 강한 장식이 가장 싸다"는 역전을 포함한다.** 그것이 의도가 아니라
§8-1 Finding의 결과다 — wall만 자본 곡선을 끌어올리므로, wall을 먼저 사지 않으면 나머지
셋이 사다리를 지탱할 자본을 만들지 못한다. 목표 스케줄을 맞추려면 현재로선 wall을 첫
구매로 만드는 가격밖에 없다. wall 효과를 조정하면 이 가격표도 함께 재산출해야 한다.

## 7. 예상 획득 Run (G0 balanced, 소유 장식의 복리 반영)

| | 1번째 | 2번째 | 3번째 | 4번째 |
|---|---|---|---|---|
| 획득 Run | **3** | **5** | **7** | **10** |
| 목표 | 1~3 | 4~7 (2~3개) | 4~7 | 8~12 |

전 구간 목표에 들어간다. D30 / Boss CLEAR는 구매 조건이 아니다 — Run당 219G는
평균 15~16일에 끝나는 Fresh Run이 만드는 값이다.

## 8. BALANCE FINDING

### 8-1. wall Decoration이 사실상 필수 선구매다 (§9-5 위반)

G0 balanced, 장식 하나씩만:

| | D25 | ratio(D20+) | combatSuc | 파산 | 매출 | Run당 자본 |
|---|---|---|---|---|---|---|
| 없음 | 7.7% | 0.871 | 25.6% | 47.3% | 8,101 | 219 |
| counter | 8.0% | 0.881 | 26.2% | 50.0% | 8,315 | 207 |
| **wall** | **13.3%** | **0.999** | **31.6%** | **22.3%** | **11,915** | **656** |
| sign | 12.3% | 0.890 | 27.0% | 49.7% | 8,896 | 262 |
| display | 9.7% | 0.862 | 25.8% | 52.3% | 8,156 | 215 |

**어디서 실패하는가**: wall만 복리 채널이다. 방문객 +1은 매일 판매 기회를 늘려
매출 → 재고·점포지원 → 보급 품질 → 생존으로 되먹임된다. counter(+250G 1회성),
sign(후보 폭), display(rare 가중)는 이 되먹임에 올라타지 못하고 Run당 자본을
207~262G에 묶어 둔다. 첫 구매는 wall 외에 의미가 없고, 나머지 셋의 순서는 무의미하다.

**최소 수정 방향** (셋 중 하나, 이번 작업에서 적용하지 않음):
- wall을 방문객 +1에서 "방문객 +1, 단 Day 상한" 같은 비복리 형태로 축소
- 나머지 셋을 복리 채널로 옮김 (예: counter를 1회성 +250G 대신 Day당 소액 지원)
- 네 Slot을 서로 다른 축으로 재배치해 wall만 경제 축을 독점하지 않게 함

### 8-2. wall Decoration + board 점포지원 중첩이 과도하다 (§8 확인 항목)

둘은 별개 시스템이고 정상 중첩된다(방문객 +2).

| G0 balanced | D25 | D30 | ratio | combatSuc | 파산 | Run당 자본 |
|---|---|---|---|---|---|---|
| +0 | 7.7% | 2.7% | 0.871 | 25.6% | 47.3% | 219 |
| +1 wall | 13.3% | 4.0% | 0.999 | 31.6% | 22.3% | 656 |
| **+2 wall+board** | **27.7%** | **11.3%** | **1.138** | **41.4%** | **11.3%** | ~1,580 |

**두 번째 +1이 첫 번째보다 크다.** ratio가 1.138로 Gate를 상시 상회하고 파산이 11.3%로
무너진다. G1에서는 4.3%까지 내려간다. 비선형 복리이므로 "각각 +1"이라는 설계 의도와
실제 결합 효과가 어긋난다. 8-1과 같은 뿌리이며, wall 축을 고치면 함께 완화된다.

### 8-3. skilled S4에서 경제 실패가 사실상 사라진다 (§9-4 경계)

G0 skilled: S0 22.0% → S2 2.7% → S4 **1.3%**. 추천안 G0에서도 숙련 플레이 + 4개 완성
조합에서는 파산이 남지 않는다. G1은 더 심하다(S0에서 이미 5.3%). 8-1을 고치면
이 항목도 함께 움직이므로 별도 수치 조정 대상으로 제안하지 않는다.

## 9. Unresolved / Insufficient sample

- **Boss**: D30 표본이 arm당 8~54건으로 Boss별 판정 불가. `INSUFFICIENT SAMPLE` 유지.
  §10에 따라 이번 결정의 STOP 사유로 취급하지 않았다. Boss Production 수치 변경 없음.
- **서로 다른 arm의 D30→CLEAR 전환율은 Boss 난이도 비교로 쓰지 않았다** — arm마다 D30까지
  살아남은 Party population이 다르다.
- **8-1 / 8-2의 수정 방향은 Design 결정**이다. 임의 수치를 적용하지 않았고, 방향만 제시했다.

## 10. 하지 않은 것

- Production Source / Balance 를 변경하지 않았다. 모든 후보는 런타임 override 후 복원이다.
- Gate / Wallet / Counter의 새 제3후보를 만들지 않았다.
- wall Decoration이 `board` 점포지원을 보유 처리·후보 제거·상호배타 처리하지 않는다.
  harness에 남아 있던 해당 처리는 제거했고, 방문객 증분만 부여한다.
- Fresh D30 수치를 최대화하는 안을 고르지 않았다.
