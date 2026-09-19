# BALANCE FINDING — v2.7 META 구현 완료 후 cross-run 진행도

CLASSIFICATION: `BALANCE FINDING`
STATUS: 기록만. 어떤 `DIRECTOR DOCUMENT BASELINE` 값도 조정하지 않음.
MEASURED AT: `1dd86d1` (Step 22 CLOSED / Step 0b 완료 이후, v2.7 채택 전량 반영)
선행 문서: `reports/BALANCE_FINDING_v2_7_DEATH.md` §5 재측정 조건
OWNER: `META_v2.7.0.md`, `DUNGEON_HAZARD_v2.7.0.md`

---

## 0. 결론 먼저

`BALANCE_FINDING_v2_7_DEATH.md` §5가 건 조건 —
**"Progressed Account에서도 D30 도달이 사실상 불가능하면 BALANCE FINDING으로 다시 보고한다"** —
가 충족되었다. 동일 Account를 12 Run 이어간 cross-run 측정에서 D30 도달은 480 Run 중 2회(0.4%),
Boss CLEAR는 40 Account 중 1개(첫 Run, Grade 1)뿐이다. Run을 거듭해도 D30 도달률은 오르지 않는다.

## 1. 측정 방법

`Debug.trajectory({trajectories:40, runs:12, prefix:'v27-balance', contract:'best'})`
— 40개 Account가 각각 12 Run을 **같은 Account로 이어서** 플레이. Franchise Achievement / Grade는
실제 플레이 결과로만 누적되며 시드하지 않는다. 각 Run 시작 시점의 실제 Grade로 집계한다.

Director 확정사항(Step 20~21 확인)에 따라, 아래 controlled Grade fixture(`tests/progression.cjs`)는
이 cross-run 측정의 대체물이 아니라 Grade 단독 기여를 보기 위한 별도 대조군으로만 쓴다.
부분 실행에서 나온 Late Meta 2.3% / Near-complete Meta 3.7%는 Grade가 전부 1이던 중간 측정이므로
판정 근거로 사용하지 않았다.

## 2. Run index별 D10 / D20 / D30 도달률

| Run | D10 | D20 | D30 | 평균 Grade | 평균 실적 | 사망 종료 | 원정당 Death |
|---|---|---|---|---|---|---|---|
| 1 | 97.5% | 17.5% | 2.5% | 1.00 | 0.0 | 55.0% | 0.1157 |
| 2 | 87.5% | 12.5% | 0.0% | 1.75 | 2.0 | 45.0% | 0.1166 |
| 3 | 97.5% | 10.0% | 0.0% | 2.13 | 3.1 | 45.0% | 0.1115 |
| 4 | 87.5% | 12.5% | 0.0% | 2.17 | 3.2 | 52.5% | 0.1156 |
| 5 | 92.5% | 22.5% | 0.0% | 2.25 | 3.3 | 67.5% | 0.1186 |
| 6 | 90.0% | 17.5% | 2.5% | 2.42 | 3.5 | 55.0% | 0.1123 |
| 7 | 95.0% | 22.5% | 0.0% | 2.63 | 3.7 | 65.0% | 0.1147 |
| 8 | 82.5% | 17.5% | 0.0% | 2.73 | 3.8 | 55.0% | 0.1179 |
| 9 | 90.0% | 7.5% | 0.0% | 2.80 | 3.9 | 52.5% | 0.1192 |
| 10 | 95.0% | 35.0% | 0.0% | 2.88 | 4.0 | 82.5% | 0.1043 |
| 11 | 87.5% | 22.5% | 0.0% | 2.98 | 4.4 | 50.0% | 0.1085 |
| 12 | 95.0% | 15.0% | 0.0% | 2.98 | 4.6 | 75.0% | 0.1196 |

D10은 82~98%로 평탄하고, D20은 7.5~35% 사이에서 진동하며 추세를 만들지 않는다.
D30은 Run 1과 Run 6에서 각 1회(2.5%) 발생한 뒤 그 외 전 구간 0%다.
**Meta 누적이 D20 벽을 밀어내지 못한다.**

## 3. 실제 Franchise Grade별 D30 도달률

| Grade | Run 수 | D30 | Boss CLEAR | 사망 종료 | 원정당 Death |
|---|---|---|---|---|---|
| 1 | 54 | 1.9% | 1.9% | 55.6% | 0.1174 |
| 2 | 201 | 0.5% | 0.0% | 50.7% | 0.1189 |
| 3 | 212 | 0.0% | 0.0% | 66.0% | 0.1102 |
| 4 | 9 | 0.0% | 0.0% | 77.8% | 0.1156 |
| 5 | 4 | 0.0% | 0.0% | 25.0% | 0.1057 |
| 6 | 0 | — | — | — | — |

Grade가 올라갈수록 D30이 **떨어진다**. 이는 Grade가 해롭다는 뜻이 아니라 표본 구성 때문이다 —
Grade 1은 전부 Run 1이고, Run 1은 Fresh Account라 12 Run 중 D30 2회 중 1회가 여기서 나왔다.
실질적으로 읽어야 할 것은 **Grade 2~5 전 구간에서 D30이 0~0.5%라는 점**이다.

Grade 6(Franchise 10/10)은 480 Run 동안 **한 번도 도달되지 않았다**. 최종 Account Grade 분포는
`{1:0, 2:2, 3:36, 4:1, 5:1, 6:0}` — 12 Run을 마친 뒤에도 90%가 Grade 3(Franchise 4~5개)에 정체한다.
Grade 6이 주는 ORDER -10%는 현재 도달 가능한 상태가 아니다.

## 4. 첫 Boss CLEAR

