# AGENTS.md — GUILD24 Engineering / QA Operating Rules

> Permanent process guardrails for implementation / QA work.
> This file is not a Design SSOT.
>
> Do not copy game rules, balance numbers, UX specifications, or Canonical design text here.
> Resolve Design Truth from the current Canonical Project Sources.

---

# 1. AUTHORITY

Priority:

```text
1. User's newest confirmed decision
2. Current Canonical Project Sources
3. Current Source
4. Past chat / old instructions / old specs
```

```text
DESIGN TRUTH         = Current Canonical Project Sources
IMPLEMENTATION TRUTH = Current Source
```

If Canonical and Source differ:
- do not reinterpret Canonical to match Source
- do not silently change Design
- classify the difference as Implementation Bug, Missing Adoption, Runtime UX Bug, Test Gap,
  Design Issue, or Unresolved when evidence is insufficient

Never change approved Design without User approval.

Names and terms (what a thing is called, and what it must not be called) are resolved from `design_ssot/GLOSSARY_v2.8.0.md`. Do not coin or reuse a name that GLOSSARY lists as retired.

---

# 2. PROJECT SOURCE ACCESS

Do not treat a Canonical file as missing because it is absent from initial context.

Required order:

```text
SPEC_INDEX
→ identify exact current filename
→ explicitly Search/Open that Project Source
→ read only the relevant Spec / QA / Source
```

Only after that fails may you report:

```text
PROJECT SOURCE ACCESS/INDEX ISSUE
```

Never substitute memory, an older spec, a chat summary, or Current Source for inaccessible Canonical.

Default reading strategy:

```text
SEARCH
→ SMALL READ
→ EXPAND ONLY IF NEEDED
```

Do not broadly read the repository or all specs without a concrete task reason.

---

# 2A. PRESENTATION TASK READ PATH

For Presentation Upgrade work, do not full-read the project.

```text
SPEC_INDEX
-> PRESENTATION_PRINCIPLES_v2.8.0.md
-> the relevant current owners (UI_UX etc.)
-> only relevant Source
```

Visual Presentation work is screenshot-driven:

```text
capture BEFORE
-> implement a small surface
-> capture AFTER
-> separate visual review
-> narrow fix
-> stop at active Batch boundary
```

Do not accept Presentation quality from Source inspection or the implementer's self-evaluation alone.

---

# 2B. 코드 읽기 · 소스 가드 정리 (User 2026-10-01)

`dist/` 코드는 주석이 절반 가까이 된다. 코드를 읽을 때는 주석을 뺀 함수부터 본다.

```text
node tools/fn.cjs <파일> <함수...>            # 주석을 뺀 함수
node tools/fn.cjs <파일> <함수...> --keep-comments   # 원문
```

`tests/`의 소스 글자 검사(`ui-guard.cjs`의 `fn()` 슬라이스 등)와 코드 안의 긴 주석은 한꺼번에 고치지 않는다.
함수를 고칠 때만 그 함수에 걸린 것을 정리한다.
- 소스 글자 검사: 검사 내용(assertion)은 그대로 두고 새 위치로 옮기거나, 동작 검사로 바꾼다.
- 주석: 설계 근거(Canonical 섹션 이름)는 남기고, 날짜 · 경위 서술을 줄인다.

---

# 3. SCOPE / CHANGE DISCIPLINE

Before implementation:

```text
REUSE SOURCE
→ PLATFORM / EXISTING DEPENDENCY
→ SMALL PATCH
→ MINIMAL NEW IMPLEMENTATION
```

Do not:
- add speculative features
- refactor or clean unrelated code/files
- create unnecessary abstractions
- implement future-version ideas early
- make Design decisions while doing WORK

Solve the confirmed problem with the smallest safe change.
Do not sacrifice safety, data preservation, required testing, or maintainability.

---

# 4. COMMIT / WORKING-TREE DISCIPLINE

One logical task = one reviewable commit.
A code change and the test that verifies that same change may be committed together.

Before changing task or subsystem:

```text
targeted verify
→ inspect diff
→ commit logical unit
→ confirm working-tree state
→ only then continue
```

Uncommitted work is not a checkpoint.
Create a clean commit before risky recovery, branch switching, bulk edits, or reconstruction work.

During normal work, do not rewrite shared history or restore an old tree wholesale.
Use old commits only as evidence and re-apply the minimum necessary change to Current Source.

Before editing / freezing, know the current HEAD and working-tree state.
Do not call a state FROZEN unless intended work is committed and the tree is clean.

---

# 5. SOURCE / TEST / QA TRUTH

