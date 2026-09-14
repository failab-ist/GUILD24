# NPC_TRAIT

DOC=NPC_TRAIT
OWNER=npc,job,trait,growth,roster,living_npc_cap,destination,revisit
DOC_VERSION=2.6.1
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=NPC_TRAIT_v2.6.0.md
PATCH_TYPE=ADOPTION_RECOVERY

## INHERITANCE

All unchanged NPC/Job/Growth rules inherit `NPC_TRAIT_v2.6.0.md`.
This patch removes stale pool/destination wording and fixes condition recovery ownership.

## ACTIVE TRAIT POOL — EXACT

```text
activeTraitCount=37
```

Any stale `poolSize=30` declaration in the base is superseded.

Removed active concepts:
- lucky
- unlucky

`showoff` is not active; the current Trait is `liar`.

## MUTUAL EXCLUSION — EXACT 16

1. brave ↔ coward
2. eater ↔ small
3. careful ↔ reckless
4. frugal ↔ impulse
5. strong ↔ frail
6. collector ↔ thrifty
7. stamina ↔ weary
8. social ↔ shy
9. frail ↔ mender
10. antitoxin ↔ sensitive
11. nimble ↔ clumsy
12. maintain ↔ butterfingers
13. heatproof ↔ pyrophobia
14. sharpeye ↔ nearsight
15. aloof ↔ coldhand
16. honest ↔ liar

No lucky/unlucky exclusion pair exists.

## LIAR — DESTINATION OVERRIDE

`liar / 거짓말쟁이`:
- Open Gate >=2 only
- 50% chance
- initial assigned destination becomes the **claimed / expected destination**
- actual destination is then replaced by a **different Open Gate**
- claimed destination remains unchanged
- no Power threshold / extra condition

Thus the stale description "liar only changes what is reported while actual destination stays" is superseded.

Explicit Event and confirmed Deep Expedition destination rules retain their own precedence.
Confirmed Deep nomination remains final.

## HONEST

internalDirection=MIXED
- successful 100% / 50% paid purchase -> loyalty +1
- 150% purchase intent -10%p

No loyalty is granted on refusal.

## RICH

- actual visit +50G exactly once
- first and revisit
- arrival path only
- Persistent Wallet cap 2000

## INJURY / SEVERE INJURY CONDITION

`injury=1`:
- combat -15% on NPC Base+Equipment unless grit replacement applies
- survival -20% on NPC Base+Equipment

`grit` while injury=1:
- replaces combat -15% with combat +20%
- survival -20% remains
- fatigue result modifier +1 remains

`injury=2`:
- no Stat penalty
- unavailable during recovery as defined by current visit eligibility
- when recovery completes: **injury 2 -> 0 directly**
- injury 2 -> 1 transition is forbidden

## FATIGUE TRAITS

- stamina: result fatigue -1
- weary: result fatigue +1
- grit: result fatigue +1 when applicable by current Trait rule

Death final fatigue gain remains 0 regardless of Trait modifier.
