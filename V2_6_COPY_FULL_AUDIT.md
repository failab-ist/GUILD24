# GUILD24 v2.6 COPY FULL AUDIT — EXTRACTION ONLY

- **기반 소스**: GUILD24 v2.5.0 Production Source (`dist/`, `design_ssot/`)
- **작업 성격**: 전수 추출 및 분류 감사 (Source / Design SSOT / Rule / Balance 절대 미수정, 신규 문구 미제안)
- **작성 일자**: 2026-09-14

---

## 1. START / SYSTEM

### [SYS-001] 첫 실행 타이틀 Eyebrow
SOURCE: `dist/ui/app.js` (`render`)
CONTEXT: 세이브 데이터가 없을 때 표시되는 첫 실행 화면 상단 라벨
CURRENT:
> GUILD24
RUNTIME_TRUTH: 게임 브랜드 명칭.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-002] 첫 실행 타이틀 헤드라인
SOURCE: `dist/ui/app.js` (`render`)
CONTEXT: 첫 실행 화면 중앙 메인 환영 타이틀
CURRENT:
> 오늘도 문을 연다.
RUNTIME_TRUTH: 첫 진입 환영 문구.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-003] 첫 실행 기본 사양 서브텍스트
SOURCE: `dist/ui/app.js` (`render`)
CONTEXT: 첫 실행 화면 타이틀 하단에 노출되는 기본 게임 규칙 설명
CURRENT:
> 초기 자금 1,200G · 창고 24칸 · 30일 영업
RUNTIME_TRUTH: v2.5 기준 실제 시작 자금은 1,000G(표준 계약 기준), 창고 용량은 18칸임. 소스에 구버전 수치(1,200G, 24칸)가 하드코딩되어 실제 런타임 값과 불일치함.
ISSUE: MISLEADING
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-004] 첫 실행 시작 버튼
SOURCE: `dist/ui/app.js` (`render`)
CONTEXT: 첫 실행 화면 하단 CTA 버튼
CURRENT:
> 첫 영업 준비
RUNTIME_TRUTH: 클릭 시 새 점포 계약 모달(`modal='new'`)을 띄움.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-005] 새 점포 준비 모달 Eyebrow
SOURCE: `dist/ui/app.js` (`newRun`)
CONTEXT: 새 점포 시작 계약 모달 상단 헤더
CURRENT:
> 길드리테일 가맹 계약
RUNTIME_TRUTH: 세계관 설정 상 본사 기업명(길드리테일) 계약서 헤더.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-006] 새 점포 준비 모달 타이틀
SOURCE: `dist/ui/app.js` (`newRun`)
CONTEXT: 새 점포 시작 모달 메인 헤드라인
CURRENT:
> 오늘도 문을 연다.
RUNTIME_TRUTH: 새 런 시작 환영 문구.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-007] 새 점포 준비 모달 기본 사양 서브텍스트
SOURCE: `dist/ui/app.js` (`newRun`)
CONTEXT: 새 점포 계약 모달 상단 기본 안내문
CURRENT:
> 기본 자금 1,200G · 창고 24칸 · 마왕성 개방까지 30일.
RUNTIME_TRUTH: v2.5 기준 기본 시작 자금은 1,000G, 창고 용량은 18칸임. 소스에 구버전 수치(1,200G, 24칸)가 하드코딩되어 있음.
ISSUE: MISLEADING
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-008] 새 점포 준비 모달 분위기 밴드 텍스트
SOURCE: `dist/ui/app.js` (`newRun`)
CONTEXT: 시작 계약 목록 상단 안내 띠지
CURRENT:
> 계약서를 접어 카운터 아래 넣었다. 시작 재고는 창고에 있다.
RUNTIME_TRUTH: 초기 지급 재고(삼각김밥, 생수, 붕대, 하급포션 각 1개)가 창고에 들어왔음을 알리는 플레이버.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-009] 새 점포 시작 계약 목록 헤더
SOURCE: `dist/ui/app.js` (`newRun`)
CONTEXT: 시작 계약 선택 그리드 상단
CURRENT:
> 시작 계약
RUNTIME_TRUTH: 가맹 계약 선택 목록 헤더.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-010] 시작 계약 1 — 표준 가맹점
SOURCE: `dist/data/catalog.js` (`contracts[0]`)
CONTEXT: 시작 계약 카드 버튼
CURRENT:
> 표준 가맹점
> 기본 조건으로 시작
RUNTIME_TRUTH: 해금 조건 없음(기본 제공). 자금 1,000G, 운영비 보정 없음.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-011] 시작 계약 2 — 새벽배송 가맹점
SOURCE: `dist/data/catalog.js` (`contracts[1]`)
CONTEXT: 시작 계약 카드 버튼
CURRENT:
> 새벽배송 가맹점
> 발주 +1 · 매입가 +5%
RUNTIME_TRUTH: 가맹등급 2 필요. 일일 발주 후보 수 +1, 아이템 매입가 5% 할증.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-012] 시작 계약 3 — 길드 제휴점
SOURCE: `dist/data/catalog.js` (`contracts[2]`)
CONTEXT: 시작 계약 카드 버튼
CURRENT:
> 길드 제휴점
> 방문객 +1 · 운영비 +20G
RUNTIME_TRUTH: 가맹등급 3 필요. 일일 기본 방문객 +1명, 일일 운영비 +20G 추가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-013] 시작 계약 4 — 알뜰 가맹점
SOURCE: `dist/data/catalog.js` (`contracts[3]`)
CONTEXT: 시작 계약 카드 버튼
CURRENT:
> 알뜰 가맹점
> 초기자금 +250G · 희귀 발주 확률 소폭 감소
RUNTIME_TRUTH: 가맹등급 4 필요. 시작 자금 1,250G, 희귀도 2 이상 발주 가중치 0.8배.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-014] 시작 계약 5 — 프리미엄 상권
SOURCE: `dist/data/catalog.js` (`contracts[4]`)
CONTEXT: 시작 계약 카드 버튼
CURRENT:
> 프리미엄 상권
> 희귀 모험가 확률 증가 · 운영비 +25G
RUNTIME_TRUTH: 가맹등급 5 필요. 신규 NPC 생성 시 희귀도 가중치 상향, 일일 운영비 +25G 추가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-015] 시작 계약 잠김 표시
SOURCE: `dist/ui/app.js` (`newRun`)
CONTEXT: 해금되지 않은 시작 계약 버튼 내부 라벨
CURRENT:
> {c.name} · 잠김
> {c.description}
> 가맹등급 {c.grade} 필요
RUNTIME_TRUTH: 메타 프로그레션 가맹등급이 도달하지 못해 선택 불가능한 상태.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-016] 재현용 Seed 지정 접힘 텍스트
SOURCE: `dist/ui/app.js` (`newRun`)
CONTEXT: 시작 계약 모달 하단 시드 입력 필드 아코디언
CURRENT:
> 재현용 Seed 지정
> 비워 두면 새로운 Seed로 시작합니다.
> placeholder: 예: guild24-first-shift
RUNTIME_TRUTH: 유저가 임의의 난수 시드를 입력하여 결정론적 런을 생성할 수 있는 기능.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-017] 계약 다시 고르기 안내문
SOURCE: `dist/ui/app.js` (`newRun`)
CONTEXT: DAY 0 점포지원 화면에서 '계약 다시 고르기'를 통해 진입했을 때 모달 하단 문구
CURRENT:
> 계약만 바꿉니다. 이 점포의 점포지원 후보와 첫 모험가는 그대로입니다.
RUNTIME_TRUTH: 런 시작 전 계약 변경 시 시드 리롤 없이 계약 조건만 교체됨.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-018] 런 진행 중 새 점포 시작 경고문
SOURCE: `dist/ui/app.js` (`newRun`)
CONTEXT: 이미 진행 중인 런이 있을 때 새 점포 모달 하단 경고 문구
CURRENT:
> 지금 진행 상황을 모두 포기하고 새로운 점포를 시작합니다. 보상은 없습니다.
> 본사 기록은 그대로 남습니다. 도감 · 가맹등급 · 해금은 지워지지 않습니다.
RUNTIME_TRUTH: 진행 중인 런을 포기하면 메타 경험치/마왕 토벌 정산 없이 런 상태만 초기화되고 영구 계정 데이터는 보존됨.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-019] 새 점포 모달 확인 버튼
SOURCE: `dist/ui/app.js` (`renderModal`)
CONTEXT: 새 점포 모달 푸터 버튼
CURRENT:
> 첫 점포지원 고르기
또는 (진행 중인 런이 있을 때)
> 현재 지점 포기
RUNTIME_TRUTH: 계약 선택 후 DAY 0 진입하거나 현재 런을 포기하고 새 런으로 진입.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-020] DAY 0 첫 점포지원 대기 화면
SOURCE: `dist/ui/app.js` (`render`)
CONTEXT: 점포지원 모달이 닫혀 있을 때 메인 화면 배경에 노출되는 임시 스테이지 문구
CURRENT:
> DAY 0
> 첫 점포지원
> 하나를 고르면 영업이 시작된다.
RUNTIME_TRUTH: 첫 점포지원을 선택하기 전까지 DAY 1로 진행되지 않음.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-021] Phase 식별 라벨 (Aria-label)
SOURCE: `dist/ui/app.js` (`stage`, `morningScreen`, `orderScreen`, `saleScreen`, `nightScreen`, `closingScreen`, `finalScreen`, `endScreen`)
CONTEXT: 각 Phase의 메인 컨텐츠 영역 접근성 라벨 및 stage 식별자
CURRENT:
> 새 점포
> 첫 점포지원
> 아침
> 발주
> 영업
> 밤
> 마감
> 최종 원정
> 영업 종료
RUNTIME_TRUTH: 게임의 8개 진행 Phase를 나타냄.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-022] 시스템 Notice — 제7게이트의 첫 아침
SOURCE: `dist/systems/shop.js` (`start`)
CONTEXT: 게임 시작(DAY 1) 시점의 notice 상태
CURRENT:
> 제7게이트의 첫 아침. 오늘 갈 던전을 보고 발주해 보세요.
RUNTIME_TRUTH: DAY 1 시작 시점 안내 텍스트.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-023] 시스템 Notice — 일일 아침 던전 확인
SOURCE: `dist/systems/shop.js` (`morning`)
CONTEXT: 매일 아침(DAY 2~29) 시작 시점의 notice 상태
CURRENT:
> DAY {s.day} · {s.branch}의 아침. 오늘의 던전을 확인하세요.
RUNTIME_TRUTH: 매일 아침 게이트 및 사건 확인 알림.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-024] 시스템 Notice — 심층원정 추천 완료
SOURCE: `dist/systems/shop.js` (`nominateDeep`)
CONTEXT: 손님을 심층원정에 추천 성공했을 때의 notice 상태
CURRENT:
> {n.name} 님이 심층원정에 나섭니다.
RUNTIME_TRUTH: 해당 모험가가 당일 심층원정으로 목적지가 변경 및 확정되었음을 알림.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-025] 시스템 Notice — 발주 완료
SOURCE: `dist/systems/shop.js` (`confirmOrder`)
CONTEXT: 발주서에서 발주 확정 버튼을 눌렀을 때의 notice 상태
CURRENT:
> 발주 완료.
RUNTIME_TRUTH: 장바구니 상품이 창고 재고로 입고되었음을 알림.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-026] 시스템 Notice — 밤의 귀환 보고 도착
SOURCE: `dist/systems/shop.js` (`night`)
CONTEXT: 판매 종료 후 밤 페이즈 진입 시점의 notice 상태
CURRENT:
> 밤의 귀환 보고가 도착했습니다.
RUNTIME_TRUTH: 모험가 원정 결과 연출 단계로 진입함을 알림.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-027] 시스템 Notice — 길드 특별 지원 완료
SOURCE: `dist/systems/run.js` (`specialAction`)
CONTEXT: 아침/발주 특수 이벤트(약점 제거, 특성 습득, 목적지 재배치)를 실행했을 때의 notice 상태
CURRENT:
> 길드 지원을 받았습니다.
RUNTIME_TRUTH: 특수 이벤트 혜택 적용 완료 알림.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-028] 시스템 Notice — 운영비 부족 및 회생 안내
SOURCE: `dist/systems/run.js` (`closeDay`)
CONTEXT: 마감 시 골드가 음수일 때 재고 정리 회생 기회가 남은 경우 notice 상태
CURRENT:
> 운영비가 부족합니다. 재고를 정리해 회생하거나 폐점을 선택하세요. (회생 {s.rescueUsed} / {limit})
RUNTIME_TRUTH: 적자 상태에서 런당 3회 재고 정리 기회를 고지.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-029] 시스템 Notice — 재고 정리 결과
SOURCE: `dist/systems/run.js` (`liquidate`)
CONTEXT: 마감 적자 상태에서 재고를 긴급 매각했을 때 notice 상태
CURRENT:
> {item.name} 재고 정리 · {price}G 회수 [· 회생 완료] (회생 {s.rescueUsed} / {limit})
RUNTIME_TRUTH: 매입가의 50%를 회수하고, 잔고가 0G 이상이 되면 '회생 완료'가 함께 표기됨.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-030] 시스템 Notice — 슬로스 봉인 해제
SOURCE: `dist/systems/relics.js` (`breakSeal`)
CONTEXT: 슬로스 보스전 봉인 기회에 점포지원 대신 봉인 해제를 선택했을 때 notice 상태
CURRENT:
> 봉인 하나가 풀렸다. 이번 점포지원은 받지 않는다.
RUNTIME_TRUTH: 슬로스 봉인 해제 카운트 +1, 해당 마일스톤 점포지원 포기 처리.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-031] 시스템 Notice — 점포지원 설치 완료
SOURCE: `dist/systems/relics.js` (`buyRelic`)
CONTEXT: 점포지원 구매 성공 시 notice 상태
CURRENT:
> {relic.name} 설치. 방문객·운영비 효과는 다음 날부터 적용됩니다.
RUNTIME_TRUTH: 유물 효과 설치 및 다음 날부터 일일 수치에 반영됨을 알림.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-032] 시스템 Toast — 저장 파일 내보내기 완료
SOURCE: `dist/ui/app.js` (`action:export`)
CONTEXT: 설정 모달에서 '저장 내보내기'를 눌렀을 때
CURRENT:
> 저장 파일을 내보냈습니다.
RUNTIME_TRUTH: JSON 세이브 파일 브라우저 다운로드 완료.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-033] 시스템 Toast — 데이터 초기화 완료
SOURCE: `dist/ui/app.js` (`action:reset-go`)
CONTEXT: 데이터 초기화 모달에서 '전부 지우기'를 눌렀을 때
CURRENT:
> 게임 데이터를 초기화했습니다.
RUNTIME_TRUTH: localStorage 전체 삭제 후 초기 상태 복원 완료.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-034] 시스템 Toast — 런 진행 중 본사 해금 알림
SOURCE: `dist/ui/app.js` (`action`)
CONTEXT: 런 진행 도중(마왕성 승리 엔딩 제외) 새로운 본사 해금이 발생했을 때
CURRENT:
> 본사 해금 · {opened.join(' · ')}
RUNTIME_TRUTH: 신규 아이템/직업/계약이 해금되었음을 알리는 토스트.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-035] 시스템 Toast — 저장 파일 가져오기 성공
SOURCE: `dist/ui/app.js` (`save-file eventListener`)
CONTEXT: JSON 세이브 파일 업로드 성공 시
CURRENT:
> 이어서 영업할 준비가 됐습니다.
RUNTIME_TRUTH: 가져온 세이브 파싱 및 복원 성공.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-036] 시스템 Toast — 저장 파일 읽기 실패
SOURCE: `dist/ui/app.js` (`save-file eventListener`)
CONTEXT: JSON 세이브 파일 파싱 실패 또는 유효성 검사 실패 시
CURRENT:
> 저장 파일을 읽지 못했습니다. {e.message}
RUNTIME_TRUTH: 파일 형식 오류 또는 하위 검증 실패 메시지 노출.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-037] 시스템 Toast / 에러 — 자동저장 불가
SOURCE: `dist/systems/save.js` (`write`)
CONTEXT: 브라우저 용량 초과 또는 시크릿 모드 차단 등으로 localStorage 저장 실패 시
CURRENT:
> 자동저장 불가 — 저장 내보내기로 진행을 보관하세요.
RUNTIME_TRUTH: localStorage 쓰기 실패 에러.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-038] 시스템 Toast / 에러 — 구버전 저장 불러오기 차단
SOURCE: `dist/systems/save.js` (`read`)
CONTEXT: 이전 버전(v1~v5) 저장만 브라우저에 남아있을 때
CURRENT:
> 규칙 개편으로 이전 영업은 이어갈 수 없습니다. 새 점포를 열어 주세요. 이전 저장 원본은 보관됩니다.
RUNTIME_TRUTH: v6 스키마 이전의 세이브 파일 로드 거부 및 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-039] 시스템 Toast / 에러 — 저장 읽기 실패 안내
SOURCE: `dist/systems/save.js` (`read`)
CONTEXT: 최신/백업 저장 파일 모두 유효성 검증(valid) 실패 시
CURRENT:
> 저장된 진행을 읽지 못했습니다. 원본 저장은 보존됩니다. 설정에서 저장 파일을 가져올 수 있습니다.
RUNTIME_TRUTH: 세이브 데이터 손상 시 노출되는 안내문.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-040] 시스템 Toast / 에러 — 저장 삭제 실패
SOURCE: `dist/systems/save.js` (`reset`)
CONTEXT: 데이터 초기화 중 localStorage 예외 발생 시
CURRENT:
> 저장 삭제에 실패했습니다. 브라우저 저장소를 확인해 주세요.
RUNTIME_TRUTH: 브라우저 스토리지 접근 차단 오류.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-041] 시스템 Toast / 에러 — 비호환 버전 파일
SOURCE: `dist/systems/save.js` (`import`)
CONTEXT: import한 세이브가 version 6 및 유효성 검사를 통과하지 못했을 때
CURRENT:
> 이 버전의 저장 파일이 아닙니다.
RUNTIME_TRUTH: JSON 유효성 검증 실패.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SYS-042] 시스템 Toast / 런타임 검증 에러 모음
SOURCE: `dist/systems/run.js`, `dist/systems/shop.js`, `dist/systems/relics.js`
CONTEXT: 플레이어의 유효하지 않은 조작 시 발생하는 예외가 토스트로 노출됨
CURRENT:
1. > 잠겨 있는 시작 계약입니다. (`shop.js:16`)
2. > 오늘은 추천할 심층원정이 없습니다. (`shop.js:97`)
3. > 이미 배치를 조정한 손님은 심층원정에 추천할 수 없습니다. (`shop.js:99`)
4. > 아직 거래하지 않은 현재 손님만 추천할 수 있습니다. (`shop.js:100`)
5. > 품절된 발주입니다. (`shop.js:187`)
6. > 발주 자금이 부족합니다. (`shop.js:187, 233`)
7. > 창고가 가득 찼습니다. (`shop.js:187, 234`)
8. > 선택한 발주를 먼저 확정해 주세요. (`shop.js:188`)
9. > 알 수 없는 판매 방식입니다. (`shop.js:192`)
10. > 현재 손님이 없습니다. (`shop.js:216`)
11. > 원정 소모품 슬롯이 가득 찼습니다. (`shop.js:216`)
12. > 재고가 없습니다. (`shop.js:216`, `run.js:50`)
13. > 이미 거절한 조건입니다. 다른 가격이나 상품을 골라 주세요. (`shop.js:217`)
14. > 손님의 소지금이 부족합니다. (`shop.js:218`)
15. > 발주 시간이 아닙니다. (`shop.js:232`)
16. > 발주 수량을 확인해 주세요. (`shop.js:232`)
17. > 선택 가능한 모험가가 아닙니다. (`run.js:6`)
18. > 아직 거래하지 않은 현재 손님만 배치 조정할 수 있습니다. (`run.js:6`)
19. > 심층원정에 나서기로 한 손님의 배치는 바꿀 수 없습니다. (`run.js:10`)
20. > 다른 게이트를 선택해 주세요. (`run.js:11`)
21. > 영업 준비 중에 선택할 수 있습니다. (`run.js:11`)
22. > 제거할 약점을 선택해 주세요. (`run.js:11`)
23. > 이 특성을 배울 수 없습니다. (`run.js:11`)
24. > 발주 시간에 교환할 수 있습니다. (`run.js:26`)
25. > 선택한 수량을 먼저 발주하거나 0으로 바꿔 주세요. (`run.js:26`)
26. > 교환 비용이 부족합니다. (`run.js:26`)
27. > 현재 원정에 참가할 수 없습니다. (`run.js:49`)
28. > 최대 {cap}명까지 선택할 수 있습니다. (`run.js:49`)
29. > 보급 슬롯이 가득 찼습니다. (`run.js:50`)
30. > {required}명으로 원정대를 구성해 주세요. (`run.js:124`)
31. > 지금 봉인을 풀 수 없습니다. (`relics.js:22`)
32. > 지금 구매할 수 없는 점포지원입니다. (`relics.js:29`)
33. > 점포지원 구매 자금이 부족합니다. (`relics.js:29`)
RUNTIME_TRUTH: 각 UI 액션 실패 시 유저에게 표시되는 인라인 피드백.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 2. TUTORIAL / COACH

