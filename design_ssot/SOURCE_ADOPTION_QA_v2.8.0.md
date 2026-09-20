# v2.8 SOURCE ADOPTION QA / KNOWN DEFECT RECORD

DOC=SOURCE_ADOPTION_QA
OWNER=qa,source_adoption,root_cause,playtest_recovery
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=DESIGN_QA_SPEC
AUDIT_SOURCE_HEAD=af7bb7d5575b224740d659038f7f90078c2199d1
AUDIT_DATE=2026-09-20

## PURPOSE

This file records already-known Current Source mismatches at the audit HEAD so WORK does not spend
time rediscovering location/root cause.

It is not permission to refactor unrelated Source.
If Current Source has moved, resolve the equivalent code path rather than matching old line numbers.

Each finding states observed/source behavior, root cause, Canonical correction and acceptance.

## SA-Q01 — PRE-RUN DECORATION RETURN / MOBILE BLANK

Classification: RUNTIME UX BUG / MISSING RETURN PATH

Current Source:
- dist/ui/app.js action store-manage sets codexTab=store and opens modal=codex
- renderModal hides generic Close while run.phase is foundation
- action dismiss immediately returns while phase is foundation
- no popstate handler represents the modal as browser history

Root cause:
foundation store-management has an entry path but no normal app-level exit path. Mobile
system/browser Back can leave intended modal/navigation state instead of returning to newRun.

Required:
- explicit Back/Return to new-Run preparation
- no spend/re-roll/reseed merely by returning

Acceptance:
repeat newRun -> store management -> return at least 10 times on mobile with no blank stage.

## SA-Q02 — STALE POTENTIAL / REMAINING TRAIT COPY

Classification: IMPLEMENTATION BUG / STALE COPY

Current Source:
dist/ui/app.js npcDetail still emits potential-derived 성장 잠재력 and
더 친해지면 성장 잠재력과 남은 특성을 알 수 있습니다.

Root cause:
v2.7 visible growth/Trait design was adopted in systems but old relationship-gated detail copy survived.

Required:
remove that player-facing block entirely.

## SA-Q03 — INJURY STAT TERM / ORDER

Classification: STALE COPY

Current Source:
npcDetail and Presentation.nightChanges can emit 생존 -20% before 투력.

Root cause:
internal survival key was retained correctly, but old player-facing label survived.

Required:
player term 강인함; display order 투력 then 강인함.

## SA-Q04 — DUPLICATE INJURY STATUS

Classification: IMPLEMENTATION BUG

Current Source:
kitLine starts parts with n.status (already 부상), then appends 부상 {n.injury} again.

Root cause:
two state representations are concatenated without normalization.

Required:
one human-readable Injury state only; no 부상 · 부상 1.

## SA-Q05 — INTERNAL POTION MARKER LEAK

Classification: INFORMATION TRUST BUG

Current Source:
dist/ui/presentation.js util maps internal effect key potion to a player row 포션.
SALE later renders Presentation.rows(item.effects).

Root cause:
Potionbody marker is treated as a generic displayable utility.

Required:
potion marker never authors a player effect row.

## SA-Q06 — SALE HYPOTHETICAL FATIGUE MATRIX

Classification: DESIGN ADOPTION MISMATCH

Current Source app.js readout builds:
- 보급 회복
- 밤 피로 · 성공 N · 퇴각 N · 부상 N

Root cause:
Source implements the superseded v2.7 display clause.

Required:
remove future Outcome rows; keep current/departure Fatigue + compact Supply arithmetic.

## SA-Q07 — NIGHT INTERNAL FATIGUE LABELS

Classification: COPY / UX BUG

Current Source Presentation.nightChanges emits:
- 보급 회복
- 보급 완화
- 원정 결과
- 최종 피로

Root cause:
runtime accounting fields are surfaced 1:1 instead of a settled Player result.

Required:
main 귀환 후 피로 N; resolved arithmetic only on demand.

## SA-Q08 — UNPROVEN HAZARD HERO FEEDBACK

Classification: CAUSALITY BUG

Current Source:
Dungeon resolve records hazard mitigation versus empty Bag.
Presentation emits 위험 감소 when no prevention and nightWhy can say 환경을 철저한 준비로 극복했다.

Root cause:
mitigation proof is weaker than proof that one named Item changed final Outcome/state.

Required:
Hero feedback only through v2.8 counterfactual proof.
No vague 위험 감소 Hero line.

