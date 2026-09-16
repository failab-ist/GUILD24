# BOSS

DOC=BOSS
OWNER=boss,boss_identity,boss_trait,boss_reveal,sloth_seal,boss_meta_clear
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=BOSS_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

Boss pool/identity, seeded one-Boss-per-Run generation, save stability, D5 Identity reveal, D15 exact Trait reveal, ENVY targeting, LUST regular protection, meta-clear signal, and all unchanged Boss rules inherit `BOSS_v2.5.0.md`.

This patch changes Final-information timing and the PRIDE/GREED/GLUTTONY/SLOTH v2.7 balance rules, and preserves the already-approved player-facing `탐식` terminology.

Inherited base QA applies only where it does not conflict with this patch.
In particular:
- inherited `BOSS-Q03` D30-first Family disclosure is superseded by D25 disclosure / D30 reuse
- inherited `BOSS-Q09` Rare+ / raw-Stat GLUTTONY expectation is superseded by the v2.7 all-Item-positive-Core-Stat ×0.50 scope
- inherited numeric examples for PRIDE / GREED / SLOTH are superseded by the v2.7 values below
- inherited `BOSS-Q14` PASS3 tuning permission is superseded: v2.7 `DIRECTOR DOCUMENT BASELINE` values are fixed implementation starting values during adoption; frozen QA may report a `BALANCE FINDING` but may not auto-tune them. Any numeric change requires a separate approved owner-spec update.

## BOSS IDENTITY TERMINOLOGY OVERRIDE

Internal Boss ID remains:

```text
GLUTTONY
```

Player-facing identity is:

```text
Sin = 탐식
Name = 탐식의 마왕 글러트니
```

The inherited v2.5 player-facing `폭식 / 폭식의 마왕 글러트니` wording is superseded and is not v2.7 Design Truth.
This terminology override does not change the GLUTTONY mechanic.

The inherited D15 Rare+-based GLUTTONY player prose is also stale.
Exact v2.7 Trait title/prose is owned by `COPY_WORLD_VOICE_v2.7.0.md`.

## WRATH — BASELINE RETAINED

Keep the existing baseline:

```text
WRATH effective Boss Power = 200
```

WRATH adds no special modifier.

Balance intent:
- do not lower WRATH merely so an average first Run clears
- first clear must still be possible at Job Mastery 0 through strong Run growth/preparation/build/player mastery
- no new permanent power is granted merely for failing Runs

Meta progression remains owned by `META_v2.7.0.md`.

## FINAL FAMILY REVEAL TIMING — v2.7 OVERRIDE

The v2.5 D30 Family-generation/reveal wording is superseded.

v2.7:
- exact Final Family Pair + Hazard Pool is generated/revealed/persisted on D25 by `FINAL_EXPEDITION_v2.7.0.md`
- D30 reuses that exact persisted state
- no D30 Family reroll

Boss reveal remains:
- D5 Boss Identity
- D15 exact Boss Trait

SLOTH D30 Seal opportunity remains part of the D30 Relic window.

## PRIDE — v2.7

`DIRECTOR DOCUMENT BASELINE`

```text
prideCombatFactor = 0.92
```

This supersedes 0.90.

Scope otherwise inherits the existing PRIDE rule:
- Final-only participant Snapshot
- 투력 only
- visible original -> applied
- persistent NPC Stat unchanged

## GREED — v2.7

Keep the existing Gross-Sales metric and revenue target unless separately rebalanced by approved economy evidence.

Change only the maximum Boss-strengthening cap:

`DIRECTOR DOCUMENT BASELINE`

```text
shortfallCap = 12 Boss Power
```

Thus with WRATH base 200:
- target met -> effective Boss Power 200
- maximum shortfall penalty -> effective Boss Power 212

Displayed strengthening must still derive from the actual applied Greed bonus.

### GREED snapshot timing under v2.7 Final SALE

D30 Final now resolves through:

```text
출전 NPC 선택 -> FINAL 판매 -> Final Lock -> 결과
```

The existing Gross-Sales metric remains authoritative.
Successful Final SALE transactions are ordinary real sales and therefore contribute to the same gross-sales total exactly once.

The committed GREED gross-sales snapshot is taken at **Final Lock after Final SALE has completed**.
Do not snapshot before the selected Final participants have finished their sale interactions.
Do not exclude or double-count D30 Final sales.

## GLUTTONY — v2.7 EFFECT SCOPE

The prior `Rare+ Item raw Stat ×0.80` rule is superseded.

`DIRECTOR DOCUMENT BASELINE`

For every Final participant:

```text
all positive Core-Stat contribution originating from Items ×0.50
```

Affected:
- positive Item contribution to 투력 / 강인함 / 기동 / 정신
- after Item-side Food/Drink/Potion Trait/Relic amplification has produced the final positive Item Stat contribution

Unaffected:
- NPC natural/base/growth/equipment Stats
- Hazard Counter
- Supply
- Insurance
- Utility
- Loot/economy effects
- explicit RiskReward harmful penalty

