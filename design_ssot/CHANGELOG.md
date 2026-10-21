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
| v2.10.0 | 2026-10-03 | PR #52 (with v2.9.14 quick patch 1); quick patch 1 PR #54; quick patch 2 PR #55; quick patch 3 PR #56 | `v2.10.0` (set by the User) |
| v2.10.1 | 2026-10-03 | PR #64 (`ui/design-trim`), docs PR #66; version bump PR #67 | `v2.10.1` (set by the User) |
| v2.10.2 | 2026-10-04 | PR #75 (`ui/design-trim`: #68~#74); version bump PR (this one); quick patch 1 PR #80 | (the User sets it; not yet on origin) |
| v2.10.3 | 2026-10-04 | prologue PR #87, `ui/design-trim` #88~#90; 바가지 + version PR #92 | (the User sets it; not yet on origin) |
| after v2.10.3 | 2026-10-04 | PR #94 (`ui/design-trim`), `main` PR #95 (`ffca808`); PR #96 (`ui/design-trim`), `main` PR #97 (`cdc01dd`); no version bump yet | - |
| v2.11.0 | 2026-10-05 | PR #111 (점포지원 등급 · 운영형 장식; the after-v2.10.3 work on `main` above ships in it) | (the User sets it) |
| v2.11.1 | 2026-10-05 | this patch's main merge PR (`codex/minor-ui-v2111`) | (the User sets it) |
| v2.12.0 | 2026-10-09 | PR #112~#142 on `main` (balance #116 #123 #135, UI overhaul and text/source audit #132, coaches #120 #137 #139, sounds #119 #136 #142, night results #126 #140 #141, loading #134); version bump PR #143 | `v2.12.0` |
| v2.12.1 | 2026-10-10 | PR #144~#155 on `main` (EXP curve #145, investor bot #146, game title #150 #152 #153, app wrapper and app-ready game code #147 #148 #149 #151 #154, Epic / Equipment trim #155); version bump PR #156 | (the User sets it) |
| v2.12.2 | 2026-10-10 | PR #157 on `main` (newcomer Level band, Epic / Equipment values); version bump PR #158 | (the User sets it) |
| v2.12.3 | 2026-10-10 | Tier I Gate requirement and version bump in one PR #164, after measurement-only #159 #160, save-file name #162 | (the User sets it) |
| v2.12.4 | 2026-10-10 | Death limit, Tier II share, late Gate slope and version bump in one PR #166, after GAME_VISION #165 | (the User sets it) |
| v2.12.5 | 2026-10-10 | Store Support pure draw and version bump in one PR #168 (partly walked back in v2.12.6) | (the User sets it) |
| v2.12.6 | 2026-10-10 | Store Support draw: cool-down, reroll and D30 exclusions restored; version bump in one PR #169 | (the User sets it) |
| v2.13.0 | 2026-10-10 | Gate rework (combat by Day, Tier by Hazard) and version bump in one PR #170 | (the User sets it) |
| v2.13.1 | 2026-10-11 | Night reversal Item fix and version bump in one PR #171 | (the User sets it) |
| v2.13.2 | 2026-10-11 | Early-mid Gate Day-term hump, investor potion rule and version bump in one PR #172 | (the User sets it) |
| v2.13.3 | 2026-10-11 | Save safety fixes, app Back / background sound / start failure, app-only messages and version bump in one PR #174 | (the User sets it) |
| v2.13.4 | 2026-10-11 | Save kept across updates (account goes on, an unreadable Run alone is dropped), late cloud answer, and version bump in one PR #176 | (the User sets it) |
| v2.13.5 | 2026-10-11 | Larger 퇴각 / 부상 Wallet reward and version bump in one PR #178 | (the User sets it) |
| v2.13.6 | 2026-10-11 | Android Back exit confirm and version bump in one PR #180 | (the User sets it) |
| v2.13.7 | 2026-10-11 | 퇴각 / 부상 Wallet raise of v2.13.5 halved, version bump in one PR #181 | (the User sets it) |
| v2.13.8 | 2026-10-11 | Night reversal portrait tone fix and version bump in one PR #182 | (the User sets it) |
| v2.13.9 | 2026-10-11 | Item roles rebalance (potion down, Food / Drink and Common Counter up, Tier I Hazard +2), Wallet rollback, Death limit 5 / 8 / 10 and version bump in one PR #183 | (the User sets it) |
| v2.13.10 | 2026-10-12 | 에너지드링크 기동 18 · 190G and version bump in one PR #184 | (the User sets it) |
| v2.13.11 | 2026-10-12 | Known-Hazard Counter guarantee drawn by the Day band (bug fix) in one PR #185 | (the User sets it) |
| v2.13.12 | 2026-10-12 | Early money: Order Rarity D1~7 more Common, operating cost dayBase 170 → 150, Adventurer Rarity names follow the Item names (평범 → 일반, 유망 → 고급; display only) in PR #186 and PR #187 | (the User sets it) |
| v2.13.13 | 2026-10-12 | Decorations: 휴식 바우처 꽂이 first two customers −3, 길드 추천 매대 60%, 명예 모험가 액자 70%, 의무실 현판 50%, 본사 우수 점포 훈장 DAY 0 reroll, and version bump in one PR #194 | (the User sets it) |
| v2.13.14 | 2026-10-15 | Tier II Environment incident probability eased through DAY 15, 정가 refuses less, operating cost 200 / +10, visit Wallet floor back to 30, failure Death CombatDeficit × 0.50 | (the User sets it) |
| v2.13.15 | 2026-10-16 | Meta ladder: 영웅 점포지원 and 상급 / 최상급 포션 reach unlocks, 점포지원 grades 63 / 29 / 8, injured departure +0.15, Gate base 22, Store Capital 3% everywhere, economy / operation Decorations re-tuned, and version bump in one PR | (the User sets it) |
| v2.13.16 | 2026-10-19 | 승천 skeleton (ten cumulative post-clear difficulty levels, META §ASCENSION), first-week Gate ease (DAY 1~9) and expedition-win Wallet 35 + Day × 5, in two PRs merged together | (the User sets it) |
| v2.13.17 | 2026-10-21 | Daily Event chance 40 → 30% and one name for the unattributed expedition accident, with the version bump in one PR; 알뜰 금고 +300 → +100G and 구급품 진열장 투력 +5 → +3% in a second PR | (the User sets it) |


## v2.12.4 — Death limit 6 / 8 / 10, earlier Tier II, one even late Gate slope (User 2026-10-10)

- CORE_RUN §DEATH LIMIT — SEGMENTED: 5 / 8 / 11 → 6 / 8 / 10. The opening ten Days forgive one more Death, the last ten one fewer (META 위령비 +1 now 7 / 9 / 11).
- DUNGEON_HAZARD §Tier generation: Tier II share D8 30 → 40%, D12 35 → 50%, D13 42 → 52% (T1 60 / 50 / 45%); DAY 7 and earlier unchanged. The middle of the Run asks for growth sooner.
- DUNGEON_HAZARD §GATE POWER: SuccessEase is one 0.90 on every ordinary Day (the × 0.95 step on DAY 22 is gone) and the DAY 21+ Day-term slope is 1.05 → 1.54, so the late Gates climb evenly and DAY 29 asks about 2% more than before (Tier I DAY 22 48.1 → 46.5, DAY 29 55.1 → 56.2).
- Measured against main, investor fresh 2000 (same seeds): D10 reach 78.5 → 89.5%, mid (D8~20) success 43.2 → 41.3%, clear 5.4 → 2.8%, clear once DAY 30 is reached 46 → 48% (Boss held), lucky / normal clear ratio 2.2 → 1.0; investor Decoration trajectories (400 × 10 Runs) first clear median: economy 10th, survival 8th, operation and none past the 10th Run. Potion −15% / −10% with Hazard and Counter +2 / +1 was measured and left out (clear once reached 48 → 37~38%). Log: `reports/v2100-measure/mid-difficulty-20261010/`.

## v2.13.17 — Daily Event chance 30%, one name for the unattributed accident (User 2026-10-21)

Measurement: `reports/v2100-measure/event-30-20261021/`.

- EVENT §발생 확률: `dailyEventChance` 40% → 30% (about 6.3 Events by DAY 30 instead of 8.4; Runs with 10 or more
  Events 31% → 7%). The User found Events too frequent: their saves met 13 and 11 by DAY 30. 소문 수집 게시판 stays 100%.
  Investor fresh 1000 (main e7f71d7): D1~7 success 52.0 → 52.2%, median end day 15 → 15, D30 5.1 → 6.3%, clear 1.7 → 2.6%,
  deaths / Run 7.40 → 7.31, cash / Day 21 → 21G. Trajectories 200 × 10, first clear within 10 Runs: none 14 → 10%, economy
  68 → 71%, survival 52 → 40%, operation 26 → 25%, best 61 → 50%; first DAY 20 on the 3rd Run → 3rd~4th.
- META 알뜰 금고: the Day's first two customers +300G → +100G Wallet each (User 2026-10-21: 「100골드로 가고」). The economy
  route cleared first far ahead of the others. Trajectories 200 × 10 on main deb36cf, first clear within 10 Runs at 300 / 150 / 100G:
  economy 71 / 63 / 60%, best 50 / 56 / 51%, survival · operation · none 40 · 25 · 10% unchanged; economy cash / Day 55 / 50 / 44G,
  deaths / Run 7.3 in all three. Fresh Runs wear no Decoration and are unchanged. Measurement: `reports/v2100-measure/thrift-safe-20261021/`.
- META 구급품 진열장: 만반의 준비 투력 × 1.05 → × 1.03 (User 2026-10-21: 「진열장 3퍼는 일단 넣는걸로」); Death × 0.60 stays.
  A third run of the User's (save mvhh3bss, only this Decoration) reached D29, and the +5% turned about five lost D1~10
  expeditions into wins. With 금고 100G, trajectories 200 × 10, first clear within 10 Runs +5 → +3%: survival 40 → 32%,
  best 51 → 50%, economy · operation · none 60 · 25 · 10% unchanged; survival first D30 74 → 62%. Candidate measured and kept
  out: 원정 지원금 간판 50 → 25% on top (economy 60 → 57%, best 50 → 45%, D25 balance on the economy route 2866 → 2844G).
  Measurement: `reports/v2100-measure/aid-cabinet-20261021/`.
- COPY: the first-accident coach line calls the accident with no Hazard behind it 「예상치 못한 사고」, the same name the
  NIGHT Outcome sentence uses (was 「운 나쁜 사고」).

## v2.13.16 — 승천 skeleton, with the first-week Gate ease of the same release (User 2026-10-19)

One version for two PRs the User merges together (User: 「같이머지하자」). Measurement of the Gate ease: `reports/v2100-measure/v21315-early-gate/`.

- DUNGEON_HAZARD §Ordinary expedition Wallet reward: `35 + Day × 6` → `35 + Day × 5`.
- DUNGEON_HAZARD §GATE POWER: the opening week eases — SuccessEase 0.90 × EarlyEase 0.96 on DAY 1~5, 0.97 / 0.98 / 0.99 / 0.99
  on DAY 6~9, unchanged from DAY 10 (User: 「d9까지 조금 너프 … 대신 돈을 좀 쪼이고」). On the User's two fresh Runs Lv1~2
  customers stayed at 0.83~0.90 of the D3~5 Gate with Items while the Gate climbed 26% from D1 to D5.
  Measured with the Wallet change, investor fresh 1000: D1~7 success 43.8 → 52.0%, median end day 10 → 15, D30 3.4 → 5.1%,
  clear 1.0 → 1.7%, D20 balance 1567 → 1533G; trajectories reach D20 first on the 3rd Run instead of the 4th~5th.
- BOSS §GREED — SALES TARGET: `greedRevenueTarget` 30,000 → 40,000G and `greedShortfallCap` 30 → 40 (maximum effective
  Boss Power 266, was 256.5). At 30,000G GREED met its target in most Runs and became WRATH, the Boss with no Trait.
  Same 1,053 investor DAY-30 parties against every Boss (main 12fd11f): GREED 63.4 → 57.8% (WRATH 63.8, PRIDE 53.5, GLUTTONY 46.0);
  parties under 32,000G 48 → 39% (PRIDE 39); 40,000G and above unchanged at 85%. `reports/v2100-measure/greed-boss-20261019/`.
- META §ASCENSION: ten cumulative levels opened by clearing (first Boss clear opens 승천 1), picked on the NEW STORE screen
  (`◀ 승천 N ▶` around the name plate, one board note, one coach mark). Effects are the first frame, not measured; numbers live in `D.ascension`.
- Measured (investor, after the first clear, traj 100 x 20, `reports/v2100-measure/ascension-20261019/`): with 적 전체 +2% on 승천 1 / 5 / 9, DAY 30 reach fell 47.9% (승천 0) -> 34.8% (1) -> 8.5% (5) -> 1.9% (9). 적 전체 is +1% each (User 2026-10-19), which gives 45.1% (1) -> 14.9% (5) -> 8.1% (9); clear once DAY 30 is reached stays near 60% through 승천 2. 승천 3 (ORDER offers 4) is the other large step (-19 points of reach).
- GLOSSARY: 승천.

## v2.13.15 — Economy: thinner win Wallets, one shared extra-visitor roll, fourteen supports retuned (User 2026-10-18 ~ 19)

The User's third account Run cleared on the 3rd Run: the extra visitors (길드 추천 매대 every Morning + 단체 주문 창구) and
the expedition-win Wallet kept every purse full, so many cheap Items sold at full price all Run long. Merged into v2.13.15
(User: 「버전 일단 구대로」).

- DUNGEON_HAZARD §Ordinary expedition Wallet reward: `35 + Day × 8` → `35 + Day × 6` (v2.13.16 lowers it to `× 5`).
- RELIC §VISITOR SUPPORT COMPOSITION: 지역 거점점 계약, 단체 주문 창구 and 길드 추천 매대 share one Morning extra-visitor roll —
  the +1 chances added up, then hub's +2 band, capped at 100% together; at most +2 extra visitors a Morning.
- META 길드 추천 매대: every Morning +1 → 50% (inside the shared roll).
- RELIC 단체 주문 창구: the +15G sale commission from the Day's 5th sale stops at 60G a Day.
- RELIC 지역 거점점 계약: the overheadBase +10% surcharge is removed.
- RELIC 왕도 프리미엄 인증: HQ commission 40% → 20% of the charged 150% price.
- RELIC 24시간 신선체계: Food / Drink native Core-Stat +50% → +30%.
- RELIC 평생 단골제: 단골 Core Stats +10% → +6%.
- META 단골 감사 현수막: 투력 +5% → +3% per 10 단골도, at most +20%. META 의무실 현판: heal chance 50% → 25%.
- META 훈련소 제휴 간판: spawn Level +1 chance 55% → 30%.
- RELIC 희귀상품 입고 계약: Rare+ ORDER weight ×1.7 → ×1.5.
- META 원정 지원금 간판: extra budget 75% → 50% of the purse. META 알뜰 금고: +400G → +300G. META 휴식 바우처 꽂이: first 2 → first 3
  customers.
