# SALE

DOC=SALE
OWNER=sale,customer,price,refusal,purchase_flow,sale_decision_ux
DOC_VERSION=2.6.1
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=SALE_v2.5.0.md
PATCH_TYPE=ADOPTION_RECOVERY

## INHERITANCE

All SALE behavior not explicitly changed below inherits `SALE_v2.5.0.md`, including:
- one-customer-at-a-time flow
- 50 / 100 / 150 price modes
- base consumer slots 2, Lv10+ 3
- all-sellable inventory visibility
- refusal logic contract
- no-sale choice
- purchase atomicity
- Deep Expedition nomination amendment
- cumulative gross sales signal

This v2.6.1 file overrides conflicting stale destination, information, and presentation wording in the base.

## v2.6.1 CORE DECISION CONTRACT

Core question remains:
`이 손님에게 무엇을, 얼마에 팔까?`

Before the Player chooses a price, the same decision surface must make readable:
- NPC identity / Job / Level
- 4 core Stats
- active Traits / conditions
- **NPC current Persistent Wallet**
- current purchased Bag / remaining consumer slots
- Expected Destination
- current Gate / Hazard core environment information
- qualitative expedition Forecast
- available sellable stock
- 50 / 100 / 150 sale price
- whether the NPC can afford that price

NPC Wallet is not optional secondary detail.
The Player must be able to judge affordability before committing a price.

## DESTINATION — v2.6.1 OVERRIDE

Player-facing label remains:
`예상 목적지`

Default:
- claimed destination = actual assigned destination

`liar / 거짓말쟁이`:
- applies only when Open Gate >= 2
- 50% chance
- **actual destination changes to a different currently Open Gate**
- claimed / expected destination remains the original destination
- no additional Power condition

Therefore the stale v2.5 description "reported destination changes while actual assignment stays" is superseded.

Explicit Event destination changes and confirmed Deep Expedition destination replacement continue to follow their owning rules.
Confirmed Deep nomination remains final and cannot be overwritten afterward.

## SALE LAYOUT — DESKTOP

Authoritative v2.6.1 composition:
- Character / Portrait on the left
- use the upper-right area as the Core Decision area
- Bag is materially larger in visual and touch size
- Bag enlargement does **not** change consumer-slot capacity
- Forecast + Expected Destination occupy the upper-right Core Decision area
- duplicate lower destination / forecast panels are removed
- NPC Wallet remains visible inside the Core Decision hierarchy

Do not restore the older layout where forecast/destination are repeated lower on the page.

## SALE LAYOUT — MOBILE

- vertical mobile composition
- Character / status top footprint reduced without cropping artwork
- Bag absolute visual/touch size enlarged
- Bag may not overflow or overlap status/card boundaries
- Expected Destination compact and immediately readable
- Forecast follows the relevant recent-expedition/current-decision information
- core environment information visible without tap
- remove duplicated environment / forecast blocks
- no tiny compressed multi-column layout

Core environment example form:
`북부 설원 폐허 I · 냉기 · 강인함 압박`

Tap/tooltip may add detail; it may not hide the core risk needed for the sale decision.

## ENVIRONMENT / FORECAST INFORMATION HIERARCHY

Do not repeat the same decision signal as multiple equal-priority labels.

Hazard name, pressured Stat/readiness, and qualitative preparedness belong to one readable hierarchy.
Long explanatory prose is secondary Help/Tooltip content, not always-on Core Decision copy.

No exact Success %, Death %, hidden Power, or master safety score.

## STAT SOURCE UX

When an actual source changes a core Stat:
- changed number uses the approved highlight treatment
- actual applied beneficial source name may be shown in green
- actual applied detrimental source name may be shown in red
- do not show inactive sources
- do not add always-on numeric percent/delta ledgers

Examples:
- grit injured combat: `악바리` source only for combat
- injury survival: `부상` source
- fatigue mobility/spirit: `피로` source

Excluded from Stat Source labels:
- Wallet
- purchase intent
- revisit weighting

Stat touch/click detail may show:
- actual source
- actual applied value
- calculation breakdown

## NPC DETAIL — CONDITION TRUTH

NPC detail must expose when relevant:
- actual injury effect
- current fatigue
- current fatigue tier and active penalty
- Severe Injury remaining rest days
- fatigue recovery method

`injury=2` itself has no Stat penalty.

## SALE RUNTIME CONTINUITY

Within the same Customer, the current scroll position and practical focus must be preserved across:
- item selection
- price panel open/close
- purchase success
- refusal and reselection
- accordion/detail open/close

Re-rendering may not throw the Player to the top of the Sale page.

Only advancing to a new Customer may intentionally return the Sale decision surface to its start position.

## PORTRAIT PRELOAD

- current Customer portrait renders normally
- preload only the next Customer portrait
- simple browser preload is sufficient
- do not add a cache framework

Acceptance is based on real mobile transition behavior, not existence of preload code.

## v2.7 EXCLUSION

Not part of v2.6.1:
- fixed 2-slot Bag for every NPC
- Counter Handling action layer
- Item Role large rebalance
- past-Bag / attachment expansion

The inherited v2.5 consumer slot rule remains active in v2.6.1:
- base 2
- Lv10+ 3

## QA OWNERSHIP

Acceptance ->
- `ECONOMY_ORDER_QA_v2.6.1.md`
- `NPC_TRAIT_QA_v2.6.1.md`
- `UI_UX_QA_v2.6.1.md`
- `CORE_RUN_QA_v2.6.1.md`
