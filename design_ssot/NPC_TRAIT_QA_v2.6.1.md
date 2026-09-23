# NPC_TRAIT_QA

DOC=NPC_TRAIT_QA
OWNER=qa,npc,trait,wallet,destination,condition
DOC_VERSION=2.6.1
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=NPC_TRAIT_QA_v2.5.0.md
PATCH_TYPE=ADOPTION_RECOVERY

Status values are not stored here.

## NPC-Q61 — ACTIVE TRAIT COUNT

PASS: exact active Trait count = 37.
No lucky/unlucky active entry.
No showoff active entry.

## NPC-Q62 — EXCLUSION COUNT

PASS: exact mutual exclusion pair count = 16 and includes honest ↔ liar.
No lucky ↔ unlucky pair.

## NPC-Q63 — LIAR

SETUP: Open Gate >=2; controlled branch where liar triggers.
EXPECT:
- claimed destination = original Gate
- actual destination = a different Open Gate
- no extra Power gate

PASS: actual and claimed differ in this direction only.

## NPC-Q64 — HONEST

EXPECT:
- successful 50%/100% purchase adds loyalty +1
- refusal adds +0
- 150% purchase intent receives -10%p

## NPC-Q65 — RICH

PASS:
- +50 only on actual arrival
- exactly once per visit
- cap 2000

## NPC-Q66 — MAJOR INJURY RECOVERY

SETUP: NPC injury=2, recovery reaches completion.
PASS:
- injury becomes 0 directly
- status becomes healthy
- no intermediate injury=1 state

## NPC-Q67 — INJURY STAT SOURCE

PASS:
- injury=1 applies combat -15 / survival -20 to NPC Base+Equipment only
- grit replaces combat penalty with +20%
- sold Item stats are not multiplied by injury/grit percentages
- injury=2 itself has no Stat penalty