## SA-Q09 — NIGHT SPEECH SELECTOR PRIORITY / STATIC BLOCKQUOTE

Classification: UX / COPY ADOPTION BUG

Current Source:
Copy.night checks growth and any report.items before Retreat in some paths.
app.js beat renders r.quote as permanent blockquote only for weighty results.

Root cause:
Bag presence became a speech classification and Flavor is coupled to result-card weight rather than
the existing temporary character speech mechanism.

Required:
v2.8 selector priority; every living result temporary bubble; death narration only.

## SA-Q10 — BOSS MOBILE ART CROWDING

Classification: RUNTIME UX BUG

Current Source ui.css:
boss art width 100%, max-width 320px on phone, no mobile max-height.

Root cause:
width-only constraint lets near-square art consume excessive vertical space.

Required:
v2.8 mobile max-height baselines; verify 360x800.

## SA-Q11 — GREAT SUCCESS SIGNAL FROZEN AFTER PURCHASE

Classification: MISSING ADOPTION

Current Source:
Game.arrive stores n.outlook=outlookFor(n), including greatSignal.
Game.sell commits Item but does not refresh only greatSignal.

Root cause:
Great Success signal shares the v2.7 frozen snapshot object with the other forecast fields.

Required:
after successful purchase, recompute only Great Success signal.
Do not refresh Combat/Hazard/Death.

## SA-Q12 — MOBILE QUEUE DUPLICATION

Classification: MOBILE DENSITY BUG

Current Source:
waitingLine renders waiting fan + 대기 N.
SALE dock also renders 손님 X/Y + pips.

Root cause:
both desktop-oriented queue cues remain active on phone.

Required:
mobile suppress waitingLine/fan; keep Dock progress.

## SA-Q13 — LOYALTY MEANING / THRESHOLD DRIFT

Classification: INFORMATION TRUST BUG

Current Source:
- kitLine omits Loyalty
- npcDetail shows raw Loyalty without immediate meaning
- Adventurer.isTrustedRegular threshold = 51
- Copy.arrive uses n.loyalty>=60 for regular Flavor

Root cause:
relationship value, meaning and Flavor classification use separate checks.

Required:
compact Loyalty + popover; use Trusted Regular owner state for 단골/regular Flavor.

## SA-Q14 — GENERIC YELLOW STAT CHANGE

Classification: UX MISMATCH

Current Source:
statGrid marks moved and ui.css uses generic gold/yellow moved styling.

Root cause:
movement is styled without semantic benefit/harm.

Required:
beneficial green / harmful red / unchanged default + source popover.

## SA-Q15 — STORE SUPPORT DATA MISMATCHES

Classification: IMPLEMENTATION BUG / MISSING ADOPTION

Current Source dist/data/relics.js currently contains:
- 대형 냉장고 260G (Canonical 200G)
- 귀환 적립제 +12G
- 길드 납품 인증 8%
- 평생 단골제 +25G
- 왕도 프리미엄 인증 12%
- 운영 효율 매뉴얼 320G / -15G
- old showcase names
- old reroll copy saying after free use 50G

Required:
adopt RELIC_v2.8.0.md exact values/names.

## SA-Q15B — STORE SUPPORT FINAL-AUDIT ADOPTION

Classification: MISSING ADOPTION

Current Source still reflects pre-close Store Support rules in:
- dist/data/relics.js
- dist/systems/relics.js
- dist/systems/shop.js

Known mismatches include:
- 회전 진열대 still uses the inherited bulk-discount behavior
- 물류 본부계약 still uses the old sales trigger
- 길드24 원정전문점 인증 still guarantees only the inherited single Counter slot
- 지역 거점점 계약 still uses the old visitor distribution
- D30 generation still uses a positive finalUseful allowlist

Required:
adopt the exact final-audit rules in RELIC_v2.8.0.md and REL-Q-v28-14 through REL-Q-v28-19.

The D30 implementation must be exclusion-based so future supports are included by default unless
they are explicitly classified as D30 no-effect.
## SA-Q16 — COLDCASE EXISTING-STOCK EXTENSION BUG

Classification: IMPLEMENTATION BUG

Current Source:
relic acquisition extension requires rarity>=2 && item.fresh.
Current active Item catalog has no active item.fresh property.

