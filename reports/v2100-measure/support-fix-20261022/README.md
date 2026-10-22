# 의무실 · 응급 처치대 · 보증 진열대 · 즉석식품 코너 조정 측정 (2026-10-22, v2.13.21)

- 중반 계정 100개(`clear-index-20261022/mid.cjs`로 만든 계정: 숙련만 사며 8판 굴림) × 시드 10 = 조건마다 1000판, investor 오라클 끔.
- `mid2.cjs`: mid.cjs에 후보 수치(`#ih=` 의무실 확률, `fh=` 응급 처치대, `sub=` 보증 지원, `ks=` / `kd=` 즉석식품 음식 / 음료 피로 회복,
  `ko=` 즉석식품 운영비, `fs=` 신선체계 능력치, `~`로 이음), 장식 + 점지 묶음(`+`), 판마다 다른 굴림, D15 · D25 잔액 · 매출 기록을 더한 것.
- 요약 `cana.cjs <dir> <조건들>` → `heal-guarantee-off.txt`(원래 규칙 dist), `kitchen-off.txt`(즉석식품 리워크를 넣은 dist 사본:
  dungeon.js의 능력치 가산을 빼고 피로 회복에 고정값을 더함).
- `own.cjs`: 아무것도 안 얹은 판에서 봇이 스스로 가진 점지 비율(신선체계 5%라 겹침이 원인이 아님을 확인).
- 흔들림(짝 차이 표준오차 x2): D20 ±4%p, D30 ±3%p, 클리어 ±2%p, D15 잔액 ±50G.
- 머지 뒤 새 판 목표선 다시 잼(main 9a79cca): 최종 체크와 같은 `node tools/measure-v2100.cjs --policies investor --traj 40 --fresh 200 --runs 15`,
  요약 `final-check-20261022/ana.cjs` · `first.cjs` → `recheck-summary.txt` · `recheck-first.txt`, 로그 `recheck-off.log`. 결과 JSON은 넣지 않음.
