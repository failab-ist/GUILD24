# BALANCE FINDING — v2.7 실패 조건부 사망 위험 채택 이후 런 수명

CLASSIFICATION: `BALANCE FINDING`
STATUS: 기록만. Director 지시(WORK 추가 확정사항 1)에 따라 Death / Hazard 수치는 조정하지 않음.
MEASURED AT: `DUNGEON_HAZARD_v2.7.0` §DEATH RISK 채택 커밋 시점
OWNER: `DUNGEON_HAZARD_v2.7.0.md` (`DIRECTOR DOCUMENT BASELINE` 0.18 / 0.12 / 0.30 / 0.40)

---

## 1. 무엇을 측정했는가

`Debug.simulate(60,'skilled',null,'full','hybrid')` — Fresh Account 코호트.
채택 직전 커밋(`e7548dd`, Step 5·6 포함 / Death 모델만 v2.6)과 채택 후를 동일 조건으로 비교.

| 지표 | 채택 전 (v2.6 Death) | 채택 후 (v2.7 Death) |
|---|---|---|
| D30 도달률 | 0.75 | **0.00** |
| 사망으로 종료된 Run | 5% | **97%** |
| Run당 평균 사망 | 5.2 | 10.2 |
| 원정당 사망률 | 3.2% | **15.3%** |
| 평균 도달 Day | 28.1 | 16.8 |

Cross-run trajectory(`Debug.trajectory({trajectories:6,runs:6})`)에서도 Run index 1~6 전부
`reach30 = 0`, 평균 도달 Day 13.8~18.0. **단, v2.7 META는 아직 미구현이므로 이 수치는
Director 확정사항 4의 최종 측정이 아니다.**

## 2. 분해 — 어디서 오는가

`failureDeathRisk()`를 8,457회 원정에 대해 직접 관측:

```text
평균 CombatDeficit        0.290  ->  x0.18 = 0.052
평균 EnvironmentDeficit   0.529  ->  x0.12 = 0.063
부상 상태 출발 비율        32%    ->  x0.10 = 0.032
평균 failureDeathChance   0.148
캡(0.30)에 걸린 비율        1.5%
0%에 도달한 비율            1.5%
```

두 가지가 곱해져 나온 결과다.

1. **실패 경로 비중이 원래부터 높다.** 성공+대성공이 전체 원정의 10.0%. 이 낮은 성공률은
   v2.7 이전부터 존재했다 — `ca04448`(v2.7 던전 변경 이전)에서 성공 5.1% / 대성공 0.5%.
   Step 5(Prepared Power·Hazard Threat)나 Step 6(보급·피로)이 만든 것이 아니다.
   실패 경로 90%에 조건부 14.8%를 곱하면 원정당 13.3%가 된다.

2. **환경 결손이 전투 결손보다 크다.** EnvironmentDeficit 0.529 > CombatDeficit 0.290.
   `HazardThreat = 12 + Day×0.35 + (Tier−1)×6`에 대해 실제 Hazard 방어치가 전 구간에서 낮다.
   D1 T1에서도 threat 12.35 대비 초기 방어가 3~5 수준이라 결손 ~0.6이다.
   즉 사망 위험의 주 동인은 전투 준비 부족이 아니라 **Hazard 대응 부족**이다.

## 3. 부수 관측 — 준비의 이득 폭 압축

`tests/simulation.cjs`가 보호하던 "준비한 플레이가 맨몸 플레이보다 확실히 오래 간다"는 계약에서,
Fresh Run 수명 비(比)가 좁아졌다.

| | 채택 전 | 채택 후 |
|---|---|---|
| balanced 평균 Day | ~25 | 15.0 |
| zero-supply 평균 Day | ~9.7 | 9.7 |
| 비율 (맨몸/준비) | ~0.39 | **0.65** |

맨몸 플레이는 거의 움직이지 않았고 준비한 플레이만 짧아졌다. 방향성 자체는 유지된다 —
맨몸 플레이는 D13-18 / D19-29 밴드에 **한 번도 도달하지 못하고** DAY 20 도달률이 0인 반면
준비한 플레이는 두 밴드 모두 도달한다. 해당 테스트는 수명 비 대신 이 밴드 도달로 계약을
다시 진술했다(수치를 완화한 것이 아니라, 두 정책이 함께 짧아진 것을 상수로 흡수하지 않기 위함).

## 4. 하지 않은 것

- Death 계수 / 캡을 조정하지 않았다 (`DIRECTOR DOCUMENT BASELINE`).
- Hazard Threat 곡선, Hazard 방어치, Gate Power를 조정하지 않았다.
- 어떤 QA 단언도 통과시키기 위해 완화하지 않았다. 제거한 것은 Director 확정사항 2가
  명시적으로 폐기한 **Fresh Account 첫 Run D30 도달 요구**뿐이며, 해당 기능 검증은
  controlled D30 setup으로 이전했다 (`tests/canonical.cjs`, `tests/integration.cjs`,
  `tests/final.cjs`).

## 5. 재측정 조건

Director 확정사항 4에 따라 v2.7 META(Franchise Achievement / Grade / Grade별 ORDER 매입가
할인) 구현 완료 후 cross-run trajectory에서 다음을 측정한다.

- Run index별 D10 / D20 / D30 도달률
- Franchise Grade별 D30 도달률
- 첫 Boss CLEAR 발생 Run
- 사망으로 종료되는 Run 비율
- 원정당 Death rate

Progressed Account에서도 D30 도달이 사실상 불가능하면 BALANCE FINDING으로 다시 보고한다.
