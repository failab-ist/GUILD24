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

1. **DAY 0** — `새 점포 준비` → `첫 점포지원`(DAY 0 지원 선택 모달) → 지원 확보 → DAY 1 아침(기존 MORNING
   entry: 셔터 420ms · 알림 stagger · 잔고 카운트업 520ms).
   파일: `day0-{390,1280}-{before,after,settled}.png`
2. **CLOSING** — 마지막 밤 판정(H1 도장 정착 상태) → `마감으로` 누름 → CLOSING 화면(H4 본문 프린트
   200ms + 도장 190ms + dip).
   파일: `closing-{390,1280}-{before,after,settled}.png`
3. **FINAL** — D29 마감(H4 영수증/도장) → `다음 날` 누름 → D30 FINAL 화면(보스 이름 공개, 이 화면은
   `playPhase`에 분기 자체가 없다 — 진짜 날것).
   파일: `final-{390,1280}-{before,after}.png`
4. **END** — D30 출전 확인 모달 → `출전` 누름 → END 화면(H5 봉인 도장 hold 200ms + fall 90ms, 이번
   캡처는 실패 결과).
   파일: `end-{390,1280}-{before,after,settled}.png`

`-before`는 실제 컨트롤을 누르기 직전의 정착 상태, `-after`는 누른 직후(약 30~120ms). **최초 캡처에서는
`-after`만 있었는데, CLOSING·END·DAY0 세 화면은 이미 자기 내용에 모션이 걸려 있어 30ms 프레임만으로는
아직 다 등장하지 않은 상태를 보고 "이것도 컷이다"로 오판할 위험이 있었다(User 지적으로 재확인, 실제로
캡처 도구에 그 문제가 있었다).** 그래서 `-settled`(추가 600ms 대기 후) 프레임을 더해 재캡처했다. FINAL은
`playPhase`에 분기가 아예 없어 30ms와 정착 상태가 같으므로 `-settled`가 없다.

## 관찰 (판단 아님, User 결정을 위한 재료)

- **CLOSING과 END는 이미 "컷"이 아니다(정착 프레임으로 확인).** `closing-*-settled.png`는 영수증 전체 +
  손익 도장(금색/적색)이 다 나온 상태, `end-*-settled.png`는 봉인 도장까지 다 앉은 상태를 보여준다. 화면
  교체(`#app` innerHTML) 자체는 여전히 순간이지만, 그 안의 내용은 이미 H4/H5가 등장 모션을 갖고 있다.
  여기에 H6 진입 비트를 추가하면 같은 순간에 비주얼 두 개가 겹치는 것(이번 배치의 임팩트 예산 위반
  소지)이므로, **CLOSING·END는 H6 대상에서 빼는 쪽을 권장한다.**
- **FINAL은 지금이 가장 극적인 하드 컷이고, 진짜 날것이다.** 조용한 종이 영수증(CLOSING)에서 통짜 보스
  백드롭 + 이름 공개로 순간 전환되고(`final-390-after.png`), `playPhase`에 이 화면을 위한 분기가 전혀
  없어 다른 화면과 겹칠 동작 자체가 없다. **넷 중 가장 안전하고 가장 효과가 클 후보.**
- **DAY 0**: 정착 프레임을 봐도 MORNING 자체의 기존 모션(셔터·알림)이 이미 빠르게 끝나 있어 눈에 띄는
  차이는 크지 않았다. 다만 이 컷 직후 D0 마왕 조사 모달이 거의 동시에 겹쳐 뜨는 것은 실제 현상이다
  (`day0-*-after.png`, `day0-*-settled.png` 둘 다 모달이 보임) — DAY 0를 고른다면 이 모달과의 순서/겹침을
  같이 다뤄야 한다.

## 진입비트 내용 추천 (권장안, 결정 아님)

- **FINAL(1순위 추천)**: 기존 SALE reveal 패턴(§SALE reveal: `face`/`figure`/`pool`/`bracket`가 각각
  translateX·Y + opacity로 슬라이드 인)을 보스 백드롭·이름판에 그대로 재사용 — 새 대상 하나
  (예: 보스 아트+이름 묶음)에 `translateY 10→0` + `opacity 0→1`, 220ms, outQuad, 일반 강도. 새 사운드
  없음(기존 `final` 큐 그대로), 새 카피 없음. CLOSING/END와 겹치지 않는다(그 두 화면은 그대로 둠).
- **DAY 0(2순위, 원한다면)**: MORNING의 alert-stagger 패턴을 그 판 전체에 한 동작으로 축소 재사용 —
  `translateY 12→0` + `opacity 0→1`, 200ms, outQuad. 다만 곧바로 겹치는 D0 모달의 타이밍(모달을 이 비트
  뒤로 살짝 늦출지, 그대로 둘지)은 UNRESOLVED로 남겨야 한다 — 지금 문서엔 이 순서에 대한 규정이 없다.
- **CLOSING · END**: 위 관찰대로 권장하지 않음(이미 있음, 추가하면 임팩트 예산 중복).

## STOP — User 결정 대기

AGENTS §9(Design Change Control)에 따라 대상 화면은 WORK가 고르지 않는다. 네 화면 중 몇 개를,
어떤 화면을 고를지 결정해 주시면 그 화면(들)에 한해 ≤240ms 한 동작 · 일반 강도의 진입 비트를 다음
배치로 구현한다.
