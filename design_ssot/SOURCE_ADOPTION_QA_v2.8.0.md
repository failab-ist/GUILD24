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
