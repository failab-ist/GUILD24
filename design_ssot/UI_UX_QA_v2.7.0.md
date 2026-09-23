# UI_UX_QA

DOC=UI_UX_QA
OWNER=qa,ui,ux,mobile,sale_handling,tutorial,typography,visual_material,final_preparation_ui
DOC_VERSION=2.7.0
CURRENT_ROLE=HISTORICAL_BASE  # not current authority; current owners are routed only by SPEC_INDEX_v2.8.0.md
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
- any inherited/current pre-amendment Final UI expectation that keeps 50/100/150 price choice or purchase/refusal RNG on D30
  - current Final preparation shows only the fixed 50% / 매입가 amount and no refusal flow

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

## UI-Q86 — UNCOMMITTED PREVIEW / FROZEN PRE-SUPPLY OUTLOOK

Select/focus an uncommitted Item.

May show:
- exact Item effect
- price/affordability
- deterministic Supply/Fatigue arithmetic

Must not show hypothetical post-Item answers:
- `접전 -> 우세`
- `불안 -> 충분`
- 실패 시 사망 위험 `% -> %` change
- Great Success signal change
- exact expedition Success probability

The already-visible exact 실패 시 사망 위험 % is allowed only as the fixed pre-supply snapshot.

After actual purchase commit, PASS only if:
- displayed Combat Forecast remains the original pre-supply snapshot
- displayed Hazard Readiness remains the original pre-supply snapshot
- displayed 실패 시 사망 위험 % remains the original pre-supply snapshot
- exact Item/direct-effect and proven source-attributed numeric changes may update
- no post-commit derived expedition answer is substituted before the remaining-slot decision.

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

Within one ordinary customer:
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
- ordinary SALE 50/100/150 quickly distinguishable
- Final preparation shows only its single fixed 50% / 매입가 price presentation and does not leak ordinary 100/150 controls
- no missing Korean/player-facing glyph

## UI-Q99 — ANTI-GENERIC MATERIAL PASS

PASS direction:
- existing store/paper/wood/metal/slate/receipt language remains recognizable
- no round-all-card/dashboard proliferation
- no unnecessary gradient/shadow/icon-every-row pattern
- touch targets are not sacrificed for visual styling

## UI-Q100 — SALE REFUSAL PRICE CEILING

Controlled same ordinary customer + same SKU visit.

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
- Final preparation does not show this refusal-price ceiling UI because Final has no refusal roll and no 100/150 modes

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
- effective 투력/강인함/기동/정신 and underlying Hazard preparation may improve if the canonical unified Supply Deficit system actually changes them
- any displayed Core-Stat delta is attributed to `보급 부족 완화` or equivalent system source
- displayed pre-supply Hazard Readiness remains frozen rather than being replaced by a new readiness label
- displayed pre-supply 실패 시 사망 위험 remains frozen rather than being replaced by a new percentage
- UI does not imply that 집중 사탕 directly grants those Stats
- exact hidden deficit formula remains undisclosed

### Case C — excess Supply crosses a Fatigue penalty band

PASS:
- effective 기동/정신 may rise according to the current Fatigue owner
- displayed delta is attributed to `피로 완화` / Condition source
- direct Item effect remains separately readable

All cases:
- exact post-commit Item/effect/delta rows match runtime preparation truth
- direct Item effect and derived system effects are not conflated
- the pre-supply Combat Forecast / Hazard Readiness / 실패 시 사망 위험 snapshot remains clearly identified as pre-supply and is not replaced by post-commit derived answers
- a generic `보급 후 변화` block is allowed only if those source classes are immediately distinguishable
- otherwise the synthetic block is removed rather than turning the outlook into a post-commit answer dashboard

## UI-Q104 — FINAL SELECT -> FIXED-PRICE PREP -> RESULT

Controlled D30 Final with eligible participants.

PASS order:

```text
출전 NPC 선택
-> FINAL 준비
-> 결과
```

PASS:
- participant selection is confirmed before Final preparation begins
- selected participants are handled one at a time using the familiar two-slot Item interaction
- each participant has exactly two visible Item slots
- selected Item shows exactly one fixed Final price: ordinary 50% / 매입가 amount
- 100% / 150% controls are absent
- purchase/refusal chance and refusal-result UI are absent
- same-SKU refusal-price lock UI is absent
- Wallet / affordability / inventory state remain readable
- unaffordable transfer is visibly non-committable with readable reason
- committed transfer updates stock and NPC Wallet before the remaining-slot decision
- Player Gold increases by the same fixed amount
- Gross Sales increases by the same fixed amount exactly once
- Final no-effect Items are blocked/clearly marked according to `FINAL_EXPEDITION_v2.7.0.md`
- Boss-caused visible Item changes use the current Final truth
- there is no separate attack/QTE/combat-control layer
- there is no second free-equip screen after Final preparation
- after all participant preparation interactions finish, the UI advances to the one Final result