Root cause:
legacy Fresh-property predicate survived category migration; future-stock shelf path uses Food/Drink,
so acquisition-time and future-stock behavior disagree.

Required:
U+ Food/Drink = rarity>=1 and category food/drink; existing non-expired stock extends once.

## SA-Q17 — ROOKIE BOARD FEEL

Classification: DESIGN ADOPTION

Current Source:
morning weighted selection multiplies new-NPC weight by 1.7 with rookieBoard.

Root cause:
effect is probability-only and cannot truthfully explain a seen newcomer.

Required:
replace with deterministic seating of a newly generated adventurer into one existing visitor slot.
No visitor-count increase.

## SA-Q18 — EVENT TEMPORARY WALLET INVISIBLE

Classification: INFORMATION TRUST BUG

Current Source:
arrive creates n.eventBudget from payday.
interest uses n.money+n.eventBudget.
SALE wallet UI renders n.money only.

Root cause:
effective affordability and displayed Wallet differ without explanation.

Required:
show persistent Wallet and temporary Event budget separately.

## SA-Q19 — BLACK MARKET / EXTRA-OFFER SOURCE

Classification: INFORMATION SOURCE GAP

Current Source:
generateOffers appends blackmarket offer but ordinary offer data does not preserve Event-origin label
for presentation.

Root cause:
the mechanic adds the row but provenance is discarded.

Required:
retain enough deterministic provenance for the special row to read as 암시장.
Do not generalize into rarity-weight attribution.

## SA-Q20 — FIRST AID PRIMARY COPY TOO LONG

Classification: COPY BUG

Current Source:
Presentation utility says 결과는 그대로 · 원정 후 남는 부상만 1단계 완화.

Required:
원정 후 남는 부상을 1단계 완화한다. 사망에는 적용되지 않는다.

## SA-Q21 — CLOSING FOOTER

Classification: UX COPY CLUTTER

Current Source app.js receipt permanently prints:
미판매 재고는 자산으로 남는다. 발주 지출과 판매 원가를 손익에서 두 번 빼지 않는다.

Required:
remove from primary Closing receipt.

## SA-Q22 — SLOTH 유물

Classification: STALE TERMINOLOGY

Current Source Copy.boss SLOTH Trait still says 유물.

Required:
점포지원 terminology.

## OUT OF v2.8 / DO NOT PULL FORWARD

- broad Dialogue pool expansion / recent-line cooldown
- broad BGM/SFX/presentation expansion
- Expedition Purpose structural feature
- other v2.9+ deferred work

## MEASUREMENT FINDINGS, NOT SOURCE BUGS

- perceived Fire frequency: no special occurrence weighting currently proven; do not tune from one Run
- global economy / Great Success probability: measure after adoption


## COPY RE-AUDIT ADDENDUM — KNOWN SOURCE MISMATCHES

### SA-Q23 — TRAIT DIALOGUE FALSE PURCHASE PREFERENCES

Classification: COPY TRUTH BUG

