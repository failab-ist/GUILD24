# GUILD24 DESIGN SSOT INDEX

DOC=SPEC_INDEX
OWNER=spec_index,design_ssot_routing,version_policy,source_access
DOC_VERSION=2.11.1
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.11.1
DOC_AUTHORITY=DESIGN_SSOT_INDEX
FREEZE_STATUS=AFTER_V2_11_1_WORKING (User 2026-10-09 job profiles and half-strength ordinary Gates, retaining the approved Final and EXP boundaries; User 2026-10-10 text/source alignment and approved support timing / per-slot Event supply); v2.11.1 and every earlier release remain closed - CHANGELOG §RELEASE RECORD
SOURCE_ADOPTION_STATUS=V2_11_1_ADOPTED_PLUS_APPROVED_BALANCE (Text/source alignment batches1-8, support timing and per-slot Event supply are adopted; User 2026-10-09 revised six-job profiles and half-strength ordinary Gate/Fire adjustments are adopted; the further EXP/boost candidate is deferred; Counter recovery, approved additional ORDER slots and Potion distribution/HQ income are adopted locally; the approved growth, late Gate, Mage, Boss, lagging EXP and Final hazard requirement28/penalty2 balance is adopted)
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=NONE
NONBLOCKING_CANONICAL_DETAIL_GAPS=NONE
EXTERNAL_PUBLIC_RELEASE_TARGET=v3.0.0
PUBLIC_RELEASE_CANONICAL=PLATFORM_RELEASE_v3.0.0.md

## AUTHORITY

1. User's newest approved decision
2. current GUILD24 Design SSOT routed by this index
3. current Source
4. older chat / proposal / report / historical spec

NAMES = GLOSSARY_v2.8.0.md. What a thing is called, and what it must not be called, is decided there; rules and exact copy stay with their owners.

DESIGN TRUTH = current routed Design SSOT.
IMPLEMENTATION TRUTH = current Source.

## GAME CORE

### BRAND
brand=GUILD24 / 길드24
slogan=`던전 가기 전, 길드24.`
parent=길드리테일

### ONE-LINE
《던전 앞 편의점》 = RPG 세계를 편의점 카운터 뒤에서 플레이하는 턴제 경영 로그라이트.

### CORE FANTASY
플레이어는 용사가 아니라 던전 앞 `GUILD24` 점주다.

직접 싸우지 않는다.
대신 모험가가 원정을 떠나기 전에:
- 무엇을 준비해 둘지
- 누구에게 무엇을 팔지
- 얼마에 팔지

결정한다.

그 선택이 모험가의 생환/부상/죽음, 성장, 재방문, 그리고 Run 후반의 전력에 누적된다.

### CORE LOOP
MORNING — `오늘 어떤 날인가?`
- 오늘의 상황/게이트/위험/이벤트를 읽는다.

ORDER — `무엇을 준비할까?`
- 제한된 Gold와 재고 공간으로 상품/수량/현금 여유를 결정한다.

SALE — `이 손님에게 무엇을, 얼마에 팔까?`
- NPC의 상태/성격/성장/목적지를 보고 상품과 가격을 정한다.
- 현재 이익과 NPC 미래가치를 동시에 판단한다.

NIGHT — `내 선택이 어떻게 됐을까?`
- 원정 결과와 판매/준비의 실제 영향을 확인한다.

CLOSING — `오늘 장사는 어땠을까?`
- 매출/비용/손익을 정리하고 다음 날 판단으로 연결한다.

### CORE FUN
핵심은:

    observe
    -> infer
    -> choose
    -> see the actual change
    -> see the resolved result
    -> remember it for the next decision

Primary principle:
    information should be easy to read; the decision should remain difficult.

Therefore the design:
- removes stale/internal information
- makes current-state changes attributable
- strengthens choice -> actual result feedback
- makes existing Fatigue / Loyalty / Store Build axes visible when they matter
- does not expose hidden final success probability
- does not add a strategy grader that chooses the Item for the Player

정답 계산보다 불완전한 정보에서의 판단이 중요하다.