### [TUT-001] 코치 마크 — 아침: 방문 인원
SOURCE: `dist/ui/app.js` (`coachSteps.morning[0]`)
CONTEXT: 1일차 아침 방문 인원 안내 요소에 포커스될 때
CURRENT:
> 오늘 방문할 인원이다. 시설·계약·사건에 따라 달라진다.
RUNTIME_TRUTH: 당일 확정 방문객 수 및 영향 요소 설명.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-002] 코치 마크 — 아침: 게이트와 위험
SOURCE: `dist/ui/app.js` (`coachSteps.morning[1]`)
CONTEXT: 1일차 아침 게이트 판자 공고판에 포커스될 때
CURRENT:
> 열린 게이트가 어떤 능력을 압박하는지 보고 준비할 상품을 생각해 보자.
RUNTIME_TRUTH: 게이트별 위험(Hazard) 특성과 대응 보급 준비 유도.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-003] 코치 마크 — 아침: 심층원정 최초 발생
SOURCE: `dist/ui/app.js` (`coachSteps.morning[2]`)
CONTEXT: 심층원정이 처음 발생한 날(D7 또는 D14 등) 심층원정 공고에 포커스될 때
CURRENT:
> 오늘은 심층원정이 열렸다. 같은 게이트의 더 깊은 구역이라 요구 전투력만 올라간다. 손님 한 명을 추천해 보낼 수 있고, 후원금은 그 모험가의 희귀도와 레벨에 따라 달라진다. 성공하면 그 모험가의 성장과 소지금이 늘지만, 가게가 버는 돈은 대성공이어도 없다. 추천하지 않아도 된다.
RUNTIME_TRUTH: 심층원정의 룰(후원금 싱크, 전투력 상승, NPC 성장/소지금 보상, 상점 수익 0, 선택사항)을 설명.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-004] 코치 마크 — 발주: 자금 흐름
SOURCE: `dist/ui/app.js` (`coachSteps.order[0]`)
CONTEXT: 1일차 발주서 상단 자금 레저 영역에 포커스될 때
CURRENT:
> 수량을 고르는 동안 보유 자금과 발주 후 자금이 여기 남는다.
RUNTIME_TRUTH: 발주 수량 조정에 따른 잔고 실시간 표시 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-005] 코치 마크 — 발주: 수량 선택
SOURCE: `dist/ui/app.js` (`coachSteps.order[1]`)
CONTEXT: 1일차 발주서 수량 조절 버튼에 포커스될 때
CURRENT:
> 수량을 고른다. 같은 상품을 여러 개 발주할 수 있다.
RUNTIME_TRUTH: 발주 수량 증감 기능 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-006] 코치 마크 — 발주: 후보 교환 (리롤)
SOURCE: `dist/ui/app.js` (`coachSteps.order[2]`)
CONTEXT: 1일차 발주서 하단 리롤 버튼에 포커스될 때
CURRENT:
> 발주 후보 전체를 교환한다. 같은 날 반복할수록 비용이 올라간다.
RUNTIME_TRUTH: 일일 발주 후보 리롤 및 비용 증가 곡선(50→100→...) 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-007] 코치 마크 — 발주: 발주 확정
SOURCE: `dist/ui/app.js` (`coachSteps.order[3]`)
CONTEXT: 1일차 발주서 하단 확정 도장 버튼에 포커스될 때
CURRENT:
> 발주를 확정하면 현재 재고로 영업을 시작한다.
RUNTIME_TRUTH: 발주 종료 및 판매 페이즈 진입 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-008] 코치 마크 — 판매: 모험가 살펴보기
SOURCE: `dist/ui/app.js` (`coachSteps.sell[0]`)
CONTEXT: 1일차 첫 손님이 카운터에 도착했을 때
CURRENT:
> 손님을 눌러 특성과 원정 기록을 살펴보자.
RUNTIME_TRUTH: 손님 스탠디 클릭 시 모험가 상세 수첩이 열림을 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-009] 코치 마크 — 판매: 대성공 신호
SOURCE: `dist/ui/app.js` (`coachSteps.sell[1]`)
CONTEXT: 판매 화면에서 대성공 신호(`대성공을 노려볼 만합니다.`)가 처음 나타났을 때
CURRENT:
> 준비가 요구치를 크게 앞서면 대성공이 나올 수 있다. 일반 원정에서 대성공이 나오면 본사가 가게에 보상을 더 준다. 확정은 아니고, 더 좋은 보급을 하나 더 들려 보낼수록 확률이 오른다.
RUNTIME_TRUTH: 요구 스펙 대비 마진이 일정 이상일 때 대성공 확률이 발생하며, 상점에 보너스 골드가 지급됨을 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-010] 코치 마크 — 판매: 예상 목적지
SOURCE: `dist/ui/app.js` (`coachSteps.sell[2]`)
CONTEXT: 1일차 판매 화면 목적지 명판에 포커스될 때
CURRENT:
> 이 손님이 향할 게이트다. 특성이나 당일 상황에 따라 예상 목적지와 실제 목적지가 달라질 수 있습니다.
RUNTIME_TRUTH: 허세(showoff) 특성이나 게이트 순례 사건 등에 의해 목적지가 어긋날 수 있음을 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-011] 코치 마크 — 판매: 원정 전망
SOURCE: `dist/ui/app.js` (`coachSteps.sell[3]`)
CONTEXT: 1일차 판매 화면 전투/환경 전망에 포커스될 때
CURRENT:
> 원정 전망은 오늘 이 사람의 몸 상태와 챙긴 보급을 보고 가늠한 것이다. 게이트가 그대로 따라 주지는 않는다.
RUNTIME_TRUTH: 전망은 확정 결과가 아니며 주사위 난수 변동폭이 존재함을 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-012] 코치 마크 — 판매: 진열대 재고
SOURCE: `dist/ui/app.js` (`coachSteps.sell[4]`)
CONTEXT: 1일차 판매 화면 하단 진열대에 포커스될 때
CURRENT:
> 진열대 전체에서 고른다. 판매한 소비품은 오늘 원정에서 쓰인다.
RUNTIME_TRUTH: 보유 재고 중 판매할 아이템 선택 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-013] 코치 마크 — 판매: 가격 정책
SOURCE: `dist/ui/app.js` (`coachSteps.sell[5]`)
CONTEXT: 1일차 판매 화면 가격 선택 패널에 포커스될 때
CURRENT:
> 50%는 손님에게 투자, 100%는 기본 거래, 150%는 지금의 수입을 늘리는 선택이다.
RUNTIME_TRUTH: 50%(할인/단골도+6), 100%(정가/단골도+1), 150%(바가지/단골도-3)의 전략적 의미 요약.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-014] 코치 마크 — 밤: 결과 확인
SOURCE: `dist/ui/app.js` (`coachSteps.night[0]`)
CONTEXT: 1일차 밤 화면 진입 시
CURRENT:
> 한 명씩 결과와 원인, 변화를 확인한다. 건너뛰기로 넘기거나 전체 건너뛰기로 정산에 갈 수 있다.
RUNTIME_TRUTH: 밤 화면 조작법 및 건너뛰기 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-015] 코치 마크 — 마감: 영수증
SOURCE: `dist/ui/app.js` (`coachSteps.closing[0]`)
CONTEXT: 1일차 마감 화면 영수증 롤에 포커스될 때
CURRENT:
> 판매 마진에서 운영비와 폐기를 뺀 영업 손익이다. 발주와 점포지원 투자는 아래에 따로 적힌다.
RUNTIME_TRUTH: 손익계산서와 현금흐름표의 회계적 구분 설명.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-016] 코치 마크 공통 제어 UI
SOURCE: `dist/ui/app.js` (`showCoach`)
CONTEXT: 코치 마크 말풍선 상단 타이틀 및 하단 버튼
CURRENT:
> <small>점주 안내</small>
> 안내 건너뛰기
> 다음 / 눌러서 살펴보기
RUNTIME_TRUTH: 튜토리얼 스킵 및 다음 스텝 진행 버튼.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-017] 툴팁 — 전투 전망 설명 (?)
SOURCE: `dist/ui/app.js` (`readout`)
CONTEXT: 전투 전망 옆의 '?' 버튼 클릭 시
CURRENT:
> 이 손님의 지금 능력과 보급으로 게이트의 전투 요구를 어떻게 감당할지 본 예상이다. 확정된 결과가 아니다.
RUNTIME_TRUTH: 전투력 공식 기반 우세/접전/불리 판정의 의미.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-018] 툴팁 — 환경 전망 설명 (?)
SOURCE: `dist/ui/app.js` (`readout`)
CONTEXT: 환경 전망 옆의 '?' 버튼 클릭 시
CURRENT:
> 게이트의 위험 특성을 지금의 능력과 보급으로 어떻게 버틸지 본 예상이다. 가장 약한 대응을 기준으로 말한다. 확정된 결과가 아니다.
RUNTIME_TRUTH: 던전 내 복수 위험(Hazard) 중 가장 방어가 취약한 항목을 기준으로 충분/대응/불안/취약 라벨이 결정됨을 설명.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TUT-019] 점주 가이드 (Help 모달) 전문
SOURCE: `dist/ui/app.js` (`help`)
CONTEXT: 메뉴 -> '점주 가이드' 모달
CURRENT:
> ### 점포지원
> DAY 0에는 무료로 하나를 선택합니다. DAY 5·10·15·20·25·30에는 자금을 써서 구매합니다. 사지 않은 후보는 다음 구매 기회 전날까지 보류할 수 있습니다. 판매 중에는 구매할 수 없습니다.
> 
> ### 발주
> 기본 방문객은 3~6명. 시설·계약·이벤트와 활동 가능한 모험가 수에 따라 달라집니다. 아침에 표시된 인원은 오늘 실제 방문할 인원입니다. 게이트는 초반 1곳에서 후반 최대 3곳까지 열리고, 임시 게이트가 추가될 수 있습니다.
> 수량을 고른 뒤 발주를 확정합니다. 남은 재고와 유통기한, 운영비도 확인하세요.
> 
> ### 판매와 관계
> 목적지·능력·특성을 보고 상품을 고릅니다. 바가지는 수입과 관계를 맞바꾸고, 반값은 이익을 포기해 손님에게 투자합니다. 정가는 기본 거래입니다. 같은 상품·같은 가격으로 거절당한 제안은 그날 반복할 수 없습니다.
> 단골도는 구매 의사와 재방문에 영향을 줍니다. 능력을 직접 올리지는 않습니다. 손님의 특성은 처음부터 전부 표시되며, 표시된 특성이 원정에서 실제로 작용하는 특성입니다.
> 
> ### 원정과 마감
> 판매한 소비품은 그날 원정에서 사용됩니다. 기본 2칸, Lv.10부터 최대 3칸입니다. 밤에는 귀환 결과를 보고, 마감에서 거래와 보급의 작용을 확인합니다.
> 사망은 이번 영업에서 영구적입니다. 중상은 며칠의 휴식이 필요합니다. 30일에는 마지막 발주와 점포지원을 결정하고, 최대 3명에게 보급해 마왕성으로 보냅니다.
> 영업이 끝나면 상품 해금·몬스터 지식·발견·가맹등급은 남습니다. 모험가·재고·돈·설비는 다음 영업에 이어지지 않습니다.
> 적자일 때는 재고 정리로 운영비를 충당할 수 있습니다. 시간을 재촉하는 제한은 없습니다.
> 
> ### 점포가 문을 닫을 때
> 운영비를 감당하지 못하면 폐점합니다. 재고가 남아 있다면 재고를 정리해 그날의 운영비를 채우고 영업을 이어갈 수 있습니다.
> 돌아오지 못한 모험가가 {D.balance.deathLimit}명에 이르면 소문이 퍼져 더 이상 손님이 오지 않습니다. 그 시점에 영업이 끝납니다. 현재 수는 모험가 수첩에서 확인할 수 있습니다.
> 30일에 마왕을 토벌하지 못해도 이 점포의 영업은 거기서 끝납니다.
RUNTIME_TRUTH: 게임 전체 시스템 규칙의 종합 도움말 문서.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 3. ORDER

### [ORD-001] 발주서 헤더 및 문서 번호
SOURCE: `dist/ui/app.js` (`orderForm`)
CONTEXT: 발주서 최상단
CURRENT:
> 발주서
> DAY {s.day} · {s.branch}
RUNTIME_TRUTH: 현재 일차와 점포 지점명.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ORD-002] 발주 자금 레저 (장부)
SOURCE: `dist/ui/app.js` (`orderForm`)
CONTEXT: 발주서 상단 자금 변동 표
CURRENT:
> 보유 골드  {s.money}
> 선택 발주  -{total} / 0
> 발주 후    {after}G
RUNTIME_TRUTH: 장바구니 선택 합계에 따른 예상 잔액 실시간 표시 (부족 시 short 스타일).
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ORD-003] 오늘/내일 상황 요약 브리프
SOURCE: `dist/ui/app.js` (`orderForm`)
CONTEXT: 발주서 자금 표 하단 상황판
CURRENT:
> 오늘  {s.queue.length}명 · {dungeonNames}  [위험 보기]
> 내일  T1 {p0}% · T2 {p1}% · T3 {p2}% / 마왕성 최종 원정
RUNTIME_TRUTH: 오늘 예상 방문 손님 수, 열린 게이트 목록, '위험 보기' 모달 버튼, 내일 게이트 티어 등장 확률 예보.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ORD-004] 창고 현황 요약 접힘 (Stock Brief)
SOURCE: `dist/ui/app.js` (`stockBrief`)
CONTEXT: 발주서 내 접이식 창고 현황
CURRENT:
> 창고 {used} / {cap}칸 {stocks.length}종
> {it.name} {count}개  [기한 없음 / {left}일]
또는 (비어 있을 때)
> 창고가 비어 있다.
RUNTIME_TRUTH: 창고 내 보유 재고 수량과 유통기한 목록 표시. 1일 이하 남으면 soon 스타일.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ORD-005] 발주 품목 라인 — 상품명 및 가격표
SOURCE: `dist/ui/app.js` (`orderForm`)
CONTEXT: 각 발주 행 상단
CURRENT:
> {01~06} {it.name}  {it.sell}G
RUNTIME_TRUTH: 후보 번호, 상품명, 정가 판매 가격 태그.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ORD-006] 발주 품목 라인 — 효과 요약
SOURCE: `dist/ui/app.js` (`orderForm`)
CONTEXT: 발주 행 내 효과 미리보기
CURRENT:
> {label} {text} · ...
RUNTIME_TRUTH: 상품 효과 중 최대 3개 항목 표시.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ORD-007] 발주 품목 라인 — 경제 정보
SOURCE: `dist/ui/app.js` (`orderForm`)
CONTEXT: 발주 행 매입/재고 정보
CURRENT:
> 매입 {o.price}G · 이익 +{it.sell - o.price}G · 재고 {inventoryCount} · 공급 {o.quantity} [· 1+1]
RUNTIME_TRUTH: 매입 단가, 정가 판매 시 마진, 현재 창고 재고 수, 남은 발주 가능 수량, 1+1 행사 여부.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ORD-008] 발주 수량 조절 다이얼 및 수량 버튼
SOURCE: `dist/ui/app.js` (`orderForm`)
CONTEXT: 발주 행 우측 조작부
CURRENT:
> -
> {q}
> +
> 1
> 3
> 최대
RUNTIME_TRUTH: 발주 수량 직접 증감 및 1/3/최대 일괄 설정 버튼.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ORD-009] 후보 전체 교환 (리롤) 버튼
SOURCE: `dist/ui/app.js` (`orderForm`)
CONTEXT: 발주서 최하단 교환 버튼
CURRENT:
> 후보 전체 교환 · {fmt(price)}G [· 발주 교환권]
RUNTIME_TRUTH: 발주 후보 6종을 난수로 재추첨. 당일 횟수에 따라 50→100→200→400→800G로 상승. 발주 교환권 유물 보유 시 당일 첫 교환 무료.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ORD-010] 리롤 차단 시 안내 텍스트
SOURCE: `dist/ui/app.js` (`orderForm`)
CONTEXT: 장바구니에 상품을 1개 이상 담은 상태에서 리롤 버튼 하단
CURRENT:
> 선택한 수량을 0으로 되돌리면 후보를 교환할 수 있다.
RUNTIME_TRUTH: 수량이 선택되어 있으면 리롤 불가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ORD-011] D30 발주 확정 버튼
SOURCE: `dist/ui/app.js` (`orderForm`)
CONTEXT: DAY 30 최종 원정 준비 화면 내 발주서 전용 확정 버튼
CURRENT:
> 발주 확정
RUNTIME_TRUTH: DAY 30에는 영업으로 넘어가지 않고 창고에 재고만 확정 입고함.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ORD-012] 발주 확정 / 영업 시작 독 버튼
SOURCE: `dist/ui/app.js` (`orderScreen`)
CONTEXT: 발주 화면 하단 독 도장 버튼
CURRENT:
> 발주 {fmt(game.cartTotal())}G · 확정
또는 (선택 수량이 없을 때)
> 영업 시작
RUNTIME_TRUTH: 장바구니 결제 및 당일 판매 페이즈 개시.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 4. SALE

