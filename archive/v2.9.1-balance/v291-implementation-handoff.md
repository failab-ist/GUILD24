# v2.9.1 밸런스 — 소스 반영 핸드오프 (2026-09-25)

AGENTS.md를 먼저 읽고 따른다. 이 문서는 실행 지도이지 Design Truth가 아니다. 이 문서와 owner 문서가 다르면 owner가
우선이고, 차이는 여기서 고치지 말고 보고한다.

- Design Truth: v2.9.1 owner 변경 (`design_ssot/CHANGELOG.md` §v2.9.1에 owner별 커밋이 있다)
- 결정값 한곳 정리: `reports/v29-balance-agreements.md`
- 측정과 User가 수용한 차이: `reports/v29-balance-ideal.md` (§종결 측정이 최종 상태)
- 기점: 브랜치 `claude/sleepy-volta-ywkjeu`(main 병합 완료) 또는 User가 이를 main에 병합했다면 현재 `main`. 여기서 새 브랜치.
- 정지 경계: 아래 배치 1~6을 배치마다 커밋, 그다음 §7 마무리 검증 → 보고 → STOP. 열린 설계 결정은 없다.
  테스트나 측정을 통과시키려고 값을 조정하지 않는다 (AGENTS §5 / §9).

---

## 0. 시작 전

환경(클라우드 컨테이너):

```text
git fetch --unshallow                      # ssot:check가 옛 커밋을 읽는다
pip install fonttools brotli               # tests/assets.cjs에 필요
NODE_PATH=/opt/node22/lib/node_modules     # qa:runtime / qa:visual은 전역 playwright 사용; Chromium은 /opt/pw-browsers/chromium
```

기점 확인: 아무것도 고치기 전에 `npm test` PASS, `npm run ssot:check` 21개 PASS. 둘 중 하나라도 실패하면 멈추고 보고한다.

소스 반영 대기 문구: COPY_AUDIT §9-5(장식 효과 줄)와 §13-23(위령제)은 `**승인 — v2.9.1 소스 반영 대기**` 표기로 되어 있다.
`tests/copy.cjs`는 `**현재…**` 표기 아래 줄만 소스와 대조하므로, 그 문구를 소스에 넣는 배치(4, 6)의 같은 커밋에서 표기를
`**현재**` / `**현재 Flavor**` / `**현재 Function**`으로 바꾼다. 그러면 테스트가 새 문구를 소스에서 찾는지 확인한다.

참고 구현: 아래 규칙은 모두 `tools/remeasure-v29-variants-worker.cjs`의 메모리 안 텍스트 패치로 측정했다(표의 마지막
열이 옵션 이름). User가 승인한 동작 그대로지만 하네스 코드다(`globalThis.__*` 카운터, 문자열 치환). 파일의 기존
주석 방식에 맞춰 정상 소스로 다시 구현하고, 전역 변수 방식은 복사하지 않는다.

테스트 규칙: 옛 값을 핀하는 테스트는 **이 문서가 적은 owner 값으로만** 고친다. 새 코드가 출력하는 값을 기대값에 복사하지
않는다. 여기 없는 이유로 테스트가 실패하면 멈추고 보고한다.

---

## 1. 배치 1 — 원정 규칙 (`dist/systems/dungeon.js`, `dist/systems/shop.js`)

owner: `DUNGEON_HAZARD_v2.8.0.md` §FATIGUE OUTCOME BASELINE, §Ordinary resolve(Severe chance), §Healthy / injured failure
Death chance(strainEscalation), §Preparation / Level Death reduction, §RETREAT HEALING, §BAD-LUCK PREPARATION ASSIST (hidden),
§Ordinary EXP / expedition-Wallet, §GATE POWER — LATE-DAY SLOPE.
QA: `DUNGEON_ITEM_QA_v2.8.0.md` DUN-Q73, DUN-Q-v29-3, DI-Q-v28-14, DUN-Q-v29-BC1 / BC2 / BC3, DUN-Q-v27-GATE-SLOPE.

