# 최종 밸런스 체크 (2026-10-22, main c7776b3, v2.13.21)

봇 고침 #286(작전실이 있으면 대응 상품 +1), 숙련 1·2단 구매 순서 #287 반영. 봇은 investor.
판정 기준은 **오라클 끔**(AGENTS §9-B, 근석 2026-10-22). 켬 값(`small-on.log`, summary.txt `=== on`)은 끔 · 켬 두 번 재던 때의 마지막 기록이다.

- 기준 · 사다리: `node tools/measure-v2100.cjs --policies investor --traj 40 --fresh 200 --runs 15 --out small-off.json`
  (켬은 `G24_BOT_ORACLE=1`). 요약 `ana.cjs` → `summary.txt`, 15판 안 첫 D30 · 첫 클리어 판째 `first.cjs small-off.json` → `first-off.txt`.
- 영웅 D5: `node reports/v2100-measure/deco-support-20261022/toggle.cjs 200 none,relicAt:<영웅>@5,... <root> <out>`. 요약 `hero.cjs` → `hero.txt`.
  작전실 외 6개는 효과표와 같은 값.
- 결과 JSON(각 20MB)은 리포에 넣지 않았다. 위 명령으로 같은 값이 다시 나온다.
- 판정: 목표 안, 수치 안 바꿈. 벗어난 곳(생존 길 마왕전 39%, 경제 길 D25 잔액 4630G)은 효과표와 같은 모양. 숫자는 BALANCE_CHECK.md 봇 참고선과
  reports/DECO-SUPPORT-EFFECTS.md §1 「15판」 표.
