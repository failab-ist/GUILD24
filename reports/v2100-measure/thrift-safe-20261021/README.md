# 알뜰 금고 +300 → +150 / +100G 측정 (2026-10-21)

- 기준: main deb36cf (v2.13.17, 금고 +300G). 비교: 같은 소스에서 `decorationParams.thriftSafe.firstWallet`만 150 · 100
- 명령: `node tools/measure-v2100.cjs --policies investor --traj 200 --fresh 1000 --runs 10 --decos none,economy,survival,operation,best --workers 2`
- 로그: `t300.log` · `t150.log` · `t100.log`, 10판 안 첫 도달: `trajectory-first-reach.txt`

## 궤적 200 × 10판, 10판 안 첫 클리어

| 장식 경로 | 300G | 150G | 100G |
|---|---|---|---|
| economy | 71% | 63% | 60% |
| best | 50% | 56% | 51% |
| survival | 40% | 40% | 40% |
| operation | 25% | 25% | 25% |
| none | 10% | 10% | 10% |

경제 경로 현금 / 일 55 · 50 · 44G, 사망 / 런 세 안 모두 7.3. 새 판은 장식이 없어 셋이 같다(끝난 날 중앙 D15, D30 6.3%).
근석 선택: 100G (10/21).

장식 하나씩 비교(10/18 규칙, 금고 400G)는 `reports/v2100-measure/v21315-economy/toggle-fresh-deco-start-final2.txt`.
경제 장식은 칸마다 생존 장식과 비슷하고, 판을 이어 가며 앞서는 건 매출 → 점포 자본(3%)이 쌓이는 효과다(10판째 자본 경제 781 · 생존 493 · 운영 296).
운영 장식은 네 칸 모두 크게 처진다(다음 안건).
