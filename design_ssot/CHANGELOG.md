# GUILD24 DESIGN SSOT — CHANGELOG

Version policy: SPEC_INDEX §VERSION POLICY. Filenames are lineage names; the version lives here, in
the owner headers and in the git tag. Versions v2.8.0 ~ v2.9.11 in detail: `archive/changelog/CHANGELOG_v2.8.0-v2.9.11.md`.

## RELEASE RECORD

Every closed version, where it landed on `main` and its tag. Tags are set by the User (WORK sessions cannot push tags).
From v2.9.13 on, each closed version is tagged on its `main` merge commit; v2.9.2 ~ v2.9.12 stay untagged (User 2026-10-01)
and this table is their commit record.

| version | closed | on `main` | tag |
|---|---|---|---|
| v2.8.0 | 2026-09-24 | `8226c4c` | - |
| v2.9.0 | 2026-09-25 | `3d0ddc6` (close-out `3f18ceb` + the D0 briefing fix); balance moved to v2.9.1 | `v2.9.0` |
| v2.9.1 | 2026-09-25 | `d23d076` (PR #2) | `v2.9.1` |
| v2.9.2 | 2026-09-26 | `d6fcfbd` (H1~H6) | - |
| v2.9.3 | 2026-09-26 | `229df97` | - |
| v2.9.4 | 2026-09-26 | `630b6d0` | - |
| v2.9.5 ~ v2.9.7 | 2026-09-26 | merged to `main` | - |
| v2.9.8 | 2026-09-27 | `621d007` (PR #19) | - |
| v2.9.9 | 2026-09-27 | `8acc8dc` (PR #20); quick patch `5d32f79` (PR #21, 2026-09-28) | - |
| v2.9.10 | 2026-09-28 | `8c1d4ae` (PR #22); quick patch `0fa6891` (PR #24) and its follow-up | - |
| v2.9.11 | 2026-09-29 | `5647020` (PR #28), last merge `e1ce51e` (PR #30) | - |
| v2.9.12 | 2026-09-30 | `39ddcce` (PR #31), `f02eb8d` (PR #32) | - |
| v2.9.13 | 2026-10-01 | `f20f89a` (PR #34); quick patch PR #37; quick patch 2 PR #42 | `v2.9.13` |
| v2.9.14 | 2026-10-02 | PR #50 | `v2.9.14` (set by the User) |

## v2.10.0 — success meta (User 2026-10-02; in progress, the version bump lands at close)

- **The hidden reputation is gone** (User: 평판처럼 몰래 하는 건 안 된다 · 싹 없앤다): the Run no longer keeps a 0~100 reputation
  that moved with each Night's results and scaled every Gate's required power by up to ±5% the next Morning. Gate power is the
  Gate formula and the day's Event only; the Night no longer writes the unseen reputation line. DUNGEON_HAZARD §GATE POWER —
  LATE-DAY SLOPE; tests revision.
- **Success uplift** (User: 성공도 콱 늘린다 · 게임 메타가 바뀌는 거라): every ordinary Gate's required Power × 0.92 on DAY 1~7 and
  × 0.90 from DAY 8 (SuccessEase, on the finished Gate Power, before the Event); expedition EXP × 1.2 (base 22 + Day × 4.6 →
  26.4 + Day × 5.52); potions 투력 하급 8 → 10 · 중급 14 → 18 · 상급 20 → 25 · 최상급 28 → 35, prices unchanged (대응 장비와 레벨이 위험을
  더 쉽게 넘기니 포션 값어치도 오른다). DUNGEON_HAZARD §GATE POWER / §Ordinary EXP, ITEM §ACTIVE CATALOG; tests night.
- **Accidents rise with the counters** (User: 대응 장비 상한과 레벨 성장으로 위험을 쉽게 넘기니 사고 확률과 비율도 올린다): the
  environment incident chance is 0.08 + Hazard aggregate × 0.020 − 강인함 × 0.001, clamped 2%~60% (was 0.06 · 0.012 · 2%~48%).
  The incident-cause split reads the same base and gap coefficient. DUNGEON_HAZARD §Environment incident; tests night.
- **The Wallet follows the results** (User: 이기지도 못하는데 27일까지 가는 게 이상하다 · 저점은 깔아 준다): the visit income is
  Level × 3 + 20~60 (was Level × 8 + 0~80), and a 성공 / 대성공 pays the expedition Wallet reward × 1.5 (failure multipliers
  unchanged). A regular who keeps winning keeps buying; one who keeps losing still brings 20G+ for basic preparation. The Away
  Wallet keeps its rule, half an ordinary visit's average income per Day: Level × 1.5 + 20 (was Level × 4 + 20).
  ECONOMY_ORDER §Ordinary NPC Wallet on visit / §Away Wallet, DUNGEON_HAZARD §Ordinary EXP / expedition-Wallet; tests revision, night.
- **The Final keeps pace** (User: 대응템·포션을 올리면 마왕전도 쉬워진다): with growth, potions and counters lifting a D30 party's
  Power by about 17~21%, WRATH 180 → 210, the FIRE pair +18 → +21, the GREED shortfall cap +11 → +13 (223 at most), SLOTH by
  breaks 200/189/171/149 → 234/221/200/174 (× 1.17). BOSS §WRATH / §GREED / §SLOTH, FINAL_EXPEDITION §FAMILY-PAIR BALANCE AUDIT;
  tests final, simulation.

## v2.9.14 quick patch 1 — the strain words find a home (User 2026-10-02; the version stays 2.9.14)

- **연속 부상 출발 in the 전투 전망 box** (User: 이상한 데 있다 · 대성공처럼 전투 전망 밑에, 모바일은 버튼 · 플로팅은 우하단): the loose line
  under the two boxes is gone. A phone shows a small muted-red chip beside the stamped word (the line kept for a screen reader; with
  the 대성공 기회 tag too, the second chip wraps under the first); a desk shows a small line under the word. On the phone pin the words
  ride at the bottom right of the strip as the same chips, with the 대성공 기회 chip, stacked when both show (User: 플로팅도 버튼 디자인 · 겹치지
  않게; the deployed pin drew the line over the meter). UI_UX §SALE — PRE-SUPPLY EXPEDITION OUTLOOK — EXACT /
  §FORECAST PIN, COPY_AUDIT §4-25; test ui-guard.
- **A rescue stays open past zero** (User: 적자만 넘기면 끝나서, 그 돈으로는 발주에서 살 게 없다): 재고 정리 still starts only on a short
  Closing and still counts one of the three rescues, but once started that Closing may keep clearing stock after the till
  reaches zero, until 다음 날. The CLOSING dock keeps its 재고 정리 key while the started rescue is open; the stock sheet says so.
  tests integration.
- **The early Counter rungs rise** (User: 초반 버티기가 쉽지 않다 · 하이브리드 버프, B안 - 순서 유지): 초반 대응 10 -> 12 (컵라면 냉기, 얼음컵
  화염, 중화 탄산수 부식, 집중 사탕 공포, 방진마스크 독); 초반 하이브리드 9 / 10 -> 11 / 12 on the first / second Hazard (방한 두건
  냉기 11 · 화이트아웃 13, 방독 작업장갑 독 11 · 속박 12, 축성 손전등 공포 11 · 어둠 12, 방수망토 부식 11 · 진창 12). The ladder order
  holds (초반 대응 > 초반 하이브리드 on the first Hazard, both under 후반 하이브리드 and 중반 대응). By the formula, an average D1
  adventurer now clears Tier 1 through D7 with either, and the hybrid's Tier 2 opening shortfall falls from 7~9 to 5~7.
  Unmeasured. ITEM §COUNTER LADDER and catalogue rows, RELIC / UI_UX examples; reports/ITEM-PRICES.md regenerated.
- **후반 하이브리드 rises to 18 / 18 / 18** (User: 중반 대응과 후반 하이브리드도 보자 · 18로): 거미줄 방호세트, 연금 방수슈트, 성화 랜턴, 백설
  방한고글 16·15 / 15·15 -> 18·18, 마그마 냉각장비 화염 15 -> 18 (투력 +10 unchanged). By the formula an average adventurer
  now clears Tier 2 with one slot (+3 / +2 / 0 by Stat group) and stays 3~7 short of Tier 3; 중반 대응 is unchanged (Tier 2 sure,
  Tier 3 just for 강인함, short for 정신 - left to the 정신 Jobs). The order holds: 중반 대응 > 후반 하이브리드 > 초반 rungs.
  ITEM §COUNTER LADDER and catalogue rows; reports/ITEM-PRICES.md regenerated.

## v2.9.14 — play feedback (User 2026-10-02; worked as v2.9.13 quick patch 13)

- **카리냐 → 카리냥** (User): renamed in place - the same F/021 portrait - in the shipped pool and the production name pool
  (`GUILD24_NPC_PRODUCTION/00_NAME_POOL`: the JSON, the F NAME_INDEX, the id mapping, their checksums). A Run saved earlier
  carries the new name on load (`Save.migrate`), so that customer keeps the portrait; test revision.
- **The II Gate mark only on a tier II Gate** (User: 실제 티어2가 아닌데 이 코치가 나오네): the mark was keyed on a two-Hazard plate,
  and a 한파 / 독안개 Event gives a tier I Gate a second Hazard (a tier III Gate also holds two), so it could land on either. It is
  now keyed on the tier - the first tier II Gate that is not FIRE (FIRE II holds one Hazard). UI_UX §GATE TIER / FIRE GATE
  TUTORIAL, UI-Q-v29-52; test ui-guard.
- **A closure day counts the Gate left open** (User: 폐쇄 사건 때 기존 게이트는 몇 명인지 안 나온다): the ORDER 오늘 line gave
  per-Gate counts only with two open Gates, so a 게이트 임시 폐쇄 day read `4명 · 독거미 동굴 I · 북부 설원 폐허 I 오늘 폐쇄`. The open
  Gate now carries its count beside the closed one: `4명 · 독거미 동굴 I 4 · 북부 설원 폐허 I 오늘 폐쇄`. ECONOMY_ORDER §VISITOR
  FORECAST, COPY_AUDIT §4-21, UI-Q-v29-13; test ui-guard.
- **The Fatigue mark lights the Fatigue row** (User: 피로 코치가 부상 쪽에 포커스): every NIGHT discovery mark lit the record's
  Outcome block (`원정을 끝내지 못하고 다친 채 …`), the Fatigue one included. The Fatigue mark now lights the record's `귀환 후 피로`
  row; the others are unchanged. NIGHT_CLOSING §DISCOVERY LINE; test ui-guard.
- **No empty stretch under the 발주서 with the 창고 sheet open** (User: 발주 밑에 이렇게 많이 남는다): an open phone sheet left
  room under the form for the most the sheet may take (45% of the screen, ~410px at 390) since v2.9.13 quick patch made it as
  tall as the stock needs, so a one-row sheet left ~300px of bare wall. The room is now the sheet's own height (measured as it
  opens, grows or closes). UI_UX §ORDER — WAREHOUSE PANEL.
- **A free Store Support is 선택, not 구매** (User): the DAY 0 / DAY 1~4 free card printed `무료` over a `구매` key. A free card's
  key now reads `선택`; a priced card keeps `구매`. COPY_AUDIT §11-31b; test copy.
- **The Counter guarantee counts every sheet drawn** (User: 3번 리롤했는데도 안 나온다 - 그냥 3번 그려졌을 때로): the Known-Hazard
  Counter pity counted only the Day's first sheet, so Rerolls never moved it. Every sheet drawn now counts - the Day's first and
  each Reroll - and the third in a row without a direct Counter for a known Hazard carries one. Rare pity still ignores Rerolls.
  A Reroll now reaches a guaranteed Counter for 50G + 100G on any Day; unmeasured (no simulation run). ECONOMY_ORDER §REROLL,
  §Known-Hazard Counter pity, ORD-Q06; tests revision, delta, relic-order.
- **야전 정비대 boosts every Counter** (User: 필드기어만 대응하는 게 아니니 음식류의 위험 대응도 다 적용): the support multiplied
  only Field Gear Counter values x1.40, while 컵라면 · 집중 사탕 · 얼음컵 · 중화 탄산수 and the others answer Hazards too. It now
  multiplies the Hazard Counter value of any carried Item - Field Gear, Food, Drink - x1.40; Core Stats, 피로 회복 and the flat
  원정 도시락 코너 +2 are unchanged. Copy `판매한 상품의 위험 대응 수치 +40%.` (`원정 위험 게시판`'s offer weight already read every
  category's Counter and the Hazard's Stat items.) Unmeasured (no simulation run). RELIC §8 / REL-Q77 / REL-Q21, COPY_AUDIT
  §11-8; tests relic-order, copy.
- **환경 대응 is a number on SALE** (User: 정답 맞히기 없이 계산 가능한 값은 보여 주자, 전투 전망과 다른 영역처럼): the readout's
  환경 대응 cell is now a lit display window per Hazard, `공포 6/23` - the resolver's own defense off the committed Bag (the
  customer's Stat share and Traits, Store Supports, the sold Items' Counters) over the Gate's public need - and it moves when a
  sale commits; the readiness word and its colour are gone from SALE. `전투 전망` stays the stamped SALE-entry snapshot. The
  phone pin carries the same meter; the tray's Counter row reads the Item's own `공포 대응 +10` (it read `0 → 10`). Coach
  §3-4: `전투 전망은 손님이 들어올 때 정해져서 바뀌지 않는다. 환경 대응은 상품을 팔면 그만큼 오른다. 뒤의 수치까지 채우면 그 위험을
  막는다.` Help §4-2 rewritten. Measurement bots keep reading `outlookFor`'s words (unchanged). UI_UX §SALE — ENVIRONMENT
  METER (new), §PRE-SUPPLY OUTLOOK, §GATE VS ITEM, §FORECAST PIN, UI-Q85; COPY_AUDIT §3-4, §4-2; tests ui-guard.
- **No more `챙긴 보급 덕분에`** (User: 두 개 다 적용했다는 소리냐): with a two-slot Bag a whole-Bag proof means each Item alone
  was enough, so both are named - `컵라면·방한 두건 덕분에 살아 돌아왔다.`, the same Item twice `컵라면 2개 덕분에 …`. NIGHT_CLOSING
  §HERO ITEM FEEDBACK, COPY_AUDIT §6-5; tests revision, copy.
- **Away Wallet** (User: 미방문 고객은 그동안 골드라도 모으게, 단 방문보다 이득이면 안 됨): an introduced adventurer who was
  available and did not come banks one Away Day (at most 3); the next visit adds banked Days x (Level x4 + 20) - half an
  ordinary visit's average income per Day, no expedition reward, no EXP or Loyalty, so a regular who comes often stays the
  better customer. No RNG draw added. Unmeasured (no simulation run). ECONOMY_ORDER §Away Wallet; test revision.
- **환경 대응 previews the selected Item, gold until it reaches the need** (User: 미리보기는 넣자 · 노란색으로, 대응 넘었을 때만
  초록): selecting an unsold Item shows where the number would land, `어둠 5 → 28/21` - the resolver's number with that Item in
  the Bag, Stat-route shares included, so there is nothing to add up; the fight never previews. Numbers are gold, green only at
  or past the need. Coach §3-4 says it. UI_UX §SALE — ENVIRONMENT METER / §UNCOMMITTED PREVIEW, SALE (the one preview
  exception), COPY_AUDIT §3-4 / §4-2; test ui-guard.
- **Level floor catch-up - tried and dropped** (User: 레벨 최저 빼자): +50% EXP up to the lowest newcomer Level of the Day was
  added in this patch, measured (reader, 300 paired Runs: ~5% of expeditions below the floor, success / Level / D30 / clear
  within noise of off) and removed. No rule remains.
- **원정 전문 인증 -> 원정 작전실** (User: 이름과 효과 다 갈아엎자 · 원정 전투력이 아니라 투력으로, 효과는 비슷하게): the keystone
  (Expedition, 290G) no longer multiplies Counters or pays next-visit Gold. For each Hazard of the adventurer's Gate the
  overshoot past its Threat (capped 0.5) is averaged over ALL the Gate's Hazards - an Event Hazard or a Final Hazard left short
  counts 0 - and 투력 gains 0.6 x that average, +30% at most (about the earlier +15% of the whole prepared ability); it is
  listed among 투력's sources on the SALE Stat grid. Copy `위험 대응이 필요 수치를 넘긴 만큼 투력 +, 최대 +30%.` Id `opsRoom`; a save's
  `expeditionCert` is read as `opsRoom` on load. Unmeasured here (the all-support contribution run follows). RELIC §24 /
  REL-Q21, COPY_AUDIT §11-24, EVENT; tests relic-order, relic-effects, copy, revision.
- **Loyalty weighs a little more on the revisit draw** (User: 단골도 3%로): the returning-NPC revisit weight is x(1 + Loyalty x 0.03)
  (was 0.025). A 단골 (51) in a ten-adventurer pool comes about 41% of Days (was 39%). NPC_TRAIT §Loyalty effect on revisit
  weighting.
- **전투 전망 and 환경 대응 in two boxes** (User: 같은 박스에 넣으니 같아 보인다, 박스 2개로 · 같은 가로 길이): the readout is two
  iron-plate boxes - 전투 전망 (the stamped word) and 환경 대응 (the meter) - equal halves while the meter fits (it does at 360 with
  a preview and the longest Hazard name), the Core Stats in a box of their own below; the whole keeps the old panel's 146px. The
  phone pin is one strip, `전투` | `환경` with a thin divider (User: 플로팅에 한해 한 줄로, 두 판은 복잡해 보인다), the Hazards on one
  line while they fit; every Stat cell is
  one row height (User: 투력·강인함만 세로 여백 - a tappable cell took the 44px summary minimum); the outlook coach mark is
  two, one per box. UI_UX §SALE — OUTLOOK BOXES (new),
  §FORECAST PIN, §ENVIRONMENT METER, §TUTORIAL — COACH DIET; COPY_AUDIT §3-4; test ui-guard.
- **즉석식품 코너 takes operating cost again** (User: 운영비 10%로): base operating cost +10% of overheadBase from the next Day,
  added to 지역 거점점 계약 / 왕도 프리미엄 인증 the same way. The Fresh line is meant to clear more and pay more; the earlier
  measure (`gain` = gross sales x reach) never saw a cost. RELIC §10, COPY_AUDIT §11-10; tests relic-effects, copy.
- **귀환 적립제 Wallet 25G -> 20G** (User: 단골 만들기는 시간과 특성이 드니 소지금만): Loyalty +5 unchanged. RELIC §16,
  COPY_AUDIT §11-16; tests relic-effects, copy.
- **원정 도시락 코너 raises the Food/Drink order price +3G flat** (User: 유통기한 -1일은 빠듯, 매입가를 정량으로 · 5G는 과해서 3G):
  after any percentage modifier, the table repriced once at acquisition; the Supply / Hazard effects are unchanged. +5G
  measured -26G/Day with the lowest balance -218G, harsher than 24시간 신선체계. RELIC §17, COPY_AUDIT §11-17; tests
  relic-effects, copy.
- **Store Support candidate reroll** (User: 매번 리셋, 300G 2배씩, D0 제외): from D5 an open window may redraw its three -
  300G, then 600G, 1200G… in the same window, back to 300G on the next; the pool rules hold and the three on the table are
  left out when possible; the spend is 점포지원 투자. The bots do not use it, so it is checked in play, not measured. RELIC
  §CANDIDATE REROLL, COPY_AUDIT §11-31c; test relic-order.
- **평생 단골제 remade** (User: 돈 말고 단골과 관계를 이어가는 쪽 · 단골도 안 떨어지는 게 좋다): no Gold and no revisit weight. A
  단골's four Core Stats +10% (listed among the sources; the Final party too, so it leaves the D30 exclusion list), and while it
  is owned a 단골's Loyalty never drops below 51. RELIC §22 / §D30, COPY_AUDIT §11-22; tests relic-effects, ui-guard, copy.
- **Store Support evaluation for this patch's rules** (User: 바뀐 것만 재서 전체 평가표 · 버전 기록에): reader bot, relic-aware, 1000
  paired seeds; the four supports changed here measured at `6dbe7ce` / `ba90044`, the other 28 carried over from `81e1e2d`
  (only the Level floor changed between, measured as no effect). New metric: cash per closed Day (the earlier `gain` never saw
  costs or support payouts, so 물류 본부계약 and the other economy supports read as zero - corrected). By line, clear %p /
  cash per Day: Fresh +5.3 / +1.9G (24시간 신선체계 and 원정 도시락 코너 lowest balance -132G / -141G), Expedition +2.9 /
  +9.7G, Customer +3.0 / +40.2G, VIP +2.1 / +11.1G, Rotation +1.9 / +40.7G, Premium +1.0 / +14.8G. Findings only, no other
  value changed. `reports/relic-balance/v2913-qp13/EVALUATION.md`.

## v2.9.13 quick patch 12 — the kit lesson's visitor can pay (User 2026-10-02, PR #49; the version stays 2.9.13)

- **+160G for the injured visitor** (User: 돈 없어서 못 사네): on the kit lesson's Day the injured visitor brings the
  구급키트's 정가 (160G) to spend this visit only - the same nightly-cleared channel as the payday customer (`추가 구매 +160G`),
  first Run only, its own 소지금 untouched. CORE_RUN §FIRST-RUN LESSONS; test revision.

## v2.9.13 quick patch 11 — the Severe Injury has its own NIGHT mark (User 2026-10-02, PR #49; the version stays 2.9.13)

- **Injury / Severe Injury split**: the NIGHT `injured` mark acted on 부상 and 중상 alike, so a first 중상 record read "다친 채
  다시 떠나면 … 성공하면 낫는다" - false for a Severe Injury, which rests 2~4 Days unseen and comes back healthy. `injured` now
  acts on 부상 only, and a new `severe` mark on the first 중상 record: `중상을 입었다. 며칠 쉬어야 해서 그동안은 손님으로 오지
  않는다. 다 쉬면 건강하게 돌아온다.` Once per account each, kept in the 발견 수첩. NIGHT_CLOSING §DISCOVERY LINE, COPY_AUDIT
  §26-2; test revision.

## v2.9.13 quick patch 10 — at most two slots per Item (User 2026-10-02, PR #48; the version stays 2.9.13)

- **ORDER offer variety** (User: 6칸에 하급 포션만 4칸): one sheet holds an Item on at most 2 slots (`balance.offerSameItemMax`),
  Rerolls, extra Event / Store Support slots and the Counter guarantee included; the cap yields only when nothing is left
  under it. ECONOMY_ORDER §ORDER OFFER VARIETY / ORD-Q88; test relic-order.

## v2.9.13 quick patch 9 — early ORDER sheets lean on Common (User 2026-10-02, PR #47; the version stays 2.9.13)

- **ORDER rarity D1–7** (User: 티어1에서는 희귀 이상이 필요 없고 손님 소지금도 적다): D1–3 68/24/7/1/0 → 76/20/4/0/0, D4–7
  63/25/11/1/0 → 68/24/8/0/0 (Common / Uncommon / Rare / Epic / Legendary). No Epic before D8; D8 on unchanged; the Rare pity
  (+3 after 5 sheets without one) is kept. Not re-measured (User choice). ECONOMY_ORDER §ORDER RARITY PROGRESSION; test relic-order.

## v2.9.13 quick patch 8 — a slimmer phone ORDER dock (User 2026-10-02, PR #46; the version stays 2.9.13)

- **One slim dock row on a phone** (User: 발주칸이 좁아 보인다, 버튼이 뚱뚱하다): the `창고` handle is no longer a row of its own
  but a compact key (`창고` over `N / M칸`, the arrow in its corner) left of the Action(s), and the Actions and key are 48 px
  (Android's touch target) with a 3 px cast and lighter edges, labels 15 px - the dock goes from 132 px to 70 px, and the
  발주서 gains that height.
  `K종` / `본사 기본 상품` stay on the desk head only; the open sheet adds no head line (its cells say it). Desk unchanged.
  UI_UX §ORDER — WAREHOUSE PANEL / §PRIMARY ACTION GRAMMAR / COACH DIET / UI-Q-v29-44 / UI-Q-v29-50.

## v2.9.13 quick patch 7 — the 구급키트 lesson waits for someone hurt (User 2026-10-02, PR #46; the version stays 2.9.13)

- **The first Day someone injured can come, not DAY 3 only**: a first Run whose DAY 3 had no one injured never met the
  구급키트 lesson. Now it runs on the first Day, DAY 2 on, that an ordinarily injured adventurer can come (already coming, or
  swapped in for the last returning visitor as before), once per Run (`lessonKitDay`); the ORDER `kit` mark follows that
  Day. The payday customer stays on DAY 3. CORE_RUN §FIRST-RUN LESSONS / RUN-Q, COPY_AUDIT §3-12, UI_UX §TUTORIAL — COACH
  DIET; tests revision, ui-guard.

## v2.9.13 quick patch 6 — the DAY 3 payday customer (User 2026-10-02, PR #45; the version stays 2.9.13)

- **One sure 바가지 instead of +20%p**: the first Run's DAY 3 payday customer takes the first 150% offer it can pay for, once
  (`lessonPaydayTaken`); every later 150% offer is an ordinary one - the +20%p is gone. The roll still draws, so the stream
  is unchanged, and the bots play with the lessons off. CORE_RUN §FIRST-RUN LESSONS / RUN-Q; test revision.
- **Payday mark**: the customer's wallet carries one SALE `점주 안내` mark: `오늘 보수를 받은 손님이다. 이런 손님에게는
  바가지(150%)를 해 볼 만하다. 다만 거절당할 수 있고, 받아들여도 단골도가 깎인다.` (it does not say the first is sure).
  COPY_AUDIT §3-13, UI_UX §TUTORIAL — COACH DIET, COPY_WORLD_VOICE; test ui-guard.

## v2.9.13 quick patch 5 — the DAY 3 HQ 구급키트 is told (User 2026-10-02, PR #45; the version stays 2.9.13)

- **First Run DAY 3 구급키트 mark** (User: 조용히 들어와서 티가 안 남): when the lesson brings the kit, that Day's ORDER shows one
  `점주 안내` mark on its cell (desk) or the folded sheet's `창고` handle (phone): `본사에서 구급키트 1개를 보내 줬다. 이번 한
  번뿐이다. 원정에서 다쳐도 한 단계 가볍게 끝나게 해 준다 (중상 → 부상, 부상 → 무사). 오늘 첫 손님은 부상 중이다.` The kit
  heals nothing at once - it lowers the expedition's outcome one step (ITEM §구급키트), so the line says that. It is the one
  mark that names an Item (a gift, not a pick). COPY_AUDIT §3-12, CORE_RUN §FIRST-RUN LESSONS, UI_UX §TUTORIAL — COACH DIET,
  COPY_WORLD_VOICE; test ui-guard.

## v2.9.13 quick patch 4 — a warehouse cell says what it does (User 2026-10-02, PR #45; the version stays 2.9.13)

- **ORDER warehouse cell tip** (User: 처음 하는 사람도 무슨 효과인지 알게): tapping a held cell (hovering on desk) shows the offer
  row's own lines - name, `kind · rarity`, effects - in a balloon right above that cell, pointing at it; a second tap closes it.
  It reuses the shared tip control (tap / hover / focus / tap-away), floats on `<body>` so the sheet's scroll cannot clip it,
  stays inside the screen and may cover the rack. No new copy. UI_UX §ORDER — WAREHOUSE PANEL / UI-Q-v29-50; test ui-guard.

## v2.9.13 quick patch 3 — the DAY 0 free Store Support may wait (User 2026-10-01, PR #43; the version stays 2.9.13)

- **The free first pick is deferrable** (User: 처음 하는 사람에게 가혹함): the DAY 0 takeover gains `나중에 결정` under
  `지금 안 골라도 된다. DAY 4까지 아침·발주 화면에서 무료로 고를 수 있다.`; it opens DAY 1 (the D0 Boss briefing follows as
  before). The D0 window stays open and free through DAY 4 (`expiryDay` 5), reopens from the MORNING / ORDER 점포지원 key and
  the Menu with `DAY 4까지 무료로 고를 수 있다.`, never pops up again, and the D5 window replaces it. A DAY 1~4 pick applies
  like any later purchase. The bots still pick on DAY 0, so measurements are unchanged.
- **DAY 0 coach**: `점포지원은 이번 영업 내내 적용되는 효과다. 첫 지원은 무료이고, 지금 고르지 않아도 된다. DAY 4까지
  아침·발주 화면의 점포지원에서 고를 수 있다. 이후 5일마다 새 후보가 온다.` Guide §8-1 opens `DAY 0 무료 1개는 DAY 4까지
  고를 수 있다.` COPY_WORLD_VOICE no longer lists 전망 as a no-mark item (the outlook mark is §3-4).
- RELIC §KEY / §ACQUISITION WINDOWS D0 / §WINDOW STATE / REL-Q02 / REL-Q-v28-20, CORE_RUN, BOSS §SAME-DAY ORDERING, UI_UX
  §MENU / SETTINGS / §FIRST STORE SUPPORT TUTORIAL, COPY_AUDIT §8-1 / DAY 0 첫 점포지원, COPY_WORLD_VOICE; tests revision, ui-guard.

## v2.9.13 quick patch 2 — first-Run teaching (User 2026-10-01, PR #42; the version stays 2.9.13)

- **NIGHT injury lesson says how an Injury heals** (`reports/v3.0-prep.md` §9-9 F3): the first hurt record's mark now ends
  `원정에 성공하면 반드시 낫고, 퇴각하면 확률로 낫는다.` - success clears an ordinary Injury, a retreat may
  (DUNGEON_HAZARD §RETREAT HEALING). No separate retreat-healing mark. COPY_AUDIT §26-2. NPC-Q78 corrected to the current rule
  (a retreat heals only through §RETREAT HEALING).
- **First Run, DAY 2: 본사 1+1 행사, and a first Event mark** (§9-9 F4): the account's first Run meets `본사 1+1 행사` on DAY 2,
  the one Event before DAY 3; the ordinary roll still draws and no pick is drawn, so the stream matches a later Run's, and
  the bots (lessons off) are unchanged. The first Event slip on the board carries `아침마다 사건이 생길 수 있다. 사건은 오늘
  하루 가게 사정을 바꾼다.` once per account. CORE_RUN §FIRST-RUN LESSONS / RUN-Q81, EVENT §EVENT TIMING, UI_UX §FIRST EVENT
  TUTORIAL / UI-Q-v29-56, COPY_AUDIT §3-11, COPY_WORLD_VOICE; tests revision, ui-guard.

## v2.9.13 quick patch — fixes after the v2.9.13 merge (User 2026-10-01, PR #37; the version stays 2.9.13)

- **SALE readout title back to `전투 전망`, the outlook coach mark back**: `도착 시 전투 전망` (v2.9.12 coach diet, carrying the
  retired outlook mark's fact) filled a half cell on a phone, so 전투 전망 and 환경 대응 stacked on two rows and the readout grew a
  line (three with a two-Hazard Gate). The first SALE shows three marks again: destination, Stats and the outlook (COPY_AUDIT
  §3-4, reworded so it reads at once: `이 전망은 손님이 들어올 때 정해져서 끝까지 그대로다. 상품을 고르면
  능력치·피로 회복 같은 효과가 계산대에 보이지만, 전망은 바뀌지 않는다.`). UI_UX §TUTORIAL — COACH DIET / UI-Q-v29-53, COPY_AUDIT §3-4 / §3-7; tests ui-guard.
- **NIGHT injury lesson on the first hurt record**: it fired on a record that only departed injured, so a healthy, successful
  return carried `다친 채 떠나면 …` and read as wrong. It now fires on the first record that came back with 부상 or 중상, worded
  for that moment (`부상을 입었다. 다친 채 다시 떠나면 투력·강인함이 깎인 채로 싸운다.`). NIGHT_CLOSING §DISCOVERY LINE, COPY_AUDIT
  §26-2; tests revision.
- **Coach bubble as wide as its words**: a fixed 340 px bubble folded a one-line mark (`판 상품은 손님 가방에 …`) onto two
  lines on a desk and more on a narrow phone. It now takes the width its copy needs up to the screen (560 px on a desk) and
  grows only by the lines it needs. UI_UX §TUTORIAL coach mark.
- **ORDER warehouse rack as tall as its stock**: the rack drew a cell for every store slot, so a few held units still took three
  rows of mostly empty cells. On a phone only held units are drawn now - one row while they fit, more as stock grows; the room
  left reads in the header's `N / M칸`. The desk column has the room and keeps every 칸 (the maximum in view). An order that
  passes a row grows the open sheet to its new height over the first beat (~180 ms), the crates landing in the new row. UI_UX §ORDER — WAREHOUSE PANEL / UI-Q-v29-50; tests ui-guard.
- **Desk SALE customer card as tall as the column beside it**: the 400 px card (v2.9.12 desk SALE) stood far above the status /
  outlook / destination column; 270 px makes the card about the column's height (~340 px with a two-Hazard Gate) and gives
  the ledger / tray / shelf the rest. UI_UX §SALE — DESK LAYOUT.
- **초코바 기동 +8 · 피로 회복 3 → 기동 +6 · 피로 회복 5**: it read the same as 캔커피 (기동 +12 · 2) per Gold; now the pair splits
  as 삼각김밥 / 생수 do - the Food keeps going, the Drink lifts the Stat. ITEM §ACTIVE CATALOG, §ITEM ROLE NOTES; tests vocabulary.
- **New Common Food 녹차 양갱 (`yanggaeng`)**: 30 / 60, 정신 +8 · 피로 회복 5, 2 days, DAY 1 - the 정신 Food beside 진정 허브티
  (정신 +15 · 2), as 초코바 is beside 캔커피 and 삼각김밥 beside 생수. Active catalog 44 (Common 12). Flavor `어르신 손님은 꼭 두 개씩
  사 간다.`; a green-tea jelly bar icon. ITEM §ACTIVE CATALOG / §ACTIVE RARITY DISTRIBUTION / §SHELF LIFE / §ITEM ROLE NOTES,
  COPY_AUDIT §12-4; tests vocabulary, delta.

## v2.9.13 — balance line after the 0930 D30-clear save (User 2026-09-30 ~ 2026-10-01; CLOSED)

- **DAY 21+ Gate slope 0.80 → 1.10**: a D30 party grows about 1.9 prepared Power a Day in D21~29 against the 0.80 Gate
  climb. DAY 1~20 unchanged; the DAY 10 step keeps its own 0.80. DUNGEON_HAZARD §GATE POWER — LATE-DAY SLOPE and
  DUN-Q-v27-GATE-SLOPE anchors.
- **Hazard Threat by Stat group** (× 강인함 1.0 · 기동 1.1 · 정신 1.2; the ÷3 / ÷2 conversion unchanged): an average
  adventurer's own share at Tier 1 was 0.43 on 강인함 and 0.70 on 정신. Counters rose with their Hazard's factor (기동
  10 / 15 / 23, 정신 10 / 15 / 22, 방한 두건 화이트아웃 11); 초반 하이브리드 sits under 초반 대응 on a Gate's first Hazard
  (강인함 9), so 초반 대응 is the Tier 1 answer again and NEUTRAL-FIT T1 "hybrid alone is commonly a little short" holds.
  Hazard Traits follow the factor (공포 · 화염 · 화이트아웃 7 / 5). DUNGEON_HAZARD §HAZARD THREAT / §NEUTRAL-FIT / DUN-Q71,
  ITEM §COUNTER LADDER and §ACTIVE CATALOG, NPC_TRAIT Hazard Traits.
- **Final mean-gap penalty 1.70 → 2.50**: a D30 party cleared with no Item at all about one Run in five. FINAL_EXPEDITION
  §INDIVIDUAL FINAL POWER / FINAL-Q72 / FINAL-Q73.
- **Store Capital 1 / 2 / 3 / 3 / 3% and 훈련소 제휴 간판 40%** (was 4 / 5% at the top and 65%): a player who reaches D30
  every Run filled all four Slots by about Run 5. META §Day-reach conversion rate, §sign; COPY_AUDIT decoration line.
- **용사의 곡주 trade-off 기동 -4 → 강인함 -3**: 기동 widened the 어둠 gap of its own Gate. **세계수 생환부적 400 / 800 → 300 / 600**:
  it covered a weak departure at about half of 귀환석. Other Counter values and prices stay after a context-aware price review
  (`reports/item-price-v2913/README.md`, `reports/counter-ladder-v2913/README.md`). ITEM §ACTIVE CATALOG, §세계수 생환부적,
  §ITEM ROLE NOTES, §PRESENTATION ORDER.
- **환경 대응 per Hazard from T2**: on a two-Hazard Gate the SALE readout and the forecast pin name each Hazard with its own
  frozen state, since judgment sums both gaps; states only. The cell stays two lines (desk: states side by side under the
  label; phone: two rows beside it, names right-aligned). SALE §always-on outlook, UI_UX §SALE outlook / §FORECAST PIN / UI-Q109.
- **Measurement basis `reader`** (User 2026-10-01): progression and balance are read with `reader`, `expert` (reader plus
  the User's habits, on the User's account) its upper reference. Harness defaults, `tests/simulation.cjs`, the measurement
  scripts and tools follow. META §Approved progression expectation: 1st Decoration Run 4, four Slots Run 9 (`reader`
  4 / 5 / 7 / 9, `expert` 4 / 6 / 7 / 9).
- Shipped re-measure (300 seeds; `reports/balance-proposal-v2912.md` §10): `reader` D30 12.3%, clear 7.7%, Store Capital
  301 a Run; `expert` (0930 account) D30 30.3%, clear 18.0%, 489 a Run.

## Docs / hygiene after v2.9.12 (User 2026-09-30, no build change)

- **Versions closed**: v2.9.11 and v2.9.12 heads and SPEC_INDEX status marked closed; tags stay the User's.
- **SPEC_INDEX consolidated**: the closed-version sections (v2.8 PURPOSE, v2.8 / v2.9.0 RELEASE ACCEPTANCE, v2.9.1 BALANCE,
  the per-version NEXT VERSIONS routing) and the per-version header status history leave the index; the status history is
  §RELEASE RECORD above, the per-version routing is each version's section below, and the game feel contract keeps its
  routing as SPEC_INDEX §GAME FEEL CONTRACT — ROUTING.
- **Pre-change wording out of the owners**: COPY_AUDIT drops its 이전 / 기존 / 삭제 blocks (only `현재` is copy truth);
  UI_UX, UI_UX_QA, DUNGEON_HAZARD, DUNGEON_ITEM_QA, ECONOMY_ORDER(_QA) and ITEM drop the superseded values and
  "it was / used to / since v2.9.x" clauses from their decision parentheticals. Rules and current values are unchanged;
  each ledger accounts every line (`npm run ssot:check`).
- **SSOT_AUDIT** (the closed v2.8 audit record) moves unchanged to `archive/v2.8/`.
- **SSOT re-review — current spec only** (User 2026-09-30: "SSOT는 현재 사양 위주로"): `design_ssot/` goes from 105 files /
  2.0 MB to 18 files / 0.91 MB.
  - Removed: `history/` (79 pre-v2.8 owner files), the 21 consolidation ledgers, the ledger check and `npm run ssot:check`
    (git keeps them; AGENTS §10 now forbids old wording / superseded values / change history inside an owner).
  - Moved to `archive/`: SOURCE_ADOPTION_QA (closed v2.8 defect record) and this CHANGELOG's v2.8.0 ~ v2.9.11 sections.
  - Merged: each QA file into its owner's `## QA — ACCEPTANCE` (ids unchanged; DUNGEON_ITEM_QA split into DUNGEON_HAZARD
    and ITEM), 00_GAME_CORE into SPEC_INDEX §GAME CORE.
  - Every owner rewritten as the current spec: decision provenance, change history, superseded values, measurement
    narratives and in-file duplicates out; rules, values, ids, QA criteria and cited headings unchanged. UI_UX went deeper
    (User: "깊게 줄임"): construction px / ms that Source carries and no test asserts became behaviour + representative values.
  - Stale Canonical text fixed to the rule and Source (User: "코드에 맞춰 문서 정정"): DUNGEON_HAZARD Day-term anchors on the 1.45
    slope, DUN-Q75 중상 = 0; RELIC QA lines carrying replaced values (pool 32 / 13 / 7, ids 31 / 32, 대형 냉장고 60G, REL-Q73 / 74).
- **Archive**: closed-version reports and finished-question tools moved from `reports/` · `tools/` to `archive/v2.9.x/`, live
  references follow. Then the archive kept only what carries a decision or an insight, or what a live file points at; raw
  result JSON, unrunnable old tools, the legacy harness, finished handoffs and applied checklists were removed (git history
  keeps them; `archive/README.md` lists what stays).

## v2.9.12 — balance review line, v3.0 prep quick patches (User 2026-09-29 ~ 2026-09-30; CLOSED, merged by PR #31 and PR #32)

- **First-Run lessons, DAY 1 Counter and no Death on DAY 1~2** (balance review session, User 2026-09-30; from a talk on
  teaching by level design - learn by play, not text): the account's first Run finds one Common Item that counters the first
  Gate's Hazard in the DAY 1 warehouse, so the first sales can find the Counter rule and the Night shows it working; on its
  DAY 1~2 a Death roll settles as 중상. Measured with every Run as a first Run (`reader` 3,000, same seeds): DAY 1~2 Deaths
  0.21 → 0 a Run, D1~10 Death-limit endings 20.0 → 17.2%, D10 reach 85.4 → 89.3%, D30 17.2 → 18.0%, clear unchanged 11.7%.
  DAY 3: an injured adventurer comes first with one 구급키트 in the warehouse (73% of 40 fresh first Runs had someone
  injured), and a returning customer comes on payday - +200G this visit, 150% intent +20%p, the line
  `“오늘 보수 받았어요. 값은 신경 안 써요.”` (85% of those Runs). COPY_AUDIT §26-1. Later Runs are unchanged; the Run's
  stream is untouched; the bots and the trajectory switch it off (`lessons=false`), so balance measurements do not move
  (`reader` 300 seeds identical). CORE_RUN §FIRST-RUN LESSONS, CORE_RUN_QA RUN-Q81; ledgers; tests revision.
- **END replay line above 도감에서 보기, in bold** (User 2026-09-30): what the Run left behind (`점포 자본으로 새 장식을 들일 수
  있다.` / the best-Day line) reads before the codex link, 15px bold. UI_UX §END — REPLAY NUDGE; ledger; tests ui-guard.
- **NIGHT discovery lines** (balance review session, User 2026-09-30): rules are named once per account by a `점주 안내`
  coach mark on the NIGHT record of the first expedition they acted on (shown like the tutorial, no inline line; User
  2026-09-30), and kept in the 발견 수첩 - 부상 출발, 피로 10 이상,
  a Hazard Item that lowered a Hazard, 만반의 준비 turning away a Death, a 대성공 that paid the store bonus; and the first Death
  record carries the Death-limit mark, the one exception to its closed payload (User 2026-09-30). NIGHT_CLOSING §DISCOVERY LINE, COPY_AUDIT §26-2; ledger; tests revision. Balance unchanged (`reader` 300 identical).
- **Pre-sale coaches retired for 피로 · 대성공 · 만반의 준비** (User 2026-09-30: one place teaches each rule): the SALE marks
  `supply`, `great` and `prepared` and their anchors (the tray's `.fatigue`, the Bag's `.prepared`) are gone; the NIGHT
  discovery lines teach them. UI_UX §GREAT SUCCESS / §만반의 준비 TUTORIAL, UI_UX_QA, COPY_AUDIT §3-3 / §3-5 / §3-7,
  COPY_WORLD_VOICE §TUTORIAL COACH COPY; ledgers; tests ui-guard; qa-visual drops the Great Success coach capture.
- **iPhone Safari touch and sound** - UI_UX §TOUCH / INTERACTION, §AUDIO FEEDBACK — PHASE BGM, UI-Q-v29-49: the web build was
  checked for iPhone Safari (`archive/v2.9.11/ios-safari-v2911.md`). A quick second tap no longer zooms the page (pinch zoom stays), a
  long press on art opens no save-image menu, and coming back from a call or another app resumes the sound without waiting for
  a tap. The silent switch keeps Safari's default (the game is silent; another app's music is never stopped). No gameplay change.
- **D30 sheet drops no-effect Insurance** - FINAL_EXPEDITION §Final-specific Item boundary (User 2026-09-29): the Final prep
  shelf blocked 구급키트 / 귀환석 / 세계수 생환부적 as it should, but the D30 order sheet still offered them unmarked (207 of 800
  measured D30 sheets, 26%) - D30 has no SALE, so each was Gold with no use. The D30 sheet, rerolls included, no longer offers
  them; D30 Store Supports already worked this way and were rechecked (17-support exclusion set matches RELIC).
- **A closed Gate stays on the list, `오늘 폐쇄`** - EVENT §52, COPY_AUDIT §13-52 (User 2026-09-30: "폐쇄됐을 때 그냥
  없어지던데 ... 폐쇄됐다는 정보가 전달되도록"): the Gate 게이트 임시 폐쇄 closes was simply gone, so the player could not
  tell which one. It stays on the MORNING board, in the `위험 보기` window and on ORDER's `오늘` line, faded with its name
  struck and one `오늘 폐쇄` stamp, no Hazard rows. It still takes no visitor, expedition or order (simulation unchanged).
- **END: `이 점포의 기록`** - UI_UX §END — THIS RUN BLOCK, COPY_AUDIT §10-4, UI-Q-v29-54 (User 2026-09-30, A안; `reports/v3.0-prep.md`
  §9-7 F1 / F2): the END tape now says what kind of store this Run was - one five-row block before the settlement: 버틴 날,
  손님 · 단골, 돌아오지 못한 사람 (a number, 0 included), 가장 성장한 손님, 원정 · 대성공. No new save field; the
  settlement and the replay line are unchanged.
- **Coach diet** - UI_UX §TUTORIAL — COACH DIET / §SALE PRICE LESSONS / FIRST-ORDER COACH ORDER / FIRST STORE SUPPORT,
  COPY_AUDIT §3-4 / §3-7 / §26-3, COPY_WORLD_VOICE §TUTORIAL COACH COPY, UI-Q-v29-53 (User 2026-09-30, from the §9-6 review in
  `reports/v3.0-prep.md`): one rule, one place. 12 marks the screen already says are retired (MORNING 방문객 · 게이트, DAY 0
  card · key, ORDER gates · stock · offer · quantity · 후보 교환, SALE Hazard · outlook, NIGHT); two words replace
  two of them (`창고 · 본사 기본 상품 N종`, `도착 시 전투 전망`); price is taught after the first 150% refusal and the first
  50% sale; the CLOSING mark keeps its first clause. Kept before the fact: 점포지원, Deep, II / FIRE Gate, 발주 확정,
  destination, Stats, Bag, returning customer (the tap to the notebook), 토벌 전망 (User: what is paid for or decided must
  be known first).
- **II Gate and FIRE Gate lessons** - UI_UX §GATE TIER / FIRE GATE TUTORIAL, COPY_AUDIT §3-10, UI-Q-v29-52 (User 2026-09-30):
  two contextual MORNING marks on the Gate plate, once per account - the first two-Hazard Gate (`II 게이트부터는 위험이 두
  가지다. 위험마다 버티는 능력치가 다르다.`) and the first FIRE Gate (`화염 게이트는 위험이 하나뿐이지만, 요구 전력이 더
  높다.`). The rule only, never an Item. Tests ui-guard.
- **A FIRE pair's Boss stands stronger** - FINAL_EXPEDITION §FAMILY-PAIR BALANCE AUDIT (FIRE PAIR), BOSS (User 2026-09-30,
  "다른 위험과 동일하게"): a Final pair that holds FIRE has 3 Hazards, not 4, and cleared more often (`reader` 3,000: 74.3 ±6.3%
  against 65.5 ±5.1%). Such a pair now adds 18 to every Boss's effective Boss Power - the amount that levels the two on the
  same recorded Finals. The Hazard Pool and the mean-gap penalty are unchanged. Tests final.
- **D30: read the candidates while ordering, a notebook in FINAL 준비** - FINAL_EXPEDITION §D30 PLAYER FLOW, UI_UX §PARTY
  SELECTION, COPY_AUDIT §14-9, UI-Q-v29-51 (User 2026-09-30: "누구 있는지 알아야 템을 선택하니"): the last order now carries
  `원정대 후보 보기` beside `원정대 선택` - the candidates and their notebooks, read only; the pick and 원정대 확정 stay on the
  next step. FINAL 준비 carries `자세히 보기` under the Stat grid, the supplied member's notebook (Traits, records).
- **END replay line: a best 총매출** - META §BEST DAY, UI_UX §END — REPLAY NUDGE, COPY_AUDIT §10-3, UI-Q-v29-37 (User
  2026-09-30, "최고 총매출만"): half the endings printed no replay line, most of them after the Decorations were collected,
  when a best Day was the only line left (`reports/v3-prep-measure-v2911.md` §2). The account now also keeps its best 총매출
  (`bestSales`, recorded like the best Day), and a Run that beats it prints `지금까지 가장 많이 판 점포다 · 총매출 {N}G` -
  third, after a Decoration newly in reach and a best Day; still one line at most, only when the Run opened nothing.
- **The desk draws its own SALE** - UI_UX §SALE — DESK LAYOUT, UI-Q-v29-25 / UI-Q-v29-18 (User 2026-09-30, "설계안으로 가되
  PC판 전용으로 분리해서"): on a desk SALE is its own screen, built from the phone's pieces - the customer about 1.3x larger (card 300 -> 390 px at 1280)
  behind the counter with the state, outlook and destination beside them, then under the counter top the ledger, the tray
  in the middle on the counter, and the shelf. The tray no longer covers the shelf (1280: 4 rows beside a filled tray, was
  3). Phones unchanged; crossing 1024 mid-SALE draws the other layout.
- **A wider desk stage** - UI_UX §DESK STAGE WIDTH (User 2026-09-30, "상한은 넓혀", every desk screen): the stage cap goes
  1120 -> 1440 px, and never past 1.65 times the stage's height (a 1366 x 680 laptop keeps 1120: wider, the new-store
  scene cropped until the Capital plate sat on the Action). FINAL's Boss room and NIGHT's window band keep 1120 - both are
  drawn at the width they are given and, wider, pushed decisions under the fold or ran under the rail.
- **A tighter counter tray on a short phone** - UI_UX §SHORT PHONE, UI-Q-v29-18 (User 2026-09-30, "트레이 압축"): under 700
  high a filled tray left 2 / 1 / 1 shelf rows above it at 640 / 597 / 548. It takes one tighter step there - same lines,
  keys and order, less air, a smaller icon (165 -> 124 px) - and leaves 3 / 2 / 1 rows.
- **Buying a Decoration keeps the panel where it was** - UI_UX §STORE MANAGEMENT, UI-Q-v28-1 (User 2026-09-29: "구매 누르면
  스크롤이 위로 올라감 ... 이게 바로 산 건가 헷갈리게 됨"): every step of a purchase or an equip redrew the panel and put its
  scroll back at the top. The pressed row now stays on the pixel it was on (구매, 구매 확정, 취소, 적용, 해제).
- **The 간판 tag clears the title on a Galaxy** - UI_UX §SHORT PHONE, UI-Q-v29-49 (User 2026-09-29, screenshot at 360x597):
  an empty 간판's tag carrying `들일 수 있음` is wider than the piece and still ran over the title logo. On a short stage the
  title is a step smaller (180 px), that tag runs from the piece's edge nearest the title toward the screen's edge and hangs
  from its spot's top, under the build mark; an equipped 간판 keeps the full title's gap so its name tag clears the branch
  plate. The visual gate adds 360x597.
- **iPhone SE supported** - UI_UX §SHORT PHONE, §LIVE STORE DECORATION SEATING, UI-Q-v29-49 (User 2026-09-29, "SE까지
  지원"; `archive/v2.9.11/ios-safari-v2911.md` batch 2): at 375x548 (an SE with Safari's bars) the cropped painting brought the title
  down onto the 간판's spot, so its tag covered the logo; the 새 점포 준비 status line fell off the board; MORNING cut the
  Event's effect line and hid the Gates under the fold. On a portrait stage under 640 high the MORNING board now runs down
  to just above the till (a 벽면 piece is behind it on a full day - the situation first, the User's call), the 새 점포 준비
  note takes the short desk's tighter step, and the 간판 keeps the gap from the title. The visual gate runs every screen at
  375x548 too. Nothing changes at 640 high or more.
- **Effects flattened as a phone plays them; nothing tears** - UI_UX §AUDIO FEEDBACK — SFX LEVELS, UI-Q-v29-47 (User
  2026-09-29, from play on a Galaxy: "still uneven, and some of it tears"): the round-3 fit counted bass a phone speaker
  cannot play, so the low cues were raised until they tore while still sounding small - on a phone 사망 sat 25 dB under its
  tier and the Boss card's `rumble` 34 dB under. The measurement now reads a cue as a phone plays it (nothing under 300 Hz)
  and keeps a full-range reading beside it. The low cues carry their own overtones (same notes, same pitch) and their own
  low cut; the effects bus drops what is under 120 Hz; a -3 dBFS limiter on the output keeps cues landing together from
  clipping. Every tier comes down 2 dB (result -19 / decision -21 / action -25 / utility -29 / rapid repeat -31), the order
  of the tiers unchanged. Checked: every cue at its tier on the phone reading, none more than 6 dB over it full-range, none
  alone over -4.5 dBFS, the worst moments of cues together under -1 dBFS over their music.
- **Cues that mean different things sound different** - UI_UX §AUDIO FEEDBACK — DISTINCT CUES, UI-Q-v29-47 (User 2026-09-29,
  from play): three pairs meant different things but shared one sound (measured alike 0.75 / 0.997 / 0.993) - the Decoration
  fixture and the FINAL clash, the SLOTH seal-break and the Boss information motif, the CLOSING receipt and the ORDER crate.
  Each got its own synthesised sound, checked against its neighbours (all below 0.6). The UI click and the quantity ticks,
  masked by the music even at their tier's loudest, are new bright synthesised sounds now heard over it; their two recorded
  files no longer ship. The SALE price modes and the quantity pair stay one family on purpose.
- **The ending waits for its result** - UI_UX §AUDIO FEEDBACK — PHASE BGM, §ENDING CUE, UI-Q-v29-47 (User 2026-09-29): the
  ending track must not tell the result early. The screen the ending came from keeps its music (BOSS through the Final and
  the clash, CLOSE after a bankruptcy, NIGHT after the Death limit) until the result lands - the seal's landing, or one beat
  on an ending without a seal - and then SUCC / FAIL comes in with a new ending cue: `endwin` for a clear, `endfail` for any
  failed ending.
- **ORDER floating box folds** - UI_UX §DEATH LIMIT — ALWAYS VISIBLE (one exception) / §ORDER — FLOATING TODAY LINE,
  UI-Q-v29-29 (User 2026-09-29): with the warehouse beside the form the order rows could feel squeezed, so the floating
  box folds - the Death line too - to a `요약` chip and back; folded is the account's choice, kept across Days and reloads.
- **ORDER warehouse panel** - UI_UX §ORDER — WAREHOUSE PANEL / WAREHOUSE DISCLOSURE, UI-Q-v29-50 / UI-Q-v29-17 (User
  2026-09-29): scrolling down the offers, the player compares them with the warehouse, which sat above them in the form. It
  is off the form now and held apart like a game's storage - a steel rack of 칸, one cell per slot, a held unit in each
  (icon, days left), the empty cells the room left: on a desk the form is set left and the rack is large beside it; on a
  phone a `창고` handle on top of the dock opens the rack as a sheet rising from it (45% of the screen at most) without
  locking the form. Open or folded is still the account's choice (starts
  folded). The ORDER confirm crates drop into the new cells of the rack on screen.
- **1+1 ends on a Reroll** - EVENT §02 / §10 (User 2026-09-29, bug report): a Reroll named a new 1+1 SKU on every new
  sheet, so the player could roll until the wanted SKU carried it. HQ now names it on the Day's first sheet only; a Reroll
  ends the promotion. 암시장 keeps its special slot through a Reroll (its Item is drawn again), by the User's call. The
  other twelve offer-side Events are Day-wide ("오늘 모든 발주" / a whole category / the sheet size) and rightly hold on a
  rerolled sheet.
- **ORDER floating rail carries 발주 후** - UI_UX §DEATH LIMIT — ALWAYS VISIBLE (ORDER — FLOATING TODAY LINE), UI-Q-v29-29
  (User 2026-09-29): scrolled past the ledger, the floating box adds the ledger's `발주 후` last, under `오늘` - the number each
  tap moves, nearest the rows being tapped. The box is tightened to one type ladder: `사망` / `오늘` / `발주 후` as labels in
  one column, every value in one face and size. Each copy is now measured against the stuck box's real lower edge and set again
  when the box grows, which also closes a 10~20 px stretch where the `오늘` block sat under the box with no copy.
- **BGM / SFX mix** - UI_UX §AUDIO FEEDBACK — PHASE BGM / SFX LEVELS, PRESENTATION §Mix, UI-Q-v29-47 (User 2026-09-29, from
  play, two rounds): most decision and result cues landed under the music, and the cues themselves were authored 24 dB
  apart - some jumped out, some vanished. The music comes down to -30 LUFS (NIGHT, the densest track, -33), and every cue
  gets its own fitted level by tier - result -17 / decision -19 / action -23 / utility -27 / rapid repeat -29 - measured
  offline through the real engine and checked against the music it is heard over (`tools/qa-sfx-mix.cjs`, in
  qa:runtime). No timbre changed. `ui` and the quantity ticks reach their tier's ceiling still masked: a User decision on
  their sound. A phase change fades the old track out over 1 s, starts the next one after it and raises it over 1.5 s.
