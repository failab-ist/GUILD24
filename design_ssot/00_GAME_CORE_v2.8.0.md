# 00_GAME_CORE

DOC=00_GAME_CORE
OWNER=game_core,core_fantasy,core_loop,system_ownership,cross_run_identity
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=00_GAME_CORE_v2.5.0.md
PATCH_TYPE=PROJECT_WIDE_CORE_READABILITY

## INHERITANCE

All unchanged core fantasy, phase loop, information principle, NPC emotional core and Run identity
inherit 00_GAME_CORE_v2.5.0.md.

## v2.8 CORE PURPOSE

v2.8 strengthens the existing core loop rather than broadening feature count:

    observe
    -> infer
    -> choose
    -> see the actual change
    -> see the resolved result
    -> remember it for the next decision

Primary principle remains:
    information should be easy to read; the decision should remain difficult.

Therefore v2.8:
- removes stale/internal information
- makes current-state changes attributable
- strengthens choice -> actual result feedback
- makes existing Fatigue / Loyalty / Store Build axes visible when they matter
- does not expose hidden final success probability
- does not add a strategy grader that chooses the Item for the Player

P2+ structural expansion remains v2.9+.

## INFORMATION PRINCIPLE — v2.8 OVERRIDE

The inherited information principle is updated only at the Death-risk boundary.

Keep hidden:
- exact expedition success probability
- unconditional whole-expedition Death probability
- internal coefficients / thresholds unless a current owner explicitly exposes them

Current SALE may expose the exact **failure-conditioned Death risk** owned by
DUNGEON_HAZARD_v2.8.0.md. This is the chance of Death after the expedition has entered its failure
path; it is not the unconditional whole-expedition Death probability.

All other unchanged information-principle rules inherit the base document.

## CROSS-RUN CORE

Cross-run progression has two active growth identities.

### STORE GROWTH

    actual Gross Sales x survival depth
    -> Store Capital
    -> permanent Decoration ownership
    -> pre-Run Decoration loadout
    -> changed store-operation options next Run

Store Growth remains operation/access/economy progression, not account-wide raw combat power.

### JOB MASTERY

    Boss CLEAR with Job
    -> Job Mastery
    -> that Job's existing future spawn-growth channel

## RUN / META BUILD SEPARATION

Run-scoped 점포지원 = Store Build created inside the current Run.
Decoration = permanent cross-run collection selected before the Run.

Do not merge the two systems.

## INACTIVE LEGACY BOUNDARY

No Franchise Grade / Franchise Achievement / Grade ORDER discount / Start Contract rule is active
in the current game. Archive ownership is routed to META_v2.8.0.md.

## FIRST-CLEAR BOUNDARY

Fresh Store / zero Decoration remains capable of Final access and first Boss clear through strong
play and valid RNG.

## RELATED

Store Capital / Decoration / Job Mastery -> META_v2.8.0.md
Run / save / timeline -> CORE_RUN_v2.8.0.md
Core decision UI -> UI_UX_v2.8.0.md
