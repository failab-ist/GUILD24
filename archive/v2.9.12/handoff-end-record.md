# 핸드오프 — END 영수증 "이 점포의 기록" 블록 (A안, User 결정 2026-09-30)

Read AGENTS.md first and follow it.

## 활성 과제
END 영수증에 "이 판은 이런 가게였다" 5행 블록을 넣는다. User는 A안(영수증 안 블록)을 골랐다. 문구 · 기본값 · 버전 표기는 **아직 컨펌 전**이라 먼저 받는다.
초안과 근거: `reports/v3.0-prep.md` §9-8-1(패킷) · §9-8-1-A(행 초안 · owner 개정 초안). 발견 근거 §9-7 F1 · F2.

## 베이스
- 브랜치 `ccr-5e99c18d-9ueouh`(main v2.9.12 `39ddcce` 머지됨). main 머지 전이면 이 브랜치에서 시작한다.
- 캡처 기준: `QA_SCREENS=end,endfail QA_WIDTHS=390 node tools/qa-visual.cjs` → `reports/ui/end-390.png` · `endfail-390.png`(gitignore).

## 먼저 User에게 컨펌 받을 것 (§9-8-1-A 끝의 목록)
1. 블록 제목 `이 점포의 기록` · 라벨 5개(`버틴 날` · `손님` · `돌아오지 못한 사람` · `가장 성장한 손님` · `원정`) 그대로 갈지
2. 기본값 ③ 잃은 사람은 수로만 · ④ 다회차 한 줄(§END — REPLAY NUDGE)은 그대로 둔다
3. CHANGELOG 버전 표기(v2.9.12 연장 / v2.9.13)

## 순서 (문서 먼저, Source 다음. 한 배치 = 한 커밋)
1. `design_ssot/UI_UX_v2.8.0.md` — `### END — REPLAY NUDGE` 앞에 `### END — THIS RUN BLOCK` 신설(자리 · 5행 · 0 처리 · 원정 0건은 행 제외 · 새 저장 필드 없음 · 정산 블록 불변). 근거 GAME_VISION Design Pillar.
   `design_ssot/COPY_AUDIT_APPROVED_v2.8.0.md` — `## 10-4. END — 이 점포의 기록` 신설(exact copy 6개).
   `reports/ssot-consolidation/UI_UX.md` — AMENDMENT 절 + ```new``` 펜스에 신설 줄 전부(`npm run ssot:check`가 undeclared new line을 잡는다. 얕은 클론에서는 검사가 못 돌 수 있음 — `0ee8bbb` 부재).
   `design_ssot/CHANGELOG.md` 항목. DOC_VERSION 정책은 SPEC_INDEX §VERSION POLICY.
2. Source: `dist/ui/app.js` `ledger()` — `지금까지 연 점포` 블록 다음 · `settle` 앞에 블록 1개. 값 출처: `run.day` · `npcs.filter(n=>n.introduced).length` · `stats.regulars` · `stats.deaths` · 최고 레벨 손님(동률 → loyalty) · 원정 기록 수와 `대성공` 수(`npcs.flatMap(n=>n.records)`).
   `tests/ui-guard.cjs` — 검사 1건(행 5개 · 자리 · 정산 블록 불변). 기존 UI-Q-v29-37(replay nudge) 유지.
3. 캡처(390 · end · endfail · Final 패배)를 User에게 보이고 컨펌 뒤 커밋. `qa:runtime`의 `qa-replay-nudge` · `qa-final-end` 통과.

## 정지 경계
- 문구 · 라벨 · 버전은 User 컨펌 전에 owner에 쓰지 않는다.
- B안(헤드라인 문장) · C안(카드)은 이 과제 밖. 하지 않는다.
- PR 머지는 User 컨펌 뒤에만.