- RELIC 즉석식품 코너: operating cost +10% → +15% of overheadBase. RELIC 길드 보증 진열대: HQ covers 30% → 50% of the charged price.
- Bot (reader / investor): with no 영웅 card on a Store Support sheet, the free redraw (지원 교환 쿠폰함) is always taken and one paid
  redraw only with 1500G+; among several 영웅 cards the one with the larger measured effect is bought.
- COPY_AUDIT §9-5 / §11-5 · 6 · 10 · 13 · 22 · 23 · 25 · 26: the cards read the new numbers; the three extra-visitor cards add
  「손님이 더 올 확률은 다른 효과와 합쳐 100%까지다」.
- Measured (`reports/v2100-measure/v21315-economy/`): fresh 1000 D30 reach 5.5 → 4.7%, clear 2.1 → 1.5%, cash / Day 27 → 16G;
  first DAY 30 within 10 Runs none 29 → 22%, economy 63 → 58%, survival 78 → 52%, operation 34 → 24%. The User's 3rd Run
  continued from DAY 15 (200 × bot): living NPC Wallets at the end 5104 → 3504G (median), win Wallet per Day 947 → 688G.
  Per-support on / off tables (fresh 1000 and the DAY 15 save × 400) are in the same folder. 훈련소 30%: fresh D20 reach
  +31.9 → +15.7%p; 현수막 20% cap: DAY 15 save D30 +22.5 → +18.3%p; 희귀상품 입고 ×1.5: DAY 15 save D30 +5.5 → +3.0%p, cash
  / Day unchanged (+40G). With the new bot (`final4.log`): fresh 1000 D30 reach 3.4%; first DAY 30 within 10 Runs none 27%,
  economy 52%, survival 57%, operation 30% (the bot change alone: `bot7-oldnumbers.log`).

## v2.13.15 — SALE shelf tie order held, receipt stub moved (User 2026-10-18)

- UI_UX §SALE — SHELF ORDER: Items tied on Hazard lead, kind, discard day and Rarity keep the order first seen that Day, so a sale no longer swaps two drinks (e.g. 생수 / 진정 허브티).
- UI_UX §SALE — TRANSACTION RESULT STUB: the receipt sits just under the customer's status panel instead of over the shelf, and any tap or click dismisses it.

## v2.13.15 — Meta ladder: a fresh Run is hard to take far, and the account climbs Run by Run (User 2026-10-16)

The User's picture: reaching the Boss should mean about a 60% clear, but a fresh Run reached DAY 30 too easily. Reaching
DAY 30 itself should be hard at every stage, and the account should grow so a player reaches DAY 20 around the 3rd ~ 4th
Run; an economy or operation Decoration route alone should also climb. The Boss is left as it is (tuned later on the User's saves).

- RELIC §GRADE: per-card grade 일반 60 / 희귀 28 / 영웅 12% → 63 / 29 / 8%.
- RELIC §GRADE / META §REACH UNLOCK: only unlocked 영웅 supports are drawn. A fresh account has 물류 본부계약 only; each Run
  that reaches DAY 15 opens one more of 응급 처치대 · 지역 거점점 계약 · 왕도 프리미엄 인증, each Run that reaches DAY 25 one more of
  평생 단골제 · 원정 작전실 · 24시간 신선체계 (one per pool per Run). 본사 우수 점포 훈장's DAY 0 영웅 pick ignores the unlock.
- RELIC §GRADE / META §REACH UNLOCK — 희귀 first (User 2026-10-16, merged into v2.13.15): a fresh account opens four 희귀
  (본사 추가발주권 · 단체 주문 창구 · 귀환 적립제 · 새벽 회수 계약); the other six open one per reach Day (DAY 5 · 10 · 15 · 20 · 25)
  a Run gets to, and only once none is locked do DAY 15 / 25 open 영웅. A Run that ends on DAY 12 now opens two supports
  instead of nothing. Measured against v2.13.15 main (investor, fresh 1000 + trajectory 200 × 10, same seeds): fresh D10 /
  D15 / D30 reach 60 / 36 / 5.6 → 60 / 38 / 5.5%, clear 2.6 → 2.1%; first DAY 20 still the 4th Run on every route; first
  DAY 30 within 10 Runs none 26 → 29%, survival 78 → 78%, economy 70 → 63%, operation 32 → 34% (±3~5%p noise). Logs
  `reports/v2100-measure/v21315-ladder/rare-unlock-{base,r1}.log`.
- META §REACH UNLOCK / ITEM: 상급 포션 opens on the account's first DAY 15 reach, 최상급 포션 on its first DAY 25 reach; once open
  they follow their ordinary appearance rule from that same Run. The toast reads `새 상품 해금` / `새 점포지원 해금` / `본사 해금`.
  An older account is seeded from its Best Day (≥ 15: 상급 포션 + 응급 처치대, ≥ 25: also 최상급 포션 + 평생 단골제).
- DUNGEON_HAZARD §ORDINARY EXPEDITION FAILURE DEATH RISK: the injured departure term +0.10 → +0.15, its cap 0.60 → 0.65
  (injured and 탈진 together 0.75).
- DUNGEON_HAZARD §GATE POWER — LATE-DAY SLOPE (full required Power): the base 21 → 22 for every Tier I Gate and Tier II / III of every family but the golem,
  whose Tier II / III keep 21 (measured that way).
- META §Day-reach conversion rate: DAY 1~19 2% → 3%, so every band is 3%.
- META Decorations: 원정 지원금 간판 50 → 75%, 명예 모험가 액자 weights [30,34,23,10,3] → [20,33,29,13,5] (above 일반 70 → 80%),
  알뜰 금고 200 → 400G, 길드 추천 매대 60% → every Morning, 단골 감사 현수막 3 → 5% per 10 단골도, 휴식 바우처 꽂이 first two
  customers −3 → −6. 지원 교환 쿠폰함 unchanged (first reroll free). Prices unchanged.
- Bot only (`dist/systems/simulation.js`): with 지원 교환 쿠폰함 worn and no 희귀 / 영웅 card in a window, it uses the free reroll once.
- Measured against main (e220d70), investor, fresh 1000 + trajectory 200 × 10, same seeds: fresh median end DAY 16 → 10,
  D30 reach 14.8 → 5.6%, clear when reached 44.6 → 46.4%, Death by DAY 10 3.73 → 4.31. First DAY 30 within 10 Runs
  (cumulative days at that point, median): survival 96% / 82 → 78% / 104, economy 88% / 77 → 70% / 102, operation
  76% / 75 → 32% / 84, none 71% / 74 → 26% / 81; first DAY 20 within 10 Runs none 73%, economy 90%, survival 94%,
  operation 72% (median 4th ~ 5th Run). Left out after measuring: halving the Tier II incident ease back (no gain, felt
  unfair), Gate base 23 (a wall at DAY 10 every Run), 휴식 바우처 3 customers −5, two free coupon rerolls; Decoration prices
  were not cut. Logs `reports/v2100-measure/v21315-ladder/`.
- BOSS §GREED — SALES TARGET (User 2026-10-16): `greedRevenueTarget` 18,800 → 30,000G and `greedShortfallCap` 15 → 30 (maximum effective Boss Power 256.5, was 242.25); the linear shortfall rule is unchanged, so a Run at the target still faces the WRATH 228 and a Run below it adds up to +30 × the unmet share. DAY 30 gross sales before Final Lock were 26.5k ~ 34.6k in seven full User saves (mean 29.5k, median 27.8k), and on v2.13.15 (investor, 786 DAY-30 Runs) min 24.0k, p10 28.5k, median 32.8k, p90 44.0k, so 18,800 never bit. With the Boss forced to GREED (fresh 1000 + trajectory 200 × 10, same seeds, DAY-30 Runs): trajectory clear 62.7% at the old 15 / 28,000, 62.6% at 30 / 30,000 and 62.5% at 45 / 30,000; the share of Runs that add Boss Power 7 → 24%, mean +0.05 → +0.39. A User Run of 27k adds about +3. Scratch logs, not committed.
- UI_UX §END — CAPITAL METER (User 2026-10-18): the END `점포 자본 정산` ends with a tick bar of the Slot prices the account has not filled yet (진열대 500 / 계산대 750 / 벽면 1,000 / 간판 1,500), filled to `현재 점포 자본`; ticks the capital has passed turn red. Slots only, never a Decoration or a kind. A lost Run used to print the capital with no sense of how far the next Decoration was. UI only, no balance change.

## v2.13.14 — Tier II Environment incidents ease through DAY 15 (User 2026-10-15)

- DUNGEON_HAZARD §Environment incident probability: a Tier II Gate uses 6% + gap × 1.5% on DAY 1~10 and 7% + gap × 1.75% on DAY 11~15 (every other Gate stays 8% + gap × 2.0%). In the User's fresh Runs a Bag that met the Gate's required Power (prepared / required 1.0 or more) still lost 12 of 52 Expeditions, 9 of them to an incident after a won fight; the incident chance for a Tier II Gate with nothing countered reached 34% on DAY 10.
- Measured against main, fresh 1000 + trajectory 200 × 10 (reader / investor, same seeds): investor Tier II success DAY 1~10 29.8 → 33.3%, DAY 11~20 43.6 → 45.3%; Tier I unchanged (53.4 → 53.6%), Tier II stays about 20%p below Tier I. DAY 22~29 success 37.9 → 39.4%, fresh clear 2.7 → 3.0%, Death by DAY 10 3.56 → 3.49. Easing through DAY 20 instead lifted the operation route clear 6.5 → 8.6% and was left out; easing every Tier and DAY lifted fresh clear 2.7 → 4.3% and was left out. Scratch measurement, not kept in `reports/`.
- ECONOMY_ORDER §PURCHASE ACCEPTANCE — 정가 refuses less (User 2026-10-15): the final 정가 chance scale 0.90 → 0.95 and a floor of 0.75 (`pricing.full.finalFloor`). A 정가 offer was refused 35% of the time for an ordinary customer and up to 59% with 구두쇠 + 낯가림; now no 정가 offer is refused more than 25%. 50% 할인 and 바가지 unchanged. Measured against main, fresh 1000 + trajectory 200 × 10 (reader / investor, same seeds): cash per Day 61 → 64G / 57 → 62G, success by Day band and D10 deaths within noise, clear 1.5 → 2.4% / 3.0 → 2.3%.
- ECONOMY_ORDER §OPERATING COST (User 2026-10-15): dayBase 150 → 180 and the late term +12 → +10 G per Day after DAY 15 (`180 + (Day − 1) + 10 × max(0, Day − 15)`). A User Run reached 1730G on DAY 15 with 469G spent (a Store Support window opens every 5 Days), and its fresh Run cleared; the gold made the top adventurers strong early. The late Days already ran tight (870G at DAY 30), so the rise is front-loaded: against the old formula the charge is +30 on DAY 1, +40 on DAY 14, +30 on DAY 20 and about +0~10 from DAY 25 (rounded to 10G). Measured on three copies of main with the same seeds, fresh 200 + trajectory 40 × 10 (reader / investor): cash per Day fresh 63 / 60 → 56 / 53, trajectory 103 / 89 → 70 / 63; Runs ended by bankruptcy 0.6% (trajectory), D10 deaths 3.40 → 3.77 (investor). Rolling back to 170 alone cost the late Days the same 20G and 190 with a slope of 8 left the first week too thin (fresh investor cash 46G, bankruptcy 1.9 / 1.3%); a higher Level term (0.03 → 0.05) added bankruptcy 2.5%. Clear rates moved inside the ±3~5%p noise of that size and are not read.
- DUNGEON_HAZARD §Death on a lost fight and ECONOMY_ORDER §OPERATING COST (User 2026-10-16): the failure Death chance CombatDeficit × 0.40 → 0.50 (the Environment term × 0.60, the cap 0.50, the injured +0.10 unchanged) and dayBase 180 → 200 (`200 + (Day − 1) + 10 × max(0, Day − 15)`). Two v2.13.14 fresh User Runs both reached DAY 30 (one clear, one Final loss) with cash per Day 82G and 3078G on DAY 29, and the User read the game as too easy and the early money pressure as gone; the earlier Tier II incident ease is balanced on the Death side. Measured against main with the same seeds, fresh 1000 + trajectory 200 × 10 (investor): fresh clear 10.3 → 6.6%, D30 reach 21.3 → 14.8%, D10 / D15 reach 82 / 67 → 76 / 58%, median end DAY 19 → 16, median balance D10 944 → 835, D15 1238 → 1111, D20 1819 → 1769, D25 2229 → 2263, cash per Day 34 → 26; trajectory first clear within 10 Runs (no decoration / survival) 51 / 93 → 40 / 79%. The Death coefficient alone moved fresh clear 10.3 → 9.2% and D10 reach 82 → 77%; the first-visit Wallet 180 → 150 instead of dayBase moved only the early balances (D5 −90G, D10 −70G, same from DAY 20) and was left out. Logs `reports/v2100-measure/v21315-death-money-{s1,s1m1,s1m2}.log`.
- ECONOMY_ORDER §Wallet — visit income `randomInt(40, 70)` → `randomInt(30, 70)` again (User 2026-10-15): the v2.13.13 floor of 40 is rolled back. With the 정가 refusal eased the same day and the operating cost raised, the extra 10G a visit loosened a User Run's gold more than it was worth.
- Bot only (`dist/systems/simulation.js`, investor): the second Bag slot is priced together with the first, so the pair is 정가 + 정가, 정가 + 50% or 50% + 50%, whatever the purse still covers (User 2026-10-15: "두 칸 다 채워 넣으려고 계산한다"). Pricing one Item at a time against the whole purse left the second slot empty when the first sold at 정가. A User Run that cleared, played on by the bot from its DAY 11 / DAY 15 save (200 each): clear 9.5 → 16.0% / 9.5 → 17.5%. Measured against main, fresh 1000 + trajectory 200 × 10 (same seeds): investor fresh clear 1.5 → 3.6%, D30 reach 5.0 → 8.9%, cash per Day 47 → 42, D10 deaths 3.68 → 3.58; survival-route clear on the 10th Run 15.0 → 23.0%; reader identical. The bot clear target reads against this bot from here on. Log: `reports/v2100-measure/v21314-bot-pair-purse.log`.
- Bot only (`dist/systems/simulation.js`, investor): with the till above the User's balance curve (DAY 15 1000G, DAY 20 2000G, DAY 25 2500G) gold weighs half as much in the sale choice (1/15 → 1/30), so a customer who could pay 정가 still gets the better 50% pair (User 2026-10-15: "돈 여유 있으면 반값을 더 낸다"; the User's cleared Run discounted 233G a Day from DAY 15, the bot 62G, now 101G). The User's cleared Run played on by the bot from DAY 15 (200): clear 17.5 → 27.5%. Measured against main, fresh 1000 + trajectory 200 × 10 (same seeds): investor fresh clear 3.6 → 3.7% (D30 reach 8.9 → 9.2%, cash per Day 42 → 36, bankruptcy 0.5 → 0.8%); a clear within 10 Runs none 22 → 29%, economy 56 → 71%, operation 43 → 49%, survival 69 → 67%; reader identical. A rarity-first Store Support pick with one redraw when no 영웅 is offered (the User's own picks, 7 of 7 windows) was measured and left out: the ranked list does better (DAY 15 save 17.5 → 14.0%). Log: `reports/v2100-measure/v21314-bot-rich-discount.log`.
- ITEM §COUNTER LADDER — 컵라면 Buy 55 → 50G (Sell 110 → 100G) (User 2026-10-15). The 초반 대응 band was 35~55G for the same 12 points; 컵라면 cost 4.6G per Counter point against 2.9~4.2G for 얼음컵 · 중화 탄산수 · 집중 사탕, and more than a 중반 대응 Gear (3.4G). Its 피로 회복 3 keeps it level with or above 집중 사탕 (50G, 피로 회복 2). Priced by the table, not measured: a 5G step is inside the ±3%p noise of 200 Runs. The other Items were reviewed and left as they are.
- UI_UX §ORDER Reroll UX: on a phone the `발주 후보 교환` key moves from the right edge to the left edge (a tap meant for it sometimes landed on 영업 시작, which sits at the right below); the desk keeps it on the right, off 영업 시작's axis. Side padding 16 → 12px and icon gap 6 → 4px shorten the key by 10px; the 14px / 600 type is unchanged (User 2026-10-15).
- Bot only (`dist/systems/simulation.js`, investor), five User-play reads of 2026-10-15 measured one by one on the User's saves played on by the bot (200 each) and kept where they held: (1) a 나머지 customer's Death costs at least 25 whatever its weight, and every Death weighs more as the limit nears (× limit / lives left, at most ×4), because the limit is shared (the bot lost 1.4 rank-5+ customers a Run before DAY 21 against 3 spare lives, the User none); (2) an injured or losing customer may take an Item held for the Final (every bare Death on D27~29 came while the shelf sold 4~9 Items that Day; "a better find goes to the Final, the one it replaces to today's Gate"); (3) a Deep is sponsored only when the forecast on the Deep Gate with the best Bag the shelf could sell is a clear win (ok ≥ .65, death ≤ .06; "bot premium"); (4) a visitor at fatigue 15+ puts one supply-3+ meal on the sheet; (5) with the till above the balance curve an 영웅 offer ranks higher. DAY 11 / 15 / 25 saves: clear 17 → 39.5%, 27.5 → 46.5%, 13 → 39%. Measured against main, fresh 1000 + trajectory 200 × 10 (same seeds): investor fresh clear 3.7 → 11.3%, D30 reach 9.2 → 20.7%, death-limit endings 90.0 → 78.4%, bankruptcy 0.8 → 0.9%, cash per Day 36 → 35, D20 / D25 balance median 2041 → 1779 / 2441 → 2209, Items changing the outcome 34.9 → 35.0%; a clear within 5 / 10 Runs none 17 / 29 → 41 / 63%, survival 27 / 67 → 57 / 89%; reader identical. The bot clear target reads against this bot from here on. Left out after measuring: Final-reroll caps and a six-slot fill rule (the bot already rerolls 2~4 a Day from DAY 25), store-support rarity, insurance stocking, wider D22~24 rerolls, no-overcharge-when-risky, reserve cap, loyalty weight for 나머지, a plain Deep-off. Log: `reports/v2100-measure/v21314-bot-shared-limit.log`.
- `GAME_VISION.md` Difficulty Curve: the bot reference lines re-read against the #206 bot (fresh clear 2~3% → 약 10%, D10 reach 77 → 83%, trajectory first-clear median 10 → 약 6판째) with a line that a bot line moves whenever the bot does and does not mean the game got easier (User 2026-10-16). Document only.
- UI_UX §FINAL MUSTER (User 2026-10-16): a candidate who cannot go (resting after an Injury) no longer reads like the others - the portrait is greyed, a red rule sits on the card's left edge, `중상 · 2일 휴식` takes its own red line and the right label reads `출발 불가` instead of `기록 보기`; the order stays by Level. The notebook omits `건강` (only an Injury is named, as SALE does), its equipment line joins the Fatigue / Wallet box, and its way-back controls (`돌아가기`, `원정대 후보 보기`) wear the brown `.stamp` of the other sheets.

