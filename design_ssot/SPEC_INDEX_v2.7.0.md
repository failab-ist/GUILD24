# GUILD24 DESIGN SSOT INDEX

DOC=SPEC_INDEX
OWNER=spec_index,design_ssot_routing,version_policy,source_access
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=DESIGN_SSOT_INDEX
FREEZE_STATUS=V2_7_IMPLEMENTATION_BASELINE
FREEZE_DATE=2026-09-15
LAST_APPROVED_AMENDMENT=2026-09-19
SSOT_AUDIT_STATUS=LATEST_PLAYTEST_HOTFIX_SYNCED
IMPLEMENTATION_BLOCKING_DESIGN_UNRESOLVED=NONE
NON_BLOCKING_PLAYER_COPY_UNRESOLVED=NONE
BALANCE_STATUS=APPROVED_BUNDLE_IN_SOURCE
SOURCE_ADOPTION_STATUS=ADOPTED_BASE_PENDING_PLAYTEST_UI_AUDIO_HOTFIX
V2_7_SOURCE_EDIT_GATE=RECOVERY_CLOSE_CONFIRMED
EXTERNAL_PUBLIC_RELEASE_TARGET=v3.0.0

## AUTHORITY

Authority order:

```text
1. User's newest approved decision
2. current GUILD24 Design SSOT
3. current Source
4. older chat / proposal / report / historical spec
```

DESIGN TRUTH = Design SSOT
IMPLEMENTATION TRUTH = Source

If current Source still matches v2.6/v2.6.1 rather than this v2.7 SSOT, classify the difference as missing adoption / implementation difference. Do not reinterpret this SSOT to match Source.

## CURRENT EXECUTION SCOPE — v2.7 + DECORATION BACKPORT

The **current implementation / balance line remains v2.7**.

The files created under the v2.8 name are **not a project-wide v2.8 promotion for the current cycle**.
For the current v2.7 work, only the approved **Decoration Package** from those files is adopted as an overlay:

- Store Capital and its Run-end settlement structure
- permanent Decoration ownership
- fixed Decoration Slots and pre-Run loadout
- initial four Decoration effects
- the active retirement of Franchise Grade / Franchise Achievement / Start Contract that is necessary for Decoration to replace that progression layer
- inactive preservation of the retired v2.7 Franchise/Contract implementation
- only the Run/UI/Save support required to make the Decoration Package work

Everything else must continue to follow the current v2.7 routed owner Specs.

In particular:
- Gate / Wallet / Hazard-Counter tuning remains a **v2.7 balance change** against the current owners
- do not infer a project-wide v2.8 Source Adoption
- do not introduce unrelated v2.8 systems, migrations, or version-boundary work
- the v2.8 files are scoped design sources for the Decoration Package only in this cycle

Decoration scoped sources:
- `00_GAME_CORE_v2.8.0.md`
- `META_v2.8.0.md`
- `CORE_RUN_v2.8.0.md`
- `UI_UX_v2.8.0.md`
- their Decoration-related QA clauses

If those scoped files conflict with current v2.7 owners **outside the Decoration Package**, the v2.7 owner remains authoritative.

## v2.7 VERSION POLICY

v2.7.0 is a new Core Play / Design revision on the current internal-development line.

Current release context:

```text
v2.x = internal development / test versions
v3.0.0 = current target for first external public release
```

Compatibility policy before v3.0.0:
- do not add migration complexity solely to preserve older internal-test saves when current design/schema meaning changed
- current v2.7 Save v8 does not import v1~v7 Run or Account/Meta progression
- fresh current state is preferred over internal-test compatibility shims
- the external-release compatibility policy for v3.0.0+ is a later release-boundary decision and is not implied by current internal-test behavior

General version rules:
- only owner Specs/QA whose authoritative content changed receive `_v2.7.0`
- unchanged owners keep their latest earlier version
- v2.7 patch-style owner files may declare `BASE_DOCUMENT`; unchanged sections inherit that exact base chain
- detailed numeric/UX/QA truth belongs only in its owner file
- do not copy this Index into runtime/source as a second design authority

`DIRECTOR DOCUMENT BASELINE` means an approved implementation starting value that is intentionally pending simulation/full-run validation. It is not permission for WORK or frozen QA to auto-tune Production values.

## PATCH / INHERITANCE RESOLUTION RULE

For every routed patch-style v2.7 owner/QA document:

```text
current routed owner patch
> its declared BASE_DOCUMENT
> older base chain
```