Tests are not Design Truth.
A passing test does not prove Canonical adoption.

When Source, test, and Canonical disagree:
- identify which one is stale or wrong before editing
- update a test only when the Canonical expectation is known
- never derive Expected values from Runtime merely to obtain PASS

QA exists to find mismatch, regression, runtime failure, stale tests, and incomplete adoption.
FAIL is a valid result.

Never obtain PASS by:
- deleting/skipping a failing case
- weakening an assertion or tolerance without Design basis
- copying Runtime values into Expected
- changing RNG/seed to prefer an outcome
- silently excluding an edge case or strategy
- changing Production Balance merely to satisfy a measurement
- claiming full PASS after only a subset was rerun

---

# 6. QA / FIX PHASE SEPARATION

Default cycle:

```text
IMPLEMENT
→ TARGETED VERIFY
→ COMMIT
→ FREEZE
→ QA
```

During a frozen QA run, do not modify Production Source, Tests, Harness, Fixtures, or Expected values.

If QA finds a bug:

```text
STOP frozen QA
→ report finding
→ begin separate FIX cycle
→ make smallest correct fix
→ add/update regression coverage when needed
→ commit
→ freeze again
→ rerun relevant QA
```

Do not edit mid-run and continue calling it the same frozen QA.

## 6-A. 검증 범위 · PR · 머지 (User 2026-09-26 ~ 10-01)

- 검증은 고친 부분과 꼭 필요한 검사만 돌린다.
  - 바꾼 영역의 테스트를 돌린다. 화면을 바꿨으면 그 화면만 캡처한다(폰 · 데스크). 흐름을 바꿨으면 그 흐름의 `qa:runtime` 하네스만 돌린다.
  - 전체 `qa:runtime` · `qa:visual`은 큰 버전 업(x.y.0, 예: v3.0.0)에서만 돌린다. 패치 버전 · 퀵패치의 PR에는 돌리지 않는다.
  - 보고에는 무엇을 돌렸는지 적는다. 일부만 돌린 것을 전체 PASS라고 하지 않는다(§5).
- PR 전에는 Pages `verify`와 같은 순서로 `npm test` → `npm run audit` → `git diff --exit-code`를 돌린다.
  audit가 Source에서 다시 만드는 보고서(`reports/ITEM-PRICES.md` 등)가 최신이 아니면 배포가 거부된다.
- 이름 · 수치 · 문구는 적용 전에 초안을 보고하고 컨펌을 받는다. 화면 작업은 캡처를 보여 주고 확인받은 뒤 커밋한다.
- PR 머지는 User가 명시적으로 컨펌했을 때만 한다. 의견이 필요한 건 결정 항목과 의견을 먼저 정리해서 묻는다.

---

# 7. RUNTIME VERIFICATION

Source-level presence is not enough for interaction-sensitive UX.

When relevant, verify the actual affected browser flow on the appropriate viewport/device class,
including the interactions and persistence boundaries changed by the task.

Check runtime errors for affected flows.
Unit tests do not replace required runtime verification.

A Source implementation may still be a:

```text
RUNTIME UX BUG
```

when the player-facing behavior fails.

---

# 8. RECOVERY / BULK EDIT SAFETY

For regressions, compare Current Canonical, Current Source, and relevant Git history.
Distinguish what evidence supports: never implemented, lost implementation, later regression,
runtime-only failure, stale test/copy, or unresolved root cause.

If evidence is insufficient:

```text
ROOT CAUSE UNRESOLVED
```

Do not invent rollback history or reconstruct undocumented old states from memory.

For bulk/scripted edits:
- start from a committed baseline
- restrict paths / matches explicitly
- inspect the diff immediately
- stop or revert if scope is broader than intended

Do not use broad replacement across Production + Tests + Docs without intentional review of every target.

---

# 9. DESIGN CHANGE CONTROL

WORK must not decide unresolved Design.

If required behavior is undefined:

```text
UNRESOLVED
```

Report/ask rather than inventing a rule.

If measurement violates a balance target:

```text
BALANCE FINDING
```

Do not auto-tune Production values.

After User-approved Design change:
- update the proper Canonical owner
- update only tests that represent the changed rule
- do not preserve superseded values as alternate live expectations

## 9-A. 시뮬레이션은 User 컨펌 뒤에 돌린다 (User 2026-09-30)

측정·시뮬레이션을 돌리기 전에 User에게 먼저 알리고, 확인을 받은 뒤에만 실행한다.
대상: `Debug.simulate` · `Debug.trajectory` · `tools/measure-*.cjs` · 재측정, 그리고 이와 같은 스크래치 스크립트.