| # | 규칙 | 현재 코드 위치 | 변경 | 하네스 옵션 |
|---|---|---|---|---|
| 1a | 중상 피로 증가 0 | `outcomeBaseline=dead?0:outcome==='퇴각'?7:(outcome==='부상'\|\|outcome==='중상')?9:4`, `rawOutcomeFatigueGain=dead?0:…` (~l.556) | 중상 → 0, 특성으로도 못 올림. 두 줄에서 **피로에 한해서만** `중상`을 `사망`처럼 다룬다. 다른 곳의 `dead` 의미(생존·부상·기록)는 바꾸지 않는다. 위 주석 갱신 | `sev: 0` (하네스는 `dead` 자체를 바꿨다 — 그대로 따라 하지 않는다) |
| 1b | 중상 비율 .36 / .11 | `clamp(.42+…)` 2곳, `clamp(.13-…)` 4곳 — l.336 / 345 / 350(RESULT-PROOF 가상 판정), l.488 / 501 / 506(실제) | `.42 → .36`, `.13 → .11` **6곳 모두**. 가상 판정은 실제와 같아야 한다 | `sevp: [.36,.11]` |
| 1c | 좀비 컷: 연속 부상 출발만 | `STRAIN`, `strainEscalation`, `strainRuns`, `strainFor` (~l.259–264); 호출 l.284, l.459 | `strain = min(0.30, 0.08 × max(0, c − 1))`, c = 이번 출발(injury=1일 때) + 바로 앞에서부터 끊기지 않고 이어진 `departedInjured` 기록 수. 건강하게 출발하면 0. 피로 항은 삭제(다른 곳이 `STRAIN.weary`를 읽으면 유지 — grep). 기록의 `departedWeary`는 계속 남긴다. NPC 상세 줄은 배치 6에서 바꾼다 | `strain: 'consec'` |
| 1d | 만반의 준비 × 레벨 보정 | 실패 분기 `deathChance=…; deathRoll=r.next(); if(deathRoll<deathChance){outcome='사망'}` (~l.479–482) | `rolled = deathChance × prepared × level`. `prepared = 0.80`: 부상 없이 출발(`n.injury===0`) + `e.fatigueBeforeExpedition < 20` + `n.pack.length >= 2`, 아니면 1. `level = max(0.75, 1 − 0.015 × (n.level − 1))`. `deathRoll < rolled` → 사망. `rolled ≤ deathRoll < deathChance` → 한 번 더 뽑아 `bandRoll=r.next()`, `bandRoll < 0.36 ? '중상' : '부상'`, 이후 보험·구급키트 단계는 보통의 중상·부상처럼 진행. 그 밖 → 기존 비사망 분기. 이 구간에 걸렸고 `prepared<1`일 때만 보고 이벤트(예: `id:'prepared'`)를 넣고, 문구는 COPY_AUDIT §19-9 `{이름}은(는) 만반의 준비 덕분에 목숨을 건졌다.` (조사는 받침으로, 경로 변경 줄이 이미 하는 방식). 조건은 순수 함수 하나로 export(예: `G.Dungeon.fullyPrepared(n, fatigueBeforeExpedition)`)해서 1d와 튜토리얼(배치 5)이 같이 쓴다 | `prep: .8`, `lvl: {slope:.015,cap:.25,from:1}` |
| 1d′ | RESULT-PROOF 가상 판정 | `shadowSettle` (~l.300–360) | 1d를 가상 가방으로 똑같이: `sRolled = sDeathChance × sPrepared × level`. 실제 판정에서 `ev.bandRoll`을 기록하고, 가상 판정에서 제거 구간에 걸리면 `ev.bandRoll`을 쓴다(없으면 `UNPROVEN`). 아이템 하나를 뺀 가상 가방은 `prepared`를 잃을 수 있다 — 맞는 동작이고, 두 번째로 판 아이템이 목숨을 구했음을 증명하는 경로다 | (하네스에는 없음 — `injuryRoll`을 재사용했다. 제대로 구현) |
| 1e | 판매 화면 `실패 시 사망 위험` | `failureDeathRisk(n,d,facilities)` (l.282), 읽는 곳 `shop.js` l.345, `simulation.js` l.297 | 돌려주는 `chance`에 `level`을 곱한다(`prepared`는 절대 곱하지 않음) | — |
| 1f | 퇴각 치유 | `n.injury=…outcome==='퇴각'?n.injury:…` (~l.546) | 부상 상태로 출발해 퇴각하면: `k` = 바로 앞에서부터 이어진 `departedInjured && outcome==='퇴각'` 기록 수. `r.next() < min(1, 0.25 × (1+k))`면 injury 0, 아니면 유지. 기록은 나중(l.591)에 넣으므로 여기의 `n.records`는 이전 원정뿐이다. 나았을 때 보고 이벤트(예: `id:'retreatHeal'`), 문구 COPY_AUDIT §19-9 `{이름}은(는) 물러나 쉬는 동안 부상이 나았다.`, 확률은 표시하지 않는다. 추가 뽑기는 이 경로에만 | `retreatHeal: .25` |
| 1g | 소지금 배율 대성공·성공 1.00 | `WALLET_MULT` (l.253) | `'대성공':1,'성공':1`, 주석 | `wallet: 'succ1'` |
| 1h | 게이트 날짜항 | `GATE={knee:9,early:1.70,late:0.40}` (l.270) + 주석 | `early:1.20, late:0.80`. 주석의 "D1-D9 is unchanged"는 이제 틀리므로 다시 쓴다 | `gate: {early:1.2, late:0.8}` |
| 1i | 배드럭 보정 (숨김) | `shop.js` `night()` 루프 (l.463)의 `G.Dungeon.resolve(n,d,this.rng,s.facilities,s)` 주변; `dungeon.js` `const ability=preparedPower(e)`, `environment=clamp(.06+…)` | 밤마다 `chain=0`. resolve 전에 `carried = n.pack.length>0 && !d.deep`, `assist = carried && chain>=3 ? 0.10 + 0.05×(chain−3) : 0`. `assist`는 인자나 옵션 객체로 resolve에 넘긴다(전역 금지). resolve 안에서 전투 판정 `ability × (1+assist)`, `environment × (1−assist)`. 끝나면 carried일 때 `성공/대성공 ? chain=0 : chain++`. 최종전이 이 루프를 거치지 않는지 확인. 가상 판정도 같은 값을 쓰도록 `ev`에 `assist` 기록. 화면에는 아무것도 없다 | `badluck: {base:.1, step:.05, after:3}` |