### [SAL-001] 모험가 명판 (Nameplate)
SOURCE: `dist/ui/app.js` (`standee`)
CONTEXT: 카운터 앞 손님 스탠디 하단
CURRENT:
> [{rank}] {n.name}
> Lv.{n.level} {job}
RUNTIME_TRUTH: 모험가 희귀도 등급 라벨(평범/유망/희귀/영웅/전설), 이름, 레벨, 직업.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-002] 손님 상태 및 장비 라인
SOURCE: `dist/ui/app.js` (`kitLine`)
CONTEXT: 판매 화면 상단 우측 상태 표시
CURRENT:
> 상태 {n.status} [· 부상 {n.injury}] [· 피로 {n.fatigue}] [· 휴식 {n.recovery}일]
> {n.equipment.name}
RUNTIME_TRUTH: 모험가의 현재 컨디션 및 착용 장비명.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-003] 가방 보급 슬롯 라벨
SOURCE: `dist/ui/app.js` (`kitLine`)
CONTEXT: 가방 보급 아이콘 좌측 텍스트
CURRENT:
> 가방 {n.pack.length} / {slots}
RUNTIME_TRUTH: 손님이 소지 가능한 소비품 슬롯 수(기본 2칸, Lv.10부터 3칸)와 현재 찬 슬롯 수.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-004] 대기열 표시
SOURCE: `dist/ui/app.js` (`waitingLine`)
CONTEXT: 카운터 우측 대기 손님 카드 뒷면 영역
CURRENT:
> 마지막 손님
또는
> 대기 {waiting}
RUNTIME_TRUTH: 카운터 뒤에 남은 손님 수 표시.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-005] 예상 목적지 명판
SOURCE: `dist/ui/app.js` (`destPlate`)
CONTEXT: 손님 상세 영역 상단
CURRENT:
> 예상 목적지
> {d.name}
RUNTIME_TRUTH: 손님이 가겠다고 진술한 게이트 이름과 알려진 위험 목록. (허세 특성이면 실제 목적지와 다를 수 있음)
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-006] 지난 방문 이후 요약 (Returning Summary)
SOURCE: `dist/ui/app.js` (`returningSummary`)
CONTEXT: 재방문 손님 상세 영역 상단 접이식 패널
CURRENT:
> 지난 원정 · DAY {r.day} {r.outcome}
> {r.changes.join(' · ')}
> {r.impact}
RUNTIME_TRUTH: 직전 원정 일차, 결과(성공/부상 등), 성장 내역, 지난 보급품 영향 내역.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-007] 전투 전망 및 환경 전망
SOURCE: `dist/ui/app.js` (`readout`)
CONTEXT: 판매 화면 손님 분석 카드
CURRENT:
> 전투 전망  {우세 / 접전 / 불리}
> 환경 전망  {충분 / 대응 / 불안 / 취약 / 위험 없음}
> 보급 {actual} / {required} [또는 보급 부담 없음]
RUNTIME_TRUTH: 현재 장비/보급 기준 전투 승률 및 던전 위험 대응 수준 실시간 예측.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-008] 대성공 기회 신호
SOURCE: `dist/data/copy.js` (`Copy.great.signal`)
CONTEXT: 준비 스펙이 요구치를 크게 초과할 때 전망 카드 하단에 노출
CURRENT:
> 대성공을 노려볼 만합니다.
RUNTIME_TRUTH: 대성공 판정 마진 조건을 충족했음을 알림.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-009] 전망 안내 캡션
SOURCE: `dist/ui/app.js` (`readout`)
CONTEXT: 전망 카드 최하단
CURRENT:
> 오늘 이 사람의 몸 상태와 지금 챙긴 보급으로 가늠한 것이다. 게이트 안에서 어떻게 될지까지는 아무도 모른다.
RUNTIME_TRUTH: 전망은 확률적 추정치임을 알리는 플레이버 겸 안내문.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-010] 진열대 헤더
SOURCE: `dist/ui/app.js` (`shelf`)
CONTEXT: 판매 화면 하단 상품 진열대
CURRENT:
> 진열대 [또는 대원에게 보급]  {stocks.length}종 · {total}개
또는 (비어 있을 때)
> 진열대가 비었다.
RUNTIME_TRUTH: 현재 상점에 보유 중인 상품 종류 및 총 수량.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-011] 상품 타일
SOURCE: `dist/ui/app.js` (`shelf`)
CONTEXT: 진열대 개별 상품 버튼
CURRENT:
> {it.name} [{kind}]
> {effects summary}
> {it.sell}G  재고 {st.count}
RUNTIME_TRUTH: 상품명, 포션 구분, 주요 효과, 정가, 재고 수량.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-012] 가격 패널 — 보급 후 변화 헤더
SOURCE: `dist/ui/app.js` (`till`)
CONTEXT: 상품 선택 시 열리는 계산 패널
CURRENT:
> {n.name}에게 판매 [또는 생략]
> 보급 후 변화
> {label} {before} → {after}
또는 (변화 없을 때)
> 이 손님의 준비는 달라지지 않는다
RUNTIME_TRUTH: 해당 상품을 건넸을 때 모험가의 스탯이나 위험 대응 수치가 변하는 내역.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-013] 가격 패널 — 미적용 효과 및 상품 설명 접힘
SOURCE: `dist/ui/app.js` (`till`)
CONTEXT: 가격 패널 중간 접이식 상세
CURRENT:
> 이 손님에게 안 걸리는 효과 · 상품 설명
> {label} {text}
> {it.description}
RUNTIME_TRUTH: 오늘 게이트에 해당하지 않는 카운터나 특수 효과 및 상품 플레이버 텍스트.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-014] 가격 패널 — 유통기한 안내
SOURCE: `dist/ui/app.js` (`till`)
CONTEXT: 가격 패널 하단 재고 폐기 안내
CURRENT:
> {유통기한 없음 / 폐기까지 N일} · 가장 먼저 폐기될 재고부터 나간다
RUNTIME_TRUTH: 선입선출(유통기한 임박분 우선 출고) 원칙 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-015] 가격 패널 — 판매 가격 버튼 3종
SOURCE: `dist/ui/app.js` (`till`)
CONTEXT: 가격 패널 최하단 결제 버튼
CURRENT:
> 50%   {price}G  [이익 {profit}G]
> 100%  {price}G  [이익 {profit}G]
> 150%  {price}G  [이익 {profit}G]
RUNTIME_TRUTH: 반값/정가/바가지 결제 버튼.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-016] 가격 패널 — 판매 불가 비활성 사유
SOURCE: `dist/ui/app.js` (`till`)
CONTEXT: 결제 버튼이 비활성화되었을 때 버튼 내 작은 글씨로 노출
CURRENT:
> 손님 소지금 부족
> 오늘 거절됨
> 가방 가득
RUNTIME_TRUTH: 지갑 잔액 부족, 당일 동일 조건 거절 이력, 가방 슬롯 포화로 인한 판매 불가 사유.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-017] 하단 독 — 손님 큐 및 손님 보내기
SOURCE: `dist/ui/app.js` (`saleScreen`)
CONTEXT: 판매 화면 최하단 독
CURRENT:
> 손님 {cursor+1} / {queue.length}
> 보유 골드 {fmt(s.money)}G
> 손님 보내기 / 영업 종료
RUNTIME_TRUTH: 현재 손님 번호, 상점 보유 자금, 다음 손님 호출 및 영업 종료 버튼.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-018] 심층원정 제안 인라인 블록
SOURCE: `dist/ui/app.js` (`deepOfferUI`, `dist/data/copy.js:135-152`)
CONTEXT: 심층원정이 열린 날 판매 화면 손님 정보 하단
CURRENT:
- 제안 접힘 summary:
  > 심층원정 · 심층원정에 추천
- 본문 안내:
  > 대상 게이트 {gate.name} — 같은 게이트의 더 깊은 구역이다. 위험 특성은 그대로이고, 요구 전투력만 올라간다.
  > 성공하면 그 모험가의 성장과 소지금이 늘어난다. 후원금은 돌려받지 않는다. 이 원정으로 가게가 버는 돈은 없다.
- 추천 버튼:
  > 심층원정에 추천 · 원정 후원금 {fmt(cost)}G
- 이미 추천 완료 시:
  > 심층원정
  > 원정 후원금 지급 {fmt(paid)}G · {gate.name}
  > 후원금은 돌려받지 않는다. 이 원정으로 가게가 버는 돈은 없다.
- 차단 사유 (한 줄 텍스트):
  > 심층원정 — 이미 배치를 조정한 손님은 추천할 수 없다.
  > 심층원정 — 후원금이 모자란다.
RUNTIME_TRUTH: 심층원정 추천 조건 및 비용, 후원금 지출 처리.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-019] 길드 특별 지원(원정 배치조정) 인라인 블록
SOURCE: `dist/ui/app.js` (`specialUI`)
CONTEXT: 특수 사건 중 목적지 배치조정이 떴을 때 판매 화면
CURRENT:
> 길드 원정 배치조정 · 오늘 한 번
> 아직 거래하지 않은 {n.name}의 목적지를 바꿀 수 있습니다.
> {gate.name} (버튼들)
RUNTIME_TRUTH: 거래 전 손님의 목적지 게이트를 즉시 변경.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SAL-020] 구매 의사 내부 판단 사유 (로그/상태용)
SOURCE: `dist/systems/shop.js` (`interest`)
CONTEXT: 손님의 구매 의사(interest) 판정 결과 객체 내부 reason
CURRENT:
> 손님 소지금이 모자랍니다.
> 가격 부담으로 구매를 망설입니다.
> 필요도가 낮아 구매를 망설입니다.
> 이번 제안을 받아들이지 않았습니다.
RUNTIME_TRUTH: 거절 사유 분류(price, need, choice)를 결정하는 내부 텍스트.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 5. NIGHT / RESULT / CLOSING

### [RES-001] 밤 화면 헤더 및 귀환 레일
SOURCE: `dist/ui/app.js` (`nightScreen`)
CONTEXT: 밤 화면 상단
CURRENT:
> 귀환 {at+1} / {total}
> 게이트 순례주간 · 실제 변경 {count}명 [순례 사건 시]
또는 (원정 나간 인원 없을 때)
> 오늘은 원정에 나선 손님이 없었다.
RUNTIME_TRUTH: 당일 원정에 출전한 모험가 수와 현재 확인 중인 번호.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-002] 밤 판정(Verdict) 라벨
SOURCE: `dist/ui/presentation.js` (`nightVerdict`)
CONTEXT: 밤 결과 카드 좌측 상단 볼드 판정 단어
CURRENT:
> 대성공
> 성공
> 퇴각
> 부상
> 중상
> 사망
> 위기에서 생환
RUNTIME_TRUTH: 원정 최종 결과 7종 분류.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-003] 일어난 일 (WHAT HAPPENED)
SOURCE: `dist/ui/presentation.js` (`nightHappened`)
CONTEXT: 밤 결과 카드 중앙 메인 요약 문장
CURRENT:
1. 사망:
   > 전투에서 밀린 뒤 돌아오지 못했다.
2. 사망 방지 (아이템 발동):
   > 보급이 마지막 순간의 사망을 막았다.
3. 중상:
   > 큰 부상을 입었다. 회복할 시간이 필요하다.
4. 퇴각 (전투 승리 후 환경/부상 퇴각):
   > 전투는 이겼지만 원정을 끝내지 못하고 빠져나왔다.
5. 퇴각 (전투 패배 후 탈출):
   > 원정은 끝내지 못했지만 무사히 빠져나왔다.
6. 부상 (전투 승리 후 부상):
   > 전투를 이겼지만 돌아오는 길은 험했다.
7. 부상 (전투 패배 후 부상):
   > 원정을 끝내지 못하고 다친 채 돌아왔다.
8. 대성공:
   > 예상보다 일찍 게이트에서 나왔다.
9. 일반 성공:
   > 원정을 마치고 돌아왔다.
RUNTIME_TRUTH: 전투 승패와 원정 결과 조합에 따른 확정 팩트 서술.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-004] 원인 (WHY)
SOURCE: `dist/ui/presentation.js` (`nightWhy`)
CONTEXT: 밤 결과 카드 '일어난 일' 하단 원인 설명
CURRENT:
- 전투 결과:
  > 적을 물리쳤다. / 적을 물리치지 못했다.
- 환경 피해/사고:
  > {독/속박/부식/진창/화염/공포/어둠/냉기/화이트아웃/보급 부담} 때문에 원정 내내 고전했다.
  > 원정 중 예상치 못한 사고가 있었다.
RUNTIME_TRUTH: 전투 승패 및 실제 피해를 유발한 미대응 위험 원인 명시.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-005] 변화 토큰 (WHAT CHANGED)
SOURCE: `dist/ui/presentation.js` (`nightChanges`, `nightChange`, `dist/ui/app.js:425-432`)
CONTEXT: 밤 결과 카드 하단 변화 내역 칩
CURRENT:
> 레벨  Lv.{old} → Lv.{new}
> 새 특성  「{trait.name}」
> 승급  {rank}
> 장비  {equipment.name}  전투 +{power}
> 변화  {text}
> {능력치명}  {before} → {after}
> 휴식  {recovery}일
> 남은 부상  강인함 -{injury*5} · 투력 -{injury*3}
> 경험치  +{xp}
> 전리품  {loot}G
> 대성공 본사 보상  +{storeBonus}G
> 심층원정 보상  경험치 +{bonusXp}
> 심층원정 보상  손님 소지금 +{bonusWallet}G
RUNTIME_TRUTH: 원정으로 인해 발생한 스탯, 레벨, 장비, 골드 등의 수치 변화.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-006] 보급 영향 (Supply Note)
SOURCE: `dist/ui/presentation.js` (`supplyLines`, `supplyEffect`)
CONTEXT: 밤 결과 카드 하단 보급 기여도 한 줄
CURRENT:
> {item1} [· {item2}] → {피해 방지 / 위험 감소 / 사망 위기에서 생환 / 퇴각에 기여 / 사망을 중상으로 / 부상 완화}
RUNTIME_TRUTH: 판매한 보급품이 실제 원정 중 어떤 위험이나 위기를 막아주었는지 명시.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-007] 경로 변경 보고
SOURCE: `dist/systems/shop.js` (`night`)
CONTEXT: 허세 특성이나 순례 이벤트로 목적지가 바뀐 손님의 결과 카드 상단
CURRENT:
> 허세를 부린 {n.name}은 말했던 {claimed.name} 대신 {d.name}으로 향했다.
또는
> 순례 행렬을 따라 {n.name}은 예상 목적지 {claimed.name} 대신 {d.name}으로 향했다.
RUNTIME_TRUTH: 목적지 불일치 사유 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-008] 밤 화면 독 버튼
SOURCE: `dist/ui/app.js` (`nightScreen`)
CONTEXT: 밤 화면 하단 컨트롤 바
CURRENT:
> 건너뛰기
> 전체 건너뛰기
> 다음 / 정산으로
RUNTIME_TRUTH: 결과 카드 넘기기 및 마감 페이즈 직행 버튼.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-009] 마감 영수증 롤 — 헤더
SOURCE: `dist/ui/app.js` (`closingScreen`)
CONTEXT: 마감 영수증 최상단
CURRENT:
> GUILD24
> DAY {s.day} · {s.branch}
> 영업 종료
RUNTIME_TRUTH: 마감 정산서 헤더.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-010] 마감 영수증 롤 — 매출 및 마진 블록
SOURCE: `dist/ui/app.js` (`closingScreen`)
CONTEXT: 영수증 첫 번째 블록
CURRENT:
> 매출        {d.revenue}
> 판매 원가   -{d.cogs}
> 판매 마진   {margin}
RUNTIME_TRUTH: 당일 상품 판매 총액, 판매된 상품의 매입 원가, 마진 합계.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-011] 마감 영수증 롤 — 비용 및 지원 블록
SOURCE: `dist/ui/app.js` (`closingScreen`)
CONTEXT: 영수증 두 번째 블록
CURRENT:
> 운영비          -{d.operating}
> 폐기 원가        -{d.wasteCost}
> 발주 교환        -{d.rerollSpent}
> 본사 지원·수당    {subsidy + commission}
> [대성공 본사 보상  {d.greatSuccess}]
RUNTIME_TRUTH: 일일 고정 운영비, 유통기한 폐기 비용, 리롤 지출, 본사 지원금 및 대성공 인센티브.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-012] 마감 영수증 롤 — 영업 손익
SOURCE: `dist/ui/app.js` (`closingScreen`)
CONTEXT: 영수증 손익 합계 라인
CURRENT:
> 영업 손익  [+ / -]{profit}
RUNTIME_TRUTH: 마진 + 지원금 - 운영비 - 폐기 - 교환비용.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-013] 마감 영수증 롤 — 현금 흐름 및 잔액 블록
SOURCE: `dist/ui/app.js` (`closingScreen`)
CONTEXT: 영수증 하단 현금 결산
CURRENT:
> 발주 지출      -{d.spent}
> 점포지원 투자  -{d.relicSpent}
> [원정 후원금    -{d.deepSponsor}]
> 재고 정리      {d.liquidation}
> 보유 자금      {s.money}G
RUNTIME_TRUTH: 당일 현금 유출입 항목 및 최종 보유 골드.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-014] 마감 영수증 롤 — 오늘의 보급 영향
SOURCE: `dist/ui/app.js` (`closingScreen`)
CONTEXT: 영수증 하단 오늘의 보급 기여도 요약 목록
CURRENT:
> 오늘의 보급 영향
> {items}  {who}의 {effect}
RUNTIME_TRUTH: 당일 판매된 보급품 중 모험가를 도운 항목 최대 4건 요약.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-015] 마감 영수증 롤 — 회계 안내 푸터
SOURCE: `dist/ui/app.js` (`closingScreen`)
CONTEXT: 영수증 최하단 안내문
CURRENT:
> 미판매 재고는 자산으로 남는다. 발주 지출과 판매 원가를 손익에서 두 번 빼지 않는다.
RUNTIME_TRUTH: 손익(발생주의)과 현금흐름의 차이를 설명하는 정산 원칙 안내문.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [RES-016] 마감 하단 독 — 적자 경고 및 회생 버튼
SOURCE: `dist/ui/app.js` (`closingScreen`)
CONTEXT: 마감 시 보유 자금이 0 미만일 때 하단 독
CURRENT:
> 운영비가 부족하다. 회생 {spent} / {cap} [또는 회생을 모두 썼다.]
> 재고 정리
> 폐점
> 다음 날
RUNTIME_TRUTH: 적자 시 재고 정리 모달 호출 또는 런 종료(폐점) 선택.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 6. ITEM (상품 30종)