알릴 것:
- 무엇을 왜 재는지
- 명령 / 봇 정책 / 규모(Run 수 × 궤적 수, 비교 조건 수)
- 예상 소요 시간(지난 실행 기록이나 작은 시험 실행으로 잰 값)

`npm test` · `npm run audit` · `qa:*` 같은 정해진 검증 절차는 여기에 해당하지 않는다.

## 9-B. 밸런스는 `tools/measure-v2100.cjs`로 잰다 (User 2026-10-04)

밸런스를 바꾸거나 판단할 때의 기준 측정이다. 돌리기 전 9-A대로 User 컨펌을 받는다.

```text
node tools/measure-v2100.cjs --traj 200 --fresh 1000
```

- 재는 것: 구간별(D1~7 / 8~14 / 15~21 / 22~29) 원정 성공률, D30 도달 · 클리어, 사망 / 런, 좀비, 장식.
  둘째 줄(`└`)에 종료 이유(사망 한도 · 파산 · 마왕 실패), 끝난 날 중앙값, D10까지 사망, 부상 출발과 그 사망률,
  상위 4명(레벨) 대 나머지의 성공률 · 사망, 현금 / 일, 자본.
  셋째 줄(`└ 준비`)에 상품 들고 간 원정 대 맨손 원정의 성공 · 사망, 상품이 결과를 바꾼 비율(그중 사망을 막은 비율), 상위 4명이 받은 상품 몫(User 2026-10-09). 방문 지갑 · 점포지원 궤적은 `--out` JSON에 남는다.
- 규모: reader(기준) · investor(투자형) 봇의 프레시 계정 1000판, reader · investor의 궤적 200 × 10런(장식 none / economy / survival). 균형 봇은 기준 밸런스 평가에서 제외한다(User 2026-10-06).
  investor는 DAY 8부터 매일 핵심 4명 · 후보 3명을 다시 고르고 가방 조합을 결과 기대값으로 고르고, 부상 손님 몫 구급키트를 들여놓고, 부상 · 사망이 쌓이면 부상 대응 점포지원을 먼저 고르고, DAY 25부터 돈이 남으면 리롤하며 최종 파티에 줄 템을 모아 두는 봇이다(User 2026-10-09, expert 자리 교체). expert는 지난 측정과 비교할 때만 `--policies reader,expert`로 쓴다.
  `--before`로 비교할 때 이전 소스에 investor가 없으면 그 worktree에 `dist/systems/simulation.js`의 봇 코드를 먼저 옮긴다.
- 첫 계정 보호는 실제 플레이와 같이 켠다. 프레시는 첫 런 보호 ON, 연속 궤적은 첫 런에만 ON이다. 이전 보호 OFF 측정과 혼동하지 않는다(User 2026-10-06). 최종 보급 여부도 JSON에 기록해 템을 준 파티의 도달 시 클리어를 따로 읽는다.
- 시간: 한 조건 5~8분, 두 조건을 동시에 돌리면 13~17분
- 비교: 바꾸기 전과 비교할 때는 이전 커밋을 `git worktree`로 따로 꺼내 같은 명령을 함께 돌린다(또는 `--before <root>`).
  아직 넣지 않은 후보는 worktree 사본에만 적용해서 재고, Production에는 컨펌 뒤에 넣는다.
- 기록: 결과 로그는 `reports/v2100-measure/`에 남기고 커밋한다. 지금 기준 로그는 `WORK_STATE.md` §Current가 가리킨다.
- 결과 JSON을 더 읽을 때는 `tools/measure-v2100-detail.cjs` · `tools/measure-v2100-relic-landmark.cjs`(재생 없이 읽기만)를 쓴다.
- User가 준 세이브는 `node tools/save-check.cjs <save.json> [--out report.md]`로 읽는다. 재생 없이 세이브만 읽으므로 9-A 컨펌 대상이 아니다.
  보고서 §2 `밸런스 지표`가 이 측정과 같은 기준(구간 성공률 · 사망 · 부상 출발 · 상위 4명 대 나머지 · 현금 / 일)이다.
- 지난 질문용 측정 도구는 `archive/<버전>/tools/`에 있다(목록 `archive/README.md`). `npm run balance` · `longitudinal` · `mastery`도
  지난 하네스다. 둘 다 기준 측정으로 쓰지 않는다. 특정 레버만 볼 때는 이 도구를 본떠 스크래치에서 만든다.

---

# 10. DOCUMENT / VERSION HYGIENE

