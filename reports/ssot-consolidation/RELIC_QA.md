# RELIC_QA consolidation ledger

BASELINE=31dfe9d
TARGET=design_ssot/RELIC_QA_v2.8.0.md
CHAIN=design_ssot/RELIC_QA_v2.8.0.md,design_ssot/history/RELIC_QA_v2.7.0.md,design_ssot/history/RELIC_QA_v2.5.0.md

Current-spec consolidation of a QA owner. The pre-consolidation v2.8 patch is kept whole as
`design_ssot/history/RELIC_QA_v2.8.0-patch.md`; the v2.7 and v2.5 versions stay in `history/`.
Checks were judged live against the consolidated design owner `design_ssot/RELIC_v2.8.0.md`.

Placement: one QA list grouped by topic (`##` topic, `###` check, `####` sub-part). QA IDs are kept
as they are (no renumbering). Checks from v2.5 (REL-Q01-Q44), v2.7 (REL-Q70-Q81, RELIC-Q-v27-VISITOR)
and v2.8 (REL-Q-v28-1..22) sit together under their topic; balance checks sit under BUILD VALUE /
BALANCE.

## LEGACY — inheritance pointers / patch scaffolding (the chain is now inline)

The v2.7 override list is applied check by check (see SUPERSEDED below); the v2.7 status line restates
the kept v2.5 status line.

```text
Status values are not stored here.
Conflicting base expectations are superseded as follows:
- base Fresh tests that expect generic Supply amplification are replaced by `REL-Q72~Q75`
- base Reroll-price example values are replaced by `REL-Q81`, which follows current `ECONOMY_ORDER_v2.6.1.md`
- base D30 Family-reveal timing is replaced by `REL-Q78`
All other non-conflicting base QA remains inherited.
## INHERITANCE
All non-conflicting v2.7 Store Support QA remains active.
```

## SUPERSEDED — D30 Final Family disclosure (Final Family/Hazard state is revealed on D25 and reused on D30: REL-Q78; RELIC_v2.8.0.md §ACQUISITION WINDOWS / D30)

```text
- D30 Final Family disclosure completes before D30 Relic focused reveal
```

## SUPERSEDED — 원정전문점 인증 coverage ">=1 Counter" replaced by the qualified 1-Hazard / 2+-Hazard guarantee (REL-Q-v28-16; RELIC_v2.8.0.md §RELIC BLUEPRINTS 24)

```text
EXPECT:
Order offers include >=1 valid Counter role.
```

## SUPERSEDED — Fresh native-Stat values +40% / +80% / +25% -> +30% / +50% / +20% (REL-Q-v28-13; RELIC_v2.8.0.md §RELIC BLUEPRINTS 10 / 17 / 25, §FRESH NATIVE-STAT COMPOSITION)

```text
EXPECT:
Food/Drink positive native Core Stat +40%.
- positive native Core Stat +80%
+40% +80% => base ×2.20
With active Expedition Meal stat condition:
+40% +80% +25% => base ×2.45
Example:
대식가 +40% +80% +25%
=> +30% +40% +80% +25%
=> base ×2.75
```

## SUPERSEDED — Fresh core boost no longer includes Supply (v2.7 replaced generic-Supply Fresh tests with REL-Q72~Q75; current 즉석식품 코너 / 24시간 신선체계: Supply unchanged; REL-Q-v28-13 FAIL: Supply multiplied)

```text
- Supply
```

## SUPERSEDED — 지역 거점점 계약 odds 30% / 5% / 65% -> 45% / 15% / 40% (REL-Q-v28-17; RELIC_v2.8.0.md §RELIC BLUEPRINTS 26)

```text
- exactly one roll per Morning with three mutually exclusive outcomes: 30% +1, 5% +2, 65% none
```

## SUPERSEDED — PASS3 Reroll curve 0 -> 60 -> 120 -> 240 (replaced by REL-Q81; current curve RELIC_v2.8.0.md §RELIC BLUEPRINTS 29 / ECONOMY_ORDER_v2.8.0.md)

```text
- with the PASS3 starting curve: 0G -> 60G -> 120G -> 240G ...
```

## REWORD — check headings one level down under topic headings (text unchanged)

