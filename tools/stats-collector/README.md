# 익명 통계 받는 곳 — Cloudflare 판 (무료, 약 15분, 브라우저만)

1. https://dash.cloudflare.com 에 가입·로그인한다(무료).
2. 왼쪽 `스토리지 및 데이터베이스 → D1 SQL 데이터베이스 → 데이터베이스 만들기`, 이름 `guild24-stats`.
3. `컴퓨팅 → Workers 및 Pages → 만들기 → Worker`, 이름 `guild24-stats`로 배포한 뒤 `코드 편집`을 열고 `worker.js` 내용을 통째로 붙여 넣어 `배포`한다.
4. 그 Worker의 `설정 → 바인딩 → 추가 → D1 데이터베이스`: 변수 이름 `DB`, 데이터베이스 `guild24-stats`.
5. `설정 → 변수 및 비밀 → 추가 → 유형: 비밀`: 이름 `EXPORT_KEY`, 값은 아무 긴 암호(내려받을 때만 씀, 따로 적어 둘 것).
6. 만든 주소: https://guild24-stats.f-ai-shion-lab.workers.dev/ (`dist/systems/telemetry.js`의 `endpoint`).
- 확인: 주소를 브라우저로 열면 `ok`. 판이 쌓이면 `<주소>/export?key=<암호>`가 한 줄에 한 판씩 JSON으로 내려온다(`?since=번호`로 이어받기).