Detailed Canonical truth belongs only in its routed owner sources.
`AGENTS.md` contains process only.

Do not:
- duplicate current rules across multiple live documents
- keep superseded discussion as another live expectation
- mass-copy old specs into a new version
- keep old wording, superseded values or change history inside an owner (history belongs to CHANGELOG and git)

Follow the current `SPEC_INDEX` routing and inheritance structure.
Versioning / manifest changes must reflect the current project routing rather than historical examples in this file.

---

# 11. REPORTING / HANDOFF

Use accurate status labels when relevant:

```text
PASS
IMPLEMENTATION BUG
MISSING ADOPTION
RUNTIME UX BUG
TEST GAP
BALANCE FINDING
DESIGN ISSUE
BLOCKED
ROOT CAUSE UNRESOLVED
```

Never summarize a real failure as "PASS with notes".

WORK final reports are review packets for the User, not work diaries.
Default to:
- Branch / HEAD
- logical commit(s)
- material changes only
- targeted / regression / full-test / runtime status as applicable
- exact review risk or blocker, otherwise NONE

Do not repeat:
- documents read
- chronological work narration
- Task text
- Canonical text already available in the repository
- raw PASS logs
- unrelated project history

Handoffs are execution pointers, not portable project copies.

Include only what the receiving role needs now:
- role / base when operationally necessary
- active task
- exact routed documents / QA / Source entry points
- newly approved User decision not yet promoted to those documents
- stop boundary when it differs from normal workflow

Do not carry rejected, superseded, speculative, obsolete, or already-completed context into a handoff.
Do not repeat AGENTS rules inside the handoff beyond "Read AGENTS.md first and follow it."

WORK's own PASS is not final User approval.
If no next task was explicitly authorized, stop after the assigned scope.

## 11-A. LANGUAGE OF REPORTS / HANDOFFS — 한글 (User 2026-09-25)

User에게 가는 보고와 핸드오프는 한글로 쓴다. 채팅 보고, 최종 리뷰 패킷, `WORK_STATE.md` §Next 핸드오프,
`reports/` 아래 핸드오프·발견 문서가 모두 해당된다.

그대로 두는 것:
- 상태 라벨(PASS / IMPLEMENTATION BUG / BLOCKED 등), owner 파일명, 섹션 이름, 파일 경로, 함수·변수·CSS 이름,
  명령어, 커밋 해시
- Canonical 문서 본문의 기존 언어(영문 owner는 영문 그대로; 이 규칙은 보고·핸드오프에만 적용된다)

영문으로만 쓰인 보고·핸드오프는 미완성으로 본다.

---

# 12. STOP CONDITIONS

Stop and report instead of continuing when:
- Canonical cannot be accessed after SPEC_INDEX lookup
- Design is unresolved
- Current Source contains an unexpected broad regression
- a scripted/bulk edit changes unrelated scope
- QA finds a critical runtime blocker
- the working-tree state cannot be explained
- the requested action would overwrite uncommitted work
- recovery would require guessing the intended old state

Do not "finish anyway".

---

# 13. DEFINITION OF DONE

A task is done only when all applicable conditions hold:
- correct Canonical owner / requirement identified
- scope stayed limited
- minimal implementation or document change completed
- relevant behavior verified
- regression coverage updated when needed
- no unrelated files changed
- logical unit committed
- working-tree / HEAD state understood
- no blocker or unresolved issue hidden

Release/freeze work additionally requires a clean recorded HEAD and the routed final QA / adoption checks.

---

# 14. SESSION / TASK CHUNKING — MANDATORY

Large audits, document cleanups, and cross-file adoption work must be split into small execution batches.

Default:

```text
one narrow batch
→ inspect diff
→ verify
→ commit
→ report
→ STOP
```

Do not:
- read or edit the entire project in one pass when it can be divided safely
- chain unrelated document groups in one execution turn
- continue automatically into the next batch after a completed commit
- expand scope because adjacent stale material is discovered

Divide broad work by owner, document class, or subsystem.

If the session, tool, or network becomes unstable:

```text
STOP ALL
→ make no further edits
→ report exact last completed commit
→ report interrupted batch
→ report remaining unopened batches
```

Resume only from committed repository state and current routed documents, not from memory.

---

# 15. CORE PRINCIPLE

Keep the repository recoverable and explainable.

Prefer:

```text
small change
small commit
clear evidence
honest failure
reproducible QA
```

over mixed changes, hidden state, history reconstruction, PASS-at-any-cost, or silent Design drift.

**Optimize for correctness and traceability, not for PASS.**