```text
## REL-Q01 — WINDOW SCHEDULE
## REL-Q02 — D0 FOUNDATION
## REL-Q03 — D5+ PURCHASE
## REL-Q04 — DEFER REOPEN
## REL-Q05 — WINDOW EXPIRY
## REL-Q06 — NO SALE/NIGHT REOPEN
## REL-Q07 — SAVE/LOAD PERSISTENCE
## REL-Q25 — PRICE STABILITY
## REL-Q38 — MILESTONE FOCUSED REVEAL
## REL-Q41 — BOSS REVEAL PRECEDES SAME-DAY RELIC
## REL-Q40 — OWNED RELIC QUICK VIEW
## REL-Q-v28-20 — DAY 0 FIRST SUPPORT SURFACE
## REL-Q13 — D30 RELEVANCE
## REL-Q78 — D25 FINAL INFO / D30 WINDOW
## REL-Q-v28-18 — D30 DEFAULT INCLUDE
## REL-Q42 — SLOTH OPPORTUNITY SCHEDULE
## REL-Q43 — SLOTH MUTUAL EXCLUSION
## REL-Q44 — SLOTH DEFER / EXPIRY
## REL-Q79 — SLOTH WINDOW OWNERSHIP
## REL-Q08 — OWNED DUPLICATE
## REL-Q09 — IMMEDIATE REPEAT
## REL-Q10 — OFFER DIVERSITY
## REL-Q11 — SOFT BUILD BIAS
## REL-Q12 — KEYSTONE TIMING
## REL-Q14 — POOL SIZE
## REL-Q15 — BUILD AXES
## REL-Q16 — FOUNDATION BLUEPRINTS
## REL-Q17 — HYBRID BLUEPRINTS
## REL-Q18 — KEYSTONE BLUEPRINTS
## REL-Q19 — UTILITY BLUEPRINTS
## REL-Q37 — ACTIVE RELIC POOL BOUNDARY
## REL-Q-v28-1 — NAME COLLISION CLEANUP
## REL-Q26 — PRICE BAND
## REL-Q-v28-14 — ROTATION DISPLAY SUPPLY ENGINE
## REL-Q-v28-15 — LOGISTICS HQ TRIGGER
## REL-Q35 — ROTATION LOW-RARITY VIABILITY
## REL-Q-v28-4 — RETURN POINTS
## REL-Q-v28-6 — LIFETIME
## REL-Q22 — PREMIUM 150%
## REL-Q-v28-5 — SUPPLY CERT
## REL-Q-v28-7 — ROYAL PREMIUM
## REL-Q36 — PREMIUM POOL SUPPORT
## REL-Q21 — EXPEDITION CERTIFICATION
## REL-Q-v28-16 — EXPEDITION CERT COVERAGE
## REL-Q34 — EXPEDITION BUILD CANONICAL HAZARDS
## REL-Q77 — EXPEDITION SHELF CATEGORY MIGRATION
## REL-Q20 — LARGE FRIDGE
## REL-Q72 — LARGE FRIDGE
## REL-Q-v28-2 — LARGE FRIDGE PRICE
## REL-Q73 — INSTANT FOOD CORNER
## REL-Q74 — EXPEDITION MEAL CORNER
## REL-Q75 — 24H FRESH SYSTEM
## REL-Q-v28-13 — FRESH NATIVE-STAT REBASELINE
## REL-Q31 — FRESH CORE-EFFECT SCOPE
## REL-Q-v28-9 — COLD DISTRIBUTION ACQUISITION
## REL-Q32 — FRESH BUILD ITEM SUPPORT
## REL-Q80 — FRESH DOES NOT DELETE SPECIALISTS
## REL-Q23 — VISITOR CAP
## REL-Q30 — CUSTOMER BUILD PACING / ATTACHMENT
## REL-Q-v28-3 — ROOKIE BOARD
### board
### hub
### composition
## REL-Q-v28-17 — REGION HUB
## REL-Q24 — REROLL RELIC
## REL-Q81 — REROLL RELIC USES CURRENT ECONOMY CURVE
## REL-Q-v28-8 — OPERATING EFFICIENCY
## REL-Q39 — INTERNAL TAXONOMY IS NOT PLAYER-FACING
## REL-Q-v28-10 — COPY TRUTH
## REL-Q-v28-12 — STAMP COPY
## REL-Q-v28-11 — FEEL ATTRIBUTION
## REL-Q70 — SINGLE RELIC VS BUILD VALUE
## REL-Q71 — BUILD ENGINE TARGET
## REL-Q27 — BUILD HIGH-ROLL
## REL-Q28 — NO-RELIC VIABILITY
## REL-Q29 — BUILD DIVERSITY
## REL-Q-v28-19 — TIMING VALUE PRINCIPLE
```

