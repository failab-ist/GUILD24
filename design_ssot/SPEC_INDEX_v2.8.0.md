# GUILD24 DESIGN SSOT INDEX

DOC=SPEC_INDEX
OWNER=spec_index,design_ssot_routing,version_policy,source_access
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=DESIGN_SSOT_INDEX
FREEZE_STATUS=PROJECT_WIDE_V2_8_CANONICAL
FREEZE_DATE=2026-09-20
LAST_APPROVED_AMENDMENT=2026-09-22
SSOT_AUDIT_STATUS=PROJECT_WIDE_AUDIT_COMPLETE
VISION_DETAIL_PROMOTION_STATUS=COMPLETE
COPY_REAUDIT_STATUS=COMPLETE
V2_8_AMENDMENT_NUMERIC_REAUDIT_STATUS=COMPLETE
PLAYTEST_RESPONSE_AMENDMENT_STATUS=CANONICAL_PROMOTED_2026_09_22
STORE_SUPPORT_FULL_AUDIT_STATUS=COMPLETE
FULL_LEGACY_CHAIN_REAUDIT_STATUS=COMPLETE
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=NONE
SOURCE_ADOPTION_STATUS=V2_8_CANONICAL_SOURCE_ADOPTION_IN_PROGRESS
EXTERNAL_PUBLIC_RELEASE_TARGET=v3.0.0

## AUTHORITY

1. User's newest approved decision
2. current GUILD24 Design SSOT routed by this index
3. current Source
4. older chat / proposal / report / historical spec

DESIGN TRUTH = current routed Design SSOT.
IMPLEMENTATION TRUTH = current Source.

v2.8 is now the project-wide current Design SSOT. The previous scoped-decoration-only meaning of
SPEC_INDEX_v2.8.0 is superseded.

## CURRENT v2.8 PURPOSE

v2.8 is a focused Core Readability / Playtest Response release.

It does not broaden the game with P2 structural features. It improves the current loop:

    observe
    -> infer
    -> choose
    -> see the actual change
    -> see the resolved result
    -> remember it for the next decision

Priority:
- current correctness and runtime UX
- Copy / Information Trust
- SALE -> NIGHT causal readability
- Fatigue salience
- Store Support salience and truth
- Item role clarity
- Boss five-Day presence
- mobile density
- evidence-gated balance follow-up

P2+ expansion remains routed to GUILD24_v2.9_PLUS_DEFERRED_DETAILED.md and is not v2.8 Design Truth.

## CURRENT CANONICAL FILE SET

Core / Run / Meta:
- 00_GAME_CORE_v2.8.0.md
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
- COPY_WORLD_VOICE_v2.8.0.md
- COPY_AUDIT_APPROVED_v2.8.0.md
- EVENT_v2.8.0.md
- BOSS_v2.8.0.md
- FINAL_EXPEDITION_v2.7.0.md

QA:
- CORE_RUN_QA_v2.8.0.md
- ECONOMY_ORDER_QA_v2.8.0.md
- NPC_TRAIT_QA_v2.8.0.md
- DUNGEON_ITEM_QA_v2.8.0.md
- RELIC_QA_v2.8.0.md
- UI_UX_QA_v2.8.0.md
- SOURCE_ADOPTION_QA_v2.8.0.md

Audit:
- SSOT_AUDIT_v2.8.0.md

## ROUTING

GAME CORE / CROSS-RUN IDENTITY -> 00_GAME_CORE_v2.8.0.md
RUN / PHASE / SAVE / PRE-RUN / META SETTLEMENT / BOSS BRIEFING ORDER -> CORE_RUN_v2.8.0.md
META / JOB MASTERY / STORE CAPITAL / DECORATION -> META_v2.8.0.md
PRICE / GOLD / WALLET / ORDER / REROLL / RARITY -> ECONOMY_ORDER_v2.8.0.md
NPC / JOB / TRAIT / LOYALTY / TRUSTED REGULAR / REVISIT -> NPC_TRAIT_v2.8.0.md
DUNGEON / HAZARD / PREPARED POWER / SUPPLY / FATIGUE / RESULT PROOF -> DUNGEON_HAZARD_v2.8.0.md
ITEM / CATALOG / FOOD / DRINK / POTION / INSURANCE -> ITEM_v2.8.0.md
STORE SUPPORT / RUN BUILD / SLOTH WINDOW -> RELIC_v2.8.0.md
SALE -> SALE_v2.8.0.md
NIGHT / CLOSING / RESULT CAUSALITY -> NIGHT_CLOSING_v2.8.0.md
UI / UX / MOBILE / POPOVER / SEMANTIC DELTA / DECORATION -> UI_UX_v2.8.0.md
COPY / PLAYER-FACING TERMS / BOSS REPORT COPY -> COPY_WORLD_VOICE_v2.8.0.md
COPY EXACT PLAYER TEXT AMENDMENT -> COPY_AUDIT_APPROVED_v2.8.0.md
EVENT -> EVENT_v2.8.0.md
BOSS -> BOSS_v2.8.0.md
FINAL FORMULA / PARTY / FINAL TRANSFER / D25 FINAL STATE -> FINAL_EXPEDITION_v2.7.0.md

## HISTORICAL / SUPERSEDED FILE POLICY

Versioned owner files not listed in CURRENT CANONICAL FILE SET are historical/base references only.
They remain in design_ssot only when a current owner inherits from them. Unreferenced historical
navigation/decision snapshots may be removed. Historical/base owner files must not be opened as a
second current truth.