지향 감정:
- `이 정도면 괜찮겠지?`
- `이거 하나 더 챙겨줘야 하나?`
- `비싸게 팔아도 사려나?`
- `지난번에 다쳤던 애네.`
- `처음엔 약했는데 많이 컸네.`
- `그때 하나 더 팔 걸.`

### EMOTIONAL CORE
Run에서 가장 기억에 남아야 하는 것은 `모험가`다.

플레이어가 몇몇 NPC를:
- 기억하고
- 약점/성격을 파악하고
- 반복해서 만나고
- 성장시키고
- 다치면 걱정하고
- 살아 돌아오면 안도하고
- 죽으면 손실을 느끼는

관계가 자연스럽게 생겨야 한다.

정상 Run 중후반에는 약 `2~4명`의 믿을 만한 단골이 생기는 느낌을 목표로 한다.

### STORE / ROGUELITE CORE
경영과 Roguelite Build는 NPC Loop와 분리되지 않는다.

장기 흐름:
발주
→ 판매/가격
→ 현재 Gold 또는 NPC 투자
→ 원정 결과
→ 성장/Wallet/Loyalty/Revisit
→ 미래 고객 가치
→ Gold 축적
→ Relic 투자
→ 점포 Build 변화
→ 이후 발주/판매 전략 변화
→ 후반 고객 Pool / Final Expedition 변화

Player가 Run을 끝낸 뒤:
`이번 판은 어떤 편의점이었는가`
를 설명할 수 있어야 한다.

Run Variation의 중심은 단순 NPC Rarity가 아니라
Player가 선택한 Store Build와 그 안에서의 운영 판단이다.

### CROSS-RUN CORE
Cross-run progression has two active growth identities.

#### STORE GROWTH

    actual Gross Sales x survival depth
    -> Store Capital
    -> permanent Decoration ownership
    -> pre-Run Decoration loadout
    -> changed store-operation options next Run

Store Growth remains operation/access/economy progression, not account-wide raw combat power.

#### JOB MASTERY

    Boss CLEAR with Job
    -> Job Mastery
    -> that Job's existing future spawn-growth channel

### RUN / META BUILD SEPARATION
Run-scoped 점포지원 = Store Build created inside the current Run.
Decoration = permanent cross-run collection selected before the Run.

Do not merge the two systems.

### INFORMATION PRINCIPLE
`재료는 공개, 공식은 숨김.`

플레이어가 볼 수 있어야 하는 것:
- NPC의 판단용 Stat/상태
- Item의 실제 주요 효과
- 알려진 Hazard
- Trait의 실제 의미
- 정성적 Expedition Forecast
- 발주용 다음날 Dungeon Tier 실제 확률

숨기는 것:
- exact expedition success probability
- unconditional whole-expedition Death probability
- internal coefficients / thresholds unless a current owner explicitly exposes them
- 최종 정답을 대신 계산하는 단일 안전점수

Current SALE may expose the exact **failure-conditioned Death risk** owned by
DUNGEON_HAZARD_v2.8.0.md. This is the chance of Death after the expedition has entered its failure
path; it is not the unconditional whole-expedition Death probability. It is exposed in the outlook help and
the NPC detail, not as an always-on cell.

준비는 `확신`을 높여야 하지만 `확정`을 만들지는 않는다.

### SYSTEM OWNERSHIP
JOB = Base Stats + Growth
TRAIT = Character Variation
RELIC = Store Build
ITEM = Expedition Preparation
DUNGEON = Stat/Hazard Puzzle
FORECAST = 판단 재료
EVENT = Daily Decision Modifier
BOSS = Final Opponent Identity / Boss-specific Decision Modifier
FINAL = Run Culmination / Resolution
META = Cross-run Mastery / Unlock / Knowledge
COPY = Player-facing Voice / Expression

각 시스템은 다른 시스템의 역할을 불필요하게 침범하지 않는다.

### DESIGN JUDGMENT
새 아이디어/수정안은 먼저 확인한다.

1. Core Loop의 판단을 더 재미있게 만드는가?
2. 의미 있는 Player Decision을 만드는가?
3. NPC 애착 또는 경영 판단을 강화하는가?
4. 기존 시스템으로 해결 가능한가?
5. 복잡성 증가가 재미 증가보다 큰가?