```new
### REL-Q01 — WINDOW SCHEDULE
### REL-Q02 — D0 FOUNDATION
### REL-Q03 — D5+ PURCHASE
### REL-Q04 — DEFER REOPEN
### REL-Q05 — WINDOW EXPIRY
### REL-Q06 — NO SALE/NIGHT REOPEN
### REL-Q07 — SAVE/LOAD PERSISTENCE
### REL-Q25 — PRICE STABILITY
### REL-Q38 — MILESTONE FOCUSED REVEAL
### REL-Q41 — BOSS REVEAL PRECEDES SAME-DAY RELIC
### REL-Q40 — OWNED RELIC QUICK VIEW
### REL-Q-v28-20 — DAY 0 FIRST SUPPORT SURFACE
### REL-Q13 — D30 RELEVANCE
### REL-Q78 — D25 FINAL INFO / D30 WINDOW
### REL-Q-v28-18 — D30 DEFAULT INCLUDE
### REL-Q42 — SLOTH OPPORTUNITY SCHEDULE
### REL-Q43 — SLOTH MUTUAL EXCLUSION
### REL-Q44 — SLOTH DEFER / EXPIRY
### REL-Q79 — SLOTH WINDOW OWNERSHIP
### REL-Q08 — OWNED DUPLICATE
### REL-Q09 — IMMEDIATE REPEAT
### REL-Q10 — OFFER DIVERSITY
### REL-Q11 — SOFT BUILD BIAS
### REL-Q12 — KEYSTONE TIMING
### REL-Q14 — POOL SIZE
### REL-Q15 — BUILD AXES
### REL-Q16 — FOUNDATION BLUEPRINTS
### REL-Q17 — HYBRID BLUEPRINTS
### REL-Q18 — KEYSTONE BLUEPRINTS
### REL-Q19 — UTILITY BLUEPRINTS
### REL-Q37 — ACTIVE RELIC POOL BOUNDARY
### REL-Q-v28-1 — NAME COLLISION CLEANUP
### REL-Q26 — PRICE BAND
### REL-Q-v28-14 — ROTATION DISPLAY SUPPLY ENGINE
### REL-Q-v28-15 — LOGISTICS HQ TRIGGER
### REL-Q35 — ROTATION LOW-RARITY VIABILITY
### REL-Q-v28-4 — RETURN POINTS
### REL-Q-v28-6 — LIFETIME
### REL-Q22 — PREMIUM 150%
### REL-Q-v28-5 — SUPPLY CERT
### REL-Q-v28-7 — ROYAL PREMIUM
### REL-Q36 — PREMIUM POOL SUPPORT
### REL-Q21 — EXPEDITION CERTIFICATION
### REL-Q34 — EXPEDITION BUILD CANONICAL HAZARDS
### REL-Q20 — LARGE FRIDGE
### REL-Q72 — LARGE FRIDGE
### REL-Q-v28-2 — LARGE FRIDGE PRICE
### REL-Q73 — INSTANT FOOD CORNER
### REL-Q74 — EXPEDITION MEAL CORNER
### REL-Q75 — 24H FRESH SYSTEM
### REL-Q-v28-13 — FRESH NATIVE-STAT REBASELINE
### REL-Q31 — FRESH CORE-EFFECT SCOPE
### REL-Q-v28-9 — COLD DISTRIBUTION ACQUISITION
### REL-Q32 — FRESH BUILD ITEM SUPPORT
### REL-Q80 — FRESH DOES NOT DELETE SPECIALISTS
### REL-Q23 — VISITOR CAP
### REL-Q30 — CUSTOMER BUILD PACING / ATTACHMENT
#### board
#### hub
#### composition
### REL-Q-v28-17 — REGION HUB
### REL-Q24 — REROLL RELIC
### REL-Q81 — REROLL RELIC USES CURRENT ECONOMY CURVE
### REL-Q-v28-8 — OPERATING EFFICIENCY
### REL-Q39 — INTERNAL TAXONOMY IS NOT PLAYER-FACING
### REL-Q-v28-10 — COPY TRUTH
### REL-Q-v28-12 — STAMP COPY
### REL-Q-v28-11 — FEEL ATTRIBUTION
### REL-Q70 — SINGLE RELIC VS BUILD VALUE
### REL-Q71 — BUILD ENGINE TARGET
### REL-Q27 — BUILD HIGH-ROLL
### REL-Q28 — NO-RELIC VIABILITY
### REL-Q29 — BUILD DIVERSITY
### REL-Q-v28-19 — TIMING VALUE PRINCIPLE
```