### [ITM-001] 삼각김밥
SOURCE: `dist/data/catalog.js` (`items[0]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 삼각김밥
- 브랜드: 용사픽
- 등급/분류: 일반(0) / 신선식품(fresh/food), 유통기한 2일
- 가격: 매입 35G / 정가 70G
- 설명/Flavor:
  > 김 끝을 잡고 천천히.
- 효과: 강인함 +3, 보급 +5
RUNTIME_TRUTH: 기본 식량 아이템.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-002] 생수
SOURCE: `dist/data/catalog.js` (`items[1]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 생수
- 브랜드: 용사픽
- 등급/분류: 일반(0) / 음료(drink), 유통기한 5일
- 가격: 매입 25G / 정가 55G
- 설명/Flavor:
  > 뚜껑까지 챙겨 돌아오세요.
- 효과: 강인함 +2, 보급 +3
RUNTIME_TRUTH: 저가 기본 음료 아이템.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-003] 컵라면
SOURCE: `dist/data/catalog.js` (`items[2]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 컵라면
- 브랜드: 원정한끼
- 등급/분류: 일반(0) / 가공식품(food), 유통기한 4일
- 가격: 매입 45G / 정가 90G
- 설명/Flavor:
  > 뜨거운 국물과 약간의 냉기 저항.
- 효과: 강인함 +3, 냉기 대응 +8, 보급 +5
RUNTIME_TRUTH: 보급 및 냉기 위험 대응 복합 식품.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-004] 핫바
SOURCE: `dist/data/catalog.js` (`items[3]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 핫바
- 브랜드: 용사픽
- 등급/분류: 일반(0) / 신선식품(fresh/food), 유통기한 2일
- 가격: 매입 40G / 정가 80G
- 설명/Flavor:
  > 꼬치는 매장 앞 수거함에.
- 효과: 투력 +4, 강인함 +5, 보급 +4
RUNTIME_TRUTH: 전투력 보강 신선식품.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-005] 초코바
SOURCE: `dist/data/catalog.js` (`items[4]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 초코바
- 브랜드: 용사픽
- 등급/분류: 일반(0) / 가공식품(food), 유통기한 5일
- 가격: 매입 30G / 정가 65G
- 설명/Flavor:
  > 주머니에서 녹기 전에 드세요.
- 효과: 기동 +6, 보급 +2
RUNTIME_TRUTH: 기동력 보강 간식.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-006] 캔커피
SOURCE: `dist/data/catalog.js` (`items[5]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 캔커피
- 브랜드: MANA+
- 등급/분류: 일반(0) / 음료(drink), 유통기한 5일
- 가격: 매입 35G / 정가 75G
- 설명/Flavor:
  > 발걸음이 조금 가벼워진다.
- 효과: 기동 +7, 보급 +2
RUNTIME_TRUTH: 기동력 보강 음료.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-007] 붕대
SOURCE: `dist/data/catalog.js` (`items[6]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 붕대
- 브랜드: 귀환안심
- 등급/분류: 일반(0) / 의료(medicine), 유통기한 7일
- 가격: 매입 50G / 정가 100G
- 설명/Flavor:
  > 감는 법을 모르면 소용없다고, 늘 한마디 덧붙이게 된다.
- 효과: 강인함 +3, 부상 방어 +35%p
RUNTIME_TRUTH: 부상 확률 경감 기본 의료품.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-008] 하급 포션
SOURCE: `dist/data/catalog.js` (`items[7]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 하급 포션
- 브랜드: 귀환안심
- 등급/분류: 일반(0) / 의료(medicine), 유통기한 7일
- 가격: 매입 70G / 정가 140G
- 설명/Flavor:
  > 차갑게 보관하지 않아도 됩니다.
- 효과: 강인함 +12, 포션
RUNTIME_TRUTH: 높은 강인함 제공 및 포션체질 특성과 상호작용.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-009] 얼음컵
SOURCE: `dist/data/catalog.js` (`items[8]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 얼음컵
- 브랜드: 용사픽
- 등급/분류: 일반(0) / 음료(drink), 유통기한 4일
- 가격: 매입 25G / 정가 60G
- 설명/Flavor:
  > 컵에 얼음만 가득 담아 판다. 녹기 전에 도착하길.
- 효과: 화염 대응 +17, 보급 +2
RUNTIME_TRUTH: 화염 던전 대응 저가 소모품.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-010] 랜턴 건전지
SOURCE: `dist/data/catalog.js` (`items[9]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 랜턴 건전지
- 브랜드: 귀환안심
- 등급/분류: 일반(0) / 야외장비(tool), 유통기한 없음
- 가격: 매입 40G / 정가 85G
- 설명/Flavor:
  > 흔들면 조금 더 간다. 근거는 없다.
- 효과: 어둠 대응 +17, 정신 +3
RUNTIME_TRUTH: 어둠 던전 대응 도구.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-011] 경량 로프
SOURCE: `dist/data/catalog.js` (`items[10]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 경량 로프
- 브랜드: 귀환안심
- 등급/분류: 일반(0) / 야외장비(tool), 유통기한 없음
- 가격: 매입 50G / 정가 105G
- 설명/Flavor:
  > 매듭을 풀고 감았다. 다시 묶어야 한다.
- 효과: 기동 +4, 속박 대응 +12
RUNTIME_TRUTH: 속박 던전 대응 도구.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-012] 집중 사탕
SOURCE: `dist/data/catalog.js` (`items[11]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 집중 사탕
- 브랜드: 용사픽
- 등급/분류: 일반(0) / 가공식품(food), 유통기한 5일
- 가격: 매입 35G / 정가 75G
- 설명/Flavor:
  > 시험 전에도 잘 팔린다.
- 효과: 정신 +7, 공포 대응 +5, 보급 +1
RUNTIME_TRUTH: 정신 보강 및 약한 공포 대응 식품.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-013] 불룡볶음면
SOURCE: `dist/data/catalog.js` (`items[12]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 불룡볶음면
- 브랜드: 원정한끼
- 등급/분류: 고급(1) / 가공식품(food), 유통기한 4일
- 가격: 매입 65G / 정가 135G
- 설명/Flavor:
  > 용 그림은 장식이 아니다.
- 효과: 투력 +8, 냉기 대응 +12, 보급 +5
RUNTIME_TRUTH: 냉기 대응 및 높은 투력 보강 식품.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-014] 에너지드링크
SOURCE: `dist/data/catalog.js` (`items[13]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 에너지드링크
- 브랜드: MANA+
- 등급/분류: 고급(1) / 음료(drink), 유통기한 5일
- 가격: 매입 70G / 정가 150G
- 설명/Flavor:
  > 오늘 쓸 기운을 당겨왔다.
- 효과: 기동 +13, 보급 +3
RUNTIME_TRUTH: 높은 기동력 보강 음료.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-015] 용사의 곡주
SOURCE: `dist/data/catalog.js` (`items[14]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 용사의 곡주
- 브랜드: 원정한끼
- 등급/분류: 고급(1) / 음료(drink), 유통기한 5일
- 가격: 매입 60G / 정가 130G
- 설명/Flavor:
  > 공포를 잊게 한다. 발걸음은 살짝 꼬인다.
- 효과: 공포 대응 +24, 기동 -5, 보급 +3
RUNTIME_TRUTH: 강력한 공포 대응 대신 기동 패널티를 주는 트레이드오프 음료.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-016] 구급키트
SOURCE: `dist/data/catalog.js` (`items[15]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 구급키트
- 브랜드: 귀환안심
- 등급/분류: 고급(1) / 의료(medicine), 유통기한 7일
- 가격: 매입 120G / 정가 240G
- 설명/Flavor:
  > 열어 본 사람은 대개 그날을 오래 기억한다.
- 효과: 강인함 +10, 부상 방어 +65%p
RUNTIME_TRUTH: 높은 부상 방어율을 제공하는 고급 의료품.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-017] 방진마스크
SOURCE: `dist/data/catalog.js` (`items[16]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 방진마스크
- 브랜드: 귀환안심
- 등급/분류: 고급(1) / 야외장비(tool), 유통기한 없음
- 가격: 매입 90G / 정가 180G
- 설명/Flavor:
  > 쓰고 나면 얼굴 자국이 한참 남는다.
- 효과: 독 대응 +20
RUNTIME_TRUTH: 독 위험 대응 도구.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-018] 핫팩
SOURCE: `dist/data/catalog.js` (`items[17]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 핫팩
- 브랜드: 귀환안심
- 등급/분류: 고급(1) / 야외장비(tool), 유통기한 없음
- 가격: 매입 55G / 정가 120G
- 설명/Flavor:
  > 주머니 안에서 겨울을 버틴다.
- 효과: 냉기 대응 +22
RUNTIME_TRUTH: 냉기 위험 전문 대응 도구.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-019] 방수망토
SOURCE: `dist/data/catalog.js` (`items[18]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 방수망토
- 브랜드: 귀환안심
- 등급/분류: 고급(1) / 야외장비(tool), 유통기한 없음
- 가격: 매입 75G / 정가 160G
- 설명/Flavor:
  > 부식과 진창에 두루 쓴다. 어느 쪽도 전문가만은 못하다.
- 효과: 부식 대응 +14, 진창 대응 +14
RUNTIME_TRUTH: 슬라임 하수도(부식+진창) 복합 대응 장비.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-020] 부식 방지 코팅제
SOURCE: `dist/data/catalog.js` (`items[19]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 부식 방지 코팅제
- 브랜드: 귀환안심
- 등급/분류: 고급(1) / 야외장비(tool), 유통기한 없음
- 가격: 매입 70G / 정가 150G
- 설명/Flavor:
  > 장비 겉면에 얇게 펴 바른다. 굳기 전에 서두를 것.
- 효과: 부식 대응 +22
RUNTIME_TRUTH: 부식 위험 전문 대응 도구.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-021] 원정용 장화
SOURCE: `dist/data/catalog.js` (`items[20]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 원정용 장화
- 브랜드: 귀환안심
- 등급/분류: 고급(1) / 야외장비(tool), 유통기한 없음
- 가격: 매입 65G / 정가 135G
- 설명/Flavor:
  > 밑창에 진흙이 잘 붙지 않는다.
- 효과: 진창 대응 +22, 기동 +3
RUNTIME_TRUTH: 진창 위험 대응 및 기동 보조 장비.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-022] 설원 고글
SOURCE: `dist/data/catalog.js` (`items[21]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 설원 고글
- 브랜드: 귀환안심
- 등급/분류: 고급(1) / 야외장비(tool), 유통기한 없음
- 가격: 매입 60G / 정가 125G
- 설명/Flavor:
  > 눈보라 속에서도 앞이 남는다.
- 효과: 화이트아웃 대응 +22
RUNTIME_TRUTH: 설원 화이트아웃 위험 전문 대응 장비.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-023] 상급 포션
SOURCE: `dist/data/catalog.js` (`items[22]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 상급 포션
- 브랜드: 길드초이스
- 등급/분류: 희귀(2) / 의료(medicine), 유통기한 7일
- 가격: 매입 150G / 정가 300G
- 설명/Flavor:
  > 작은 병에 진하게 담았다.
- 효과: 강인함 +27, 포션
RUNTIME_TRUTH: 대량의 강인함을 즉시 부여하는 고위 포션.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-024] 농축 해독제
SOURCE: `dist/data/catalog.js` (`items[23]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 농축 해독제
- 브랜드: 귀환안심
- 등급/분류: 희귀(2) / 의료(medicine), 유통기한 7일
- 가격: 매입 220G / 정가 450G
- 설명/Flavor:
  > 한 모금이면 충분하다고 적혀 있다. 두 모금은 권하지 않는다.
- 효과: 독 대응 +42, 강인함 +5, 독 대응 상품
RUNTIME_TRUTH: 거미 동굴 상급 독 위험을 완전히 무력화하는 전문 의약품.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-025] 귀환석
SOURCE: `dist/data/catalog.js` (`items[24]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 귀환석
- 브랜드: 귀환안심
- 등급/분류: 희귀(2) / 보험(insurance), 유통기한 없음
- 가격: 매입 260G / 정가 520G
- 설명/Flavor:
  > 사망·중상 위기에서도 같은 수치로 한 번 더 돌아올 기회가 생긴다.
- 효과: 탈출 보정 +50%p
RUNTIME_TRUTH: 사망/중상 위기 발생 시 탈출 롤을 재부여해 생환시키는 핵심 생명보험 아이템.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-026] 마석 보조배터리
SOURCE: `dist/data/catalog.js` (`items[25]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 마석 보조배터리
- 브랜드: MANA+
- 등급/분류: 희귀(2) / 특수(magic), 유통기한 없음
- 가격: 매입 240G / 정가 500G
- 설명/Flavor:
  > 잡념까지 충전하지는 않는다.
- 효과: 투력 +4, 정신 +25
RUNTIME_TRUTH: 망자역 등 정신 요구치가 높은 던전 대응 특수 장비.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-027] 길드 프리미엄 도시락
SOURCE: `dist/data/catalog.js` (`items[26]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 길드 프리미엄 도시락
- 브랜드: 길드초이스
- 등급/분류: 희귀(2) / 신선식품(fresh/food), 유통기한 2일
- 가격: 매입 280G / 정가 560G
- 설명/Flavor:
  > 뚜껑이 잘 안 닫힌다.
- 효과: 강인함 +14, 보급 +7, 전리품 +20%p
RUNTIME_TRUTH: 고마진 신선식품 및 모험가 파밍 골드 증폭.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-028] 쿨링 이온음료
SOURCE: `dist/data/catalog.js` (`items[27]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 쿨링 이온음료
- 브랜드: MANA+
- 등급/분류: 희귀(2) / 음료(drink), 유통기한 5일
- 가격: 매입 200G / 정가 400G
- 설명/Flavor:
  > 얼음컵만큼 시원하진 않지만 오래 간다.
- 효과: 화염 대응 +12, 보급 +4
RUNTIME_TRUTH: 안정적인 화염 던전 대응 음료.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-029] 세계수 생환부적
SOURCE: `dist/data/catalog.js` (`items[28]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 세계수 생환부적
- 브랜드: 길드초이스
- 등급/분류: 영웅(3) / 보험(insurance), 유통기한 없음
- 가격: 매입 600G / 정가 1200G
- 설명/Flavor:
  > 잎맥이 아직 마르지 않았다.
- 효과: 사망 판정을 중상으로 변경
RUNTIME_TRUTH: 모험가가 사망 판정을 받았을 때 1회에 한해 중상으로 전환하여 영구 사망을 방지하는 최고급 보험.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [ITM-030] 황금 1+1 쿠폰
SOURCE: `dist/data/catalog.js` (`items[29]`)
CONTEXT: 상품 카탈로그, 발주, 진열대, 도감
CURRENT:
- 이름: 황금 1+1 쿠폰
- 브랜드: 길드초이스
- 등급/분류: 전설(4) / 특수(magic), 유통기한 없음
- 가격: 매입 1000G / 정가 2000G
- 설명/Flavor:
  > 본사 도장이 선명하다. 유효기간은 적혀 있지 않다.
- 효과: 다음 소비품 효과 2회 적용 · 쿠폰도 1칸 사용 · 중첩 불가
- 해금 조건: 서로 다른 마왕 1종 토벌
RUNTIME_TRUTH: 가방 내 다음에 들어있는 소비 아이템의 효과를 2배로 발동시키는 메타 해금 전설 아이템.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 7. RELIC / STORE SUPPORT (점포지원 30종)

### [REL-001] 묶음발주 계약
SOURCE: `dist/data/relics.js` (`rows[0]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 묶음발주 계약
- 분류: 기반 (foundation) / 태그: 박리다매 (rotation)
- 기준가: 260G
- 설명:
  > 같은 상품을 한 번에 3개 이상 발주하면 3번째부터 매입가 15% 할인.
RUNTIME_TRUTH: 단일 SKU 3개 이상 발주 시 3개째부터 단가 15% 감면.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-002] 회전 진열대
SOURCE: `dist/data/relics.js` (`rows[1]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 회전 진열대
- 분류: 기반 (foundation) / 태그: 박리다매 (rotation)
- 기준가: 240G
- 설명:
  > 하루 6건 이상 판매하면 다음 날 첫 대량발주가 10% 저렴해진다.
RUNTIME_TRUTH: 전날 판매 6건 이상 달성 시 다음 날 첫 3개 이상 묶음발주 단가 10% 할인.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-003] 단골 스탬프 기계
SOURCE: `dist/data/relics.js` (`rows[2]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 단골 스탬프 기계
- 분류: 기반 (foundation) / 태그: 단골 육성 (vip)
- 기준가: 260G
- 설명:
  > 유료 구매의 단골도 증가량 +50%. 무료 보급과 생환에는 적용하지 않는다.
RUNTIME_TRUTH: 유료 판매 시 부여되는 기본 단골도에 1.5배 보정.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-004] 회원 관리대장
SOURCE: `dist/data/relics.js` (`rows[3]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 회원 관리대장
- 분류: 기반 (foundation) / 태그: 단골 육성 (vip)
- 기준가: 260G
- 설명:
  > 다음 날부터 이미 만난 손님의 방문 가중치 +40%.
RUNTIME_TRUTH: 기존 방문 이력이 있는 모험가의 방문 가중치 1.4배.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-005] 프리미엄 쇼케이스
SOURCE: `dist/data/relics.js` (`rows[4]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 프리미엄 쇼케이스
- 분류: 기반 (foundation) / 태그: 고마진 (premium)
- 기준가: 280G
- 설명:
  > 희귀 이상 발주 가중치 +70%. 다음 날부터 운영비 +10G.
RUNTIME_TRUTH: 희귀도 2 이상 상품 발주 확률 증가, 일일 운영비 10G 증가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-006] 길드 보증 진열대
SOURCE: `dist/data/relics.js` (`rows[5]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 길드 보증 진열대
- 분류: 기반 (foundation) / 태그: 고마진 (premium)
- 기준가: 280G
- 설명:
  > 하루 한 번, 정가 200G 이상 상품을 처음 팔 때 본사가 정가의 20%를 부담한다. 점주는 선택한 가격을 전액 받는다.
RUNTIME_TRUTH: 정가 200G 이상 상품 첫 판매 시 모험가 지불액 20%를 본사 지원금으로 충당.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-007] 원정 위험 게시판
SOURCE: `dist/data/relics.js` (`rows[6]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 원정 위험 게시판
- 분류: 기반 (foundation) / 태그: 원정 전문 (expedition)
- 기준가: 260G
- 설명:
  > 알려진 게이트 위험에 대응하는 상품의 발주 가중치 +80%.
RUNTIME_TRUTH: 당일 게이트 위험 대응 상품의 발주 생성 가중치 1.8배.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-008] 긴급보급 선반
SOURCE: `dist/data/relics.js` (`rows[7]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 긴급보급 선반
- 분류: 기반 (foundation) / 태그: 원정 전문 (expedition)
- 기준가: 260G
- 설명:
  > 치료·야외장비·보험 상품 발주 가중치 +60%, 공급 수량 +1.
RUNTIME_TRUTH: 의료/도구/보험 카테고리 발주 가중치 1.6배 및 발주 가능 수량 +1개.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-009] 대형 냉장고
SOURCE: `dist/data/relics.js` (`rows[8]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 대형 냉장고
- 분류: 기반 (foundation) / 태그: 신선식품 (fresh)
- 기준가: 260G
- 설명:
  > 음식·음료 유통기한 +1일. 보유 중인 해당 재고도 획득 시 한 번 연장.
RUNTIME_TRUTH: 음식/음료 입고 시 유통기한 1일 추가 및 기존 재고 1회 1일 연장.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-010] 즉석식품 코너
SOURCE: `dist/data/relics.js` (`rows[9]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 즉석식품 코너
- 분류: 기반 (foundation) / 태그: 신선식품 (fresh)
- 기준가: 280G
- 설명:
  > 음식·음료의 보급·강인함 효과 +20%. 위험 대응과 부작용은 그대로.
RUNTIME_TRUTH: 음식/음료의 보급 수치 및 강인함 수치 1.2배.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-011] 길드 전광판
SOURCE: `dist/data/relics.js` (`rows[10]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 길드 전광판
- 분류: 기반 (foundation) / 태그: 상권 (customer)
- 기준가: 260G
- 설명:
  > 다음 날부터 방문객 +1명. 활동 가능한 인원 내에서 방문.
RUNTIME_TRUTH: 일일 기본 방문객 수 +1명.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-012] 신입 모집 게시판
SOURCE: `dist/data/relics.js` (`rows[11]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 신입 모집 게시판
- 분류: 기반 (foundation) / 태그: 상권 (customer)
- 기준가: 240G
- 설명:
  > 다음 날부터 신규 손님 선택 가중치 +70%. 후반 신입도 현재 시기에 맞는 레벨로 합류.
RUNTIME_TRUTH: 미방문 NPC 방문 가중치 1.7배.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-013] 공동구매 전단
SOURCE: `dist/data/relics.js` (`rows[12]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 공동구매 전단
- 분류: 복합 (hybrid) / 태그: 박리다매, 상권 (rotation, customer)
- 기준가: 400G
- 설명:
  > 오늘 방문객 6명 이상이면 3개 이상 묶음발주 매입가 10% 할인.
RUNTIME_TRUTH: 당일 방문객 6명 이상 시 단일 SKU 3개 이상 발주 매입가 10% 할인.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-014] 단골 묶음혜택
SOURCE: `dist/data/relics.js` (`rows[13]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 단골 묶음혜택
- 분류: 복합 (hybrid) / 태그: 박리다매, 단골 육성 (rotation, vip)
- 기준가: 380G
- 설명:
  > 재방문 손님의 그날 두 번째 유료 구매에 단골도 +2.
RUNTIME_TRUTH: 재방문 손님이 하루에 2개 이상 유료 구매 시 단골도 2 추가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-015] 프리미엄 멤버십
SOURCE: `dist/data/relics.js` (`rows[14]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 프리미엄 멤버십
- 분류: 복합 (hybrid) / 태그: 단골 육성, 고마진 (vip, premium)
- 기준가: 420G
- 설명:
  > 단골도 50 이상 손님의 희귀 상품 구매 의사 +10%p.
RUNTIME_TRUTH: 단골도 50 이상 모험가의 희귀도 2 이상 상품 구매 의사 +0.10.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-016] 귀환 적립제
SOURCE: `dist/data/relics.js` (`rows[15]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 귀환 적립제
- 분류: 복합 (hybrid) / 태그: 단골 육성, 원정 전문 (vip, expedition)
- 기준가: 400G
- 설명:
  > 오늘 유료 구매한 재방문 손님이 단골도 30 이상으로 생환하면 단골도 +2, 소지금 +12G.
RUNTIME_TRUTH: 조건 충족 귀환 시 모험가 소지금 및 단골도 보너스.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-017] 원정 도시락 코너
SOURCE: `dist/data/relics.js` (`rows[16]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 원정 도시락 코너
- 분류: 복합 (hybrid) / 태그: 신선식품, 원정 전문 (fresh, expedition)
- 기준가: 400G
- 설명:
  > 음식·음료가 원래 가진 위험 대응 효과가 실제 목적지와 맞으면 해당 효과 +25%.
RUNTIME_TRUTH: 음식/음료의 카운터 효과가 던전 위험과 일치 시 효과 1.25배.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-018] 냉장 쇼케이스
SOURCE: `dist/data/relics.js` (`rows[17]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 냉장 쇼케이스
- 분류: 복합 (hybrid) / 태그: 신선식품, 고마진 (fresh, premium)
- 기준가: 420G
- 설명:
  > 희귀 신선식품 발주 가중치 +80%, 유통기한 +1일.
RUNTIME_TRUTH: 고급/희귀 신선식품 발주 확률 1.8배 및 유통기한 +1일.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-019] 길드 납품 인증
SOURCE: `dist/data/relics.js` (`rows[18]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 길드 납품 인증
- 분류: 복합 (hybrid) / 태그: 고마진, 원정 전문 (premium, expedition)
- 기준가: 440G
- 설명:
  > 알려진 위험 대응 또는 보험 역할의 희귀 상품 판매 시 정가의 8%를 본사 수당으로 받는다.
RUNTIME_TRUTH: 위험 대응/보험 희귀 상품 판매 시 정가의 8% 추가 수당 입금.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-020] 새벽 공동배송
SOURCE: `dist/data/relics.js` (`rows[19]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 새벽 공동배송
- 분류: 복합 (hybrid) / 태그: 신선식품, 박리다매 (fresh, rotation)
- 기준가: 380G
- 설명:
  > 음식·음료를 같은 상품 3개 이상 묶음발주하면 매입가 15% 할인.
RUNTIME_TRUTH: 음식/음료 SKU 3개 이상 발주 시 매입 단가 15% 할인.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-021] 물류 본부계약
SOURCE: `dist/data/relics.js` (`rows[20]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 물류 본부계약
- 분류: 핵심 (keystone) / 태그: 박리다매 (rotation)
- 기준가: 720G
- 설명:
  > 전날 8건 이상 판매하면 다음 날 첫 대량발주 매입가 25% 할인.
RUNTIME_TRUTH: 전날 판매 8건 이상 시 다음 날 첫 3개 이상 묶음발주 25% 파격 할인.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-022] 평생 단골제
SOURCE: `dist/data/relics.js` (`rows[21]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 평생 단골제
- 분류: 핵심 (keystone) / 태그: 단골 육성 (vip)
- 기준가: 740G
- 설명:
  > 단골도 60 이상 생환 고객에게 하루 한 번 소지금 +25G. 다음 방문 선택 가중치 +50%.
RUNTIME_TRUTH: 고단골 모험가의 소지금 매일 25G 지원 및 방문 빈도 대폭 증가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-023] 왕도 프리미엄 인증
SOURCE: `dist/data/relics.js` (`rows[22]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 왕도 프리미엄 인증
- 분류: 핵심 (keystone) / 태그: 고마진 (premium)
- 기준가: 760G
- 설명:
  > 희귀 이상 바가지 판매에 정가의 12% 본사 수당.
RUNTIME_TRUTH: 희귀 상품을 150% 바가지 판매 성공 시 정가의 12%를 본사 지원금으로 추가 획득.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-024] 길드24 원정전문점 인증
SOURCE: `dist/data/relics.js` (`rows[23]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 길드24 원정전문점 인증
- 분류: 핵심 (keystone) / 태그: 원정 전문 (expedition)
- 기준가: 700G
- 설명:
  > 알려진 위험이 있으면 발주 후보에 해당 위험 대응 역할을 최소 1종 확보. 교환에도 유지.
RUNTIME_TRUTH: 발주 슬롯 생성 시 당일 던전 카운터 상품이 100% 최소 1개 확정 출현.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-025] 24시간 신선체계
SOURCE: `dist/data/relics.js` (`rows[24]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 24시간 신선체계
- 분류: 핵심 (keystone) / 태그: 신선식품 (fresh)
- 기준가: 740G
- 설명:
  > 음식·음료 유통기한 +2일, 보급·강인함 효과 +25%.
RUNTIME_TRUTH: 음식/음료 유통기한 +2일 및 효과 1.25배 증폭.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-026] 지역 거점점 계약
SOURCE: `dist/data/relics.js` (`rows[25]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 지역 거점점 계약
- 분류: 핵심 (keystone) / 태그: 상권 (customer)
- 기준가: 700G
- 설명:
  > 다음 날부터 방문객 +2명, 운영비 +35G. 활동 가능한 인원 내에서 방문.
RUNTIME_TRUTH: 일일 기본 방문객 +2명 및 운영비 35G 증가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-027] 후방 창고 증설
SOURCE: `dist/data/relics.js` (`rows[26]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 후방 창고 증설
- 분류: 편의 (utility)
- 기준가: 360G
- 설명:
  > 창고 용량 +10칸.
RUNTIME_TRUTH: 최대 창고 슬롯 +10칸 확장 (18 -> 28칸).
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-028] 본사 추가발주권
SOURCE: `dist/data/relics.js` (`rows[27]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 본사 추가발주권
- 분류: 편의 (utility)
- 기준가: 380G
- 설명:
  > 다음 발주 후보 생성부터 후보 +2개.
RUNTIME_TRUTH: 일일 발주 후보 수 +2개 확장 (기본 6 -> 8개).
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-029] 발주 교환권
SOURCE: `dist/data/relics.js` (`rows[28]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 발주 교환권
- 분류: 편의 (utility)
- 기준가: 340G
- 설명:
  > 매일 첫 발주 교환 무료. 이후 30G부터 교환 비용이 두 배씩 증가.
RUNTIME_TRUTH: 매일 첫 리롤 비용 0G 적용.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-030] 운영 효율 매뉴얼
SOURCE: `dist/data/relics.js` (`rows[29]`)
CONTEXT: 점포지원 선택 모달, 도감
CURRENT:
- 이름: 운영 효율 매뉴얼
- 분류: 편의 (utility)
- 기준가: 320G
- 설명:
  > 다음 날부터 기본 운영비 15G 절감.
