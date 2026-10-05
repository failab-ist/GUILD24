# 마왕성 UI / 코치 작업 상태

먼저 AGENTS.md를 읽고 따른다.

브랜치 `codex/minor-ui-feedback`, 구현 기준 `a23a47be`. User가 마이너 UI와 마왕성 최종 화면을 컨펌했고, main 머지와 패치 버전 2.11.1을 승인했다(2026-10-05).

승인된 단계별 코치와 개인별 환경 대응 UI는 구현했다. COPY_AUDIT_APPROVED_v2.8.0.md §14-9 / UI_UX_v2.8.0.md §FIRST-EVER FINAL EXPEDITION COACH가 현재 문구와 트리거를 소유한다. 개인별 수치는 finalPreRoll().preparations의 Hazard 결과를 읽으며, FINAL_EXPEDITION_v2.8.0.md §FINAL CALCULATION ORDER가 판정 경계다.

전투 안내는 User가 직접 제안한 문구를 그대로 적용했다. 정확한 문구는 COPY_AUDIT §14-9에 있으며 기존 subjugation ID를 유지한다. '?'의 상세 설명은 그대로다.

신규 코치에서 가방 2칸 설명은 제외한다. User가 요구한 핵심은 전투와 환경을 함께 고려하되, 특정 상품 조합을 정답으로 단정하지 않는 것이다.

진입점: dist/data/copy.js Copy.finalPrep.coach, dist/ui/app.js coachSteps / showCoach / finalMuster / npcCard / npcDetail. 개인별 숫자는 기존 envMeter를 재사용한다.

검증: tools/qa-final-feedback.cjs PASS 52 checks (폰360/390/430 · 데스크1280, 같은 계열의 위험을 같은 줄로 묶고 실제 반값 보급과 숫자 갱신 확인). tools/qa-final-coach.cjs PASS 66 checks (단계 진행, 계정 저장/새로고침/새 런, 건너뛰기, 설정, 최신 코치·기존 '?' 설명 분리). 전체 npm test와 npm run audit PASS. 마우스 전용 title 툴팁 제거 후 final-feedback 폰·데스크 26 checks PASS. Windows 경로·줄바꿈 검사 오류는 assertion을 유지하며 정규화만 수정했다.

이미지: reports/ui/feedback-review/final-environment.png; 단계별 캡처는 reports/ui/final-coach/ 아래. 별도 시각 검토에서 필수 수정 없음. 최종 User 컨펌 완료.

기존 RUNTIME UX BUG: 모바일에서 원정대 카드가 메뉴 버튼 아래로 스크롤될 때 소지금 끝이 일부 가려진다. 기준 main에서도 재현되며 이번 변경의 회귀는 아니다. 이번 패치 범위에서는 고치지 않았다.

구현 커밋: `bf816ab5`. 패치 버전은 `2.11.1`이며 배포 marker와 Canonical header, CHANGELOG 및 WORK_STATE를 맞췄다. 릴리스 기록은 CHANGELOG §RELEASE RECORD를 참조한다. 새 밸런스 측정은 실행하지 않는다.
