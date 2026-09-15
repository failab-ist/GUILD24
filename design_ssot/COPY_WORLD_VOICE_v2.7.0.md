# COPY_WORLD_VOICE

DOC=COPY_WORLD_VOICE
OWNER=copy,voice,flavor,dialogue,terminology,culture
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=COPY_WORLD_VOICE_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All unchanged DATA / FUNCTION / FLAVOR separation, voice, dialogue, culture, terminology, and owner boundaries inherit `COPY_WORLD_VOICE_v2.5.0.md`.

v2.7 is not a broad dialogue rewrite.
This patch owns only copy that would otherwise teach a stale or nonexistent mechanic.

Where an inherited v2.5 example names a Rule/value that changed in a current v2.7 owner, the current owner wins and the stale example is not Design Truth.

## TRUTH-CRITICAL COPY — v2.7

Priority:

```text
Rule Truth
-> Terminology Truth
-> Interaction Flow Truth
-> Flavor Polish
```

Change copy when it would otherwise imply:
- an old number/rule
- a removed Item/category
- purchase preference that runtime does not own
- false destination/cause
- Store Gold vs NPC Wallet confusion
- old SALE/ORDER flow
- Item/result causality not proven by runtime

Do not rewrite unrelated NPC dialogue merely to make the text feel newer.

## ITEM CATEGORY TERMINOLOGY

Authoritative player-facing category identities are owned by `ITEM_v2.7.0.md`:

```text
Food
Drink
Potion
Field Gear
Insurance
Special
```

`Medical` is not an active v2.7 category.
Do not remap the Potion line to `Special` merely because stale Source used that key.

This patch does not create a second localized-category taxonomy.
Exact Korean display strings, where needed, must preserve these six identities and follow approved existing copy style; they must not invent a seventh category or restore `Medical`.

## INHERITED EXAMPLE OVERRIDES

The following inherited v2.5 copy/function examples are explicitly superseded or unresolved where two later canonical paths conflict.

### 불룡볶음면

The old copy note that describes it as `투력 support` is stale.
Current function truth is owned by `ITEM_v2.7.0.md`:

```text
강인함 +5
냉기 Counter +6
Supply 4
```

Existing flavor such as `용 그림은 장식이 아니다.` may remain only as Flavor; it must not be used to imply the retired combat-stat function.

### GLUTTONY / 탐식

Internal ID remains `GLUTTONY`.
Player-facing identity follows `BOSS_v2.7.0.md`:

```text
탐식
탐식의 마왕 글러트니
```

All inherited `폭식 / 폭식의 마왕 글러트니 / 폭식의 권능` wording is stale.

The inherited D15 function text that says `[등급] 이상 보급품` is also stale because v2.7 has no Rarity threshold for this Boss effect.
Current mechanic truth is:
- all positive Core-Stat contribution originating from Items is reduced to 50%
- Hazard Counter / Supply / Insurance / Utility / harmful RiskReward penalty are unaffected

Exact final player-facing D15 trait title and prose for this changed mechanic are:

```text
UNRESOLVED — USER APPROVAL REQUIRED
```

Do not reuse the old Rare+-based sentence as placeholder truth.

### Final Family / Hazard reveal timing

The inherited `D30 — 최종 정찰 보고` timing is superseded.
Current timing is:

```text
D25 = exact persisted Final Family Pair / Hazard Pool reveal
D30 = reuse the already-known persisted state; no new Family reveal/reroll
```

If the existing `최종 정찰 보고` header/copy block is reused, it belongs to the D25 disclosure beat rather than a new D30 reveal.
Do not add a second D30 Family-intro copy that implies newly generated information.

### Current Run abandon label

There is an inherited canonical wording conflict:
- `COPY_WORLD_VOICE_v2.5.0.md` approved amendment uses `현재 런 포기` / preferred `현재 런 포기 · 새 점포 준비`
- current v2.6.1 `CORE_RUN` / `UI_UX` use `현재 지점 포기`

The underlying abandon mechanic is resolved and unchanged.
The exact v2.7 Player-facing action label is:

```text
UNRESOLVED — USER APPROVAL REQUIRED
```

Do not silently choose either historical label during v2.7 Source adoption.

## MORNING / SUPPLY COPY

Where required Supply is known, prefer direct data:

```text
필요 보급 0
필요 보급 3
필요 보급 5
```

Do not restate it as recommendation prose such as:
- `오늘은 보급 준비가 중요합니다`
- `추천 준비: 음식`

unless an owning tutorial explicitly requires instructional text.

## HAZARD / ITEM COPY BOUNDARY

Gate copy communicates:
- Hazard identity
- pressured Stat
- qualitative readiness

Item copy communicates exact owned values:
- Stat +N
- Counter +N
- Supply +N
- explicit penalty
- Insurance behavior

Do not turn those ingredients into strategy advice such as `오늘 최적`, `추천`, `반드시 준비` unless another owner explicitly defines a forced rule.

## TUTORIAL VOICE

Tutorial teaches system reading, not solution memorization.

Allowed function:
- Hazard presses a Core Stat
- natural Stat and Item Counter both contribute
- readiness labels summarize current preparation
- Required Supply is paid first
- remaining Supply can reduce current and outcome Fatigue

Forbidden solution script:
```text
독에는 방진마스크를 사세요.
```

Tutorial may point to the relevant UI value without selecting the answer for the Player.

## EVENT 05 — COPY STATUS

Mechanic ownership -> `EVENT_v2.7.0.md`.

Required copy truth:
- the Event is Potion-category buy-price pressure
- actual mechanical effect is current-day Potion buy price +35%
- retired `마석 가격 폭등` / `Special 매입가 +35%` wording is forbidden

Exact player-facing Event title and flavor/reveal sentence are:

```text
UNRESOLVED — USER APPROVAL REQUIRED
```

Do not promote a candidate Event name/flavor line from planning discussion into Design Truth without User approval.
The unresolved wording does not change the already-resolved Event mechanic.

## RESULT CAUSALITY COPY

NIGHT may describe:
- Supply pre-expedition recovery actually applied
- Supply outcome-Fatigue buffer actually consumed
- First Aid Kit Aftercare actually changed persistent Injury state
- existing proven Item/Trait/Event contributions

Do not diagnose a loss with unproven statements such as:
- `전투력이 부족했다`
- `독 대응이 부족했다`

when the resolved report cannot prove that exact cause.

## RELATED

Item truth -> `ITEM_v2.7.0.md`
Boss identity/trait function -> `BOSS_v2.7.0.md`
Final reveal timing -> `CORE_RUN_v2.7.0.md` / `FINAL_EXPEDITION_v2.7.0.md`
Run abandon function/UI -> `CORE_RUN_v2.7.0.md` / `UI_UX_v2.7.0.md`
Event function -> `EVENT_v2.7.0.md`
Sale/UI -> `SALE_v2.7.0.md` / `UI_UX_v2.7.0.md`
Night causality -> `NIGHT_CLOSING_v2.7.0.md`