## UI-Q105 — TUTORIAL CURRENT IMPLEMENTATION AUDIT

Before treating tutorial work as complete, inspect the real current tutorial source and run the existing sequence end-to-end.

PASS only if:
- an actual tutorial sequence is still reachable in current Source
- its first trigger is not dead/unreachable
- each step can advance through its intended interaction
- completion state persists after normal completion
- no runtime exception or phase blocker interrupts the tutorial

If Source contains tutorial data/UI but no reachable trigger, this is an implementation bug, not permission to delete the tutorial.

## UI-Q106 — FRESH RESET MUST RE-SHOW TUTORIAL

Test all current fresh-init paths owned by `CORE_RUN_v2.7.0.md`.

Case A — Full Data Reset:
1. complete or dismiss tutorial so its completion flag is set
2. perform Full Data Reset
3. start the newly initialized current account

PASS:
- old tutorial completion/dismissal state is gone
- tutorial is eligible and actually appears/starts on the first applicable flow

Case B — legacy-only internal state:
1. leave only a v1~v7 internal-test state
2. enter current v2.7/v8 build
3. allow current policy to reject migration and create fresh v8

PASS:
- stale legacy tutorial state cannot suppress current tutorial
- current fresh v8 behaves like a clean first install for tutorial eligibility

Case C — ordinary Run Abandon/new Run under the same account:
PASS:
- tutorial completion remains preserved
- tutorial is not forcibly replayed merely because a Run restarted

FAIL if a true fresh account can enter ordinary gameplay without the tutorial because of a stale completion/reset flag.

## UI-Q107 — PRE-SUPPLY EXPEDITION OUTLOOK / DEATH RISK

Controlled ordinary SALE customer before any Item transaction.

PASS:
- heading is exactly `보급 전 원정 전망`
- supporting copy is exactly:

```text
아이템을 지급하기 전 현재 상태를 기준으로 한 전망입니다.
보급과 원정 중 변수에 따라 실제 결과는 달라질 수 있습니다.
```

- qualitative Combat Forecast is shown from the SALE-entry state
- qualitative Hazard Readiness is shown from the SALE-entry state
- the exact risk label is `실패 시 사망 위험`
- exact pre-supply 실패 시 사망 위험 % is shown from the same state
- the percentage is clearly conditional on the expedition entering a failure path, not presented as unconditional whole-expedition Death probability
- exact expedition Success probability remains hidden
- after first and second committed Item transactions, the three outlook values remain unchanged on screen
- post-commit exact Item/effect/source deltas may still update
- actual expedition Resolve uses the final prepared state, not the frozen display snapshot
- a healthy fully prepared controlled state may show 0% 실패 시 사망 위험 when the current formula produces 0
- injured pre-supply 실패 시 사망 위험 includes the canonical +10%p modifier and respects the 40% cap

## UI-Q109 — MOBILE SALE HOTFIX

Verify a real browser at 360 / 390 / 412 phone widths.

PASS:
- upper customer/decision summary occupies about half or less of usable SALE height
- Item / price / transaction surface receives at least about half
- shelf heading and at least one selectable Item row are visible at initial SALE entry without a scroll
- character art is contained, not cropped or stretched
- character and right-side information align without fixed-height overflow
- Bag is exactly two slots, stacked vertically in the upper-right and each is ~44px touch class or larger
- no required SALE decision information disappears to achieve the compact layout
- fixed bottom dock remains reachable and does not cover the sale surface

FAIL:
- product selection remains pushed below an oversized character presentation
- a short phone clips/overlaps the upper block
- any desktop-only duplicate becomes the visible tutorial target on phone

### CONFIRMED PLACEMENT — ENVIRONMENT READINESS

Approved during the hotfix. The destination block stays in the counter band and keeps what is
true of the place: the Gate, its Hazards, and the ability each Hazard presses on.

This customer's readiness against it reads in the forecast instead, labelled `환경 대응`, beside
`전투 전망` and `실패 시 사망 위험`. It is the same canonical ladder off the same frozen
SALE-entry snapshot; the environment is still stated exactly once on the screen, and the help
that explains pressure and readiness moves with it.

