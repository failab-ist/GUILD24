# v2.9.2 H6 — 네 하드 컷 캡처 (결정 전용, Source 변경 없음)

DOC=v292-h6-transitions
STATUS=CAPTURE_ONLY — 아무것도 ADOPTED 아님. PRESENTATION_PRINCIPLES §GAME FEEL BEAT H6 row는 여전히 PLANNED.

## 범위

PRESENTATION_PRINCIPLES §GAME FEEL BEAT H6: "CLOSING, FINAL, END and the DAY 0 screen are hard cuts
today... the H6 batch first captures the four cuts in the two review sequences and reports them; the
User decides which screens get the beat (UNRESOLVED until that decision — WORK does not pick the
targets, AGENTS §9)."

이 배치는 그 캡처만 한다. Source, CSS, 문서 어디에도 새 연출을 넣지 않았다. 캡처 도구
`tools/qa-closing-beat.cjs`, `tools/qa-final-seal.cjs`의 구조를 재사용해 `tools/qa-h6-transitions.cjs`를
새로 만들었다(캡처 전용, `qa:runtime`에 넣지 않음).

## 캡처한 네 컷

한 시드(`qa-h6-1`)의 연속 플레이에서, 390 · 1280 두 너비로:

1. **DAY 0** — `새 점포 준비` → `첫 점포지원`(DAY 0 지원 선택 모달) → 지원 확보 → DAY 1 아침.
   파일: `day0-{390,1280}-{before,after}.png`
2. **CLOSING** — 마지막 밤 판정(H1 도장 정착 상태) → `마감으로` 누름 → CLOSING 화면.
   파일: `closing-{390,1280}-{before,after}.png`
3. **FINAL** — D29 마감(H4 영수증/도장) → `다음 날` 누름 → D30 FINAL 화면(보스 이름 공개).
   파일: `final-{390,1280}-{before,after}.png`
4. **END** — D30 출전 확인 모달 → `출전` 누름 → END 화면(H5 봉인 도장, 이번 캡처는 실패 결과).
   파일: `end-{390,1280}-{before,after}.png`

`-before`는 실제 컨트롤을 누르기 직전의 정착 상태, `-after`는 누른 직후(대략 30~120ms, 모션 프레임은
아님 — 이 배치는 아직 아무 모션도 정의하지 않으므로 캡처할 모션이 없다)다.

## 관찰 (판단 아님, User 결정을 위한 재료)

- **CLOSING과 END는 이미 부분적으로 "컷"이 아니다.** H4가 CLOSING 본문에 200ms 페이드인 + 도장을,
  H5가 END에 봉인 도장 + 헤드라인 정착을 이미 넣었다. `closing-*-after.png`와 `end-*-before.png`(D30
  출전 확인 모달 자체는 손대지 않은 화면)를 보면, 화면 전환 자체(`#app` innerHTML 교체)는 여전히
  순간적이지만 그 안의 내용은 이미 정착 모션을 탄다. H6가 이 두 화면에 "추가로" 진입 비트를 얹는 것이
  중복(이미 있는 모션 위에 또 다른 모션)이 될 수 있다는 뜻이지, 이미 끝났다는 뜻은 아니다 — 최종
  판단은 User 몫.
- **FINAL은 지금이 가장 극적인 하드 컷이다.** 조용한 종이 영수증(CLOSING)에서 통짜 보스 백드롭 +
  이름 공개로 순간 전환된다(`final-390-after.png`). 그 자체로 충격이 있어서 "손댈 필요가 없다" 쪽과
  "이 낙차를 완충하는 진입 비트가 있으면 좋겠다" 쪽 둘 다 근거가 있다.
- **DAY 0는 설계 문서가 이미 "기본으로는 안 입힌다"고 명시**했다(`DAY 0 is not dressed by default`).
  캡처만 보면 DAY 0→DAY 1 전환도 그 자체로는 특별히 거칠지 않다(오히려 D0 마왕 조사 모달이 곧바로
  겹쳐 뜬다).

## STOP — User 결정 대기

AGENTS §9(Design Change Control)에 따라 대상 화면은 WORK가 고르지 않는다. 네 화면 중 몇 개를,
어떤 화면을 고를지 결정해 주시면 그 화면(들)에 한해 ≤240ms 한 동작 · 일반 강도의 진입 비트를 다음
배치로 구현한다.