Therefore:
- an explicit current patch override supersedes conflicting base prose/QA even if the base remains physically present
- inherited content is live only when it does not conflict with the current patch or another current routed owner
- versioned cross-spec filenames written inside an older inherited base are historical references, not routing authority
- cross-owner lookup always resolves through this current SPEC_INDEX
- current QA overrides conflicting inherited QA; old test IDs/examples do not create a second Design Truth

Do not edit historical base files merely to erase superseded text when an explicit current override is sufficient.

## IMPLEMENTATION ENTRY GATE

Design SSOT is promoted to v2.7.

The v2.6.1 Adoption Recovery prerequisite is **CLOSED** by the User's latest approved decision on 2026-09-18.

Current sequence:

```text
v2.6.1 Adoption Recovery close = confirmed
-> v2.7 Source Adoption plan review
-> Director-approved WORK handoff
-> v2.7 Source Adoption implementation
-> scoped Decoration Package adoption
-> ADOPTED
```

There are currently no implementation-blocking Design Unresolved items.

`SOURCE_ADOPTION_STATUS=ADOPTED_BASE_PENDING_PLAYTEST_UI_AUDIO_HOTFIX`: the gameplay /
balance baseline remains **v2.7 + scoped Decoration Package** and stays adopted.

The newest User-approved amendment is limited to:
- mobile SALE playability / hierarchy
- transient customer speech
- tutorial coach copy / mobile targeting
- ORDER / SALE current 점포지원 reference access
- pre-Run Decoration empty-slot interaction
- BGM audibility and semantic SFX coverage

Those items are newer than Current Source and are the only known pending adoption in this hotfix.
This is not a project-wide v2.8 adoption and does not reopen gameplay/balance numerics.
Outside this explicit hotfix, Source remains implementation truth for the adopted line.

The prerequisite recovery execution document remains:
`GUILD24_v2.6.1_ADOPTION_RECOVERY_FINAL_IMPLEMENTATION_PLAN.md`

That document is historical execution evidence for the completed prerequisite, not current v2.7 Design Truth and not a reason to reopen the closed recovery gate.

## CURRENT DESIGN SSOT FILE SET

Current file set = 22 files:

- `SPEC_INDEX_v2.7.0.md`
- `00_GAME_CORE_v2.5.0.md`
- `CORE_RUN_v2.7.0.md`
- `META_v2.7.0.md`
- `ECONOMY_ORDER_v2.7.0.md`
- `NPC_TRAIT_v2.7.0.md`
- `DUNGEON_HAZARD_v2.7.0.md`
- `ITEM_v2.7.0.md`
- `RELIC_v2.7.0.md`
- `SALE_v2.7.0.md`
- `NIGHT_CLOSING_v2.7.0.md`
- `UI_UX_v2.7.0.md`
- `COPY_WORLD_VOICE_v2.7.0.md`
- `EVENT_v2.7.0.md`
- `BOSS_v2.7.0.md`
- `FINAL_EXPEDITION_v2.7.0.md`
- `CORE_RUN_QA_v2.7.0.md`
- `ECONOMY_ORDER_QA_v2.7.0.md`
- `NPC_TRAIT_QA_v2.7.0.md`
- `DUNGEON_ITEM_QA_v2.7.0.md`
- `RELIC_QA_v2.7.0.md`
- `UI_UX_QA_v2.7.0.md`

`DECISIONS_v2.5.0.md` is historical only and is intentionally excluded from the current v2.7 SSOT set because it contains duplicated/superseded values that now belong only to current owner Specs.

## ROUTING