No Rarity threshold remains.
No extra Item is consumed.

Player-facing Final preview must show the actual changed Item Stat contribution without exposing internal Final success probability.

## ENVY / LUST

No v2.7 numeric change.
Use the inherited current owner values/rules rather than duplicating a second table here.

## SLOTH — OPPORTUNITY SCHEDULE

Schedule remains inherited:

```text
exactly 2 distinct opportunities from D15/D20/D25
+ D30 always
= 3 total opportunities
```

Each opportunity remains mutually exclusive:

```text
normal Relic acquisition
OR
break one Sloth Seal for 0G
```

Relic-window lifecycle -> `RELIC_v2.7.0.md`.

## SLOTH — v2.7 BOSS POWER

`DIRECTOR DOCUMENT BASELINE`

Effective Boss Power by committed `sealBreakCount`:

```text
0 breaks = 225
1 break  = 210
2 breaks = 190
3 breaks = 165
```

Design intent:
- 0 Break: keep the full Relic build, face a Boss clearly harder than WRATH
- 1 Break: meaningful relief, still above WRATH
- 2 Break: after sacrificing a mid-Run build opportunity, Boss becomes below WRATH
- 3 Break: sacrifice both selected mid-Run Relic opportunities plus D30 Relic opportunity for very high Final stability

Gold saved by not buying a Relic is only a partial offset.
It does not erase the opportunity cost of a Relic's remaining-Run economy/access/growth/build synergy.

Simulation target for sacrificed potential value:

```text
D30 Relic opportunity        ≈ Party-equivalent 3~6
D15~D25 Relic opportunity    ≈ Party-equivalent 6~10 each
3-break total potential cost ≈ 15~26
```

These are measurement targets, not hidden runtime conversion formulas.
Do not literally subtract Party Power from the Player when a Seal is broken.

Acceptance direction:
- 3 Break must create a materially larger Final-stability return than 2 Break
- 3 Break is allowed to make a sufficiently mature/well-prepared party near-certain
- weak Run + 3 Break is not guaranteed clear by rule

## FINAL MODIFIER ORDER

Use the inherited Boss/Final modifier order, with v2.7 Item/Fresh/Final values from their owners.

GLUTTONY's Item-stat reduction occurs after Item-side positive Stat amplification and before Individual Final Power is computed.

Final formula -> `FINAL_EXPEDITION_v2.7.0.md`.

## v2.7 ACCEPTANCE OVERRIDES

The inherited Boss acceptance suite remains valid except where replaced here.

### BOSS-Q70 — FINAL INFO TIMING
PASS:
- D5 Boss Identity reveal remains
- D15 exact Trait reveal remains
- exact Final Family/Hazard state is revealed on D25
- D30 does not regenerate or newly reveal a different Family/Hazard state
- D30 Relic/SLOTH choice reads the already-known persisted state

### BOSS-Q71 — PRIDE NUMERIC
PASS:
- Final-only 투력 factor is exactly 0.92
- other three Core Stats remain unchanged by PRIDE
- preview and Final resolution use the same applied value

### BOSS-Q72 — GREED CAP
PASS:
- existing revenue metric/target path is reused
- applied shortfall strengthening caps at +12 Boss Power
- target met returns to 200 baseline
- maximum shortfall cannot exceed 212 through GREED alone
- D30 Final sales are included exactly once in the gross-sales snapshot
- snapshot occurs at Final Lock after Final SALE completes

### BOSS-Q73 — GLUTTONY SCOPE
PASS:
- every positive Core-Stat contribution originating from Items is multiplied by 0.50
- no Rarity threshold remains
- NPC natural/base/growth/equipment Stats are unchanged
- Hazard Counter / Supply / Insurance / Utility / harmful RiskReward penalty are unchanged
- previewed changed Item Stat matches actual Final resolution

### BOSS-Q74 — SLOTH POWER BY BREAK COUNT
PASS exact:
```text
0 = 225
1 = 210
2 = 190
3 = 165
```

Also PASS:
- exactly 3 opportunity windows remain
- each window is Relic OR Seal, never both
- 3 Break produces a materially larger stability return than 2 Break in balance measurement

## v2.7 BALANCE QA

Measure separately:
- Mastery-0 early/first-clear attempts
- partially progressed Meta runs
- mature runs
- Boss clear rate by Boss
- Final Party Raw Power distribution
- SLOTH break count 0/1/2/3
- Relic IDs/pieces sacrificed by SLOTH
- Gold saved/spent after Seal choices
- Final Item quality

Do not auto-tune Boss values during frozen QA.
Report `BALANCE FINDING` and run a separate approved tuning cycle.

## RELATED

Final state/formula/Final SALE -> `FINAL_EXPEDITION_v2.7.0.md`
Relic/Seal window -> `RELIC_v2.7.0.md`
Meta -> `META_v2.7.0.md`
Item/GLUTTONY contribution -> `ITEM_v2.7.0.md`
UI reveal -> `UI_UX_v2.7.0.md`
Copy/terminology -> `COPY_WORLD_VOICE_v2.7.0.md`