기본 우선순위:
`ADD`보다 필요하면 `REMOVE / MERGE / CLARIFY / REBALANCE`

기능 수 증가 자체를 게임 발전으로 보지 않는다.

### RUN GOAL
하루의 작은 경영/판매 판단이 30일 동안 누적되어:
- 가게의 운영 스타일이 달라지고
- 반복 방문 NPC가 성장하며
- 최종 원정이 그 Run 전체의 결과처럼 느껴져야 한다.

세부 규칙/수치/구현 상태는 각 Canonical System Spec을 따른다.

### FIRST-CLEAR BOUNDARY
Fresh Store / zero Decoration remains capable of Final access and first Boss clear through strong
play and valid RNG.

### INACTIVE LEGACY BOUNDARY
No Franchise Grade / Franchise Achievement / Grade ORDER discount / Start Contract rule is active
in the current game. Archive ownership is routed to META_v2.8.0.md.

## CURRENT v2.9.0 PURPOSE — "쉽게 배우고, 깊게 파는"

v2.9.0 answers three playtest findings: "너무 복잡하다", "뭘 어떻게 하는 건지
모르겠다", and "손님에게 직접 파는 게임인데 그것이 보이지 않는다". The goal is easy to learn, hard to
master: the fun axes stay (Hazard Counter, three price modes, Traits, the four Core Stats always
visible); the screens explain themselves; complexity that is not fun is removed; the transaction is
seen. Documents are amended first, Source follows per owner (docs-first).

Scope (owner amendments are the truth; this list is routing):

    A. the transaction is visible — counter tray, hand-over motion into the Bag, customer reaction,
       customer exit/entry, price-mode sound family, refusal beat        -> PRESENTATION_PRINCIPLES / UI_UX / SALE
    B. the screen says what to do — DAY 1~3 task line, first-order coach order, Hazard rows that
       say what resists them, per-Gate visitor counts (counts only; no ORDER today-fit emphasis),
       NIGHT -> next-decision line, shorter D1 briefing / guide              -> UI_UX / ECONOMY_ORDER / NIGHT_CLOSING / COPY
    C. SALE reads at a glance — today's pressure tag on the Stat grid, fixed per-category effect order on
       rows (no matching-effect emphasis), one delta list after a sale, the per-customer receipt stub, price-role words, no always-on Death %, folded last
       expedition above the Stat grid; first-sale coach diet (done)                  -> SALE / UI_UX / COPY
    D. simpler rules — Supply becomes Fatigue recovery only (no required Supply, Fatigue 0~40 with
       five bands), single-Stat Hazard pressure 3/3/3 without 투력 (no Gate shares a Stat), Store Support card copy in two
       clauses, presentation leftovers                                       -> DUNGEON_HAZARD / ITEM / NIGHT_CLOSING / NPC_TRAIT / RELIC

Not in v2.9.0: a "simple view" toggle, hiding zero receipt rows, direct hints such as
`도움 됨 / 무관`, extra price depth, removing Hazard Counter / price modes / Traits.
Every P2+ expansion stays in GUILD24_v3.0_PLUS_DEFERRED_DETAILED.md.