GAME/CORE -> `00_GAME_CORE_v2.5.0.md`
RUN/PHASE/SAVE/FRESH-INIT/TUTORIAL-RESET/FINAL-TIMELINE -> `CORE_RUN_v2.7.0.md`
META/UNLOCK/JOB-MASTERY/FRANCHISE-GRADE/FRANCHISE-ACHIEVEMENT/CROSS-RUN -> `META_v2.7.0.md`
PRICE/GOLD/WALLET/ORDER/REROLL/NEXT-DAY-GATE-FORECAST/FINAL-PRICE -> `ECONOMY_ORDER_v2.7.0.md`
NPC/JOB/TRAIT/GROWTH/REVISIT/RECENT-SNAPSHOT -> `NPC_TRAIT_v2.7.0.md`
DUNGEON/FAMILY/HAZARD/PREPARED-POWER/SUPPLY/FATIGUE/DEATH-RISK/GATE-GENERATION -> `DUNGEON_HAZARD_v2.7.0.md`
ITEM/CATALOG/CATEGORY/COUNTER/POTION/INSURANCE/MODIFIER-COMPOSITION -> `ITEM_v2.7.0.md`
RELIC/STORE-BUILD/FRESH/SLOTH-WINDOW -> `RELIC_v2.7.0.md`
SALE/CUSTOMER/PRICE/REFUSAL/PURCHASE-FLOW/PRE-SUPPLY-OUTLOOK/DELTA-TRUTH/BAG-HANDLING/FINAL-HANDLING -> `SALE_v2.7.0.md`
NIGHT/INJURY/RESULT/CAUSALITY/FATIGUE-RESULT/CLOSING -> `NIGHT_CLOSING_v2.7.0.md`
UI/UX/MOBILE/TUTORIAL/PRE-SUPPLY-OUTLOOK/TYPOGRAPHY/VISUAL/FINAL-PREPARATION-UI -> `UI_UX_v2.7.0.md`
COPY/VOICE/TERMINOLOGY/PRE-SUPPLY-OUTLOOK/TRUTH-CRITICAL-COPY -> `COPY_WORLD_VOICE_v2.7.0.md`
EVENT -> `EVENT_v2.7.0.md`
BOSS/SLOTH/BOSS-FINAL-MODIFIER/GREED-SNAPSHOT/BOSS-CLEAR-SIGNAL -> `BOSS_v2.7.0.md`
FINAL/D25-PREREVEAL/FINAL-PARTY/FINAL-PREPARATION/FINAL-HAZARD/FINAL-POWER -> `FINAL_EXPEDITION_v2.7.0.md`

CORE RUN/SAVE/FRESH-INIT QA -> `CORE_RUN_QA_v2.7.0.md`
ORDER/ECONOMY/FINAL-PRICE QA -> `ECONOMY_ORDER_QA_v2.7.0.md`
NPC/TRAIT QA -> `NPC_TRAIT_QA_v2.7.0.md`
DUNGEON/ITEM QA -> `DUNGEON_ITEM_QA_v2.7.0.md`
RELIC QA -> `RELIC_QA_v2.7.0.md`
UI/UX/TUTORIAL/FINAL-PREPARATION QA -> `UI_UX_QA_v2.7.0.md`

## v2.7 OWNER CHANGE MAP

Changed owners only:

- CORE_RUN: Save v8, no v1~v7 internal-save migration, fresh v8 initialization, start stock, tutorial fresh-reset eligibility, D0~D30 Final timeline, controlled D25 repair boundary, D30 `출전 NPC 선택 -> FINAL 준비 -> 결과` progression; Final preparation uses fixed 50%/매입가 cost, Wallet/stock/Gold/Gross-Sales commitment, no refusal RNG
- META: no v1~v7 internal Account/Meta migration; separate Franchise Grade from Job Mastery; define exactly 10 dedicated Franchise Achievements; 2/4/6/8/10 completion grade steps; 10/10 `전설의 편의점`; numeric achievement thresholds are current `DIRECTOR DOCUMENT BASELINE` values pending full-run QA
- ECONOMY_ORDER: inherit v2.6.1 ordinary Wallet/Order/Reroll economy; add required MORNING next-day Gate-count + Tier forecast contract; Day-band Rarity progression; Final fixed price = ordinary 50%/매입가 amount with real Wallet deduction, Player Gold gain, Gross Sales gain, and no 100/150/refusal
- NPC_TRAIT: Level-up simplification, Fatigue Trait outcome scope, Potionbody, Food-affinity scope, latest expedition snapshot; ordinary Injury keeps existing Stat penalty but recovery now requires Success/Great Success, Retreat does not clear Injury, and injured re-expedition carries +15%p Severe risk plus +10%p failure-conditioned Death risk that is reflected in the pre-supply `실패 시 사망 위험` snapshot
- DUNGEON_HAZARD: prepared-Power weights, Hazard threat, Fatigue/Supply processing, shared result-field naming, next-day Gate-count/Tier forecast generation disclosure contract; ordinary Death risk becomes one failure-conditioned calculation from combat deficit + environment/Hazard deficit + departure Injury, with healthy 30% / injured 40% conditional caps; `성공/대성공` performs no Death roll, failure path performs exactly one Death roll, and SALE discloses exact pre-supply `실패 시 사망 위험`
- ITEM: categories, expanded 40-item active catalog, stronger flat native Core-Stat Item baseline, aligned Counter-specialist/premium pricing, Potion line, Counter values, Insurance hierarchy, retired-ID replacement boundary, Food/Fresh positive-native-Stat modifier composition, plus 10 Epic late-Run-value Items (5 Family hybrid Field Gear + 5 top-end Food/Drink/Potion)
- RELIC: build-value boundary, Fresh rebalance, category migration, current Economy Reroll inheritance, D30 known-Final ordering
- EVENT: Potion category price-pressure migration
- SALE: exactly 2 slots, sequential ordinary Counter Handling, pre-supply Combat/Hazard/`실패 시 사망 위험` outlook snapshot, no post-commit refresh of those derived answers, truthful source-attributed post-commit value/effect changes, removal of non-decision flavor disclosure, revisit quick surface, ordinary same-item refusal price ceiling; Final override uses fixed 50%/매입가, no 100/150, no refusal RNG
- NIGHT_CLOSING: Supply/Fatigue result truth, First Aid Aftercare proof, snapshot write, persistent-Injury continuity across Retreat
- UI_UX: information boundary, conditional arithmetic, D25 presentation, required MORNING next-day Gate-count + Tier forecast, ordinary refusal-price disabled state, pre-supply qualitative Combat/Hazard + exact conditional `실패 시 사망 위험` outlook, frozen derived outlook after Item commit, truthful source-attributed post-commit delta display, Final fixed-price preparation UI, fresh-init tutorial replay requirement, material/typography pass, exact `현재 지점 포기` label
- COPY_WORLD_VOICE: truth-critical copy, stale inherited-copy overrides, v2.7 terminology, exact `보급 전 원정 전망` copy, Event 05 / GLUTTONY / Run-abandon exact copy
- FINAL_EXPEDITION: D25 persisted Final state, D30 `선택 -> FINAL 준비 -> 결과`, fixed 50%/매입가 affordability transfer with real stock/Wallet/Player-Gold/Gross-Sales accounting and no refusal RNG, mean Hazard-gap penalty, Final Insurance no-op, inherited Final-formula override
- BOSS: GLUTTONY terminology plus PRIDE/GREED/GLUTTONY/SLOTH rebalance; WRATH 200 retained; GREED snapshot occurs at Final Lock after Final preparation and includes each committed Final transfer exactly once

