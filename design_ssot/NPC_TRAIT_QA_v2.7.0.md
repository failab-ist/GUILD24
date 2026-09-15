# NPC_TRAIT_QA

DOC=NPC_TRAIT_QA
OWNER=qa,npc,trait,growth,condition,revisit,recent_expedition
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=NPC_TRAIT_QA_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

Status values are not stored here.

## INHERITED QA OVERRIDES

The v2.6.1 QA patch and current v2.7 rules supersede conflicting expectations in the older `NPC_TRAIT_QA_v2.5.0.md` base.

Explicitly stale:
- inherited `TRAIT-Q15` exact active Trait count 30
  - current active Trait count remains 37 under `NPC_TRAIT_v2.6.1.md`
- inherited Food-affinity/native-recovery assumptions
  - v2.7 uses the exact Food Core-Stat/Supply scope in `NPC_TRAIT_v2.7.0.md`
- inherited Potionbody +30% expectation from the old Trait catalog
  - v2.7 exact Potion positive native Core-Stat factor is ×1.15
- any inherited expectation that a Level milestone grants a Trait, Rank/Title reward, or third ordinary Bag slot

The older base contains two sections both labeled `NPC-Q09`.
For v2.7 audit references, distinguish them by section title (`LONG-TERM VALUE` vs `META JOB UNLOCK POOL`) rather than treating the duplicated numeric label as one test identity.
Do not create a runtime rule from this documentation-ID collision.

All other inherited QA remains only where it does not conflict with a current owner or current patch.

## NPC-Q70 — LEVEL-UP ONLY GROWS CORE STATS

SETUP: level NPCs across Lv5/Lv10/Lv15 milestones.

PASS:
- Level increments normally
- four Core Stats increase from Job Growth × Potential
- no automatic new Trait is granted by Level milestone
- no milestone Rank/Title progression is presented as a gameplay reward
- no hidden Level passive/equipment reward is created

## NPC-Q71 — NO LEVEL-BASED THIRD BAG SLOT

SETUP: compare NPC below/above Lv10.

PASS:
- ordinary SALE Bag capacity remains exactly 2 for both
- no Job/Rarity/Trait Level path silently restores a third normal slot

Capacity owner -> SALE.

## NPC-Q72 — FATIGUE TRAIT OUTCOME SCOPE

Controlled results with stamina/weary/grit where applicable:

EXPECT:
- success / great success: Trait result-fatigue modifier applies
- retreat: applies
- injury: applies
- severe injury: final result-fatigue gain remains 0, modifier does not apply
- death: final result-fatigue gain remains 0, modifier does not apply

PASS: no stale success-only implementation and no Severe/Death +1 leakage.

## NPC-Q73 — POTIONBODY SCOPE

SETUP: use all v2.7 Potion tiers with `potionbody`.

PASS:
- positive Potion native Core-Stat effect ×1.15
- no Hazard Counter amplification
- no Supply amplification
- no Insurance amplification
- no non-Potion Item amplification

## NPC-Q74 — LATEST EXPEDITION SNAPSHOT

After one completed expedition, PASS if snapshot records:
- completed Day
- actual destination
- final Outcome
- exact accepted/purchased Bag Item IDs
- only proven contribution/cause tokens

After the next completed expedition for the same NPC:
PASS: previous snapshot is replaced, not appended into an unlimited timeline.

## NPC-Q75 — NO INVENTED CAUSE / CLAIMED DESTINATION

PASS:
- Item presence alone does not create a cause token
- claimed/expected destination is not serialized as actual destination
- liar/destination behavior remains correctly represented by actual result data

## NPC-Q76 — FOOD AFFINITY TRAIT SCOPE

SETUP: use Food Items with positive Core Stat, Supply, Hazard Counter, and/or RiskReward components on `eater` and `small` NPCs.

EXPECT:
- eater: Food positive native Core Stat +30%; each Food Supply -1, minimum 1
- small: Food positive native Core Stat -20%; each Food Supply +1

PASS:
- Hazard Counter unchanged
- Insurance unchanged
- RiskReward penalty magnitude unchanged
- no inherited native-recovery multiplier remains active
