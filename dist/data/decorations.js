(function(G){
/* META_v2.8 §DECORATION COLLECTION / LOADOUT and §INITIAL FOUR DECORATIONS.
   A Decoration is Account-owned, belongs to exactly one Slot, and at most one owned Decoration
   per Slot is active for a Run. This is a list rather than four booleans on purpose: a Slot may
   hold several alternatives later, and nothing here assumes one entry per Slot forever.
   These are the only numeric truth for the four effects and their prices - no screen, harness or
   report may hold its own copy. */
G.DATA.decorationSlots=['sign','wall','counter','display'];
G.DATA.decorations=[
 {id:'dawnSign', kind:'economy', slot:'sign',    name:'새벽배송 안내판',  price:1450, effect:'매일 발주 후보 2칸 추가.',
  text:'새벽마다 본사 물류가 한 줄 더 붙는다.'},
 {id:'guildPlaque', kind:'economy', slot:'wall', name:'길드 제휴 현판',   price:1250, effect:'매일 아침 25% 확률로 방문객 +1명.',
  text:'길드 도장이 찍힌 현판. 가끔 이걸 보고 한 명이 더 들른다.'},
 {id:'thriftSafe', kind:'economy', slot:'counter',name:'알뜰 금고',      price:1150, effect:'매일 아침 영업 자금 +40G.',
  text:'카운터 아래 작은 금고. 아침마다 조금씩 여유가 생긴다.'},
 {id:'premiumCase', kind:'economy',slot:'display',name:'프리미엄 쇼케이스',price:800, effect:'평범보다 높은 등급의 모험가 등장 확률 50%로 증가 (기존 40%).',
  text:'유리 너머로 좋은 물건이 보이면, 좋은 손님이 온다.'},
 /* Survival / combat alternatives, one per Slot (User decision 2026-09-24). A Slot still wears
    ONE Decoration, so each Slot is a choice between running the store and keeping people alive.
    Same price as the economy Decoration of the same Slot, and the stronger effect sits in the
    dearer Slot. Ids are kept from the first placement; names and Slots follow the effect. */
 {id:'trainingRack', kind:'survival', slot:'sign',   name:'훈련소 제휴 간판', price:1450, effect:'처음 찾아오는 모험가 50% 확률로 레벨 +1.',
  text:'길드 훈련소 문장을 건 간판. 조금 더 단련된 사람이 문을 연다.'},
 {id:'infirmaryPlaque', kind:'survival', slot:'wall', name:'의무실 현판',     price:1250, effect:'부상 모험가가 방문하면 35% 확률로 부상 회복.',
  text:'길드 의무관이 들르는 날이 적혀 있다. 운이 좋으면 가게에서 붕대를 푼다.'},
 {id:'memorialBoard', kind:'survival', slot:'counter', name:'추모 방명록',   price:1150, effect:'영업이 끝나는 사망자 수를 11명으로 변경 (기존 10명).',
  text:'계산대 옆 방명록과 초. 사람들은 이 점포가 잊지 않는다는 걸 안다.'},
 {id:'firstAidKit', kind:'survival', slot:'display',  name:'구급품 진열장',   price:800, effect:'영업마다 사망 최대 2회를 중상으로 바꿈.',
  text:'붉은 상자가 놓인 유리장. 두 번은 누군가를 데려온다.'}];
/* The numbers the four alternatives read. Presentation copy above states the same values. */
/* The numbers every Decoration reads (User 2026-09-24). Presentation copy above states the same
   values. The wall chance stays D.balance.wallVisitorChance, its original owner. */
G.DATA.decorationParams={dawnSign:{extraOffers:2},thriftSafe:{dailyGold:40},
 memorialBoard:{deathLimitBonus:1},infirmaryPlaque:{healChance:.35},trainingRack:{levelBonus:1,chance:.5},firstAidKit:{saves:2}};
G.DATA.decorationBy=Object.fromEntries(G.DATA.decorations.map(d=>[d.id,d]));
/* META_v2.8 §STORE CAPITAL. The band is the Day the Run actually reached. */
/* META_v2.8 §Day-reach conversion rate — DIRECTOR DOCUMENT BASELINE. The band is the Day the
   Run actually reached, and it multiplies Gross Sales, not an end-state net worth - which is
   why these are a fraction of the rates the retired net-asset formula used. */
G.DATA.capitalRates=[{maxDay:9,rate:.01},{maxDay:19,rate:.02},{maxDay:24,rate:.03},{maxDay:29,rate:.04},{maxDay:30,rate:.05}];
})(globalThis);
