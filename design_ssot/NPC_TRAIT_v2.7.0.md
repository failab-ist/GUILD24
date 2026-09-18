# NPC_TRAIT

DOC=NPC_TRAIT
OWNER=npc,job,trait,growth,roster,living_npc_cap,destination,revisit,recent_expedition
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=NPC_TRAIT_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All NPC/Job/Trait/Roster rules not changed below inherit `NPC_TRAIT_v2.6.1.md` and its declared base.

## LEVEL-UP REWARD — EXACT

From v2.7, Level Up grants only visible Job Growth through the four Core Stats.

```text
Level Up
-> Job Growth × Potential
-> 투력 / 강인함 / 기동 / 정신 increase
```

Remove Level milestone rewards:
- no Lv10+ third normal Bag slot
- no automatic Trait acquisition at 5-Level milestones
- no Level-milestone Rank/Title progression
- no hidden Level passive
- no Level-only Equipment grant
- no separate Level combat multiplier

Equipment growth from expedition loot/results is not a Level-up reward and remains owned by its existing system.

Player-facing growth identity is:
```text
Job + Level + actual four Core Stats
```

Existing `rank/ranks` data is not v2.7 Design Truth. If Source has an unexpected active dependency, classify/report it rather than preserving milestone gameplay silently.

## NORMAL BAG CAPACITY BOUNDARY

NPC Level / Job / Rarity / Trait may not increase ordinary SALE consumer-slot capacity.

Normal Bag capacity is owned by `SALE_v2.7.0.md` and is exactly 2.

## ORDINARY INJURY — v2.7 PERSISTENCE / RE-EXPEDITION RISK

The inherited ordinary Injury Stat penalty remains unchanged:

```text
injury=1
투력 -15% on NPC Base+Equipment unless grit replacement applies
강인함 -20% on NPC Base+Equipment
```

Do **not** raise these Stat penalties merely because Injury now persists more meaningfully.
The increased cost of Injury in v2.7 comes from persistence and re-expedition risk, not a second simultaneous Stat-penalty buff.

### Natural recovery

Ordinary Injury no longer disappears merely because the NPC completed another expedition without receiving a fresh Injury result.

Exact natural recovery:

```text
injury=1 + next actual Outcome 성공
-> injury=0

injury=1 + next actual Outcome 대성공
-> injury=0

injury=1 + next actual Outcome 퇴각
-> injury=1 유지

injury=1 + next actual Outcome 부상
-> injury=1 유지
```

`중상` and `사망` follow their own existing state transitions.

This makes `부상` a persistent risk decision:
`다시 보낼 수는 있지만, 안전하게 돌아와야 회복된다.`

Item Aftercare may still remove/lower persistent Injury exactly as owned by `ITEM_v2.7.0.md`; this is separate from natural recovery.

### Injured re-expedition escalation

When an NPC departs while already `injury=1`:
- ordinary Injury Stat penalties above apply
- the expedition's Severe Injury escalation receives an additional **+15%p** baseline
- the expedition-level Death chance receives an additional **+10%p** baseline
- the +10%p Death modifier is part of the single ordinary-expedition Death-risk calculation; it is not a second Death roll
- the pre-supply Death Risk % shown at SALE entry includes this +10%p when the NPC begins the expedition injured
- after Item transactions, the displayed pre-supply percentage remains frozen even though the actual expedition Death chance is recalculated internally from final preparation
- these are outcome-risk modifiers, not hidden changes to the four Core Stats
- they apply only while the NPC begins the expedition already injured

Exact ordinary Death formula/caps -> `DUNGEON_HAZARD_v2.7.0.md`.

The intent is not to make an injured NPC unusable.
It is to make repeat deployment a deliberate risk rather than a nearly free one-Day condition clear.

## SEVERE INJURY — UNCHANGED RECOVERY IDENTITY

`injury=2` remains unavailable during its recovery period under the inherited rule.
When that recovery completes:
```text
injury 2 -> 0 directly
```

Do not convert natural Severe recovery into `injury 2 -> 1`.

## FATIGUE TRAITS — RESULT SCOPE

The existing result-fatigue modifiers remain:
- `stamina / 지구력`: -1
- `weary / 쉽게 지침`: +1
- `grit / 악바리`: +1 when its current Trait rule applies

They apply to:
```text
성공
대성공
퇴각
부상
```

They do not apply to:
```text
중상
사망
```

For Severe Injury / Death, final expedition-result Fatigue gain remains exactly 0 regardless of those Trait modifiers.

Base outcome Fatigue and Supply buffering -> `DUNGEON_HAZARD_v2.7.0.md`.

## FOOD AFFINITY TRAIT SCOPE — v2.7

The inherited `native Stat/recovery` wording for `eater / 대식가` and `small / 소식가` is superseded.

`eater / 대식가`:
```text
Food positive native Core-Stat contribution +30%
each Food Item Supply -1, minimum 1
```

`small / 소식가`:
```text
Food positive native Core-Stat contribution -20%
each Food Item Supply +1
```

Scope for both:
- applies only to the Food Item's own positive Core-Stat contribution and stated Supply adjustment
- does not amplify/reduce Hazard Counter
- does not amplify/reduce Insurance
- does not amplify/reduce RiskReward penalty magnitude
- does not create or modify a separate native-recovery subsystem
- when Fresh Relics also modify the same Food positive native Core Stat, the Trait percentage joins the same base-additive modifier pool; do not multiply Trait and Relic layers sequentially

Cross-system native-Stat composition -> `ITEM_v2.7.0.md`.
Food/Drink Item truth -> `ITEM_v2.7.0.md`.

## POTIONBODY — v2.7

`potionbody / 포션체질`:

```text
Potion positive native Core-Stat effect ×1.15
```

Scope:
- applies to Potion positive Core-Stat contribution only
- does not amplify Hazard Counter
- does not amplify Supply
- does not amplify Insurance
- does not amplify unrelated attached effects

Potion catalog/effects -> `ITEM_v2.7.0.md`.

## RECENT EXPEDITION SNAPSHOT

Each persistent NPC keeps exactly one latest completed-expedition snapshot for revisit memory.

Snapshot fields:
- completed Day
- actual destination
- resolved Outcome
- exact Item IDs actually accepted/purchased in the completed Bag
- only resolved Item/Trait/Event contribution/cause tokens proven by the result report

Rules:
- overwrite with the next completed expedition for that NPC
- Item presence alone is not a cause token
- claimed/expected destination is not substituted for actual destination
- no unlimited timeline is added by this rule
- Product XP / Favorite Meter / Familiarity Bonus are not created

Presentation -> `SALE_v2.7.0.md` / `UI_UX_v2.7.0.md`
Result proof -> `NIGHT_CLOSING_v2.7.0.md`

## RELATED

Bag/transaction -> `SALE_v2.7.0.md`
Fatigue/Supply/Death risk -> `DUNGEON_HAZARD_v2.7.0.md`
Item/Potion/Food/Aftercare -> `ITEM_v2.7.0.md`
Night causality -> `NIGHT_CLOSING_v2.7.0.md`