RUNTIME_TRUTH: 일일 고정 운영비에서 15G 감면.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-031] 점포지원 테이크오버(모달) 텍스트
SOURCE: `dist/ui/app.js` (`relicTakeover`)
CONTEXT: 점포지원 마일스톤 화면
CURRENT:
- 모달 헤더/타이틀:
  > {DAY 0 / DAY N}
  > {첫 점포지원을 고른다 / 점포지원이 도착했다}
- 본문 상태 안내:
  > 하나는 무료다. 고르면 영업이 시작된다.
  > 점포지원 7개를 모두 들였다. 더 들일 자리가 없다.
  > {until} 구매할 수 있다 · 자금 {fmt(s.money)}G
- 후보 카드 버튼/라벨:
  > {fmt(price)}G / 무료 / 설치됨 / 구매
- 하단 푸터 및 닫기:
  > 하나를 골라야 영업이 시작된다.  [계약 다시 고르기]
  > 보류해도 후보와 가격은 그대로 남는다.  [나중에 결정]
- 비어 있을 때:
  > 지금 고를 지원이 없다
  > 다음 지원은 5일 단위 영업일에 도착한다.  [닫기]
RUNTIME_TRUTH: 점포지원 갱신 주기(D0, 5, 10, 15, 20, 25, 30) 및 7개 슬롯 제한 관리.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [REL-032] 보유 점포지원 목록 아코디언
SOURCE: `dist/ui/app.js` (`ownedRelicView`)
CONTEXT: 판매 화면 및 최종 원정 화면 하단 접이식 목록
CURRENT:
> 보유 점포지원 {owned.length}/7
> {r.name}  {r.description}
RUNTIME_TRUTH: 현재 런에서 획득한 점포지원 유물 목록 확인.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 8. TRAIT (특성 30종)

