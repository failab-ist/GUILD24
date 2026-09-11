# GUILD24 Design SSOT v2.5.0 — Director Update Pack

This package was authored locally from:
- current GitHub `main` Design sources read-only
- recovered Boss design supplied by the User
- User-approved D5/D15/D30 reveal decisions in the current Director session

GitHub was **not modified**.

## Terminology

Recommended project terminology:

- **GUILD24 Design SSOT** = the whole authoritative design source set
- **Authoritative Design Spec** = each gameplay/system/UX/copy source document
- **Design QA Spec** = acceptance/QA source document
- **Source** = implementation truth

Why not `GDD` as the primary name:
`GDD` is common and valid, but usually implies one broad Game Design Document.
GUILD24 already uses a modular owner-based spec system, so `Design SSOT` is more precise for day-to-day production work.

## Files changed in this update

1. `SPEC_INDEX_v2.5.0.md`
   - Design SSOT terminology and authority policy
   - routing for Boss preview / trusted regular ownership

2. `BOSS_v2.5.0.md`
   - PRIDE visible Final 투력 reduction
   - ENVY entire-Final 4-Stat reduction on one pre-penalty ace
   - GREED readable strengthening state
   - GLUTTONY 보급품/raw-Stat scope
   - LUST existing 단골 state + non-regular 4-Stat reduction
   - SLOTH visual state mapping / SB0 BASE reuse
   - Final modifier order and locked-state persistence
   - embedded QA updates

3. `NPC_TRAIT_v2.5.0.md`
   - v2.5 Job Mastery boundary
   - Trusted Regular state ownership for LUST

4. `FINAL_EXPEDITION_v2.5.0.md`
   - Boss ownership separation
   - D30 Family reveal before Relic/Seal
   - Final prep/lock state
   - shared Final calculation order

5. `UI_UX_v2.5.0.md`
   - D5 길드 토벌 공고
   - D15 길드 정보 보고
   - D30 최종 정찰 보고
   - exact Final modifier preview
   - Final Boss art state
   - v2.5 Meta UI

6. `COPY_WORLD_VOICE_v2.5.0.md`
   - exact D5/D15/D30 Boss reveal copy
   - internal-term guardrail
   - Boss copy QA
   - GLUTTONY Player-facing `보급품`

7. `UI_UX_QA_v2.5.0.md`
   - Boss reveal / preview / Final art acceptance
   - existing v2.5 Boss/Sloth/Meta QA additions

8. `DECISIONS_v2.5.0.md`
   - high-value Boss/Meta decisions that must not drift

## Intentionally NOT duplicated

No changes were added to:
- ECONOMY_ORDER for GREED revenue source — it already owns committed rounded Cumulative Gross Sales
- DUNGEON_HAZARD for D30 pressure wording — it already owns T2 Hazard definitions and pressure labels
- ITEM for GLUTTONY mechanics — Item effect ownership remains there; BOSS only defines what GLUTTONY attenuates
- RELIC for Sloth transaction — existing Relic-window exclusivity remains the execution owner
- META for Boss mechanic details — Boss clear signal is consumed by META, not redefined there

## PASS3 still open

Numeric tuning only:
- WRATH baseline / effective Boss Power
- prideCombatFactor
- envyStatFactor
- GREED target / slope / cap
- GLUTTONY affected rarity / factor
- lustStatFactor
- SLOTH 0/1/2/3 effective Boss values
- existing Meta / Job PASS3 values

No structural Boss decision remains unresolved in this update.
