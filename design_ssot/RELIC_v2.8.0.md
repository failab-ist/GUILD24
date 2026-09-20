# RELIC

DOC=RELIC
OWNER=relic,store_support,run_store_build,utility,foundation,hybrid,keystone,sloth_window
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=RELIC_v2.7.0.md
PATCH_TYPE=STORE_SUPPORT_AUDIT

## PLAYER-FACING SYSTEM NAME

Player-facing active system name:
    점포지원

Internal source IDs/files may retain relic where changing them adds unnecessary migration/refactor risk.

## INHERITANCE

All unchanged v2.7 acquisition windows, candidate generation, build axes, Fresh composition,
SLOTH window lifecycle and Store Support effects inherit RELIC_v2.7.0.md.

This patch is a full v2.8 feel/truth audit.
Unlisted effects keep their current v2.7 function/value.

## FULL 30-SUPPORT AUDIT DISPOSITION

Retain function/value:
- 묶음발주 계약
- 회전 진열대
- 단골 스탬프 기계
- 회원 관리대장
- 희귀상품 입고 계약 (renamed only)
- 길드 보증 진열대
- 원정 위험 게시판
- 긴급보급 선반
- 대형 냉장고 function
- 길드 전광판 function
- 공동구매 전단
- 단골 묶음혜택
- 프리미엄 멤버십
- 냉장 유통 계약 function (renamed only)
- 새벽 공동배송
- 물류 본부계약
- 길드24 원정전문점 인증
- 지역 거점점 계약
- 후방 창고 증설
- 본사 추가발주권
- 발주 교환권 function

v2.8 numeric/functional adjustment:
- 즉석식품 코너
- 원정 도시락 코너
- 24시간 신선체계
- 신입 모집 게시판
- 귀환 적립제
- 길드 납품 인증
- 평생 단골제
- 왕도 프리미엄 인증
- 운영 효율 매뉴얼

The two renamed supports are counted in the retained list; only their Player-facing names change.

## NAME CLEANUP — EXACT

ID showcase:
    old: 프리미엄 쇼케이스
    new: 희귀상품 입고 계약

ID coldcase:
    old: 냉장 쇼케이스
    new: 냉장 유통 계약

The Decoration named 프리미엄 쇼케이스 remains unchanged.
Thus 쇼케이스 is no longer reused by these active Store Supports.

## FRESH NATIVE-STAT REBASELINE — DIRECTOR DOCUMENT BASELINE

The v2.7 Fresh native-Stat multipliers are superseded for v2.8.

`즉석식품 코너`:
    Food/Drink positive native Core-Stat contribution +30%

`24시간 신선체계`:
    Food/Drink positive native Core-Stat contribution +50%
    shelf-life +2 days remains unchanged

`원정 도시락 코너`:
    when active Supply Burden exists and the Food/Drink supplies >0:
        positive native Core-Stat contribution +20%
    matching explicit Hazard Counter bonus remains +25%

All three continue to use the existing base-additive positive-native-Stat composition rule.

Therefore:
    즉석식품 코너 + 24시간 신선체계
    => base positive native Stat ×1.80

With the active-Supply native-Stat condition:
    +30% +50% +20%
    => base positive native Stat ×2.00

Unchanged:
- Supply itself
- matching-Counter +25% rule
- Insurance
- harmful RiskReward penalties
- Food-affinity Trait composition rule

## LARGE FRIDGE — SOURCE ALIGNMENT

대형 냉장고:
    base Price = 200G
    Food/Drink shelf life +1 day

This is existing v2.7 Canonical truth.
A Source value of 260G is an Implementation Bug, not a new design baseline.

## ROOKIE BOARD — FUNCTIONAL FEEL CHANGE

신입 모집 게시판 no longer uses only a +70% new-customer selection weight.

v2.8 exact rule:
- when a new adventurer is generated on a Day, that new adventurer occupies one of today's
  existing visitor slots
- total visitor count does not increase because of this rule
- if there is no new adventurer generated, the support adds no visitor
- available-adventurer cap and ordinary queue length remain
- use the existing deterministic seating pattern already used by the rookie Event where possible

Purpose:
make the support's identity observable without false probability attribution or extra customer workload.

## RETURN POINTS — DIRECTOR DOCUMENT BASELINE

귀환 적립제:
    Price = 400G unchanged
    existing eligibility unchanged
    Loyalty +2 unchanged
    NPC Wallet +30G

Supersedes +12G.

## SUPPLY CERTIFICATE — DIRECTOR DOCUMENT BASELINE

길드 납품 인증:
    Price = 440G unchanged
    eligible Rare+ sale condition unchanged
    HQ commission = 12% of Item list price

Supersedes 8%.

Player copy should say:
    현재 알려진 위험에 맞는 희귀 이상 상품 또는 희귀 이상 보험 판매 시
    정가의 12% 본사 수당

## LIFETIME REGULAR — DIRECTOR DOCUMENT BASELINE

평생 단골제:
    Price = 740G unchanged
    Loyalty >=60 survival condition unchanged
    NPC Wallet +50G
    next-visit weight +50% unchanged

Supersedes +25G.

This threshold does not redefine Trusted Regular; NPC_TRAIT still owns 단골 at 51.

## ROYAL PREMIUM CERTIFICATE — DIRECTOR DOCUMENT BASELINE

왕도 프리미엄 인증:
    Price = 760G unchanged
    Rare+ overcharge condition unchanged
    HQ commission = 20% of Item list price

Supersedes 12%.

## OPERATING EFFICIENCY MANUAL — DIRECTOR DOCUMENT BASELINE

운영 효율 매뉴얼:
    Price = 260G
    from next Day, basic operating cost -30G

This is the actual v2.8 Source-adoption baseline, not a harness-only candidate.

If later measurement shows late acquisition is still a dead choice, report BALANCE FINDING.
Do not auto-increase the discount.

## COLD DISTRIBUTION CONTRACT — EXACT ELIGIBILITY

냉장 유통 계약:
- Uncommon+ Food/Drink offer weight +80%
- shelf life +1 day
- on acquisition, currently owned non-expired eligible stock extends exactly once
- future eligible stock receives the extension

Eligibility:
    category in [Food, Drink]
    rarity >= Uncommon

Do not use a retired fresh boolean/property.

## COPY TRUTH CLEANUP

단골 스탬프 기계 Player copy:
    유료 구매의 단골도 증가량 +50%. 생환으로 얻는 단골도에는 적용되지 않는다.

Do not mention 무료 보급; the active price system has no free-sale mode.

긴급보급 선반 Player copy uses:
    포션 · 야외장비 · 보험

길드 전광판 must describe the actual base-roll floor:
    기본 방문객이 3명이면 4명으로 올린다.

발주 교환권:
    first canonical full reroll each Day = 0G
    then the current paid curve continues from 100G -> 200G -> 400G ...

SLOTH:
    점포지원, not 유물

## FEEL / ATTRIBUTION BOUNDARY

Deterministic visible changes may expose their Store Support source:
- Order offer count +N
- operating cost -N
- HQ commission +N
- deterministic visitor-count delta
- other exact resolved deltas

Probability/weight-only effects do not claim that a particular random result happened because of
the support.

Do not build a new rarity-attribution UI merely to explain weighting.

The Player can always inspect current owned Store Supports through the existing compact owned
support reference.

## BALANCE STATUS

Adjusted values above are approved DIRECTOR DOCUMENT BASELINE values.
Future tuning remains measurement-gated.
