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


## COPY RE-AUDIT — EXACT ACTIVE OVERRIDES

This section is a 2026-09-20 re-audit against the current v2.8 SSOT and Current Source.
It supersedes conflicting inherited v2.7 copy and non-Canonical Copy Audit drafts.

### NPC DIALOGUE TRUTH — v2.8 ONLY

Broad pool expansion and recent-line cooldown remain v2.9+.

v2.8 changes only dialogue that falsely implies a mechanic.

Exact replacements:

- 겁쟁이:
  - REMOVE: \`귀환석 있습니까?\`
  - USE: \`오늘은 무사히 다녀오는 게 목표입니다.\`

- 대식가:
  - REMOVE: \`많이 든 걸로 주세요.\`
  - USE: \`원정 끝나면 밥부터 먹어야겠어요.\`
  - REMOVE: \`먹을 게 제일 급해요.\`
  - USE: \`배고픈 채로 돌아오는 건 딱 질색입니다.\`

- 탐욕:
  - REMOVE: \`비싼 게 좋은 거 아닌가요?\`
  - USE: \`오늘은 빈손으로 돌아올 생각 없습니다.\`
  - REMOVE: \`이왕이면 좋은 걸로 봅시다.\`
  - USE: \`이번엔 전리품 좀 제대로 챙겨와야죠.\`

- 단골:
  - REMOVE: \`늘 먹던 걸로 주세요.\`
  - USE: \`이 정도면 단골 맞죠?\`

Do not add a purchase-preference implication that the owning Trait does not actually implement.

### RETURN-VISIT HELPED CALLBACK — EXACT

A line such as:

    지난번에 챙긴 거, 도움이 됐어요.

may be selected only when the immediately previous expedition has a proven sold-Item contribution
under the v2.8 result-proof boundary.

Do not use:
- \`events.length > 0\`
- Trait-only \`injury-guard\`
- a generic Hazard/Result event with no sold-Item proof

as sufficient evidence.

The callback consumes no Gameplay RNG and does not create a new proof system; it reads the
persisted previous-result proof already needed for NIGHT.

### SALE CHANGE LABELS — EXACT

Primary selected-Item change heading:

    판매 후 변화

Do not use:
- 보급 후 변화
- 이 상품이 직접
- 보급이 상태에 미치는 영향
- 이 손님에게는 지금 걸리지 않는 효과

Direct and derived changed rows stay visible under the single heading.
Their source is explained by the shared anchored source popover.

Unchanged intrinsic Item truth that still needs to be readable may use the neutral heading:

    상품 효과

Never label an internal marker such as \`potion\` as a Player effect.

### SALE FORECAST PERMANENT FOOTNOTE

Remove the always-visible prose:

    오늘 이 사람의 몸 상태와 지금 챙긴 보급으로 가늠한 것이다.
    게이트 안에서 어떻게 될지까지는 아무도 모른다.

The exact forecast/readiness/death explanation lives in the anchored help copy already owned above.

### SUPPLY SHORTFALL

Main compact line:

    보급 부족 {N} · 능력치 감소

On-demand explanation:

    투력·강인함·기동·정신이 함께 감소한다.

Do not expose the hidden deficit formula.

### HELP / 점주 가이드 — EXACT COMPACT COPY

#### 점포지원

    DAY 0 무료 1개. 이후 DAY 5·10·15·20·25·30에 구매 기회가 온다.
    보류한 후보와 가격은 다음 구매 기회 전날까지 유지된다.

#### 발주

    오늘 손님과 게이트를 보고 수량을 정한다.
    발주 확정 뒤에도 추가 발주와 후보 교환이 가능하다.

#### 판매

    목적지·능력·특성을 보고 상품과 가격을 정한다.
    50%는 관계 투자, 100%는 기본, 150%는 수익 우선.
    한 가격을 거절하면 같은 상품은 그 가격과 더 비싼 가격으로 그날 다시 제안할 수 없다.

#### 단골

    단골도는 구매 의사와 재방문에 영향을 준다. 능력치는 올리지 않는다.
    51부터 단골로 인정된다.

#### 원정

    판매한 상품은 그날 원정에서 한 번 쓰고 사라진다. 가방은 2칸.
    결과는 NIGHT에서 확인한다.

#### 점포 종료

    적자 마감은 재고 정리로 회생할 수 있다. 한 영업 최대 3회.
    돌아오지 못한 모험가가 10명이 되면 폐점한다.
    DAY 30 최종 원정이 끝나면 이번 점포 영업도 끝난다.

#### 다음 점포

    남음: 도감·해금·직업 숙련·점포 자본·보유 장식
    초기화: 모험가·재고·골드·점포지원

#### 시간

    실시간 제한 없음.

Remove from global Help:
- 기본 방문객 3~6 재설명
- Gate 수 증가 장문
- 모든 Trait 공개 규칙 재설명
- 마감에서 거래와 보급의 작용을 확인한다
- 별도의 Bankruptcy 중복 문단

### DEEP EXPEDITION REPEAT SURFACES — EXACT

After the first contextual tutorial:

Morning repeat surface:

    심층원정 · {게이트명}
    같은 게이트의 더 깊은 원정. 손님 1명을 후원하면 성공 시 더 성장한다.

SALE nomination detail:

    {게이트명} · 후원금 {N}G
    성공 시 추가 성장 · 점포 수익 없음

Do not repeat the full Hazard/cost/growth/store-income tutorial paragraph on every Morning and again
inside SALE.

### TRAIT EFFECT LABEL TRUTH — EXACT

금수저:
    방문 시 소지금 +50G

정직한:
    정가·50% 구매 시 단골도 +1

Do not use:
- 방문 골드
- 단골 보너스

when the actual channel can be named.

Keep mathematically truthful weighting terms such as 재방문 가중치 where replacing them with 확률
would be false.

### STORE CAPITAL CURRENCY COPY

Store Capital is not Gold.

Use:
    점포 자본 {N}
    {N} 자본

Do not append \`G\` to Store Capital in Codex, management, purchase or settlement copy.

### SETTINGS / PLAYER-FACING LOCALIZATION

Use:
    소리 켜기
    소리 끄기
    전체 데이터 초기화

Do not use active Player-facing:
- Sound On
- Sound Off
- Full Data Reset

The reproducibility Seed control is developer/debug functionality and does not appear in the ordinary
Player pre-Run surface.

Remove the ordinary Player footer:

    버전 0.4 · 로컬 실행 지원 · 외부 연결 없음

Build/version information may live in a dedicated technical/about surface later; do not keep the
development-runtime sentence in the gameplay settings panel.