PASS:
- the destination block states Hazard pressure only
- `환경 대응` is rendered in exactly one place, in the forecast
- per-Hazard readiness no longer wraps the destination rows or pulls a row for its own help

### MEASURED BASELINE — DOCUMENTAL

Band = counter band + counter edge, as a share of viewport height minus the fixed dock.

| width x 780 | band before | band after | sale surface after | shelf header at entry |
|---|---|---|---|---|
| 360 | 59.9% | 39.2% | 427px | visible |
| 390 | 59.9% | 40.2% | 420px | visible |
| 412 | 59.9% | 40.2% | 420px | visible |

Before the hotfix the shelf header sat 341px below the fold at every phone width.

Bag slot size is a documental baseline, not a fixed requirement: ~44px is the current shipped
value and may move with the layout provided the slots stay a real touch target.

## UI-Q110 — TRANSIENT CUSTOMER SPEECH

PASS:
- speech is overlay/presentation and reserves no permanent layout height
- new line appears
- it auto-hides after 3 seconds
- tapping it hides immediately
- a new line restarts the 3-second display
- same unchanged line does not reappear merely because SALE rerendered
- no Save/account schema is added for speech visibility

## UI-Q111 — ORDER/SALE STORE-SUPPORT REFERENCE

PASS:
- ORDER exposes compact access to currently owned 점포지원 before commitment
- SALE exposes compact access to currently owned 점포지원 before commitment
- both reuse the existing owned-Relic truth/detail surface
- no duplicate Relic-effect store is introduced
- controls do not crowd the primary phone decision surface

## UI-Q112 — PRE-RUN DECORATION EMPTY SLOT

PASS:
- `비움` carries no `주의 ·` / error styling
- before a Run, every Slot row including `비움` is actionable
- tapping a Slot row enters existing 점포 관리 focused/scrolled to that Slot
- active-Run loadout remains frozen/read-only

## UI-Q113 — TUTORIAL COACH COPY / TARGETING

PASS:
- every current coach step uses the exact current COPY owner text
- ORDER confirm explicitly says it commits only the current cart and ORDER remains available
- SALE coach targets a visible mobile element, never the hidden desktop duplicate
- fresh/reset tutorial reachability from UI-Q105/Q106 remains intact

## UI-Q114 — AUDIO AUDIBILITY / COVERAGE

Real-browser mobile audio check with Sound enabled.

PASS:
- at BGM 100% / SFX 100%, BGM remains clearly audible during ordinary play
- SFX remain distinguishable above BGM; global SFX attenuation is not used merely to fake louder music
- BGM/SFX sliders and master mute still work and persist
- day / night / boss music states remain distinguishable
- no runtime network request is required for audio playback
- any external asset has repository-local source/license evidence and a redistribution-compatible license
- current semantic SFX matrix is covered, including Decoration purchase/equip/unequip and other identified silent state-changing actions
- every UI-requested cue resolves to an actual cue; no typo silently falls back to generic click
- page hide / backgrounding stops or suspends audio without duplicate playback after resume

FAIL:
- 100% BGM is still perceived as nearly absent on the real phone test
- important state-changing actions remain silent without deliberate rationale
- every click is given an intrusive unique sound
- external audio is hotlinked or has unclear/NC licensing

## UI-Q108 — FRANCHISE PROGRESS READOUT / COMPLETION CUE

Controlled account at a known Franchise Achievement state, codex 본사 header and 진행도 tab.

PASS:
- the Achievement list is in the existing 도감 location; no Achievement screen, Tree or
  Notification/History subsystem exists
- each of Achievements 1-5 shows its condition and `current / target`
- Achievements 6-10 show their condition and 달성 / 미달성, with no running count
- a completed cumulative Achievement reads at its target and never past it
- rows showing a running count do not carry the 주의 caution styling
- the current and target values come from the same list that judges the Achievement; no screen
  holds its own copy of a threshold
- 다음 해금 progress toward a Grade-gated Start Contract counts Franchise Achievements against
  the Grade requirement table, NOT Total Job Mastery
- at every Achievement count 0-10, every Grade-gated Start Contract reads the same on the board
  as it does at the actual lock judgment
- first completion of an Achievement shows exactly one existing Toast naming it
- when that completion also raised the Franchise Grade, the Grade step is readable in the same
  feedback
- an Achievement already held produces no further cue

FAIL:
- the board reports a Contract as locked or as steps away while the Contract is open
- a threshold appears in the UI as its own literal instead of being read from the judgment source
- the completion cue fires again for an Achievement already held, or fires per crediting site