Unchanged global core identity stays in `00_GAME_CORE_v2.5.0.md`.

## IMPLEMENTATION-BLOCKING DESIGN UNRESOLVED

```text
NONE
```

The Wallet choice (current values retained), the Store Capital Day-band rates and the four
Decoration prices were all approved and are now `DIRECTOR DOCUMENT BASELINE` values in their
owners. Together with the late Gate Day slope, the Decoration effects and the `board` / `hub`
visitor overrides, the current v2.7 + Decoration-package line carries no open Design numeric.

The Franchise Achievement thresholds are no longer live values of any kind: Franchise Grade,
Franchise Achievement and the Start Contract are retired by the Decoration Package, and their
implementation is preserved only at `archive/inactive/v2_7_franchise/`. The
`BALANCE FINDING -> User/Director approval -> owner update -> separate fix cycle` process still
governs every remaining `DIRECTOR DOCUMENT BASELINE` value.

## PROMOTED-VISION / HISTORY STATUS

`GUILD24_v2.7_VISION_DETAILED_UPDATED_v5.md` is the current v2.7 Director Vision context and explicitly inherits unchanged Vision intent from `GUILD24_v2.7_VISION_DETAILED_UPDATED_v4.md`.
Both Vision documents, `DECISIONS_v2.5.0.md`, and discussion/audit reports are planning/history/context references only after SSOT promotion.
They are not parallel Design SSOT and must not override the owner files routed above.

v2.8+ deferred concepts are not part of this SSOT and must not be implemented during v2.7 adoption unless the User explicitly promotes them.

## SOURCE ACCESS RULE

Required sequence:

```text
1. open this SPEC_INDEX_v2.7.0.md
2. resolve owner + exact current filename
3. open that owner Spec
4. open declared BASE_DOCUMENT only for inherited sections actually needed
5. open related current QA
6. inspect Current Source only after Design Truth is established
```

If an exact routed file cannot be accessed, report:

```text
PROJECT SOURCE ACCESS/INDEX ISSUE
```

Do not substitute an older owner version, chat memory, or Current Source for missing Design Truth.

## QA / BALANCE RULE

Frozen QA detects mismatch; it does not tune balance.

If full-run data violates a v2.7 Director Baseline target:

```text
report BALANCE FINDING
-> separate Director/User tuning decision
-> owner Spec update
-> separate implementation/fix cycle
```

Never modify Source/Test/Harness mid-frozen-QA to make the result green.