## REWORD — REL-Q41 SETUP: dead D30 clause trimmed (D30 Family disclosure superseded by D25 reveal / REL-Q78); D5 / D15 ordering checks stay live

```text
Reach D5, D15, D30 with a fresh milestone window.
```

```new
Reach D5, D15 with a fresh milestone window.
```

## REWORD — cross-owner pointer names the current owner file

```text
- Boss Power comes only from `BOSS_v2.7.0.md`
```

```new
- Boss Power comes only from `BOSS_v2.8.0.md`
```

## REWORD — REL-Q16 Foundation ID 5 uses the current name (REL-Q-v28-1 rename showcase -> 희귀상품 입고 계약; RELIC_v2.8.0.md §RELIC BLUEPRINTS 5); 프리미엄 쇼케이스 is now only the Decoration

```text
프리미엄 쇼케이스
```

```new
희귀상품 입고 계약
```

## REWORD — REL-Q-v28-21 heading: version framing ("INHERITED ... CLOSURE") removed; heading level ### under its topic

```text
## REL-Q-v28-21 — INHERITED SUPPORT EXACT FUNCTION CLOSURE
```

```new
### REL-Q-v28-21 — SUPPORT EXACT FUNCTIONS
```

## REWORD — REL-Q-v28-21: version framing ("inherited", "closed") removed; the listed checks are unchanged

```text
Verify the exact inherited-support functions closed in RELIC_v2.8.0.md:
```

```new
Verify these exact Store Support functions in RELIC_v2.8.0.md:
```

## REWORD — REL-Q26: PASS3 tuning-table pointer replaced by the current price owner section

```text
Exact final values match PASS3-approved table.
```

```new
Exact final values match `RELIC_v2.8.0.md` §PRICE.
```

## REWORD — REL-Q-v28-22 heading: version framing ("INHERITED") removed; heading level ### under its topic

```text
## REL-Q-v28-22 — INHERITED SUPPORT BASE PRICES
```

```new
### REL-Q-v28-22 — SUPPORT BASE PRICES
```

## REWORD — REL-Q-v28-22: version framing ("v2.8", "inherited") removed; the listed prices are unchanged

```text
Expect exactly these approved v2.8 base prices for the inherited rows:
```

```new
Expect exactly these approved base prices for these rows:
```

## REWORD — REL-Q74: Supply-branch value updated to the current +20% (RELIC_v2.8.0.md §RELIC BLUEPRINTS 17 원정 도시락 코너: active Supply Burden and Food/Drink supplies >0 -> positive native Core-Stat contribution +20%; REL-Q-v28-13); the condition stays live

```text
- positive native Core Stat +25%
```

```new
```

## REWORD — REL-Q75: trailing colon removed because the superseded numeric examples it introduced were dropped

```text
Fresh-to-Fresh stacking uses base-additive bonuses:
```

```new
Fresh-to-Fresh stacking uses base-additive bonuses.
```

## REWORD — cross-owner pointer names the current owner file

```text
When a Food-affinity Trait also applies, its native-Stat percentage joins the same base-additive pool under `ITEM_v2.7.0.md`.
```

```new
When a Food-affinity Trait also applies, its native-Stat percentage joins the same base-additive pool under `ITEM_v2.8.0.md`.
```

## REWORD — REL-Q33 heading: current support name (REL-Q-v28-1 rename coldcase 냉장 쇼케이스 -> 냉장 유통 계약); heading level ### under its topic

```text
## REL-Q33 — CHILLED SHOWCASE ELIGIBILITY
```

```new
### REL-Q33 — COLD DISTRIBUTION ELIGIBILITY
```

## REWORD — REL-Q33 SETUP: current support name (REL-Q-v28-1 rename; RELIC_v2.8.0.md §RELIC BLUEPRINTS 18)

