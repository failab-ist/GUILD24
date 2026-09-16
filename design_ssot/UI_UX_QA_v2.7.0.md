# UI_UX_QA

DOC=UI_UX_QA
OWNER=qa,ui,ux,mobile,sale_handling,tutorial,typography,visual_material
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=DESIGN_QA_SPEC
BASE_DOCUMENT=UI_UX_QA_v2.6.1.md
PATCH_TYPE=CORE_PLAY_REVISION

Status values are not stored here. FAIL is valid evidence.

## INHERITED QA OVERRIDES

The following inherited `UI_UX_QA_v2.5.0.md` / `UI_UX_QA_v2.6.1.md` expectations are stale and are explicitly superseded:

- inherited `UI-Q40` / `UI-Q43` D30-first Final Family reveal
  - v2.7 exact Family/Hazard disclosure occurs on D25
  - D30 reuses the already-known persisted state and must not present it as newly generated/revealed
- inherited `UI-Q43` GLUTTONY preview wording based on Rare+ / old raw-Stat scope
  - v2.7 follows `BOSS_v2.7.0.md`: all positive Core-Stat contribution originating from Items is reduced to 50%; no Rarity threshold
  - Counter / Supply / Insurance / Utility / harmful RiskReward penalty remain outside that reduction
- inherited `폭식` player-facing identity/copy is stale
  - identity follows `BOSS_v2.7.0.md`: `탐식의 마왕 글러트니`
- older v2.5 Copy candidates using `현재 런 포기` wording are superseded
  - v2.7 exact top-level label remains `현재 지점 포기`

All other inherited QA remains only where it does not conflict with a current v2.7 owner or QA rule.

v2.7-added UI QA IDs begin at `UI-Q80` so they do not collide with inherited v2.6.1 `UI-Q61~Q74` IDs.

## UI-Q80 — MORNING REQUIRED SUPPLY

PASS:
- Morning keeps current compact Gate/Hazard structure
- required Supply is shown as exact `필요 보급 N`
- no added recommendation paragraph / easy-medium-hard Supply label

## UI-Q81 — ORDER ITEM HIERARCHY

Inspect desktop/mobile offers.

PASS:
- Item identity and exact effect read before economy metadata
- exact Stat/Counter/Supply/penalty values are readable
- no redundant role chip such as `속박 전문` above `속박 대응 +16`
- no today-fit/recommended badge
- no automatic best-fit ranking

## UI-Q82 — ORDER WAREHOUSE COLLAPSE

Mobile:
- capacity summary remains always visible
- individual stock list can collapse/expand
- used/remaining capacity is not hidden by collapse
- current ORDER-session open/closed state remains stable through ordinary rerenders

## UI-Q83 — DANGER DETAIL DOES NOT GIVE ANSWER

PASS detail may show:
- Hazard
- pressured Stat
- required Supply
- readiness meaning

FAIL if it exposes:
- recommended SKU/category
- optimal combination
- exact hidden Hazard requirement/formula

## UI-Q84 — FOUR CORE STATS REMAIN VISIBLE

SALE primary decision surface keeps:
- 투력
- 강인함
- 기동
- 정신

PASS:
- not moved behind accordion/detail
- actual applied source labels remain truthful
- calculation breakdown is drill-down detail

## UI-Q85 — ITEM VS GATE INFORMATION BOUNDARY

PASS:
- Item shows exact Stat/Counter/Supply
- Gate shows qualitative readiness
- exact Gate Counter threshold stays hidden

## UI-Q86 — UNCOMMITTED PREVIEW

Select/focus an uncommitted Item.

May show:
- exact Item effect
- price/affordability
- deterministic Supply/Fatigue arithmetic

Must not show hypothetical:
- `접전 -> 우세`
- `불안 -> 충분`
- Great Success signal change
- exact success/death probability

After actual purchase commit:
PASS: current Forecast/readiness may update before remaining-slot decision.