### [TRT-001] 용감함
SOURCE: `dist/data/catalog.js` (`traits[0]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 용감함
- 성향: 복합 (mixed)
- 효과: 공포 대응 +9, 탈출 보정 -6%p
RUNTIME_TRUTH: 공포에 잘 버티지만 위기 시 탈출 확률이 소폭 감소함.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-002] 겁쟁이
SOURCE: `dist/data/catalog.js` (`traits[1]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 겁쟁이
- 성향: 복합 (mixed)
- 효과: 투력 -3, 탈출 보정 +19%p, 전리품 -12%p
RUNTIME_TRUTH: 전투력과 파밍 골드가 감소하지만 생환/탈출 확률이 크게 상승함.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-003] 대식가
SOURCE: `dist/data/catalog.js` (`traits[2]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 대식가
- 성향: 복합 (mixed)
- 효과: 음식의 강인함 +30%, 음식 1개당 보급 -1
RUNTIME_TRUTH: 음식 아이템의 강인함 효과가 30% 증가하지만 음식의 보급 수치가 1 차감됨. (주의: 음식 구매 의사 증가는 소스에 구현되어 있지 않음)
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-004] 소식가
SOURCE: `dist/data/catalog.js` (`traits[3]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 소식가
- 성향: 복합 (mixed)
- 효과: 음식의 강인함 -20%, 음식 1개당 보급 +1
RUNTIME_TRUTH: 음식의 강인함이 20% 감소하지만 음식의 보급 수치가 1 추가됨.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-005] 신중함
SOURCE: `dist/data/catalog.js` (`traits[4]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 신중함
- 성향: 복합 (mixed)
- 효과: 부상 위험 -4%p, 전리품 -8%p
RUNTIME_TRUTH: 부상 확률을 낮추고 전리품 획득량이 소폭 감소함.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-006] 무모함
SOURCE: `dist/data/catalog.js` (`traits[5]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 무모함
- 성향: 복합 (mixed)
- 효과: 투력 +7, 탈출 보정 -8%p, 부상 위험 +3.5%p
RUNTIME_TRUTH: 투력이 크게 오르지만 탈출 확률이 깎이고 부상 위험이 증가함.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-007] 탐욕
SOURCE: `dist/data/catalog.js` (`traits[6]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 탐욕
- 성향: 복합 (mixed)
- 효과: 전리품 +30%p, 탈출 보정 -7%p
RUNTIME_TRUTH: 전리품 획득량이 30% 크게 증가하지만 탈출 보정이 감소함.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-008] 구두쇠
SOURCE: `dist/data/catalog.js` (`traits[7]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 구두쇠
- 성향: 부정적 (negative)
- 효과: 120G 초과 구매 의사 -16%p
- 설명/Note:
  > 비싼 상품일수록 구매를 망설입니다.
RUNTIME_TRUTH: 정가 120G 초과 상품 구매 의사 16%p 감소.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-009] 충동구매
SOURCE: `dist/data/catalog.js` (`traits[8]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 충동구매
- 성향: 긍정적 (positive)
- 효과: 구매 의사 +12%p
RUNTIME_TRUTH: 모든 상품 구매 의사 전반 12%p 증가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-010] 허세
SOURCE: `dist/data/catalog.js` (`traits[9]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 허세
- 성향: 복합 (mixed)
- 효과: 없음 (스탯 효과 없음)
- 설명/Note:
  > 게이트가 여럿이면 말한 목적지가 실제와 다를 수 있습니다. 실제 배정과 가격·상품 취향은 바뀌지 않습니다.
RUNTIME_TRUTH: 60% 확률로 더 높은 전투력의 게이트를 진술하지만 실제로는 배정된 게이트로 감.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-011] 천재
SOURCE: `dist/data/catalog.js` (`traits[10]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 천재
- 성향: 긍정적 (positive)
- 효과: 경험치 +25%
RUNTIME_TRUTH: 원정 경험치 획득량 25% 증가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-012] 강골
SOURCE: `dist/data/catalog.js` (`traits[11]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 강골
- 성향: 긍정적 (positive)
- 효과: 부상 방어 +23%p
RUNTIME_TRUTH: 부상 판정 경감 보정 23%p 제공.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-013] 허약함
SOURCE: `dist/data/catalog.js` (`traits[12]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 허약함
- 성향: 부정적 (negative)
- 효과: 강인함 -5, 중상 회복 기간 +1일
RUNTIME_TRUTH: 기본 강인함 -5 및 중상 시 회복일수 +1일.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-014] 포션체질
SOURCE: `dist/data/catalog.js` (`traits[13]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 포션체질
- 성향: 긍정적 (positive)
- 효과: 포션의 강인함 +30%
RUNTIME_TRUTH: 포션 아이템이 제공하는 강인함 수치 30% 증가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-015] 화염공포증
SOURCE: `dist/data/catalog.js` (`traits[14]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 화염공포증
- 성향: 부정적 (negative)
- 효과: 화염 대응 -9
RUNTIME_TRUTH: 화염 위험 대응 수치 -9 감소.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-016] 행운아
SOURCE: `dist/data/catalog.js` (`traits[15]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 행운아
- 성향: 긍정적 (positive)
- 효과: 행운 보정 +4.5%p, 전리품 +7%p
RUNTIME_TRUTH: 원정 내 돌발사고 판정 감소 및 전리품 증가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-017] 불운아
SOURCE: `dist/data/catalog.js` (`traits[16]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 불운아
- 성향: 부정적 (negative)
- 효과: 행운 보정 -4.5%p, 전리품 -7%p
- 설명/Note:
  > 숨은 전투 변동폭은 바뀌지 않습니다.
RUNTIME_TRUTH: 환경 사고 확률 증가 및 전리품 감소.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-018] 수집가
SOURCE: `dist/data/catalog.js` (`traits[17]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 수집가
- 성향: 복합 (mixed)
- 효과: 희귀 이상 구매 의사 +12%p, 일반·고급 구매 의사 -5%p
RUNTIME_TRUTH: 희귀도 2 이상 상품 구매 의사 증가, 0~1 상품 구매 의사 감소.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-019] 실속파
SOURCE: `dist/data/catalog.js` (`traits[18]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 실속파
- 성향: 복합 (mixed)
- 효과: 일반·고급 구매 의사 +10%p, 희귀 이상 구매 의사 -10%p
RUNTIME_TRUTH: 일반/고급 상품 구매 의사 증가, 희귀 이상 상품 구매 의사 감소.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-020] 사교적인
SOURCE: `dist/data/catalog.js` (`traits[19]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 사교적인
- 성향: 긍정적 (positive)
- 효과: 재방문 가중치 +25%
RUNTIME_TRUTH: 상점 재방문 추첨 가중치 1.25배.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-021] 낯가림
SOURCE: `dist/data/catalog.js` (`traits[20]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 낯가림
- 성향: 부정적 (negative)
- 효과: 구매 의사 -10%p
RUNTIME_TRUTH: 상점 구매 의사 상시 10%p 감소.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-022] 회복체질
SOURCE: `dist/data/catalog.js` (`traits[21]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 회복체질
- 성향: 긍정적 (positive)
- 효과: 중상 회복 기간 -1일
RUNTIME_TRUTH: 중상 발생 시 필요한 휴식일수 1일 단축.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-023] 지구력
SOURCE: `dist/data/catalog.js` (`traits[22]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 지구력
- 성향: 긍정적 (positive)
- 효과: 누적 피로 -1
RUNTIME_TRUTH: 원정 중 누적되는 피로도 1 감소.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-024] 쉽게 지침
SOURCE: `dist/data/catalog.js` (`traits[23]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 쉽게 지침
- 성향: 부정적 (negative)
- 효과: 누적 피로 +1
RUNTIME_TRUTH: 원정 중 누적 피로도 1 증가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-025] 눈썰미
SOURCE: `dist/data/catalog.js` (`traits[24]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 눈썰미
- 성향: 긍정적 (positive)
- 효과: 어둠 대응 +6, 화이트아웃 대응 +6
RUNTIME_TRUTH: 시야 방해 계열 위험 2종 대응치 상시 보너스.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-026] 해독가
SOURCE: `dist/data/catalog.js` (`traits[25]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 해독가
- 성향: 긍정적 (positive)
- 효과: 독 대응 +8
RUNTIME_TRUTH: 독 위험 대응 수치 상시 +8.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-027] 수족냉증
SOURCE: `dist/data/catalog.js` (`traits[26]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 수족냉증
- 성향: 부정적 (negative)
- 효과: 냉기 대응 -9
RUNTIME_TRUTH: 냉기 위험 대응 수치 -9 패널티.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-028] 준비성
SOURCE: `dist/data/catalog.js` (`traits[27]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 준비성
- 성향: 긍정적 (positive)
- 효과: 음식·음료 1개당 보급 +1
RUNTIME_TRUTH: 모든 음식/음료 소지 시 보급 수치 1 추가 부여.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-029] 악바리
SOURCE: `dist/data/catalog.js` (`traits[28]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 악바리
- 성향: 복합 (mixed)
- 효과: 부상 중 투력 +6, 누적 피로 +1
- 설명/Note:
  > 부상·중상 상태에서만 투력이 오릅니다.
RUNTIME_TRUTH: 부상/중상 상태일 때 투력 +6 보너스, 평소 피로 누적 +1.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [TRT-030] 냉담한
SOURCE: `dist/data/catalog.js` (`traits[29]`)
CONTEXT: 모험가 프로필, 수첩, 도감
CURRENT:
- 이름: 냉담한
- 성향: 복합 (mixed)
- 효과: 재방문 가중치 -20%, 냉기 대응 +6
RUNTIME_TRUTH: 재방문 확률이 20% 감소하지만 냉기 대응 +6 획득.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 9. NPC DIALOGUE (전체 풀 전수 추출)

### [DIA-001] 첫 방문 대사 풀 (First Visit)
SOURCE: `dist/data/copy.js` (`visit.first`)
CONTEXT: 해당 런에서 처음 상점을 방문한 신규 손님(introduced===false)이 카운터에 섰을 때
CURRENT:
1. > “여기가 길드24인가요?”
2. > “문 연 지 얼마 안 됐다면서요.”
3. > “게이트 앞에 가게가 있다길래.”
4. > “들어와도 되죠? 잠깐 볼게요.”
TYPE: STATE_HINT
RUNTIME_TRUTH: `n.newToday === true` 상태와 연결되어 신규 고객임을 나타냄.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-002] 재방문 일반 대사 풀 (Returning)
SOURCE: `dist/data/copy.js` (`visit.back`)
CONTEXT: 이전에 방문한 적이 있는 손님이 건강한 상태로 카운터에 섰을 때
CURRENT:
1. > “다시 왔어요.”
2. > “오늘도 열었네요.”
3. > “오는 길에 불 켜진 게 여기뿐이더라고요.”
4. > “빈손으로 가긴 좀 그래서요.”
TYPE: FLAVOR_ONLY
RUNTIME_TRUTH: 재방문 상태(`!n.newToday && !n.injury && n.loyalty < 60`) 기본 대사.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-003] 부상 중 방문 대사 풀 (Injured Visit)
SOURCE: `dist/data/copy.js` (`visit.hurt`)
CONTEXT: 부상 상태(injury > 0)로 생환해 온 손님이 카운터에 섰을 때
CURRENT:
1. > “아직 조금 욱신거리네요.”
2. > “괜찮아요. 걷는 데는 지장 없어요.”
3. > “이 정도면 나간 편이죠.”
4. > “오늘은 무리 안 할 거예요.”
TYPE: STATE_HINT
RUNTIME_TRUTH: `n.injury > 0` 상태를 언어적으로 암시함.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-004] 단골 방문 대사 풀 (Regular Visit)
SOURCE: `dist/data/copy.js` (`visit.regular`)
CONTEXT: 단골도 60 이상(loyalty >= 60)인 손님이 카운터에 섰을 때
CURRENT:
1. > “늘 보던 얼굴이네요.”
2. > “말 안 해도 아시죠?”
3. > “자리 그대로네요, 다행이다.”
4. > “오늘도 부탁 좀 할게요.”
5. > “늘 먹던 걸로 주세요.”
TYPE: STATE_HINT
RUNTIME_TRUTH: `n.loyalty >= 60` 상태를 나타냄. 단, 5번 "늘 먹던 걸로 주세요"는 이전 구매 상품을 자동 선택하는 런타임 기능은 없음.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-005] 보급 도움 콜백 대사 풀 (Helped Callback)
SOURCE: `dist/data/copy.js` (`visit.helped`)
CONTEXT: 직전 원정에서 보급품이 실제 사건/생환에 기여(`last.events.length > 0`)했고 6회 주기 방문일 때 최우선 출력
CURRENT:
1. > “지난번에 챙긴 거, 도움이 됐어요.”
2. > “저번 거 쓰고 나서 생각이 좀 바뀌었어요.”
3. > “그때 산 거, 값은 했습니다.”
TYPE: RESULT
RUNTIME_TRUTH: 실제 직전 원정 기록(`n.records.at(-1).events`)에서 보급 기여가 있었던 사실과 직접 연결됨.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-006] 특성 대사 풀 — 구두쇠 (Frugal)
SOURCE: `dist/data/copy.js` (`visit.trait.frugal`)
CONTEXT: 구두쇠 특성 모험가가 방문 시 1/3 확률로 출력
CURRENT:
1. > “더 싼 건 없어요?”
2. > “이거 행사 안 해요?”
3. > “지난번엔 이것보다 쌌는데.”
4. > “오늘은 싼 걸로 주세요.”
TYPE: PURCHASE_INTENT_HINT
RUNTIME_TRUTH: 구두쇠 특성은 120G 초과 고가 상품에 대해 구매 의사 -16%p 페널티를 가지므로 가격 민감도와 연결됨. 단, 3번 "지난번엔 이것보다 쌌는데"의 경우 과거 특정 상품의 판매가를 기억하는 런타임 데이터는 없음.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-007] 특성 대사 풀 — 실속파 (Thrifty)
SOURCE: `dist/data/copy.js` (`visit.trait.thrifty`)
CONTEXT: 실속파 특성 모험가가 방문 시 1/3 확률로 출력
CURRENT:
1. > “그램당으로 치면 이게 낫죠?”
2. > “싼 거 말고, 값하는 걸로요.”
3. > “이거 하나면 오늘은 되겠네요.”
TYPE: PURCHASE_INTENT_HINT
RUNTIME_TRUTH: 실속파 특성은 일반/고급 상품 구매 의사 +10%p, 희귀 이상 -10%p를 가짐.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-008] 특성 대사 풀 — 겁쟁이 (Coward)
SOURCE: `dist/data/copy.js` (`visit.trait.coward`)
CONTEXT: 겁쟁이 특성 모험가가 방문 시 1/3 확률로 출력
CURRENT:
1. > “귀환석 있습니까?”
2. > “이쪽, 위험한 데 맞죠?”
3. > “살아서 오면 또 들를게요.”
4. > “가까운 게이트는 없어요?”
TYPE: PURCHASE_INTENT_HINT
RUNTIME_TRUTH: 1번 "귀환석 있습니까?"의 경우, 겁쟁이 특성이 귀환석을 더 우선적으로 찾거나 귀환석 구매 의사를 높이는 런타임 규칙은 전혀 없음 (겁쟁이는 투력 -3, 탈출 +19%p, 전리품 -12%p만 보유).
ISSUE: MISLEADING_PURCHASE_INTENT
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-009] 특성 대사 풀 — 허세 (Showoff)
SOURCE: `dist/data/copy.js` (`visit.trait.showoff`)
CONTEXT: 허세 특성 모험가가 방문 시 1/3 확률로 출력
CURRENT:
1. > “오늘은 좀 깊게 들어가 볼까 해서요.”
2. > “제가 그쪽은 좀 압니다.”
3. > “어려운 데로 간다고 다들 말리던데요.”
TYPE: DESTINATION_HINT
RUNTIME_TRUTH: 허세 특성은 60% 확률로 더 위험한 게이트를 진술(claimedDestination)하는 런타임 로직과 밀접히 연결됨.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-010] 특성 대사 풀 — 대식가 (Eater)
SOURCE: `dist/data/copy.js` (`visit.trait.eater`)
CONTEXT: 대식가 특성 모험가가 방문 시 1/3 확률로 출력
CURRENT:
1. > “많이 든 걸로 주세요.”
2. > “이거 하나로 하루 되나요?”
3. > “먹을 게 제일 급해요.”
TYPE: PURCHASE_INTENT_HINT
RUNTIME_TRUTH: 3번 "먹을 게 제일 급해요" 및 1, 2번 대사는 식량류 구매를 강하게 암시하나, 대식가 특성은 원정 시 음식의 강인함 +30%/보급 -1 효과만 있을 뿐, 상점에서 음식 카테고리를 우선 구매하거나 음식에 대한 구매 의사를 높이는 런타임 규칙은 없음.
ISSUE: MISLEADING_PURCHASE_INTENT
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-011] 특성 대사 풀 — 탐욕 (Greed)
SOURCE: `dist/data/copy.js` (`visit.trait.greed`)
CONTEXT: 탐욕 특성 모험가가 방문 시 1/3 확률로 출력
CURRENT:
1. > “비싼 게 좋은 거 아닌가요?”
2. > “이왕이면 좋은 걸로 봅시다.”
3. > “돈은 나중에 벌면 되죠.”
TYPE: PURCHASE_INTENT_HINT
RUNTIME_TRUTH: 1, 2번 대사는 고가/고희귀도 상품 선호를 암시하지만, 탐욕(greed) 특성은 원정 시 전리품 +30%p, 탈출 -7%p만 가질 뿐 고가 상품 구매 의사 증가(rareBias)는 없음 (rareBias는 '수집가' 특성이 가짐).
ISSUE: MISLEADING_PURCHASE_INTENT
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-012] 특성 대사 풀 — 낯가림 (Shy)
SOURCE: `dist/data/copy.js` (`visit.trait.shy`)
CONTEXT: 낯가림 특성 모험가가 방문 시 1/3 확률로 출력
CURRENT:
1. > “…저, 이거 얼마예요?”
2. > “구경만 해도 되나요?”
3. > “아, 아니에요. 천천히 볼게요.”
TYPE: PURCHASE_INTENT_HINT
RUNTIME_TRUTH: 낯가림 특성의 상점 전반 구매 의사 -10%p(`buyBias: -0.10`) 패널티와 연결됨.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-013] 특성 대사 풀 — 사교적인 (Social)
SOURCE: `dist/data/copy.js` (`visit.trait.social`)
CONTEXT: 사교적인 특성 모험가가 방문 시 1/3 확률로 출력
CURRENT:
1. > “사장님, 요즘 어떠세요?”
2. > “앞에서 다들 여기 얘기하던데요.”
3. > “오늘 누구 왔다 갔어요?”
TYPE: FLAVOR_ONLY
RUNTIME_TRUTH: 재방문 가중치 1.25배 특성과 어울리는 친근한 대사.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-014] 특성 대사 풀 — 수집가 (Collector)
SOURCE: `dist/data/copy.js` (`visit.trait.collector`)
CONTEXT: 수집가 특성 모험가가 방문 시 1/3 확률로 출력
CURRENT:
1. > “새로 들어온 거 있어요?”
2. > “이런 건 잘 안 보이던데요.”
3. > “종류별로 하나씩은 있어야 하는데.”
TYPE: PURCHASE_INTENT_HINT
RUNTIME_TRUTH: 수집가 특성은 희귀 이상 구매 의사 +12%p, 일반/고급 -5%p와 연결됨. (1번의 '새로 들어온 것(신상품)' 감지 로직은 없음)
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-015] 특성 대사 풀 — 냉담한 (Aloof)
SOURCE: `dist/data/copy.js` (`visit.trait.aloof`)
CONTEXT: 냉담한 특성 모험가가 방문 시 1/3 확률로 출력
CURRENT:
1. > “필요한 것만 볼게요.”
2. > “설명은 됐어요.”
3. > “빨리 가야 해서요.”
TYPE: FLAVOR_ONLY
RUNTIME_TRUTH: 재방문 가중치 0.80배 패널티를 가진 캐릭터성 표현.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-016] 정가 구매 반응 대사 풀 (Sale: Full)
SOURCE: `dist/data/copy.js` (`sale.full`)
CONTEXT: 100% 정가 판매 성공 시 손님 말풍선
CURRENT:
1. > “이걸로 주세요.”
2. > “네, 담아 주세요.”
3. > “이 정도면 적당하네요.”
4. > “그럼 하나만.”
TYPE: RESULT
RUNTIME_TRUTH: 정가(100%) 거래 체결 피드백.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-017] 반값 할인 구매 반응 대사 풀 (Sale: Half)
SOURCE: `dist/data/copy.js` (`sale.half`)
CONTEXT: 50% 할인 판매 성공 시 손님 말풍선
CURRENT:
1. > “다녀와서 또 들를게요.”
2. > “이 가격이면 안 살 이유가 없죠.”
3. > “사장님 손해 아니에요?”
4. > “오늘은 운이 좋네요.”
TYPE: RESULT
RUNTIME_TRUTH: 50% 할인 거래 체결 및 높은 단골도(+6) 획득 피드백.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-018] 바가지 구매 반응 대사 풀 (Sale: Overcharge)
SOURCE: `dist/data/copy.js` (`sale.overcharge`)
CONTEXT: 150% 바가지 판매 성공 시 손님 말풍선
CURRENT:
1. > “가격이 좀 올랐네요.”
2. > “…뭐, 급하니까요.”
3. > “이번만입니다.”
4. > “원래 이 값이었나요?”
TYPE: RESULT
RUNTIME_TRUTH: 150% 바가지 거래 체결 및 단골도(-3) 하락 피드백.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-019] 구매 거절 — 가격 부담 대사 풀 (Refuse: Price)
SOURCE: `dist/data/copy.js` (`sale.refuse.price`)
CONTEXT: 바가지 또는 지갑 대비 가격 부담(burden > 0.7)으로 구매를 거절했을 때
CURRENT:
1. > “그 가격에는 못 사겠어요.”
2. > “그건 좀 부담스럽네요.”
3. > “다음에 여유 있을 때 살게요.”
4. > “조금만 더 싸면 좋을 텐데.”
TYPE: RESULT
RUNTIME_TRUTH: 가격 저항(`reason === 'price'`)에 따른 거절. 동일/상위 가격 조건이 당일 재제안 차단 목록에 등록됨.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-020] 구매 거절 — 필요도 부족 대사 풀 (Refuse: Need)
SOURCE: `dist/data/copy.js` (`sale.refuse.need`)
CONTEXT: 오늘 게이트에 맞지 않거나 필요도가 낮아(need < 0.5) 구매를 거절했을 때
CURRENT:
1. > “그건 오늘 필요 없어요.”
2. > “오늘 가는 데선 쓸 일이 없어서요.”
3. > “그건 딱히 안 급해요.”
4. > “그건 다음에 볼게요.”
TYPE: RESULT
RUNTIME_TRUTH: 던전 적합도 부족(`reason === 'need'`)에 따른 거절.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-021] 구매 거절 — 단순 변심 대사 풀 (Refuse: Choice)
SOURCE: `dist/data/copy.js` (`sale.refuse.choice`)
CONTEXT: 가격이나 필요도 외에 일반 난수 판정 실패로 구매를 거절했을 때
CURRENT:
1. > “이번엔 안 살게요.”
2. > “조금 더 생각해 볼게요.”
3. > “오늘은 여기까지 할게요.”
4. > “음… 아니요, 괜찮아요.”
TYPE: RESULT
RUNTIME_TRUTH: 일반 확률 거절(`reason === 'choice'`).
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-022] 밤 결과 — 거래 이력 있는 사망 (Death: Traded)
SOURCE: `dist/data/copy.js` (`night.deathTraded`)
CONTEXT: 오늘 또는 이전에 상점에서 구매한 이력이 있는 모험가가 사망했을 때
CURRENT:
1. > 마지막 영수증만 카운터에 남았다.
2. > 여기서 산 것들은 끝내 다 쓰이지 못했다.
3. > 거래는 이미 다 끝나 있었다.
TYPE: RESULT
RUNTIME_TRUTH: `report.outcome === '사망' && n.history.length > 0`과 결합된 서사 팩트.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-023] 밤 결과 — 원정 기록만 있는 사망 (Death: Known)
SOURCE: `dist/data/copy.js` (`night.deathKnown`)
CURRENT:
1. > 수첩에 남은 건 지난 원정 기록뿐이다.
2. > 다음 줄은 비어 있다.
3. > 이름 옆에 아무것도 적히지 않았다.
TYPE: RESULT
RUNTIME_TRUTH: 거래는 없었으나 과거 원정 기록이 있는 모험가의 사망.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-024] 밤 결과 — 첫 만남 사망 (Death: Stranger)
SOURCE: `dist/data/copy.js` (`night.deathStranger`)
CURRENT:
1. > 문을 열고 들어온 그날이 마지막이었다.
2. > 오늘은 돌아오지 않았다.
3. > 한 번 왔다 간 손님으로 남았다.
TYPE: RESULT
RUNTIME_TRUTH: 첫 방문 날 거래 없이 나갔다가 바로 사망한 모험가.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-025] 밤 결과 — 사망 방지 (Avoided Death)
SOURCE: `dist/data/copy.js` (`night.avoided`)
CURRENT:
1. > “사장님, 이거 없었으면 못 돌아왔어요.”
2. > “오늘은 진짜 아슬아슬했어요.”
3. > “그거 사길 잘했다는 생각만 했어요.”
TYPE: RESULT
RUNTIME_TRUTH: 귀환석이나 세계수 생환부적이 사망 판정을 막아냈을 때의 대사.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-026] 밤 결과 — 위기 탈출/생환 (Rescued)
SOURCE: `dist/data/copy.js` (`night.rescued`)
CURRENT:
1. > “챙겨 간 보급이 귀환을 도왔어요.”
2. > “가방에 있던 게 마지막에 일했어요.”
3. > “돌아오는 길은 사장님이 열어 준 셈이에요.”
TYPE: RESULT
RUNTIME_TRUTH: 탈출 보정 아이템이 발동하여 퇴각에 성공했을 때의 대사.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-027] 밤 결과 — 중상 (Severe Injury)
SOURCE: `dist/data/copy.js` (`night.severe`)
CURRENT:
1. > “며칠만 쉬고 올게요. 제 자리 남겨 둬요.”
2. > “당분간은 못 나갈 것 같아요.”
3. > “다음에 올 때는 멀쩡한 얼굴로 올게요.”
TYPE: STATE_HINT
RUNTIME_TRUTH: 중상으로 인해 수일간 휴식(recovery) 상태에 돌입함을 알림.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-028] 밤 결과 — 부상 (Injury)
SOURCE: `dist/data/copy.js` (`night.hurt`)
CURRENT:
1. > “좀 다쳤지만, 살아 돌아왔어요.”
2. > “이 정도는 다친 축에도 안 들어요.”
3. > “내일은 좀 쉬엄쉬엄 갈게요.”
4. > “생각보다 안쪽이 사납더라고요.”
TYPE: STATE_HINT
RUNTIME_TRUTH: 경미한 부상(injury: 1)을 입고 귀환함.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-029] 밤 결과 — 퇴각 (Retreat)
SOURCE: `dist/data/copy.js` (`night.retreat`)
CURRENT:
1. > “일단 살고 봐야죠. 내일 다시 올게요.”
2. > “오늘은 아니다 싶어서 돌아섰어요.”
3. > “무리했으면 큰일 날 뻔했어요.”
4. > “길만 보고 왔습니다.”
TYPE: RESULT
RUNTIME_TRUTH: 원정을 완수하지 못하고 중도 포기/탈출함.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-030] 밤 결과 — 성장 (Growth)
SOURCE: `dist/data/copy.js` (`night.grew`)
CURRENT:
1. > “조금은 익숙해진 것 같아요.”
2. > “지난번보다 손에 붙네요.”
3. > “이제 어디를 봐야 할지 알겠어요.”
TYPE: STATE_HINT
RUNTIME_TRUTH: 레벨 업 또는 스탯 상승, 승급이 일어남.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-031] 밤 결과 — 보급 활용 성공 (Supplied)
SOURCE: `dist/data/copy.js` (`night.supplied`)
CURRENT:
1. > “다녀왔습니다.”
2. > “오늘은 별일 없었어요.”
3. > “챙겨 간 건 잘 썼습니다.”
TYPE: RESULT
RUNTIME_TRUTH: 보급품을 챙겨가서 무사히 완수하고 소모함.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-032] 밤 결과 — 환경 사고 충격 (Shaken)
SOURCE: `dist/data/copy.js` (`night.shaken`)
CURRENT:
1. > “예상하지 못한 일이 있었어요. 잠깐 쉬어야겠어요.”
2. > “오늘은 운이 안 따랐네요.”
3. > “가는 길이 생각보다 사나웠어요.”
TYPE: RESULT
RUNTIME_TRUTH: 던전 환경 위험이나 돌발사고(accident)로 피해를 입었을 때.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [DIA-033] 밤 결과 — 무사 귀환 (Plain Return)
SOURCE: `dist/data/copy.js` (`night.plain`)
CURRENT:
1. > “오늘도 무사히요.”
2. > “내일도 열죠?”
3. > “별일 없었습니다.”
TYPE: FLAVOR_ONLY
RUNTIME_TRUTH: 특이사항 없이 일상적인 원정을 마치고 생환함.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 10. BOSS / FINAL

### [BOS-001] D5 — 길드 토벌 공고 헤더 및 버튼
SOURCE: `dist/data/copy.js` (`Copy.boss.d5`)
CONTEXT: DAY 5 아침 보스 첫 공개 팝업
CURRENT:
- 헤더:
  > 길드 토벌 공고
- 서브:
  > 이번 토벌 대상
- 확인 버튼:
  > 토벌 대상 확인
RUNTIME_TRUTH: 런 시작 시 추첨된 보스의 정체(아이덴티티)가 처음 공개되는 시점.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [BOS-002] D5 — 보스 7종 정체 암시 플레이버
SOURCE: `dist/data/copy.js` (`Copy.boss.d5.flavor`)
CONTEXT: D5 보스 공개 팝업 본문
CURRENT:
1. 분노의 마왕 래스 (WRATH):
   > 공성추도 없이 성문이 안쪽으로 무너졌다.
2. 오만의 마왕 프라이드 (PRIDE):
   > 검은 갑주에는 아직 흠집 하나 남지 않았다.
3. 질투의 마왕 엔비 (ENVY):
   > 승전 보고서마다 가장 빛나던 이름 하나가 붉게 지워져 있었다.
4. 탐욕의 마왕 그리드 (GREED):
   > 금고가 빈 마을일수록, 놈의 군세는 이상할 만큼 강했다.
5. 폭식의 마왕 글러트니 (GLUTTONY):
   > 최정예 토벌대의 보급품만 유난히 처참한 꼴로 발견됐다.
6. 색욕의 마왕 러스트 (LUST):
   > 오래 손발을 맞춘 자들만 서로의 이름을 잊지 않았다고 한다.
7. 나태의 마왕 슬로스 (SLOTH):
   > 놈은 움직이지 않았다. 몸을 얽은 봉인만이 낮게 울리고 있었다.
RUNTIME_TRUTH: 보스의 기믹을 문학적으로 암시하되 수치나 정확한 룰은 숨김.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [BOS-003] D15 — 길드 정보 보고 인트로 및 버튼
SOURCE: `dist/data/copy.js` (`Copy.boss.d15`)
CONTEXT: DAY 15 아침 보스 기믹 공개 팝업
CURRENT:
- 인트로:
  > 길드 정보원이 추가 정보를 확보했다.
- 확인 버튼:
  > 정보 확인
RUNTIME_TRUTH: 보스의 고유 기믹(특성 규칙)이 완전 공개되는 시점.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [BOS-004] D15 — 보스 7종 특성 및 상세 규칙 설명
SOURCE: `dist/data/copy.js` (`Copy.boss.d15.trait`)
CONTEXT: D15 보스 정보 보고 팝업 본문
CURRENT:
1. 분노의 마왕 래스:
   > 특성 — 특수 효과 없음
   > 별도의 변칙은 확인되지 않았다.
   > 래스는 순수한 전력으로 맞선다.
2. 오만의 마왕 프라이드:
   > 특성 — 오만의 갑주
   > 최종전에서 모든 출전자의 투력이 감소한다.
   > 강인함·기동·정신은 그대로 적용된다.
3. 질투의 마왕 엔비:
   > 특성 — 질투의 시선
   > 최종전에서 가장 크게 기여하는 모험가 한 명이 표적이 된다.
   > 표적의 투력·강인함·기동·정신은 최종전 동안 감소한다.
4. 탐욕의 마왕 그리드:
   > 특성 — 탐욕의 장부
   > 최종전까지 누적 총매출이 목표에 미달하면, 부족한 만큼 그리드가 강해진다.
   > 강화에는 한도가 있으며, 목표를 넘겨도 추가 이득은 없다.
5. 폭식의 마왕 글러트니:
   > 특성 — 폭식의 권능
   > 최종전에서 [등급] 이상 보급품의 능력치 증가 효과가 감소한다.
   > 대응·보급·보험·기타 특수 효과는 그대로 적용된다.
6. 색욕의 마왕 러스트:
   > 특성 — 매혹의 권능
   > 단골이 아닌 출전자는 최종전에서 투력·강인함·기동·정신이 모두 감소한다.
   > 단골은 영향을 받지 않는다.
7. 나태의 마왕 슬로스:
   > 특성 — 나태의 봉인
   > 슬로스에게는 세 개의 봉인이 남아 있다.
   > 15일·20일·25일 중 두 차례와 30일에, 유물을 받는 대신 봉인 하나를 풀 수 있다.
   > 봉인을 풀면 그때의 유물은 받을 수 없으며, 풀린 봉인이 많을수록 슬로스가 약해진다.
RUNTIME_TRUTH: 최종 원정 시 실제로 적용되는 각 보스 고유 기믹 룰 전문.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [BOS-005] D30 — 최종 정찰 보고
SOURCE: `dist/data/copy.js` (`Copy.boss.d30`), `dist/ui/app.js` (`bossReveal`)
CONTEXT: DAY 30 마왕성 원정 전 게이트 공개 팝업
CURRENT:
- 헤더:
  > 최종 정찰 보고
- 인트로:
  > 마왕군의 최종 전장이 확인됐다.
- 확인 버튼:
  > 최종 준비
- 본문: 선택된 2개 던전 패밀리 이름 및 각 패밀리의 T2 Hazard 목록 노출
RUNTIME_TRUTH: 최종 원정(마왕성) 무대에 결합된 2개 던전 패밀리와 위험 팩트 공개.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [BOS-006] DAY 30 최종 원정 화면 구성
SOURCE: `dist/ui/app.js` (`finalScreen`)
CONTEXT: DAY 30 메인 화면
CURRENT:
- 보스 명판:
  > 제 0 게이트 · 마왕성
  > {b.name}
- 위협 섹션:
  > 확인된 위협
  > {familyNames}
  > {hazardList}
- 원정대 섹션:
  > 원정대  {s.team.length} / {need}
- 보급 대상 지정:
  > {n.name} (클릭하여 보급 대상 선택)
- 보급품 버튼:
  > {n.name}에게 보급
- 하단 발주 아코디언:
  > 마지막 발주 · 상품과 점포지원 사이의 선택
- 독 버튼:
  > 마왕성으로 출발 [또는 출전 불가 · 런 종료]
RUNTIME_TRUTH: 30일간 모험가 육성의 결실을 최종 원정대로 편성하고 마지막 보급을 완료하여 결전에 돌입하는 화면.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [BOS-007] 마왕성 출발 최종 확인 모달
SOURCE: `dist/ui/app.js` (`renderModal`)
CONTEXT: '마왕성으로 출발' 버튼 클릭 시
CURRENT:
> 제0게이트 — 마지막 출발
> 선택한 원정대가 마왕성으로 출발합니다. 남은 슬롯과 보급을 확인하셨나요?
> 보급으로 돌아가기
> 최종 원정 시작
RUNTIME_TRUTH: 최종 원정 돌입 전 확인 팝업. 확인 시 되돌릴 수 없이 판정됨.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [BOS-008] 최종 원정 결과 헤드라인 및 이유
SOURCE: `dist/ui/app.js` (`endHeadline`), `dist/systems/run.js` (`end`)
CONTEXT: 영업 종료 영수증 상단 헤드라인 및 이유
CURRENT:
- 클리어 시:
  > 제 0 게이트 폐쇄 · {s.branch}
  > 마왕이 쓰러졌다.
  > 우리 점포에서 떠난 원정대가 해냈다.
- 토벌 실패 시:
  > 영업 종료 · {s.branch}
  > 마왕을 토벌하지 못했다.
  > 이 점포에서 할 수 있는 일은 여기까지였다.
- 출전 인원 전멸/부재 시:
  > 출전할 수 있는 모험가가 없어 마왕성 원정을 시작하지 못했습니다.
RUNTIME_TRUTH: 런 승리/패배 확정 텍스트.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [BOS-009] 마왕성 참전자 회고 명단
SOURCE: `dist/ui/app.js` (`sentOff`)
CONTEXT: 게임 종료 화면 하단 출전 모험가 카드
CURRENT:
> {제 0 게이트를 닫고 온 사람들 / 마왕성으로 보낸 사람들}
> {m.name}  Lv.{m.level} {job}
> 마지막 보급 · {items.join(' · ')} [또는 빈손으로 갔다]
RUNTIME_TRUTH: 최종 원정에 함께한 1~3명의 모험가와 그들이 챙겨간 보급품 회고.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 11. META / CODEX

### [MET-001] 도감 헤더 — 가맹등급 및 전역 실적
SOURCE: `dist/ui/app.js` (`codex`)
CONTEXT: 메뉴 -> '도감' 모달 최상단
CURRENT:
> 본사 {GRADE_COPY[grade].label}
> {GRADE_COPY[grade].flavor}
> 직업 숙련 {totalJobMastery} / 42 · 서로 다른 마왕 토벌 {distinctBossClear} / 7
> {a.runs}회 영업 · {a.wins}회 마왕 토벌
RUNTIME_TRUTH: 영구 메타 계정의 현재 등급, 숙련도 총합(최대 42), 보스 토벌 수(최대 7), 런 통계.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [MET-002] 가맹등급 6단계 라벨 및 플레이버
SOURCE: `dist/ui/app.js` (`GRADE_COPY`)
CONTEXT: 도감 상단 가맹등급 설명
CURRENT:
1. 가맹등급 1:
   > 이제 막 간판을 올렸습니다.
2. 가맹등급 2:
   > 다시 찾아오는 손님이 하나둘 생겼습니다.
3. 가맹등급 3:
   > 모험가들 사이에서 가게 이름이 오르내립니다.
4. 가맹등급 4:
   > 원정을 앞두고 일부러 들르는 모험가가 늘었습니다.
5. 가맹등급 5:
   > 멀리서도 이 가게를 찾아오는 모험가가 생겼습니다.
6. 가맹등급 6 - 전설의 편의점:
   > 모든 길은 결국 이 편의점 앞을 지납니다.
RUNTIME_TRUTH: 직업 숙련도 7점마다 1단계씩 상승 (최대 6단계).
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [MET-003] 발견 수첩 접힘 아코디언
SOURCE: `dist/ui/app.js` (`codex`)
CONTEXT: 도감 헤더 하단 발견 수첩
CURRENT:
> 발견 수첩 · {count}개
> {discoveryLine}
또는 (기록 없을 때)
> 아직 기록된 발견이 없다.
RUNTIME_TRUTH: 런 중 모험가가 겪은 특이 사건 및 생환 기록이 영구 아카이빙됨.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [MET-004] 도감 탭 6종 버튼
SOURCE: `dist/ui/app.js` (`codex`)
CONTEXT: 도감 내비게이션 탭 바
CURRENT:
> 진행도
> 상품 30
> 직업 6
> 점포지원 30
> 몬스터 지식
> 시작 계약
RUNTIME_TRUTH: 도감 서브 카테고리 탭.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [MET-005] 직업 × 보스 마스터리 매트릭스 표
SOURCE: `dist/ui/app.js` (`progressPanel`)
CONTEXT: 도감 -> '진행도' 탭 상단
CURRENT:
- 테이블 헤더:
  > 직업 | 분노 | 오만 | 질투 | 탐욕 | 폭식 | 색욕 | 나태 | 숙련
- 직업 행 (6종):
  > 전사, 궁수, 마법사, 사제, 도적, 광전사
- 완료 여부:
  > ● (토벌) / · (미토벌)
- 우측 합계:
  > {jobMastery} / 7
RUNTIME_TRUTH: 직업별 7개 보스 토벌 매트릭스(6×7=42).
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [MET-006] 해금 보드 (Unlock Board)
SOURCE: `dist/ui/app.js` (`unlockBoard`)
CONTEXT: 도감 -> '진행도' 탭 하단
CURRENT:
- 해금 완료:
  > <h4>해금 완료</h4>
  > {name}  {need}
  또는
  > 아직 본사에서 내려온 것이 없다.
- 다음 해금:
  > <h4>다음 해금</h4>
  > {name}  {need} · {have} / {want}
  또는
  > 본사가 내줄 것은 다 내줬다. 남은 것은 아직 잡지 못한 마왕뿐이다.
RUNTIME_TRUTH: 보스 토벌 수 및 가맹등급에 따른 직업/아이템/계약 해금 현황 표시.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [MET-007] 몬스터 지식 탭
SOURCE: `dist/ui/app.js` (`codex`)
CONTEXT: 도감 -> '몬스터 지식' 탭
CURRENT:
> {d.monster / ???}
> {d.name} · 보급 생환 {seen}회
> {hazards / 위험 특성 ???}
> {약점: d.weakness / 약점 ???}
RUNTIME_TRUTH: 해당 던전에 보급품을 지참하고 생환한 횟수에 따라 1회(몬스터명), 3회(위험), 5회(약점) 순차 해금.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [MET-008] 도감 항목 잠김 및 진행도 상태 문구
SOURCE: `dist/ui/app.js` (`unlockProgress`)
CONTEXT: 도감 내 각 잠긴 아이템/직업/계약 하단
CURRENT:
> 해금 완료
> 서로 다른 마왕 토벌 {have}/{want}
> 가맹등급 {grade} 필요
> 기본 제공
RUNTIME_TRUTH: 메타 해금 진행 상태를 직관적으로 전달.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [MET-009] 직업 6종 명칭 및 랭크 체계
SOURCE: `dist/data/catalog.js` (`jobs`)
CONTEXT: 직업 도감, 모험가 프로필
CURRENT:
1. 전사: 수습 전사 → 전사 → 기사 → 왕립 수호자
2. 궁수: 견습 궁수 → 궁수 → 명사수 → 바람 추적자
3. 마법사: 견습 마법사 → 마법사 → 마도사 → 대마법사 후보
4. 사제: 수습 사제 → 사제 → 주교 → 빛의 대행자
5. 도적 (마왕 3종 토벌 해금): 풋내기 도적 → 도적 → 그림자 → 밤의 유령
6. 광전사 (마왕 6종 토벌 해금): 투사 → 광전사 → 혈전사 → 전장의 재앙
RUNTIME_TRUTH: 직업 6종과 5레벨 단위(Lv.1, 5, 10, 15) 승급 명칭.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 12. MENU / SETTINGS

### [SET-001] 점포 메뉴 모달
SOURCE: `dist/ui/app.js` (`renderModal`)
CONTEXT: 우측 상단 핀 버튼 클릭 시
CURRENT:
- 타이틀:
  > 점포 메뉴
- 버튼 목록:
  > 모험가 수첩
  > 도감
  > 점포지원 (보유 유물 있을 때)
  > 점주 가이드
  > 설정 · 저장
  > 소리 켜기 / 끄기
  > 현재 지점 포기 (런 진행 중일 때)
  > 모든 게임 데이터 초기화
RUNTIME_TRUTH: 메인 시스템 내비게이션 메뉴.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SET-002] 모험가 수첩 — 헤더 및 한도 경고
SOURCE: `dist/ui/app.js` (`rosterList`)
CONTEXT: 메뉴 -> '모험가 수첩' 상단
CURRENT:
> 돌아오지 못한 사람 {lost} / 10
> 10명에 이르면 소문이 퍼져 이 점포의 영업이 끝난다.
> 이름을 누르면 마지막 보급과 원정 기록을 볼 수 있다. 사망한 모험가의 기록도 남는다.
또는 (런 시작 전)
> 첫 영업을 시작하면 모험가 수첩이 열린다.
RUNTIME_TRUTH: 누적 사망자 수가 10명에 도달하면 즉시 패배 폐점됨을 경고.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SET-003] 모험가 상세 — 잠재력 및 안내
SOURCE: `dist/ui/app.js` (`npcDetail`)
CONTEXT: 모험가 클릭 시 열리는 상세 뷰
CURRENT:
> 성장 잠재력: {빠른 성장 / 꾸준한 성장 / 착실한 성장}
또는 (단골도 51 미만일 때)
> 더 친해지면 성장 잠재력과 남은 특성을 알 수 있습니다.
- 원정 기록 헤더:
  > 원정 기록
  > DAY {day} · {dungeonName} · {outcome}
  > {items} / 보급 없음
  > [원정 기록이 없다면] 아직 원정 기록이 없다.
- 구매 영수증 헤더:
  > 구매 영수증
  > DAY {day} · {itemName} · {mode} {paid}G
RUNTIME_TRUTH: 단골도 51 이상(단골) 달성 시 잠재력 수치 구간 공개. 모험가의 과거 원정 및 구매 이력 표시.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SET-004] 창고 재고 모달
SOURCE: `dist/ui/app.js` (`stockModal`)
CONTEXT: 창고 클릭 또는 적자 마감 시
CURRENT:
- 상단 설명:
  > 유통기한은 입고일부터 계산합니다. 재고 정리는 <b>운영비가 모자란 마감</b>에만 할 수 있고, 그 재고를 사들인 값의 50%를 회수합니다. 잔고가 0 이상이 되면 그 자리에서 끝납니다. 한 영업에서 3번까지, 지금까지 {s.rescueUsed}번 썼습니다.
- 항목별 정리 버튼:
  > 1개 정리 +{price}G
- 비어 있을 때:
  > 창고가 비어 있습니다.
RUNTIME_TRUTH: 비상 회생(재고 정리)의 구체적 규칙과 잔여 횟수 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SET-005] 영업 설정 모달
SOURCE: `dist/ui/app.js` (`settings`)
CONTEXT: 메뉴 -> '설정 · 저장'
CURRENT:
- 저장 안내:
  > 자동저장은 현재 브라우저에 보관됩니다. 다른 기기로 옮길 때 저장 파일을 내보내세요.
- 버튼:
  > 저장 내보내기
  > 저장 가져오기
  > 소리 켜기 / 소리 끄기
- 믹서 컨트롤:
  > 소리 크기
  > 배경음 {n}%
  > 효과음 {n}%
- 시간 및 사운드 안내:
  > 게임의 시간은 행동할 때만 흐릅니다. 소리는 처음에 꺼져 있습니다.
- 파괴적 액션:
  > 현재 지점 포기
  > 모든 게임 데이터 초기화
- 버전/로컬 표기:
  > <small>버전 0.4 · 로컬 실행 지원 · 외부 연결 없음</small>
RUNTIME_TRUTH: 설정 및 저장 관리 기능 전반.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SET-006] 확인 팝업 1 — 폐점 확인
SOURCE: `dist/ui/app.js` (`renderModal`)
CONTEXT: 적자 마감에서 '폐점' 버튼 클릭 시
CURRENT:
> 이번 영업을 마감할까요?
> 이 지점의 자금과 모험가는 다음 점포로 이어지지 않습니다.
> 계속 영업
> 폐점
RUNTIME_TRUTH: 현재 런을 파산으로 공식 종료 처리.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SET-007] 확인 팝업 2 — 모든 게임 데이터 초기화 확인
SOURCE: `dist/ui/app.js` (`renderModal`)
CONTEXT: '모든 게임 데이터 초기화' 클릭 시
CURRENT:
> 모든 게임 데이터 초기화
> 이 브라우저에 보관된 GUILD24 저장을 전부 지웁니다. 현재 영업, 모험가, 재고, 자금, 점포지원과 함께 직업 숙련 · 마왕 토벌 기록 · 가맹등급 · 몬스터 지식 · 해금과 점주 가이드 진행까지 남지 않습니다.
> 되돌릴 수 없습니다. 남기고 싶다면 먼저 저장을 내보내 주세요.
> 저장 내보내기
> 취소
> 전부 지우기
RUNTIME_TRUTH: 브라우저 저장소 전면 초기화(hard reset) 확인 다이얼로그.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [SET-008] 확인 팝업 3 — 저장 파일 가져오기 확인
SOURCE: `dist/ui/app.js` (`renderModal`)
CONTEXT: '저장 가져오기' 클릭 시
CURRENT:
> 저장 파일 가져오기
> 현재 브라우저의 진행을 가져온 저장으로 교체합니다. 기존 진행을 남기려면 먼저 내보내 주세요.
> 저장 내보내기
> 파일 선택
RUNTIME_TRUTH: 세이브 덮어쓰기 전 백업 권장 안내.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

---

## 13. OTHER PLAYER-FACING COPY

### [OTH-001] 던전 5종 상세 정보
SOURCE: `dist/data/catalog.js` (`dungeons`)
CONTEXT: 아침 게이트 판자, 몬스터 지식, 도감
CURRENT:
1. 독거미 동굴:
   - 보스: 독거미 여왕
   - 약점: 화염
   - 기본 위험: 독, 속박
2. 화염 골렘 광산:
   - 보스: 화염 골렘
   - 약점: 강한 전투력
   - 기본 위험: 화염
3. 망자역 지하묘지:
   - 보스: 망자역 차장
   - 약점: 정신과 시야 확보
   - 기본 위험: 공포, 어둠
4. 북부 설원 폐허:
   - 보스: 서리 거인
   - 약점: 강인함과 정신
   - 기본 위험: 냉기, 화이트아웃
5. 슬라임 하수도:
   - 보스: 산성 슬라임
   - 약점: 강인함과 기동
   - 기본 위험: 부식, 진창
RUNTIME_TRUTH: 5대 일반 던전의 기본 설정 데이터.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [OTH-002] 던전 위험(Hazard) 9종 명칭 및 압박 설명
SOURCE: `dist/data/catalog.js` (`hazards`), `dist/ui/presentation.js` (`hazardPressure`)
CONTEXT: 게이트 명판, 원정 전망, 보스 전장 요약
CURRENT:
1. 독 — 강인함 압박
2. 속박 — 기동 압박
3. 부식 — 강인함 압박
4. 진창 — 기동 압박
5. 화염 — 강인함 압박
6. 공포 — 정신 압박
7. 어둠 — 정신 중심 + 기동 보조 압박
8. 냉기 — 강인함 압박
9. 화이트아웃 — 정신 중심 + 기동 보조 압박
RUNTIME_TRUTH: 9개 위험이 모험가의 어떤 스탯을 압박하는지 명시.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [OTH-003] 일일 사건(Event) 22종 전문
SOURCE: `dist/data/catalog.js` (`events`)
CONTEXT: 아침 공고판, 사건 모달
CURRENT:
1. 물류대란:
   - 상황: 길이 막혔다. 물건은 왔다. 평소보다 비쌀 뿐이다.
   - 효과: 오늘 매입가 +15%
2. 본사 1+1 행사:
   - 상황: 본사에서 행사 공문이 내려왔다.
   - 효과: 지정 상품 1종 · 발주 수량 2배
3. 게이트 순례주간:
   - 상황: 순례 행렬이 게이트 구역을 지나간다.
   - 효과: 오늘 1~3명의 모험가가 예정된 목적지가 아닌 다른 열린 게이트로 향할 수 있습니다.
4. 몬스터 범람:
   - 상황: 게이트 밖까지 소리가 들린다.
   - 효과: 오늘 게이트 요구 전력 +12% · 원정 보상 +30%
5. 마석 가격 폭등:
   - 상황: 마석 값이 또 올랐다.
   - 효과: 오늘 특수 상품 매입가 +35%
6. 한파:
   - 상황: 북쪽 바람이 게이트 구역까지 내려왔다.
   - 효과: 적용 가능한 게이트에 냉기 위험 추가
7. 포션 공급 중단:
   - 상황: 포션 상자가 오지 않았다.
   - 효과: 오늘 포션 발주 등장 확률 크게 감소
8. 신입 모험가 시즌:
   - 상황: 길드 게시판에 새 이름이 늘었다.
   - 효과: 오늘 새로운 모험가 1명이 찾아옵니다.
9. 왕립 기사단 방문:
   - 상황: 왕립 기사단 마차가 멈췄다.
   - 효과: 오늘 고레벨 · 희귀 신규 모험가 합류 기회
10. 암시장 상인:
    - 상황: 정문으로 들어온 사람은 아니다.
    - 효과: 오늘 희귀 이상 특별 발주 1건 · 매입가 +35%
11. 본사 재고 감사:
    - 상황: 본사에서 장부를 보러 왔다.
    - 효과: 누적 폐기 6건부터 1건당 5G 감사 비용 · 최대 100G
12. 왕도 축제:
    - 상황: 왕도 축제가 시작됐다.
    - 효과: 오늘 음식 · 음료 구매 의사 +20%p
13. 길드 파업:
    - 상황: 길드 정문에 현수막이 걸렸다.
    - 효과: 오늘 방문객 -1
14. 미확인 게이트:
    - 상황: 지도에 없던 문이 열렸다.
    - 효과: 오늘 고위험 · 고보상 임시 게이트 1개 추가
15. 본사 반값 행사:
    - 상황: 오늘 반값은 본사가 한 번 낸다.
    - 효과: 오늘 첫 50% 판매 · 본사 지원 +50G
16. 독안개:
    - 상황: 게이트 주변에 누런 안개가 깔렸다.
    - 효과: 적용 가능한 게이트에 독 위험 추가
17. 보급 상단 도착:
    - 상황: 보급 상단이 하루 일찍 도착했다.
    - 효과: 오늘 발주 후보 +2
18. 길드 급여일:
    - 상황: 오늘은 길드 급여일이다.
    - 효과: 오늘 방문 모험가 구매 예산 +20%
19. 치유소 휴무:
    - 상황: 치유소 앞에 휴무 팻말이 붙었다.
    - 효과: 오늘 의료 상품 구매 의사 +20%p
20. 본사 폐기 지원:
    - 상황: 오늘 폐기비는 본사 부담이다.
    - 효과: 오늘 폐기 비용 0G
21. 늙은 음유시인:
    - 상황: 늙은 음유시인이 가게 앞에 자리를 잡았다.\n“너 누구야?”\n잠시 뒤,\n“후 알 유?”\n구경하던 모험가들이 하나둘 모여들었다.
    - 효과: 오늘 방문객 +2
22. 본사 야간 근무 수칙:
    - 상황: 1. 마감 전 창고를 확인한다.\n2. 폐기 상품은 따로 둔다.\n3. 뒷문은 잠근다.\n5. 새벽 두 시 이후에는 창밖을 보지 않는다.\n4번 규정은 없습니다.
    - 효과: 오늘 점포 유지비 0G
RUNTIME_TRUTH: 22종 일일 랜덤 사건의 상황(reveal) 및 룰 설명(description).
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [OTH-004] 브랜드 / 슬로건 / 지점명
SOURCE: `dist/data/catalog.js` (`DATA.brand`)
CONTEXT: 상점 간판, 영수증, 발주서
CURRENT:
- 브랜드명: GUILD24 / 길드24 / 길드리테일
- 슬로건: 던전 가기 전, 길드24.
- 지점명 풀: 제7게이트점, 독거미점, 북부게이트점, 왕도외곽점
RUNTIME_TRUTH: 게임 세계관 편의점 프랜차이즈 브랜드명.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [OTH-005] 장비 티어 및 기본 장비 명칭
SOURCE: `dist/systems/adventurer.js` (`create`), `dist/systems/dungeon.js` (`resolve`)
CONTEXT: 모험가 프로필 장비 항목
CURRENT:
- 기본 지급 장비:
  > 길드 지급 검 / 활 / 지팡이 / 성서 / 단검 / 도끼
- 승급 장비 수식어:
  > 보강된 / 은빛 / 마력 깃든 / 고대의 / 영웅의  {직업명} 장비
RUNTIME_TRUTH: 런 진행 중 모험가 장비 강화 시 완성되는 장비 명칭.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [OTH-006] 메타 HTML 카피 및 noscript
SOURCE: `dist/index.html`
CONTEXT: 브라우저 탭 타이틀, 검색/공유 메타 설명, 자바스크립트 미지원 환경
CURRENT:
- 타이틀:
  > 던전 앞 편의점 · GUILD24
- 메타 설명:
  > RPG 세계를 편의점 카운터 뒤에서 플레이한다. 발주하고, 보급하고, 단골을 키우는 30일 경영 로그라이트.
- Noscript:
  > 이 게임을 플레이하려면 JavaScript를 켜 주세요. 인터넷 연결은 필요하지 않습니다.
RUNTIME_TRUTH: 웹 애플리케이션 진입점 메타데이터.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [OTH-007] SVG 내장 텍스트 및 인라인 간판
SOURCE: `dist/ui/scene.js`, `dist/ui/art.js`
CONTEXT: 픽셀 아트 배경 그래픽 내부 텍스트
CURRENT:
1. `scene.js:37`: `1+1` (행사 현수막)
2. `scene.js:40`: `GUILD24 PB` (PB 상품 매대 간판)
3. `scene.js:87`: `G24` (기업 실링 인장)
4. `art.js:26`: `1+1` (황금 쿠폰 아이콘 내부)
5. `art.js:75`: `GUILD24`, `던전 가기 전, 길드24.` (매장 파사드)
6. `art.js:80`: `길드 원정 안내`, `{dungeon.short}` (게시판)
7. `art.js:85`: `G24` (카운터 포스기 마크)
8. `art.js:89`: `CLOSED · SEE YOU TOMORROW` / `OPEN · ADVENTURERS WELCOME` (야간/주간 셔터)
RUNTIME_TRUTH: 매장 배경 도트 아트 내 텍스트.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]

### [OTH-008] 접근성 레이블 (Aria-Label) 전수 목록
SOURCE: `dist/ui/app.js`, `dist/ui/art.js`
CONTEXT: 스크린 리더 및 접근성 도구용 레이블
CURRENT:
1. `aria-label="게임 메뉴"` (`app.js:37`)
2. `aria-label="보유 자금 {money}G"` (`app.js:215`)
3. `aria-label="전투 전망 설명"` (`app.js:276`)
4. `aria-label="환경 전망 설명"` (`app.js:278`)
5. `aria-label="지난 방문 이후"` (`app.js:287`)
6. `aria-label="계산대 앞"` (`app.js:311`)
7. `aria-label="대기 손님 {waiting}명"` (`app.js:334`)
8. `aria-label="{n.name} Lv.{level} {job} 기록 보기"` (`app.js:352`)
9. `aria-label="보급 {pack.length} / {slots}칸"` (`app.js:369`)
10. `aria-label="귀환 {at+1} / {total}"` (`app.js:379`)
11. `aria-label="점주 안내"` (`app.js:498`)
12. `aria-label="발주 자금"` (`app.js:542`)
13. `aria-label="{it.name} 수량 줄이기"` (`app.js:564`)
14. `aria-label="{it.name} 발주 수량"` (`app.js:565`)
15. `aria-label="{it.name} 수량 늘리기"` (`app.js:566`)
16. `aria-label="{it.name} {v}개"` (`app.js:567`)
17. `aria-label="{pct}% {price}G [· 차단사유]"` (`app.js:594`)
18. `aria-label="점포지원"` (`app.js:615, 618`)
19. `aria-label="{b.name} 토벌 / 미토벌"` (`app.js:779`)
20. `aria-label="소리 크기"` (`app.js:808`)
21. `aria-label="창 닫기"` (`app.js:876`)
22. `aria-label="{n.name} {job.name}"` (`art.js:11`)
23. `aria-label="{it.name}"` (`art.js:53`)
24. `aria-label="길드24 매장 내부. 계산대, 손님, 상품 매대, 냉장고와 설치한 설비."` (`art.js:90`)
RUNTIME_TRUTH: 접근성 표준 준수를 위한 ARIA 속성 텍스트.
ISSUE: NONE
REVIEW: [ ]
REPLACEMENT: [ ]
