# COPY_WORLD_VOICE

DOC=COPY_WORLD_VOICE
OWNER=copy,world_voice,player_terms,help_copy,boss_report_copy,result_copy,event_copy
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=COPY_WORLD_VOICE_v2.7.0.md
PATCH_TYPE=INFORMATION_TRUST_AUDIT

## INHERITANCE

All unchanged world voice and approved v2.7 copy inherit COPY_WORLD_VOICE_v2.7.0.md.

v2.8 priority:
    TRUTH -> FRESHNESS -> DECISION VALUE -> PLACEMENT -> SCAN -> VOICE

Do not make explanations longer merely to sound friendly.
Reduce internal calculation language and strengthen choice -> actual change -> result.

## LOCKED PLAYER TERMS

Use:
- 강인함, not player-facing 생존 Stat
- 점포지원, not 유물
- 심층원정
- 원정 소지금 획득 for expedition-Wallet modifiers
- 귀환 후 피로 for the settled NIGHT value

Do not expose:
- 성장 잠재력
- 남은 특성
- internal potion marker
- internal fatigue accounting labels

## FIRST AID KIT

Concise player function:

    원정 후 남는 부상을 1단계 완화한다. 사망에는 적용되지 않는다.

Do not append redundant 원정 결과는 유지 prose on the primary Item line.

## GREAT SUCCESS SIGNAL HELP

Signal text remains:
    대성공을 노려볼 만합니다.

Help:
    구매가 확정되면 현재 준비 상태를 반영해 이 신호만 다시 확인합니다.
    정확한 확률은 표시하지 않습니다.

Do not say Supply always increases Great Success.

## ANCHORED HELP COPY

### 전투 전망
    계산대에 왔을 때의 능력과 게이트 전투 요구를 비교한 전망입니다.
    판매 후에도 이 전망은 갱신되지 않습니다.

### 환경 대응
    계산대에 왔을 때의 능력과 보급을 기준으로 한 위험 대응 수준입니다.
    판매 후에도 이 전망은 갱신되지 않습니다.

### 실패 시 사망 위험
    원정에 실패했을 때 사망까지 이어질 위험입니다.
    원정 전체의 사망 확률은 아닙니다.

### 보급 / 피로
    필요량을 채우고 남은 보급은 출발 전 현재 피로를 먼저 줄입니다.
    그래도 남으면 귀환 후 쌓이는 피로를 줄입니다.

## LOYALTY POPOVER

Base copy:

    단골도 {N}
    높을수록 상품 구매 의사와 재방문 가능성이 오른다.
    51부터 단골로 인정된다.

Append only current/revealed conditions that actually exist for this Run:
- 귀환 적립제
- 프리미엄 멤버십
- 평생 단골제
- revealed LUST rule

Do not leak LUST before reveal.

## DEEP EXPEDITION REPEAT COPY

The first contextual tutorial may explain the system.

After that, repeat surface uses one compact line:

    같은 게이트의 더 깊은 원정. 손님 1명을 후원하면 성공 시 더 성장한다.

Detailed cost/reward remains available where the Player makes the nomination.

## NIGHT HERO FEEDBACK

Use the short proven-result grammar owned by NIGHT_CLOSING_v2.8.0.md.

Examples:
    부식 방지 코팅제 덕분에 부상을 피했다.
    간단 도시락 덕분에 살아 돌아왔다.

Do not use generic 위험 감소 as Hero feedback.

## NIGHT REACTION SELECTOR

Living reaction selection priority:

    avoided death / rescue
    -> 중상
    -> 부상
    -> 퇴각
    -> growth
    -> ordinary living return

Item presence alone is not a selector.
Remove supplied as a Primary selector.

Environment flavor may be used only where it does not override the actual Outcome priority.

Death uses narration, not quoted living dialogue.

## BOSS INFORMATION COPY — EXACT

### D0
Heading:
    DAY 30 · 제0게이트 토벌 예정

Line:
    길드 정보원이 토벌 대상을 추적하고 있다.

### D5
Header:
    1차 조사 보고

Label:
    토벌 대상 확인

Show Boss name + the existing Boss-specific D5 Flavor.
Button:
    확인

### D10
Header:
    2차 조사 시작

Line:
    {보스명}의 전투 기록을 추적한다.

Footer:
    다음 보고 · DAY 15

### D15
Header:
    2차 조사 보고

Intro:
    전투 기록에서 변칙이 확인됐다.

Then show exact Boss Trait name + Function.

### D20
Header:
    최종 정찰 시작

Line:
    마왕성으로 향하는 원정 경로와 주변 환경을 정찰한다.

Footer:
    최종 보고 · DAY 25

### D25
Header:
    최종 정찰 보고

Intro:
    마왕성으로 향하는 최종 원정 환경이 확인됐다.

Then show exact Final Family + Hazard information.

## SLOTH COPY

Replace:
    유물을 받는 대신

with:
    점포지원을 받는 대신

and use 점포지원 consistently in all active Player-facing SLOTH lines.

## EVENT FUNCTION COPY

Use EVENT_v2.8.0.md truth.

Targeted exact lines:
- 본사 반값 행사: 오늘 첫 50% 할인 판매 · 본사 지원 +50G
- 치유소 휴무: 오늘 보험 상품 구매 의사 +20%p
- 암시장 상인: 오늘 희귀 이상 특별 발주 1건 · 매입가 +35%
- 보급 상단 도착: 오늘 발주 후보 +2
- 길드 급여일: 오늘 방문 모험가 구매 예산 +20%

Flavor must be visually subordinate to Function.
