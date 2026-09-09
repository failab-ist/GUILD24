# RELIC_QA

DOC=RELIC_QA
OWNER=qa,relic,store_build

DOC_VERSION=2.2.0
CANONICAL_SET=GUILD24_CANONICAL_v2.2.0


Status values are NOT stored here.
This file defines acceptance criteria only.

## REL-Q01 — WINDOW SCHEDULE
SETUP:
Play D0–D30.

EXPECT:
Relic windows appear:
D0,D5,D10,D15,D20,D25,D30

PASS:
No missing/extra normal milestone window.

## REL-Q02 — D0 FOUNDATION
SETUP:
Start new run.

EXPECT:
- 3 candidates
- Foundation only
- choose <=1
- free

PASS:
All conditions hold.

## REL-Q03 — D5+ PURCHASE
SETUP:
Open D5+ window.

EXPECT:
- 3 candidates
- Gold prices
- max 1 purchase/window
- defer allowed

PASS:
All conditions hold.

## REL-Q04 — DEFER REOPEN
SETUP:
Open D5 window, buy nothing, close.

EXPECT:
Reopen possible during valid management phases until next window.

PASS:
Candidates/prices unchanged.

## REL-Q05 — WINDOW EXPIRY
SETUP:
Defer D5 until D10.

EXPECT:
D5 window expires when D10 window begins.

PASS:
Only current window remains active.

## REL-Q06 — NO SALE/NIGHT REOPEN
SETUP:
Have active deferred Relic window.

EXPECT:
Relic reopen unavailable during:
- active Sale
- Night resolution

PASS:
Management timing respected.

## REL-Q07 — SAVE/LOAD PERSISTENCE
SETUP:
Record candidates/prices, Save/Reload.

EXPECT:
Same:
- candidate IDs
- prices
- purchased/deferred state

PASS:
Reload does not reroll.

## REL-Q08 — OWNED DUPLICATE
SETUP:
Own a nonstackable Relic and open later windows.

EXPECT:
Owned Relic is excluded.

PASS:
No duplicate ownership offer.

## REL-Q09 — IMMEDIATE REPEAT
SETUP:
Skip an offered Relic.

EXPECT:
It may recur later but not immediately next window.

PASS:
Immediate-repeat protection works.

## REL-Q10 — OFFER DIVERSITY
SETUP:
Sample many windows.

EXPECT:
When practical, candidate set includes >=2 different primary build directions.

PASS:
Windows are not routinely three near-identical choices.

## REL-Q11 — SOFT BUILD BIAS
SETUP:
Own several same-axis Relics and sample offers.

EXPECT:
Related pieces may be somewhat more likely.

PASS:
No guaranteed missing-piece completion.

## REL-Q12 — KEYSTONE TIMING
SETUP:
Inspect D0 and later windows.

EXPECT:
D0 Keystone=NO.
Midgame+ Keystone eligible according to canonical progression.

PASS:
No early Keystone leak.

## REL-Q13 — D30 RELEVANCE
SETUP:
Open D30 window.

EXPECT:
All candidates can affect Final preparation/outcome.

PASS:
No future-only dead relic.

## REL-Q14 — POOL SIZE
SETUP:
Inspect canonical pool.

EXPECT:
30 total:
- Foundation 12
- Hybrid 8
- Keystone 6
- Utility 4

PASS:
Counts match.

## REL-Q15 — BUILD AXES
SETUP:
Audit relic catalog.

EXPECT:
Primary axes represented:
Rotation/VIP/Premium/Expedition/Fresh/Customer

PASS:
Each axis has coherent Foundation→later build support.

## REL-Q16 — FOUNDATION BLUEPRINTS
SETUP:
Audit IDs 1–12.

EXPECT:
Effects match canonical identities for:
묶음발주 계약
회전 진열대
단골 스탬프 기계
회원 관리대장
프리미엄 쇼케이스
길드 보증 진열대
원정 위험 게시판
긴급보급 선반
대형 냉장고
즉석식품 코너
길드 전광판
신입 모집 게시판

PASS:
No material behavior contradicts RELIC spec.

## REL-Q17 — HYBRID BLUEPRINTS
SETUP:
Audit IDs 13–20.

EXPECT:
Each bridges its stated two build axes.

PASS:
No Hybrid acts as unrelated generic stat relic.

## REL-Q18 — KEYSTONE BLUEPRINTS
SETUP:
Audit IDs 21–26.

EXPECT:
Each materially strengthens its own build axis without becoming mandatory.

PASS:
Build engine is strong but optional.

## REL-Q19 — UTILITY BLUEPRINTS
SETUP:
Audit IDs 27–30.

EXPECT:
Utility supports operation without replacing build identity.

PASS:
No Utility is universal auto-pick.

## REL-Q20 — LARGE FRIDGE
SETUP:
Acquire with existing eligible stock.

EXPECT:
- current non-expired stock extends once
- future stock gets extended shelf life
- no daily repeated extension
- no infinite preservation

PASS:
Shelf-life logic stable.

## REL-Q21 — EXPEDITION CERTIFICATION
SETUP:
Own `길드24 원정전문점 인증` with known active hazards.

EXPECT:
Order offers include >=1 valid Counter role.

PASS:
No exact-item guarantee and no unknown hazard reveal.

## REL-Q22 — PREMIUM 150%
SETUP:
Use Premium build effects.