## v2.13.13 — Decorations re-tuned, each by its own measure (User 2026-10-12)

- META §counter — 휴식 바우처 꽂이: every Night every living adventurer Fatigue −6 → the Day's first two customers to reach the counter Fatigue −3 (the same "first two" as 알뜰 금고). Copy `매일 먼저 온 손님 2명은 그날 밤 피로가 3 줄어든다`. Measured alone on a fresh account (investor 1000, same seeds): clear +7.5 → +3.2%p over no Decoration, clear given D30 80 → 58%, the top Decoration for clears at 750G before, now below 단골 감사 현수막 and 훈련소 제휴 간판. `tools/deco-single.cjs` also prints the v2.9.6 deco-impact line (Day reached, deaths, bankrupt ends, Store Capital, sales, visitors, end money, core level). Log: `reports/v2100-measure/relic-deco-20261012/`.
- META §wall · §display — weaker Decorations lifted (User 2026-10-12): 길드 추천 매대 35 → 60% (daily sales +8 → +12% over no Decoration), 명예 모험가 액자 above 일반 60 → 70% (weights [30, 34, 23, 10, 3]; rare-or-better customers 28 → 36%), 의무실 현판 40 → 50% (D30 +5.6 → +9.5%p). 본사 우수 점포 훈장 keeps its DAY 0 영웅 window and may now redraw it at the ordinary curve (300 → 600G; 지원 교환 쿠폰함's first redraw free), RELIC §CANDIDATE REROLL. Same log folder, `buff/`.
- ECONOMY_ORDER §PURCHASE ACCEPTANCE — 관련 준비 is an addition, not a fixed 0.97: an affordable 50% 할인 / 정가 offer of a 관련 준비 Item adds `counterIntentBonus` +0.10 to rawChance (cap 0.97, 정가 then × 0.90), so Traits, Loyalty and price burden still move it. Before, the chance was set to 0.97 whatever the customer's Traits. Measured, fresh 1000 and trajectory 200 × 10 against v2.13.13 (same seeds): D30 reach and clear within the ±3%p noise.
- META §Day-reach conversion rate: DAY 1~9 1% → 2% (User 2026-10-15). User Runs ending on DAY 8 / 14 banked 275G across two Runs against a 500G cheapest Decoration. Measured, trajectory 200 × 10 against v2.13.13 (same seeds): first clear within 10 Runs reader economy 27.0 → 31.0%, survival 35.5 → 41.0%, investor +1.5~2.5%p, none unchanged (±3.5%p noise); fresh 1000 identical; first Decoration Run median unchanged (reader 4th, investor 3rd).
- ECONOMY_ORDER §Wallet — visit income `randomInt(30, 70)` → `randomInt(40, 70)` (User 2026-10-15). Fewer Customers leave with 0~1 Items because a revisit's Wallet was spent on one 70~100G counter Item. Measured, same seeds: Expeditions with 0~1 Items investor 11.1 → 9.2%, reader 13.1 → 11.1%; Death by DAY 10 3.61 → 3.56 / 4.02 → 3.92; cash / Day 50 → 54 / 51 → 59; fresh clear investor 1.7 → 2.7%, reader 1.6 → 1.7%. The +20G (30 → 50) version was measured and left out. The +10G also applies to a fresh Customer's first visit.

## v2.13.12 — Early money: cheaper Days, more Common offers (User 2026-10-12)

- ECONOMY_ORDER §ORDER RARITY PROGRESSION: D1–3 76 / 20 / 4 → 82 / 16 / 2, D4–7 68 / 24 / 8 → 74 / 21 / 5 (Common / Uncommon / Rare). A User Run's early sheets showed pricey Items first while a Common one already answered a Tier I Gate.
- ECONOMY_ORDER §OPERATING COST: dayBase 170 → 150 (−20G a Day before the Level / Rarity multipliers). User Runs ended early with cash per Day near or under zero.
- Measured, investor fresh 1000 against v2.13.11 (same seeds): ended by D10 40.5 → 32.8%, cash per Day 43 → 52G, D30 reach 5.3 → 6.7%, clear 2.3 → 2.7%. The early-hump halving was measured on top (ended by D10 31.1%, clear 2.5%) and left out. Death limit 5 / 8 / 10 held. Log: `reports/v2100-measure/early-money-20261012/`.
- GLOSSARY: Adventurer Rarity is 일반 · 고급 · 희귀 · 영웅 · 전설, the same names and colours as Item Rarity (평범 → 일반, 유망 → 고급; both retired). Display only: the Rarity is saved as an index 0~4, so old saves load unchanged. The 명예 모험가 액자 text reads 「일반보다 높은 등급」 (PR #187, folded into this version).
- EVENT §46 냉장고 고장: the shelf cut floors at `오늘까지` (1 day), not 0 days. Stock already on its last day was cut once more and showed `0일` in the warehouse; it was discarded tonight either way, so only the display was wrong.
- NIGHT coach marks: the one-mark-a-night limit is kept on the Run (`nightCoachDay`), not in memory. Reopening the app mid-NIGHT forgot it and told the next mark on the same record at once (e.g. 부상 then 사고).
- ECONOMY_ORDER §Persistent Wallet: expedition rewards (the Outcome reward and the deep-Gate bonus) now clamp the Wallet to 2000G like every other increase. The DAY 30 party skips the visit-time clamp, so a Wallet raised past 2000G on DAY 29 stayed over the cap on the Final. Other Days were unaffected (the visit clamps first).
- COPY: `(소지금 상한 적용)` removed from 첫 방문 쿠폰, 프리미엄 멤버십 and 알뜰 금고; 점주 가이드 판매 says `손님 소지금은 최대 2000G까지 쌓인다.` once instead.
- UI_UX §NIGHT — SAVED BY THE SALE: the sentence under the card (`원정을 끝내지 못하고 다친 채 돌아왔다.`) and the growth rows were already the real result while the worse verdict was still on the card, which gave the reversal away. The sentence now reads the worse verdict's own until the Item is on its way, then it fades and the real one settles in; the rows appear with the stamp. Insurance reversals too. Presentation only; no rule or balance change.
- Save records (no rule change): each expedition record keeps `bareRatio` (the same adventurer's prepared power without the Bag ÷ Gate power), each sale keeps the buyer's `wallet` before paying, and each Night report keeps the Day's `rerolls` and `gates`. `tools/save-check.cjs` reads them (맨손/요구, 리롤 · 게이트 by Day, half-price sales split by whether the wallet could pay full price); older Saves show `-`. `tools/measure-v2100.cjs` keeps every expedition (`exps`) in its fresh / trajectory rows.

## v2.13.11 — The Counter guarantee keeps the Day band (User 2026-10-12)

- ECONOMY_ORDER §Known-Hazard Counter pity: the guaranteed Counter drew uniformly among every unlocked Counter, so a DAY 2 guarantee was an Epic (135G) about one time in four. Its Rarity is now drawn by the current Day-band table among the Rarities those Counters have: mostly a Common Counter early, and no Epic before the band offers Epic. Bug fix; investor fresh 1000 against v2.13.10 (same seeds): ended by D10 39.9 → 40.5%, D30 reach 4.6 → 5.3% (within noise; the bot rerolls for a Counter anyway).
- tests: the Gate-count check allows NPC_TRAIT §DESTINATION Coverage removal on Days with fewer visitors than Gates.

## v2.13.10 — 에너지드링크 no longer outdoes 하급 포션 (User 2026-10-12)

- ITEM §ACTIVE CATALOG: 에너지드링크 기동 19 → 18, Buy / Sell 80 / 160 → 95 / 190. After v2.13.9 it gave the Power of 하급 포션 (140G) for 20G more and added Hazard cover and Supply, so the potion had no reason to be picked. Now it is a little below the potion in Power (4.86 vs 5.0) and costs 50G more for the cover. Not measured.

## v2.13.9 — Each Bag slot has its own job (User 2026-10-11)

- ITEM §ACTIVE CATALOG: 포션 투력 중급 18 → 14, 상급 25 → 19, 최상급 35 → 25 (하급 +10 · 140G unchanged). A User Run's early unwinnable expeditions were all one potion short, so the potion had become the answer.
- ITEM: every Stat Food +3 and Stat Drink +2 by rung (삼각김밥 · 초코바 · 녹차 양갱 6 → 9, 간단 도시락 9 → 12, 길드 특제 도시락 12 → 15, 영웅 결전 도시락 15 → 18; 생수 · 캔커피 · 진정 허브티 12 → 14, 에너지드링크 17 → 19, Epic Drinks 20 → 22); Supply unchanged.
- ITEM §COUNTER LADDER: 초반 대응 Field Gear 12 → 14, Food / Drink 10 → 12; 초반 하이브리드 first Hazard 8 → 10. DUNGEON_HAZARD §HAZARD THREAT: TierTerm 2 / 6 / 12 (Tier I +2). Two Stat Drinks no longer cover a Tier I Hazard as surely as one Common Counter. The aim is that the best two slots change with the Customer's Power, Stat and Gate (Hazard to the Counter, Power to Food / Drink, a large shortfall to the potion, Fatigue to Food).
- DUNGEON_HAZARD §Ordinary EXP / expedition-Wallet reward: 퇴각 0.50 → 0.40, 부상 0.35 → 0.25 (back to before v2.13.5); the Power raise above replaces it.
- CORE_RUN §DEATH LIMIT — SEGMENTED: 6 / 8 / 10 → 5 / 8 / 10 (META 위령비 +1 now 6 / 9 / 11). A Run that cannot recover ends sooner; one that can goes further.
- The Boss and the early Gate hump are unchanged.
- Measured against main, investor fresh 1000 (same seeds): success D1~7 / 8~14 / 15~21 / 22~29 47.2 / 39.2 / 45.9 / 38.1 → 51.0 / 40.7 / 48.0 / 37.9%, Deaths / Run 8.18 → 7.58, Runs ended by D10 28 → 39%, D30 reach 2.9 → 5.2%, clear 1.0 → 1.5%, cash / Day 46 → 43. Death limit 5 / 7 / 9 was tried at 200 Runs and left out (median end Day 17 → 13). Log: `reports/v2100-measure/item-roles-20261011/`.

## v2.13.8 — Night reversal portrait keeps its own tone (User 2026-10-11)

- UI_UX §NIGHT — SAVED BY THE SALE: the portrait greys while the worse verdict is on the card and its colour returns with the landing - now to and from the tone its own result carries (a 중상 portrait stays dim, brightness 0.8 / saturate 0.55), instead of starting and ending at full colour and snapping dimmer. Presentation only; no rule or balance change.

## v2.13.7 — Half of the v2.13.5 Wallet raise (User 2026-10-11)

- DUNGEON_HAZARD §Ordinary EXP / expedition-Wallet reward: 퇴각 0.60 → 0.50, 부상 0.45 → 0.35 (DAY 10: 69 → 58G, 52 → 40G), half of the v2.13.5 raise. A v2.13.6 User Run reached DAY 29 with the Store at 1545G on DAY 3 and 2000~4700G from DAY 22, and only 2 Deaths by DAY 10: the money came back too strongly. The early Gate hump (v2.13.2) and the opening money (Store 700G, newcomer Wallet 180G) stay as they are. Not re-measured; the v2.13.5 log brackets it.

## v2.13.6 — Android Back asks before the app leaves (User 2026-10-11)

- PLATFORM_RELEASE §ANDROID SYSTEM BACK: at the top-level surface (the night result, the Boss preparation, the ending) Back no longer exits the app at once; it opens 「게임을 종료할까요?」 (계속 하기 / 종료) and the app saves and exits only on 종료. Back during the ending's result hold is absorbed like the Boss reveal hold. The FINAL clash and the prologue were already skipped by Back. App only; the web has no Back handler. No rule or balance change.

## v2.13.5 — A failed expedition still brings some money home (User 2026-10-11)

- DUNGEON_HAZARD §Ordinary EXP / expedition-Wallet reward: Wallet outcome multiplier 퇴각 0.40 → 0.60, 부상 0.25 → 0.45 (DAY 10: 46 → 69G, 29 → 52G); 대성공 / 성공 1.25, 중상 0.15 and 사망 0 unchanged. Two v2.13.4 User Runs ended on the Death limit with Customers back from a failure holding 30~100G, short of a half-price 구급키트 (80G), so the Store covered them with discounts and stayed near 300~800G.
- Measured against main, investor fresh 1000 (same seeds): success D1~7 / 8~14 / 15~21 / 22~29 46.7 / 37.5 / 45.0 / 36.6 → 47.2 / 39.1 / 46.8 / 38.0%, Injured-departure Death 27.0 → 25.1%, top 4 / rest success 68.1 / 21.1 → 68.8 / 22.0%, cash / Day 40 → 52, clear 0.6 → 1.2%. Visit Wallet 30~70 → 50~90 was measured and left out (it eases every Customer, top 4 included). Log: `reports/v2100-measure/fail-loot-20261011/`.

## v2.13.4 — The account survives updates (User 2026-10-11)

- PLATFORM_RELEASE §SAVE ACROSS UPDATES: until now a Save was read only if its account and Run matched the current Job, Boss and Item lists exactly, so an update adding one Job or Boss would have refused every Player's Save, account included. The account is now checked for shape only: a missing Job × Boss cell reads as not cleared, an id the build does not know is kept and counts for nothing. A Run the build cannot continue is dropped alone, as an abandon drops it, with one line on 새 점포 준비 (「업데이트로 진행 중이던 영업은 이어갈 수 없어 새 점포를 엽니다. 본사 기록은 그대로입니다.」); its original is set aside on the device.
- PLATFORM_RELEASE §Google Play Games Saved Games: a cloud answer that arrives after the start stopped waiting (6 s on a fresh install) is compared at once; a newer cloud copy is loaded with 「Play 게임즈에 저장된 진행을 불러왔습니다.」. Until now it was only remembered, the new local progress was never uploaded, and the next launch let the old cloud copy overwrite it.
- META §SAVE / ACCOUNT PERSISTENCE · CORE_RUN §SAVE/LOAD point to the rule above. v1~v8 internal Saves stay unmigrated. No balance change.

## v2.13.3 — Save safety before the app release (User 2026-10-11)

- CORE_RUN §SAVE/LOAD: when neither the Save nor its backup reads, the refused copy is set aside under its own key (`guild24.save.v9.unreadable`) before any write. Until now the message promised the original was kept while the next two autosaves rotated it out and overwrote it.
- CORE_RUN §SAVE/LOAD: a Save read from the backup is put back as the head, so the next write rotates a readable copy into the backup slot instead of the corrupt head.
- PLATFORM_RELEASE §Google Play Games Saved Games: a full reset no longer restarts the Save revision at 0, and the fresh account is written at once. A reset made offline or signed out (cloud clear fails) left the old cloud copy with a higher revision, which won the next start and brought the erased progress back. No rule or balance change.
- PLATFORM_RELEASE §ANDROID SYSTEM BACK: Back during the prologue or the FINAL clash skips the scene like a tap, and during the moment-long boss hold it does nothing; it used to close the app there.
- Background: when the page is hidden the sound context is suspended and no cue or buzz plays, so a night result or clash timer is no longer heard behind another app.
- A start that throws shows one line (app 「앱을 다시 켜 주세요」, web 「새로고침해 주세요」) instead of leaving the loading screen up for good.
- App-only Save messages no longer point to Save export / import or browser storage, which the app does not have (User 2026-10-11). The web keeps its wording.
- The debug panel shortcut (Ctrl+Shift+D) is off in the app; the web keeps it (User 2026-10-11).

## v2.13.2 — Early-mid Gate hump (User 2026-10-11)

- DUNGEON_HAZARD §GATE POWER — LATE-DAY SLOPE: the Day term runs DAY 1~9 at 1.60 (was 1.45) and DAY 11~20 at 0.965 (was 1.10). The two cancel by DAY 20, so the requirement rises by up to +1.35 around DAY 9~10 (about +3.7%, every Tier and Family alike) and DAY 20 onward is unchanged. Reason: the User's v2.13.0 fresh Run felt smooth early (2 deaths by DAY 10 against a limit of 6).
- Measurement only, no rule: the investor bot also claims a potion for a backed visitor whose bare power is 0.8~1.12 of their Gate (User saves: 하급 포션 in 19% of DAY 1~14 Bags, the bot 6%).
- Measured against v2.13.1, investor fresh 2000 (same seeds, the new bot in the after arm): success by band 45 / 41 / 46 / 38 → 42 / 37 / 44 / 37%, deaths by DAY 10 4.29 → 4.64, Items changed the result 29.7 → 31.5% (mid 24.8 → 26.5%), clear 1.4 → 0.9%. With the new bot on both arms the hump alone moves success 46 / 42 / 47 / 38 → 42 / 37 / 44 / 37% and clear 1.1 → 0.9%. Log: `reports/v2100-measure/gate-hump-20261011/`.

## v2.13.1 — Night reversal Item no longer trails to the next customer (User 2026-10-11)

- NIGHT_CLOSING / UI_UX §NIGHT — SAVED BY THE SALE: the Item flying to the customer's line lives on `<body>`, so pressing 다음 (or 전체 건너뛰기) mid-flight left it on screen over the next customer. It is now taken down with the beat. Presentation only; no rule or balance change.

## v2.13.0 — Combat by Day, Tier by Hazard (User 2026-10-10)

- DUNGEON_HAZARD §GATE POWER: every Family's Gate Power is one Day line (the Tier I requirement) × TierCombat 1 / 1.05 / 1.20 (`DATA.balance.gateTierCombat`). The per-Tier +5 and the Family base step are gone; golem Tier II / III keep their own fire combat term (from Tier II the stronger combat stands in for a second Hazard).
- DUNGEON_HAZARD §Death chance: EnvironmentDeathContribution = EnvironmentDeficit² × 0.60 (was × 0.25). A bare Gate is deadlier, a slight shortfall (one counter + food) milder; the two meet at a 42% deficit.
- DUNGEON_HAZARD §Tier generation: Tier II from D5 (D5 15% · D7 30% · D8 45% · D12 60% · D13 61% · D18 70% · D19 70%); Tier I gives that share up, Tier III unchanged. EVENT §EVENT TIMING reads D5.
- Measured against v2.12.4 (investor fresh 2000, same seeds): items changed the result 26.7 → 29.7% (mid 22 → 25%), success D1~7 / 8~14 / 15~21 / 22~29 47 / 40 / 44 / 36 → 45 / 41 / 46 / 38%, deaths by DAY 10 3.72 → 4.29, bare expedition deaths 24 → 31%, clear 2.8 → 1.4%, clear once DAY 30 is reached 48 → 56%. The bot sends more bare expeditions than a player, so the extra early deaths fall mostly on it; the build is checked by the User's play. `reports/v2100-measure/tier-hazard-20261010/`.

## v2.12.6 — Store Support draw keeps its exclusions, loses only the tag steps (User 2026-10-10)

- RELIC §CANDIDATE RULES / §GRADE / §D30 CANDIDATE ELIGIBILITY: v2.12.5 removed more than asked. Restored: the previous window's three and a reroll's three stay off the draw (when at least three others remain), and the D30 no-effect exclusion (`D.relicD30NoEffect`). Still removed: the tag-diversity step and the +18% per shared tag build bias, so the pick inside a grade is uniform.
- Not measured: v2.12.5 and v2.12.6 differ from v2.12.4 only in the tag steps.

## v2.12.5 — Store Support draw is pure (User 2026-10-10)

- RELIC §GRADE / §CANDIDATE RULES / §D30 CANDIDATE ELIGIBILITY: a window card rolls its grade (일반 60 / 희귀 28 / 영웅 12%, D0 일반), then a support of that grade is drawn uniformly. Removed: the tag-diversity step, the +18% per shared tag build bias, the cool-down of the previous window's three and of the redraw's three, and the D30 no-effect exclusion (`D.relicD30NoEffect`). Kept: no owned or retired support, no repeat inside a window.
- Not measured: the offer mix and Run balance move with it; no balance run was made for this change.

## After v2.12.3 — Difficulty reference set by human play (User 2026-10-10)

- `GAME_VISION.md` §Difficulty Curve: absolute difficulty is set from human play; the bot only measures change against the previous build. New reference: a rules-aware skilled player clears about 25% of fresh Runs (first clear by the 3rd~5th Run), a new buyer first clears around the 8th~15th Run with Decorations; investor bot fresh clear 2~3% with D10 reach held near 77%, Decoration-trajectory median first clear around the 10th Run. Bot change maps to people at an equal shift in odds. Directions: no Run that only luck can clear, prefer difficulty that sold items can answer, Boss difficulty held. The v2.10 balanced / skilled bot table is retired.

## v2.12.3 — Tier I Gate requirement is one common value (User 2026-10-10)

- DUNGEON_HAZARD §GATE POWER: every Family's Tier I Gate now asks the same Combat Power, (21 + base offset + Day term + 1.5) × SuccessEase, the average of the old five (DAY 1 was 독거미·슬라임 100 / 망자역 106 / 설원 112 / 골렘 119). Which three Families open first no longer decides whether the starting roster can win at all. Tier II / III, golem's Combat share and Hazard Threat are unchanged.
- Measured against main, investor / reader fresh 1000 each: Runs ending by DAY 7 6.3% → 5.5% / 8.7% → 7.1%; D10, D30 reach and clear move within noise (investor D30 13.2% → 12.3%, clear 6.1% → 5.8%). Log: `reports/v2100-measure/gate-tier1-20261010/`.

## v2.12.2 — Newcomer Level band, Epic Rarity and Equipment gain (User 2026-10-10)

- META §Exact spawn-Level model: from DAY 5 a newcomer draws 1~2 + the Day term (was 1~3), so a newcomer arrives at most one Level above the Day's minimum. The min+2 newcomer showed a bare 우세 on the Days the minimum steps up (up to about 15% of newcomer-Gate pairs on DAY 21) and two of a fresh Run's top four were such arrivals.
- Half of the v2.12.1 trim is given back to offset part of the difficulty the Level band adds: ECONOMY_ORDER §ORDER RARITY PROGRESSION Epic D13~19 3→4, D20~24 7→9, D25~29 14→15; DUNGEON_HAZARD §Equipment gain 30 / 22 / 18 / 12% by Equipment tier 0 / 1 / 2 / 3+ (was 30 / 20 / 15 / 10%). The User chose this over the easier 30 / 25 / 20 / 15% option because the User plays above the bots.
- Measured, investor / reader fresh 3000 each: D30 reach 14.5% → 11.1% / 11.2% → 7.9%, clear 5.8% → 4.6% / 3.3% → 2.0%; the lucky-Run (top four ≥80% success) clear over the rest's falls from 2.5× to 2.0× (investor) and 5.5× to 2.5× (reader). Logs: `reports/v2100-measure/newcomer-band-20261010/`.

## v2.12.1 — Release summary (User 2026-10-10)

Patch version: work on `main` since v2.12.0 (PR #144~#155). Rules live in their routed owners; the app-wrapper rules live in PLATFORM_RELEASE.

- Balance: EXP curve 18+Level×9 (#145); Epic Rarity weight and Equipment gain trimmed against snowball (#155). Environment Hazard and Counter values are unchanged.
- Game title: 「마왕 잡는 편의점: 길드24」 with the new drawn title logo (#150); old title wording cleaned from the docs (#152 #153). GUILD24 stays the in-game store brand.
- Sloth's seal choice reads `봉인 강화` (a held seal keeps Sloth asleep and weaker); the D30 art index follows the seals held (#144). BOSS / UI_UX.
- App readiness (Capacitor wrapper, #148): notch-safe full screen, app Save, Android back, haptics at key NIGHT and Final moments (#147 #149), cloud save, credits, bug-report and privacy-policy links, sound on at a fresh app install (#151), browser vibration on touch devices for the web build (#154). PLATFORM_RELEASE.
- Measurement only, not in the game: the investor bot in `dist/systems/simulation.js` (#146).

## v2.12.1 — Epic Rarity and Equipment gain trimmed (User 2026-10-10)

Snowball trim after a fresh first Run cleared SLOTH easily on DAY 30. ECONOMY_ORDER §ORDER RARITY PROGRESSION: Epic weight is cut across D13~29 (D13~19 4→3, D20~24 10→7, D25~29 16→14), with the difference spread over Common, Uncommon and Rare so Rare still rises by day; D30 keeps its Final Bag row. DUNGEON_HAZARD §Equipment gain: no Equipment gain on DAY 1~2, then 30/20/15/10% by the Equipment tier already earned (tier 0/1/2/3+), so the adventurer who keeps winning gains Equipment more slowly.

## v2.12.1 — EXP curve 18+Level×9 (User 2026-10-10)

NPC_TRAIT §EXPERIENCE CURVE: each next Level costs `18 + current Level × 9` EXP (was × 8). A no-Decoration account was clearing too early (first clear around the 6th Run against the ~10th-Run aim); measured on the investor bot this moves it to about the 10th Run. Log: `reports/v2100-measure/late-difficulty-20261009/2-growth-x9.log`.

## v2.12.0 — Release summary (User 2026-10-09)

Minor version: balance, coaching, sound and night-result work since v2.11.1. Details are in the sections below; rules live in their routed owners.

- Balance: EXP curve 18+Level×8 and lagging-customer EXP, six-job profiles with half-strength ordinary Gates, Boss / Final requirement 28, Potion distribution, ordinary combat variance ±12%, lagging customers returning 퇴각 / 부상 / 중상 get the larger of ×1.5 and 25% of the EXP to the Day's minimum. Death limit, Insurance and the Final roll are unchanged. Not re-measured as a whole yet (AGENTS §9-A).
- UI / text: source and player-facing text alignment (8 batches, 55 Events), SALE remaining-customers popover, Gate-led shelf, Deep line, 도움말 끄기 wiring, Boss art and settings lines.
- Coaches: one a Day, ordered by the core loop (see "Coach review" sections); first-time causes of Death risk; ORDER item-kind and effect marks.
- NIGHT: the sold Item that kept a customer alive is shown (「준비가 살렸다」); per-case lines for returns from Death / Severe, an accident coach, customer lines wait for coaches, Death-turn pause 0.25 s, result backdrop strip fixed.
- Sound (CC0 only): box stack, 대성공, next store, night result cues, closing receipt without the tick (profit / loss sounds only) and a new-day cue on the next Day; 퇴각 and 부상 cues swapped between the existing synth sounds. Sources and licences: `reports/ASSETS.md`.
- Loading: Store Support paper and Boss art are preloaded; customer photos load from this store's customers first.
- Not in the game: the investor bot work on `claude/balance-review-9jhs2f` (measurement only).

## v2.12.0 — Coach review 2: 상품 효과, 대성공 기회, failure Death risk causes (User 2026-10-10)

- The DAY 1 ORDER mark says what Items do in general (a Food or a Drink can be a Counter too), on the first offer's effect line. COPY_AUDIT §3-2.
- The 대성공 기회 mark says what sets the tag (the customer's power, a sold Item's added; it can show with an empty Bag) and never its chance.
- What raises 실패 시 사망 위험 is told cause by cause as contextual SALE marks, each the first time it is at the counter, one a Day: an injured customer (`DEATH.injured`), the `연속 부상 출발` chip (`STRAIN` step / cap), a 탈진 customer (`DEATH.exhausted`). COPY_AUDIT §3-7; UI_UX §TUTORIAL.
- Coach order by the core loop (GAME_VISION): DAY 1 SALE destination now carries the `flow` lines (one turn: where, how it is decided, price, Bag); DAY 2 both outlook boxes; DAY 3 the returning customer; DAY 4 the Stats. NIGHT marks: death, Severe, Injury, Counter, 만반의 준비, Fatigue, 대성공, Wallet gain. UI_UX §TUTORIAL; NIGHT_CLOSING §DISCOVERY LINE; COPY_AUDIT §3-4 / §3-7 / §26-2.

## v2.12.0 — Coach review (User 2026-10-10)

- DAY 1 ORDER gains the `상품 종류` mark before `발주 확정`: what 음식·음료 / 포션 / 야외장비 / 보험 are for, on the first offer's kind label. COPY_AUDIT §3-2; UI_UX §TUTORIAL.
- The Bag mark is the DAY 1 first sale's (was DAY 4). The Stats mark drops 포션 and reads 투력 → fighting, one of 강인함·기동·정신 per Hazard. COPY_AUDIT §3-6 / §3-7.
- NIGHT Wallet gain mark: only on a 성공 / 대성공 record, and the line says every living return gains, a won one by far the most (it showed on a 퇴각 record with `이긴 손님`). NIGHT Counter mark: only where the result proof credits the Counter Item, so the record names it (it showed under a Potion's line). NIGHT_CLOSING §DISCOVERY LINE; COPY_AUDIT §26-2.

## v2.12.0 — Combat variance ±12% and preparation lines (User 2026-10-09)

- Ordinary combat variance ±17.5% -> ±12% (`combatNoise` 0.12) so a sold Item moves the result more than the roll; the average stays at the same threshold. The Final roll (0.92~1.08) is unchanged. DUNGEON_HAZARD §COMBAT VARIANCE / SIM-Q01. Not measured yet (AGENTS §9-A).
- `tools/measure-v2100.cjs` adds a `└ 준비` line and `tools/save-check.cjs` §2 three rows: with-Item vs bare expeditions (success / Death), the share of Item expeditions whose result an Item changed (RESULT-PROOF) and the Deaths it kept away, the top four's share of Items sold.

## v2.12.0 — Lagging adventurer EXP on a failed return (User 2026-10-09)

- A lagging alive adventurer (below the Day's ordinary new-arrival minimum) returning 퇴각 / 부상 / 중상 takes the larger of the ×1.5 bonus and 25% of the EXP still needed to reach that minimum; still capped at the minimum. 성공 / 대성공, Death, Injury penalties, Insurance and the Death limit are unchanged. NPC_TRAIT §EXPERIENCE CURVE / LAGGING ADVENTURER EXPERIENCE.
- Not measured yet; the standard measurement runs only after User approval (AGENTS §9-A).

## v2.12.0 — 소스와 사용자 노출 텍스트 일치 점검 (User 2026-10-09~10)

| 배치 | 핵심 변경 |
|---|---|
| 1 설정·점주 가이드 | 안내 기간 단정 제거, 하루의 흐름·상품 효과·거절 예외 설명, 회생 횟수 값 참조, 새 점포 준비에서도 설정 즉시 갱신 |
| 2 상품·발주·창고 | 실제 입고 유통기한 표시, 버튼의 이번 교환 비용 안내, 해금/발주 출현 날짜 공통 참조 |
| 3 판매·모험가 | 판매 상태 피로를 확정 상품 사용 후 기준으로 표시, 상세는 상품 사용 전 기준 명시, 단골도 설명·옛 수첩 규칙 현행화 |
| 4 게이트·사건·일반 원정 | 위험 개수의 사건 예외, 화염 II부터 코치, 판매 전 전망 기준, 코치 강조 영역·스크롤·포커스 수정 |
| 5 밤·마감·폐점 | 실제 종료/정산·회생 단위·특성 예외 설명, 심층 추가 성장 후 밤 보고와 NPC 기록 동기화 |
| 6 지원·장식·다음 점포 | 승인된 운영비 가산은 구입 당일부터, 지원/장식 설명·은퇴 상태·숙련·자본을 실제 기준과 일치 |
| 7 마왕·최종 원정·결말 | 공개 전 이번 목표 표시 억제, 확정 대원의 실제 적용 능력치와 원인 표시, 환경 기준·피로 경계·종료 용어 정리 |
| 8 사건55종 | 전체 효과 설명 이해도·용어 검수, 필요한 숫자는 실제 값 참조, 옛 저장 설명 갱신. 승인된 본사 발주 제한은 칸당 공급 최대2개로 변경 |

구체적인 변경 전→후·owner 근거·검증 기록은 `reports/TEXT-SOURCE-AUDIT.md`를 따른다. 별도 저장 필드·숨은 확률 공개·새 문구 시스템은 추가하지 않았다. 최신 main의 후속 UI/코치·직업/게이트 채택을 보존해 통합한다.

## v2.12.0 — Insurance first print names what it turned away (User 2026-10-09)

- A 귀환석 rescue's event records the Outcome it turned away (`from`); NIGHT's first print shows it, so a 부상 turned into 퇴각 prints `부상`, not `중상`. NIGHT_CLOSING §INSURANCE CAUSALITY; UI_UX §NIGHT LAYOUT — VERDICT STAMP.

## v2.12.0 — SALE queue Gate-count reference approval (User 2026-10-09)

- Adopted in Source: hovering (desktop) or tapping (mobile) the existing SALE `손님` queue/progress area reveals a compact popover with the Day's **same per-Gate expected total visitors already available in ORDER**. No extra permanent text, icon, button, Dock height or future-customer disclosure. First-use contextual coach once per account explains the interaction; no extra DAY 1 compulsory coach was approved. SALE §QUEUE INFORMATION BOUNDARY; UI_UX §SALE — QUEUE GATE COUNT REFERENCE / §QA; COPY_AUDIT §3-16. No unrelated 3/4/5 proposals adopted.
- Revised (User 2026-10-09, same day): the popover counts customers **left** per Gate counting the one at the counter, under `이번 손님부터`, with no total; slate balloon. DAY 1 SALE coach: destination and price only; `flow` moves to DAY 2 (before 전투 전망), Stats to DAY 3 (before 환경 대응). UI_UX §SALE — QUEUE GATE COUNT REFERENCE / §TUTORIAL — READ THE SYSTEM; SALE §QUEUE INFORMATION BOUNDARY; COPY_AUDIT §3-16.
- NIGHT saved beat (User 2026-10-09): when the engine proves the sold Item saved the adventurer from 사망 / 중상 (not Insurance), the worse verdict prints, the Item shoves it off, the real Outcome stamps, and the Item icon stays beside `{Item} 덕분에 살아 돌아왔다.`. Shown for every 사망 kept away and every 중상 turned into 성공 / 대성공, no nightly cap; the worse print sounds its own `death` / `severe` cue and the card pauses until it fades (사망 +250 ms, 중상 +100 ms); new cues `shove` / `saved1`-`saved3` (the relief, sized by the turn, replaces the Outcome cue on that landing), levels fitted by tools/qa-sfx-mix.cjs. UI_UX §NIGHT — SAVED BY THE SALE; NIGHT_CLOSING §INSURANCE CAUSALITY.

## v2.12.0 — Job profiles and half-strength ordinary Gates (User 2026-10-09)

- Adopt the revised Warrior/Archer/Rogue/Berserker profiles; Mage/Priest unchanged. Exact stats, Power contribution and Environment contribution with per-Level growth -> NPC_TRAIT.
- Ordinary Gate base offsets D1 +0.125, D10 +0.5, D20 +1, D25 +1.5; linear interpolation, hold through D29. Ordinary golem FireTerm6/13.5/21. This halves the measured Gate/Fire package's changes together. DUNGEON_HAZARD §GATE POWER.
- Keep EXP18+Level×8, lagging EXP×1.5, Final requirements/Fire12/threat28/gap penalty2 unchanged. Further growth/boost adjustment is deferred.
- The reader28000-run measurement used the full candidate, not this final half-strength decision. No new balance simulation for adoption; the final reach/clear rate is unmeasured.

## v2.12.0 — SALE Deep line names its Gate (User 2026-10-09)

- The SALE Deep nomination's closed line shows `심층원정` and today's Deep Gate name (no repeated words); the open state keeps the terms and the sponsorship key. No copy added. UI_UX §DEEP SALE UI.

## v2.12.0 — SALE shelf leads with the customer's Gate (User 2026-10-09)

- The SALE shelf's Hazard-answer lead now starts with the current customer's own Gate's Hazards, then the other open Gates'; the rest of the order and the warehouse are unchanged. SALE §ITEM SELECTION / UI_UX §SALE — SHELF ORDER.

## v2.12.0 — Approved balance adoption (User 2026-10-08)

- EXP curve18+Level×8; lagging alive adventurers receive×1.5 ordinary earned EXP below the Day's ordinary new-arrival minimum, capping only the extra bonus at that minimum. NPC_TRAIT §EXPERIENCE CURVE / LAGGING ADVENTURER EXPERIENCE.
- D21+ Gate day slope1.05, Mage combat growth3.1. Ordinary hazard curve and other Jobs unchanged.
- Boss final requirement×0.95 after Boss identity and nominal FIRE+12. Final mean-gap penalty2; each Final Hazard requires exactly28. BOSS / FINAL_EXPEDITION / DUNGEON_HAZARD.
- Shorten comments only at touched functions; replace the touched Final contribution source-text check with equivalent behavior verification. Shared runtime/simulation/measurement penalty parameter prevents formula drift.
- The measured candidates used Final threat28.5; exact28 is the final User decision, not a newly measured outcome. No new trajectory was run for this adoption.

## v2.12.0 — Potion distribution and source catalog (User 2026-10-08)

- Adopt the approved additional ORDER slot work from `b22afde7`: extraOrder / dawnRecovery / coldcase append their slots on acquisition, preserving the sheet/cart; independent category slots persist through full Rerolls. The Potion contract keeps id coldcase, price180G and one Potion-only slot.
- Potion ordinary SALE pays the store 10% of the charged price from HQ, rounded separately and added to other commissions. NPC payment and Gross Sales are unchanged; Final supply remains separate. RELIC §18 / REL-Q33, COPY_AUDIT §11-18.
- `reports/BALANCE-CATALOG.md` is a source-derived reference for Items, Store Supports, Decorations and common balance parameters, regenerated by audit. It contains current Source only; routed owners remain Design Truth.

## v2.12.0 — Counter Food / Drink recovery rollback (User 2026-10-06)

- Counter Food / Drink Supply returns to the values before PR #107: 컵라면 5→3, 집중 사탕 5→2, 불룡볶음면 7→3, 얼음컵 / 중화 탄산수 / 용사의 곡주 / 쿨링 이온음료 2→1. Prices, direct Counters and Core Stats stay unchanged. ITEM §COUNTER LADDER / §ACTIVE CATALOG; tests vocabulary, night.
- Growth cost and late Gate slope are simulation-only candidates; no change to live growth, Boss, Job or environment parameters is adopted here.

## v2.11.1 — Minor feedback / first Final Expedition coaches (User 2026-10-05)

- NIGHT Fatigue opens a daily-cause overlay with a smaller five-band reference; the numeric Fatigue is not repeated in the next-decision line. Resolved source rows and overnight settlement are recorded without changing calculations; older saves retain their recorded expedition chain.
- SALE omits `건강` from compact state and shows an actual refusal Loyalty loss in the existing receipt style, with only the loss number in muted red.
- ORDER places `위험 보기` beside 점포지원, uses a generated transparent refresh image with an open arc and a distinct triangular head, and teaches 발주 후보 교환 from DAY 4 even alongside another ORDER mark.
- D30 adds first-ever staged coaches for support, last order, party selection and each participant's environment preparation; candidate Wallets and per-participant Hazard current/required values are readable on their own cards.

## After v2.11.0 (User 2026-10-05; ships in v2.11.1)

- 점포지원 등급 is a stamp in front of the name (card and owned list), the contract text stands further in; the owned list carried no
  등급 (`undefined`) and now does (PR #112). Deploys put the commit on font / style / script URLs so no stale font is kept.
- PROLOGUE scene 5: the customer stands on the painted counter top at every size (the store file's counter top read through the
  cover crop, phone 75.2%, wide 80.5% of the file), not at a fixed share of the screen.

## v2.11.0 — 점포지원 등급, 점포지원 조정, 운영형 장식, 사건 · 결전 (User 2026-10-04 ~ 10-05)

- **사건 from DAY 1**: a Normal Event may fire from DAY 1. The account's first Run keeps DAY 1 quiet so the DAY 2 `본사 1+1 행사` lesson stays its
  first Event. EVENT, CORE_RUN; tests events, revision.
- **결전 흔들림 0.92 ~ 1.08** (`D.balance.finalRoll`), and the 토벌 전망 bands read it: 불리 when the ratio × 1.08 < 1, 우세 when × 0.92 ≥ 1, else 접전.
  FINAL_EXPEDITION; tests final, simulation.
- **점포지원 effects**: 원정 도시락 코너 = every Food / Drink sold +2 to every Hazard (마왕성: the weakest one), no Fatigue term, Food / Drink order price × 1.15;
  회원 관리대장 = the 단골도 term of a return visit × 2; 프리미엄 멤버십 = for 다시 온 손님, 손님 소지금 +25G and Rare+ intent +15%p, a Rare+ purchase at 정가 or
  할인 +10 단골도; 길드 납품 인증 commission 40%; 냉장 유통 계약 -> **고급 식자재 유통 계약** (one more Uncommon+ Food / Drink offer on the Day's first order
  sheet, 15% commission on those sales); 즉석식품 170 -> 200G, 본사 추가발주권 130 -> 190G. RELIC, ITEM, NPC_TRAIT, COPY_AUDIT §11.
- **New 점포지원**: 소문 수집 게시판 (일반 60G: an Event every eligible morning, first-Run DAY 1 included), 단골 추천 엽서함 (일반 80G: on a Day a 단골 visited,
  the other visitors +5 단골도 at night), 길드 구조대 계약 (희귀 240G: a Death becomes 중상 with 15% - measured at 30% first, D30 +36.5%p, User 2026-10-05). 단골 묶음혜택 leaves the windows (old saves keep it).
  RELIC §ADDED / §RETIRED, COPY_AUDIT §11-30d~f.
- **점포지원 등급** 일반 17 · 희귀 10 · 영웅 7: each card rolls its 등급 first (60 / 28 / 12), DAY 0 offers 일반 only, the D30 exclusions stay, the reroll
  stays unlimited (300 -> 600 -> 1200). The card and the owned list show the 등급 word under the name in the item rarity colors, with a 등급-color
  line. RELIC §GRADE, UI_UX §RELIC UI, GLOSSARY `점포지원 등급`; tests relic-order, revision.
- **운영형 장식** (one per Slot, the Slot's price): 단골 감사 현수막 on the 간판 (투력 × (1 + floor(단골도 / 10) × 3%), the Final included; on the dearer Slot as the stronger, User 2026-10-05), 본사 우수 점포 훈장 on the 벽면 (the DAY 0 pick from 영웅),
  휴식 바우처 꽂이 (every Night, every living adventurer Fatigue -6; measured at -3 first, D30 +0.7%p, User 2026-10-05), 지원 교환 쿠폰함 (each window's first reroll free). Pixel art
  in `ui/assets/deco/`. META §OPERATION DECORATIONS, COPY_AUDIT §9-5; tests integration, copy, ui-guard, night; `tools/qa-deco-seating.cjs` carries the set.
- **Decoration art rules written down** (User 2026-10-05): UI_UX §DECORATION ART - the Slot's canvas width, body colour to the light
  outline with no dark edge ring, lit top-left / shaded bottom-right, near-black only for detail and a standing foot line, the
  palette and what each of the twelve shows. The four 운영형 pictures follow it (`tools/deco-art.py`); `tools/deco-sheet.cjs` lays all twelve
  side by side at their Slot widths.
- **간판 on a phone kept off the DAY sign again**: MORNING's DAY sign is centred and as wide as its height (2156:521), so the 간판's
  line is now that sign's real left edge (360~430 phones had it 3~12 px over the sign and its hangers). UI_UX §LIVE STORE DECORATION
  SEATING is unchanged; `tools/qa-deco-seating.cjs` passes on phones again.
- **Runtime QA after the prologue and the loading screen**: `tools/qa-ready.cjs` waits out the loading screen and skips the prologue;
  qa-d0-flow, qa-day-flip, qa-final-prep, qa-boss-confirm, qa-final-end, qa-primary-grammar and qa-final-clash use it, qa-reset-seed skips the prologue after 다음 점포 열기 (their checks unchanged); qa-visual's coach probe carries NIGHT_MARKS, and its desk SALE art box is checked as UI_UX says (shorter than wide, portrait fitted whole; phones stay square). qa-visual reads the SALE speech balloon as the transient overlay it is and checks PR #105's placement instead (never over a 소지금
  G amount); qa-bgm reads the
  prologue's BOSS after 다음 점포 열기 (UI_UX §PHASE BGM); qa-final-prep's 불리 line is read from `D.balance.finalRoll`.
- **새 점포 준비 Capital plate**: its 24 px step needs a stage 400 wide (390x844 overlapped the counter pieces). UI_UX §NEW STORE
  PREPARATION — STORE SCENE. `tools/qa-prep-scene.cjs` and `tools/qa-store-support.cjs` skip the prologue again.

## Docs / hygiene and asset weight after v2.10.3 (User 2026-10-04; the version stays 2.10.3)

- **Large background art ships as WebP** (User 2026-10-04: 배경 줄이자): the 27 presentation PNGs of 600 KB or more (boss rooms, store
  and sale backdrops, night store, wood panel, keys, tags, contract and menu icons; 33.9 MB) are now WebP quality 95 (5.4 MB); small
  PNGs and JPGs stay. Same pixels on screen (390 / 1280 captures of PREP, SALE, NIGHT, menu, settings differ in 0.0% of pixels by
  more than 9%; all seven FINAL rooms load at 1672x941). `GUILD24_NPC_PRODUCTION/04_BOSS/BACKDROP` (the seven room originals, 14 MB)
  leaves the repository and is kept outside it. Test ui-guard follows the new file names.
- **v2.10.1 design work diaries leave `reports/`**: the 2026-10-03 `UI_DESIGN_*`, `UI_SALE_*` and `UI_SUPPORT_*` hand-offs, review PDFs, capture
  images and QA JSON (about 50 MB, nothing reads them; git keeps them). The component catalog `UI_COMPONENTS.md` moves to `archive/v2.10.1/`.
- **Closed measurement reports leave `reports/`** (User 2026-10-04: 인사이트 있는 건 아카이브, 나머지는 정리): the reports with a decision basis
  move to `archive/` (v2.8 relic rebalance, v2.9.1 decorations, v2.9.12 balance proposal and `expert` calibration, v2.9.13 Store
  Support evaluation, counter ladder and item price, v3.0-prep §8 measurement, the v2.10.0 measurement and its rejected-option logs;
  `archive/README.md`); their raw JSON and logs and the v2.10.0 quick-patch logs nobody cites are deleted (git keeps them). Live
  references point to the new paths. `reports/` keeps the generated audits, the current baseline logs (`v2100-measure/v2102-*`, `v2103-*`)
  and the Store Support grade draft (`relic-balance/v2104-grade/`).

## After v2.10.3 — 마왕 조사 도감 탭 (User 2026-10-04; the version stays 2.10.3)

- **마왕 조사 is easier to take in** (User playtest feedback: 마왕 조사가 뭔지 모르겠다, 공개된 특성을 다시 볼 곳이 없다): the DAY 1 briefing now lists what DAY 5 / 15 / 25 reveal;
  the D5 report says when the 마왕 권능 comes and where to read it again; D15 and D25 carry a one-time 안내 line (tied to 안내 끄기 / 다시 보기).
  New codex tab **도감 > 마왕** lists the Bosses the Player has met (this Run's first once its identity is shown) with their Trait only; the shown beats are kept
  on the Account (`bossLog`, absent in older saves, a cleared Boss counts as known). UI_UX §도감 > 마왕, COPY_AUDIT §14-1~§14-11, META §BOSS LOG (save contract); tests integration, ui-guard, copy.
- **Boss Trait sentences rewritten** with the GLOSSARY names (최종 원정, 상품, 마왕 권능) and the figures shown: 프라이드 8%, 엔비 8% (가장 강한 출전자), 러스트 5%, 글러트니 50%,
  그리드 목표 매출 18,800G with 현재 매출 (in the D15 report and the codex card). WRATH shows `권능 없음` alone. The figures are filled from `D.bossTuning` through
  `game.traitNumbers()`, so a retune cannot leave the copy behind. The D25 intro drops `대응 수치는 마왕성 기준`.

## Game glossary after v2.10.3 (User 2026-10-04; the version stays 2.10.3)

- **GLOSSARY_v2.13.17.md is the parent owner for names and terms**: one rule document, 「이 개념은 이 용어로 쓴다」. Linked from SPEC_INDEX (authority, file
  set, routing), COPY_WORLD_VOICE §ROLE and AGENTS.md. Decided with it: 점포 = one 30-day store, 영업 = one day's business, `최종 원정` for the Final,
  `발주 후보 교환` / `점포지원 후보 교환` (the bare `후보 교환` is retired), `요구 전력`, `상품` = the goods and `보급` = handing goods over, `이번 점포의 장식`.
- **마왕의 능력 = 「마왕 권능」** (User 2026-10-04): 「특성」은 모험가의 개성만 가리킨다. The forecast line reads `마왕의 권능`. The 마왕 report, 도감 탭 and coach
  lines that still say 특성 are aligned by the 마왕 조사 thread.
- **원정 소지금 획득 -> 손님 소지금 획득** (the NIGHT result row; the same Gold as 손님 소지금, User 2026-10-04).
- **COPY_WORLD_VOICE no longer defines terms**: §PLAYER-FACING TERMINOLOGY (Stat names, locked terms, 심층원정, 원정 후원금, item categories) moved into GLOSSARY;
  the Great Success signal and Run abandon copy rules stay in COPY_WORLD_VOICE. COPY_AUDIT §22 keeps its exact replacement records.
- **Names aligned to it in Source, owners and tests**: 이번 영업의 장식 -> 이번 점포의 장식 (menu, modal, store panel, END), the store end screen reads
  `점포 종료` (the day-end key and receipt head keep `영업 종료`), 한 영업 -> 한 점포 (stock modal), 발주 교환 / 후보 전체 교환 -> 발주 후보 교환 (button, closing receipt row, POS event, block
  reason), 요구 전투력 -> 요구 전력, 아이템 보강 -> 상품 보강, 마지막 보급 -> 마지막 상품, 마왕성 원정 -> 최종 원정. NPC_TRAIT's 150% Loyalty line is -4
  (it said -3; §NPC-Q-v28-2B and Source already said -4, a refused 150% -2). The 점주 가이드 lines, the 보유 골드 / 손님 소지금 / 생환 / 유료 구매 names and
  the 마왕 특성 lines (최종전, 아이템) are aligned by the threads that are rewriting them.

## After v2.10.3 — the fight is named on its own, coach spread, 안내 switch (User 2026-10-04; the version stays 2.10.3)

- **Combat proof** (PR #94 / #95): with the same recorded noise roll, an Item whose removal would have lost the combat check is named on
  the NIGHT result even on a plain `성공` (`{Item} 덕분에 전투에서 이겼다.`); it is stored beside the result proof as `combatHero`. The Stat coach
  gets one potion sentence and the II Gate coach drops its duplicate Stat sentence. DUNGEON_HAZARD §COMBAT PROOF, NIGHT_CLOSING; test night.
- **Coach spread and the 안내 switch** (PR #96 / #97): the 환경 대응 mark moves to DAY 3 and the Bag mark to DAY 4, so the marks spread over four
  days. Settings gets a 안내 switch (끄기 / 다시 보기) on `tutorial.skipped`. UI_UX §TUTORIAL — COACH DIET; test ui-guard.

## v2.10.3 — a refused 바가지 costs the sale, a prologue before every store (User 2026-10-04)

Also in this version, from main: the five-scene prologue before every new store (PR #87); coach marks spread over DAY 1~4 with the
expedition-flow and Wallet-gain marks, the ORDER 오늘 line by Hazard / Tier / headcount, the SALE customer line as pale figures,
iOS first-touch audio, two NPC names exchanged (`ui/design-trim` #88~#90). Their owners: UI_UX §PROLOGUE, §TUTORIAL — COACH DIET, §ORDER, §SALE.

- **A refused 바가지 closes the SKU** (User, from a second Run that sold 바가지 first and drowned in Gold: 거절당해도 손해가 없어서
  바가지 먼저가 정답): once a customer refuses an Item at 150%, that Item is not sold to them this visit at any price (`바가지를
  거절함` on the 정가 / 할인 keys), and the refusal costs Loyalty 2. A 바가지 sale costs Loyalty 4 (was 3). `바가지 first, 정가 if
  refused` had paid about 1.29 x list against 정가's 0.87; it is now about 0.99. The payday and first-refusal coach lines (보수를 받은 손님이다 … · 거절된 상품은 오늘 이 손님에게 못 판다 …) and a 바가지-only refusal
  pool (no line inviting a cheaper retry, two of them witty) follow. SALE §SAME-ITEM REFUSAL PRICE CEILING, NPC_TRAIT §NPC-Q-v28-2B, COPY_AUDIT
  §18-4a · §26-3, UI_UX §SALE — REFUSAL PRICE CEILING UI; tests revision, integration, traits.
- **The price keys are taught before the first sale** (User: 판매 과정을 알려 주는 코치가 없으면 DAY 1에 알려야): with a refused
  바가지 closing the Item, the price rule must be known before the choice, so the price keys carry one mark the first time they
  show - `세 가격 중 하나로 판다. 할인은 단골도를 올리고, 바가지는 거절되면 그 상품을 오늘 못 판다.` The first-50%-sale lesson is
  retired. UI_UX §TUTORIAL — COACH DIET · §SALE PRICE LESSONS · UI-Q-v29-53, COPY_AUDIT §3-14 · §26-3; test ui-guard,
  `tools/qa-sale-details.cjs`.
- **왕도 프리미엄 인증 pays 40% of the 150% price** (was 45%; User: 바가지에 위험이 생겼으니 40%). 평생 단골제 is unchanged.
  RELIC §23 · REL-Q-v28-7; tests relic-effects, copy.
- **Measurement bots follow the rule** (PR #93; User: 중요도 높은 애들은 바가지 피하게): `reader` and `expert` keep 150% off the core
  roster, Rare+ customers and an Item their Gate needs; `reader` from DAY 10 to regulars, `expert` from DAY 1 one Food / Drink to a
  purse three times its price. Fresh 1000: D30 25.6 / 27.2%, clear 8.8 / 10.7%, cash 79 / 83 a Day; four Slots by Run 7~8
  (`reports/v2100-measure/v2103-bots-baseline.log`, `v2103-full.log`). A 바가지-first bot drops to D30 7%
  (`v2103-overcharge-first.log`). Behind early customers stay as they are - a 50% Bag saves about half of them
  (`v2103-behind-bags.log`, User: 그냥 그대로).

## v2.10.2 quick patch 1 — a save names its build (User 2026-10-04; the version stays 2.10.2)

- **Every save carries `build: {version, commit}`** (User: 세이브에 빌드 정보도 넣게): the autosave and `저장 내보내기` write the same
  pair the build marker shows, beside the save `version`, and a new Run keeps the build it started on as `run.startBuild` (User:
  시작 빌드도 남기고). Read-only metadata - never validated, and a save without it still loads;
  no new save generation. `tools/save-check.cjs` prints it at the top of its report. UI_UX §BUILD MARKER; test revision.

## v2.10.2 — SALE phone spacing, line breaks and loading (User 2026-10-04)

A presentation-only version: the `ui/design-trim` PRs #68~#74 (loading screen, bag text, decoration window, ORDER / SALE scroll fixes, SALE phone spacing, restored Stat change colours, the 추가 구매 wallet line, an opaque lower area, and sentence-level line breaks for every plain sentence block). No rule, balance or save change.

## v2.10.1 — design-trim presentation pass (User 2026-10-03)

A presentation-only version: the `ui/design-trim` PRs (#57, #60, #62, #61, #63, docs #65). No rule, balance or save change.
The entries below (SALE phone density; the v2.9.14 quick patch notes on 단골 배지, NIGHT art, sheets, ORDER parchment, CLOSING / END art; the
v2.9.14 SALE and Store Support notes) are this version's record; UI_UX §SALE, §MENU / SETTINGS VISUAL, §ORDER, §CLOSING own the presentation.

## SALE phone density (User 2026-10-03; shipped in v2.10.1)

- **A denser phone SALE** (User: 판매 중에 너무 다글다글한데): state and 소지 type one step smaller; the card and the side column end on
  one line; a shorter destination plate whose `{능력치} n당 대응 1 제공` tails move into one `?`; 손님 `■■■■■` with no `1/5` (the count
  stays as its screen-reader label); a smaller 보유 골드 figure and a 44 px `손님 보내기`; shelf rows put `재고 N · 폐기까지 N일` on one
  line and the phone tray header drops them. UI_UX §SALE destination plate, §PRIMARY ACTION GRAMMAR, UI-Q-v28-3; test ui-guard.
- **SALE price keys and desk card** (User 2026-10-03): price keys use the key asset set with a corner ribbon (role name, no visible %), amount centred, `이익` line quieter, 3 px press; on a desk the card art is shorter with a larger nameplate and 단골 badge, and the waiting count has a dark plate. Phone ribbon smaller than the desk ribbon.
- **SALE backdrop, shelf head, desk column, type ladder** (User 2026-10-03): the SALE backdrop is the wide store art without its ceiling, side
  shelves at the edges, dimmed under the cards; the shelf head is the wooden plank asset across the whole shelf frame; on a desk the
  status / outlook / destination column is as tall as the card and one width, with larger type, and the waiting deck is larger; stats, item
  effects and stock / expiry sit one step quieter than names and prices; stat values use the shelf price's type; the three price keys are the supplied
  wood-and-colour key assets with no flag colour bar; the phone backdrop is the portrait store art; the tray's bottom rule is the same 4 px board edge as
  the rule between the halves. UI_UX §SALE.

## v2.10.0 quick patch 3 — a tidier ORDER sheet, costlier failures (User 2026-10-03; the version stays 2.10.0)

- **At most four Hazard Counters on a sheet** (User: 쓸모없는 대응템만 나와서 답답할 수 있겠다 · 발주 전체에서 대응템이 차지할 수 있는 칸은 최대
  4칸 · 보정은 똑같이 · 0칸도 될 수 있게): once four Items with any Hazard 대응 are on the sheet (ordinary and extra slots alike),
  every further slot draws from the rest; a sheet may hold none. Every slot a Store Support or an Event adds raises the cap by
  one (User: 발주 칸 자체가 늘면 대응템 한도도 늘게). About half of a six-slot sheet was Counters, of which a third
  to two thirds fit no Gate open that Day. The Counter guarantee is unchanged; on a sheet already at four it takes a Counter's
  slot. ECONOMY_ORDER §ORDER OFFER VARIETY; test revision.
- **Newcomers keep up** (User, from a main-build save that ended on the death limit at DAY 19 - the four Lv10+ adventurers
  won 69% with no death, the eleven others 2% with all nine deaths: 신규 레벨 따라잡기): the spawn Day term is
  floor((Day − 1) × 0.4) from DAY 5 (was × 0.25; DAY 1~4 stay Lv1~2 with no Day term). Sending newcomers to Tier I Gates was
  tried and dropped (User: 레벨 최저선이 올라갔으니 괜히 복잡해진다). META §Exact spawn-Level model; test events.
- **A misstep costs more** (User: 대응을 잘하면 이기나 삐끗하면 페널티가 크게 · 실패 시 부상·중상·사망 확률 키우고 · 연속 부상 출전도 폭 키우기;
  부상이 중상으로 번지는 36%는 유지): the failure Death coefficients CombatDeficit × 0.30 → 0.40 and EnvironmentDeficit
  × 0.20 → 0.25 (cap 0.50 unchanged); the escape base on a lost fight 0.48 → 0.40; strainEscalation +8%p → +12%p per
  consecutive injured departure, cap 30%p → 40%p. SuccessEase stays 0.90 / 0.95: a 0.85 / 0.90 trial raised every success band
  by 8~10%p and fresh D30 from ~46% to ~58% (archive/v2.10.0/v2100-measure/qp3-bundle.log). DUNGEON_HAZARD §ORDINARY EXPEDITION
  FAILURE DEATH RISK, §Healthy / injured failure Death chance, escapeChance; test night.
- **The 후보 전체 교환 key is narrow and right-aligned** (User: 리롤이 영업 시작보다 넓어서 자꾸 누른다 · 우정렬 · 세로 여백 줄이자): as wide
  as its words (296 → 155px on a 360px phone), at the sheet's right edge, its margin 12 / 6 → 8 / 4px. UI_UX §ORDER Reroll UX.

## v2.10.0 quick patch 2 — the till breathes again (User 2026-10-03; the version stays 2.10.0)

- **A thicker visit Wallet** (User, from a quick-patch-1 save stuck at 200~800G through DAY 18: 자금이 마르니까 진행이 잘 안 됨 · 운영비를
  완화하든 지갑을 개선하든; then, after measuring the two apart: 지갑만 유지하고 운영비는 170G로): the visit income is Level × 4 + 30~70
  (was Level × 3 + 20~60) and the Away Wallet keeps its half-a-visit rule, Level × 2 + 25 a banked Day (was Level × 1.5 + 20). The
  operating base stays 170G: lowering it to 140G as well only fattened the till (cash +40G a Day) and took fresh-Run bankruptcy
  from about 1.5% to 0.1%, with the same DAY 30 reach. The success Wallet × 1.25 and the 소지금 lunches are not touched.
  ECONOMY_ORDER §Ordinary NPC Wallet on visit / §Away Wallet; test revision.

## v2.10.0 quick patch 1 — no early ease, a softer opening roster (User 2026-10-03; the version stays 2.10.0)

- **One SuccessEase through DAY 21** (User: 프레시 계정 DAY 1에 아무것도 안 줬는데 우세가 뜬다, then after the ablation measure: 0.90으로
  D21까지 통일): × 0.90 on DAY 1~21 (was 0.92 on DAY 1~7, 0.90 on DAY 8~21), × 0.95 from DAY 22 unchanged. Taking the early ease
  away altogether, with the Lv1~2 roster, dropped DAY 1~7 success from 54% to 26% and ended fresh Runs on the death limit around
  DAY 9; the roster alone keeps the empty-Bag DAY 1 forecast off 우세. DUNGEON_HAZARD §GATE POWER — LATE-DAY SLOPE / DUN-Q; test night.
- **The opening roster is Lv1~2**: the ordinary spawn Level draws 1~2 on DAY 1~4 (it was 1~3 like every Day; User: Lv1~2 구간을
  좀 더 넓히자), so the first newcomers start low too; DAY 5 on is unchanged. With it, an empty Bag on DAY 1 reads 접전 or 불리, never 우세 (also with the × 0.90 ease) (NPC_TRAIT §GROWTH TARGET: a newcomer's noItem
  forecast ≈ 접전~불리). META §Exact spawn-Level model; tests revision, events (the rookie Level guard reads behaviour now; the
  Gate-cover check plays 40 Runs, as harder opening Days end some Runs before enough multi-Gate Days are seen).
- **A steeper Hazard Threat from DAY 8** (User: 수치가 보여서 초록색 만들기 게임이 됐다 · 이후부터 대응+포션 1개가 답이 되지 않게;
  curve A, its late term measured at 0.45 / 0.35 / 0.25 and set at 0.25): Threat = 12 + Day × 0.35 + max(0, Day − 7) × 0.25
  + (Tier − 1) × 6 - DAY 1~7 unchanged, D21 T2 26 → 29, D29 T3 35 → 40. The Final keeps the curve without the late term (Day 30 / T2 = 29): with it, a weak
  third adventurer's Hazard gaps outweighed their Power and a full party read weaker than two. DUNGEON_HAZARD §HAZARD THREAT /
  DUN-Q71; tests vocabulary, ui-guard, simulation.
- **One Hazard scale: every Core Stat ÷3, no Stat-group factor** (User: 깡스탯 음식·음료로 채워지는 게 너무 크다 · 강인도 그냥
  3당 1 · 계열계수도 다 없애면 되겠다): 기동 / 정신 answer at ÷3 (was ÷2), 강인함 stays ÷3, and the Threat loses its 강인함 1.0 /
  기동 1.1 / 정신 1.2 factor - each Stat group's average share is about the same, so every Hazard reads one Threat. A stat Drink
  no longer stands in for a Counter. The Gate rows read `{능력치} 3당 대응 1 제공` everywhere; the Hazard Traits drop the factor
  too (용감함 / 겁쟁이 / 화염공포증 / 내열성 ±7 → ±6, 눈썰미 / 약시 화이트아웃 ±5 → ±4). DUNGEON_HAZARD §Hazard Defense / §HAZARD
  THREAT / Gate sentence, NPC_TRAIT, COPY_AUDIT, COPY_WORLD_VOICE, SALE, UI_UX; tests ui-guard, traits.
- **Every Epic Food / Drink fights** (User: 영웅이랑 차이가 별로 없다 · 희귀는 소지금 획득도 있는데 · 투력 6으로 통일): 영웅 결전 도시락,
  왕도 천연암반수, 초고속 에너지드링크 and 대현자 허브엘릭서 add 투력 +6, Stats and 피로 회복 unchanged - so an adventurer strong in a
  Hazard's Stat can answer it with that Stat's Epic Drink and a Counter for the other Hazard, and still fight; 길드 특제 도시락 stays
  the earning lunch. Their prices rise between 상급 포션 (195) and 최상급 포션 (235), as each now fights and answers a Stat group:
  초고속 에너지드링크 / 대현자 허브엘릭서 175 → 205, 왕도 천연암반수 185 → 210, 영웅 결전 도시락 210 → 230 (Sell × 2). ITEM §ACTIVE
  CATALOG / ITEM-Q prices / DI-Q-v28-1; test vocabulary.
- **The Counter ladder re-cut for the steeper Threat** (User: 피로 회복 같은 게 달린 건 감안해서 깎고 · 전문 대응템에 메리트 · 이온음료는
  페널티도 없다): one value per rung for every Hazard - the Field Gear 중반 대응 28 (was 23 / 23 / 22), Tier 2 surely and 대응 at
  late Tier 3; a Food / Drink Counter reads 2 (초반) / 3 (중반) under its Field Gear rung for its 피로 회복 - 컵라면 · 얼음컵 · 중화
  탄산수 · 집중 사탕 12 → 10, 용사의 곡주 22 → 25, 불룡볶음면 냉기 21 → 23 (its 강인함 +6 counted), 쿨링 이온음료 22 → 23 (no
  drawback, 2 lower again); the 초반 하이브리드 first Hazard 11 → 8 (under the Food 초반 대응), its second 12 (방한 두건 화이트아웃 13
  → 12); 방진마스크 12 and the 후반 하이브리드 18 unchanged (the steeper Threat already takes the Epic hybrid from 충분 to 대응 on late
  Tier 2). Prices unchanged. ITEM §COUNTER LADDER / §ACTIVE CATALOG / ITEM-Q, RELIC (예시), UI_UX (집중 사탕 예시); test vocabulary.

- **Levels and Wallets snowball less** (User, from a main-build save that cleared its first Run: 레벨은 무조건 돌려야 · 소지금 큰 게
  너무 스노우볼 · 경제도 깎아야): the expedition EXP × 1.2 becomes × 1.1 (base 26.4 + Day × 5.52 → 24.2 + Day × 5.06; × 1.0 measured too
  harsh with the rest of this patch) - the save's lead warrior reached Lv23 in 18 expeditions, about one Level per late success; a 성공 / 대성공 pays the expedition Wallet reward × 1.25
  (was × 1.5) - the same warrior brought home +867G on D28. DUNGEON_HAZARD §Ordinary EXP / expedition-Wallet; tests night, revision.

- **Every Core Stat counts alike, each with one small side role** (User: 가중치는 없애되 직업별 특색은 살리기 · 능력치당 역할이 게임
  판도를 바꿀 만큼 크지 않게 · 코치에도 알려 줘): Prepared Power = 투력 × 0.50 + (강인함 + 기동 + 정신) × 0.27 (was .34 / .27 / .20;
  the average adventurer moves under 1%, a Job at most ±3%), the Final's individual Power the same. Side roles, small: 강인함 keeps
  its incident cut (× 0.001), 기동's escape on a lost fight drops to × 0.003 (was × 0.005), and 정신 now trims the failure Death
  chance by × 0.003, at most 15%. The SALE STATS coach adds one sentence naming the three roles, no numbers. DUNGEON_HAZARD
  §PREPARED POWER / escape / §Spirit steadiness, FINAL_EXPEDITION §INDIVIDUAL FINAL POWER, COPY_AUDIT §3-7; tests vocabulary,
  final, night, simulation, relic-effects, ui-guard.
- **One Stat Food / Drink value per Rarity** (User: 등급마다 올려 주는 스탯은 높게 · 도시락 강인함도 깎고 · 영웅 투력 5): Drink 12 / 17 / 20
  + 투력 5, Food 6 / 9 / 12 / 15 + 투력 5 - 생수 10 → 12, 진정 허브티 15 → 12, 녹차 양갱 8 → 6, 간단 도시락 12 → 9 (원정 소지금 +20% → +10%,
  100 → 90G), 길드 특제 도시락 16 → 12 (+40% → +25%, 185 → 165G), 영웅 결전 도시락 18 → 15, 왕도 천연암반수 24 → 20, 초고속 에너지드링크
  26 → 20, 대현자 허브엘릭서 28 → 20 (the four Epics 투력 6 → 5; 205G / 180G / 180G / 180G). ITEM §STAT FOOD / DRINK LADDER /
  §ACTIVE CATALOG / DI-Q-v28-1; tests vocabulary, relic-effects.

- **A lost fight kills less often** (User, after the second measure ended 80% of fresh Runs on the death limit around DAY 17:
  실패 시 사망의 전투 결손 계수만 풀고): CombatDeathContribution = CombatDeficit × 0.30 (was × 0.40); the environment term, the caps
  and the injured / 탈진 / strain terms are unchanged. DUNGEON_HAZARD §ORDINARY EXPEDITION FAILURE DEATH RISK / DUN-Q; test night.

## v2.10.0 — success meta (User 2026-10-02 ~ 2026-10-03)

- **The hidden reputation is gone** (User: 평판처럼 몰래 하는 건 안 된다 · 싹 없앤다): the Run no longer keeps a 0~100 reputation
  that moved with each Night's results and scaled every Gate's required power by up to ±5% the next Morning. Gate power is the
  Gate formula and the day's Event only; the Night no longer writes the unseen reputation line. DUNGEON_HAZARD §GATE POWER —
  LATE-DAY SLOPE; tests revision.
- **Success uplift** (User: 성공도 콱 늘린다 · 게임 메타가 바뀌는 거라): every ordinary Gate's required Power × 0.92 on DAY 1~7,
  × 0.90 on DAY 8~21 and × 0.95 from DAY 22 (SuccessEase, on the finished Gate Power, before the Event; the late step is the
  second pass, User 2026-10-03: 후반 완화는 줄이고 초반은 그대로); expedition EXP × 1.2 (base 22 + Day × 4.6 →
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
- **A failure costs more when the preparation is short** (User 2026-10-03: 사망도 좀 풀어야 · 준비·전투 전망이 부족할수록 늘어나게 ·
  상한은 둔다): the failure-conditioned Death chance is CombatDeficit × 0.40 + EnvironmentDeficit × 0.20 (was × 0.18 / × 0.12),
  healthy cap 50% (was 30%); the injured, 탈진 and strain terms still add their %p and lift the cap with them (injured 60%,
  injured + 탈진 70%). Still one roll, only on the failure path. DUNGEON_HAZARD §ORDINARY EXPEDITION FAILURE DEATH RISK /
  DUN-Q77 / DUN-Q78; tests night, integration.
- **The Final keeps pace** (User: 대응템·포션을 올리면 마왕전도 쉬워진다 · 도달 시 클리어는 좀 높게): WRATH 180 → 240 (User: 딱 떨어지게), the
  FIRE pair +18 → +24, the GREED shortfall cap +11 → +15 (255 at most), SLOTH by breaks 200/189/171/149 → 267/252/228/199 (all × 4/3).
  The first pass (210) left clear-given-reach at 76%; on the grid measurement's reached parties (`archive/v2.10.0/v2100-measure/grid.log`,
  arm 0.95 / 안1) 240 reads as about 57% clear-given-reach and 26% overall. BOSS §WRATH / §GREED / §SLOTH,
  FINAL_EXPEDITION §FAMILY-PAIR BALANCE AUDIT; tests final, simulation.
- **Measured against the updated targets** (User 2026-10-03: 목표를 지금 수치 정도에 맞춰): reader / expert fresh Runs read ordinary
  success 54 / 48 / 50 / 46% by Day band, D30 reach 46%, clear-given-reach 60~63%, overall clear 27~29%; the targets are now those
  figures (`GAME_VISION.md` §Difficulty Curve, its reference lines; measured in `archive/v2.10.0/v2100-measure/README.md`). The all-Decorations / skilled line is
  re-read after the Decoration changes: D30 75~98%, clear-given-reach 40~75%, clear 40~57%.
- **추모 방명록 사망 한도 +2 → +1** (User 2026-10-03, after the single-Decoration measurement: alone it was the strongest piece,
  클리어 +22.9%p, with the Death limit now ending half the Runs; `archive/v2.10.0/v2100-measure/deco-single.log`). META §counter — 추모 방명록,
  COPY_AUDIT §여덟 장식.
- **Three Decorations rebalanced after the single-Decoration measurement** (User 2026-10-03): 알뜰 금고 now gives the Day's first
  customer +200G Wallet (+100G measured +0.7%p clear, so 200G) (was +50G Store Gold every morning, which moved clear by +0.9%p; the receipt loses its 알뜰 금고 row);
  명예 모험가 액자 above-평범 chance 75% → 60% (weights [40, 32, 18, 8, 2]); 구급품 진열장 is remade: while worn, an adventurer who
  departs 만반의 준비 has 투력 × 1.05 and the rolled Death chance × 0.50 instead of × 0.80 (× 0.60 alone measured +1.8%p clear) (was ten 부상 → 무사 a Run, the most zombie-prone piece). META §wall / §counter /
  §display, DUNGEON_HAZARD §Preparation / Level Death reduction, NIGHT_CLOSING §CLOSING — CASH FLOW RECEIPT, COPY_AUDIT 7-3 / 9-5;
  tests integration, revision.
- **Decoration value follows the Slot price** (User 2026-10-03, after the single-Decoration measurement: the cheapest display Slot
  was near the top and the dearest sign Slot near the bottom): both sign Decorations 1250 → 1500 Store Capital (money gathers faster late; total 3,750),
  원정 지원금 간판 purse share 25% → 50% (40% measured +4.4%p clear), 훈련소 제휴 간판 Level +1 chance
  40% → 55%, 의무실 현판 heal 45% → 40%, 알뜰 금고 now the Day's first two customers +200G each, 길드 추천 매대 45% → 35%, 구급품 진열장
  Death roll × 0.50 → × 0.60 (투력 +5% kept). META §sign / §wall / §counter / §display, DUNGEON_HAZARD §Preparation / Level Death
  reduction, COPY_AUDIT 9-5; tests integration, revision.
- **UI_UX END tape names the current Store Capital rates** (1 / 2 / 3 / 3 / 3%; it still read 1 / 2 / 3 / 4 / 5% from before the
  v2.9.13 change). UI_UX §END.
- **A short Decoration key** (User 2026-10-03: 버튼 영역을 줄이고 효과 영역을 넓게): the buy key reads `구매` over a small `{가격} 자본`
  (was `{가격} 자본으로 구매`), beside the name on the card's first row, and the effect line runs the card's full width on the
  row below (the key is one 48 px height whether it reads 구매 or 해제, so buying never resizes the card); the eight effect lines
  drop their closing period; 구급품 진열장's effect line is shortened
  to `…로 떠나면 실패 시 사망 위험 -40% (기존 -20%).`. UI_UX §DECORATION DECISION SURFACE, COPY_AUDIT 9-5.

## v2.9.14 quick patch 1 — the strain words find a home (User 2026-10-02; never released alone, it ships in v2.10.0)

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

## v2.9.14 quick patch — 단골 배지 · NIGHT 배경 · 회복 문구 (User 2026-10-03)

- SALE 손님 카드: 단골은 이름판 오른쪽 금빛 배지로 알린다. 상태줄의 `· 단골` 글자와 이름판 왼쪽 등급 색 띠는 뺀다. UI_UX §CURRENT CUSTOMER STATE, SALE §CURRENT CUSTOMER COMPACT STATE.
- NIGHT: 절차 그림 대신 비 오는 밤 편의점 그림. 맨 위까지 가득 채우고 귀환 줄 바로 위에서 끝난다. 메뉴 키는 더 진하게, 오늘 할 일 줄은 위쪽 어두운 그라데이션 위에 둔다. UI_UX §NIGHT LAYOUT.
- 부상 회복 한 줄을 `의무실 현판으로 부상 회복` · `응급 처치대로 부상 회복` · `길드 의료단으로 부상 회복`으로 줄여 상태 칸이 세로로 늘지 않게 한다. COPY_AUDIT §9-4 · §9-4b · §13.
- 메뉴가 여는 시트(설정 · 모험가 수첩 · 현재 지점 포기 등)는 한 장의 나무 틀과 세로 리듬을 쓴다. 닫기는 키·판 없는 밝은 ✕ 하나이고, 점포지원 창도 다 쓰면 같은 ✕로 닫는다. 메뉴 키(☰)는 모든 페이즈에서 놋쇠 테두리 어두운 나무다. UI_UX §MENU / SETTINGS VISUAL.
- 시트 · 설정 · 초기화 · 가져오기 · 포기 문구와 원정 실패 문구는 `~다`체로 통일. COPY_AUDIT §1-3 · 설정 행.
- 발주서는 점포지원과 같은 찢긴 양피지 틀 위에 놓인다(CSS 찢김 띠 · 평지 제거). UI_UX §ORDER.
- 마감 영수증과 END는 NIGHT와 같은 비 오는 편의점 그림(폰 세로 · PC 가로) 위에 선다. END 총매출의 G는 작게. UI_UX §CLOSING.

## v2.9.14 — play feedback (User 2026-10-02; worked as v2.9.13 quick patch 13)

- **SALE currency suffix correction on `ui/design-trim`** (User 2026-10-03): restore the existing Mulmaru Mono price
  digits. Only G uses smaller Wanted Sans with a small gap; retain the preceding stock/expiry/category contrast pass.
  UI_UX's local price rule follows this newer instruction; gameplay and final-supply markup stay unchanged.

- **SALE information legibility on `ui/design-trim`** (User 2026-10-03): use the canonical Wanted Sans information face
  for shelf/till prices so the live G suffix remains identifiable; raise phone stock/expiry and tray-category contrast.
  Preserve character size, shelf rows, complete effects, three price ribbons and gameplay. Store Support's current
  design is acceptable per the User's latest clarification; this batch leaves it unchanged.

- **Store Support desktop stack / readable first guide on `ui/design-trim`** (User 2026-10-03): enlarge desktop contracts,
  stack all three vertically, and use a wide blank paper asset plus desktop type steps. Short viewports scroll without
  squeezing. Replace the first-window footer wording with the User's two sentences about 5-day choices and the Day4 free
  pick in morning/order. Dark 14px text sits on an ivory slip with complete phrase breaks. UI_UX / COPY_AUDIT own the
  presentation/copy; prices and acquisition/save rules stay unchanged. Visual approval remains separate.

- **Store Support contract sheets on `ui/design-trim`** (User 2026-10-03): replace the gray panels and full-width yellow
  keys with clipped blank paper contracts, compact gold choice/purchase tags and live text for every price. Zero-cost
  first support reads 무료; later costs use the existing candidatePrices. Remove the enclosing brown footer and use
  compact wood reroll/defer tags. Supplied backgrounds, game data and acquisition flows stay unchanged. UI_UX owns this
  presentation proposal; final visual approval remains separate from implementation QA.

- **Store Support warehouse selection on `ui/design-trim`** (User 2026-10-03): preserve all three supplied JPEGs byte for byte,
  apply portrait/wide warehouse backgrounds to the selection takeover, and adapt the reference to a restrained wood title,
  thin-edged slate candidates and full-width yellow choice keys. Desktop keeps three equal candidates; the defer/reroll footer
  stays separate from the scroll. RELIC values, three-candidate rule and acquisition/save flows are unchanged. UI_UX owns the
  presentation; original hashes/roles are recorded under reports/references and ASSETS.

- **SALE price ribbons on `ui/design-trim`** (User 2026-10-03): retain the fixed character and shelf/support band, centre its
  mixed-font elements, remove repeated customer/wallet/base price from the phone tray, and place stock/life beside the Item.
  The phone's three equal price keys carry role/percentage on an internal left ribbon, price/profit in two right-hand lines,
  with lighter 2px depth and 48px targets. Numberless utility descriptions replace only their redundant no-change row; numeric
  no-change warnings remain. Bounded opening reveals the next shelf peer whenever both fit, also on short phones. UI_UX / COPY
  own the contract. Review remains PNG; final visual approval is separate.

- **SALE spacing review on `ui/design-trim`** (User 2026-10-03): give the nameplate/destination real text clearance, remove
  cast shadows entering neighbouring planes, and restore the phone tray's full-width Item/effect blocks plus a separate
  customer/stock row. Reserve space for price-key depth/press above the dock. Readability takes priority over the old compact
  row budget: representative 640/597/548-high visits keep 2/1/1 complete rows with a bounded tray-opening reveal; an open
  swap keeps its anchor. UI_UX owns the new spacing/QA contract. Review evidence is PNG, without a new PDF (User).
  Runtime follow-up: a reopened strip resets its scroll baseline so the larger band's settling does not immediately fold
  it again; subsequent user scroll still folds. The new opening reveal is explicitly SALE-only, preserving FINAL selection.

- **SALE resized details on `ui/design-trim`** (User 2026-10-03): scale the phone nameplate's name/rarity/Level-Job to
  14/9/11px without clipping, keep the full tray rarity edge clear of its SVG, and move the hand-over between actual icon
  bounds. SALE's nine coach marks hug the live resized target and use the actual desk/phone scroller. UI_UX §SALE — MOBILE
  AUTHORITY, §COUNTER TRAY and UI-Q-v28-27 own the behavior. Final visual review remains separate.

- **SALE design candidate on `ui/design-trim`** (User 2026-10-03): restore the phone character to about 85–90% of the pre-trim
  size, keep both Bag targets clear of the menu, and recover comparison space through a readable local type ladder and
  aligned tray metadata. Deep nomination follows the phone shelf, still before purchase; desks keep the control placement.
  SALE reuses MORNING's untouched portrait/wide room assets behind dark information planes. UI_UX §SALE — MOBILE AUTHORITY,
  §COUNTER TRAY, §MOBILE SALE DENSITY, §FUNCTION / FLAVOR, §SHORT PHONE and UI-Q-v29-18 own the approved behavior.
  Implementation approval does not close final visual review; no balance/version/main/release change.

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
  value changed. `archive/v2.9.13/relic-balance/EVALUATION.md`.

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
  (`archive/v2.9.13/item-price-v2913.md`, `archive/v2.9.13/counter-ladder-v2913.md`). ITEM §ACTIVE CATALOG, §세계수 생환부적,
  §ITEM ROLE NOTES, §PRESENTATION ORDER.
- **환경 대응 per Hazard from T2**: on a two-Hazard Gate the SALE readout and the forecast pin name each Hazard with its own
  frozen state, since judgment sums both gaps; states only. The cell stays two lines (desk: states side by side under the
  label; phone: two rows beside it, names right-aligned). SALE §always-on outlook, UI_UX §SALE outlook / §FORECAST PIN / UI-Q109.
- **Measurement basis `reader`** (User 2026-10-01): progression and balance are read with `reader`, `expert` (reader plus
  the User's habits, on the User's account) its upper reference. Harness defaults, `tests/simulation.cjs`, the measurement
  scripts and tools follow. META §Approved progression expectation: 1st Decoration Run 4, four Slots Run 9 (`reader`
  4 / 5 / 7 / 9, `expert` 4 / 6 / 7 / 9).
- Shipped re-measure (300 seeds; `archive/v2.9.12/balance-proposal-v2912.md` §10): `reader` D30 12.3%, clear 7.7%, Store Capital
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
  when a best Day was the only line left (`archive/v3.0-prep/v3-prep-measure-v2911.md` §2). The account now also keeps its best 총매출
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
