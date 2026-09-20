# NIGHT_CLOSING

DOC=NIGHT_CLOSING
OWNER=night,expedition_result,closing,causality,fatigue_result,npc_reaction
DOC_VERSION=2.8.0
DESIGN_SSOT=GUILD24_DESIGN_SSOT_v2.8.0
DOC_AUTHORITY=AUTHORITATIVE_DESIGN_SPEC
BASE_DOCUMENT=NIGHT_CLOSING_v2.7.0.md
PATCH_TYPE=RESULT_READABILITY

## INHERITANCE

All unchanged result resolution, Closing economics, Injury/Aftercare truth, recent snapshot and
proof-only causality rules inherit NIGHT_CLOSING_v2.7.0.md.

## RESULT INFORMATION HIERARCHY

NIGHT reads in this order:

    Outcome
    -> proven effect of what the Player sold
    -> Level / Stat change
    -> Fatigue result
    -> EXP / NPC Wallet / other change

An Item being present in the Bag is not enough to receive Hero feedback.

## HERO ITEM FEEDBACK

Use strong Item feedback only when DUNGEON_HAZARD_v2.8.0.md proves a resolved Outcome/state
difference.

Preferred short grammar:

    {Item} 덕분에 살아 돌아왔다.
    {Item} 덕분에 중상을 피했다.
    {Item} 덕분에 부상을 피했다.
    {Item} 덕분에 원정을 성공했다.
    {Item} 덕분에 대성공했다.

Two necessary Items:
    {Item A}·{Item B} 덕분에 부상을 피했다.

Only the combination is provable:
    챙긴 보급 덕분에 부상을 피했다.

Do not use vague Hero claims such as:
- 부식 위험 감소
- 환경을 철저한 준비로 극복했다

A hidden risk decrease without a proven resolved difference is not Hero feedback.

## FATIGUE RESULT — SUPERSEDES v2.7 PLAYER LABELS

Main NIGHT surface shows one settled value:

    귀환 후 피로 11

On demand, the same result may expand to:

    출발 8
    원정에서 +5
    남은 보급으로 -2
    -> 귀환 후 11

Remove player-facing labels:
- 밤 피로
- 보급 회복
- 보급 완화
- 원정 결과 +N when N is actually Fatigue gain
- 최종 피로 as a competing second name

Exact arithmetic/fields remain unchanged internally.

## LIVING NPC REACTION

For every living NIGHT result:
- use the existing temporary SALE-style speech-bubble behavior
- around 3 seconds
- tap may dismiss early
- bubble may overlap character art
- bubble must not cover Outcome or primary result information
- permanent result information remains after the bubble disappears

Death:
- no speech bubble
- narration/report treatment only

Broad Dialogue-pool expansion/cooldown is not part of v2.8.

## CLOSING

Remove explanatory footer prose that teaches internal accounting when the receipt itself already
shows the actual figures.

In particular the current:
    미판매 재고는 자산으로 남는다. 발주 지출과 판매 원가를 손익에서 두 번 빼지 않는다.

does not belong on the primary Closing receipt.

Closing remains economics-only.


## OUTCOME SENTENCE VS PLAYER CAUSE — EXACT

The Outcome sentence states what happened.
The Hero Item line states why the Player's sold Item mattered.

Do not make the Outcome sentence consume the Item-causality role.

For an avoided-death return:

Outcome sentence:
    사망 위기를 넘기고 살아 돌아왔다.

Then, only when proven:
    {Item} 덕분에 살아 돌아왔다.

Do not use the generic Outcome sentence:
    보급이 마지막 순간의 사망을 막았다.

when a separate proven Item line follows.

## CLOSING ECONOMICS-ONLY — EXACT

The primary Closing receipt does not repeat NIGHT expedition-impact content.

Remove the current block headed:

    오늘의 보급 영향

Closing keeps only economic/accounting results such as:
- 매출
- 판매 원가 / 마진
- 운영비
- 폐기
- 발주 교환
- 본사 지원·수당
- 영업 손익
- 발주 지출
- 점포지원 투자
- 재고 정리
- 보유 자금

The NIGHT result is the owner surface for expedition causality and adventurer-state change.
