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
### REL-Q-v28-16 — EXPEDITION CERT COVERAGE
### REL-Q34 — EXPEDITION BUILD CANONICAL HAZARDS
### REL-Q77 — EXPEDITION SHELF CATEGORY MIGRATION
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
### REL-Q-v28-3 — ROOKIE BOARD
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
- positive native Core Stat +20%
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
### REL-Q76 — COLD DISTRIBUTION / DAWN DELIVERY CATEGORY
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
- their offer/shelf/bulk identities remain intact
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
- under the current economy this means `0 -> 100 -> 200 -> 400 ...`
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
