# v2.13.15 경제 조정 측정 (2026-10-18 ~ 19)

기준 명령: `node tools/measure-v2100.cjs --policies investor --traj 200 --fresh 1000 --runs 10 --workers 2 --out <json>`

| 로그 | 조건 |
|---|---|
| `base.log` | main (v2.13.15, 29b22f0) |
| `a1.log` | 승리 돈 35+날짜×6 · 매대 50% · 단체 주문 보너스 하루 60G · 손님 +1/+2 한 번 굴림 |
| `final.log` | a1 + 왕도 인증 수수료 20% · 24시간 신선체계 +30% · 평생 단골제 +6% · 단골 감사 현수막 단골도 10마다 3% · 의무실 현판 25% · 지역 거점점 운영비 없음 |
| `final2.log` | final + 훈련소 제휴 간판 30% · 단골 감사 현수막 최대 20% (희귀상품 입고 계약은 1.7배 그대로) |
| `final3.log` | final2 + 희귀상품 입고 계약 1.5배 |
| `bot7-oldnumbers.log` | final3 + 새 봇(점포지원 교환 규칙 · 영웅 효과 순서) |
| `final4.log` | 새 봇 + 바우처 3명 · 지원금 간판 50% · 알뜰 금고 300G · 즉석식품 운영비 15% · 보증 진열대 50% = 브랜치 그대로 |

`trajectory-summary.txt`: 10판 안 처음 D20 / D30 / 클리어 (base · a1 · final 순, 장식 경로별).

유물 · 장식 하나씩 켜고 끄기 (스크래치 스크립트, JSON은 커밋하지 않음):
- `toggle-fresh-*.txt`: 새 계정 새 판 1000판. 유물은 DAY 1부터 가진 채, 장식은 그 칸에 낀 채. 값 = 있을 때 − 없을 때.
- `toggle-d15-*.txt`: 근석 3판 D15 세이브(`/mnt/project-files/saves/v2.13.15-d15-mvdz2n7n.json`) 400번 이어 돌리기.
  없는 유물은 넣고, 가진 유물(첫 방문 쿠폰 · 단체 주문 · 프리미엄 멤버십 · 귀환 적립)은 빼서 비교.
- `toggle-fresh-deco-start-final.txt`: final 규칙, 장식을 계정에 사서 끼운 채 새 판을 시작(판 시작 · 손님 생성 때 듣는 효과까지 포함).
- `a1`은 a1 규칙에서 전체, `final6`은 final 규칙에서 바꾼 6개만, `final2`는 final2 규칙.
- `toggle-grade-chaser.txt`: 높은 등급 먼저 사고 영웅이 없으면 돈 내고 교환(창마다 최대 2번, 사고 나서 500G 남을 때)하는 봇으로 훈장 · 쿠폰함.
- `toggle-fresh-r7.txt` · `toggle-d15-r7.txt`: final4 규칙 · 새 봇으로 바꾼 것들 켜고 끄기. `hero-day0-fresh.txt`: 훈장으로 DAY 0 영웅 하나씩 쥐인 새 판 1000판(봇 순서 정하기용).
- `toggle-rare-contract.txt`: 희귀상품 입고 계약 1.7배+10% · 1.5배+10% · 1.7배+5%.
- 이 측정의 봇은 왕도 인증을 가지면 살 수 있는 손님에게 무조건 바가지로 판다(근석 10/19, 측정 사본에만 적용).
