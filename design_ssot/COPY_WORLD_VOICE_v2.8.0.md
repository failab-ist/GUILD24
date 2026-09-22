# COPY_WORLD_VOICE

DOC=COPY_WORLD_VOICE
OWNER=copy,world_voice,player_terms,help_copy,boss_report_copy,result_copy,event_copy
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=COPY_WORLD_VOICE_v2.7.0.md
PATCH_TYPE=INFORMATION_TRUST_AUDIT
APPROVED_COPY_AMENDMENT=COPY_AUDIT_APPROVED_v2.8.0.md

## EXACT COPY ROUTING

Exact approved Player-facing replacements, deletions, Event Flavor, Store Support descriptions,
NPC dialogue pools, Boss/Deep text, Settings/Help text and death narration are owned by:

    COPY_AUDIT_APPROVED_v2.8.0.md

This owner holds terminology, truth boundaries, exposure/cooldown rules and non-duplicated
copy-system rules. Do not maintain a second exact-copy list here.

## INHERITANCE

All unchanged world voice and non-conflicting v2.7 copy inherit COPY_WORLD_VOICE_v2.7.0.md.

Priority:
    TRUTH -> FRESHNESS -> DECISION VALUE -> PLACEMENT -> SCAN -> VOICE

Do not make explanations longer merely to sound friendly.
Reduce internal calculation language and strengthen choice -> actual change -> result.

## LOCKED PLAYER TERMS

Use:
- 강인함, not player-facing 생존 Stat
- 점포지원, not 유물
- 심층원정
- 원정 소지금 획득 for expedition-Wallet modifiers
- 귀환 후 피로 for the settled NIGHT value

Do not expose:
- 성장 잠재력
- 남은 특성
- internal potion marker
- internal fatigue accounting labels

## FIRST AID KIT

Concise player function:

    원정 후 남는 부상을 1단계 완화한다. 사망에는 적용되지 않는다.

Do not append redundant 원정 결과는 유지 prose on the primary Item line.

## GREAT SUCCESS SIGNAL HELP

Signal text remains:
    대성공을 노려볼 만합니다.

Help:
    구매가 확정되면 현재 준비 상태를 반영해 이 신호만 다시 확인합니다.
    정확한 확률은 표시하지 않습니다.

Do not say Supply always increases Great Success.

## ANCHORED HELP ROUTING

Exact Player-facing SALE Help for 전투 전망 / 환경 대응 / 실패 시 사망 위험 is owned by
COPY_AUDIT_APPROVED_v2.8.0.md.

보급 / 피로 explanation:
    필요량을 채우고 남은 보급은 출발 전 현재 피로를 먼저 줄입니다.
    그래도 남으면 귀환 후 쌓이는 피로를 줄입니다.

## LOYALTY COPY BOUNDARY

Normal SALE shows only the compact Loyalty value/state and no separate Loyalty `?`.

Exact normal-SALE, tutorial/coach and compact global Help wording is owned by
COPY_AUDIT_APPROVED_v2.8.0.md.

Do not append Store Support/Boss condition detail to the normal SALE state.
Boss-specific information must obey its reveal boundary.

## DEEP EXPEDITION COPY BOUNDARY

The first contextual tutorial may explain the system.
Repeat surfaces use the compact exact copy owned by COPY_AUDIT_APPROVED_v2.8.0.md.

Do not repeat the full Hazard/cost/growth/store-income tutorial paragraph on every Morning and again
inside SALE.

## NIGHT HERO FEEDBACK

Use the short proven-result grammar owned by NIGHT_CLOSING_v2.8.0.md and the exact active copy in
COPY_AUDIT_APPROVED_v2.8.0.md.

Do not use generic 위험 감소 as Hero feedback.

## NIGHT REACTION SELECTOR

Living reaction selection priority:

    avoided death / rescue
    -> 중상
    -> 부상
    -> 퇴각
    -> growth
    -> ordinary living return

Item presence alone is not a selector.
Remove supplied as a Primary selector.

Environment flavor may be used only where it does not override the actual Outcome priority.
Death uses narration, not quoted living dialogue.