EXPECT:
150% may become more viable.

PASS:
No relic turns 150% into automatic acceptance.

## REL-Q23 — VISITOR CAP
SETUP:
Stack Customer visitor effects.

EXPECT:
Visitor increases still respect Living NPC Cap rules.

PASS:
No invalid roster overflow.

## REL-Q24 — REROLL RELIC
SETUP:
Own `발주 교환권`, start a fresh Day, and use the canonical Full-offer Reroll multiple times.

EXPECT:
- first Full-offer Reroll costs 0G
- free use consumes the first daily Reroll step
- next same-Day Reroll uses the next normal cost step
- with the PASS3 starting curve: 0G -> 60G -> 120G -> 240G ...
- next Day restores the free first Reroll
- regenerated offers preserve eligibility / coverage / rarity rules
- Reroll does not advance pity

PASS:
The Relic provides a clear daily Utility benefit without single-slot swap behavior or pity farming.

## REL-Q25 — PRICE STABILITY
SETUP:
Open window, record prices, reload/reopen.

EXPECT:
Price remains fixed for that window.

PASS:
No price fishing.

## REL-Q26 — PRICE BAND
SETUP:
Sample prices.

EXPECT:
Limited random band around approved base.
Starting target around ±15–20%.

PASS:
Exact final values match PASS3-approved table.

## REL-Q27 — BUILD HIGH-ROLL
SETUP:
Seed a strong synergistic run.

EXPECT:
Strong 4–5+ piece synergy is allowed to feel powerful.

PASS:
System does not forcibly normalize good seed into average.

## REL-Q28 — NO-RELIC VIABILITY
SETUP:
Play/simulate low-Relic investment route.

EXPECT:
Run remains playable though economically/build-wise different.

PASS:
Relic purchase is meaningful, not hard mandatory.

## REL-Q29 — BUILD DIVERSITY
SETUP:
Simulate all six build directions.

EXPECT:
No one build consistently dominates:
Gold/survival/final success across all contexts.

PASS:
Multiple build identities viable.

## REL-Q30 — CUSTOMER BUILD PACING / ATTACHMENT
SETUP:
Play/simulate Customer-heavy builds including visitor-count and newcomer-weight effects.

EXPECT:
- Customer effects create meaningful traffic/composition value
- visitor increases still respect Living NPC Cap
- normal 2–4 trusted-regular feel remains achievable
- extra visitors do not make repetitive interaction burden the primary reward/cost of the build

PASS:
Customer remains a store-build choice rather than a pure workload multiplier.

## REL-Q31 — FRESH CORE-EFFECT SCOPE
SETUP:
Use 즉석식품 코너 / 24시간 신선체계 with multi-role Food/Drink Items.

EXPECT:
Generic Fresh core boost applies only to:
- Supply
- native Stat/recovery

It does not automatically boost:
- Hazard Counter
- Insurance
- RiskReward penalty
- unrelated attached effects

PASS:
Fresh does not become a blanket whole-item multiplier.

## REL-Q32 — FRESH BUILD ITEM SUPPORT
SETUP:
Simulate Fresh-heavy runs across early/mid/late Item availability.

EXPECT:
- Food/Drink pool spans multiple prices/rarities/roles
- Fresh effects have repeated meaningful targets
- specialist FieldGear remains more reliable for dedicated Hazard response

PASS:
Fresh is a real build without deleting Expedition specialist identity.

## REL-Q33 — CHILLED SHOWCASE ELIGIBILITY
SETUP:
Own 냉장 쇼케이스 and generate Order offers repeatedly.

EXPECT:
Eligibility targets Uncommon+ Food/Drink and shelf-life relief as defined in RELIC.

PASS:
Effect has a meaningful multi-SKU pool and is not dependent on one or two Rare items.

## REL-Q34 — EXPEDITION BUILD CANONICAL HAZARDS
SETUP:
Use 원정 위험 게시판 / 원정 도시락 코너 / 길드24 원정전문점 인증 across all Families.

EXPECT:
- only the 9 canonical Hazards drive Hazard-counter filtering
- Main/Alternative Item routes remain possible
- Supply Burden is handled through Food/Drink Supply, not treated as a Hazard key

PASS:
Expedition Relics match the current Dungeon×Item model.

## REL-Q35 — ROTATION LOW-RARITY VIABILITY
SETUP:
Run Rotation-heavy build into late game using Common/Uncommon specialist stock.

EXPECT:
Useful low-rarity specialists still have valid demand/value when their Hazard appears.

PASS:
Rotation/low-cost build is not invalidated by universal Rare+ upgrades.

## REL-Q36 — PREMIUM POOL SUPPORT
SETUP:
Simulate Premium build with canonical Item catalog.

EXPECT:
Rare+ offers contain multiple roles/price points and generate repeated meaningful premium-sale decisions.

PASS:
Premium does not depend on a single SKU and Rare+ is not universally superior.

## REL-Q37 — ACTIVE RELIC POOL BOUNDARY
SETUP:
Inspect all loaded/acquirable facility/relic IDs.

EXPECT:
Only the 30 canonical Relic blueprints are active.
`포션 냉장고`, `마석 충전대`, `상권 분석대` do not affect gameplay.

PASS:
No excluded facility is offered, owned, or applied as a hidden modifier.

