# 핸드오프 — 사전 코치를 "뒤에서 결과로" 옮기기 (User 2026-09-30)

Read AGENTS.md first and follow it.

## 활성 과제
`reports/v3.0-prep.md` §9-6의 판정표(사전 코치 22개: A 결과로 5 · B 표기로 13 · C 유지 2 · DESIGN 1)를 바탕으로,
User와 채택 범위를 정한 뒤 v2.9.12와 같은 방식(문서 먼저, Source 다음)으로 한 배치씩 옮긴다.

## 베이스
- 브랜치 `ccr-5e99c18d-9ueouh`(main v2.9.12 `39ddcce` 머지됨). §9-4 루브릭 · §9-5 실측 · §9-6 판정 · 측정 도구 2개가 여기 있다. main에 머지되기 전이면 이 브랜치에서 시작한다.
- 선례: v2.9.12 "Pre-sale coaches retired for 피로 · 대성공 · 만반의 준비" + "NIGHT discovery lines"(`design_ssot/CHANGELOG.md` §v2.9.12).

## 먼저 할 것 (Source 확인 2건, 채택 결정 전)
1. NIGHT 기록이 손님이 **실제로 간 게이트**를 찍는가(`claimedGateFor`, 거짓말쟁이 reroute · `dist/ui/app.js` 776 · `dist/systems/shop.js` 345). 찍지 않으면 `destination` 코치는 A가 아니라 C.
2. NIGHT 원인 줄이 **전투 원인 실패를 투력과 연결**해 말하는가(NIGHT_CLOSING §CAUSALITY RULE, `dist/data/copy.js` night 원인 문구). 아니면 `stats` 코치는 A가 아니라 C.

## User에게 물을 것 (WORK가 정하지 않음)
- `pricing` 코치를 사전에 남길지, 첫 거절 · 첫 50% 판매 뒤 사후 안내로 옮길지.
- CLOSING `receipt` 둘째 절(줄어든 날도 창고에 물건으로 남는다)을 위해 영수증에 재고 가치 행을 **추가**할지, 아니면 문장을 그냥 뺄지.
- B 13개를 한 배치로 뺄지 페이즈별로 나눌지. 표기 한 단어 보태는 곳 2개(ORDER 창고 summary `본사 기본 상품 N`, SALE 읽기 판 제목 `도착 시`)의 문구.
- 새 사후 안내 문장 4개(§9-6 "사후 안내로 새로 필요한 문장") 확정 → COPY_AUDIT §26-2.

## 라우팅 (채택 시 손대는 owner)
UI_UX_v2.8.0.md §TUTORIAL(READ THE SYSTEM · FIRST-ORDER COACH ORDER · FIRST STORE SUPPORT (DAY 0) · FIRST-EVER DEEP EXPEDITION) ·
NIGHT_CLOSING_v2.8.0.md §DISCOVERY LINE(트리거 추가) · COPY_AUDIT_APPROVED_v2.8.0.md §3-7 · §26-2 · COPY_WORLD_VOICE_v2.8.0.md §TUTORIAL COACH COPY ·
`design_ssot/CHANGELOG.md` · 원장(`npm run ssot:check`).
Source: `dist/ui/app.js` `coachSteps`(1180~) · `dist/data/copy.js` `learned`(176~) · `tests/ui-guard.cjs`(coach 참조 46곳) · `tools/qa-visual.cjs` 코치 캡처.

## 측정 (배치 앞뒤)
`node tools/measure-first-sale-v30.cjs` — 새 계정 첫 판매까지 탭 · 필수 읽기 글자. 기준값(HEAD `2165c0c`): 24탭(코치 16) · 999자. 목표: 코치 1~2 · 3분 안(§9-4 B1).
`npm run qa:visual` 코치 확인 · `node tests/ui-guard.cjs`.

## 정지 경계
- 채택 범위는 User 결정. WORK는 §9-6 판정을 바꾸지 않고, 확인 2건 결과만 보고한다.
- 한 owner 묶음 = 한 배치 = 한 커밋. 문서 배치가 컨펌되기 전에 Source를 바꾸지 않는다.
- PR 머지는 User 컨펌 뒤에만.
