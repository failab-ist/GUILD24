# 바가지 소지금 보너스 + 단골도 −8 측정 (2026-10-21)

- 기준: main cdd2adf 그대로 = `baseline.log`(보통 봇), `baseline-G.log`(바가지 쪽으로 기운 봇)
- 비교: `pricing.overcharge`에 `intentPivot:.36, intentWeight:.5`(정가와 같은 소지금 보너스), `loyalty:-4 → -8` = `gouge-L.log`(보통 봇), `gouge-LG.log`(기운 봇). 90% 상한은 측정 뒤에 넣음(봇이 바가지를 거의 안 쳐서 결과에 영향 없음).
- 명령: `node tools/measure-v2100.cjs --policies investor --traj 200 --fresh 1000 --runs 10 --decos none,economy,survival,operation,best --workers 2`
- 경로 종합: `route-totals.txt`(f50 = 기준, G = 기준 + 기운 봇, L = 새 규칙, LG = 새 규칙 + 기운 봇). D1~10 판매 가격 비율: `modes.txt`.

| 장식 없음 | 기준 | 새 규칙 |
|---|---|---|
| D30 간 판 | 54 | 56 |
| 클리어 판 | 19 | 19 |
| 사망 / 판 | 6.71 | 6.71 |
| 매출 / 일 | 735 | 735 |

장식 경로(경제·생존·운영·최선)도 모두 ±5판 안. 봇의 D1~10 바가지 판매는 기운 봇까지 0.0%라, 이 측정은 「정가만 파는 판이 손해 보지 않는다」까지만 보여 준다. 사람이 칠 때의 이득은 CHANGELOG v2.13.19 addendum의 계산표.
