# RELIC

DOC=RELIC
OWNER=relic,store_support,run_store_build,utility,foundation,hybrid,keystone,sloth_window
DOC_VERSION=2.11.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.11.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC

## PLAYER-FACING SYSTEM NAME

Player-facing active system name: 점포지원

Internal source IDs/files may retain relic where changing them adds unnecessary migration/refactor risk.
No active Store Support is named 쇼케이스 (the wall Decoration is 명예 모험가 액자).

## KEY
windows=[D0,D5,D10,D15,D20,D25,D30]
maxOwned/run=7
candidates/window=3

D0: cost=0 · pick<=1 · eligible=일반 grade · defer=YES (until DAY 4)

D5+: currency=G · buy<=1 · defer=YES · eligible=every grade · gradePerCard=일반 60% · 희귀 28% · 영웅 12% (§GRADE)

offered=34 · 일반=17 · 희귀=10 · 영웅=7 (§GRADE) · internal kinds Foundation / Hybrid / Keystone / Utility (§POOL ARCHITECTURE)

buildAxes=[Rotation,VIP,Premium,Expedition,Fresh,Customer]

candidateRerollByReload=NO
ownedNonstackableRepeat=NO
immediateUnboughtRepeat=NO
slothSealChoiceUsesRelicWindow=YES
slothSealBreakGoldCost=0
slothSealBreakConsumesWindowAcquisition=YES

## ROLE
RELIC = `이번 Run에서 어떤 편의점을 운영할 것인가`

Relic responsibilities: 발주 방식 변화 · 재고 운용 방향 변화 · 고객 가치 판단 변화 · 가격 전략 변화 ·
원정 준비 우선순위 변화 · Run별 Store Build 형성.

Relic modifies existing core loops rather than creating isolated mini-systems.

Division: JOB=BaseStats+Growth · TRAIT=CharacterVariation · RELIC=StoreBuild · ITEM=ExpeditionPreparation

## RELIC POWER / BUILD HIERARCHY

```text
NPC Base / Level / Growth / Equipment
> Sold Item
> single Store Support
> Event
> Trait
```

One Relic's same-moment direct expedition contribution is smaller than one appropriate Item's own contribution.
A coherent multi-Relic Run-wide Store Build may and should exceed one Item through repeated
economy/access/growth/item-value effects.

## ACQUISITION WINDOWS

### D0
timing=before first business · cand=3 · pick<=1 · cost=0 · eligible=일반 grade · defer=YES · expiry=D5 window

Goal: 첫 선택부터 Run 방향을 제안.

At Run start, the first Store Support choice is the first DAY 0 decision. The Store Support takeover contains only
the support decision and its own compact copy; it does not carry the D0 Boss objective above the candidate cards.

After one first support is chosen, or the choice is deferred (`나중에 결정`):
- a chosen support commits under existing foundation rules
- the separate D0 Boss-information beat is shown
- ordinary DAY 1 begins only after acknowledgement

A deferred D0 window stays open, still free, through DAY 4 and reopens like any deferred window (§WINDOW STATE); it does not
pop up again, and the D5 window replaces it. A pick on DAY 1~4 applies from that moment like any later purchase.

Exact first-support copy -> COPY_AUDIT_APPROVED_v2.8.0.md. Exact flow/order -> CORE_RUN_v2.8.0.md / BOSS_v2.8.0.md.

### D5 / D10 / D15 / D20 / D25
cand=3 · buy<=1 · currency=G · firstReveal=FOCUSED_ONCE_AT_WINDOW_CREATION · defer=YES

새 Milestone Window가 생성되면 해당 Day의 첫 유효 Management 진입에서 후보 3개를 1회 Focused Reveal한다.
Player may 구매 or 나중에 결정. `나중에 결정`은 기존 Defer다. 후보/가격은 바뀌지 않는다.

### D30
cand=3 · buy<=1 · currency=G · timing=before final expedition lock · firstReveal=FOCUSED_ONCE_AT_WINDOW_CREATION · defer=YES

Final lock 전에 해당 Window의 1회 Focused Reveal이 보장되어야 한다.

D30 Boss/Final ordering:
- exact Final Family Pair/Hazard Pool is generated and revealed on D25 by `FINAL_EXPEDITION_v2.8.0.md`
- D30 reuses that persisted state
- D30 Relic focused reveal/decision occurs with the already-known persisted Final state
- if Boss=SLOTH, the D30 Seal choice shares the same D30 Relic window and is mutually exclusive with Relic acquisition
- Final lock occurs only after the D30 Relic/Seal choice opportunity has been handled

No D30 Family reroll/reveal generation occurs.

### D30 CANDIDATE ELIGIBILITY — DEFAULT INCLUDE / EXPLICIT EXCLUDE

Every otherwise-eligible Store Support is included in D30 by default. A Store Support is excluded from D30 only when,
after acquisition on D30 and before Final Lock, there is no legal action/state through which it can change:
- D30 ORDER / Reroll / inventory preparation
- Final participant preparation
- Final participant power / Hazard readiness
- Final result-relevant state

Implementation uses an explicit D30 no-effect exclusion set, not a positive final-useful inclusion list.

Current explicit D30 no-effect exclusions:
단골 스탬프 기계 (stamp) · 회원 관리대장 (member) · 길드 보증 진열대 (guarantee) · 대형 냉장고 (fridge) ·
길드 전광판 (board) · 첫 방문 쿠폰 (firstVisitCoupon) · 단체 주문 창구 (groupOrder) · 단골 묶음혜택 (memberBundle) ·
프리미엄 멤버십 (premiumMember) · 귀환 적립제 (returnPoints) · 길드 납품 인증 (supplyCert) · 새벽 회수 계약 (dawnRecovery) ·
왕도 프리미엄 인증 (royalCert) · 지역 거점점 계약 (hub) · 운영 효율 매뉴얼 (efficiency) ·
응급 처치대 (firstAidDesk; no SALE arrival on D30) · 소문 수집 게시판 (rumorBoard; no Event on D30) ·
단골 추천 엽서함 (postcard; no visitors on D30) · 길드 구조대 계약 (rescueContract; no ordinary expedition on D30)

All other current supports are D30-eligible under ordinary acquisition eligibility. Future Store Supports are
D30-eligible by default; one is removed from D30 only by adding it to the exclusion set after its actual
D30-to-Final usefulness is reviewed.

### SLOTH SEAL-BREAK WINDOW

Canonical Boss rule -> BOSS_v2.8.0.md

When Boss=SLOTH:
- exactly 2 of [D15,D20,D25] are selected as Seal opportunities
- D30 is always a Seal opportunity
- D10 is never a Seal opportunity

At a selected opportunity, this Relic window offers one mutually exclusive acquisition outcome:
A. acquire <=1 normal Relic under the ordinary window rules
B. break 1 Sloth Seal for 0G

Seal Break grants no Relic, consumes this window's acquisition opportunity, persists once committed and cannot be
duplicated/reversed by Save/Load.

Defer is the ordinary window behavior until window expiry / Final lock. If the Player has not committed either branch,
no free Seal Break is auto-awarded.

Persist when applicable: slothSealOpportunity=YES/NO · consumedBySealBreak=YES/NO · sealBreakCommitted=YES/NO

Relic owns only the mutually exclusive window lifecycle (`Relic acquisition OR Seal Break`).
Boss Power by committed break count is owned by `BOSS_v2.8.0.md`; do not duplicate SLOTH Boss Power numbers here.

## WINDOW STATE

At window creation: generate(candidates,prices) once

persist: milestoneDay · candidateIds · candidatePrices · purchased · expiryDay · focusedRevealSeen · rerolls

save/load => same(candidates,prices,state); reload => no reroll

focusedReveal:
- D5/D10/D15/D20/D25/D30의 새 Window는 1회만 Player에게 명확히 보여준다.
- D5 Boss Identity / D15 Boss Trait처럼 같은 날 선행 공개가 있으면 그 공개가 먼저 끝난 뒤 Relic Focused Reveal을 연다.
- Save/Reload로 Focused Reveal을 반복 재생하거나 후보를 다시 뽑을 수 없다.
- D0는 영업 전 Relic 선택 자체가 시작 Flow이므로 중복 Reveal을 추가하지 않는다.

defer: 구매하지 않고 닫기 가능 · window expiry 전 다시 열기 가능

reopenAllowed=[Morning,Order,Store Management] · reopenBlocked=[Active Sale,Night Resolution]

Menu 점포지원 row: opens the selection surface only while reopenAllowed holds and the window is still purchasable;
otherwise it opens the owned Store Support list. The DAY 0 first choice has no way back to preparation and no generic close; its
only exit without a pick is `나중에 결정`, which opens DAY 1.

ownedRelicQuickView: mode=READ_ONLY · availablePhases=[Morning,Order,Sale]
- 이미 보유한 점포지원의 이름/효과/조건은 Morning/Order/Sale에서 빠르게 확인 가능
- Sale에서는 읽기만 가능
- Quick View가 Relic 구매/Defer timing을 우회하지 않는다

### QUICK VIEW STATUS LINE

