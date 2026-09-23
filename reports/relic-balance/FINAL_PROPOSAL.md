# Store Support rebalance — User-approved final proposal (2026-09-23)

Goal: raise overall Store Support impact (prices down, weak supports up, reworks / remakes), keep
high performers, create synergy through the effects themselves (no formal set bonus: build "tags"
are internal names only), and keep a financially tight but high-win Fresh build.
Relic ids are kept for remakes (save compatibility); only name / price / effect change.
단골 = loyalty >= 51 (`TRUSTED_REGULAR`). Player-facing Hazard term in support copy: `위험`.

## Game-wide loyalty (SALE / NPC_TRAIT change)
- visiting without buying: +1 -> **0**
- survival: +2 -> **+1**
- 50% sale: +6 -> **+4**
- full +1, overcharge -3 unchanged

## Supports (price G · exact description · rule notes)

### Foundation
| id | name | price | description |
|---|---|---|---|
| bulk | 묶음발주 계약 | 180 | 같은 상품 3개 이상 발주 시 3번째부터 매입가 -20%. |
| rotation | 회전 진열대 | 120 | 전날 4건 이상 판매하면 다음 날 모든 상품의 공급 수량 +2. |
| stamp | 단골 스탬프 기계 | 180 | 유료 구매로 오르는 단골도 +75% · 생환으로 오르는 단골도 제외. |
| member | 회원 관리대장 | 180 | 다음 날부터 이미 만난 손님의 재방문 가중치 +70%. |
| showcase | 희귀상품 입고 계약 | 200 | 희귀 이상 상품 발주 가중치 +70%. |
| guarantee | 길드 보증 진열대 | 200 | 하루 1회 · 200G 이상에 판 첫 상품은 판매가의 20%를 본사가 손님 대신 부담. 점주는 판매가 전액 수령. |
| hazardBoard | 원정 위험 게시판 | 120 | 오늘 게이트의 위험에 대응하는 상품이 발주 후보에 나올 가중치 +50%. |
| medicine | 야전 정비대 (remake) | 150 | 판매한 야외장비의 위험 대응 수치 +40%. |
| fridge | 대형 냉장고 | 120 | 음식·음료 유통기한 +2일 · 처음 확보할 때 보유 중인 해당 재고도 1회 연장. |
| kitchen | 즉석식품 코너 | 240 | 음식·음료가 원래 가진 능력치 증가 효과 +25% · 보급·위험 대응·부작용 제외 · 다음 날부터 기본 운영비 +10%. |
| board | 길드 전광판 | 150 | 기본 방문객이 3명인 날 4명으로 올린다. |
| rookieBoard | 첫 방문 쿠폰 (remake) | 150 | 처음 방문한 손님은 소지금 +30G · 구매 의사 +20%p. |

### Hybrid
| id | name | price | description |
|---|---|---|---|
| groupFlyer | 단체 주문 창구 (remake) | 280 | 매일 아침 20% 확률로 방문객 +1명 · 하루 5번째 판매부터 판매마다 본사 수당 +15G. |
| memberBundle | 단골 묶음혜택 (rework) | 270 | 단골 손님의 오늘 두 번째 유료 구매는 손님이 판매가의 절반만 낸다. 점주는 판매가 전액 수령. |
| premiumMember | 프리미엄 멤버십 (rework) | 290 | 단골 손님이 방문하면 소지금 +25G · 희귀 이상 상품 구매 의사 +15%p. |
| returnPoints | 귀환 적립제 | 340 | 오늘 유료 구매한 재방문 손님이 생환하면 단골도 +5 · 소지금 +30G. |
| expeditionMeal | 원정 도시락 코너 (rework) | 280 | 음식·음료 1개당 보급 +2 · 갈 게이트의 모든 위험 대응 +4. |
| coldcase | 냉장 유통 계약 | 250 | 고급 이상 음식·음료 발주 가중치 +80% · 구매 의사 +16%p · 유통기한 +1일 · 처음 확보할 때 보유 중인 해당 재고도 1회 연장. |
| supplyCert | 길드 납품 인증 | 310 | 오늘 게이트의 위험에 대응하는 희귀 이상 상품, 또는 희귀 이상 보험을 팔면 정가의 20% 본사 수당 · 그 손님 소지금 +30G. |
| dawnBulk | 새벽 회수 계약 (remake) | 270 | 유통기한이 끝난 음식·음료는 폐기 대신 매입가의 50%로 회수 · 매일 첫 발주 후보에 음식 또는 음료 1칸 추가. |