이 배치에서 고칠 테스트 (기대값은 owner 기준):
- `tests/night.cjs` ~l.980 `DUN-Q-v29-3`: `Dungeon.STRAIN` / `strainEscalation(i,w)` 표 → 연속형(1 → 0, 2 → .08, 3 → .16, 5 → .30,
  건강 출발 → 0, 피로는 무관). 테스트 제목을 v2.9.1로.
- 중상 피로 +9, `.42` / `.13`, `WALLET_MULT` `.90`, `GATE` 1.70 / 0.40, 날짜항 기준값(D12 16.50, D24 21.30 → 13.20, 22.80)을
  단정하는 테스트: `grep -n "1.70\|16.50\|21.30\|\.90\|중상.*9" tests/*.cjs`.
- BC1 / BC2 / BC3 테스트 추가(`tests/night.cjs`가 출발 상황을 만드는 방식대로, 시드 고정 또는 RNG 스텁).

검증: `npm test`, `npm run ssot:check` (문서 변경 없음).

---

## 2. 배치 2 — 아이템 카탈로그 (`dist/data/catalog.js`)

owner: `ITEM_v2.8.0.md` ACTIVE CATALOG 표, §ITEM PRICE ALIGNMENT, 대응 표. QA: DUNGEON_ITEM_QA ITEM-Q72 / Q73 / Q74 / Q77 /
Q79 / Q81 / Q83 / Q84, DI-Q-v28-1.

모든 아이템 `sell = buy × 2` (바뀌지 않은 아이템 포함 40종 전부 — 예: 생수 40 / 80, 캔커피 40 / 80, 구급키트 80 / 160).
바뀌는 아이템(`buy` / 효과; supply = `피로 회복`):

```text
rice 삼각김밥            35   survival 6, supply 5
ramen 컵라면             45   cold 10, supply 3
bar 간단 도시락          100  survival 12, supply 6, loot .2
lava 불룡볶음면          80   survival 8, cold 6, supply 3
premium 길드 특제 도시락  185  survival 16, supply 7, loot .4
energy 에너지드링크      80   mobility 17
wine 용사의 곡주         70   fear 20, mobility -4
mask 방진마스크          80   poison 24
heat 핫팩                70   cold 24
coating 부식 방지 코팅제  85   corrosion 24
boots 원정용 장화        75   mire 20
snowgoggles 설원 고글    70   whiteout 20
midpotion 중급 포션      125  combat 14
highpotion 상급 포션     175  combat 20
antidote 농축 해독제     95   poison 30
ion 쿨링 이온음료        95   fire 26
spiderkit                165  poison 22, bind 18
slimesuit                165  corrosion 22, mire 18
cryptlantern             165  fear 18, dark 18
snowvisor                165  cold 22, whiteout 18
magmagear                175  fire 18, combat 6
hyperenergy              175  mobility 22
sageelixir               175  spirit 24
toppotion                210  combat 28
```