Scope rule: pull forward whatever the current playtest needs, defer whatever it does not. Against the three
findings nothing from the v3.0+ router is promoted. Drag (§6) does not choose a price, so the hand-over is shown by
motion on the existing tap flow; desktop redesign (§8), item memory (§3) and art waves (§18) do not answer any
finding; customer reaction is done by motion, not new art. Deferred to v3.0+: moving the folded last-expedition line
below the Stat grid, clause-per-line card wrapping (scope D's two-clause card copy stands).

## VERSION POLICY

Versions are managed the way a maintained project does it, not by renaming files.
- Owner filenames are stable lineage names (`<OWNER>_v2.8.0.md` stays the file for v2.9.0 and later).
  Tests and routing keep their paths.
- `DESIGN_SSOT=` in every owner header names the project version the file belongs to.
- `DOC_VERSION=` in an owner header is bumped to the project version in which that owner last changed.
- `design_ssot/CHANGELOG.md` records what each version changed, per owner, with the User decision date.
- A release is closed by a git tag (`v2.9.0`) on the commit where SPEC_INDEX, CHANGELOG, owners and
  Source agree; the tag, not a filename, is the version.
- Owners state the current spec only; what changed and why is CHANGELOG's, older wording is in git history.

## CURRENT CANONICAL FILE SET

Core / Run / Meta:
- SPEC_INDEX_v2.8.0.md (this index; §GAME CORE)
- GLOSSARY_v2.8.0.md (game terms: names, meanings, retired names)
- CORE_RUN_v2.8.0.md
- META_v2.8.0.md

Economy / NPC / Dungeon / Item / Store Build:
- ECONOMY_ORDER_v2.8.0.md
- NPC_TRAIT_v2.8.0.md
- DUNGEON_HAZARD_v2.8.0.md
- ITEM_v2.8.0.md
- RELIC_v2.8.0.md

Flow / Result / UI / Copy:
- SALE_v2.8.0.md
- NIGHT_CLOSING_v2.8.0.md
- UI_UX_v2.8.0.md
- PRESENTATION_PRINCIPLES_v2.8.0.md
- COPY_WORLD_VOICE_v2.8.0.md
- COPY_AUDIT_APPROVED_v2.8.0.md
- EVENT_v2.8.0.md
- BOSS_v2.8.0.md
- FINAL_EXPEDITION_v2.8.0.md

Public release integration:
- PLATFORM_RELEASE_v3.0.0.md (Android v3.0.0 wrapper / native save / Saved Games / app lifecycle / Android Back / haptics)

QA: each owner's acceptance criteria are its own `## QA — ACCEPTANCE` section (CORE_RUN, ECONOMY_ORDER, NPC_TRAIT,
DUNGEON_HAZARD, ITEM, RELIC, UI_UX). A `<OWNER>_QA`
file name in CHANGELOG, archive, WORK_STATE, Source or test comments means that owner's §QA; `DUNGEON_ITEM_QA` is
split between DUNGEON_HAZARD §QA (DUN / DI / SIM ids) and ITEM §QA (ITEM ids, the Item-line and result-proof DI ids).

The closed v2.8 audit records are in `archive/v2.8/`: SSOT_AUDIT (the Canonical audit) and SOURCE_ADOPTION_QA (the
audit-HEAD Source defect record, every SA-Q adopted at the v2.8 release; Source and test comments cite its SA-Q ids).

## ROUTING

GAME CORE / CROSS-RUN IDENTITY -> SPEC_INDEX §GAME CORE (this index)
RUN / PHASE / SAVE / PRE-RUN / META SETTLEMENT / BOSS BRIEFING ORDER -> CORE_RUN_v2.8.0.md
META / JOB MASTERY / STORE CAPITAL / DECORATION -> META_v2.8.0.md
PRICE / GOLD / WALLET / ORDER / REROLL / RARITY -> ECONOMY_ORDER_v2.8.0.md
NPC / JOB / TRAIT / LOYALTY / TRUSTED REGULAR / REVISIT -> NPC_TRAIT_v2.8.0.md
DUNGEON / HAZARD / PREPARED POWER / SUPPLY / FATIGUE / RESULT PROOF -> DUNGEON_HAZARD_v2.8.0.md
ITEM / CATALOG / FOOD / DRINK / POTION / INSURANCE -> ITEM_v2.8.0.md
STORE SUPPORT / RUN BUILD / SLOTH WINDOW -> RELIC_v2.8.0.md
SALE -> SALE_v2.8.0.md
NIGHT / CLOSING / RESULT CAUSALITY -> NIGHT_CLOSING_v2.8.0.md
UI / UX / MOBILE / TUTORIAL / POPOVER / SEMANTIC DELTA / DECORATION -> UI_UX_v2.8.0.md
PRESENTATION PRINCIPLES / VISUAL CONSTRUCTION / ASSET QUALITY / ORNAMENT BUDGET / AUDIO PRESENTATION / VISUAL REVIEW -> PRESENTATION_PRINCIPLES_v2.8.0.md
TERMS / NAMES / RETIRED NAMES -> GLOSSARY_v2.8.0.md
COPY / PLAYER-FACING TERMS / COPY-SYSTEM RULES -> COPY_WORLD_VOICE_v2.8.0.md
EXACT PLAYER-FACING COPY -> COPY_AUDIT_APPROVED_v2.8.0.md
EVENT -> EVENT_v2.8.0.md
BOSS -> BOSS_v2.8.0.md
FINAL FORMULA / PARTY / FINAL TRANSFER / D25 FINAL STATE -> FINAL_EXPEDITION_v2.8.0.md
ANDROID APP WRAPPER / PACKAGE ID / NATIVE SAVE / PLAY GAMES SAVED GAMES / APP LIFECYCLE / ANDROID BACK / HAPTICS -> PLATFORM_RELEASE_v3.0.0.md

