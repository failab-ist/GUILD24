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

Player-facing category terminology must match `ITEM_v2.7.0.md`:

```text
음식 / Food
음료 / Drink
포션 / Potion
야외장비 / Field Gear
보험 / Insurance
특수 / Special
```

`의료 / Medical` is not an active v2.7 player category.
Do not call the Potion line `특수` merely because stale source data used that key.

## MORNING / SUPPLY COPY

Where required Supply is known, prefer direct data:

```text
필요 보급 0
필요 보급 3
필요 보급 5
```

Do not restate it as AI-like recommendation prose such as:
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

## EVENT 05 — EXACT PLAYER COPY

Mechanic ownership -> `EVENT_v2.7.0.md`.

Player-facing title:
```text
포션 가격 폭등
```

Reveal:
```text
포션 값이 또 올랐다.
오늘 포션 매입가 +35%
```

Do not use the retired `마석 가격 폭등` / `Special 매입가 +35%` wording.

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
Event function -> `EVENT_v2.7.0.md`
Sale/UI -> `SALE_v2.7.0.md` / `UI_UX_v2.7.0.md`
Night causality -> `NIGHT_CLOSING_v2.7.0.md`
