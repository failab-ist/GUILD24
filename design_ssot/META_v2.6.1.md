# META

DOC=META
OWNER=meta,job_mastery,boss_clear_matrix,franchise_grade,unlock,monster_knowledge,cross_run
DOC_VERSION=2.6.1
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.6.1
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=META_v2.6.0.md
PATCH_TYPE=ADOPTION_RECOVERY

## INHERITANCE

All unchanged Meta progression rules inherit `META_v2.6.0.md`.

## D10 / D14 PRODUCT UNLOCK — EXACT

D10:
- account permanent unlock: Premium Lunch
- unlock before that Run's D10 Offer generation
- may appear in the same D10 Offer generation
- new Run still blocks appearance before D10
- account toast once
- copy: `새 상품 해금 · 길드 프리미엄 도시락`

D14:
- account permanent unlock: World Tree Amulet
- unlock before that Run's D14 Offer generation
- may appear in the same D14 Offer generation
- new Run still blocks appearance before D14
- account toast once
- copy: `새 상품 해금 · 세계수 생환부적`

Full Reset clears unlock + toast state.
Run Abandon preserves unlock + toast state.

## SAVE v7 ACCOUNT CONTRACT

Current save generation is v7 only.
No v1~v6 continuation or migration.

`account.unlocks`:
- required current unlock keys are validated as booleans
- malformed shape is invalid, not silently coerced

Old save bytes are not automatically deleted merely because they cannot be continued.
Full Data Reset is the explicit deletion action.