| 항목 | 값 |
|---|---|
| CLEAR한 Account | 40개 중 **1개** |
| 첫 CLEAR Run index | 1 (median 1, range 1–1) |
| 첫 CLEAR 당시 Franchise Grade | **1** (median 1, range 1–1) |
| 첫 CLEAR 당시 실적 수 | 0 |

유일한 CLEAR가 Meta가 전혀 없는 첫 Run에서 나왔다. 즉 현재 Boss CLEAR는 **Meta 누적의 보상이
아니라 시드 운**이다. "Run을 반복해 Meta를 쌓아 Boss에 도달한다"는 progression 계약이
측정상 성립하지 않는다.

## 5. 사망 종료 Run 비율 / 원정당 Death rate

- 사망 종료: Run별 45.0% ~ 82.5%, 12 Run 평균 **58.3%**. Run index에 따른 감소 추세 없음.
- 원정당 Death rate: **0.1043 ~ 0.1196** (전 구간 약 11~12%). Grade별로도 0.1057~0.1189로 평탄하다.

`BALANCE_FINDING_v2_7_DEATH.md`가 기록한 15.3%보다는 낮아졌다(Meta 지출·Grade 할인·보급 여력 증가
때문). 그러나 Death rate는 **Grade에 거의 반응하지 않는다** — Grade 1과 Grade 5의 차이가 1.2%p다.

## 6. 대조군 — controlled Grade fixture

`node tests/progression.cjs` (`franchise: 0/2/4/6/8` 시드로 Grade 1~5 강제, arm 3종 × 300 Run):

| tier | Grade | 정책 | D10 | D20 | D30 |
|---|---|---|---|---|---|
| Fresh First Run | 1 | 숙련+지출 | 97.7% | 26.7% | 0.0% |
| Early Meta | 2 | 숙련+지출 | 97.3% | 28.0% | 0.0% |
| Mid Meta | 3 | 숙련+지출 | 98.0% | 36.0% | 1.3% |
| Late Meta | 4 | 숙련+지출 | 99.7% | 61.3% | 3.7% |
| Near-complete Meta | 5 | 숙련+지출 | 99.3% | 76.0% | **12.3%** |

controlled fixture에서는 Meta가 **작동한다** — D20이 26.7% → 76.0%, D30이 0% → 12.3%로 오른다.
이 fixture는 Mastery(0→35)와 해금 상품(distinct 0→7)까지 함께 시드한다.

두 측정의 차이가 문제의 위치를 지목한다:
**Meta 자체의 효과 곡선이 약한 것이 아니라, 실제 플레이로 그 tier에 도달하지 못한다.**
cross-run 12 Run 후 실제 도달치는 Grade 3 / Mastery 0 / distinct 0 — 위 표의 `Mid Meta` 행보다도
낮다. Mastery와 상품 해금이 전혀 누적되지 않는 것이 Grade 정체보다 큰 격차다.

## 7. 분류 근거 — 왜 IMPLEMENTATION BUG가 아닌가

- Franchise Grade 파이프라인은 정상 동작한다. controlled fixture에서 `franchise 0 → Grade 1 / ORDER -0%`
  … `franchise 8 → Grade 5 / ORDER -8%`가 확인되며, cross-run에서도 Grade가 1 → 2.98로 실제 누적된다.
- Death 모델은 `DUNGEON_HAZARD_v2.7.0` §DEATH RISK Canonical 그대로다 (Director 확정사항 1).
- D30 미도달은 단일 시스템의 오작동이 아니라 Death rate 11~12%가 Run당 수십 회의 원정에
  걸쳐 누적되는 생존 곡선의 결과다 (후속 2,400 Run 측정에서 실측 Run당 74.5~79.2 원정,
  `BALANCE_DEATH_CANDIDATES_v2_7.md` §8). 어느 값이 Canonical과 어긋났다는 근거가 없다.

  정정: 이 줄은 최초 게시 시 "Run당 ~9 원정"이라고 적었다. 그것은 원정 횟수가 아니라 Run당
  사망자 수에 가까운 값이었고, 원정 횟수와 혼동한 표현이었다. 측정값 자체는 영향이 없다.

따라서 `IMPLEMENTATION BUG`가 아니라 `BALANCE FINDING`으로 기록한다.

## 8. 하지 않은 것

- Death 계수 / 캡 / Hazard Threat / Gate Power를 조정하지 않았다.
- Franchise Grade 할인 폭(0/-2/-4/-6/-8/-10%)을 조정하지 않았다 — Director 확정 수치다.
- Mastery / 해금 획득률을 조정하지 않았다.
- controlled Grade fixture를 cross-run 측정의 대체물로 사용하지 않았다.
- 어떤 QA 단언도 통과시키기 위해 완화하지 않았다.

## 9. Director 판단이 필요한 지점

1. **D30 / Boss CLEAR를 현행 난이도로 유지할 것인가.** 유지 시, D30은 사실상 도달 불가 구간이며
   Boss CLEAR는 시드 운으로 남는다.
2. **Grade 6(ORDER -10%)의 도달 경로.** 현재 12 Run으로도 Franchise 10/10에 닿지 않는다.
   Achievement 조건이 D20+ 구간을 요구하는 한, 도달 조건과 도달 수단이 서로를 막고 있다.
3. **Mastery / 상품 해금의 cross-run 누적.** §6의 격차 대부분이 여기서 나온다.
   controlled tier가 가정한 Mastery 24~35 / distinct 6~7에 실제 플레이가 전혀 접근하지 못한다.

세 항목 모두 owner 문서(`META_v2.7.0.md`, `DUNGEON_HAZARD_v2.7.0.md`) 갱신이 선행되어야 하며,
그 이후 별도 fix cycle에서 다룬다.
