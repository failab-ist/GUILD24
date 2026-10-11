# 퇴각 · 부상 보상 올리기 (v2.13.5, User 2026-10-11)

명령(각 사본에서 같은 시드): `node tools/measure-v2100.cjs --traj 0 --fresh 1000 --decos none --policies investor`

- `main.log`: v2.13.4 main(3e17bac). 퇴각 0.40 · 부상 0.25.
- `fail-loot.log`: 퇴각 0.60 · 부상 0.45. 채택.
- `visit-wallet-rejected.log`: 방문 돈 30~70 → 50~90G. 상위 4명까지 다 쉬워져서 넣지 않음.

세 로그 모두 첫 줄 라벨이 `after`인 것은 사본마다 따로 돌렸기 때문이다.