## UI-Q87 — TWO-SLOT HANDLING

All ordinary NPC levels:
PASS:
- exactly two visible Bag slots
- each mobile target ~44px class
- focus/replace/remove state clear
- tap-only completion works
- drag not required
- no third ghost slot

## UI-Q88 — SEQUENTIAL TRANSACTION

Within one customer:
- first slot transaction resolves purchase/refusal
- state updates
- remaining slot remains a new decision

FAIL:
- two-slot cart checkout
- both items committed atomically as one bundle

## UI-Q89 — SUPPLY/FATIGUE CONDITIONAL ARITHMETIC

Controlled setup with known Fatigue/Supply/Trait.

PASS:
- Required/Prepared/Deficit values match runtime
- departure Fatigue matches runtime
- conditional success/great/retreat/injury Night values match owner arithmetic
- no single Outcome is predicted as guaranteed

## UI-Q90 — RETURNING NPC LAST BAG

Returning customer with snapshot:
PASS:
- compact `지난 원정 · DAY X · 결과 · [item] [item]`
- exact actually accepted items only
- empty slot preserved
- mobile Wallet/Destination/Forecast hierarchy not displaced
- expanded causal text only from proven tokens

## UI-Q91 — QUEUE UNCERTAINTY

PASS:
future customer Job/Level/Destination/preparation need/importance is not newly revealed.
Existing authorized queue-count info may remain.

## UI-Q92 — NIGHT v2.7 RESULT TRUTH

PASS:
- actual Supply preRecovery/outcome buffer use can be read when relevant
- final Fatigue matches runtime
- First Aid Aftercare shown only if it actually changed persistent Injury state
- no invented `전투 부족` / `독 대응 부족` diagnosis
- inherited `다음 / 전체 건너뛰기` controls remain exact

## UI-Q93 — FINAL TIMELINE

PASS:
- D0 objective notice
- D10 FINAL20
- D20 FINAL10 + Recon beat
- D25 FINAL5 + exact persisted Family/Hazard disclosure
- D30 reuses known state
- no permanent new Final dashboard required

## UI-Q94 — TUTORIAL TEACHES READING, NOT SKU ANSWER

PASS:
Tutorial explains Stat pressure / Counter contribution / readiness and Supply->Fatigue order.

FAIL:
Tutorial instructs a specific correct SKU for a Hazard as the solution.

## UI-Q95 — STRONG GREEN SEMANTIC

PASS:
Strong Sign Green is reserved for `영업 시작`.
Other routine primary actions use their v2.7 material direction rather than generic green CTA repetition.

## UI-Q96 — MENU / SETTINGS VISUAL GRAMMAR

PASS:
- inherited functional composition unchanged
- Run-abandon action remains top-level and separate from Full Data Reset
- exact Run-abandon label is `현재 지점 포기`
- Menu uses one surface + row navigation rather than dashboard-card grid
- Settings uses one utility panel
- destructive action separated
- no new control framework

## UI-Q97 — TYPOGRAPHY EXACT

PASS:
- Atmosphere = Mulmaru
- Information = Wanted Sans
- no active Galmuri/Pretendard player UI dependency after adoption
- no third font family/theme system
- no runtime network font request
- license notice retained

## UI-Q98 — TYPOGRAPHY RESPONSIVE QA

Verify at minimum:
- mobile 360~390
- mobile 412
- desktop 1024
- desktop 1280+

PASS:
- no ORDER/SALE/Settings wrap overflow
- price/%/Stat digits readable
- 50/100/150 quickly distinguishable
- no missing Korean/player-facing glyph

## UI-Q99 — ANTI-GENERIC MATERIAL PASS

PASS direction:
- existing store/paper/wood/metal/slate/receipt language remains recognizable
- no round-all-card/dashboard proliferation
- no unnecessary gradient/shadow/icon-every-row pattern
- touch targets are not sacrificed for visual styling

