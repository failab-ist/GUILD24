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
| v2.9.13 | 2026-10-01 | `f20f89a` (PR #34) | `v2.9.13` |

## v2.9.14 — quick patch (User 2026-10-01, in progress)

- **SALE readout title back to `전투 전망`, the outlook coach mark back**: `도착 시 전투 전망` (v2.9.12 coach diet, carrying the
  retired outlook mark's fact) filled a half cell on a phone, so 전투 전망 and 환경 대응 stacked on two rows and the readout grew a
  line (three with a two-Hazard Gate). The first SALE shows three marks again: destination, Stats and the outlook (COPY_AUDIT
  §3-4, reworded so it reads at once: `손님이 막 왔을 때의 전망이다. 상품을 팔아도 이 칸은 그대로다. 상품이 무엇을 바꾸는지는
  계산대에 올리면 보인다.`). UI_UX §TUTORIAL — COACH DIET / UI-Q-v29-53, COPY_AUDIT §3-4 / §3-7; tests ui-guard.
- **NIGHT injury lesson on the first hurt record**: it fired on a record that only departed injured, so a healthy, successful
  return carried `다친 채 떠나면 …` and read as wrong. It now fires on the first record that came back with 부상 or 중상, worded
  for that moment (`부상을 입었다. 다친 채 다시 떠나면 투력·강인함이 깎인 채로 싸운다.`). NIGHT_CLOSING §DISCOVERY LINE, COPY_AUDIT
  §26-2; tests revision.
- **Desk SALE customer card as tall as the column beside it**: the 400 px card (v2.9.12 desk SALE) stood far above the status /
  outlook / destination column; 270 px makes the card about the column's height (~340 px with a two-Hazard Gate) and gives
  the ledger / tray / shelf the rest. UI_UX §SALE — DESK LAYOUT.
- **초코바 기동 +8 · 피로 회복 3 → 기동 +6 · 피로 회복 5**: it read the same as 캔커피 (기동 +12 · 2) per Gold; now the pair splits
  as 삼각김밥 / 생수 do - the Food keeps going, the Drink lifts the Stat. ITEM §ACTIVE CATALOG, §ITEM ROLE NOTES; tests vocabulary.

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