The v2.8 Director Plan is a non-Canonical release-vision/orientation document only.
It must contain no implementation rule, numeric baseline, exact UX contract or QA requirement.

Unapproved Copy Audit drafts remain non-Canonical history.
COPY_AUDIT_APPROVED_v2.8.0.md is the User-approved exact Player-facing copy amendment routed above.

Do not delete an older owner file if a current owner explicitly inherits it.
Cleanup means removing it from current routing and overriding stale live clauses, not destroying
the inheritance trail.

## RETIRED ACTIVE SYSTEMS

The following remain historical only:
- Franchise Grade
- Franchise Achievement track
- Grade ORDER discount
- Start Contract selection / gating

Their inactive archive policy remains owned by META_v2.8.0.md.

## DOCUMENT BASELINE POLICY

Numbers marked DIRECTOR DOCUMENT BASELINE are the approved v2.8 Source-adoption starting values.

For the v2.8 adoption cycle they are MANDATORY exact Design Truth, not recommendations, test candidates,
soft targets or values that WORK/QA may choose to ignore.

Source must adopt them as written before the related v2.8 adoption item can PASS.

"Baseline" means the required current value from which later measured balance changes may begin.
It does not mean optional or provisional.

They remain eligible for later balance adjustment only through:

    measurement
    -> BALANCE FINDING
    -> User/Director approval
    -> owner-spec amendment
    -> separate Source change

A baseline is not permission for WORK or QA to tune, substitute, skip or approximate the number.

## MEASUREMENT-GATED, NOT DESIGN-UNRESOLVED

The following are not implementation blockers:
- global economy pressure
- Great Success occurrence / probability tuning after the approved .26 / .80 / .30 baseline
- Great Success economic snowball after the reduced 50 / 100 / 200G Store-Gold baseline
- Store Support aggregate value after the v2.8 baselines are adopted
- Food / Water / Fresh-build value efficiency after the v2.8 baseline is adopted
- Gate / Family / Hazard frequency and perceived difficulty

Fire-family occurrence currently has no approved special frequency reduction.
A single-run perception is not enough to tune it.

## CURRENT DESIGN CLOSURE GATE

The full inheritance-chain re-audit is closed by User approval on 2026-09-20.

The former Source-only / inherited-PASS3 gaps are now owned by:
- SALE purchase acceptance / operating cost / ORDER pity -> ECONOMY_ORDER_v2.8.0.md
- Gate-count / Tier generation / Forecast boundaries / ordinary resolve & rewards -> DUNGEON_HAZARD_v2.8.0.md
- Job Base/Growth / Loyalty / revisit -> NPC_TRAIT_v2.8.0.md
- Job Mastery -> META_v2.8.0.md
- targeted Event exact mechanics -> EVENT_v2.8.0.md

Related exact acceptance is in the current routed QA or Event acceptance section.
WORK must implement current Canonical and must not resurrect superseded PASS3 placeholders.

## PLAYTEST RESPONSE AMENDMENT — 2026-09-22

The User-approved playtest response is promoted into the routed current owners.

Exact owners:
- SALE top density / Bag presentation -> SALE_v2.8.0.md + UI_UX_v2.8.0.md
- D0 first-support -> Boss-information order -> CORE_RUN_v2.8.0.md + BOSS_v2.8.0.md + RELIC_v2.8.0.md
- first-support exact copy -> COPY_WORLD_VOICE_v2.8.0.md + COPY_AUDIT_APPROVED_v2.8.0.md
- purchase acceptance / NPC Wallet / Deep sponsorship -> ECONOMY_ORDER_v2.8.0.md
- Item visual identity after save-safe ID reuse -> ITEM_v2.8.0.md

These are current approved baselines, not measurement-gated suggestions.
After Source adoption, re-measure aggregate economy/survival impact before any further tuning.

## SOURCE ACCESS

    SPEC_INDEX_v2.8.0
    -> exact routed owner
    -> only required inherited base section when needed
    -> related current QA
    -> Current Source

SOURCE_ADOPTION_QA_v2.8.0.md is an audit-HEAD defect record. Its `Current Source` descriptions
refer to that file's recorded `AUDIT_SOURCE_HEAD`; resolved findings are intentionally not rewritten
as a live tracker. WORK may use it to avoid rediscovering root causes, but current resolution status
comes from WORK_STATE + current Source + reviewed commits.

If a routed source cannot be accessed after explicit lookup, report PROJECT SOURCE ACCESS/INDEX ISSUE.


## v2.8 RELEASE ACCEPTANCE — HIGH LEVEL

v2.8 is ready to close when all of the following are true:

- known current correctness/runtime UX findings are fixed
- active player information is current, truthful and non-contradictory
- the Player can read choice -> actual change -> resolved result more clearly
- sold-Item impact is surfaced only where causality is proven
- Fatigue, Loyalty and Store Build effects are visible at meaningful decision/result moments
- mobile core-flow density no longer duplicates or crowds essential information
- the Run's Boss objective remains present through the approved information cadence
- approved Item / Store Support baselines are adopted
- measurement-gated balance questions are either supported by evidence or explicitly carried forward
- no v2.9+ structural expansion is pulled into v2.8

Exact mechanics, numbers, copy, UX and pass/fail criteria are not repeated here.
Use the routed owner Specs / QA.