A Store Support whose effect today depends on a condition, a use count or yesterday's result carries at most one
status line under its name and effect in the owned quick view, computed from runtime truth at render time. No new Save
field, no HUD element, no badge, no verdict word; an always-on support carries no line; a chance-based support is never
written as inactive. Exact lines -> `COPY_AUDIT_APPROVED_v2.8.0.md` §11-32. The conditional supports are exactly:
회전 진열대, 물류 본부계약, 길드 보증 진열대, 단체 주문 창구, 발주 교환권, 묶음발주 계약 (ORDER only),
단골 묶음혜택 (SALE only, the current customer). 평생 단골제 carries no line: it is always on for every 단골.

expiry: next relic window begins (e.g. D5 offer valid through D9; D10 => new window)

## COUNTER JUDGEMENT

Two predicates, one owner, no third definition anywhere.

```text
직접 대응 directCounter(item, hazards)
  = the Item carries a positive Counter value for at least one of those Hazards
관련 준비 relatedPrep(item, hazards)
  = directCounter, or the Item carries a positive value of the one Core Stat one of those Hazards presses
    (DUNGEON_HAZARD §HAZARD RULES: 강인함 for 독/냉기/부식, 기동 for 속박/진창/어둠, 정신 for 화염/공포/화이트아웃)
```

Who reads which:
- 관련 준비: SALE purchase acceptance (the accessible-mode floor and the 바가지 fit term, ECONOMY_ORDER §PURCHASE ACCEPTANCE), 원정 위험 게시판 offer weight
- 직접 대응: the 야전 정비대 Counter multiplier, the Known-Hazard Counter pity, 길드 납품 인증
- 기동 on 속박/진창 Gates is 관련 준비, never a Counter

## CANDIDATE RULES

withinWindowDuplicate=NO
owned nonstackable relic: futureEligible=NO
unbought relic: futureEligible=YES · immediateNextWindowRepeat=NO
offer diversity: prefer >=2 distinct Primary Build directions when practical
buildBias: soft only — 현재 보유 Build와 관련된 후보 Weight를 약하게 높일 수 있으나 필수 Piece를 보장하지 않는다.

### CANDIDATE REROLL (User 2026-10-02)

- an open, unspent window from D5 on (never the D0 free pick) may redraw its three candidates for Gold
- price = 300G × 2^(rerolls already made in this window): 300 → 600 → 1200…; a new window starts again at 300G
- the redraw keeps every pool rule above (ownership, the grade roll, the D30 exclusions, diversity, build bias) and leaves
  the three on the table out when at least three others remain; the new three are priced as any window's
- the spend is Store Support investment (the closing receipt's `점포지원 투자`); a reload never redraws for free
- the key sits in the window's footer beside `나중에 결정`, the same rank and look (User 2026-10-02); copy -> COPY_AUDIT §11-31c

## GRADE

Every Store Support has a Player-facing 등급: 일반 · 희귀 · 영웅, held as the Item rarity index (0 · 2 · 3) so it reads the Item
rarity names and colours. The 등급 follows measured contribution (single ownership, `reports/relic-balance/v2104-grade/`), not
the internal kind.

```text
영웅 (7)  : 24시간 신선체계 · 물류 본부계약 · 평생 단골제 · 왕도 프리미엄 인증 · 원정 작전실 · 지역 거점점 계약 · 응급 처치대
희귀 (10) : 즉석식품 코너 · 본사 추가발주권 · 귀환 적립제 · 새벽 회수 계약 · 단체 주문 창구 · 프리미엄 멤버십 ·
            원정 도시락 코너 · 길드 납품 인증 · 고급 식자재 유통 계약 · 길드 구조대 계약
일반 (17) : 묶음발주 계약 · 회전 진열대 · 단골 스탬프 기계 · 회원 관리대장 · 희귀상품 입고 계약 · 길드 보증 진열대 ·
            원정 위험 게시판 · 야전 정비대 · 대형 냉장고 · 길드 전광판 · 첫 방문 쿠폰 · 야전 들것 · 후방 창고 증설 ·
            발주 교환권 · 운영 효율 매뉴얼 · 소문 수집 게시판 · 단골 추천 엽서함
(retired 단골 묶음혜택 reads as 희귀 on a save that owns it)
```

Draw, per card of a window:
1. roll the card's grade: D5+ 일반 60% · 희귀 28% · 영웅 12%; D0 always 일반
2. draw one support of that grade from the eligible pool (ownership, the D30 exclusions, the cool-down of the last three);
   when that grade has nothing left, draw from the whole eligible pool
3. offer diversity and build bias apply inside the grade

No grade is guaranteed in a window or a Run; 영웅 can come from D5. Presentation: the grade word under the support name, in the
Item rarity colours (일반 / 희귀 / 영웅 = the Item 일반 / 희귀 / 영웅 colours), and a grade colour line (UI_UX §STORE SUPPORT WINDOW).

## POOL ARCHITECTURE

Internal build taxonomy (not shown to the Player; the grade above is what the Player reads):

total=35 (34 offered)

Foundation=14
- 6 Primary Build × 2, plus 야전 들것 (Expedition holds 3) and 단골 추천 엽서함 (VIP)
- early direction setters

Hybrid=9
- connects 2 Build axes; pivot/flex value; 길드 구조대 계약 holds one (Expedition); 단골 묶음혜택 retired

Keystone=7
- 1 per Primary Build, plus 응급 처치대 (Expedition holds 2)
- build engine/completion piece

Utility=5 (소문 수집 게시판 joined)
- general support; should not erase build identity

## BUILD COMPLETION FEEL

```text
1 Piece = direction visible; small immediate effect
2 Pieces = operation meaningfully changes
3 Pieces = Build Engine; cumulative Run value clearly exceeds one Item
4 Pieces = strong completed Build; Order/Sale/Inventory/NPC investment changes visibly
5+ Pieces = rare high-roll; do not normalize automatically
```

For build effects expressible as Final Party Power, a coherent 3~4 Piece build may create roughly +10~20
Party-equivalent direct/indirect difference as a `DIRECTOR DOCUMENT BASELINE` measurement target.
Do not implement this by adding generic Power to every Relic; economy/visitor/order builds express value through
their actual channels. High-roll synergy is valid roguelite power; do not automatically nerf a good seed into average play.

Typical final mix: mainBuild=3–4 · hybridSupport=1–2 · utility=1–2. All 7 relics do not need same tag.

## BUILD AXES

### ROTATION
identity=high volume / fast inventory turnover
questions: bulk buy? · cheap stock depth? · waste risk? · throughput?
strength: sales count / rotation / cashflow · cost: inventory exposure / lower single-sale margin

### VIP
identity=long-term investment in selected returning NPCs
questions: who deserves discount/investment? · who should be kept alive? · who can become future high-value customer?
strength: wallet / loyalty / revisit / boss roster · cost: early cashflow / death opportunity cost

### PREMIUM
identity=high-margin expensive sales
questions: stock expensive items? · who can afford them? · attempt 150%?
strength: large margin spikes · cost: high COGS / refusal / stuck inventory / capital pressure

### EXPEDITION
identity=prepare around current Gate risks
questions: which known Hazard matters? · Counter vs Insurance vs generic stats?
strength: survival / difficult Gate readiness · cost: less direct generic economy power

### FRESH
identity=Food/Drink Fatigue recovery (Supply) / native-stat / flexible-prep operation
questions: shelf life? · Food/Drink volume? · native Stat/recovery value? · can flexible Food/Drink prep cover enough
without replacing specialist gear?
strength: Fatigue-recovery (Supply) efficiency / shelf-life control / broad usability / flexible prep
cost: expiry / weaker specialist reliability / limited Insurance access

Fresh must not become a blanket multiplier that erases FieldGear specialists.

### CUSTOMER
identity=who comes to the store
questions: more visitors? · more new customers? · more returners? · customer mix?
strength: hybridizes with all builds · cost: little direct Item power / depends on pool state

Pacing/attachment guardrail: Customer value comes from meaningful traffic/composition tradeoffs, not from forcing the
Player through more repetitive customer interactions. Visitor-count tuning preserves the normal trusted-regular target
and active-cap rules. If raw visitor volume materially damages Run pacing or NPC attachment in playtest, rebalance the
existing Customer effects rather than adding another workload system.

## RELIC BLUEPRINTS

Exact Player-facing wording (card copy) is owned by COPY_AUDIT_APPROVED_v2.8.0.md §11 (§11-1..§11-30 for blueprints
1–30, §11-30b 야전 들것, §11-30c 응급 처치대). The following Store Support Functions are exact.

### ROTATION — Foundation
1. 묶음발주 계약 · tag=Rotation · purpose=reward inventory-risk-taking
- 묶음발주 계약: same SKU 3+ order -> 3rd and later units purchase price -20%

2. 회전 진열대 · tag=Rotation · purpose=sales->order->sales loop · `DIRECTOR DOCUMENT BASELINE`
- Price = 80G
- trigger = previous Day sales >= 4
- effect = next generated ORDER offers for every Item rarity get supply quantity +1
- purpose: high sales -> more available units -> bulk-order threshold becomes reachable more often -> Rotation
  discounts can actually be exercised -> more stock can support the next sales cycle
- it does not add ORDER offer slots and does not lower Item price by itself
- the 묶음발주 계약 / 물류 본부계약 discounts remain separate
- if previous Day sales < 4, this support adds no quantity

### VIP — Foundation
3. 단골 스탬프 기계 · tag=VIP
- 단골 스탬프 기계: paid-purchase Loyalty gain +75%; survival Loyalty is excluded

4. 회원 관리대장 · tag=VIP · identityPreReveal=NO
- 회원 관리대장: from the Day it is acquired, the 단골도 term of the visit weight counts double (`1 + 단골도 × 0.06` instead of
  `× 0.03`, CORE_RUN visitor draw); the met / unmet shares themselves do not move

### PREMIUM — Foundation
5. 희귀상품 입고 계약 · tag=Premium
- 희귀상품 입고 계약: Rare+ ORDER offer weight +70%; a Rare+ sale is charged at the ordinary price and HQ pays the store
  10% of the charged price on top, in every mode; no operating-cost modifier

6. 길드 보증 진열대 · tag=Premium · 150AutoSuccess=NO · playerReceivesChosenPrice=YES
- 길드 보증 진열대: once per Day, the first sale whose CHARGED sale price is >=200G -> HQ covers 30%
  of that charged price for the customer while the Player receives the full chosen sale price
- the threshold reads the charged price, not the list price

### EXPEDITION — Foundation
7. 원정 위험 게시판 · tag=Expedition · unknownHazardReveal=NO · specificItemGuarantee=NO
- 원정 위험 게시판: today's Gate Hazard (known active-Hazard) 관련 준비 Item offer weight +50% (§COUNTER JUDGEMENT; a
  direct Counter or the Stat that Hazard presses); this is not a guarantee

