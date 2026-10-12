# 초반 돈 · 대응템 (2026-10-12)

investor 봇, 프레시(첫 런 보호 ON), 같은 시드. `node tools/measure-v2100.cjs --policies investor --traj 0 --fresh N`.

| 조건 | 내용 |
|---|---|
| M | v2.13.10 main (306acc0) |
| A | v2.13.11: 위험 대응템 보장이 날짜 등급표를 따름 |
| B | A + 발주 등급표 D1~3 82/16/2 · D4~7 74/21/5 |
| C | B + 초반 혹 절반 (early 1.525 · mid 1.0325) |
| D | B + 운영비 dayBase 170 → 150 (채택, v2.13.12) |
| E | D + 초반 혹 절반 |

1000판 (D10까지 끝 / D30 도달 / 클리어): M 39.9 / 4.6 / 1.6%, A 40.5 / 5.3 / 2.3%, D 32.8 / 6.7 / 2.7%, E 31.1 / 7.4 / 2.5%.

- `fresh200-ABCDE.log`: 200판 비교
- `fresh1000-main-A-D-E.log`: 1000판 확인
- `traj-v21310-vs-v21312.log`: v2.13.10(before) 대 v2.13.12(after) 장식 궤적, investor `--traj 200 --fresh 0 --decos none,economy,survival,operation` (200 × 10런 × 4루트). 10런 안 첫 클리어: 장식 없음 17.0 → 16.5%, 경제 34.0 → 37.0%, 생존 40.0 → 54.5%, 운영 33.0 → 53.5%.