## FIRST STORE SUPPORT COPY BOUNDARY

Exact DAY 0 first-support copy is owned by COPY_AUDIT_APPROVED_v2.8.0.md.

The candidate price/state communicates the free first choice, and the flow itself requires a
selection. The D0 Boss objective belongs to the separate Boss-information beat after the first
support choice; it is not embedded on the Store Support surface.

## BOSS INFORMATION COPY ROUTING

Exact D0 / D5 / D10 / D15 / D20 / D25 Player-facing Boss information copy is owned by
COPY_AUDIT_APPROVED_v2.8.0.md.

Reveal timing and information ownership remain governed by BOSS_v2.8.0.md.

## SLOTH TERMINOLOGY

Use 점포지원 consistently in all active Player-facing SLOTH lines.

## EVENT COPY ROUTING

Event mechanic truth -> EVENT_v2.8.0.md
Exact approved Event Function / Flavor text -> COPY_AUDIT_APPROVED_v2.8.0.md

Do not maintain a second exact Event-copy list here.

## NPC DIALOGUE TRUTH

Dialogue must not imply a purchase preference that the owning Trait does not implement.

Exact active ARRIVAL / TRAIT / SALE / NIGHT / DEATH pools are owned by
COPY_AUDIT_APPROVED_v2.8.0.md.

## DIALOGUE EXPOSURE / RECENT REPEAT — EXACT

Dialogue production target is sized for repeated Run exposure.

Target minimum pool sizes:

### ARRIVAL
- first: 8
- back: 16
- hurt: 10
- regular: 12
- helped callback: 8
- each active Trait-arrival pool: 6

### SALE
- 100% accept: 20
- 50% accept: 20
- 150% accept: 20
- refusal / price: 12
- refusal / need: 12
- refusal / choice: 12

### NIGHT
- ordinary success: 16
- great success: 10
- retreat: 12
- hurt: 12
- severe: 8
- avoided death / life-saving: 8
- rescued return: 8
- success + growth: 10

### DEATH NARRATION
- traded: 6
- known: 6
- stranger: 6

Recent-repeat rule:
- ARRIVAL / SALE / NIGHT track recent visible dialogue separately.
- The same exact line is not eligible if it appeared within the previous 3 visible dialogue beats
  on that same Surface.
- The same NPC may not immediately repeat its previous line from the same Pool.
- Reuse later in the same Run is allowed.
- Selection remains deterministic for the same saved state.
- Dialogue selection must not consume Gameplay RNG.
- Save/Load must not change an already-determined visible line.

This is a readability/content-density rule, not a relationship or personality mechanic.

## RETURN-VISIT HELPED CALLBACK

The helped callback may be selected only when the immediately previous expedition has a proven
sold-Item contribution under the current result-proof boundary.

Do not use:
- `events.length > 0`
- Trait-only `injury-guard`
- a generic Hazard/Result event with no sold-Item proof

as sufficient evidence.

The callback consumes no Gameplay RNG and creates no new proof system; it reads the persisted
previous-result proof already needed for NIGHT.

## SALE COPY BOUNDARY

Exact selected-Item headings, conditional-effect labels, forecast Help and global Help text are owned
by COPY_AUDIT_APPROVED_v2.8.0.md.

Direct and derived changed rows remain readable under the current single-heading structure.
Internal markers such as `potion` are never Player effects.

## SUPPLY SHORTFALL

Main compact line:

    보급 부족 {N} · 능력치 감소

On-demand explanation:

    투력·강인함·기동·정신이 함께 감소한다.

Do not expose the hidden deficit formula.

## TRAIT / CURRENCY / SETTINGS COPY ROUTING

Exact active Trait-effect labels, Store Capital display text and Settings localization are owned by
COPY_AUDIT_APPROVED_v2.8.0.md.

Use mathematically truthful weighting terms such as 재방문 가중치 where replacing them with 확률
would be false.

The reproducibility Seed control remains developer/debug functionality and does not appear in the
ordinary Player pre-Run surface.