나머지는 `buy`와 효과 그대로(초코바 supply 3, 집중 사탕 supply 2, 영웅 결전 도시락 supply 9는 이미 현재값 — 확인만).
유통기한은 바뀌지 않는다. 숫자를 인용하는 아이템 `description` 문자열은 새 값을 따른다(카탈로그에서 옛 숫자 grep).

테스트: `tests/*.cjs`의 가격·효과 표(`grep -n "85\b\|170\b\|320\|/ 3[04]0\|poison:12\|poison:18" tests/*.cjs` 결과를 하나씩 읽는다).
`tests/copy.cjs`가 효과 행을 핀할 수 있다. 기대값 = 위 표.

---

## 3. 배치 3 — 운영비 / 시작 자금 (`dist/systems/shop.js`)

owner: `ECONOMY_ORDER_v2.8.0.md` §BASE OPERATING COST, `CORE_RUN_v2.8.0.md` §KEY / §START STATE. QA: ECONOMY_ORDER_QA 운영비 블록,
CORE_RUN_QA RUN-Q01.

- l.52 `const dayBase=90+5*(this.run.day-1)` → `170+1*(this.run.day-1)`; 같은 함수의 레벨 보정 `(1+.02*(avgLevel-1))` → `.03`. 주석에 v2.9.1.
- l.21 `const startGold=1000` → `700`.
- 테스트: `tests/integration.cjs` l.1123 / 1125 / 1140 / 1192 (`money,1000`) → 700; l.1300–1306 계산 예시 → D11:
  `dayBase = 170 + 1 × 10 = 180; base = 180 × (1 + .03 × 23/6) × (1 + .06 × 11/6) = 222.777; 청구 = round(22.2777) × 10 = 220G`
  (테스트가 단정하는 값을 다시 계산한다. 실행값 복사 금지). 그 밖은 `grep -n "1000\b" tests/*.cjs`.

---

## 4. 배치 4 — 장식 / 보스 / 사망 한도 (데이터 + `meta.js` + `adventurer.js`)

owner: `META_v2.8.0.md`(장식 효과·가격·점포 자본 전환율), `CORE_RUN_v2.8.0.md` §DEATH LIMIT — SEGMENTED, `BOSS_v2.8.0.md`
(래스·그리드 상한·슬로스), `EVENT_v2.8.0.md` §23(위령제 +1). QA: CORE_RUN_QA RUN-Q-v29-DL, BOSS-Q72 / Q74.

| 항목 | 위치 | 새 값 |
|---|---|---|
| 점포 자본 전환율 | `decorations.js` `capitalRates` | `.01 / .02 / .03 / .04 / .05` (maxDay 9 / 19 / 24 / 29 / 30). "halved" 주석 다시 쓰기 |
| 장식 가격 | `decorations.js` `decorations[].price` | 간판 1250 · 벽면 1000 · 계산대 750 · 진열장 500 (같은 칸 두 종 동일) |
| 장식 효과 | `decorationParams` / `D.balance` | `dawnSign.extraOffers 3` · `D.balance.wallVisitorChance .30` (catalog.js l.251) · `thriftSafe.dailyGold 50` · `trainingRack.chance .65` · `infirmaryPlaque.healChance .45` · `firstAidKit.saves 3` · `memorialBoard.deathLimitBonus 2` |
| 프리미엄 쇼케이스 | `adventurer.js` l.66 `opts.premium?[50,30,15,4,1]` | `[45,31.5,17.5,4.75,1.25]` (합 100; `r.weighted`가 소수를 받는지 확인) |
| 장식 효과 문구 | `decorations.js` `effect:'…'` 8개 | COPY_AUDIT §9-5 그대로 (추모 방명록 `사망 한도 +2명.`) |
| 보스 | `catalog.js` `D.balance.bossPower` 200 → 180; `bossTuning.greedShortfallCap` 12 → 11; `slothBossPower` → `[200,189,171,149]` | 프라이드·엔비·글러트니·러스트 배율은 그대로 |
| 사망 한도 | `meta.js` l.68 `deathLimit=run=>D.balance.deathLimit+…` | `run.day` 기준 `≤10 → 5`, `≤20 → 8`, 그 외 11; 추모 방명록 착용 시 `+ deathLimitBonus`; `+ (run.riteBonus||0)`. 구간 표는 데이터로(예: `D.balance.deathLimitSegments=[{maxDay:10,limit:5},{maxDay:20,limit:8},{maxDay:30,limit:11}]`) 두고 `D.balance.deathLimit=10`(relics.js l.101)은 없앤다 — 먼저 읽는 곳을 전부 grep(`run.js` l.18, `simulation.js` l.545–550, `ui/app.js` l.1363 / l.1488)하고 모두 `Meta.deathLimit(s)`를 쓰게 유지 |
| 구간 끝 날짜(UI용) | `meta.js` | `deathLimitSegmentEnd(run)` → 10 / 20 / 30을 export해서 UI가 다시 계산하지 않게 |