### Keystone
| id | name | price | description |
|---|---|---|---|
| logisticsHQ | 물류 본부계약 | 430 | 전날 6건 이상 판매했다면 오늘 같은 상품 3개 이상 발주 시 매입가 -30%. |
| lifetime | 평생 단골제 | 440 | 단골 손님이 생환하면 하루 1회 소지금 +50G · 다음 방문 가중치 +50%. |
| royalCert | 왕도 프리미엄 인증 | 460 | 상품을 150% 가격에 팔면 판매가의 20%를 본사 수당으로 받는다 · 150% 가격에 대한 손님의 구매 의사 감소(-16%p)가 없어진다. |
| expeditionCert | 원정 전문 인증 (remake) | 420 | 위험 대응 상품의 위험 대응 수치 +60% · 그 상품을 산 손님이 다음에 방문하면 소지금 +50G. |
| fresh24 | 24시간 신선체계 | 520 | 음식·음료가 원래 가진 능력치 증가 효과 +50% · 보급·위험 대응·부작용 제외 · 음식·음료 매입가 +25%. |
| hub | 지역 거점점 계약 | 490 | (unchanged effect) |

### Utility
| id | name | price | description |
|---|---|---|---|
| warehouse | 후방 창고 증설 | 180 | (unchanged) |
| terminal | 본사 추가발주권 | 190 | (unchanged) |
| delivery | 발주 교환권 | 170 | 매일 첫 후보 전체 교환 무료 · 이후 50G → 100G → 200G… 순으로 증가. |
| efficiency | 운영 효율 매뉴얼 | 180 | (unchanged) |

## Rule notes for implementation
- rotation: previous-day sales >= 4 -> next day every offer (all rarities) supply quantity +2.
- guarantee: condition is the charged sale price >= 200 (not list price); subsidy = 20% of charged price.
- showcase: overhead penalty removed.
- medicine (야전 정비대): for gear the NPC carries from this store, hazard counter values x1.40.
- expeditionCert: counter values of items that counter the NPC's gate hazards x1.60 (multiplies with
  야전 정비대 for gear; does NOT multiply 원정 도시락's flat +4). Buyer of such an item: on their next
  visit (alive), wallet +50G once per purchase day.
- kitchen: overhead +10% of overheadBase from next day (like hub). fresh24: no shelf-life effect, no
  overhead; food/drink purchase (order) price x1.25.
- rookieBoard (첫 방문 쿠폰): NPC's first-ever visit: wallet +30G on arrival; purchase intent +0.20
  during that visit.
- groupFlyer (단체 주문 창구): its own Morning roll, 20% -> expected visitors +1 (independent of board /
  hub / wall); commission +15G for each sale from the 5th sale of the day.
- memberBundle: 단골's second paid purchase today: NPC pays / is judged on half the charged price;
  store receives the full charged price (difference paid by HQ, recorded as subsidy).
- premiumMember: 단골 arrival wallet +25G; rare+ purchase intent +0.15.
- returnPoints: loyalty >= 30 condition removed; +5 loyalty, +30G.
- expeditionMeal: per food/drink item in the pack: supply +2 and +4 defense on every hazard of the
  destination gate. Old native-stat and x1.25 counter effects removed.
- coldcase: rare>=1 (고급 이상) food/drink purchase intent +0.16; old stat effects none.
- supplyCert: commission 20% of list price; buyer wallet +30G.
- dawnBulk (새벽 회수 계약): food/drink stock expiring today is refunded 50% of its cost instead of
  being wasted; each day's first offer generation adds 1 extra food/drink offer.
- logisticsHQ: if previous-day sales >= 6: every same-SKU 3+ order today -30% (not only the first).
  Purchase-price floor (45% of list) unchanged, internal only (max stack after this change ~51%).
- lifetime: threshold 51 (단골).
- royalCert: any rarity; commission 20% of charged (150%) price; overcharge flat intent -0.16 removed
  for the owner; 1.5x price burden and loyalty -3 unchanged.
- delivery: first reroll free, then the ordinary curve from its first step (50 -> 100 -> 200 ...).
