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

## FULL 30-SUPPORT AUDIT — CLOSED

All 30 active Store Supports were re-audited against:
- purchase price and remaining-Run payoff
- max-owned/run=7 opportunity cost
- same-Build marginal value
- cross-Build competitiveness
- acquisition timing
- strong/weak Run state
- dead-pick / automatic-pick risk

A Store Support is not required to remain equally valuable at every acquisition Day.
Late-Run decline is valid when an early acquisition has enough remaining Run time to create a
meaningful snowball and the Player can rationally choose to skip it later.

The audit is CLOSED by User approval.

Relative to the already-approved v2.8 owner baseline, this closing audit changes only:
- 회전 진열대
- 물류 본부계약
- 길드24 원정전문점 인증
- 지역 거점점 계약
- D30 candidate eligibility policy

Every other Store Support keeps the current value/function defined by this v2.8 owner or its
non-conflicting inherited base.

No new Store Support is added by this audit.

## ROTATION DISPLAY — SUPPLY ENGINE

회전 진열대:
    Price = 240G unchanged
    trigger = previous Day sales >= 6
    effect = next generated ORDER offers for Common / Uncommon Items get supply quantity +1

This supersedes the inherited "next Day first bulk order -10%" effect.

Purpose:
    high sales -> more available units -> bulk-order threshold becomes reachable more often
    -> Rotation discounts can actually be exercised -> more stock can support the next sales cycle

Boundaries:
- Rare+ offer quantity is unchanged by this support
- it does not add ORDER offer slots
- it does not lower Item price by itself
- the existing 묶음발주 계약 / 공동구매 전단 / 새벽 공동배송 discounts remain separate
- if previous Day sales < 6, this support adds no quantity

## ROTATION KEYSTONE — LOGISTICS HQ

물류 본부계약:
    Price = 720G unchanged
    trigger = previous Day sales >= 7
    effect = next Day first bulk order purchase price -25%

This supersedes the inherited 8-sale trigger only.
The first-bulk-order scope and -25% value remain unchanged.

## EXPEDITION KEYSTONE — COUNTER COVERAGE

길드24 원정전문점 인증:
    Price = 700G unchanged

When current known Hazards contain exactly 1 distinct Hazard:
    ensure at least 1 ORDER offer that Counters that Hazard.

When current known Hazards contain 2 or more distinct Hazards:
    choose 2 distinct known Hazard keys
    and ensure 2 distinct ORDER offer slots,
    one guaranteed against each selected Hazard key.

For guarantee accounting, one offer slot satisfies only one selected Hazard key even if that Item
can Counter multiple Hazards.

The guarantee:
- preserves the ordinary total ORDER offer count; it replaces ordinary slots rather than adding slots
- remains active after a full Reroll
- uses only currently legal/unlocked Item candidates
- does not reveal unknown Hazards

Purpose:
원정 전문 Build의 Keystone은 "Counter가 하나라도 있나"가 아니라
여러 알려진 위험에 대한 최소 대응 폭을 보장한다.

## CUSTOMER KEYSTONE — REGION HUB

지역 거점점 계약:
    Price = 700G unchanged
    operating cost = overheadBase +10% unchanged

Each applicable Morning, exactly one mutually exclusive visitor result:
    +1 visitor = 45%
    +2 visitors = 15%
    no visitor increase = 40%

Expected visitor delta = +0.75 / applicable Day before ordinary availability caps.

The visitor increase remains subject to the ordinary active/available adventurer cap.
The operating-cost modifier continues to apply to overheadBase only.

## D30 CANDIDATE ELIGIBILITY — DEFAULT INCLUDE / EXPLICIT EXCLUDE

The inherited positive futureRelevantOnly / finalUseful allowlist model is superseded.

D30 rule:
    every otherwise-eligible Store Support is included by default.

A Store Support is excluded from D30 only when, after acquisition on D30 and before Final Lock,
there is no legal action/state through which that support can change:
- D30 ORDER / Reroll / inventory preparation
- Final participant preparation
- Final participant power / Hazard readiness
- Final result-relevant state

Implementation must therefore use an explicit D30 no-effect exclusion set, not a positive
final-useful inclusion list.

Current explicit D30 no-effect exclusions:
- 단골 스탬프 기계 (stamp)
- 회원 관리대장 (member)
- 길드 보증 진열대 (guarantee)
- 대형 냉장고 (fridge)
- 길드 전광판 (board)
- 신입 모집 게시판 (rookieBoard)
- 공동구매 전단 (groupFlyer)
- 단골 묶음혜택 (memberBundle)
- 프리미엄 멤버십 (premiumMember)
- 귀환 적립제 (returnPoints)
- 길드 납품 인증 (supplyCert)
- 평생 단골제 (lifetime)
- 왕도 프리미엄 인증 (royalCert)
- 지역 거점점 계약 (hub)
- 운영 효율 매뉴얼 (efficiency)

All other current supports are D30-eligible when they satisfy ordinary acquisition eligibility.

Future Store Supports are also D30-eligible by default.
A future support is removed from D30 only by adding it to the explicit no-effect exclusion set after
its actual D30-to-Final usefulness is reviewed.
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

Late acquisition may rationally be skipped. That alone is not a Balance Finding.
Evaluate this support by whether earlier acquisition can repay its price and create meaningful
remaining-Run economy value.

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