`run.js` `closeDay` 순서(사망 확인 → 돈)는 그대로. `s.stats.deaths`는 리셋하지 않는다.

저장: `run.riteBonus`는 새 런 상태이고, 없으면 0으로 읽는다(저장 버전 올리지 않음 — `aidKitSaves` 같은 선택 필드를
`dist/systems/save.js`가 어떻게 다루는지 확인하고 똑같이).

테스트:
- `tests/final.cjs` l.675–679: `bossPower 180`, `greedShortfallCap 11`, `bossPower + cap = 191`, `slothBossPower [200,189,171,149]`
  (l.687–690 형태 단정은 그대로 성립: 200 > 180, 189 > 180, 171 < 180, 22 > 18). 메시지 문자열도 갱신.
- `tests/integration.cjs` l.1331–1336 추모 방명록: `+2`, 구간별(평범한 런은 D5에 사망 5명이면 종료, 방명록 런은 7명에서 종료);
  다른 장식 테스트(40G → 50G, 2회 → 3회, 50% / 35% 확률, +2칸) → 새 값. RUN-Q-v29-DL 케이스 추가(CORE_RUN_QA).
- `tests/acquisition.cjs`, `tests/antifarm.cjs`, `tests/progression.cjs`는 `capitalRates`·가격을 읽는다: 돌려 보고 실패를 하나씩
  읽어 owner 값인 기대값만 고친다.

---

## 5. 배치 5 — UI: 사망 한도 줄 + 만반의 준비 튜토리얼 (`dist/ui/app.js`, `dist/ui/ui.css`)

owner: `UI_UX_v2.8.0.md` §DEATH LIMIT — ALWAYS VISIBLE (MORNING / ORDER), §만반의 준비 TUTORIAL; 문구 COPY_AUDIT §4-23, §3-7.
QA: UI_UX_QA UI-Q-v29-26. 프레젠테이션 작업은 캡처 기반(AGENTS §2A): BEFORE 캡처 → 구현 → 360 / 390 / 412 / 1280 AFTER 캡처
→ 별도 시각 검수 → 커밋.

- 줄: `사망 {n} / {limit} · D{end}까지`, `n = s.stats.deaths`, `limit = Meta.deathLimit(s)`, `end = Meta.deathLimitSegmentEnd(s)`.
  `n === limit − 1`일 때만 경고 클래스.
  - MORNING: 기존 줄 `<p class="board-rail" id="visitor-count">오늘의 원정<b>손님 …</b><b>게이트 …</b></p>`(l.392)에 세 번째 항목이
    자연스럽다. ORDER: 오늘 brief 블록(`orderForm`, l.1076) 맨 위, 자금 요약 옆. 최종 위치는 캡처 검수로 정한다.
  - `tests/ui-guard.cjs`가 줄·블록의 자식 수를 세는 곳이 있다 — 실패를 읽는다. UI-Q-v29-26용 가드 추가.
- 도감 줄(`rosterList`, l.1487–1490)은 이미 `Meta.deathLimit(s)`를 읽으므로 현재 구간 한도를 보여 준다. 문구는 그대로.
- 튜토리얼: 코치 시스템은 선택자가 처음 보일 때 상황 마크를 띄운다(`coachSteps.sell`, l.831~; `showCoach`, l.935). 현재 손님과
  확정된 가방으로 `G.Dungeon.fullyPrepared(...)`가 성립할 때(출발 피로는 계산대의 `출발 B`) 손님 가방 영역에 상태 클래스를
  붙이고, `sell` 단계 `['prepared', '<가방 선택자>.prepared', '건강한 손님의 가방을 가득 채웠다. 만반의 준비를 하면 실패해도 살아 돌아올 가능성이 커진다.']`를
  추가한다. 클래스 자체에는 보이는 스타일이 없다(새 배지 없음). 저장은 기존 `tutorial['coach-prepared']`.