## HISTORICAL / SUPERSEDED FILE POLICY

Every owner in CURRENT CANONICAL FILE SET is self-contained and inherits from no older file. Older owner
versions live only in git history; do not restore them, and do not open historical/base files, as a second current truth.

Unreferenced historical navigation/decision snapshots may be removed.

archive/v2.8/GUILD24_v2.8_RELEASE_VISION.md is non-Canonical orientation only and carries no detailed mechanics,
numbers, exact UX contract or QA requirement.

Do not delete history files merely because they are old.

## RETIRED ACTIVE SYSTEMS

Franchise Grade, Franchise Achievement track, Grade ORDER discount and Start Contract selection / gating are
historical only -> §INACTIVE LEGACY BOUNDARY; their inactive archive policy is owned by META_v2.8.0.md.

## DOCUMENT BASELINE POLICY

An approved baseline in a current owner is mandatory Design Truth for Source adoption, not a
recommendation or a value WORK/QA may tune.

Later adjustment requires:

    measurement
    -> BALANCE FINDING
    -> User/Director approval
    -> owner-spec amendment
    -> separate Source change

## MEASUREMENT-GATED, NOT DESIGN-UNRESOLVED

The following remain measurement-gated rather than implementation blockers:
- global economy pressure
- Great Success occurrence / probability
- Great Success economic snowball
- Store Support aggregate value
- Food / Water / Fresh-build value efficiency
- Gate / Family / Hazard frequency and perceived difficulty

Current exact baselines live only in their routed owners.

A single-run perception is not enough to change an approved baseline.

## SOURCE ACCESS

    SPEC_INDEX_v2.8.0
    -> exact routed owner
    -> related current QA
    -> Current Source

Current resolution status comes from WORK_STATE + current Source + reviewed commits.

If a routed source cannot be accessed after explicit lookup, report PROJECT SOURCE ACCESS/INDEX ISSUE.

## VERSION HISTORY

What each version changed, with its owners, User decision dates, commits, PRs and tags: `design_ssot/CHANGELOG.md`
(§RELEASE RECORD lists every closed version). This index keeps only the current routing.

## GAME FEEL CONTRACT — ROUTING

Game feel (타격감) beats H1~H7: design, contract and status -> PRESENTATION_PRINCIPLES_v2.8.0.md §GAME FEEL BEAT
(principles table, contract, H1~H7 rows).

  Contract: presentation-only, ≤ 320 ms per beat (사망 tape ≤ 500 ms), no input block, reduced-motion
  no-op, motion inside the card, no full-screen shake, no combo / streak UI, no praise word, no rule /
  Save / RNG / proof change. Intensity by event weight (일반 / 중요 / 클라이맥스), the impact budget (one
  visual + one sound + at most one number / cause response per landing) and the two sequence reviews
  (last verdict → CLOSING → next day; FINAL result → clear screen) -> PRESENTATION §GAME FEEL BEAT.
  H7 FINAL 교전 (the resolved Final played out as a card fight before the ending) is the one scene exempt from the
  per-beat length and the inside-the-card rule -> PRESENTATION §GAME FEEL BEAT H7 / UI_UX §FINAL — CLASH SCENE / UI-Q-v29-46.

Exact mechanics, numbers, copy, UX and pass/fail criteria live in the routed owner Specs / QA.