```text
Own 냉장 쇼케이스 and generate Order offers repeatedly.
```

```new
Own 냉장 유통 계약 and generate Order offers repeatedly.
```

## REWORD — REL-Q76 heading: current support name (REL-Q-v28-1 rename coldcase -> 냉장 유통 계약); heading level ### under its topic

```text
## REL-Q76 — CHILLED SHOWCASE / DAWN DELIVERY CATEGORY
```

```new
```

## REWORD — REL-Q76: version tag removed

```text
- eligibility uses v2.7 Food/Drink categories
```

```new
- eligibility uses Food/Drink categories
```

## REWORD — REL-Q76: version framing ("unchanged" by the v2.7 patch) removed; coldcase offer/shelf values are current per REL-Q-v28-9

```text
- their unchanged offer/shelf/bulk identities remain intact
```

```new
```

## REWORD — RELIC-Q-v27-VISITOR heading: version framing ("EXPLICIT OVERRIDE") removed, ID kept; heading level ### under its topic

```text
## RELIC-Q-v27-VISITOR — BOARD / HUB EXPLICIT OVERRIDE
```

```new
### RELIC-Q-v27-VISITOR — BOARD / HUB
```

## REWORD — owner pointer names the current owner file and sections (the v2.7 VISITOR RELICS override is merged into the blueprint entries)

```text
Owner rule: `RELIC_v2.7.0.md` §VISITOR RELICS — v2.7 EXPLICIT OVERRIDE.
```

```new
Owner rule: `RELIC_v2.8.0.md` §RELIC BLUEPRINTS 11 (길드 전광판) / 26 (지역 거점점 계약), §VISITOR SUPPORT COMPOSITION.
```

## REWORD — REL-Q81: version tag removed (values match the current curve in RELIC_v2.8.0.md §RELIC BLUEPRINTS 29)

```text
- under current v2.6.1 economy this means `0 -> 100 -> 200 -> 400 ...`
```

```new
```

## REWORD — REL-Q81 PASS: version framing ("base-QA", "as v2.7 truth") removed; the no-stale-curve check stays

```text
No stale `0 -> 60 -> 120` base-QA curve survives as v2.7 truth.
```

```new
No stale `0 -> 60 -> 120` curve survives.
```

## NEW — topic headings and owner pointer

```new
## WINDOW SCHEDULE / LIFECYCLE
## D30 WINDOW
## SLOTH WINDOW
## CANDIDATE RULES
## POOL / BLUEPRINTS
## PRICE
## ROTATION SUPPORTS
## VIP SUPPORTS
## PREMIUM SUPPORTS
## EXPEDITION SUPPORTS
## FRESH SUPPORTS
## CUSTOMER / VISITOR SUPPORTS
## UTILITY SUPPORTS
## INFORMATION / COPY
## BUILD VALUE / BALANCE
Design owner under test: `RELIC_v2.8.0.md`.
```

## AMENDMENT — User decision 2026-09-23: Store Support rebalance

RELIC_QA checks follow the User-approved Store Support rebalance in RELIC_v2.8.0.md (prices, number changes, reworks, remakes with ids kept); the retired 원정전문점 offer-coverage, 긴급보급 선반 and 신입 모집 게시판 seating checks are replaced by checks of the new rules.

