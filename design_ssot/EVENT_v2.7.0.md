# EVENT

DOC=EVENT
OWNER=event,daily_event,event_catalog,event_hazard,easter_egg
DOC_VERSION=2.7.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.7.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=EVENT_v2.5.0.md
PATCH_TYPE=CORE_PLAY_REVISION

## INHERITANCE

All Event timing, frequency, selection, reveal, Hazard-event, Deep-Day exclusion, and unchanged event-catalog behavior inherits `EVENT_v2.5.0.md`.

This patch changes only stale Item-category references created by the v2.7 catalog migration.

## EVENT 05 — POTION PRICE SURGE

The former player-facing `마석 가격 폭등` event is migrated because `마석 보조배터리` is retired and `Special` is not the Potion category.

Player-facing event:

```text
포션 가격 폭등
```

TYPE:
```text
Order / Pressure
```

Weight remains unchanged.

Effect:
```text
오늘 Potion 매입가 +35%
```

Reveal copy:
```text
포션 값이 또 올랐다.
오늘 Potion 매입가 +35%
```

Rules:
- applies through the normal current-day Order buy-price modifier path
- targets v2.7 `Potion` category only
- does not target `Special`
- does not target Field Gear / Insurance
- does not create a new magic-item category
- effect lasts only for the Event day as ordinary Event rules already define

## CATEGORY AUDIT

Any Event filter/copy that still uses `Medical` to mean the v2.7 Potion line is stale.
Use the actual v2.7 Item category/function owned by `ITEM_v2.7.0.md`.

Do not broaden category events to unrelated Items merely to preserve old source keys.

## RELATED

Item/category -> `ITEM_v2.7.0.md`
Order price application -> `ECONOMY_ORDER_v2.6.1.md`
Copy truth -> `COPY_WORLD_VOICE_v2.7.0.md`