8. 야전 정비대 · tag=Expedition
- 야전 정비대: Hazard Counter values of every Item the adventurer carries from this store x1.40 - Field Gear, Food and Drink alike
  (User 2026-10-02: Counters are not Field Gear's alone)
- it changes no ORDER offer weight and no offer quantity

31. 야전 들것 · tag=Expedition
- 야전 들것: an ordinary Injury costs the adventurer 투력 8% instead of 15% (NPC_TRAIT §INJURY); 강인함 -20% is unchanged
- it applies wherever preparation is read: SALE outlook, NIGHT resolution and the D30 Final (so it is D30-eligible)
- 악바리's injured 투력 bonus replaces the penalty; the support changes nothing for that Trait
- measurement evidence: archive/v2.9.11/v2.9.11-drafts.md §C

### FRESH — Foundation
9. 대형 냉장고 · tag=Fresh · `DIRECTOR DOCUMENT BASELINE`

```text
base Price = 60G
Food/Drink shelf life +2 days
existing eligible non-expired stock extends once on acquisition
future eligible stock enters with the extension
```

No Stat/Supply multiplier. dailyRepeatedExtension=NO · infinitePreservation=NO

10. 즉석식품 코너 · tag=Fresh · `DIRECTOR DOCUMENT BASELINE`

```text
Food/Drink positive native Core-Stat contribution +25%
Supply (피로 회복) unchanged
Hazard Counter unchanged
Insurance unchanged
RiskReward penalty unchanged
base operating cost +10% of overheadBase from the next Day - the 지역 거점점 계약 rule, added to it, never compounded
  (User 2026-10-02: the Fresh line clears more and pays more)
```

notAutomatic=[HazardCounter,RiskRewardPenalty,Insurance,unrelatedAttachedEffect] · newCombatSystem=NO

### CUSTOMER — Foundation
11. 길드 전광판 · tag=Customer · livingNpcCapIgnored=NO · `DIRECTOR DOCUMENT BASELINE`

Role: raise the floor of a bad Morning. It applies to the **base visitor roll only**, before any other modifier:
base 3 -> 4 · base 4 -> 4 · base 5 -> 5 · base 6 -> 6
- this is a floor of 4 on the base roll, not a floor of 4 on the final visitor count
- no separate chance roll is made
- other modifiers (Relic, Decoration, Event) apply afterward
- the available-adventurer limit still caps the actual seating

12. 첫 방문 쿠폰 · tag=Customer · `DIRECTOR DOCUMENT BASELINE`
- on an adventurer's first-ever visit: NPC Wallet +30G on arrival
- during that visit: purchase intent +0.20
- it adds no visitor, seats no one and changes no queue

### HYBRID
13. 단체 주문 창구 · tags=[Rotation,Customer]
- 단체 주문 창구: its own Morning roll, 20% -> expected visitors +1, independent of 길드 전광판 /
  지역 거점점 계약 / wall Decoration
- from the Day's 5th sale, each sale -> HQ commission +15G
- it discounts no ORDER

14. 단골 묶음혜택 · tags=[Rotation,VIP] · consumerSlotRule=UNCHANGED
- 단골 묶음혜택: a 단골 (Trusted Regular) customer's second paid purchase that Day -> the customer
  pays, and is judged on, half the charged price; the store receives the full charged price and HQ
  pays the other half (recorded on that sale)

15. 프리미엄 멤버십 · tags=[VIP,Premium] · 150AutoSuccess=NO
- 프리미엄 멤버십: a 다시 온 손님 (not on a first visit)
  arrives with NPC Wallet +25G and Rare+ purchase intent +15%p; when that customer buys a Rare+ Item at 100% or 50%, 단골도
  +10 on top of the purchase gain (단골 스탬프 기계 multiplies the total; a 150% sale takes no bonus)

16. 귀환 적립제 · tags=[VIP,Expedition] · `DIRECTOR DOCUMENT BASELINE`
effect=a customer who bought today survives expedition -> long-term customer value up
channel=prefer existing loyalty/wallet/revisit systems
- Price = 240G
- condition = a customer who bought (paid) today survives - first visit included (User 2026-10-04: the returning-customer
  condition is gone; no Loyalty threshold)
- Loyalty +4, NPC Wallet +20G (User 2026-10-04: Loyalty 5 -> 4)

17. 원정 도시락 코너 · tags=[Fresh,Expedition] · `DIRECTOR DOCUMENT BASELINE`

```text
per Food/Drink Item in the Bag (with or without its own Hazard Counter):
  +2 defence on every Hazard of the Gate the adventurer actually goes to
  at the 마왕성 (the Final) the +2 goes to one Hazard only: the adventurer's most 취약 one - the largest gap before this
    bonus, the Final's own Hazard order on a tie
Food/Drink ORDER price ×1.15 (with 24시간 신선체계 ×1.15 too); the offers on the table are repriced once at acquisition
no Supply (피로 회복) bonus
```

The +2 is flat: it is not a Hazard Counter value and no Counter multiplier reads it.
No native Core-Stat bonus and no matching-Counter multiplier.

18. 고급 식자재 유통 계약 (id coldcase) · tags=[Fresh,Premium] · eligible=Uncommon+ Food/Drink
- the Day's first ORDER sheet carries one extra Uncommon+ Food/Drink slot (never on a Reroll; the 새벽 회수 계약 rule)
- an Uncommon+ Food/Drink sale pays the store 15% of the charged price on top (HQ commission)
- no offer weight, no purchase intent, no shelf life, no Stat effect

Eligibility: category in [Food, Drink] and rarity >= Uncommon. Do not use a retired fresh boolean/property.

19. 길드 납품 인증 · tags=[Premium,Expedition] · `DIRECTOR DOCUMENT BASELINE`
effect=Rare+ expedition-response items gain premium-economy viability
- Price = 220G
- HQ commission = 40% of Item list price
- buyer NPC Wallet +30G

20. 새벽 회수 계약 · tags=[Fresh,Rotation]
- 새벽 회수 계약: Food/Drink stock whose shelf life ends is taken back at 50% of its cost instead of
  being wasted (it is not counted as waste); it is taken back that Night, with the discard (ITEM §SHELF LIFE),
  so the refund is on that Day's receipt
- each Day's first ORDER offer generation adds 1 extra Food/Drink offer; a Reroll does not
- it discounts no ORDER

### KEYSTONE
21. 물류 본부계약 · tag=Rotation · `DIRECTOR DOCUMENT BASELINE`
- Price = 300G
- effect = today every ORDER purchase price -3% per previous-Day sale, at most -30% (10+ sales)
- no Item, rarity or quantity condition; it stacks with 묶음발주 계약 multiplicatively
- the internal purchase-price floor (45% of list) still applies

22. 평생 단골제 · tag=VIP · User 2026-10-02 remake (no Gold, no revisit weight)
effect=a 단골 is stronger, and stays a 단골
- Price = 310G
- 단골 (Trusted Regular, Loyalty >= 51): the four Core Stats x1.10 in the prepared reading (after Items and condition,
  before the Hazard reading), so Hazard Counters through the Stat routes rise too; listed among each Stat's sources
  (`평생 단골제 +10%`); the Final party reads it the same way
- while owned, a change that starts at Loyalty >= 51 never takes it below 51 (a 바가지 sale to a 단골 keeps the status);
  an adventurer not yet a 단골 has no floor
- the condition reads the Trusted Regular owner judgement; NPC_TRAIT_v2.8.0.md owns 단골 at 51

23. 왕도 프리미엄 인증 · tag=Premium · refusal/inventoryRisk=REMAINS · `DIRECTOR DOCUMENT BASELINE`
effect=successful 150% sale of any rarity -> extra premium commission
- Price = 320G
- HQ commission = 40% of the charged (150%) sale price
- the flat 150% purchase-intent penalty is -0.06 for the owner (+0.10 on -0.16)
- base operating cost +10% of overheadBase from the next Day - the 지역 거점점 계약 rule, added to it, never compounded
- the 1.5x price burden and the 150% Loyalty -4 (refused -2) are unchanged

24. 원정 작전실 (`opsRoom`) · tag=Expedition · User 2026-10-02 remake of 원정 전문 인증 (`expeditionCert`; a save's old id is
    read as `opsRoom` on load)
- Price = 290G
- for each Hazard of the adventurer's Gate: overshoot = min(0.5, max(0, Counter ÷ Threat - 1)) - the resolver's own Counter
  (the customer's Stat share and Traits, Store Supports, the Bag); a Hazard answered short counts 0
- 투력 x (1 + 0.6 x the average overshoot over ALL the Gate's Hazards) - +30% at most; applied after the Hazard reading (no
  Hazard reads 투력), so it reaches everything that reads 투력 (the fight, the forecast, the Great Success margin, the death
  risk, the Final individual power) and no other Stat; no separate combat-power concept is introduced
- the SALE Stat grid lists it among 투력's sources (`원정 작전실 +N%`), so the shown 투력 and its sources agree
- three Hazards (an Event Hazard on a II Gate) average over three; the Final averages over its whole Hazard pool, each
  participant on its own preparation
- no Counter multiplier, no Wallet, no ORDER offer effect; the SALE 전투 전망 stays the SALE-entry snapshot (with the
  entry Bag), so an owner's bonus from a sale is not previewed
- copy -> COPY_AUDIT §11-24

32. 응급 처치대 · tag=Expedition · `DIRECTOR DOCUMENT BASELINE`
- Price = 300G
- an injured (ordinary Injury, not 중상) adventurer arriving at SALE recovers with 20% (the 의무실 현판 door heal, drawn
  after it; only for an injured arrival and only while owned)
- the SALE state strip says so once (COPY_AUDIT §9-4b)
- D30 has no SALE arrival, so it is in the D30 no-effect exclusion set
- measurement evidence: archive/v2.9.11/v2.9.11-drafts.md §C-2

25. 24시간 신선체계 · tag=Fresh · `DIRECTOR DOCUMENT BASELINE`
notAutomatic=[HazardCounter,RiskRewardPenalty,Insurance,unrelatedAttachedEffect]

```text
no shelf-life effect and no operating-cost effect
Food/Drink ORDER (purchase) price x1.15
Food/Drink positive native Core-Stat contribution +50%
Supply (피로 회복) unchanged
Hazard Counter unchanged
Insurance unchanged
RiskReward penalty unchanged
```

26. 지역 거점점 계약 · tag=Customer · livingNpcCapIgnored=NO · `DIRECTOR DOCUMENT BASELINE`

Role: pay overhead to widen the catchment. Price = 340G.

Each applicable Morning, exactly one mutually exclusive visitor result:
+1 visitor = 45% · +2 visitors = 15% · no visitor increase = 40%

Expected visitor delta = +0.75 / applicable Day before ordinary availability caps.
The visitor increase is subject to the ordinary active/available adventurer cap.

Operating cost: `overheadBase + overheadBase × 0.10 + other flat extras`, then the existing operating-cost rounding
rule. The 10% applies to `overheadBase` only; it is not applied again to other Event or Relic flat modifiers and does
not compound with them.

### UTILITY
27. 후방 창고 증설
- 후방 창고 증설: inventory capacity +5

28. 본사 추가발주권
- 본사 추가발주권: from the next ORDER-offer generation, offer candidate count +2

29. 발주 교환권
effect=매일 첫 canonical Full-offer Reroll 비용 0G
firstRerollFree=YES · freeUseConsumesFirstRerollStep=NO · dailyReset=YES · singleOfferSwap=NO · rerollAdvancesPity=NO ·
pity farming=NO
- applies to canonical full-offer reroll; current eligibility/coverage/rarity rules preserved
- after the free first use, same-Day Reroll follows the normal curve from its first step

Paid Reroll costs use the current authoritative curve from `ECONOMY_ORDER_v2.8.0.md`. With the current curve:

```text
normal: 50 -> 100 -> 200 -> 400 -> 800 -> x2 thereafter
with 발주 교환권: 0 -> 50 -> 100 -> 200 -> 400 -> x2 thereafter
```

30. 운영 효율 매뉴얼 · buildDefiningPower=LOW · `DIRECTOR DOCUMENT BASELINE`
- Price = 130G
- from next Day, basic operating cost -30G

Late acquisition may rationally be skipped; that alone is not a Balance Finding. Evaluate this support by whether
earlier acquisition can repay its price and create meaningful remaining-Run economy value.

### ADDED SUPPORTS (User 2026-10-04)

33. 소문 수집 게시판 (rumorBoard) · tags=[] · Price = 60G
- every Normal Event Day rolls an Event (chance 100% instead of 40%; EVENT §EVENT TIMING / FREQUENCY): every morning except
  the Store Support window Days and this Run's 심층원정 Days, and on the account's first Run DAY 1 too
- the Events themselves are the ordinary catalogue draw - good and bad alike; this is a variance pick, not a power pick

34. 단골 추천 엽서함 (postcard) · tags=[VIP] · Price = 80G
- on a Day a 단골 visited, every other visitor of that Day gains 단골도 +5 at the Night (before the expeditions); two 단골
  on the same Day give each other the gain too
- not a purchase gain: 단골 스탬프 기계 does not multiply it; 평생 단골제's floor and the 0~100 clamp apply

35. 길드 구조대 계약 (rescueContract) · tags=[Expedition] · Price = 240G
- an ordinary expedition whose Outcome is still 사망 after the Items (귀환석, 세계수 생환부적) rolls once more: 15% -> 중상
  (the ordinary 중상: Injury 2, recovery Days); the 강골 Trait and 구급키트 then settle as usual
- the report says so (`길드 구조대가 사망을 중상으로 바꿈`); the hero proof reads the same roll

### RETIRED SUPPORTS

단골 묶음혜택 (memberBundle) is no longer offered in any window (User 2026-10-04). A save that already owns it keeps it, and
it plays as its blueprint above.

## FRESH NATIVE-STAT COMPOSITION

Positive native Core Stat means the Item's own positive contribution to 투력/강인함/기동/정신 before unrelated effects.
Fresh native-Stat bonuses stack additively from the Item's base native positive Stat:
    즉석식품 코너 + 24시간 신선체계 = +25% +50% => base positive native Stat ×1.75

Food-affinity Trait percentages that target the same positive native Core-Stat channel join this same base-additive
pool under `ITEM_v2.8.0.md`. Do not multiply a completed Fresh percentage layer by `대식가/소식가` as a second
sequential layer. This high point is an allowed coherent-build reward.

## VISITOR SUPPORT COMPOSITION

The supports answer different questions and none is a strict upgrade of another.
`board`, `hub`, `groupOrder` and the `wall` Decoration are independent and may all be held at once.

```text
board      = base-roll floor
hub        = probabilistic catchment, paid for in overhead
groupOrder = its own 20% Morning roll, +1 visitor
wall       = 10% Morning proc (Decoration, not a Relic)
```

They share no ownership, no purchase candidacy and no slot. Holding more than one applies each in its own place: the
board floor first on the base roll, then the probabilistic additions.

## ITEM / BUILD COMPATIBILITY

Relic build filters must be supported by the active Item catalog, not only by description text.
Build-filtered Relics must not depend on one single eligible SKU. Item categories -> `ITEM_v2.8.0.md`.

Rotation:
- low-rarity useful specialists remain sellable/valuable into late run
- bulk economics have enough cheap/common SKUs to create real choices

Premium:
- Rare+ pool contains enough distinct roles/price points to support repeated premium play
- Rare+ must not become universal superiority

Expedition:
- uses canonical 9 Hazard matrix only
- Counter availability preserves Main vs Alternative-route choice
- Food/Drink Supply (Fatigue recovery) is not a Hazard key; it belongs to Fresh or Fresh+Expedition interaction
- Expedition Relics that inspect Item functional role use actual Counter/Insurance functionality rather than physical item shape

Fresh:
- active Food/Drink pool spans multiple prices/rarities/roles
- native core boost means positive native Stat only; Supply (피로 회복) stays its own channel
- specialist FieldGear remains the more reliable dedicated Counter
- category checks use Food/Drink categories, not stale legacy `fresh` category aliases

Customer/VIP:
- may amplify demand/customer value but must not create hidden Item-Job affinity

## ACTIVE POOL BOUNDARY

activeRelicPool=the 34 offered canonical blueprints in this document (35 blueprints, 단골 묶음혜택 retired)

nonCanonicalFacilityActive=NO
excludedFacilityNames=[포션 냉장고,마석 충전대,상권 분석대]

No excluded facility effect may modify Order/Item/NPC/Dungeon resolution.

## STORE SUPPORT IDS

Ids read as the current names: `opsRoom` (원정 작전실, was `expeditionCert`), `fieldRepair` (야전 정비대), `dawnRecovery` (새벽 회수 계약), `rareContract`
(희귀상품 입고 계약), `firstVisitCoupon` (첫 방문 쿠폰), `groupOrder` (단체 주문 창구), `extraOrder` (본사 추가발주권),
`rerollTicket` (발주 교환권). The Event 본사 반값 행사 is `halfPrice` (its effect key and support value too). Save schema v9.

## PRICE

D0=free

D5+: price=basePrice × limitedRandomBand · randomBand≈±15–20% starting point · priceFixedForWindow=YES

relative direction: Foundation < Hybrid < Keystone; Utility is priced as a cheap support

The following 21 Store Support base prices are the approved baseline.

| ID | Store Support | Base Price |
|---|---|---:|
| bulk | 묶음발주 계약 | 130G |
| stamp | 단골 스탬프 기계 | 130G |
| member | 회원 관리대장 | 130G |
| rareContract | 희귀상품 입고 계약 | 140G |
| guarantee | 길드 보증 진열대 | 140G |
| hazardBoard | 원정 위험 게시판 | 60G |
| fieldRepair | 야전 정비대 | 80G |
| kitchen | 즉석식품 코너 | 200G |
| board | 길드 전광판 | 110G |
| firstVisitCoupon | 첫 방문 쿠폰 | 110G |
| groupOrder | 단체 주문 창구 | 200G |
| memberBundle | 단골 묶음혜택 | 190G |
| premiumMember | 프리미엄 멤버십 | 200G |
| expeditionMeal | 원정 도시락 코너 | 200G |
| coldcase | 고급 식자재 유통 계약 | 180G |
| dawnRecovery | 새벽 회수 계약 | 190G |
| fresh24 | 24시간 신선체계 | 360G |
| warehouse | 후방 창고 증설 | 130G |
| extraOrder | 본사 추가발주권 | 190G |
| rerollTicket | 발주 교환권 | 120G |
| fieldStretcher | 야전 들것 | 80G |
| rumorBoard | 소문 수집 게시판 | 60G |
| postcard | 단골 추천 엽서함 | 80G |
| rescueContract | 길드 구조대 계약 | 240G |

The other 11 active support prices are exact in their Store Support entries above.
Price should follow actual ROI, not label alone.

## GOLD ROLE

Gold tension: current cash vs NPC investment vs store investment

price modes: 150%=current Gold focus · 100%=stable operation · 50%=NPC future-value investment ·
Relic=store future-value investment

Canonical economy -> ECONOMY_ORDER_v2.8.0.md

## INFORMATION

Relic description must make clear: what changes · trigger/condition · meaningful limit · price when currently purchasable.

Material hidden modifier=NO

Internal design taxonomy: Foundation / Hybrid / Keystone / Utility; Rotation / VIP / Premium / Expedition / Fresh /
Customer Build Axis.

playerFacingTaxonomy=NO — do not show Player-facing labels such as `신선식품 · 기반`, `단골 육성 · 기반`,
`고마진 · 키스톤`. These are Director/implementation organization terms; the Player discovers build synergy from actual
effects and combinations.

Exact internal coefficient may stay hidden when not needed, but effect existence/condition must be player-readable.

## FEEL / ATTRIBUTION BOUNDARY

Deterministic visible changes may expose their Store Support source: Order offer count +N · operating cost -N ·
HQ commission +N · deterministic visitor-count delta · other exact resolved deltas.

Probability/weight-only effects do not claim that a particular random result happened because of the support.
Do not build a new rarity-attribution UI merely to explain weighting.

The Player can always inspect current owned Store Supports through the existing compact owned support reference.

## COPY TRUTH

단골 스탬프 기계 Player copy:
    손님의 구매로 오르는 단골도: 정가 +2 (기존 +1), 50% 할인 +7 (기존 +4). 원정 뒤에 오르는 단골도는 그대로.

Do not mention 무료 보급; the active price system has no free-sale mode.

길드 전광판 must describe the actual base-roll floor:
    손님 수가 적게 나와도 하루 기본 4명은 온다 (기존 3명).

발주 교환권: first canonical full reroll each Day = 0G, then the ordinary paid curve from its first step:
50G -> 100G -> 200G ...

SLOTH: 점포지원, not 유물

## SAVE CONTRACT

Persist at minimum: owned relic IDs · active relic window · candidates · prices · purchased/deferred state ·
immediate-repeat cooldown state · Sloth opportunity / consumedBySealBreak state when applicable.

Save/Load must not become an offer reroll method.

## BALANCE

A Store Support is not required to remain equally valuable at every acquisition Day. Late-Run decline is valid when an
early acquisition has enough remaining Run time to create a meaningful snowball and the Player can rationally choose to
skip it later. Future tuning is measurement-gated.

### METRICS

Per Relic: offer rate · pick/purchase rate · average purchase day · ROI · final Gold · sales mix · NPC survival · boss outcome

Per Run: build-piece count distribution [0,1,2,3,4,5+] · candidate tag diversity · same-relic repeat rate · utility share ·
Keystone timing · excessive build lock-in · no-clear-build viability

Reject: dead picks · automatic picks · universal snowball · mandatory Relic purchase · no-Relic always optimal ·
one Build always dominates

## QA — ACCEPTANCE

Acceptance criteria for this owner. Status values are not stored here; FAIL is valid evidence.

### WINDOW SCHEDULE / LIFECYCLE

#### REL-Q01 — WINDOW SCHEDULE
SETUP: Play D0–D30.
EXPECT: Relic windows appear: D0,D5,D10,D15,D20,D25,D30
PASS: No missing/extra normal milestone window.

#### REL-Q02 — D0 FOUNDATION
SETUP: Start new run.
EXPECT: 3 candidates · Foundation only · choose <=1 · free · defer allowed · still free on reopen through DAY 4 · gone at D5
PASS: All conditions hold.

#### REL-Q03 — D5+ PURCHASE
SETUP: Open D5+ window.
EXPECT: 3 candidates · Gold prices · max 1 purchase/window · defer allowed
PASS: All conditions hold.

#### REL-Q04 — DEFER REOPEN
SETUP: Open D5 window, buy nothing, close.
EXPECT: Reopen possible during valid management phases until next window.
PASS: Candidates/prices unchanged.

#### REL-Q05 — WINDOW EXPIRY
SETUP: Defer D5 until D10.
EXPECT: D5 window expires when D10 window begins.
PASS: Only current window remains active.

#### REL-Q06 — NO SALE/NIGHT REOPEN
SETUP: Have active deferred Relic window.
EXPECT: Relic reopen unavailable during active Sale and Night resolution.
PASS: Management timing respected.

#### REL-Q07 — SAVE/LOAD PERSISTENCE
SETUP: Record candidates/prices, Save/Reload.
EXPECT: Same candidate IDs, prices, purchased/deferred state.
PASS: Reload does not reroll.

#### REL-Q25 — PRICE STABILITY
SETUP: Open window, record prices, reload/reopen.
EXPECT: Price remains fixed for that window.
PASS: No price fishing.

#### REL-Q38 — MILESTONE FOCUSED REVEAL
SETUP: Reach D5/D10/D15/D20/D25/D30 with a new Relic window.
EXPECT:
- each new milestone window is visibly presented once
- candidate IDs/prices are already fixed
- Player may Buy or choose `나중에 결정`
- defer keeps the same window
- Save/Reload does not replay/reroll the reveal as an exploit
PASS: A valid Relic window cannot silently exist in the background so the Player misses the milestone choice.

#### REL-Q41 — BOSS REVEAL PRECEDES SAME-DAY RELIC
SETUP: Reach D5, D15 with a fresh milestone window.
EXPECT:
- D5 Boss Identity reveal completes before D5 Relic focused reveal
- D15 Boss Trait reveal completes before D15 Relic focused reveal
PASS: Relic choice never appears before the information intentionally granted for that Day.

#### REL-Q40 — OWNED RELIC QUICK VIEW
SETUP: Own multiple Relics and inspect Morning, Order, Sale.
EXPECT:
- owned Relics are quickly readable in all three phases
- Sale access is read-only
- purchase/defer timing cannot be bypassed
PASS: Store-build information needed for decisions is available without enabling illegal Relic actions.

#### REL-Q-v28-20 — DAY 0 FIRST SUPPORT SURFACE

PASS:
- DAY 0 first Store Support choice appears before the D0 Boss-information beat
- candidate surface does not contain the D0 Boss objective
- first-support screen uses current exact Copy-owner text
- choosing one support commits exactly once; `나중에 결정` commits nothing and opens DAY 1
- separate D0 Boss-information beat follows
- normal DAY 1 does not begin before D0 acknowledgement

### D30 WINDOW

#### REL-Q13 — D30 RELEVANCE
SETUP: Open D30 window.
EXPECT: All candidates can affect Final preparation/outcome.
PASS: No future-only dead relic.

#### REL-Q78 — D25 FINAL INFO / D30 WINDOW

Reach D25 then D30.

PASS:
- exact Final Family/Hazard state is already known/persisted from D25
- D30 Relic window does not generate/reroll a Family Pair
- D30 candidate relevance reads the persisted Final state
- SLOTH D30 Seal option still shares the same mutually exclusive window

#### REL-Q-v28-18 — D30 DEFAULT INCLUDE

D30 candidate generation must be: ordinary eligible pool minus explicit D30 no-effect exclusions.
It must NOT be implemented as a positive finalUseful/futureRelevant allowlist.

Current explicit exclusions: the §D30 CANDIDATE ELIGIBILITY list (stamp, member, guarantee, fridge, board,
firstVisitCoupon, groupOrder, memberBundle, premiumMember, returnPoints, supplyCert, dawnRecovery, royalCert,
hub, efficiency, firstAidDesk).

PASS:
- every other current support can enter D30 under ordinary eligibility
- a newly added future Store Support enters D30 by default
- a future support is excluded only after being explicitly added to the no-effect set
- a support that requires a legal D30 Reroll/ORDER action to realize value is still eligible

### SLOTH WINDOW

#### REL-Q42 — SLOTH OPPORTUNITY SCHEDULE
SETUP: Run many seeded SLOTH runs.
EXPECT:
- exactly 2 distinct opportunity Days selected from D15/D20/D25
- D30 always opportunity
- D10 never opportunity
- selected Days persist on Save/Load
PASS: Every SLOTH run has exactly three valid opportunities with no reroll exploit.

#### REL-Q43 — SLOTH MUTUAL EXCLUSION
SETUP: At a SLOTH opportunity window, choose Seal Break.
EXPECT:
- Gold cost=0
- Seal Break count +1
- no Relic is acquired from that window
- acquisition opportunity is consumed
- reload cannot obtain both outcomes
PASS: One window produces at most one of [Relic, Seal Break].

#### REL-Q44 — SLOTH DEFER / EXPIRY
SETUP: Open a SLOTH opportunity and defer without committing either outcome.
EXPECT:
- ordinary window reopen rules remain valid until expiry / D30 Final lock
- no Seal Break is auto-awarded
- after committing either Relic or Seal Break, the other branch is unavailable
PASS: Sloth reuses the existing Relic window lifecycle without a duplicate choice path.

#### REL-Q79 — SLOTH WINDOW OWNERSHIP

PASS:
- existing exactly-3 opportunity lifecycle remains
- one window yields at most one of [Relic, Seal Break]
- RELIC does not implement/duplicate Boss Power by break count
- Boss Power comes only from `BOSS_v2.8.0.md`

### CANDIDATE RULES

#### REL-Q08 — OWNED DUPLICATE
SETUP: Own a nonstackable Relic and open later windows.
EXPECT: Owned Relic is excluded.
PASS: No duplicate ownership offer.

#### REL-Q09 — IMMEDIATE REPEAT
SETUP: Skip an offered Relic.
EXPECT: It may recur later but not immediately next window.
PASS: Immediate-repeat protection works.

#### REL-Q10 — OFFER DIVERSITY
SETUP: Sample many windows.
EXPECT: When practical, candidate set includes >=2 different primary build directions.
PASS: Windows are not routinely three near-identical choices.

#### REL-Q11 — SOFT BUILD BIAS
SETUP: Own several same-axis Relics and sample offers.
EXPECT: Related pieces may be somewhat more likely.
PASS: No guaranteed missing-piece completion.

#### REL-Q12 — GRADE DRAW
SETUP: Inspect D0 and later windows.
EXPECT:
- D0 offers 일반 only
- D5+ each card rolls 일반 60% · 희귀 28% · 영웅 12% and draws within that grade (whole pool when the grade is empty)
- soft build bias and diversity still apply inside the grade
PASS: no 희귀 / 영웅 on D0, the per-card grade shares hold, and no hidden guaranteed 영웅 path.

### POOL / BLUEPRINTS

#### REL-Q14 — POOL SIZE
SETUP: Inspect canonical pool.
EXPECT: 35 total (34 offered): Foundation 14 · Hybrid 9 · Keystone 7 · Utility 5; grades 일반 17 · 희귀 10 · 영웅 7 (§GRADE)
PASS: Counts match.

#### REL-Q15 — BUILD AXES
SETUP: Audit relic catalog.
EXPECT: Primary axes represented: Rotation/VIP/Premium/Expedition/Fresh/Customer
PASS: Each axis has coherent Foundation→later build support.

#### REL-Q16 — FOUNDATION BLUEPRINTS
SETUP: Audit IDs 1–12 and 31.
EXPECT: Effects match canonical identities for: 묶음발주 계약, 회전 진열대, 단골 스탬프 기계, 회원 관리대장,
희귀상품 입고 계약, 길드 보증 진열대, 원정 위험 게시판, 야전 정비대, 대형 냉장고, 즉석식품 코너, 길드 전광판,
첫 방문 쿠폰, 야전 들것
PASS: No material behavior contradicts RELIC spec.

#### REL-Q17 — HYBRID BLUEPRINTS
SETUP: Audit IDs 13–20.
EXPECT: Each bridges its stated two build axes.
PASS: No Hybrid acts as unrelated generic stat relic.

#### REL-Q18 — KEYSTONE BLUEPRINTS
SETUP: Audit IDs 21–26 and 32.
EXPECT: Each materially strengthens its own build axis without becoming mandatory.
PASS: Build engine is strong but optional.

#### REL-Q19 — UTILITY BLUEPRINTS
SETUP: Audit IDs 27–30.
EXPECT: Utility supports operation without replacing build identity.
PASS: No Utility is universal auto-pick.

#### REL-Q37 — ACTIVE RELIC POOL BOUNDARY
SETUP: Inspect all loaded/acquirable facility/relic IDs.
EXPECT: Only the 32 canonical Relic blueprints are active. `포션 냉장고`, `마석 충전대`, `상권 분석대` do not affect gameplay.
PASS: No excluded facility is offered, owned, or applied as a hidden modifier.

#### REL-Q-v28-1 — NAME COLLISION CLEANUP

Expected:
- rareContract -> 희귀상품 입고 계약
- coldcase -> 고급 식자재 유통 계약
- the wall Decoration is 명예 모험가 액자; no Store Support is named 쇼케이스

No active Store Support uses 쇼케이스 in these two names.

#### REL-Q-v28-21 — SUPPORT EXACT FUNCTIONS

Verify these exact Store Support functions in RELIC_v2.8.0.md:

- 묶음발주 계약 -> same SKU 3+, 3rd+ units -20%
- 단골 스탬프 기계 -> paid-purchase Loyalty gain +75%; survival Loyalty excluded
- 회원 관리대장 -> the 단골도 visit term counts double, from the Day it is acquired
- 희귀상품 입고 계약 -> Rare+ ORDER weight +70%; Rare+ sale charged at the ordinary price, HQ pays +10% of the charged price; no operating-cost modifier
- 길드 보증 진열대 -> once/Day first sale with a CHARGED price >=200G, HQ customer subsidy = 30% of
  the charged price, Player still receives the full chosen sale price
- 원정 위험 게시판 -> today's Gate Hazard matching offer weight +50%, never a guarantee
- 야전 정비대 -> carried Hazard Counter values x1.40, any category; no offer weight / quantity effect
- COUNTER JUDGEMENT: the Counter pity and 길드 납품 인증 read 직접 대응 only (a 기동 Item on a 속박/진창 Gate does not qualify); the SALE acceptance floor and 원정 위험 게시판 read 관련 준비 (direct Counter or the pressed Stat)
- 즉석식품 코너 -> Food/Drink native Core-Stat +25%; base operating cost +10% of overheadBase
- 첫 방문 쿠폰 -> first-ever visit: NPC Wallet +30G on arrival, purchase intent +20%p for that visit
- 단체 주문 창구 -> own 20% Morning roll for +1 visitor; +15G HQ commission per sale from the Day's 5th
- 단골 묶음혜택 -> 단골's second paid purchase that Day: customer pays / is judged on half the charged
  price, store receives the full charged price
- 프리미엄 멤버십 -> 다시 온 손님 arrival NPC Wallet +25G; Rare+ purchase intent +15%p; a Rare+ purchase at 100% / 50% 단골도 +10
- 원정 도시락 코너 -> flat +2 on every Hazard of the actual Gate per Food/Drink Item (one Hazard at the 마왕성); Food/Drink ORDER price ×1.15
- 고급 식자재 유통 계약 -> one extra Uncommon+ Food/Drink slot on the Day's first ORDER sheet; Uncommon+ Food/Drink sale +15% HQ commission
- 새벽 회수 계약 -> expiring Food/Drink recovered at 50% of cost (not waste); +1 Food/Drink offer on
  the Day's first offer generation
- 24시간 신선체계 -> Food/Drink native Core-Stat +50%; Food/Drink ORDER price x1.15; no shelf life
- 야전 들것 -> an ordinary Injury costs 투력 8% instead of 15% in every preparation read
- 응급 처치대 -> an injured SALE arrival recovers with 20%, after the 의무실 현판 roll; the state strip says so
- 후방 창고 증설 -> inventory capacity +5
- 본사 추가발주권 -> next ORDER-offer generation candidate count +2

FAIL if Source omits one of these exact functions or uses a different numeric value.

### PRICE

#### REL-Q26 — PRICE BAND
SETUP: Sample prices.
EXPECT: Limited random band around approved base. Starting target around ±15–20%.
PASS: Exact final values match `RELIC_v2.8.0.md` §PRICE.

#### REL-Q-v28-22 — SUPPORT BASE PRICES

Expect exactly these approved base prices for these rows:

    bulk 130 · stamp 130 · member 130 · rareContract 140 · guarantee 140 · hazardBoard 60 · fieldRepair 80 ·
    kitchen 170 · board 110 · firstVisitCoupon 110 · groupOrder 200 · memberBundle 190 · premiumMember 200 ·
    expeditionMeal 200 · coldcase 180 · dawnRecovery 190 · fresh24 360 · warehouse 130 · extraOrder 130 ·
    rerollTicket 120

FAIL if implementation uses a different base price without a new approved owner amendment.

### ROTATION SUPPORTS

#### REL-Q-v28-14 — ROTATION DISPLAY SUPPLY ENGINE

Given 회전 진열대 is owned:
- previous Day sales >= 4: each newly generated ORDER offer, of every rarity, gets quantity +1; total offer-slot count is unchanged
- previous Day sales < 4: quantity is unchanged

FAIL:
- any first-bulk discount effect is active on 회전 진열대
- the support directly discounts Item price

#### REL-Q-v28-15 — LOGISTICS HQ PER-SALE DISCOUNT

Expected:
    previous Day sales N
    -> today every ORDER purchase price x (1 - min(30%, 3% x N))
    N = 0 -> no discount; N >= 10 -> -30%

Price 300G.

FAIL:
- the discount needs a quantity, SKU or rarity condition
- the discount exceeds 30%
- the internal 45% purchase-price floor is bypassed

#### REL-Q35 — ROTATION LOW-RARITY VIABILITY
SETUP: Run Rotation-heavy build into late game using Common/Uncommon specialist stock.
EXPECT: Useful low-rarity specialists still have valid demand/value when their Hazard appears.
PASS: Rotation/low-cost build is not invalidated by universal Rare+ upgrades.

### VIP SUPPORTS

#### REL-Q-v28-4 — RETURN POINTS

Expected: paid returning customer survives (no Loyalty threshold) -> Loyalty +5 and NPC Wallet +20G

#### REL-Q-v28-6 — LIFETIME

Expected: 단골 (Loyalty >= 51, Trusted Regular owner) survival -> NPC Wallet +50G; revisit weight +100%

Reads the Trusted Regular owner judgement; no second threshold.

### PREMIUM SUPPORTS

#### REL-Q22 — PREMIUM 150%
SETUP: Use Premium build effects.
EXPECT: 150% may become more viable.
PASS: No relic turns 150% into automatic acceptance.

#### REL-Q-v28-5 — SUPPLY CERT

Expected: eligible Rare+ sale -> HQ commission = 20% of list price, buyer NPC Wallet +30G

#### REL-Q-v28-7 — ROYAL PREMIUM

Expected:
    150% sale of any rarity -> HQ commission = 40% of the charged sale price
    the owner's flat 150% purchase-intent penalty is -0.06 (+0.10 on -0.16)
    the next Day's base operating cost carries +10% of overheadBase, added to 지역 거점점 계약's
    the 1.5x price burden and the 150% Loyalty -4 (refused -2) are unchanged

#### REL-Q36 — PREMIUM POOL SUPPORT
SETUP: Simulate Premium build with canonical Item catalog.
EXPECT: Rare+ offers contain multiple roles/price points and generate repeated meaningful premium-sale decisions.
PASS: Premium does not depend on a single SKU and Rare+ is not universally superior.

### EXPEDITION SUPPORTS

#### REL-Q21 — 원정 작전실 (User 2026-10-02)
SETUP: Own `원정 작전실`; prepare adventurers for one-, two- and three-Hazard Gates and the Final, short and past the need.
EXPECT:
- 투력 x (1 + 0.6 x the average capped overshoot over every Hazard of the Gate); +30% at most; other Stats unchanged
- the 투력 source list carries `원정 작전실 +N%` exactly when the bonus is above 0
- a Hazard answered short counts 0 in the average; no Counter value, Wallet or offer changes
PASS: the bonus equals the formula on every Gate shape; a save holding `expeditionCert` loads as `opsRoom`.

#### REL-Q34 — EXPEDITION BUILD CANONICAL HAZARDS
SETUP: Use 원정 위험 게시판 / 원정 도시락 코너 / 원정 작전실 across all Families.
EXPECT:
- only the 9 canonical Hazards drive Hazard-counter filtering
- Main/Alternative Item routes remain possible
- Food/Drink Supply (피로 회복) is not treated as a Hazard key
PASS: Expedition Relics match the current Dungeon×Item model.

#### REL-Q77 — FIELD MAINTENANCE (야전 정비대)

`야전 정비대` multiplies the Hazard Counter values of every carried Item by 1.40 (User 2026-10-02).

PASS:
- Field Gear, Food and Drink Counter values all x1.40 (e.g. 컵라면 냉기 대응 10 -> 14); Core Stats, 피로 회복 and the flat 원정 도시락
  코너 +2 are unchanged
- no ORDER offer weight or offer quantity effect

### FRESH SUPPORTS

#### REL-Q20 — LARGE FRIDGE
SETUP: Acquire with existing eligible stock.
EXPECT: current non-expired stock extends once · future stock gets extended shelf life · no daily repeated extension ·
no infinite preservation
PASS: Shelf-life logic stable.

#### REL-Q72 — LARGE FRIDGE

EXPECT:
- base price 60G
- Food/Drink shelf life +2
- existing non-expired eligible stock extends once on acquisition
- future stock receives extension
- no Stat/Supply (피로 회복) multiplier
- no repeated daily extension

#### REL-Q-v28-2 — LARGE FRIDGE PRICE

Expected: 대형 냉장고 = 60G (§FRESH blueprint 9, REL-Q72).

PASS only when the active implementation uses 60G.

#### REL-Q73 — INSTANT FOOD CORNER

PASS:
- native Core-Stat +25%
- no operating-cost effect
- Supply (피로 회복) unchanged
- Hazard Counter unchanged
- Insurance unchanged
- RiskReward penalty unchanged

#### REL-Q74 — EXPEDITION MEAL CORNER

Per Food/Drink Item in the Bag:
- Food Supply +2 (피로 회복 +2), Drink Supply +1 (피로 회복 +1)
- flat +2 on every Hazard of the Gate the adventurer actually enters (at the 마왕성, the adventurer's most 취약 Hazard only; blueprint 17)

PASS:
- no native Core-Stat bonus
- no matching-Counter multiplier
- a non-Food/Drink Item takes nothing

#### REL-Q75 — 24H FRESH SYSTEM

EXPECT:
- no shelf-life effect and no operating-cost effect
- Food/Drink ORDER price x1.15
- Supply (피로 회복) unchanged
- Counter unchanged

Fresh-to-Fresh stacking uses base-additive bonuses. When a Food-affinity Trait also applies, its native-Stat percentage
joins the same base-additive pool under `ITEM_v2.8.0.md`.

PASS:
- no multiplicative drift between Fresh pieces
- no sequential Trait×Fresh multiplication

#### REL-Q-v28-13 — FRESH NATIVE-STAT REBASELINE

Expected:
- 즉석식품 코너 native Core-Stat +25%
- 24시간 신선체계 native Core-Stat +50%
- 원정 도시락 코너 adds no native Core-Stat bonus

Composition is base-additive: kitchen + fresh24 => ×1.75 native positive Stat.

FAIL:
- any alternate native-Stat percentages are active
- Supply (피로 회복) itself is multiplied by these native-Stat percentages

#### REL-Q31 — FRESH CORE-EFFECT SCOPE
SETUP: Use 즉석식품 코너 / 24시간 신선체계 with multi-role Food/Drink Items.
EXPECT: Generic Fresh core boost applies only to native Stat/recovery. It does not automatically boost Hazard Counter,
Insurance, RiskReward penalty or unrelated attached effects.
PASS: Fresh does not become a blanket whole-item multiplier.

#### REL-Q33 — COLD DISTRIBUTION ELIGIBILITY
SETUP: Own 고급 식자재 유통 계약 and generate Order offers repeatedly.
EXPECT: the first sheet carries one extra Uncommon+ Food/Drink slot, and an Uncommon+ Food/Drink sale pays 15% on top.
PASS: Effect has a meaningful multi-SKU pool and is not dependent on one or two Rare items.

#### REL-Q76 — COLD DISTRIBUTION / DAWN RECOVERY CATEGORY

PASS:
- eligibility uses Food/Drink categories
- no stale legacy `fresh` category dependency
- their offer/shelf/recovery identities remain intact

#### REL-Q-v28-9 — COLD DISTRIBUTION ACQUISITION

On acquisition, existing non-expired U+ Food/Drink stock extends exactly once +1 day. Future eligible stock receives +1 day.

FAIL:
- eligibility depends on retired item.fresh property
- Common Food/Drink is extended by coldcase
- eligible existing stock is not extended

#### REL-Q32 — FRESH BUILD ITEM SUPPORT
SETUP: Simulate Fresh-heavy runs across early/mid/late Item availability.
EXPECT:
- Food/Drink pool spans multiple prices/rarities/roles
- Fresh effects have repeated meaningful targets
- specialist FieldGear remains more reliable for dedicated Hazard response
PASS: Fresh is a real build without deleting Expedition specialist identity.

#### REL-Q80 — FRESH DOES NOT DELETE SPECIALISTS

Full-run/targeted comparison. PASS direction:
- completed Fresh build materially changes Food/Drink choices
- dedicated Field Gear remains stronger/reliable on its narrow Hazard target unless the actual combined build tradeoff justifies the Food/Drink alternative
- Fresh is powerful through coherent build accumulation, not one universal Food item

### CUSTOMER / VISITOR SUPPORTS

#### REL-Q23 — VISITOR CAP
SETUP: Stack Customer visitor effects.
EXPECT: Visitor increases still respect Living NPC Cap rules.
PASS: No invalid roster overflow.

#### REL-Q30 — CUSTOMER BUILD PACING / ATTACHMENT
SETUP: Play/simulate Customer-heavy builds including visitor-count and newcomer-weight effects.
EXPECT:
- Customer effects create meaningful traffic/composition value
- visitor increases still respect Living NPC Cap
- normal 2–4 trusted-regular feel remains achievable
- extra visitors do not make repetitive interaction burden the primary reward/cost of the build
PASS: Customer remains a store-build choice rather than a pure workload multiplier.

#### REL-Q-v28-3 — FIRST VISIT COUPON

On an adventurer's first-ever visit, with `첫 방문 쿠폰` owned:
- NPC Wallet +30G on arrival
- purchase intent +20%p during that visit
- no visitor is added and no slot is seated

A returning adventurer receives nothing.

#### RELIC-Q-v27-VISITOR — BOARD / HUB

Owner rule: `RELIC_v2.8.0.md` §RELIC BLUEPRINTS 11 (길드 전광판) / 26 (지역 거점점 계약), §VISITOR SUPPORT COMPOSITION.

##### board

PASS:
- the effect applies to the base visitor roll only, before any other modifier
- base 3 becomes 4; base 4, 5 and 6 are unchanged
- no separate chance roll is made for board
- with board held, a Day whose other modifiers would subtract or whose available adventurers
  are fewer than 4 still seats fewer than 4 — the floor is on the base roll, not on the final
  visitor count

FAIL:
- a final visitor count clamped to a minimum of 4
- board raising a base roll of 5 or 6
- board consuming a chance roll from the Run stream

##### hub

PASS:
- the three outcomes never combine on one Morning
- operating cost is `overheadBase + overheadBase × 0.10 + other flat extras`, then the existing
  rounding rule
- the 10% is taken on `overheadBase` alone

FAIL:
- +1 and +2 both applying on the same Morning
- the 10% applied to Event or Relic flat modifiers as well
- the 10% compounding with another percentage overhead modifier

##### composition

PASS:
- board, hub, 단체 주문 창구 and the `wall` Decoration may all be held at once and each applies in its own place
- 단체 주문 창구 makes its own 20% Morning roll for +1 visitor
- holding the `wall` Decoration does not mark board owned, remove it from a purchase window,
  or consume a Relic slot
- the board floor resolves on the base roll before the probabilistic additions

#### REL-Q-v28-17 — REGION HUB

On each applicable Morning exactly one outcome occurs: +1 visitor: 45% · +2 visitors: 15% · +0 visitors: 40%

Expected mean before ordinary availability caps: +0.75 visitor / applicable Day

Also: Price 340G · operating modifier overheadBase +10% · outcomes are mutually exclusive

### UTILITY SUPPORTS

#### REL-Q24 — REROLL RELIC
SETUP: Own `발주 교환권`, start a fresh Day, and use the canonical Full-offer Reroll multiple times.
EXPECT:
- first Full-offer Reroll costs 0G
- next same-Day Reroll uses the first normal cost step
- next Day restores the free first Reroll
- regenerated offers preserve eligibility / coverage / rarity rules
- Reroll does not advance pity
PASS: The Relic provides a clear daily Utility benefit without single-slot swap behavior or pity farming.

#### REL-Q81 — REROLL RELIC USES CURRENT ECONOMY CURVE

With `발주 교환권`:
- first canonical Full-offer Reroll of the Day = 0G
- next same-Day Reroll uses the first current `ECONOMY_ORDER` step
- under the current economy this means `0 -> 50 -> 100 -> 200 ...`
- next Day restores the free first use
- pity is not advanced by Reroll

PASS: No stale `0 -> 60 -> 120` curve survives.

#### REL-Q-v28-8 — OPERATING EFFICIENCY

Expected: Price 130G; from next Day basic operating cost -30G. This is a Production baseline, not harness-only.

### INFORMATION / COPY

#### REL-Q39 — INTERNAL TAXONOMY IS NOT PLAYER-FACING
SETUP: Inspect candidate and owned-Relic UI.
EXPECT:
Player does not see: Foundation / Hybrid / Keystone / Utility · Build Axis names as quality/category coaching ·
labels such as `신선식품 · 기반`.
Player does see: name · effect · condition/limit · price when relevant.
PASS: Build discovery comes from effects, not Director taxonomy labels.

#### REL-Q-v28-10 — COPY TRUTH

Expected:
- 길드 전광판 explains base 3 -> 4 floor, not final minimum visitors 4
- 발주 교환권 sequence after free use starts at 50
- SLOTH active copy says 점포지원

#### REL-Q-v28-12 — STAMP COPY

Expected:
    손님의 구매로 오르는 단골도: 정가 +2 (기존 +1), 50% 할인 +7 (기존 +4). 원정 뒤에 오르는 단골도는 그대로.

FAIL:
- active copy mentions 무료 보급
- mechanic is changed merely to preserve the stale phrase

#### REL-Q-v28-11 — FEEL ATTRIBUTION

Deterministic deltas may identify exact Store Support source.

Probability/weight-only effects:
- remain readable in support description
- do not claim a particular random Item/NPC was caused by that support
- do not receive a new rarity-origin UI

Frozen QA reports aggregate-value weakness as BALANCE FINDING; it does not retune.

### BUILD VALUE / BALANCE

#### REL-Q70 — SINGLE RELIC VS BUILD VALUE

PASS direction:
- one Relic's same-moment direct expedition contribution does not exceed an appropriate Item merely by being a Relic
- coherent 3+ Piece builds can create cumulative Run value clearly larger than one Item
- no generic hidden Power is added to every Relic to force this result

Track value through actual channels: Gold, Item access/quality, waste, visits, NPC growth, Final Party Power.

#### REL-Q71 — BUILD ENGINE TARGET

Across seeded builds:
- 1 Piece = direction visible
- 2 Pieces = operation meaningfully shifts
- 3 Pieces = build engine
- 4 Pieces = strong completed build
- 5+ Piece high-roll may remain unusually strong

For directly power-observable coherent builds, +10~20 Party-equivalent direct/indirect difference at 3~4 Pieces is an initial measurement target, not a hidden runtime bonus.

FAIL: Relic build choice changes labels but not actual Order/Sale/Inventory/NPC investment behavior.

#### REL-Q27 — BUILD HIGH-ROLL
SETUP: Seed a strong synergistic run.
EXPECT: Strong 4–5+ piece synergy is allowed to feel powerful.
PASS: System does not forcibly normalize good seed into average.

#### REL-Q28 — NO-RELIC VIABILITY
SETUP: Play/simulate low-Relic investment route.
EXPECT: Run remains playable though economically/build-wise different.
PASS: Relic purchase is meaningful, not hard mandatory.

#### REL-Q29 — BUILD DIVERSITY
SETUP: Simulate all six build directions.
EXPECT: No one build consistently dominates Gold/survival/final success across all contexts.
PASS: Multiple build identities viable.

#### REL-Q-v28-19 — TIMING VALUE PRINCIPLE

Do not FAIL a support merely because late acquisition is rationally skipped. Balance review verifies instead:
- early acquisition can create meaningful remaining-Run value/snowball
- the support is not an automatic pick at every timing/state
- the support is not a dead pick across all reasonable timing/state combinations

## RELATED
run/save -> CORE_RUN_v2.8.0.md
final expedition / D25 Final state -> FINAL_EXPEDITION_v2.8.0.md
boss/sloth seal / Sloth Boss value -> BOSS_v2.8.0.md
gold/order/reroll -> ECONOMY_ORDER_v2.8.0.md
sale phase -> SALE_v2.8.0.md
npc value -> NPC_TRAIT_v2.8.0.md
Item/category/composition -> `ITEM_v2.8.0.md`
Order/UI -> `UI_UX_v2.8.0.md`
