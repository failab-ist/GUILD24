# CORE_RUN

DOC=CORE_RUN
OWNER=run,phase,save,day_flow,abandon,final_timeline,fresh_init,tutorial_reset
DOC_VERSION=2.7.0
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=CORE_RUN_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged Run/phase/abandon mechanics inherit `CORE_RUN_v2.6.1.md`.
This patch owns v2.7 Run-start inventory, Save generation, legacy-save rejection, fresh-init tutorial reset boundary, and D0~D30 Final timeline changes.

The v2.7 Player-facing Run-abandon label remains:

```text
현재 지점 포기
```

The abandon function/semantics remain unchanged.

## SAVE v8 — EXACT

v2.7 uses a new incompatible internal-test schema.

```text
KEY = guild24.save.v8
Envelope version = 8
Export version = 8
Validation version = 8
run.version = 8
LEGACY = v1~v7
```

Current release-policy context:

```text
v2.x = internal development / test line
v3.0.0 = current external-public-release target
```

Rules:
- New Run initializes `run.version=8`.
- v1~v7 **Run state** cannot continue as a v2.7 Run.
- v1~v7 **Account/Meta state** is not migrated into v8.
- Do not add compatibility conversion merely to preserve internal-test progression.
- When only legacy v1~v7 data exists, initialize a fresh current v8 Account/Meta + fresh current v8 Run rather than importing legacy progression.
- legacy bytes are not required to be destructively deleted merely to reject migration; storage cleanup remains under the existing reset/storage policy.
- Full Data Reset remains the explicit game-owned current-data deletion action.

Reason:
v2.7 changes active Item IDs, normal Bag capacity, Level milestone behavior, Final prereveal state, persistent recent-expedition data, and Franchise Grade derivation. Before the v3.0.0 external-release target, preserving internal-test compatibility is not worth adding migration complexity or semantic ambiguity.

## FRESH INITIALIZATION / TUTORIAL RESET — EXACT

A true fresh initialization must be tutorial-eligible.

`Fresh initialization` includes:
- no valid current v8 Account/Run exists and a new v8 state is created
- Full Data Reset is completed and the game creates a new current state
- only legacy v1~v7 internal-test state exists and current policy rejects migration, causing fresh v8 initialization

Exact tutorial boundary:

```text
fresh current Account/Run
-> tutorial completion / dismissal state = not completed
-> tutorial entry must be eligible on the first applicable new-game flow
```

Rules:
- Full Data Reset must clear any game-owned tutorial-complete / tutorial-dismissed flag that would suppress the fresh tutorial
- stale legacy tutorial flags must not suppress tutorial on a fresh v8 initialization
- Run Abandon / ordinary new Run does **not** by itself reset tutorial completion while the same current Account/Meta remains
- do not create a second tutorial system; reuse the existing tutorial implementation if it exists
- implementation adoption must audit the current tutorial trigger/persistence path because current internal testing has observed fresh/reset states where the tutorial did not appear
- if the existing tutorial is present but its reset/trigger path is broken, fix that path rather than replacing the tutorial wholesale

Exact tutorial content/presentation -> `UI_UX_v2.7.0.md`.

## START STOCK — v2.7

Keep the ordinary start quantity count, but replace the retired Bandage slot.

```text
삼각김밥 ×1
생수 ×1
진정 허브티 ×1
하급 포션 ×1
```

`bandage` is retired and is not an active v2.7 Item ID.
No legacy Bandage stock is silently converted into 진정 허브티.

Item identity/prices/effects -> `ITEM_v2.7.0.md`.

## FINAL TIMELINE — EXACT

Reuse existing Morning/management/SALE/Final surfaces; do not add a new permanent Final dashboard or a separate combat-game Phase.

```text
D0  : inform Player that D30 Final is the Run objective
D5  : Boss information flow owned by BOSS
D10 : FINAL까지 20일 signal
D15 : additional Boss information flow owned by BOSS
D20 : FINAL까지 10일 signal + Recon dispatch beat
D25 : FINAL까지 5일 signal + exact Final Family Pair / Hazard Pool generated, revealed, persisted
D30 : reuse the persisted D25 Final state exactly; resolve Final as 출전 NPC 선택 -> FINAL 준비 -> 결과
```

D20 Recon creates no separate combat/minigame/resource system.
Its gameplay payoff is the D25 exact Final Family/Hazard disclosure owned by `FINAL_EXPEDITION_v2.7.0.md`.

D25 does not grant:
- guaranteed Counter stock
- free Final Item
- special D25 shop
- forced correct preparation

The remaining D25~D29 Order / Stock / NPC growth / preservation decisions are the preparation window.

## D30 FINAL FLOW — EXACT

After the already-known D25 Final state and the D30 Relic/SLOTH decision are resolved:

```text
Final participant selection
-> Final preparation
-> Final Lock
-> one Final result
```

Rules:
- participant selection is confirmed before Final preparation begins
- Final preparation reuses the familiar two-slot Item handling layer; it is not a new top-level day-loop Phase and not a separate combat minigame
- Final preparation uses the current Final-owner fixed 50% / 매입가 amount, real NPC Wallet affordability, real stock consumption, and no refusal RNG
- 100% / 150% price choices are not used in Final preparation
- each committed Final transfer increases Player Gold by the exact fixed transfer amount
- each committed Final transfer increases ordinary Gross Sales by the exact fixed transfer amount exactly once
- GREED therefore reads those committed Final transfer amounts in its Final-Lock Gross Sales snapshot
- selected participants are processed according to `FINAL_EXPEDITION_v2.7.0.md` / `SALE_v2.7.0.md`
- after committed Final Item transfers begin, Save/Load must not reopen participant selection or erase committed transfer state for fishing
- after all selected participants finish Final preparation, Final Lock snapshots the authoritative Final state and one result resolves
- no second free-equip/preparation step exists after Final preparation

## D25 STATE SAFETY

For every normally created valid v8 Run:
- D25 Final generated state is persisted when created.
- Save/Load cannot reroll it.
- D30 reads that exact persisted state.

### Development / controlled-migration repair boundary

If a development fixture, development Save, or explicitly controlled migration/debug state is already represented as a v8 Run at D25+ but lacks the required Final prereveal state:

```text
first valid entry
-> generate the authoritative Final Family Pair / Hazard Pool exactly once
-> persist immediately
-> all later loads reuse that persisted state
```

Rules:
- use the same authoritative seeded/fixed Final-selection principle as ordinary D25 generation
- this is a one-time repair, never a reroll/fishing path
- normal valid v8 Player Saves must already contain the D25 state
- this boundary does not authorize v1~v7 Player Run continuation into v8
- malformed ordinary Player state must not repeatedly regenerate the Final state on entry/reload

## RELATED

NPC growth/level -> `NPC_TRAIT_v2.7.0.md`
Item/start-stock identity -> `ITEM_v2.7.0.md`
D25/D30 Final flow -> `FINAL_EXPEDITION_v2.7.0.md`
Final Item handling -> `SALE_v2.7.0.md`
Final fixed price/Wallet/Gold -> `ECONOMY_ORDER_v2.7.0.md`
Boss reveal/GREED -> `BOSS_v2.7.0.md`
Account/Meta -> `META_v2.7.0.md`
Tutorial presentation -> `UI_UX_v2.7.0.md`
Presentation -> `UI_UX_v2.7.0.md`
Player-facing abandon wording -> `COPY_WORLD_VOICE_v2.7.0.md`