## UI-Q100 — SALE REFUSAL PRICE CEILING

Controlled same customer + same SKU visit.

Case A:
- refuse at 50%

PASS:
- 100% and 150% controls become disabled and non-interactive for that SKU
- reason is readable
- lower-price refusal does not trigger a new higher-price acceptance roll

Case B:
- refuse at 100%

PASS:
- 150% disabled
- 50% may remain usable

Case C:
- refuse at 150%

PASS:
- 100% / 50% may remain usable

Isolation PASS:
- unrelated SKU price controls remain unaffected
- new customer visit does not inherit the previous visit lock unless another owner explicitly defines it

## UI-Q101 — MORNING NEXT-DAY GATE FORECAST

Before ORDER on controlled next-Day states:

PASS:
- MORNING shows next-day Gate-count forecast
- randomized count shows exact probability per possible count
- deterministic count shows fixed count rather than fake split
- MORNING shows exact next-day T1/T2/T3 probability forecast
- values match `DUNGEON_HAZARD_v2.7.0.md` / `ECONOMY_ORDER_v2.7.0.md`
- current-day Gate/Hazard remains more prominent as today's preparation context
- next-day Family / exact Gate composition / Hazard set remain hidden
- future customer identity/destination remains hidden
- no recommended Item/category/quantity is added

If ORDER repeats the forecast:
PASS only when the values exactly match MORNING and are not regenerated independently.

## UI-Q102 — SALE NON-DECISION DETAIL REMOVAL

PASS:
- `이 손님에게 안 걸리는 효과` is absent from the SALE customer decision surface
- flavor-only `상품 설명` disclosure is absent from SALE
- exact actionable Item effects remain readable
- no replacement accordion/modal is added solely to preserve the removed flavor

FAIL:
- a disclosure control remains that visually implies strategic information but opens only flavor text

## UI-Q103 — POST-COMMIT DELTA SOURCE TRUTH

Use current `집중 사탕` (`공포 +10 / Supply 3`) in three controlled setups.

### Case A — no active Supply Deficit change, no Fatigue penalty-band change

PASS:
- direct effect shows 공포 Counter / Supply only
- 투력/강인함/기동/정신 do not rise
- no hidden direct Core-Stat effect is attributed to 집중 사탕

### Case B — its Supply reduces an active Supply Deficit

PASS:
- effective 투력/강인함/기동/정신 and readiness may rise if the canonical unified Supply Deficit system actually changes them
- any displayed Core-Stat delta is attributed to `보급 부족 완화` or equivalent system source
- UI does not imply that 집중 사탕 directly grants those Stats
- exact hidden deficit formula remains undisclosed

### Case C — excess Supply crosses a Fatigue penalty band

PASS:
- effective 기동/정신 may rise according to the current Fatigue owner
- displayed delta is attributed to `피로 완화` / Condition source
- direct Item effect remains separately readable

All cases:
- main current-state values match runtime preparation truth
- direct Item effect and derived system effects are not conflated
- a generic `보급 후 변화` block is allowed only if those source classes are immediately distinguishable
- otherwise the synthetic block is removed and current-state values update in place with source treatment

## UI-Q104 — FINAL SELECT -> SALE -> RESULT

Controlled D30 Final with eligible participants.

PASS order:

```text
출전 NPC 선택
-> FINAL 판매
-> 결과
```

PASS:
- participant selection is confirmed before Final SALE begins
- selected participants are handled one at a time using the familiar SALE interaction
- each participant has exactly two visible Item slots
- price / Wallet / affordability / refusal / inventory state remain readable
- Final no-effect Items are blocked/clearly marked according to `FINAL_EXPEDITION_v2.7.0.md`
- Boss-caused visible Item changes use the current Final truth
- there is no separate attack/QTE/combat-control layer
- there is no second free-equip screen after Final SALE
- after all participant sale interactions finish, the UI advances to the one Final result