Current Source:
\`dist/data/copy.js\` -> \`visit.trait\`

Observed:
- 겁쟁이 can say \`귀환석 있습니까?\`
- 대식가 can say \`많이 든 걸로 주세요.\` / \`먹을 게 제일 급해요.\`
- 탐욕 can say \`비싼 게 좋은 거 아닌가요?\` / \`이왕이면 좋은 걸로 봅시다.\`

Root cause:
Flavor was authored as if Trait mechanics created Item-category / price preference.
They do not:
- 겁쟁이 owns escape/loot behavior, not Return Stone purchase bias
- 대식가 modifies Food result values, not Food purchase intent
- 탐욕 modifies expedition loot/escape, not high-price/Rare purchase preference

Required exact replacements -> \`COPY_WORLD_VOICE_v2.8.0.md / NPC DIALOGUE TRUTH\`.

Acceptance:
none of the removed lines can be selected by an active v2.8 Run.

### SA-Q24 — REGULAR DIALOGUE INVENTS A FAVORITE PRODUCT

Classification: COPY TRUTH BUG

Current Source:
\`dist/data/copy.js\` -> \`visit.regular\`

Observed:
    늘 먹던 걸로 주세요.

Root cause:
regular Flavor implies remembered favorite-product behavior that does not exist.

Required:
replace exactly with:
    이 정도면 단골 맞죠?

Do not add a favorite-SKU state.

### SA-Q25 — HELPED CALLBACK FALSE ATTRIBUTION

Classification: CAUSALITY / COPY TRIGGER BUG

Current Source:
\`dist/systems/shop.js::arrive()\`

Current gate:
    !n.newToday && n.visits % 6 === 0 && !!last?.events?.length

It then selects \`Copy.arrive(..., hasCallback=true)\`, whose pool says the previously sold
preparation helped.

Root cause:
\`last.events.length\` is broader than sold-Item causality. Trait-only events and non-Item events
can satisfy it.

Required:
the callback may trigger only from persisted previous-result v2.8 sold-Item proof.
Trait-only \`injury-guard\` and generic events are insufficient.

Acceptance:
construct a previous expedition with only a Trait event -> no helped callback.
Construct one with proven sold-Item contribution -> helped callback eligible.

### SA-Q26 — STAMP COPY REFERENCES RETIRED FREE SALE

Classification: STALE COPY

Current Source:
\`dist/data/relics.js\` -> \`stamp\`

Observed:
    유료 구매의 단골도 증가량 +50%. 무료 보급과 생환에는 적용하지 않는다.

Root cause:
copy survived the retired free-sale price mode.

Required:
    유료 구매의 단골도 증가량 +50%. 생환으로 얻는 단골도에는 적용되지 않는다.

Do not change the mechanic merely to preserve old wording.

### SA-Q27 — HELP REFUSAL RULE UNDERSTATES THE LOCK

Classification: INFORMATION TRUST BUG

Current Source:
\`dist/ui/app.js::help()\`

Observed:
    같은 상품·같은 가격으로 거절당한 제안은 그날 반복할 수 없습니다.

Actual Source behavior:
\`dist/systems/shop.js::sell()\` also locks every more-expensive mode for that same Item after a
refusal at a lower mode.

Root cause:
help describes only the refused key, not the existing refusal ceiling.

Required:
    한 가격을 거절하면 같은 상품은 그 가격과 더 비싼 가격으로 그날 다시 제안할 수 없다.

Acceptance:
Help agrees with 50% refusal -> 50/100/150 unavailable for same Item, while cheaper modes remain
eligible when they exist.

### SA-Q28 — STORE CAPITAL SHOWN AS GOLD

Classification: TERMINOLOGY / CURRENCY BUG

Current Source:
\`dist/ui/app.js::codex()\`

Observed:
    점포 자본 {N}G

Other Store Capital surfaces already use capital without G.

Root cause:
Codex header reused Gold suffix styling despite Store Capital being a separate Meta currency.

Required:
    점포 자본 {N}

No Player-facing Store Capital value uses G.

### SA-Q29 — REUSED ITEM IDS RETAIN RETIRED HOTBAR FLAVOR

Classification: STALE COPY AFTER ID REUSE

Current Source:
\`dist/data/catalog.js\`

Current ID Flavor:
- \`bar\`: \`꼬치는 매장 앞 수거함에.\`
- \`herobar\`: \`일반 핫바를 두 개 사는 것과는 기분이 다르다고 한다.\`

v2.8 identities:
- bar -> 간단 도시락
- herobar -> 왕도 천연암반수

Root cause:
save-safe ID reuse does not automatically replace Flavor.

Required exact Flavor:
- 간단 도시락: \`반찬은 단출하지만 빈칸은 없다.\`
- 왕도 천연암반수: \`왕도 외곽 암반층에서 길어 올렸다고 적혀 있다.\`

### SA-Q30 — SALE ANALYTICAL LABEL STACK / OLD HELP TEXT

Classification: COPY DENSITY / SOURCE ADOPTION BUG

Current Source:
\`dist/ui/app.js::till()\`, \`readout()\`

Observed headings:
- 보급 후 변화
- 이 상품이 직접
- 보급이 상태에 미치는 영향
- 이 손님에게는 지금 걸리지 않는 효과

Observed permanent forecast prose:
    오늘 이 사람의 몸 상태와 지금 챙긴 보급으로 가늠한 것이다.
    게이트 안에서 어떻게 될지까지는 아무도 모른다.

Observed short tooltips still use the pre-v2.8 wording instead of the exact anchored Help Copy.

Root cause:
the v2.7 source-group explanation remains visually promoted even after v2.8 adds shared source
popovers and exact per-value Help.

Required:
- primary heading = \`판매 후 변화\`
- direct/derived rows have no separate analytical group heading
- intrinsic non-delta truth may use neutral \`상품 효과\`
- permanent forecast paragraph removed
- tooltip/popover copy replaced with COPY_WORLD_VOICE_v2.8 exact text
- internal potion marker remains hidden per SA-Q05

### SA-Q31 — DEEP COPY REPEATED ON MORNING AND SALE

Classification: COPY DENSITY BUG

Current Source:
- \`dist/ui/app.js::deepSlip()\`
- \`dist/ui/app.js::deepOfferUI()\`

Observed:
Morning repeats intro + hazards + note + cost/gain/sink/optional information, then SALE repeats the
gate/note/gain/sink information again.

Root cause:
first-time tutorial content became permanent operational copy.

Required after first tutorial:
Morning:
    심층원정 · {게이트명}
    같은 게이트의 더 깊은 원정. 손님 1명을 후원하면 성공 시 더 성장한다.

SALE nomination:
    {게이트명} · 후원금 {N}G
    성공 시 추가 성장 · 점포 수익 없음

Hazards remain available through the ordinary Gate information; do not duplicate a second tutorial
paragraph here.

### SA-Q32 — TRAIT EFFECT LABELS NAME THE WRONG CHANNEL

Classification: INFORMATION TRUST BUG

Current Source:
\`dist/ui/presentation.js::labels\`

Observed:
- \`visitGold\` -> \`방문 골드\`
- \`loyaltyBonus\` -> \`단골 보너스\`

Root cause:
generic labels hide whether the changed currency/state belongs to Store or NPC and when it applies.

Required:
- 금수저 -> \`방문 시 소지금 +50G\`
- 정직한 -> \`정가·50% 구매 시 단골도 +1\`

Keep mathematically correct \`가중치\` wording for weighting mechanics.

### SA-Q33 — NIGHT OUTCOME SENTENCE DUPLICATES ITEM CAUSE

Classification: COPY HIERARCHY BUG

Current Source:
\`dist/ui/presentation.js::nightHappened()\`

Observed on avoided death:
    보급이 마지막 순간의 사망을 막았다.

v2.8 NIGHT now separately owns a proven Hero Item line.

Root cause:
the old WHAT_HAPPENED sentence also performs the new WHY/PLAYER_CAUSE role.

Required:
Outcome sentence:
    사망 위기를 넘기고 살아 돌아왔다.

Then, when proof exists:
    {Item} 덕분에 살아 돌아왔다.

No generic causality sentence competes with the proven Item line.

### SA-Q34 — CLOSING REPEATS NIGHT ITEM IMPACT

Classification: PLACEMENT / DUPLICATION BUG

Current Source:
\`dist/ui/app.js\` Closing ledger path:
- computes \`Presentation.supplyImpact(r)\`
- renders block heading \`오늘의 보급 영향\`

Root cause:
expedition causality is repeated in Closing after NIGHT already owns that information.

Required:
remove the entire \`오늘의 보급 영향\` block from the primary Closing receipt.
Keep economics-only rows and remove the already-recorded explanatory footer per SA-Q21.

### SA-Q35 — SETTINGS / PRE-RUN DEVELOPMENT COPY

Classification: PLAYER-FACING COPY / DEBUG-BOUNDARY BUG

Current Source:
\`dist/ui/app.js::newRun()\`
- \`재현용 Seed 지정\`
- seed input on ordinary pre-Run screen

\`dist/ui/app.js::settings()\`
- Sound On / Sound Off
- Full Data Reset
- \`버전 0.4 · 로컬 실행 지원 · 외부 연결 없음\`

Root cause:
development/repro/runtime language is exposed on ordinary Player surfaces.

Required:
- ordinary Player buttons: \`소리 켜기 / 소리 끄기\`, \`전체 데이터 초기화\`
- remove Seed control from ordinary pre-Run surface
- remove technical runtime footer
- no new Debug menu required

### SA-Q36 — DECORATION FLAVOR COMPETES WITH PURCHASE EFFECT

Classification: DECISION-SURFACE DENSITY BUG

Current Source:
\`dist/ui/app.js::storePanel()\`

Each Decoration option always renders:
- name
- effect
- Flavor \`<p class="tale">\`
- ownership/purchase state

Root cause:
Flavor has equal persistent screen presence on a four-way management decision despite v2.8
prioritizing exact Function comparison.

Required on Store-management decision surface:
- name
- exact effect
- price/ownership
- equipped state

Do not render Decoration Flavor there.
No new Collection screen is added in this task.

### SA-Q37 — EVENT EXACT COPY STILL OLD IN DATA

Classification: STALE COPY

Current Source:
\`dist/data/catalog.js\` Event data still contains older strings including:
- 본사 반값 행사: \`오늘 첫 50% 판매 · 본사 지원 +50G\`
- 치유소 휴무: \`오늘 의료 상품 구매 의사 +20%p\`

Root cause:
mechanics were aligned in Source, but active Event function strings were not promoted to the v2.8
terminology.

Required exact active lines from COPY_WORLD_VOICE_v2.8:
- \`오늘 첫 50% 할인 판매 · 본사 지원 +50G\`
- \`오늘 보험 상품 구매 의사 +20%p\`
- other targeted v2.8 Event lines must match their current owner exactly.

### SA-Q38 — GLOBAL HELP REMAINS LONG-FORM MANUAL

Classification: COPY DENSITY / DUPLICATION BUG

Current Source:
\`dist/ui/app.js::help()\`

Observed:
multiple paragraphs re-explain visitor ranges, Gate progression, Trait visibility, Closing,
bankruptcy and persistence already taught elsewhere.

Root cause:
old global manual remained after v2.8 moved contextual explanation into anchored help.

Required:
replace the whole body with the exact compact Help copy in COPY_WORLD_VOICE_v2.8.
Do not preserve the old manual as an additional second section.


## NUMERIC COHERENCE RE-AUDIT ADDENDUM — 2026-09-20

### SA-Q39 — v2.8 ITEM NUMERIC REBASELINE

Classification: MISSING ADOPTION

Current Source:
`dist/data/catalog.js`

Required active replacements:
- 삼각김밥 C 35/70 · 강인함6 · Supply5
- 생수 C 40/85 · 강인함10 · Supply2
- 간단 도시락 U 85/180 · 강인함10 · Supply6 · expedition Wallet +20%
- 길드 특제 도시락 R 160/340 · 강인함14 · Supply7 · expedition Wallet +40%
- 영웅 결전 도시락 E 210/440 · 강인함18 · Supply9
- 왕도 천연암반수 E 185/390 · 강인함20 · Supply2

Active Rarity distribution after adoption:
    C11 / U12 / R5 / E11 / L1

Do not rebalance another Item's Rarity to restore the old C/U count.

### SA-Q40 — FRESH NATIVE-STAT AMPLIFICATION TOO HIGH FOR v2.8 ITEM BASES

Classification: MISSING ADOPTION / BALANCE BASELINE

Current Source:
`dist/systems/dungeon.js::nativeStatFactor()`

Observed:
- kitchen +40%
- fresh24 +80%
- active-Supply expeditionMeal +25%

Required:
- kitchen +30%
- fresh24 +50%
- active-Supply expeditionMeal native Stat +20%
- matching Hazard Counter multiplier remains +25%

Root cause:
the inherited Fresh amplification was calibrated before the v2.8 Food/Water native-Stat rebaseline.

### SA-Q41 — GREAT SUCCESS DIRECT STORE-GOLD SNOWBALL

Classification: MISSING ADOPTION / ECONOMY REBALANCE

Current Source:
`dist/data/catalog.js::G.DATA.greatSuccess.storeGoldByBand`

Observed:
    100 / 200 / 300G

Required:
    D1-10 50G
    D11-20 100G
    D21-30 200G

Do not change:
- signalMargin 0.26
- chanceSlope 0.80
- chanceCap 0.30

Purpose:
retain the intended well-grown-NPC -> repeated-Great-Success loop while reducing the second-order
Store-economy snowball in already-strong Runs.

### SA-Q42 — DEEP EXACT VALUES / GREAT REWARD

Classification: CANONICAL CLOSURE + MISSING ADOPTION

Current Source:
`dist/data/catalog.js::G.DATA.deepTuning`

Keep:
- powerFactor 1.50
- threeOccurrenceChance 0.50
- sponsorBase 350
- rarityStep 0.20
- levelStep 0.05
- rounding 10
- success EXP +40
- success Wallet +60

Change:
- Great Success EXP 90 -> 80
- Great Success Wallet 150 -> 120

Acceptance:
- Deep occurrence is exactly 2 or 3 with 50/50 weighting
- Great Success Deep bonus is exactly 2× Success bonus
- Deep Store Gold remains 0