- `tests/copy.cjs`가 §3-7 코치 문구를 대조하면 새 줄을 추가한다.

---

## 6. 배치 6 — 길드 합동 위령제 이벤트 + NPC 상세 줄

owner: `EVENT_v2.8.0.md` §23, COPY_AUDIT §13-23; UI_UX l.398, QA DUN-Q-v29-3.

- `catalog.js` `events`에 한 줄(다른 이벤트와 같은 튜플 형태, 가중치 1, 이스터에그 아님):
  `['rite','길드 합동 위령제','길드가 광장에 위령제 제단을 세웠다. 오늘은 모험가들도 말수가 적다.','남은 영업 동안 사망 한도 +1',{deathLimit:1}]`.
  조건은 다른 이벤트와 같다(특별 자격 없음, 다시 나올 수 있음). 이벤트가 뽑힌 아침(`shop.js` l.224, `ev`를 읽는 곳)에
  `s.riteBonus=(s.riteBonus||0)+ev.deathLimit`. 이벤트 풀이 22 → 23이 되어 시드별 이벤트 순서가 바뀐다: 특정 시드의
  이벤트를 핀하는 테스트는 다시 읽고 판단한다(그냥 다시 핀하지 않는다). `tests/events.cjs`가 카탈로그 수를 센다.
- NPC 상세 줄(`app.js` l.1518): `무리한 출발 {n}회` → `연속 부상 출발 {n}회`, n = 가장 최근 기록부터 끊기지 않고 이어진
  `departedInjured` 수(건강 출발 뒤 0) — 좀비 컷이 읽는 값과 같다. 배치 1의 헬퍼를 재사용. 위 주석도 갱신.
- 밤 보고서 두 줄은 배치 1에서 넣었다(COPY_AUDIT §19-9). 다른 보험 줄(`구급품 진열장이 사망을 중상으로 바꿨다.`)과 같은
  자리에 나오는지 확인.

---

## 7. 마무리 검증 (배치 1~6 뒤)

1. `npm test` PASS; `npm run ssot:check` 21개 PASS; `NODE_PATH=/opt/node22/lib/node_modules npm run qa:runtime` PASS; 배치 5 화면 `qa:visual`.
2. 네이티브 재측정 — 반영된 게임이 **규칙 패치 없이** User의 종결 상태를 재현해야 한다. 워커의 규칙 옵션은 이제 앵커가
   없어 실패하므로 하네스 옵션만 넘긴다.

```text
# 새 계정(A): 500런, 사람형 + 초보형
echo '{"N":{"seal":"rule"}}' > /tmp/v291-fresh.json
node tools/remeasure-v29-variants.cjs 500 '[["balanced","adaptive","hybrid"],["beginner","adaptive","hybrid"]]' /tmp/v291-fresh.json /tmp/v291-fresh.out.json
# 장식(B)·누적(C): tools/remeasure-v29-closing-results.json의 spec에서 loadout / traj / schedule:"human" / seal:"rule"만
# 남기고 규칙 옵션은 모두 뺀 spec을 만든다
```

   `tools/remeasure-v29-closing-results.json`(`reports/v29-balance-ideal.md` §종결 측정)과 비교: 사람형 D1~10 탈락 약 26.6%,
   D30 약 18%, 클리어 약 11%; 장식 혼합 A / B 클리어 약 43 / 46%; 10런째 클리어 25~36%. 네이티브에는 측정 때 없던 길드 합동
   위령제와 정식 RESULT-PROOF·튜토리얼 코드가 들어가므로 조금 올라가는 것은 정상이다. 어느 지표든 약 ±4%p를 넘으면
   발견으로 보고하고 조정하지 않는다.
3. `reports/deco-balance` 재생성(`npm run report` 또는 그 보고서 머리말이 가리키는 도구).
4. SPEC_INDEX 머리말(`SOURCE_ADOPTION_STATUS` → V2_9_1_ADOPTED), CHANGELOG §v2.9.1 상태 줄(커밋 포함), WORK_STATE.
   `v2.9.1` 태그는 User 확인 후.

## 8. 멈추고 보고하는 경우

- 이 문서에 없는 이유로 테스트가 실패할 때
- owner와 이 문서가 다를 때
- owner에 없는 값(새 문구, 새 배지 등)이 필요할 때
- 네이티브 재측정이 종결 상태를 허용 범위 밖으로 벗어날 때