Lines declared new by an earlier amendment and now removed again (dropped from that ```new fence): 7.

```text
대형 냉장고 = 200G
PASS only when the active implementation uses 200G.
When a new adventurer is generated on a Day and the support is owned:
- that new adventurer occupies one existing visitor slot
- total visitor count is not increased by this rule
- visitor selection uses only the current owner rule above
When no new adventurer is generated:
- no visitor is added
eligible survival -> Loyalty +2 and NPC Wallet +30G
eligible Rare+ sale -> HQ commission = 12% of list price
Loyalty >=60 eligible survival -> NPC Wallet +50G
Does not redefine Trusted Regular.
eligible Rare+ overcharge -> HQ commission = 20% of list price
Price 260G
- 긴급보급 선반 says Potion / Field Gear / Insurance
- 발주 교환권 sequence after free use starts at 100
유료 구매의 단골도 증가량 +50%. 생환으로 얻는 단골도에는 적용되지 않는다.
- 즉석식품 코너 native Core-Stat +30%
- 원정 도시락 코너 active-Supply native Core-Stat +20%
- 원정 도시락 코너 matching explicit Hazard Counter remains +25%
- kitchen + fresh24 => ×1.80 native positive Stat
- kitchen + fresh24 + active-Supply expeditionMeal => ×2.00
- matching Hazard Counter is accidentally reduced from +25%
If previous Day sales >= 6:
- each newly generated Common / Uncommon ORDER offer gets quantity +1
- Rare+ quantity is unchanged
If previous Day sales < 6:
- Rare+ quantity receives the +1
previous Day sales >= 7
-> next Day first bulk order -25%
Price remains 720G.
- trigger differs from previous Day sales >= 7
- discount applies more than once that Day
With exactly 1 distinct known Hazard:
- at least 1 generated ORDER offer Counters it.
With 2+ distinct known Hazards:
- exactly 2 distinct known Hazard keys are selected for the guarantee
- 2 distinct offer slots are guaranteed, one against each selected key
- one multi-Counter Item slot cannot satisfy both guarantee slots
- ordinary total offer count is preserved
- full Reroll preserves the guarantee
- no unknown Hazard is revealed
- Price remains 700G
- 묶음발주 계약 -> same SKU 3+, 3rd+ units -15%
- 단골 스탬프 기계 -> paid-purchase Loyalty gain +50%; survival Loyalty excluded
- 회원 관리대장 -> returning revisit weight +40% from next Day
- 희귀상품 입고 계약 -> Rare+ ORDER weight +70%; operating cost +10G from next Day
- 길드 보증 진열대 -> once/Day first list-price >=200G sale, HQ customer subsidy = 20% of list price,
Player still receives the full chosen sale price
- 원정 위험 게시판 -> known-Hazard matching offer weight +80%, never a guarantee
- 긴급보급 선반 -> Potion / Field Gear / Insurance offer weight +60% and quantity +1
- 공동구매 전단 -> visitor count >=6 and same SKU 3+ -> bulk purchase price -10%
- 단골 묶음혜택 -> returning customer's second paid purchase that Day -> Loyalty +2
- 프리미엄 멤버십 -> Loyalty >=50 + Rare+ Item -> purchase intent +10%p
- 새벽 공동배송 -> same Food/Drink SKU 3+ -> bulk purchase price -15%
bulk 260
stamp 260
member 260
showcase 280
guarantee 280
hazardBoard 260
medicine 260
kitchen 280
board 260
rookieBoard 240
groupFlyer 400
memberBundle 380
premiumMember 420
expeditionMeal 400
coldcase 420
dawnBulk 380
fresh24 740
warehouse 360
terminal 380
delivery 340
- base price 200G
- Food/Drink shelf life +1
When Food/Drink explicit Counter matches actual current destination Hazard:
- matching Counter +25%
When active Supply Burden exists and Item supplies >0:
- Supply itself unchanged
- no bonus when conditions are false
- no universal Counter solution
`긴급보급 선반` targets exactly:
Potion / Field Gear / Insurance
- no Medical category dependency
- no retired Mana/Special proxy for Potion
- free use consumes the first daily Reroll step
- next same-Day Reroll uses the second current `ECONOMY_ORDER` step
- board, hub and the `wall` Decoration may all be held at once and each applies in its own place
긴급보급 선반
신입 모집 게시판
Own `길드24 원정전문점 인증` with known active hazards.
No exact-item guarantee and no unknown hazard reveal.
- next same-Day Reroll uses the next normal cost step
Eligibility targets Uncommon+ Food/Drink and shelf-life relief as defined in RELIC.
Use 원정 위험 게시판 / 원정 도시락 코너 / 길드24 원정전문점 인증 across all Families.
```

```new
야전 정비대
첫 방문 쿠폰
- 묶음발주 계약 -> same SKU 3+, 3rd+ units -20%
- 단골 스탬프 기계 -> paid-purchase Loyalty gain +75%; survival Loyalty excluded
- 회원 관리대장 -> returning revisit weight +70% from next Day
- 희귀상품 입고 계약 -> Rare+ ORDER weight +70%; Rare+ sale price +10% in every mode, paid by the customer (no HQ fill); no operating-cost modifier
- 길드 보증 진열대 -> once/Day first sale with a CHARGED price >=200G, HQ customer subsidy = 30% of
the charged price, Player still receives the full chosen sale price
- 원정 위험 게시판 -> today's Gate Hazard matching offer weight +50%, never a guarantee
- 야전 정비대 -> carried Field Gear Hazard Counter values x1.40; no offer weight / quantity effect
- 즉석식품 코너 -> Food/Drink native Core-Stat +25%; from next Day operating cost + overheadBase × 0.10
- 첫 방문 쿠폰 -> first-ever visit: NPC Wallet +30G on arrival, purchase intent +20%p for that visit
- 단체 주문 창구 -> own 20% Morning roll for +1 visitor; +15G HQ commission per sale from the Day's 5th
- 단골 묶음혜택 -> 단골's second paid purchase that Day: customer pays / is judged on half the charged
price, store receives the full charged price
- 프리미엄 멤버십 -> 단골 arrival NPC Wallet +40G; 단골 Rare+ purchase intent +15%p
- 원정 도시락 코너 -> per Food/Drink Item: Supply +2 (피로 회복 +2) and flat +4 on every Hazard of the actual Gate (User 2026-09-24, v2.9.0)
- 냉장 유통 계약 -> Uncommon+ Food/Drink offer weight +80%, purchase intent +16%p, shelf life +1
- 새벽 회수 계약 -> expiring Food/Drink recovered at 50% of cost (not waste); +1 Food/Drink offer on
the Day's first offer generation
- 24시간 신선체계 -> Food/Drink native Core-Stat +50%; Food/Drink ORDER price x1.25; no shelf life
bulk 130
stamp 130
member 130
showcase 140
guarantee 140
hazardBoard 60
medicine 80
kitchen 170
board 110
rookieBoard 110
groupFlyer 200
memberBundle 190
premiumMember 200
expeditionMeal 200
coldcase 180
dawnBulk 190
fresh24 360
warehouse 130
terminal 130
delivery 120
If previous Day sales >= 4:
- each newly generated ORDER offer, of every rarity, gets quantity +1
If previous Day sales < 4:
previous Day sales >= 6
-> today every same-SKU 3+ order -25%
Price 300G.
- trigger differs from previous Day sales >= 6
- only the first bulk order of the Day is discounted
paid returning customer survives (no Loyalty threshold) -> Loyalty +5 and NPC Wallet +25G
단골 (Loyalty >= 51, Trusted Regular owner) survival -> NPC Wallet +50G
Reads the Trusted Regular owner judgement; no second threshold.
eligible Rare+ sale -> HQ commission = 20% of list price, buyer NPC Wallet +30G
150% sale of any rarity -> HQ commission = 40% of the charged sale price
the flat 150% purchase-intent penalty (-0.16) is lifted for the owner
the 1.5x price burden and Loyalty -3 are unchanged
Own `원정 전문 인증`; sell Counter and non-Counter Items for the customer's own Gate.
- an Item that Counters a Hazard of the adventurer's Gate: Hazard Counter values x1.60
- with `야전 정비대` on Field Gear: x1.40 x1.60
- the flat `원정 도시락 코너` +4 is not multiplied
- the buyer gets NPC Wallet +50G on the next living visit, once per purchase Day
No ORDER offer guarantee and no unknown hazard reveal.
Use 원정 위험 게시판 / 원정 도시락 코너 / 원정 전문 인증 across all Families.
### REL-Q77 — FIELD MAINTENANCE (야전 정비대)
`야전 정비대` multiplies the Hazard Counter values of carried Field Gear by 1.40.
- Potion / Food / Drink / Insurance Counter values are unchanged
- no ORDER offer weight or offer quantity effect
- base price 60G
대형 냉장고 = 120G
PASS only when the active implementation uses 120G.
- native Core-Stat +25%
- from next Day operating cost + overheadBase × 0.10, never compounded
Per Food/Drink Item in the Bag:
- Supply +2 (피로 회복 +2) (User 2026-09-24, v2.9.0)
- flat +4 on every Hazard of the Gate the adventurer actually enters
- no native Core-Stat bonus
- no matching-Counter multiplier
- a non-Food/Drink Item takes nothing
- no shelf-life effect and no operating-cost effect
- Food/Drink ORDER price x1.25
- 즉석식품 코너 native Core-Stat +25%
- 원정 도시락 코너 adds no native Core-Stat bonus
- kitchen + fresh24 => ×1.75 native positive Stat
Eligibility targets Uncommon+ Food/Drink, purchase intent +16%p and shelf-life relief as defined in RELIC.
### REL-Q76 — COLD DISTRIBUTION / DAWN RECOVERY CATEGORY
- their offer/shelf/recovery identities remain intact
### REL-Q-v28-3 — FIRST VISIT COUPON
On an adventurer's first-ever visit, with `첫 방문 쿠폰` owned:
- NPC Wallet +30G on arrival
- purchase intent +20%p during that visit
- no visitor is added and no slot is seated
A returning adventurer receives nothing.
- board, hub, 단체 주문 창구 and the `wall` Decoration may all be held at once and each applies in its own place
- 단체 주문 창구 makes its own 20% Morning roll for +1 visitor
- Price 340G
- next same-Day Reroll uses the first normal cost step
- next same-Day Reroll uses the first current `ECONOMY_ORDER` step
- under the current economy this means `0 -> 50 -> 100 -> 200 ...`
Price 130G
- 발주 교환권 sequence after free use starts at 50
유료 구매로 오르는 단골도 +75% · 생환으로 오르는 단골도 제외.
```

## AMENDMENT — v2.9.0 Supply→Fatigue / Fatigue bands / Hazard pressure (User decision 2026-09-24)

Fresh / Expedition checks that name Supply are relabelled to the visible Supply -> Fatigue recovery rule
(`피로 회복`), values unchanged: REL-Q-v28-21 (원정 도시락 코너 line), REL-Q72, REL-Q73, REL-Q74, REL-Q75,
REL-Q-v28-13. REL-Q34 keeps its canonical-Hazard checks; only its Burden line is rewritten (Food/Drink Supply is
not a Hazard key). The two earlier `new` declarations this batch rewrote (REL-Q-v28-21 원정 도시락 코너 line,
REL-Q74 `- Supply +2`) are edited in place above.

```text
- Supply itself is multiplied by these native-Stat percentages
- no Stat/Supply multiplier
- Supply unchanged
- Supply Burden is handled through Food/Drink Supply, not treated as a Hazard key
```

```new
- Food/Drink Supply (피로 회복) is not treated as a Hazard key (User 2026-09-24, v2.9.0)
- no Stat/Supply (피로 회복) multiplier (User 2026-09-24, v2.9.0)
- Supply (피로 회복) unchanged (User 2026-09-24, v2.9.0)
- Supply (피로 회복) itself is multiplied by these native-Stat percentages (User 2026-09-24, v2.9.0)
```

## AMENDMENT — v2.9.0 F7: quick-view status line / purchase notice / Counter judgement split (User decision 2026-09-24)

User decisions 2026-09-24 (v2.9.0 F7): the owned Store Support quick view carries a runtime status line for condition-type supports only; the purchase notice drops its second sentence; the Counter judgement is split into 직접 대응 / 관련 준비 with one owner (RELIC §COUNTER JUDGEMENT) — the acceptance floor and 원정 위험 게시판 read 관련 준비, the multipliers, pity and cert rewards read 직접 대응, the 기동-for-속박/진창 exception is retired; the accessible-mode base need is 0.72 (measured, not tuned). Earlier lines this batch supersedes were removed from the fences above in place.

```new
- COUNTER JUDGEMENT (User 2026-09-24, v2.9.0): 원정 전문 인증 x1.60, the Counter pity, 길드 납품 인증 and the 원정 전문 인증 next-visit Gold read 직접 대응 only (a 기동 Item on a 속박/진창 Gate does not qualify); the SALE acceptance floor and 원정 위험 게시판 read 관련 준비 (direct Counter or the pressed Stat)
```

## AMENDMENT — v2.9.2 balance, fourth pass: 후방 창고 증설 +10 -> +5 (User decision 2026-09-26)

User 2026-09-26 (reports/v292-bot-harness.md §11; the User save held ~24 Items before the Final on a 28-slot warehouse): the
Warehouse Relic adds 5 slots, not 10. Price and every other Relic unchanged.

```text
- 후방 창고 증설 -> inventory capacity +10
```

```new
- 후방 창고 증설 -> inventory capacity +5 (User 2026-09-26, v2.9.2 fourth pass; was +10)
```
